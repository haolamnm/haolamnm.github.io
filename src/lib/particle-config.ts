/**
 * Particle field physics configuration.
 * Extracted for easy tuning without touching render logic.
 */
export const PARTICLE_CONFIG = {
    /** Number of particles to render */
    count: 50,

    /** Radius within which particles are attracted to cursor */
    attractRadius: 180,

    /** Radius within which particles are repelled from cursor */
    repelRadius: 60,

    /** Force multiplier for repulsion effect */
    repelForce: 0.4,

    /** Force multiplier for attraction effect */
    attractForce: 0.08,

    /** Probability of spawning on edges vs center (0.85 = 85% edges) */
    edgeBias: 0.85,

    /** Velocity decay per frame (0.92 = 8% reduction) */
    friction: 0.92,

    /** Particle size range in pixels */
    sizeRange: { min: 2, max: 5 },

    /** Particle opacity range */
    opacityRange: { min: 0.1, max: 0.35 },

    /** Pulse animation speed multiplier */
    pulseSpeed: 0.02,

    /** Debounce time for window resize events in ms */
    resizeDebounceMs: 200,

    /**
     * Frame thickness for edge-biased generation.
     * 0.3 means particles spawn in the outer 30% of the screen.
     */
    frameThickness: 0.3,
} as const;

export type ParticleConfig = typeof PARTICLE_CONFIG;
