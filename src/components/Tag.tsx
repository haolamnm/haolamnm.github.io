/**
 * @description Reusable tag/badge component
 * @details Eliminates duplicate tag rendering across pages
 */

interface TagProps {
    children: string;
    size?: "sm" | "md";
}

export default function Tag({ children, size = "sm" }: TagProps) {
    const sizeClasses = size === "sm"
        ? "px-2 py-0.5 text-xs"
        : "px-2 py-1 text-xs";

    return (
        <span className={`${sizeClasses} font-mono text-zinc-400 bg-white/5 rounded`}>
            {children}
        </span>
    );
}
