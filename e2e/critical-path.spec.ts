import { test, expect } from "@playwright/test";

/**
 * Critical path E2E test - the "Money Loop".
 * Verifies the primary user journey: Home → Thoughts → Read Post.
 */
test.describe("Critical User Path", () => {
    test("user can navigate from home to thoughts page", async ({ page }) => {
        await page.goto("/");

        // Click Thoughts in navigation
        await page.click('a[href="/thoughts"]');
        await expect(page).toHaveURL("/thoughts");

        // Page header should be visible
        await expect(page.locator("h1")).toContainText("Thoughts");
    });

    test("user can read a blog post if available", async ({ page }) => {
        await page.goto("/thoughts");

        // Check if any posts exist
        const postLinks = page.locator('a[href^="/thoughts/"]');
        const count = await postLinks.count();

        if (count > 0) {
            // Click first post
            await postLinks.first().click();

            // Should navigate to post page
            await expect(page.locator("article")).toBeVisible();

            // Back link should work
            await page.click('a[href="/thoughts"]');
            await expect(page).toHaveURL("/thoughts");
        }
    });

    test("user can navigate through all main pages", async ({ page }) => {
        await page.goto("/");

        // Home page loads
        await expect(page.locator("h1")).toBeVisible();

        // Navigate to Projects
        await page.click('a[href="/projects"]');
        await expect(page).toHaveURL("/projects");
        await expect(page.locator("h1")).toContainText("Projects");

        // Navigate to Thoughts
        await page.click('a[href="/thoughts"]');
        await expect(page).toHaveURL("/thoughts");
        await expect(page.locator("h1")).toContainText("Thoughts");

        // Navigate back to Home
        await page.click('a[href="/"]');
        await expect(page).toHaveURL("/");
    });
});
