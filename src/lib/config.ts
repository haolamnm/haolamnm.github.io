/**
 * @fileoverview Site configuration for core identity and settings
 * @description Single source of truth for personal info used across the site
 */

export const siteConfig = {
    name: "Hao Lam",
    role: "Computer Vision",
    description:
        "Exploring the frontiers of Computer Vision. Bridging the gap between pixels and perception.",
    email: "hello@haolamnm.dev",
    domain: "haolamnm.dev",
};

export const socialLinks = [
    {
        href: "https://github.com/haolamnm",
        label: "GitHub",
        platform: "github" as const,
    },
    {
        href: "https://linkedin.com/in/haolamnm",
        label: "LinkedIn",
        platform: "linkedin" as const,
    },
    {
        href: "https://facebook.com/haolamnm",
        label: "Facebook",
        platform: "facebook" as const,
    },
    {
        href: `mailto:${siteConfig.email}`,
        label: "Email",
        platform: "email" as const,
    },
    {
        href: "/resume.pdf",
        label: "Resume / CV",
        platform: "resume" as const,
        isPrimary: true,
    },
] as const;

export const navItems = [
    { path: "/", label: "Home" },
    { path: "/projects", label: "Projects" },
    { path: "/thoughts", label: "Thoughts" },
] as const;
