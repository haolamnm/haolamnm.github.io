import { memo } from "react";

interface TagProps {
  children: string;
  size?: "sm" | "md";
}

/** Reusable tag/badge component */
const Tag = memo(function Tag({ children, size = "sm" }: TagProps) {
  const sizeClasses = size === "sm" ? "px-2 py-0.5 text-xs" : "px-2 py-1 text-xs";

  return <span className={`${sizeClasses} rounded bg-white/5 font-mono text-zinc-400`}>{children}</span>;
});

export default Tag;
