import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

/**
 * Accessibility E2E tests using Axe.
 * Validates WCAG 2.1 AA compliance across all pages.
 */
test.describe("Accessibility (WCAG 2.1 AA)", () => {
    test("homepage should not have accessibility violations", async ({ page }) => {
        await page.goto("/");
        await page.waitForLoadState("networkidle");
        await page.waitForTimeout(1000);

        const accessibilityScanResults = await new AxeBuilder({ page })
            .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
            .analyze();

        if (accessibilityScanResults.violations.length > 0) {
            console.log("\nAccessibility violations found on homepage:");
            accessibilityScanResults.violations.forEach((violation) => {
                console.log(
                    `\n  ${violation.id}: ${violation.description}\n  Impact: ${violation.impact}\n  Help: ${violation.helpUrl}`
                );
                violation.nodes.forEach((node) => {
                    console.log(`    - ${node.html}`);
                });
            });
        }

        expect(accessibilityScanResults.violations).toEqual([]);
    });

    test("projects page should not have accessibility violations", async ({
        page,
    }) => {
        await page.goto("/projects");
        await page.waitForLoadState("networkidle");
        await page.waitForTimeout(1000);

        const accessibilityScanResults = await new AxeBuilder({ page })
            .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
            .analyze();

        if (accessibilityScanResults.violations.length > 0) {
            console.log("\nAccessibility violations found on projects page:");
            accessibilityScanResults.violations.forEach((violation) => {
                console.log(
                    `\n  ${violation.id}: ${violation.description}\n  Impact: ${violation.impact}`
                );
            });
        }

        expect(accessibilityScanResults.violations).toEqual([]);
    });

    test("thoughts page should not have accessibility violations", async ({
        page,
    }) => {
        await page.goto("/thoughts");
        await page.waitForLoadState("networkidle");
        await page.waitForTimeout(1000);

        const accessibilityScanResults = await new AxeBuilder({ page })
            .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
            .analyze();

        if (accessibilityScanResults.violations.length > 0) {
            console.log("\nAccessibility violations found on thoughts page:");
            accessibilityScanResults.violations.forEach((violation) => {
                console.log(
                    `\n  ${violation.id}: ${violation.description}\n  Impact: ${violation.impact}`
                );
            });
        }

        expect(accessibilityScanResults.violations).toEqual([]);
    });

    test("404 page should not have accessibility violations", async ({ page }) => {
        await page.goto("/page-that-does-not-exist");
        await page.waitForLoadState("networkidle");
        await page.waitForTimeout(1000);

        const accessibilityScanResults = await new AxeBuilder({ page })
            .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
            .exclude('h1[aria-hidden="true"]')
            .analyze();

        if (accessibilityScanResults.violations.length > 0) {
            console.log("\nAccessibility violations found on 404 page:");
            accessibilityScanResults.violations.forEach((violation) => {
                console.log(
                    `\n  ${violation.id}: ${violation.description}\n  Impact: ${violation.impact}`
                );
            });
        }

        expect(accessibilityScanResults.violations).toEqual([]);
    });
});
