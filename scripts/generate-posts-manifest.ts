/**
 * Build script to generate posts manifest from MDX frontmatter.
 * Creates JSON metadata file for lazy-loading without bundling full MDX.
 */

import { existsSync,readdirSync, readFileSync, writeFileSync } from "node:fs";
import { basename, dirname,join } from "node:path";
import { fileURLToPath } from "node:url";

import matter from "gray-matter";

import type { PostMeta } from "../src/lib/types";
import { asPostSlug } from "../src/lib/types";

const __dirname = dirname(fileURLToPath(import.meta.url));
const POSTS_DIR = join(__dirname, "../src/posts");
const OUTPUT_PATH = join(__dirname, "../src/lib/posts-manifest.json");

/**
 * Generate posts manifest from MDX files.
 */
function generateManifest(): void {
    if (!existsSync(POSTS_DIR)) {
        console.log("No posts directory found, creating empty manifest");
        writeFileSync(OUTPUT_PATH, JSON.stringify([], null, 2));
        return;
    }

    const files = readdirSync(POSTS_DIR).filter((f) => f.endsWith(".mdx"));

    const posts: PostMeta[] = files.map((file) => {
        const filePath = join(POSTS_DIR, file);
        const content = readFileSync(filePath, "utf-8");
        const { data } = matter(content);

        return {
            slug: asPostSlug(basename(file, ".mdx")),
            title: data.title ?? basename(file, ".mdx"),
            date: data.date ?? new Date().toISOString().split("T")[0],
            excerpt: data.excerpt ?? "",
            tags: data.tags ?? [],
        };
    });

    // Sort by date descending (newest first)
    posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    writeFileSync(OUTPUT_PATH, JSON.stringify(posts, null, 2));
    console.log(`Generated posts manifest with ${posts.length} post(s)`);
}

generateManifest();
