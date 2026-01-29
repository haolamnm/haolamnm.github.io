import { expect, test } from "@playwright/test";

/**
 * Critical path E2E test - the "Money Loop".
 * Verifies reading a blog post (unique scenario not covered by navigation tests).
 */
test.describe("Critical User Path", () => {
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
});
