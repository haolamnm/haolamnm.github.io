import type { ReactNode } from "react";

interface ExternalLinkProps {
  readonly href: string;
  readonly label: string;
  readonly icon: ReactNode;
  readonly ariaLabel?: string;
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
      className="flex items-center gap-2 text-sm text-zinc-400 transition-colors hover:text-white"
      aria-label={ariaLabel}
    >
      {icon}
      <span>{label}</span>
    </a>
  );
}
