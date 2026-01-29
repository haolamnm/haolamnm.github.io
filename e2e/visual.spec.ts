import type { Page } from "@playwright/test";
import { expect, test } from "@playwright/test";

/** Pages to capture visual snapshots */
const VISUAL_PAGES = [
    { name: "homepage", path: "/", snapshot: "homepage.png" },
    { name: "projects", path: "/projects", snapshot: "projects.png" },
    { name: "thoughts", path: "/thoughts", snapshot: "thoughts.png" },
    { name: "404", path: "/page-that-does-not-exist", snapshot: "404.png" },
];

/**
 * Hide particle canvas to prevent flaky tests from random positions.
 */
async function hideParticles(page: Page) {
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
 * Prepare page for visual snapshot.
 */
async function prepareForSnapshot(page: Page, path: string) {
    await page.goto(path);
    await page.waitForLoadState("networkidle");
    await hideParticles(page);
    await page.waitForTimeout(500);
}

/**
 * Visual regression tests.
 * Captures screenshots and compares against baselines.
 * Particles are hidden to prevent flaky tests from random positions.
 */
test.describe("Visual Regression", () => {
    for (const { name, path, snapshot } of VISUAL_PAGES) {
        test(`${name} page matches snapshot`, async ({ page }) => {
            await prepareForSnapshot(page, path);
            await expect(page).toHaveScreenshot(snapshot, {
                fullPage: true,
                animations: "disabled",
            });
        });
    }
});
