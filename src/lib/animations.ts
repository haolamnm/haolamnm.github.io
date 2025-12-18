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

/**
 * Create a fade-in animation variant.
 * @param yOffset - Distance to translate from (default: 20)
 * @param duration - Transition duration (optional)
 */
export const createFadeIn = (yOffset = 20, duration?: number): Variants => ({
    hidden: { opacity: 0, y: yOffset },
    visible: {
        opacity: 1,
        y: 0,
        transition: duration ? { duration } : springConfig,
    },
});

/** Fade up animation for list items (using spring physics) */
export const fadeInUp = createFadeIn(20);

/** Page entrance animation (standard fade up) */
export const pageEntrance = createFadeIn(20);

/** Hero name entrance (scale + fade) */
export const heroEntrance: Variants = {
    hidden: { opacity: 0, y: 10, scale: 0.98 },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
            ...springConfig,
            delay: 0.1,
            duration: 0.6,
        },
    },
};

/** Navigation active indicator animation */
export const navIndicator: Variants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.95 },
};

/** Navigation indicator transition config */
export const navIndicatorTransition = { duration: 0.15 };
