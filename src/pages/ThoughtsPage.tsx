import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { getAllPosts, type PostMeta } from "@lib/posts";
import { pageContent } from "@lib/content";
import { SearchIcon, CalendarIcon, ArrowRightIcon } from "@lib/icons";
import { staggerContainer, fadeInUp, pageEntrance } from "@lib/animations";
import GlassCard from "@components/GlassCard";
import Tag from "@components/Tag";
import { SEO } from "@components/SEO";

const ITEMS_PER_PAGE = 9;
const content = pageContent.thoughts;

/**
 * @description Thoughts page - blog listing with search and pagination
 * @details Pagination: Reduces initial DOM size and JS execution time for better Core Web Vitals
 */
export default function ThoughtsPage() {
    const allPosts = getAllPosts();
    const [searchQuery, setSearchQuery] = useState("");
    const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);

    const filteredPosts = useMemo(() => {
        if (!searchQuery.trim()) return allPosts;

        const query = searchQuery.toLowerCase();
        return allPosts.filter(
            (post) =>
                post.title.toLowerCase().includes(query) ||
                post.excerpt.toLowerCase().includes(query) ||
                (post.tags ?? []).some((tag) => tag.toLowerCase().includes(query))
        );
    }, [searchQuery, allPosts]);

    const visiblePosts = filteredPosts.slice(0, visibleCount);
    const hasMore = visibleCount < filteredPosts.length;

    const handleLoadMore = () => {
        setVisibleCount((prev) => prev + ITEMS_PER_PAGE);
    };

    return (
        <>
            <SEO title={content.title} description={content.subtitle} />
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
                    <p className="text-zinc-400 text-lg max-w-2xl">
                        {content.subtitle}
                    </p>
                </motion.div>

                <motion.div
                    variants={pageEntrance}
                    initial="hidden"
                    animate="visible"
                    transition={{ delay: 0.1 }}
                    className="mb-8"
                >
                    <div className="relative max-w-md">
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 z-10 text-zinc-500 pointer-events-none">
                            <SearchIcon />
                        </div>
                        <input
                            type="text"
                            placeholder={content.searchPlaceholder}
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-12 pr-4 py-3 glass-card bg-white/5 border-white/10 rounded-xl text-white placeholder:text-zinc-500 focus:outline-none focus:border-white/20"
                        />
                    </div>
                </motion.div>

                <motion.div
                    variants={staggerContainer}
                    initial="hidden"
                    animate="visible"
                    className="space-y-4"
                >
                    {visiblePosts.map((post) => (
                        <PostCard key={post.slug} post={post} />
                    ))}

                    {filteredPosts.length === 0 && (
                        <motion.p variants={fadeInUp} className="text-center text-zinc-500 py-12">
                            {allPosts.length === 0
                                ? content.emptyDefault
                                : content.emptyState(searchQuery)}
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
                            onClick={handleLoadMore}
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

function PostCard({ post }: { post: PostMeta }) {
    const formattedDate = new Date(post.date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });

    return (
        <motion.div variants={fadeInUp}>
            <Link to={`/thoughts/${post.slug}`}>
                <GlassCard className="group">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <div className="flex-grow">
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
                            <div className="flex items-center gap-2 text-sm text-zinc-500">
                                <CalendarIcon className="w-4 h-4" />
                                <span>{formattedDate}</span>
                            </div>
                            <ArrowRightIcon className="w-5 h-5 text-zinc-500 group-hover:text-white group-hover:translate-x-1 transition-all" />
                        </div>
                    </div>
                </GlassCard>
            </Link>
        </motion.div>
    );
}

