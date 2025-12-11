/**
 * @description Generic hook for search, filter, and pagination
 * @details Extracted from ProjectsPage and ThoughtsPage to avoid duplication
 */

import { useState, useMemo } from "react";

interface UseSearchListOptions<T> {
    items: T[];
    searchFields: (keyof T)[];
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

export function useSearchList<T>({
    items,
    searchFields,
    itemsPerPage = 9,
}: UseSearchListOptions<T>): UseSearchListResult<T> {
    const [query, setQuery] = useState("");
    const [visibleCount, setVisibleCount] = useState(itemsPerPage);

    const filtered = useMemo(() => {
        if (!query.trim()) return items;

        const q = query.toLowerCase();
        return items.filter((item) =>
            searchFields.some((field) => {
                const value = item[field];
                if (Array.isArray(value)) {
                    return value.some((v) => String(v).toLowerCase().includes(q));
                }
                return String(value).toLowerCase().includes(q);
            })
        );
    }, [query, items, searchFields]);

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
