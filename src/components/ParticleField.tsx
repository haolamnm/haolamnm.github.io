import { PARTICLE_CONFIG } from "@lib/particle-config";
import { debounce } from "@lib/utils";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

interface Particle {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  pulse: number;
}

/**
 * Generate a random number for visual animations.
 * Defined outside component for performance (static in memory).
 * @returns Random number between 0 and 1
 */
function visualRandom(): number {
  return Math.random(); // NOSONAR: Intentional use for visual animations; cryptographic security not required.
}

/**
 * Mouse-following particle animation for hero background.
 * Respects prefers-reduced-motion for accessibility.
 * Uses edge-biased distribution (85% edges, 15% center).
 * On touch devices, particles only react while finger is on screen.
 */
export default function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(() => {
    return globalThis.matchMedia("(prefers-reduced-motion: reduce)").matches;
  });
  const mouseRef = useRef({ x: 0, y: 0 });
  const isPointerActiveRef = useRef(false);
  const particlesRef = useRef<Particle[]>([]);
  const animationRef = useRef<number>(0);

  useEffect(() => {
    const mq = globalThis.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mq.addEventListener?.("change", onChange);
    return () => mq.removeEventListener?.("change", onChange);
  }, []);

  useEffect(() => {
    if (prefersReducedMotion) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = globalThis.innerWidth;
      canvas.height = globalThis.innerHeight;
    };
    resize();

    const debouncedResize = debounce(resize, PARTICLE_CONFIG.resizeDebounceMs);
    globalThis.addEventListener("resize", debouncedResize);

    /**
     * Generate edge-biased position (85% edges, 15% center).
     * Creates subtle frame effect without obscuring content.
     */
    const generateEdgeBiasedPosition = (width: number, height: number): { x: number; y: number } => {
      const edgeBias = visualRandom() < PARTICLE_CONFIG.edgeBias;
      const thickness = PARTICLE_CONFIG.frameThickness;
      const innerStart = 1 - thickness;

      if (edgeBias) {
        const edge = Math.floor(visualRandom() * 4);
        switch (edge) {
          case 0: // Top
            return {
              x: visualRandom() * width,
              y: visualRandom() * height * thickness,
            };
          case 1: // Bottom
            return {
              x: visualRandom() * width,
              y: height * innerStart + visualRandom() * height * thickness,
            };
          case 2: // Left
            return {
              x: visualRandom() * width * thickness,
              y: visualRandom() * height,
            };
          default: // Right
            return {
              x: width * innerStart + visualRandom() * width * thickness,
              y: visualRandom() * height,
            };
        }
      } else {
        return { x: visualRandom() * width, y: visualRandom() * height };
      }
    };

    particlesRef.current = Array.from({ length: PARTICLE_CONFIG.count }, (_, i) => {
      const pos = generateEdgeBiasedPosition(canvas.width, canvas.height);
      const { sizeRange, opacityRange } = PARTICLE_CONFIG;
      return {
        id: i,
        x: pos.x,
        y: pos.y,
        vx: 0,
        vy: 0,
        size: sizeRange.min + visualRandom() * (sizeRange.max - sizeRange.min),
        opacity: opacityRange.min + visualRandom() * (opacityRange.max - opacityRange.min),
        pulse: visualRandom() * Math.PI * 2,
      };
    });

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
      isPointerActiveRef.current = true;
    };
    const handleMouseLeave = () => {
      isPointerActiveRef.current = false;
    };

    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const touch = e.touches[0];
        mouseRef.current = { x: touch.clientX, y: touch.clientY };
        isPointerActiveRef.current = true;
      }
    };
    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const touch = e.touches[0];
        mouseRef.current = { x: touch.clientX, y: touch.clientY };
      }
    };
    const handleTouchEnd = () => {
      isPointerActiveRef.current = false;
    };

    globalThis.addEventListener("mousemove", handleMouseMove, {
      passive: true,
    });
    globalThis.addEventListener("mouseleave", handleMouseLeave);
    globalThis.addEventListener("touchstart", handleTouchStart, {
      passive: true,
    });
    globalThis.addEventListener("touchmove", handleTouchMove, {
      passive: true,
    });
    globalThis.addEventListener("touchend", handleTouchEnd);
    globalThis.addEventListener("touchcancel", handleTouchEnd);

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const mouse = mouseRef.current;
      const isActive = isPointerActiveRef.current;

      particlesRef.current.forEach((p) => {
        if (isActive) {
          const dx = mouse.x - p.x;
          const dy = mouse.y - p.y;
          const dist = Math.hypot(dx, dy);

          const { attractRadius, repelRadius, attractForce, repelForce } = PARTICLE_CONFIG;

          if (dist < repelRadius && dist > 0) {
            const force = ((repelRadius - dist) / repelRadius) * repelForce;
            p.vx -= (dx / dist) * force;
            p.vy -= (dy / dist) * force;
          } else if (dist < attractRadius && dist > repelRadius) {
            const force = ((dist - repelRadius) / (attractRadius - repelRadius)) * attractForce;
            p.vx += (dx / dist) * force;
            p.vy += (dy / dist) * force;
          }
        }

        const { friction } = PARTICLE_CONFIG;
        p.x += p.vx;
        p.y += p.vy;
        p.vx *= friction;
        p.vy *= friction;

        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        p.pulse += PARTICLE_CONFIG.pulseSpeed;
        const pulseScale = 1 + Math.sin(p.pulse) * 0.25;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * pulseScale, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${p.opacity * (0.7 + Math.sin(p.pulse) * 0.3)})`;
        ctx.fill();
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      globalThis.removeEventListener("resize", debouncedResize);
      globalThis.removeEventListener("mousemove", handleMouseMove);
      globalThis.removeEventListener("mouseleave", handleMouseLeave);
      globalThis.removeEventListener("touchstart", handleTouchStart);
      globalThis.removeEventListener("touchmove", handleTouchMove);
      globalThis.removeEventListener("touchend", handleTouchEnd);
      globalThis.removeEventListener("touchcancel", handleTouchEnd);
      cancelAnimationFrame(animationRef.current);
    };
  }, [prefersReducedMotion]);

  if (prefersReducedMotion) return null;

  return (
    <motion.canvas
      ref={canvasRef}
      data-testid="particle-canvas"
      className="pointer-events-none fixed inset-0 z-0"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
      aria-hidden="true"
    />
  );
}
