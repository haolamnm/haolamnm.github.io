import GlassCard from "@components/GlassCard";
import { SearchInput } from "@components/SearchInput";
import { SEOComponent } from "@components/SEO";
import Tag from "@components/Tag";
import { fadeInUp, pageEntrance, staggerContainer } from "@lib/animations";
import { pageContent } from "@lib/content";
import { formatDate } from "@lib/formatters";
import { ArrowRightIcon, CalendarIcon } from "@lib/icons";
import { getAllPosts, type PostMeta } from "@lib/posts";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

import { type StringKeys, useSearchList } from "@/hooks/useSearchList";

const content = pageContent.thoughts;
const SEARCH_FIELDS: StringKeys<PostMeta>[] = ["title", "excerpt", "tags"];

/** Blog listing with search and pagination */
export default function ThoughtsPage() {
  const allPosts = getAllPosts();
  const { query, setQuery, visible, filtered, hasMore, loadMore } = useSearchList({
    items: allPosts,
    searchFields: SEARCH_FIELDS,
  });

  return (
    <>
      <SEOComponent title={content.title} description={content.subtitle} />
      <section>
        <motion.div variants={pageEntrance} initial="hidden" animate="visible" className="mb-12">
          <h1 className="mb-4 font-mono text-4xl font-bold md:text-5xl">{content.title}</h1>
          <p className="max-w-2xl text-lg text-zinc-400">{content.subtitle}</p>
        </motion.div>

        <motion.div
          variants={pageEntrance}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <SearchInput value={query} onChange={setQuery} placeholder={content.searchPlaceholder} />
        </motion.div>

        <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="space-y-4">
          {visible.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}

          {filtered.length === 0 && (
            <motion.p variants={fadeInUp} className="py-12 text-center text-zinc-400">
              {allPosts.length === 0 ? content.emptyDefault : content.emptyState(query)}
            </motion.p>
          )}
        </motion.div>

        {hasMore && (
          <motion.div variants={fadeInUp} initial="hidden" animate="visible" className="mt-8 flex justify-center">
            <button
              onClick={loadMore}
              className="glass-button px-6 py-3 text-zinc-400 transition-colors hover:text-white"
            >
              {content.loadMore}
            </button>
          </motion.div>
        )}
      </section>
    </>
  );
}

function PostCard({ post }: { readonly post: PostMeta }) {
  const formattedDate = formatDate(post.date);

  return (
    <motion.div variants={fadeInUp} data-testid="post-card" layout>
      <Link to={`/thoughts/${post.slug}`}>
        <GlassCard className="group">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="grow">
              <div className="mb-2 flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <Tag key={tag}>{tag}</Tag>
                ))}
              </div>

              <h2 className="mb-2 font-mono text-xl font-bold text-white transition-colors group-hover:text-zinc-200">
                {post.title}
              </h2>

              <p className="line-clamp-2 text-sm text-zinc-400">{post.excerpt}</p>
            </div>

            <div className="flex items-center gap-4 md:flex-col md:items-end">
              <div className="flex items-center gap-2 text-sm text-zinc-400">
                <CalendarIcon className="h-4 w-4" />
                <span>{formattedDate}</span>
              </div>
              <ArrowRightIcon className="h-5 w-5 text-zinc-400 transition-all group-hover:translate-x-1 group-hover:text-white" />
            </div>
          </div>
        </GlassCard>
      </Link>
    </motion.div>
  );
}
