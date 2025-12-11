/**
 * Formatting utilities for consistent display across the app.
 * @module formatters
 */

/**
 * Format a date string for display.
 * @param dateString - ISO date string or any parseable date format
 * @returns Formatted date like "December 12, 2025"
 */
export function formatDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });
}
