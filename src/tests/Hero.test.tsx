import Hero from "@components/Hero";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

/**
 * Hero component tests.
 * Verifies content rendering, accessibility, and shimmer effect.
 */
describe("Hero", () => {
  it("renders the name with shimmer effect", () => {
    render(<Hero />);

    const name = screen.getByText("Hao Lam");
    expect(name).toBeInTheDocument();
    expect(name).toHaveClass("text-shimmer");
  });

  it("renders the role tag", () => {
    render(<Hero />);

    expect(screen.getByText("Computer Vision")).toBeInTheDocument();
  });

  it("renders the tagline with emphasized words", () => {
    render(<Hero />);

    // Emphasized words are in separate spans
    expect(screen.getByText("algorithms")).toBeInTheDocument();
    expect(screen.getByText("art")).toBeInTheDocument();
  });

  it("has proper heading hierarchy", () => {
    render(<Hero />);

    const heading = screen.getByRole("heading", { level: 1 });
    expect(heading).toContainElement(screen.getByText("Hao Lam"));
  });
});
