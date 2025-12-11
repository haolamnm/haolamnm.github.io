interface TagProps {
    children: string;
    size?: "sm" | "md";
}

/** Reusable tag/badge component */
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
