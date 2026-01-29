/// <reference types="vitest" />
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import path from "node:path";

/**
 * Vitest configuration for unit testing.
 * Uses jsdom for React component testing with same aliases as vite.config.ts.
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
