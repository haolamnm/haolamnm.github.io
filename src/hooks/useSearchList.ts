/**
 * Generic hook for search, filter, and pagination with debouncing.
 * @module useSearchList
 */

import { useState, useMemo } from "react";
import { useDebounce } from "./useDebounce";

interface UseSearchListOptions<T> {
    /** Items to search through */
    items: T[];
    /** Field names to search within */
    searchFields: (keyof T)[];
    /** Items per page (default: 9) */
    itemsPerPage?: number;
    /** Debounce delay in ms (default: 300) */
    debounceMs?: number;
}

interface UseSearchListResult<T> {
    query: string;
    setQuery: (query: string) => void;
    filtered: T[];
    visible: T[];
    hasMore: boolean;
    loadMore: () => void;
}

/**
 * Search, filter, and paginate a list of items.
 * @param options - Configuration options
 * @returns Search state and handlers
 */
export function useSearchList<T>({
    items,
    searchFields,
    itemsPerPage = 9,
    debounceMs = 300,
}: UseSearchListOptions<T>): UseSearchListResult<T> {
    const [query, setQuery] = useState("");
    const [visibleCount, setVisibleCount] = useState(itemsPerPage);

    const debouncedQuery = useDebounce(query, debounceMs);

    const filtered = useMemo(() => {
        if (!debouncedQuery.trim()) return items;

        const q = debouncedQuery.toLowerCase();
        return items.filter((item) =>
            searchFields.some((field) => {
                const value = item[field];
                if (Array.isArray(value)) {
                    return value.some((v) => String(v).toLowerCase().includes(q));
                }
                return String(value).toLowerCase().includes(q);
            })
        );
    }, [debouncedQuery, items, searchFields]);

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
