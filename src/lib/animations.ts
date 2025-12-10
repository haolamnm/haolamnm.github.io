import type { Variants } from "framer-motion";

/**
 * @description Shared animation configurations
 * @details Eliminates duplicate animation variants across pages
 */

// Standard spring config for consistent feel
export const springConfig = {
    type: "spring" as const,
    stiffness: 100,
    damping: 15,
};

// Stagger container for lists
export const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.08 },
    },
};

// Fade up animation for list items
export const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: springConfig,
    },
};

// Page entrance animation
export const pageEntrance: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
};
