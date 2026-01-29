import { describe, it, expect, afterEach } from "vitest";
import { render, waitFor, cleanup } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { SEOComponent } from "@components/SEO";

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

  it("renders default title for homepage", async () => {
    renderWithProviders(<SEOComponent />);

    await waitFor(() => {
      expect(document.title).toContain("Hao Lam");
      expect(document.title).toContain("Computer Vision");
    });
  });

  it("renders custom title with site name suffix", async () => {
    renderWithProviders(<SEOComponent title="Projects" />);

    await waitFor(() => {
      expect(document.title).toContain("Projects");
      expect(document.title).toContain("Hao Lam");
    });
  });

  it("renders custom meta description", async () => {
    renderWithProviders(<SEOComponent description="Test description" />);

    await waitFor(() => {
      const meta = document.querySelector('meta[name="description"]');
      expect(meta?.getAttribute("content")).toBe("Test description");
    });
  });

  it("does not render default meta description", async () => {
    renderWithProviders(<SEOComponent />);

    await waitFor(() => {
      const meta = document.querySelector('meta[name="description"]');
      expect(meta).toBeNull();
    });
  });

  it("renders Open Graph meta tags for custom pages", async () => {
    renderWithProviders(<SEOComponent title="Test Page" />);

    await waitFor(() => {
      const ogTitle = document.querySelector('meta[property="og:title"]');
      expect(ogTitle?.getAttribute("content")).toContain("Test Page");

      // Default og:type is 'website', so it should NOT be rendered
      const ogType = document.querySelector('meta[property="og:type"]');
      expect(ogType).toBeNull();
    });
  });

  it("supports article type for blog posts", async () => {
    renderWithProviders(<SEOComponent title="Blog Post" type="article" />);

    await waitFor(() => {
      const ogType = document.querySelector('meta[property="og:type"]');
      expect(ogType?.getAttribute("content")).toBe("article");
    });
  });

  it("renders Twitter Card meta tags", async () => {
    renderWithProviders(<SEOComponent />);

    await waitFor(() => {
      const card = document.querySelector('meta[name="twitter:card"]');
      expect(card?.getAttribute("content")).toBe("summary_large_image");
    });
  });

  it("renders canonical URL", async () => {
    renderWithProviders(<SEOComponent />, "/projects");

    await waitFor(() => {
      const canonical = document.querySelector('link[rel="canonical"]');
      expect(canonical?.getAttribute("href")).toContain("/projects");
    });
  });
});
