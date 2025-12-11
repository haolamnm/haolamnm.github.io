/**
 * Shared type definitions.
 * Centralized types used across lib modules.
 */

/** Post metadata for listings */
export interface PostMeta {
    slug: string;
    title: string;
    date: string;
    excerpt: string;
    tags: string[];
}

/** Navigation item */
export interface NavItem {
    path: string;
    label: string;
}

/** Social platform types */
export type Platform = "github" | "linkedin" | "facebook" | "email" | "resume";

/** Base social link */
interface BaseSocialLink {
    href: string;
    label: string;
    platform: Platform;
}

/** Regular social link (not primary) */
interface RegularSocialLink extends BaseSocialLink {
    isPrimary?: false;
}

/** Primary social link (highlighted) */
interface PrimarySocialLink extends BaseSocialLink {
    isPrimary: true;
}

/** Social link union type */
export type SocialLink = RegularSocialLink | PrimarySocialLink;

/** Icon component props */
export interface IconProps {
    className?: string;
}
