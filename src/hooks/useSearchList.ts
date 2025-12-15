/**
 * Generic hook for search, filter, and pagination with debouncing.
 * @module useSearchList
 */

import { useState, useMemo, useDeferredValue } from "react";

/** Extract keys where value is string or string[] */
type StringKeys<T> = {
    [K in keyof T]: T[K] extends string | string[] ? K : never;
}[keyof T];

interface UseSearchListOptions<T> {
    /** Items to search through */
    items: T[];
    /** Field names to search within (must be string or string[] fields) */
    searchFields: StringKeys<T>[];
    /** Items per page (default: 9) */
    itemsPerPage?: number;
}

interface UseSearchListResult<T> {
    query: string;
    setQuery: (query: string) => void;
    filtered: T[];
    visible: T[];
    hasMore: boolean;
    loadMore: () => void;
}

const DEFAULT_ITEMS_PER_PAGE = 9;

/**
 * Search, filter, and paginate a list of items.
 * Optimized with React 19's useDeferredValue for high-performance non-blocking filtering.
 * @param options - Configuration options
 * @returns Search state and handlers
 */
export function useSearchList<T>({
    items,
    searchFields,
    itemsPerPage = DEFAULT_ITEMS_PER_PAGE,
}: UseSearchListOptions<T>): UseSearchListResult<T> {
    const [query, setQuery] = useState("");
    const [visibleCount, setVisibleCount] = useState(itemsPerPage);

    // Prioritize input responsiveness (high priority) over filtering (lower priority)
    const deferredQuery = useDeferredValue(query);

    const filtered = useMemo(() => {
        if (!deferredQuery.trim()) return items;

        const q = deferredQuery.toLowerCase();
        return items.filter((item) =>
            searchFields.some((field) => {
                const value = item[field];
                if (Array.isArray(value)) {
                    return value.some((v) => String(v).toLowerCase().includes(q));
                }
                return String(value).toLowerCase().includes(q);
            })
        );
    }, [deferredQuery, items, searchFields]);

    const visible = filtered.slice(0, visibleCount);
    const hasMore = visibleCount < filtered.length;

    const loadMore = () => {
        setVisibleCount((prev) => prev + itemsPerPage);
    };

    return {
        query,
        setQuery,
        filtered,
        visible,
        hasMore,
        loadMore,
    };
}
