import { defineConfig } from "vite";
import { copyFileSync, existsSync, readFileSync } from "fs";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import mdx from "@mdx-js/rollup";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import remarkFrontmatter from "remark-frontmatter";
import remarkMdxFrontmatter from "remark-mdx-frontmatter";
import rehypeKatex from "rehype-katex";
import rehypeSlug from "rehype-slug";
import rehypePrismPlus from "rehype-prism-plus";
import rehypeExternalLinks from "rehype-external-links";
import Sitemap from "vite-plugin-sitemap";
import { visualizer } from "rollup-plugin-visualizer";
import path from "path";
import { siteConfig, socialLinks } from "./src/lib/config";
import { seoContent } from "./src/lib/content";

/**
 * Load post slugs from manifest for sitemap generation.
 * @returns Array of post route paths
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
 * Vite configuration for haolamnm.dev portfolio.
 *
 * Plugin order: MDX before React (MDX transforms .mdx before React processes JSX)
 *
 * Remark plugins: GFM, math, frontmatter extraction
 * Rehype plugins: KaTeX, slugs, Prism syntax highlighting, external links
 */
export default defineConfig({
  plugins: [
    tailwindcss(),
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
        [rehypeExternalLinks, { target: "_blank", rel: ["noopener", "noreferrer"] }],
      ],
    }),
    react(),
    Sitemap({
      hostname: "https://haolamnm.dev",
      dynamicRoutes: ["/projects", "/thoughts", ...getPostSlugs()],
    }),
    // Bundle analyzer - generates stats.html with gzip/brotli sizes
    visualizer({
      filename: "stats.html",
      gzipSize: true,
      brotliSize: true,
      template: "treemap",
    }),
    // GitHub Pages SPA routing fix - copies index.html to 404.html
    {
      name: "copy-404-for-spa-routing",
      closeBundle() {
        copyFileSync("dist/index.html", "dist/404.html");
      },
    },
    // Inject SEO tags at build time - Single Source of Truth
    {
      name: "html-inject-seo",
      transformIndexHtml(html) {
        const jsonLd = {
          "@context": "https://schema.org",
          "@type": "Person",
          name: siteConfig.name,
          url: `https://${siteConfig.domain}`,
          jobTitle: siteConfig.role,
          description: siteConfig.description,
          image: `https://${siteConfig.domain}/og-image.png`,
          sameAs: socialLinks
            .map((link) => link.href)
            .filter((href) => href.startsWith("https://")),
        };

        const seoHtml = `<title>${seoContent.defaultTitle}</title>
  <meta name="description" content="${seoContent.defaultDescription}">
  <meta name="author" content="${siteConfig.name}">
  <meta property="og:type" content="website">
  <meta property="og:title" content="${seoContent.defaultTitle}">
  <meta property="og:description" content="${seoContent.defaultDescription}">
  <meta property="og:image" content="/og-image.png">
  <script type="application/ld+json">${JSON.stringify(jsonLd)}</script>`;

        return html.replace(
          "<!-- SEO Meta Tags are injected by Vite at build time -->",
          seoHtml
        );
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
    // Manual chunks for optimal caching - vendor libs separate from app code
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ["react", "react-dom", "react-router-dom"],
          motion: ["framer-motion"],
        },
      },
    },
    target: "esnext",
    sourcemap: false,
    minify: "esbuild",
  },
  esbuild: {
    drop: ["console", "debugger"],
  },
});
