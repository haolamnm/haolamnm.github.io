/**
 * @description Handles loading and parsing of .mdx files for posts
 * @details Uses build-time manifest for listing, lazy loads content on demand
 */

import postsManifest from "./posts-manifest.json";

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

/**
 * @description Lazy-loaded modules - only loaded when specific post is requested
 */
const postModules = import.meta.glob<{
    default: React.ComponentType;
}>("../posts/*.mdx");

/**
 * @description Get all posts metadata for listing
 * @details Returns pre-built manifest - no MDX parsing required
 */
export function getAllPosts(): PostMeta[] {
    return postsManifest as PostMeta[];
}

/**
 * @description Get a single post by slug (async for lazy loading)
 */
export async function getPostBySlug(slug: string): Promise<Post | null> {
    const meta = postsManifest.find((p) => p.slug === slug) as PostMeta | undefined;
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
