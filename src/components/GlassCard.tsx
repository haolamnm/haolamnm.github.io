import { type ReactNode, memo } from "react";
import { motion } from "framer-motion";

type GlassVariant = "default" | "hoverable" | "interactive";

interface GlassCardProps {
  children: ReactNode;
  /** Card interaction variant */
  variant?: GlassVariant;
  className?: string;
}

/** Glassmorphism card with variant styles */
const GlassCard = memo(function GlassCard({
  children,
  variant = "hoverable",
  className = "",
}: GlassCardProps) {
  const getHoverProps = () => {
    switch (variant) {
      case "interactive":
        return { scale: 1.02, y: -2 };
      case "hoverable":
        return { scale: 1.02 };
      default:
        return undefined;
    }
  };

  return (
    <motion.div
      className={`glass-card p-6 ${variant === "interactive" ? "cursor-pointer" : ""} ${className}`}
      whileHover={getHoverProps()}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
    >
      {children}
    </motion.div>
  );
});

export default GlassCard;
