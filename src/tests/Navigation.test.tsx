import Navigation from "@components/Navigation";
import { navItems } from "@lib/config";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";

/**
 * Navigation component tests.
 * Verifies route rendering and link correctness.
 */
describe("Navigation", () => {
  it("renders all navigation items", () => {
    render(
      <BrowserRouter>
        <Navigation />
      </BrowserRouter>
    );

    navItems.forEach((item) => {
      const link = screen.getByText(item.label);
      expect(link).toBeInTheDocument();
    });
  });

  it("home link navigates to root path", () => {
    render(
      <BrowserRouter>
        <Navigation />
      </BrowserRouter>
    );

    const homeLink = screen.getByText("Home");
    expect(homeLink.closest("a")).toHaveAttribute("href", "/");
  });

  it("projects link navigates to /projects", () => {
    render(
      <BrowserRouter>
        <Navigation />
      </BrowserRouter>
    );

    const projectsLink = screen.getByText("Projects");
    expect(projectsLink.closest("a")).toHaveAttribute("href", "/projects");
  });

  it("thoughts link navigates to /thoughts", () => {
    render(
      <BrowserRouter>
        <Navigation />
      </BrowserRouter>
    );

    const thoughtsLink = screen.getByText("Thoughts");
    expect(thoughtsLink.closest("a")).toHaveAttribute("href", "/thoughts");
  });
});
