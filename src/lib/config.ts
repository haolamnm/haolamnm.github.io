/**
 * Site configuration and social links.
 * Single source of truth for personal info.
 */

import type { SocialLink, NavItem } from "./types";

export const siteConfig = {
    name: "Hao Lam",
    role: "Computer Vision",
    description:
        "Exploring the frontiers of Computer Vision. Bridging the gap between pixels and perception.",
    email: "me@haolamnm.dev",
    domain: "haolamnm.dev",
} as const;

/** Social links displayed in SocialDock */
export const socialLinks: readonly SocialLink[] = [
    {
        href: "https://github.com/haolamnm",
        label: "GitHub",
        platform: "github",
    },
    {
        href: "https://linkedin.com/in/haolamnm",
        label: "LinkedIn",
        platform: "linkedin",
    },
    {
        href: "https://facebook.com/haolamnm",
        label: "Facebook",
        platform: "facebook",
    },
    {
        href: `mailto:${siteConfig.email}`,
        label: "Email",
        platform: "email",
    },
    {
        href: "/resume.pdf",
        label: "Resume / CV",
        platform: "resume",
        isPrimary: true,
    },
];

/** Navigation items for main nav */
export const navItems: readonly NavItem[] = [
    { path: "/", label: "Home" },
    { path: "/projects", label: "Projects" },
    { path: "/thoughts", label: "Thoughts" },
];
