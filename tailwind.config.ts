import type { Config } from "tailwindcss";

/**
 * Tailwind configuration.
 * Monochrome design system with Inter for UI, JetBrains Mono for code.
 */
const config: Config = {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx,mdx}"],
    theme: {
        extend: {
            fontFamily: {
                sans: ["Inter", "system-ui", "sans-serif"],
                mono: ["JetBrains Mono", "Fira Code", "monospace"],
            },
            colors: {
                owl: {
                    bg: "#09090b",
                    surface: "rgba(255, 255, 255, 0.05)",
                    border: "rgba(255, 255, 255, 0.1)",
                    "border-hover": "rgba(255, 255, 255, 0.2)",
                },
            },
            backdropBlur: {
                "2xl": "40px",
                "3xl": "64px",
            },
            animation: {
                shimmer: "shimmer 2.5s linear infinite",
                "float-slow": "float 6s ease-in-out infinite",
                "pulse-glow": "pulse-glow 2s ease-in-out infinite",
            },
            keyframes: {
                shimmer: {
                    "0%": { backgroundPosition: "-200% 0" },
                    "100%": { backgroundPosition: "200% 0" },
                },
                float: {
                    "0%, 100%": { transform: "translateY(0)" },
                    "50%": { transform: "translateY(-10px)" },
                },
                "pulse-glow": {
                    "0%, 100%": { opacity: "0.6" },
                    "50%": { opacity: "1" },
                },
            },
        },
    },
    plugins: [],
};

export default config;
