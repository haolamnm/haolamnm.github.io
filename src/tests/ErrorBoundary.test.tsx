import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import ErrorBoundary from "@components/ErrorBoundary";

/**
 * ErrorBoundary component tests.
 * Verifies error catching, fallback UI, and recovery behavior.
 */

/** Component that throws an error for testing */
function ThrowError({ shouldThrow }: { shouldThrow: boolean }) {
    if (shouldThrow) {
        throw new Error("Test error");
    }
    return <div>Child content</div>;
}

/** Wrapper with router context (required for ErrorBoundary's icon imports) */
function renderWithRouter(ui: React.ReactElement) {
    return render(<MemoryRouter>{ui}</MemoryRouter>);
}

describe("ErrorBoundary", () => {
    // Suppress console.error during error boundary tests
    const originalError = console.error;
    beforeEach(() => {
        console.error = vi.fn();
    });
    afterEach(() => {
        console.error = originalError;
    });

    it("renders children when no error occurs", () => {
        renderWithRouter(
            <ErrorBoundary>
                <ThrowError shouldThrow={false} />
            </ErrorBoundary>
        );

        expect(screen.getByText("Child content")).toBeInTheDocument();
    });

    it("renders fallback UI when child throws", () => {
        renderWithRouter(
            <ErrorBoundary>
                <ThrowError shouldThrow={true} />
            </ErrorBoundary>
        );

        expect(screen.getByText("Something went wrong")).toBeInTheDocument();
        expect(screen.getByRole("button", { name: /reload/i })).toBeInTheDocument();
    });

    it("renders custom fallback when provided", () => {
        const customFallback = <div>Custom error message</div>;

        renderWithRouter(
            <ErrorBoundary fallback={customFallback}>
                <ThrowError shouldThrow={true} />
            </ErrorBoundary>
        );

        expect(screen.getByText("Custom error message")).toBeInTheDocument();
        expect(screen.queryByText("Something went wrong")).not.toBeInTheDocument();
    });

    it("logs error to console", () => {
        renderWithRouter(
            <ErrorBoundary>
                <ThrowError shouldThrow={true} />
            </ErrorBoundary>
        );

        expect(console.error).toHaveBeenCalled();
    });

    it("reload button triggers page refresh", () => {
        // Mock window.location.reload
        const reloadMock = vi.fn();
        Object.defineProperty(window, "location", {
            value: { reload: reloadMock },
            writable: true,
        });

        renderWithRouter(
            <ErrorBoundary>
                <ThrowError shouldThrow={true} />
            </ErrorBoundary>
        );

        const reloadButton = screen.getByRole("button", { name: /reload/i });
        fireEvent.click(reloadButton);

        expect(reloadMock).toHaveBeenCalled();
    });
});
