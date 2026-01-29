import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { getAllPosts, type PostMeta } from "@lib/posts";
import { formatDate } from "@lib/formatters";
import { pageContent } from "@lib/content";
import { CalendarIcon, ArrowRightIcon } from "@lib/icons";
import { staggerContainer, fadeInUp, pageEntrance } from "@lib/animations";
import { useSearchList, type StringKeys } from "@/hooks/useSearchList";
import GlassCard from "@components/GlassCard";
import Tag from "@components/Tag";
import { SEOComponent } from "@components/SEO";
import { SearchInput } from "@components/SearchInput";

const content = pageContent.thoughts;
const SEARCH_FIELDS: StringKeys<PostMeta>[] = ["title", "excerpt", "tags"];

/** Blog listing with search and pagination */
export default function ThoughtsPage() {
  const allPosts = getAllPosts();
  const { query, setQuery, visible, filtered, hasMore, loadMore } =
    useSearchList({
      items: allPosts,
      searchFields: SEARCH_FIELDS,
    });

  return (
    <>
      <SEOComponent title={content.title} description={content.subtitle} />
      <section>
        <motion.div
          variants={pageEntrance}
          initial="hidden"
          animate="visible"
          className="mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold font-mono mb-4">
            {content.title}
          </h1>
          <p className="text-zinc-400 text-lg max-w-2xl">{content.subtitle}</p>
        </motion.div>

        <motion.div
          variants={pageEntrance}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <SearchInput
            value={query}
            onChange={setQuery}
            placeholder={content.searchPlaceholder}
          />
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="space-y-4"
        >
          {visible.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}

          {filtered.length === 0 && (
            <motion.p
              variants={fadeInUp}
              className="text-center text-zinc-400 py-12"
            >
              {allPosts.length === 0
                ? content.emptyDefault
                : content.emptyState(query)}
            </motion.p>
          )}
        </motion.div>

        {hasMore && (
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            className="flex justify-center mt-8"
          >
            <button
              onClick={loadMore}
              className="glass-button px-6 py-3 text-zinc-400 hover:text-white transition-colors"
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
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="grow">
              <div className="flex flex-wrap gap-2 mb-2">
                {post.tags.map((tag) => (
                  <Tag key={tag}>{tag}</Tag>
                ))}
              </div>

              <h2 className="text-xl font-bold font-mono text-white mb-2 group-hover:text-zinc-200 transition-colors">
                {post.title}
              </h2>

              <p className="text-zinc-400 text-sm line-clamp-2">
                {post.excerpt}
              </p>
            </div>

            <div className="flex items-center gap-4 md:flex-col md:items-end">
              <div className="flex items-center gap-2 text-sm text-zinc-400">
                <CalendarIcon className="w-4 h-4" />
                <span>{formattedDate}</span>
              </div>
              <ArrowRightIcon className="w-5 h-5 text-zinc-400 group-hover:text-white group-hover:translate-x-1 transition-all" />
            </div>
          </div>
        </GlassCard>
      </Link>
    </motion.div>
  );
}
