import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useDebounce } from "@/hooks/useDebounce";

/**
 * useDebounce hook tests.
 * Validates debouncing behavior with fake timers.
 */
describe("useDebounce", () => {
    beforeEach(() => {
        vi.useFakeTimers();
    });

    afterEach(() => {
        vi.useRealTimers();
    });

    it("returns initial value immediately", () => {
        const { result } = renderHook(() => useDebounce("initial", 300));
        expect(result.current).toBe("initial");
    });

    it("debounces value updates", () => {
        const { result, rerender } = renderHook(
            ({ value }) => useDebounce(value, 300),
            { initialProps: { value: "first" } }
        );

        expect(result.current).toBe("first");

        rerender({ value: "second" });
        expect(result.current).toBe("first");

        act(() => {
            vi.advanceTimersByTime(299);
        });
        expect(result.current).toBe("first");

        act(() => {
            vi.advanceTimersByTime(1);
        });
        expect(result.current).toBe("second");
    });

    it("resets timer on rapid updates", () => {
        const { result, rerender } = renderHook(
            ({ value }) => useDebounce(value, 300),
            { initialProps: { value: "a" } }
        );

        rerender({ value: "b" });
        act(() => {
            vi.advanceTimersByTime(200);
        });

        rerender({ value: "c" });
        act(() => {
            vi.advanceTimersByTime(200);
        });

        expect(result.current).toBe("a");

        act(() => {
            vi.advanceTimersByTime(100);
        });
        expect(result.current).toBe("c");
    });

    it("uses default delay of 300ms", () => {
        const { result, rerender } = renderHook(
            ({ value }) => useDebounce(value),
            { initialProps: { value: "initial" } }
        );

        rerender({ value: "updated" });

        act(() => {
            vi.advanceTimersByTime(299);
        });
        expect(result.current).toBe("initial");

        act(() => {
            vi.advanceTimersByTime(1);
        });
        expect(result.current).toBe("updated");
    });
});
