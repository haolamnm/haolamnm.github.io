import type { ReactNode } from "react";

interface ExternalLinkProps {
    href: string;
    label: string;
    icon: ReactNode;
    ariaLabel?: string;
}

/**
 * External link with consistent styling and security attributes.
 * Automatically adds target="_blank" and rel="noopener noreferrer".
 */
export function ExternalLink({ href, label, icon, ariaLabel }: ExternalLinkProps) {
    return (
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm text-zinc-400 hover:text-white transition-colors"
            aria-label={ariaLabel}
        >
            {icon}
            <span>{label}</span>
        </a>
    );
}
