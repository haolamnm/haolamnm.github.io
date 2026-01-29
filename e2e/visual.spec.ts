import { expect,test } from "@playwright/test";

/** Hide particle canvas to prevent flaky tests from random positions */
async function hideParticles(page: import("@playwright/test").Page) {
    await page.addStyleTag({
        content: `
            [data-testid="particle-canvas"],
            canvas {
                display: none !important;
                visibility: hidden !important;
            }
        `,
    });
}

/**
 * Visual regression tests.
 * Captures screenshots and compares against baselines.
 * Particles are hidden to prevent flaky tests from random positions.
 */
test.describe("Visual Regression", () => {

    test("homepage matches snapshot", async ({ page }) => {
        await page.goto("/");
        await page.waitForLoadState("networkidle");
        await hideParticles(page);
        await page.waitForTimeout(500);

        await expect(page).toHaveScreenshot("homepage.png", {
            fullPage: true,
            animations: "disabled",
        });
    });

    test("projects page matches snapshot", async ({ page }) => {
        await page.goto("/projects");
        await page.waitForLoadState("networkidle");
        await hideParticles(page);
        await page.waitForTimeout(500);

        await expect(page).toHaveScreenshot("projects.png", {
            fullPage: true,
            animations: "disabled",
        });
    });

    test("thoughts page matches snapshot", async ({ page }) => {
        await page.goto("/thoughts");
        await page.waitForLoadState("networkidle");
        await hideParticles(page);
        await page.waitForTimeout(500);

        await expect(page).toHaveScreenshot("thoughts.png", {
            fullPage: true,
            animations: "disabled",
        });
    });

    test("404 page matches snapshot", async ({ page }) => {
        await page.goto("/page-that-does-not-exist");
        await page.waitForLoadState("networkidle");
        await hideParticles(page);
        await page.waitForTimeout(500);

        await expect(page).toHaveScreenshot("404.png", {
            fullPage: true,
            animations: "disabled",
        });
    });
});
