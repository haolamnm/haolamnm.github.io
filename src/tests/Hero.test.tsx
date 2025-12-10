import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Hero from "@components/Hero";

/**
 * WHY these Hero tests:
 * - Verify critical content renders
 * - Test accessibility of main heading
 * - Ensure shimmer class is applied
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

        // WHY separate assertions: algorithms and art are now in separate spans
        expect(screen.getByText("algorithms")).toBeInTheDocument();
        expect(screen.getByText("art")).toBeInTheDocument();
    });

    it("has proper heading hierarchy", () => {
        render(<Hero />);

        const heading = screen.getByRole("heading", { level: 1 });
        expect(heading).toContainElement(screen.getByText("Hao Lam"));
    });
});
