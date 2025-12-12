import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { ExternalLink } from "@components/ExternalLink";

/**
 * ExternalLink component tests.
 * Validates security attributes and accessibility.
 */
describe("ExternalLink", () => {
    const TestIcon = () => <span data-testid="test-icon">icon</span>;

    it("renders link with label and icon", () => {
        render(
            <ExternalLink
                href="https://example.com"
                label="Example"
                icon={<TestIcon />}
            />
        );

        expect(screen.getByText("Example")).toBeInTheDocument();
        expect(screen.getByTestId("test-icon")).toBeInTheDocument();
    });

    it("opens in new tab with target=_blank", () => {
        render(
            <ExternalLink
                href="https://example.com"
                label="Example"
                icon={<TestIcon />}
            />
        );

        const link = screen.getByRole("link");
        expect(link).toHaveAttribute("target", "_blank");
    });

    it("has security attributes rel=noopener noreferrer", () => {
        render(
            <ExternalLink
                href="https://example.com"
                label="Example"
                icon={<TestIcon />}
            />
        );

        const link = screen.getByRole("link");
        expect(link).toHaveAttribute("rel", "noopener noreferrer");
    });

    it("has correct href", () => {
        render(
            <ExternalLink
                href="https://github.com/test"
                label="GitHub"
                icon={<TestIcon />}
            />
        );

        const link = screen.getByRole("link");
        expect(link).toHaveAttribute("href", "https://github.com/test");
    });

    it("supports custom aria-label", () => {
        render(
            <ExternalLink
                href="https://example.com"
                label="Example"
                icon={<TestIcon />}
                ariaLabel="Open Example in new tab"
            />
        );

        const link = screen.getByRole("link");
        expect(link).toHaveAttribute("aria-label", "Open Example in new tab");
    });
});
