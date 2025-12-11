import type { Variants } from "framer-motion";

/**
 * Shared animation configurations.
 * Centralized variants for consistent motion across pages.
 */

/** Spring transition with natural feel */
export const springConfig = {
    type: "spring" as const,
    stiffness: 100,
    damping: 15,
};

/** Container with staggered children */
export const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.08 },
    },
};

/** Fade up animation for list items */
export const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: springConfig,
    },
};

/** Page entrance animation */
export const pageEntrance: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
};
