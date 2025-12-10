import type { Config } from "tailwindcss";

/**
 * @description Tailwind configuration
 * @details
 * - Design System: Strictly monochrome (Zinc/Slate/White/Black)
 * - Two font families: Inter for UI, JetBrains Mono for code/headlines
 * - Custom glass utilities: Extends Tailwind for glassmorphism patterns
 * - Animation tokens: Consistent spring-like motion feel
 */
const config: Config = {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx,mdx}"],
    theme: {
        extend: {
            fontFamily: {
                sans: ["Inter", "system-ui", "sans-serif"],
                mono: ["JetBrains Mono", "Fira Code", "monospace"],
            },

            // WHY extended colors: Semantic naming for consistent usage
            colors: {
                owl: {
                    bg: "#09090b", // zinc-950 - near black primary background
                    surface: "rgba(255, 255, 255, 0.05)", // glass surface fill
                    border: "rgba(255, 255, 255, 0.1)", // subtle glass border
                    "border-hover": "rgba(255, 255, 255, 0.2)", // interactive state
                },
            },

            // WHY heavy backdrop blur: Core glassmorphism effect
            backdropBlur: {
                "2xl": "40px",
                "3xl": "64px",
            },

            // WHY animation tokens: Physics-based feel matching Framer Motion springs
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
