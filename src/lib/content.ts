/**
 * Centralized UI content.
 * Single source of truth for all text content.
 */

import { siteConfig } from "./config";

/** Hero section content */
export const heroContent = {
    name: siteConfig.name,
    role: siteConfig.role,
    tagline: {
        prefix: "When",
        emphasis1: "algorithms",
        middle: "meet",
        emphasis2: "art",
        suffix: ".",
    },
    description: siteConfig.description,
} as const;

/** Page-specific content */
export const pageContent = {
    projects: {
        title: "Projects",
        subtitle: "From neural architectures to deployed inference engines.",
        searchPlaceholder: "Search projects by name or tag...",
        emptyState: (query: string) => `No projects found matching "${query}"`,
        loadMore: "Load More",
        links: {
            github: "GitHub",
            codeberg: "Codeberg",
            website: "Website",
        },
    },
    thoughts: {
        title: "Thoughts",
        subtitle: "Engineering logs, research notes, and algorithmic musings.",
        searchPlaceholder: "Search posts...",
        emptyState: (query: string) => `No posts found matching "${query}"`,
        emptyDefault: "No posts yet. Check back soon!",
        loadMore: "Load More",
    },
    notFound: {
        title: "404",
        subtitle: "Page not found",
        description: "The page you're looking for doesn't exist or has been moved.",
        goHome: "Go Home",
        goBack: "Go Back",
    },
    post: {
        loading: "Loading...",
        notFound: {
            title: "Post Not Found",
            description: "The post you're looking for doesn't exist.",
            backLink: "Back to Thoughts",
        },
        error: {
            title: "Failed to load",
            description: "Something went wrong loading this post.",
            retry: "Try Again",
        },
        backLink: "Back to Thoughts",
    },
} as const;

/** Footer content */
export const footerContent = {
    bugReport: {
        text: "Found a bug?",
        url: "https://github.com/haolamnm/haolamnm.github.io/issues",
    },
} as const;

/** SEO defaults */
export const seoContent = {
    defaultTitle: `${siteConfig.name} | ${siteConfig.role}`,
    defaultDescription: siteConfig.description,
    siteName: siteConfig.name,
    siteUrl: `https://${siteConfig.domain}`,
} as const;
