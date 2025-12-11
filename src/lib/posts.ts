/**
 * Post loading and parsing.
 * Uses build-time manifest for listing, lazy loads content on demand.
 */

import postsManifest from "./posts-manifest.json";

/** Post metadata for listings */
export interface PostMeta {
    slug: string;
    title: string;
    date: string;
    excerpt: string;
    tags: string[];
}

export interface Post extends PostMeta {
    Content: React.ComponentType;
}

/** Lazy-loaded MDX modules */
const postModules = import.meta.glob<{
    default: React.ComponentType;
}>("../posts/*.mdx");

/**
 * Get all posts metadata for listing.
 * @returns Post metadata array from pre-built manifest
 */
export function getAllPosts(): PostMeta[] {
    return postsManifest as PostMeta[];
}

/**
 * Get single post by slug with lazy-loaded content.
 * @param slug - Post slug
 * @returns Post with Content component or null
 */
export async function getPostBySlug(slug: string): Promise<Post | null> {
    const manifest = postsManifest as PostMeta[];
    const meta = manifest.find((p) => p.slug === slug);
    if (!meta) return null;

    const path = `../posts/${slug}.mdx`;
    const loader = postModules[path];
    if (!loader) return null;

    const mod = await loader();

    return {
        ...meta,
        Content: mod.default,
    };
}
