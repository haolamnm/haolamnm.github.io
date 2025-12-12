import { describe, it, expect, afterEach } from "vitest";
import { render, waitFor, cleanup } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { SEO } from "@components/SEO";

/**
 * SEO component tests.
 * Validates meta tag generation for title, description, and Open Graph.
 */
describe("SEO", () => {
    afterEach(() => {
        cleanup();
    });

    const renderWithProviders = (ui: React.ReactElement, route = "/") => {
        return render(
            <HelmetProvider>
                <MemoryRouter initialEntries={[route]}>{ui}</MemoryRouter>
            </HelmetProvider>
        );
    };

    it("renders default title when no title provided", async () => {
        renderWithProviders(<SEO />);

        await waitFor(() => {
            expect(document.title).toContain("Hao Lam");
        });
    });

    it("renders custom title with site name suffix", async () => {
        renderWithProviders(<SEO title="Projects" />);

        await waitFor(() => {
            expect(document.title).toContain("Projects");
            expect(document.title).toContain("Hao Lam");
        });
    });

    it("renders meta description", async () => {
        renderWithProviders(<SEO description="Test description" />);

        await waitFor(() => {
            const meta = document.querySelector('meta[name="description"]');
            expect(meta?.getAttribute("content")).toBe("Test description");
        });
    });

    it("renders Open Graph meta tags", async () => {
        renderWithProviders(<SEO title="Test Page" />);

        await waitFor(() => {
            const ogTitle = document.querySelector('meta[property="og:title"]');
            expect(ogTitle?.getAttribute("content")).toContain("Test Page");

            const ogType = document.querySelector('meta[property="og:type"]');
            expect(ogType?.getAttribute("content")).toBe("website");
        });
    });

    it("supports article type for blog posts", async () => {
        renderWithProviders(<SEO title="Blog Post" type="article" />);

        await waitFor(() => {
            const ogType = document.querySelector('meta[property="og:type"]');
            expect(ogType?.getAttribute("content")).toBe("article");
        });
    });

    it("renders Twitter Card meta tags", async () => {
        renderWithProviders(<SEO />);

        await waitFor(() => {
            const card = document.querySelector('meta[name="twitter:card"]');
            expect(card?.getAttribute("content")).toBe("summary_large_image");
        });
    });

    it("renders canonical URL", async () => {
        renderWithProviders(<SEO />, "/projects");

        await waitFor(() => {
            const canonical = document.querySelector('link[rel="canonical"]');
            expect(canonical?.getAttribute("href")).toContain("/projects");
        });
    });
});
