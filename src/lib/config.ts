/**
 * @fileoverview Site configuration for core identity and settings
 * @description Single source of truth for personal info used across the site
 */

export const siteConfig = {
    name: "Hao Lam",
    role: "Computer Vision",
    description:
        "Exploring the frontiers of Computer Vision. Bridging the gap between pixels and perception.",
    email: "me@haolamnm.dev",
    domain: "haolamnm.dev",
};

/**
 * @description Social link types with discriminated union for primary links
 */
type Platform = "github" | "linkedin" | "facebook" | "email" | "resume";

interface BaseSocialLink {
    href: string;
    label: string;
    platform: Platform;
}

interface RegularSocialLink extends BaseSocialLink {
    isPrimary?: false;
}

interface PrimarySocialLink extends BaseSocialLink {
    isPrimary: true;
}

export type SocialLink = RegularSocialLink | PrimarySocialLink;

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

export const navItems = [
    { path: "/", label: "Home" },
    { path: "/projects", label: "Projects" },
    { path: "/thoughts", label: "Thoughts" },
] as const;
