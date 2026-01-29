import { expect, test } from "@playwright/test";

/** Navigation test cases - from page, click text, expect URL, expect heading */
const NAV_TESTS = [
    { from: "/", click: "Projects", expectUrl: "/projects", expectHeading: "Projects" },
    { from: "/", click: "Thoughts", expectUrl: "/thoughts", expectHeading: "Thoughts" },
    { from: "/projects", click: "Home", expectUrl: "/" },
];

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

    for (const { from, click, expectUrl, expectHeading } of NAV_TESTS) {
        test(`can navigate from ${from} to ${click}`, async ({ page }) => {
            await page.goto(from);
            await page.click(`text=${click}`);
            await expect(page).toHaveURL(expectUrl);
            if (expectHeading) {
                await expect(page.locator("h1")).toContainText(expectHeading);
            }
        });
    }

    test("404 page shows for unknown routes", async ({ page }) => {
        await page.goto("/unknown-page-that-does-not-exist");
        await expect(page.locator("text=404")).toBeVisible();
    });
});
