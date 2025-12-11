import { defineConfig } from "vite";
import { copyFileSync, existsSync, readFileSync } from "fs";
import react from "@vitejs/plugin-react";
import mdx from "@mdx-js/rollup";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import remarkFrontmatter from "remark-frontmatter";
import remarkMdxFrontmatter from "remark-mdx-frontmatter";
import rehypeKatex from "rehype-katex";
import rehypeSlug from "rehype-slug";
import rehypePrismPlus from "rehype-prism-plus";
import Sitemap from "vite-plugin-sitemap";
import { visualizer } from "rollup-plugin-visualizer";
import path from "path";

/**
 * @description Load posts manifest for dynamic sitemap routes
 */
function getPostSlugs(): string[] {
  const manifestPath = path.resolve(__dirname, "./src/lib/posts-manifest.json");
  if (!existsSync(manifestPath)) return [];
  try {
    const manifest = JSON.parse(readFileSync(manifestPath, "utf-8"));
    return manifest.map((p: { slug: string }) => `/thoughts/${p.slug}`);
  } catch {
    return [];
  }
}

/**
 * @description Vite configuration for haolamnm.dev portfolio
 *
 * @details
 * - MDX BEFORE React: MDX must transform .mdx files before React processes JSX
 * - Sitemap: Auto-generates sitemap.xml for SEO with dynamic blog routes
 * - copy404: Fixes GitHub Pages SPA routing (see below)
 *
 * @details remark/rehype plugins:
 * - remark-frontmatter + remark-mdx-frontmatter: Parse and export frontmatter as data
 * - rehype-prism-plus: Syntax highlighting with line numbers support
 */
export default defineConfig({
  plugins: [
    mdx({
      remarkPlugins: [
        remarkGfm,
        remarkMath,
        remarkFrontmatter,
        [remarkMdxFrontmatter, { name: "frontmatter" }],
      ],
      rehypePlugins: [
        rehypeKatex,
        rehypeSlug,
        [rehypePrismPlus, { ignoreMissing: true }],
      ],
    }),
    react(),
    Sitemap({
      hostname: "https://haolamnm.dev",
      dynamicRoutes: ["/", "/projects", "/thoughts", ...getPostSlugs()],
    }),
    /**
     * WHY visualizer plugin:
     * Generates stats.html showing bundle composition (gzip + brotli sizes).
     * Helps identify optimization opportunities (e.g., large dependencies, duplicates).
     * Only runs in production builds to avoid cluttering dev workflow.
     */
    visualizer({
      filename: "stats.html",
      gzipSize: true,
      brotliSize: true,
      template: "treemap", // "treemap", "sunburst", "network"
    }),
    /**
     * WHY copy404 plugin:
     * GitHub Pages serves 404.html for unknown routes. By copying index.html to 404.html,
     * React Router takes over client-side routing on page refresh. This fixes the
     * "reload 404 bug" where refreshing /projects or /thoughts showed a 404 page.
     */
    {
      name: "copy-404-for-spa-routing",
      closeBundle() {
        copyFileSync("dist/index.html", "dist/404.html");
        console.log("Copied index.html to 404.html for GitHub Pages SPA routing");
      },
    },
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@components": path.resolve(__dirname, "./src/components"),
      "@pages": path.resolve(__dirname, "./src/pages"),
      "@layout": path.resolve(__dirname, "./src/layout"),
      "@lib": path.resolve(__dirname, "./src/lib"),
    },
  },
  build: {
    /**
     * WHY manual chunks:
     * Route-based code splitting keeps initial bundle under 200KB.
     * Vendor libs (React, Router) are cached separately from app code.
     */
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ["react", "react-dom", "react-router-dom"],
          motion: ["framer-motion"],
        },
      },
    },
    target: "esnext",
  },
});

