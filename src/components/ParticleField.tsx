import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

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
 * @description Creates a debounced version of a function
 * @details Prevents expensive operations from firing too frequently (e.g., resize events)
 */
function debounce<T extends (...args: unknown[]) => void>(fn: T, ms: number): T {
    let timer: number;
    return ((...args: unknown[]) => {
        clearTimeout(timer);
        timer = window.setTimeout(() => fn(...args), ms);
    }) as T;
}

/**
 * @description ParticleField - mouse-follow particle animation for hero section
 * @details WHY edge-biased distribution: More particles around edges, sparse in center (10-20%)
 * creates a subtle frame effect without obscuring content.
 * @details Accessibility: Respects prefers-reduced-motion, renders null if enabled.
 */
export default function ParticleField() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [prefersReducedMotion, setPrefersReducedMotion] = useState(() => {
        if (typeof window === "undefined") return false;
        return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    });
    const mouseRef = useRef({ x: 0, y: 0 });
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

        // WHY debounce: Prevents expensive canvas re-render 100+ times/sec during window drag
        const debouncedResize = debounce(resize, 200);
        window.addEventListener("resize", debouncedResize);

        // WHY edge-biased distribution: More particles around edges, sparse in center
        const generateEdgeBiasedPosition = (
            width: number,
            height: number
        ): { x: number; y: number } => {
            // 80-90% of particles spawn in outer 40% of area
            const edgeBias = Math.random() < 0.85;

            if (edgeBias) {
                // Spawn in edge regions
                const edge = Math.floor(Math.random() * 4);
                switch (edge) {
                    case 0: // Top edge
                        return { x: Math.random() * width, y: Math.random() * height * 0.3 };
                    case 1: // Bottom edge
                        return {
                            x: Math.random() * width,
                            y: height * 0.7 + Math.random() * height * 0.3,
                        };
                    case 2: // Left edge
                        return { x: Math.random() * width * 0.3, y: Math.random() * height };
                    default: // Right edge
                        return {
                            x: width * 0.7 + Math.random() * width * 0.3,
                            y: Math.random() * height,
                        };
                }
            } else {
                // 10-15% in center
                return { x: Math.random() * width, y: Math.random() * height };
            }
        };

        const PARTICLE_COUNT = 50;
        particlesRef.current = Array.from({ length: PARTICLE_COUNT }, (_, i) => {
            const pos = generateEdgeBiasedPosition(canvas.width, canvas.height);
            return {
                id: i,
                x: pos.x,
                y: pos.y,
                vx: 0,
                vy: 0,
                size: 2 + Math.random() * 3,
                opacity: 0.1 + Math.random() * 0.25,
                pulse: Math.random() * Math.PI * 2,
            };
        });

        const handleMouseMove = (e: MouseEvent) => {
            mouseRef.current = { x: e.clientX, y: e.clientY };
        };
        window.addEventListener("mousemove", handleMouseMove, { passive: true });

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            const mouse = mouseRef.current;

            particlesRef.current.forEach((p) => {
                const dx = mouse.x - p.x;
                const dy = mouse.y - p.y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                const ATTRACT_RADIUS = 180;
                const REPEL_RADIUS = 60;

                if (dist < REPEL_RADIUS && dist > 0) {
                    const force = ((REPEL_RADIUS - dist) / REPEL_RADIUS) * 0.4;
                    p.vx -= (dx / dist) * force;
                    p.vy -= (dy / dist) * force;
                } else if (dist < ATTRACT_RADIUS && dist > REPEL_RADIUS) {
                    const force =
                        ((dist - REPEL_RADIUS) / (ATTRACT_RADIUS - REPEL_RADIUS)) * 0.08;
                    p.vx += (dx / dist) * force;
                    p.vy += (dy / dist) * force;
                }

                p.x += p.vx;
                p.y += p.vy;
                p.vx *= 0.96;
                p.vy *= 0.96;

                if (p.x < 0) p.x = canvas.width;
                if (p.x > canvas.width) p.x = 0;
                if (p.y < 0) p.y = canvas.height;
                if (p.y > canvas.height) p.y = 0;

                p.pulse += 0.025;
                const pulseScale = 1 + Math.sin(p.pulse) * 0.25;

                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size * pulseScale, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(255, 255, 255, ${p.opacity * (0.7 + Math.sin(p.pulse) * 0.3)
                    })`;
                ctx.fill();
            });

            animationRef.current = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            window.removeEventListener("resize", debouncedResize);
            window.removeEventListener("mousemove", handleMouseMove);
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
