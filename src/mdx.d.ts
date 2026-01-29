/** MDX module type declarations for TypeScript */
declare module "*.mdx" {
  import type { ComponentType, ReactNode, HTMLAttributes } from "react";

  export const frontmatter: {
    title: string;
    date: string;
    excerpt: string;
    tags: string[];
  };

  interface MDXProps {
    components?: Record<
      string,
      ComponentType<HTMLAttributes<HTMLElement> & { children?: ReactNode }>
    >;
  }

  const MDXComponent: ComponentType<MDXProps>;
  export default MDXComponent;
}
