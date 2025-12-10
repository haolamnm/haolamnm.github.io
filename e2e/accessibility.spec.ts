import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

/**
 * @description Automated accessibility testing with Axe
 * @details Catches ~60% of WCAG issues vs Lighthouse's ~30%. Runs automatically in CI to prevent accessibility regressions
 */

test.describe("Accessibility (WCAG 2.1 AA)", () => {
    test("homepage should not have accessibility violations", async ({ page }) => {
        await page.goto("/");

        const accessibilityScanResults = await new AxeBuilder({ page })
            .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
            .analyze();

        // Log violations for debugging
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

        const accessibilityScanResults = await new AxeBuilder({ page })
            .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
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
