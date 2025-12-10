import type { ReactNode } from "react";
import { motion } from "framer-motion";

interface GlassCardProps {
    children: ReactNode;
    hover?: boolean;
    className?: string;
}

export default function GlassCard({
    children,
    hover = true,
    className = "",
}: GlassCardProps) {
    return (
        <motion.div
            className={`glass-card p-6 ${className}`}
            whileHover={hover ? { scale: 1.02 } : undefined}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
        >
            {children}
        </motion.div>
    );
}

