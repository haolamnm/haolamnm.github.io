/// <reference types="vitest" />
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import path from "path";

/**
 * @description Vitest configuration
 * @details
 * - Keeps test configuration isolated from build config
 * - jsdom environment for React component testing
 * - Same path aliases as main config for consistency
 */
export default defineConfig({
    plugins: [react()],
    test: {
        globals: true,
        environment: "jsdom",
        setupFiles: ["./src/tests/setup.ts"],
        include: ["src/**/*.{test,spec}.{ts,tsx}"],
        coverage: {
            reporter: ["text", "json", "html"],
            exclude: ["node_modules/", "src/tests/"],
        },
    },
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"),
            "@components": path.resolve(__dirname, "./src/components"),
            "@pages": path.resolve(__dirname, "./src/pages"),
            "@layout": path.resolve(__dirname, "./src/layout"),
            "@lib": path.resolve(__dirname, "./src/lib"),
        },
    },
});
