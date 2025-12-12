import { defineConfig, devices } from "@playwright/test";

/**
 * Playwright E2E test configuration.
 * Tests critical user flows in Chromium and Firefox.
 * Visual tests use preview server to avoid dev-mode artifacts.
 */
export default defineConfig({
    testDir: "./e2e",
    fullyParallel: true,
    forbidOnly: !!process.env.CI,
    retries: process.env.CI ? 2 : 0,
    workers: process.env.CI ? 1 : undefined,
    reporter: "html",
    use: {
        baseURL: "http://localhost:5173",
        trace: "on-first-retry",
    },
    projects: [
        {
            name: "chromium",
            use: { ...devices["Desktop Chrome"] },
            testIgnore: /visual\.spec\.ts/,
        },
        {
            name: "firefox",
            use: { ...devices["Desktop Firefox"] },
            testIgnore: /visual\.spec\.ts/,
        },
        {
            name: "visual-chromium",
            use: {
                ...devices["Desktop Chrome"],
                baseURL: "http://localhost:5173",
            },
            testMatch: /visual\.spec\.ts/,
        },
        {
            name: "visual-firefox",
            use: {
                ...devices["Desktop Firefox"],
                baseURL: "http://localhost:5173",
            },
            testMatch: /visual\.spec\.ts/,
        },
    ],
    webServer: [
        {
            command: "bun run dev",
            url: "http://localhost:5173",
            reuseExistingServer: !process.env.CI,
        },
    ],
});

