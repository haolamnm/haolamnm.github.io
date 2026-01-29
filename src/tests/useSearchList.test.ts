import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useSearchList } from "@/hooks/useSearchList";

interface TestItem {
  id: number;
  title: string;
  tags: string[];
}

const testItems: TestItem[] = [
  { id: 1, title: "React Fundamentals", tags: ["react", "javascript"] },
  { id: 2, title: "Vue.js Guide", tags: ["vue", "javascript"] },
  { id: 3, title: "Python Basics", tags: ["python", "backend"] },
  { id: 4, title: "TypeScript Tips", tags: ["typescript", "javascript"] },
  { id: 5, title: "Node.js Server", tags: ["nodejs", "backend"] },
];

/**
 * useSearchList hook tests.
 * Validates search filtering, pagination, and edge cases.
 */
describe("useSearchList", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("returns all items when query is empty", () => {
    const { result } = renderHook(() =>
      useSearchList({
        items: testItems,
        searchFields: ["title", "tags"],
      })
    );

    expect(result.current.filtered).toHaveLength(5);
    expect(result.current.query).toBe("");
  });

  it("filters items by string field", () => {
    const { result } = renderHook(() =>
      useSearchList({
        items: testItems,
        searchFields: ["title"],
      })
    );

    act(() => {
      result.current.setQuery("react");
    });

    act(() => {
      vi.advanceTimersByTime(300);
    });

    expect(result.current.filtered).toHaveLength(1);
    expect(result.current.filtered[0].title).toBe("React Fundamentals");
  });

  it("filters items by array field (tags)", () => {
    const { result } = renderHook(() =>
      useSearchList({
        items: testItems,
        searchFields: ["tags"],
      })
    );

    act(() => {
      result.current.setQuery("javascript");
    });

    act(() => {
      vi.advanceTimersByTime(300);
    });

    expect(result.current.filtered).toHaveLength(3);
  });

  it("is case insensitive", () => {
    const { result } = renderHook(() =>
      useSearchList({
        items: testItems,
        searchFields: ["title"],
      })
    );

    act(() => {
      result.current.setQuery("PYTHON");
    });

    act(() => {
      vi.advanceTimersByTime(300);
    });

    expect(result.current.filtered).toHaveLength(1);
    expect(result.current.filtered[0].title).toBe("Python Basics");
  });

  it("respects itemsPerPage for pagination", () => {
    const { result } = renderHook(() =>
      useSearchList({
        items: testItems,
        searchFields: ["title"],
        itemsPerPage: 2,
      })
    );

    expect(result.current.visible).toHaveLength(2);
    expect(result.current.hasMore).toBe(true);
  });

  it("loadMore increases visible items", () => {
    const { result } = renderHook(() =>
      useSearchList({
        items: testItems,
        searchFields: ["title"],
        itemsPerPage: 2,
      })
    );

    expect(result.current.visible).toHaveLength(2);

    act(() => {
      result.current.loadMore();
    });

    expect(result.current.visible).toHaveLength(4);
    expect(result.current.hasMore).toBe(true);

    act(() => {
      result.current.loadMore();
    });

    expect(result.current.visible).toHaveLength(5);
    expect(result.current.hasMore).toBe(false);
  });

  it("returns empty array for no matches", () => {
    const { result } = renderHook(() =>
      useSearchList({
        items: testItems,
        searchFields: ["title"],
      })
    );

    act(() => {
      result.current.setQuery("nonexistent");
    });

    act(() => {
      vi.advanceTimersByTime(300);
    });

    expect(result.current.filtered).toHaveLength(0);
    expect(result.current.visible).toHaveLength(0);
    expect(result.current.hasMore).toBe(false);
  });

  it("handles whitespace-only query as empty", () => {
    const { result } = renderHook(() =>
      useSearchList({
        items: testItems,
        searchFields: ["title"],
      })
    );

    act(() => {
      result.current.setQuery("   ");
    });

    act(() => {
      vi.advanceTimersByTime(300);
    });

    expect(result.current.filtered).toHaveLength(5);
  });
});
