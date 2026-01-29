/**
 * Build script to generate OG images for blog posts using Satori.
 * Creates PNG images at dist/og/[slug].png for social media previews.
 */

import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import satori from "satori";
import { Resvg } from "@resvg/resvg-js";
import type { ReactNode } from "react";

import type { PostMeta } from "../src/lib/types";

const __dirname = dirname(fileURLToPath(import.meta.url));
const MANIFEST_PATH = join(__dirname, "../src/lib/posts-manifest.json");
const OUTPUT_DIR = join(__dirname, "../dist/og");

// jsDelivr CDN WOFF URLs for fonts (Satori doesn't support WOFF2)
const FONT_URLS = {
    inter400: "https://cdn.jsdelivr.net/fontsource/fonts/inter@latest/latin-400-normal.woff",
    inter600: "https://cdn.jsdelivr.net/fontsource/fonts/inter@latest/latin-600-normal.woff",
    inter700: "https://cdn.jsdelivr.net/fontsource/fonts/inter@latest/latin-700-normal.woff",
    jetbrains400: "https://cdn.jsdelivr.net/fontsource/fonts/jetbrains-mono@latest/latin-400-normal.woff",
};

// OG image dimensions (recommended by social platforms)
const WIDTH = 1200;
const HEIGHT = 630;

interface FontData {
    inter400: ArrayBuffer;
    inter600: ArrayBuffer;
    inter700: ArrayBuffer;
    jetbrains400: ArrayBuffer;
}

/**
 * Fetch fonts from jsDelivr CDN.
 */
async function loadFonts(): Promise<FontData> {
    console.log("  Fetching fonts from jsDelivr CDN...");

    const [inter400, inter600, inter700, jetbrains400] = await Promise.all([
        fetch(FONT_URLS.inter400).then((r) => r.arrayBuffer()),
        fetch(FONT_URLS.inter600).then((r) => r.arrayBuffer()),
        fetch(FONT_URLS.inter700).then((r) => r.arrayBuffer()),
        fetch(FONT_URLS.jetbrains400).then((r) => r.arrayBuffer()),
    ]);

    return { inter400, inter600, inter700, jetbrains400 };
}

/**
 * Create OG image JSX template for a post.
 */
function createOgTemplate(post: PostMeta): unknown {
    return {
        type: "div",
        props: {
            style: {
                width: "100%",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                background: "linear-gradient(180deg, #09090b 0%, #0f0f12 50%, #09090b 100%)",
                padding: "60px",
            },
            children: [
                {
                    type: "div",
                    props: {
                        style: {
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            gap: "24px",
                        },
                        children: [
                            // Tags
                            {
                                type: "div",
                                props: {
                                    style: {
                                        display: "flex",
                                        gap: "12px",
                                    },
                                    children: post.tags.slice(0, 3).map((tag) => ({
                                        type: "span",
                                        props: {
                                            style: {
                                                fontSize: "20px",
                                                fontFamily: "JetBrains Mono",
                                                color: "#a1a1aa",
                                                background: "rgba(255,255,255,0.08)",
                                                padding: "8px 20px",
                                                borderRadius: "9999px",
                                                border: "1px solid rgba(255,255,255,0.15)",
                                            },
                                            children: tag,
                                        },
                                    })),
                                },
                            },
                            // Title
                            {
                                type: "h1",
                                props: {
                                    style: {
                                        fontSize: "56px",
                                        fontWeight: 700,
                                        fontFamily: "Inter",
                                        color: "white",
                                        textAlign: "center",
                                        lineHeight: 1.2,
                                        maxWidth: "900px",
                                    },
                                    children: post.title,
                                },
                            },
                            // Site branding
                            {
                                type: "div",
                                props: {
                                    style: {
                                        display: "flex",
                                        alignItems: "center",
                                        gap: "8px",
                                        marginTop: "24px",
                                    },
                                    children: [
                                        {
                                            type: "span",
                                            props: {
                                                style: {
                                                    fontSize: "24px",
                                                    fontFamily: "Inter",
                                                    color: "#71717a",
                                                },
                                                children: "haolamnm.dev",
                                            },
                                        },
                                    ],
                                },
                            },
                        ],
                    },
                },
            ],
        },
    };
}

/**
 * Generate OG image for a single post.
 */
async function generateOgImage(
    post: PostMeta,
    fonts: FontData
): Promise<void> {
    const template = createOgTemplate(post);

    const svg = await satori(template as ReactNode, {
        width: WIDTH,
        height: HEIGHT,
        fonts: [
            {
                name: "Inter",
                data: fonts.inter400,
                weight: 400,
                style: "normal",
            },
            {
                name: "Inter",
                data: fonts.inter700,
                weight: 700,
                style: "normal",
            },
            {
                name: "JetBrains Mono",
                data: fonts.jetbrains400,
                weight: 400,
                style: "normal",
            },
        ],
    });

    const resvg = new Resvg(svg, {
        fitTo: {
            mode: "width",
            value: WIDTH,
        },
    });
    const pngData = resvg.render();
    const pngBuffer = pngData.asPng();

    const outputPath = join(OUTPUT_DIR, `${post.slug}.png`);
    writeFileSync(outputPath, pngBuffer);
    console.log(`  Generated: ${post.slug}.png`);
}

/**
 * Generate default OG image matching home page design.
 * Layout: Computer Vision tag, then Hao Lam name, then "When algorithms meet art."
 */
async function generateDefaultOgImage(fonts: FontData): Promise<void> {
    const template = {
        type: "div",
        props: {
            style: {
                width: "100%",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                background: "linear-gradient(180deg, #09090b 0%, #0f0f12 50%, #09090b 100%)",
                padding: "60px",
            },
            children: [
                // Computer Vision tag (like home page)
                {
                    type: "span",
                    props: {
                        style: {
                            fontSize: "18px",
                            fontFamily: "JetBrains Mono",
                            color: "#a1a1aa",
                            background: "rgba(255,255,255,0.08)",
                            padding: "10px 24px",
                            borderRadius: "9999px",
                            border: "1px solid rgba(255,255,255,0.15)",
                            marginBottom: "32px",
                        },
                        children: "Computer Vision",
                    },
                },
                // Name - large and bold
                {
                    type: "h1",
                    props: {
                        style: {
                            fontSize: "96px",
                            fontWeight: 700,
                            fontFamily: "Inter",
                            color: "white",
                            letterSpacing: "-0.02em",
                            marginBottom: "24px",
                        },
                        children: "Hao Lam",
                    },
                },
                // Tagline - "When algorithms meet art."
                {
                    type: "p",
                    props: {
                        style: {
                            fontSize: "32px",
                            fontFamily: "Inter",
                            color: "#a1a1aa",
                            display: "flex",
                            gap: "8px",
                        },
                        children: [
                            {
                                type: "span",
                                props: {
                                    style: { color: "#a1a1aa" },
                                    children: "When",
                                },
                            },
                            {
                                type: "span",
                                props: {
                                    style: { color: "white", fontWeight: 600 },
                                    children: "algorithms",
                                },
                            },
                            {
                                type: "span",
                                props: {
                                    style: { color: "#a1a1aa" },
                                    children: "meet",
                                },
                            },
                            {
                                type: "span",
                                props: {
                                    style: { color: "white", fontWeight: 600 },
                                    children: "art.",
                                },
                            },
                        ],
                    },
                },
            ],
        },
    };

    const svg = await satori(template as unknown as ReactNode, {
        width: WIDTH,
        height: HEIGHT,
        fonts: [
            {
                name: "Inter",
                data: fonts.inter400,
                weight: 400,
                style: "normal",
            },
            {
                name: "Inter",
                data: fonts.inter600,
                weight: 600,
                style: "normal",
            },
            {
                name: "Inter",
                data: fonts.inter700,
                weight: 700,
                style: "normal",
            },
            {
                name: "JetBrains Mono",
                data: fonts.jetbrains400,
                weight: 400,
                style: "normal",
            },
        ],
    });

    const resvg = new Resvg(svg, {
        fitTo: {
            mode: "width",
            value: WIDTH,
        },
    });
    const pngData = resvg.render();
    const pngBuffer = pngData.asPng();

    // Write to both dist/og and public for dev
    writeFileSync(join(OUTPUT_DIR, "default.png"), pngBuffer);
    writeFileSync(join(__dirname, "../public/og-image.png"), pngBuffer);
    console.log("  Generated: default.png (also copied to public/og-image.png)");
}

/**
 * Main entry point.
 */
async function main(): Promise<void> {
    console.log("Generating OG images...");

    // Ensure output directory exists
    if (!existsSync(OUTPUT_DIR)) {
        mkdirSync(OUTPUT_DIR, { recursive: true });
    }

    const fonts = await loadFonts();

    // Generate default OG image
    await generateDefaultOgImage(fonts);

    // Generate post-specific OG images
    if (existsSync(MANIFEST_PATH)) {
        const manifest: PostMeta[] = JSON.parse(
            readFileSync(MANIFEST_PATH, "utf-8")
        );

        for (const post of manifest) {
            await generateOgImage(post, fonts);
        }

        console.log(`Generated ${manifest.length + 1} OG image(s)`);
    } else {
        console.log("No posts manifest found, only generated default OG image");
    }
}

try {
    await main();
} catch (error) {
    console.error(error);
    process.exit(1);
}
