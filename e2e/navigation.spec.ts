import { expect,test } from "@playwright/test";

/**
 * Navigation E2E tests.
 * Validates core user flows work correctly.
 */
test.describe("Site Navigation", () => {
    test("homepage loads correctly", async ({ page }) => {
        await page.goto("/");
        await expect(page).toHaveTitle(/Hao Lam/);
        await expect(page.locator("span.glass-card")).toContainText("Computer Vision");
    });

    test("can navigate to Projects page", async ({ page }) => {
        await page.goto("/");
        await page.click("text=Projects");
        await expect(page).toHaveURL("/projects");
        await expect(page.locator("h1")).toContainText("Projects");
    });

    test("can navigate to Thoughts page", async ({ page }) => {
        await page.goto("/");
        await page.click("text=Thoughts");
        await expect(page).toHaveURL("/thoughts");
        await expect(page.locator("h1")).toContainText("Thoughts");
    });

    test("can navigate back to Home from Projects", async ({ page }) => {
        await page.goto("/projects");
        await page.click("text=Home");
        await expect(page).toHaveURL("/");
    });

    test("404 page shows for unknown routes", async ({ page }) => {
        await page.goto("/unknown-page-that-does-not-exist");
        await expect(page.locator("text=404")).toBeVisible();
    });
});
