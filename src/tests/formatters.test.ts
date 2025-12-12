import { describe, it, expect } from "vitest";
import { formatDate } from "@lib/formatters";

/**
 * Formatters utility tests.
 * Validates date formatting with various inputs.
 */
describe("formatDate", () => {
    it("formats ISO date string correctly", () => {
        const result = formatDate("2025-12-12");
        expect(result).toBe("December 12, 2025");
    });

    it("formats date with time component", () => {
        const result = formatDate("2025-01-15T14:30:00Z");
        expect(result).toContain("January");
        expect(result).toContain("15");
        expect(result).toContain("2025");
    });

    it("handles single-digit month and day", () => {
        const result = formatDate("2025-03-05");
        expect(result).toBe("March 5, 2025");
    });

    it("formats end of year date", () => {
        const result = formatDate("2025-12-31");
        expect(result).toBe("December 31, 2025");
    });

    it("formats beginning of year date", () => {
        const result = formatDate("2025-01-01");
        expect(result).toBe("January 1, 2025");
    });
});
