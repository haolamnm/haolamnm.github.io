import AxeBuilder from "@axe-core/playwright";
import type { Page } from "@playwright/test";
import { expect, test } from "@playwright/test";

/** WCAG tags to check across all pages */
const WCAG_TAGS = ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"];

/** All pages to test for accessibility */
const PAGES_TO_TEST = [
    { name: "homepage", path: "/", exclude: undefined },
    { name: "projects page", path: "/projects", exclude: undefined },
    { name: "thoughts page", path: "/thoughts", exclude: undefined },
    { name: "404 page", path: "/page-that-does-not-exist", exclude: 'h1[aria-hidden="true"]' },
];

/**
 * Run accessibility scan on a page and log any violations.
 */
async function runAccessibilityScan(page: Page, pageName: string, excludeSelector?: string) {
    await page.waitForLoadState("networkidle");
    await page.waitForTimeout(1000);

    let builder = new AxeBuilder({ page }).withTags(WCAG_TAGS);

    if (excludeSelector) {
        builder = builder.exclude(excludeSelector);
    }

    const results = await builder.analyze();

    if (results.violations.length > 0) {
        console.log(`\nAccessibility violations found on ${pageName}:`);
        results.violations.forEach((violation) => {
            console.log(`\n  ${violation.id}: ${violation.description}\n  Impact: ${violation.impact}\n  Help: ${violation.helpUrl}`);
            violation.nodes.forEach((node) => {
                console.log(`    - ${node.html}`);
            });
        });
    }

    return results.violations;
}

/**
 * Accessibility E2E tests using Axe.
 * Validates WCAG 2.1 AA compliance across all pages.
 */
test.describe("Accessibility (WCAG 2.1 AA)", () => {
    for (const { name, path, exclude } of PAGES_TO_TEST) {
        test(`${name} should not have accessibility violations`, async ({ page }) => {
            await page.goto(path);
            const violations = await runAccessibilityScan(page, name, exclude);
            expect(violations).toEqual([]);
        });
    }
});
