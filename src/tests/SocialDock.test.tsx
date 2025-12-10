import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import SocialDock from "@components/SocialDock";

/**
 * SocialDock component tests
 * WHY: Ensures all external links have proper security attributes
 */
describe("SocialDock", () => {
    it("renders all social links", () => {
        render(
            <BrowserRouter>
                <SocialDock />
            </BrowserRouter>
        );

        const links = screen.getAllByRole("link");
        expect(links.length).toBeGreaterThan(0);
    });

    it("all external links have noopener noreferrer for security", () => {
        render(
            <BrowserRouter>
                <SocialDock />
            </BrowserRouter>
        );

        const links = screen.getAllByRole("link");

        links.forEach((link) => {
            const href = link.getAttribute("href");
            const target = link.getAttribute("target");

            // External links should have security attributes
            if (href?.startsWith("http") && target === "_blank") {
                const rel = link.getAttribute("rel");
                expect(rel).toContain("noopener");
                expect(rel).toContain("noreferrer");
            }
        });
    });

    it("each link has an accessible aria-label", () => {
        render(
            <BrowserRouter>
                <SocialDock />
            </BrowserRouter>
        );

        const links = screen.getAllByRole("link");

        links.forEach((link) => {
            expect(link).toHaveAttribute("aria-label");
        });
    });
});
