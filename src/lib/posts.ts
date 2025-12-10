/**
 * @description Handles loading and parsing of .mdx files for posts
 * - Loads .mdx files at build time using Vite's import.meta.glob
 * - Extracts frontmatter for listing without loading full content
 * - Provides getAllPosts() and getPostBySlug() for pages
 */

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
 * @description eager: true - MDX modules need to be loaded to access exports
 * @description type definition: MDX exports frontmatter as named export
 */
const postModules = import.meta.glob<{
    default: React.ComponentType;
    frontmatter?: {
        title?: string;
        date?: string;
        excerpt?: string;
        tags?: string[];
    };
}>("../posts/*.mdx", { eager: true });

/**
 * @description Get all posts metadata for listing
 * @details Defensive defaults: MDX frontmatter might be missing or incomplete
 */
export function getAllPosts(): PostMeta[] {
    const posts = Object.entries(postModules).map(([path, mod]) => {
        const slug = path.replace("../posts/", "").replace(".mdx", "");
        const fm = mod.frontmatter ?? {};

        return {
            slug,
            title: fm.title ?? slug,
            date: fm.date ?? new Date().toISOString(),
            excerpt: fm.excerpt ?? "",
            tags: fm.tags ?? [],
        };
    });

    // Sort by date descending: Newest posts first
    return posts.sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
}

/**
 * @description Get a single post by slug
 */
export function getPostBySlug(slug: string): Post | null {
    const path = `../posts/${slug}.mdx`;
    const mod = postModules[path];

    if (!mod) return null;

    const fm = mod.frontmatter ?? {};

    return {
        slug,
        title: fm.title ?? slug,
        date: fm.date ?? new Date().toISOString(),
        excerpt: fm.excerpt ?? "",
        tags: fm.tags ?? [],
        Content: mod.default,
    };
}

