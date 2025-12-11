/**
 * Shared type definitions.
 * Centralized types used across lib modules.
 */

/** Branded type utility for nominal typing */
declare const __brand: unique symbol;
type Brand<T, B> = T & { [__brand]: B };

/** Branded slug type for blog posts */
export type PostSlug = Brand<string, "PostSlug">;

/** Branded ID type for projects */
export type ProjectId = Brand<string, "ProjectId">;

/** Convert raw string to PostSlug */
export function asPostSlug(s: string): PostSlug {
    return s as PostSlug;
}

/** Convert raw string to ProjectId */
export function asProjectId(s: string): ProjectId {
    return s as ProjectId;
}

/** Post metadata for listings */
export interface PostMeta {
    slug: PostSlug;
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
