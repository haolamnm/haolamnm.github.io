/**
 * @description mdx.d.ts - extends Vitest types with jest-dom matchers
 * @details Provides TypeScript support for custom matchers like toBeInTheDocument()
 */
declare module "*.mdx" {
    import type { ComponentType, ReactNode, HTMLAttributes } from "react";

    export const frontmatter: {
        title: string;
        date: string;
        excerpt: string;
        tags: string[];
    };

    // Allows overriding MDX elements (like pre for copy button)
    interface MDXProps {
        components?: Record<
            string,
            ComponentType<HTMLAttributes<HTMLElement> & { children?: ReactNode }>
        >;
    }

    const MDXComponent: ComponentType<MDXProps>;
    export default MDXComponent;
}
