import { test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test("check homepage accessibility - detailed output", async ({ page }) => {
    await page.goto("/");

    const results = await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa"])
        .analyze();

    console.log(`\n\n=== ACCESSIBILITY SCAN RESULTS ===`);
    console.log(`Passes: ${results.passes.length}`);
    console.log(`Violations: ${results.violations.length}`);
    console.log(`Incomplete: ${results.incomplete.length}`);

    if (results.violations.length > 0) {
        console.log(`\n\nVIOLATIONS FOUND:\n`);
        results.violations.forEach((v, i) => {
            console.log(`${i + 1}. ${v.id} (${v.impact})`);
            console.log(`   ${v.description}`);
            console.log(`   Help: ${v.helpUrl}`);
            console.log(`   Affected elements: ${v.nodes.length}`);
            v.nodes.slice(0, 2).forEach((node) => {
                console.log(`   - ${node.html.substring(0, 100)}...`);
            });
            console.log("");
        });
    } else {
        console.log(`\nNo violations found!`);
    }
});
