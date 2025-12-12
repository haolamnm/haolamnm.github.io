import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { PARTICLE_CONFIG } from "@lib/particle-config";

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
 * Create a debounced version of a function.
 * @param fn - Function to debounce
 * @param ms - Delay in milliseconds
 * @returns Debounced function
 */
function debounce<T extends (...args: unknown[]) => void>(fn: T, ms: number): T {
    let timer: number;
    return ((...args: unknown[]) => {
        clearTimeout(timer);
        timer = window.setTimeout(() => fn(...args), ms);
    }) as T;
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
        return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    });
    const mouseRef = useRef({ x: 0, y: 0 });
    const isPointerActiveRef = useRef(false);
    const particlesRef = useRef<Particle[]>([]);
    const animationRef = useRef<number>(0);

    useEffect(() => {
        const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
        const onChange = (e: MediaQueryListEvent) =>
            setPrefersReducedMotion(e.matches);
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
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        resize();

        const debouncedResize = debounce(resize, 200);
        window.addEventListener("resize", debouncedResize);

        /**
         * Generate edge-biased position (85% edges, 15% center).
         * Creates subtle frame effect without obscuring content.
         */
        const generateEdgeBiasedPosition = (
            width: number,
            height: number
        ): { x: number; y: number } => {
            const edgeBias = Math.random() < PARTICLE_CONFIG.edgeBias;

            if (edgeBias) {
                const edge = Math.floor(Math.random() * 4);
                switch (edge) {
                    case 0:
                        return { x: Math.random() * width, y: Math.random() * height * 0.3 };
                    case 1:
                        return {
                            x: Math.random() * width,
                            y: height * 0.7 + Math.random() * height * 0.3,
                        };
                    case 2:
                        return { x: Math.random() * width * 0.3, y: Math.random() * height };
                    default:
                        return {
                            x: width * 0.7 + Math.random() * width * 0.3,
                            y: Math.random() * height,
                        };
                }
            } else {
                return { x: Math.random() * width, y: Math.random() * height };
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
                size: sizeRange.min + Math.random() * (sizeRange.max - sizeRange.min),
                opacity: opacityRange.min + Math.random() * (opacityRange.max - opacityRange.min),
                pulse: Math.random() * Math.PI * 2,
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

        window.addEventListener("mousemove", handleMouseMove, { passive: true });
        window.addEventListener("mouseleave", handleMouseLeave);
        window.addEventListener("touchstart", handleTouchStart, { passive: true });
        window.addEventListener("touchmove", handleTouchMove, { passive: true });
        window.addEventListener("touchend", handleTouchEnd);
        window.addEventListener("touchcancel", handleTouchEnd);

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            const mouse = mouseRef.current;
            const isActive = isPointerActiveRef.current;

            particlesRef.current.forEach((p) => {
                if (isActive) {
                    const dx = mouse.x - p.x;
                    const dy = mouse.y - p.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    const { attractRadius, repelRadius, attractForce, repelForce } = PARTICLE_CONFIG;

                    if (dist < repelRadius && dist > 0) {
                        const force = ((repelRadius - dist) / repelRadius) * repelForce;
                        p.vx -= (dx / dist) * force;
                        p.vy -= (dy / dist) * force;
                    } else if (dist < attractRadius && dist > repelRadius) {
                        const force =
                            ((dist - repelRadius) / (attractRadius - repelRadius)) * attractForce;
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
            window.removeEventListener("resize", debouncedResize);
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("mouseleave", handleMouseLeave);
            window.removeEventListener("touchstart", handleTouchStart);
            window.removeEventListener("touchmove", handleTouchMove);
            window.removeEventListener("touchend", handleTouchEnd);
            window.removeEventListener("touchcancel", handleTouchEnd);
            cancelAnimationFrame(animationRef.current);
        };
    }, [prefersReducedMotion]);

    if (prefersReducedMotion) return null;

    return (
        <motion.canvas
            ref={canvasRef}
            className="fixed inset-0 pointer-events-none z-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5 }}
            aria-hidden="true"
        />
    );
}
