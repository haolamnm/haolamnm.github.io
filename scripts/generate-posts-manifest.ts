/**
 * @description Build-time script to generate posts manifest from MDX frontmatter
 * @details Runs before vite build to create JSON metadata without bundling MDX content
 */

import { readdirSync, readFileSync, writeFileSync, existsSync } from "fs";
import { join, basename, dirname } from "path";
import { fileURLToPath } from "url";
import matter from "gray-matter";

interface PostMeta {
    slug: string;
    title: string;
    date: string;
    excerpt: string;
    tags: string[];
}

const __dirname = dirname(fileURLToPath(import.meta.url));
const POSTS_DIR = join(__dirname, "../src/posts");
const OUTPUT_PATH = join(__dirname, "../src/lib/posts-manifest.json");

function generateManifest(): void {
    // Check if posts directory exists
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

        const slug = basename(file, ".mdx");

        return {
            slug,
            title: data.title ?? slug,
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
