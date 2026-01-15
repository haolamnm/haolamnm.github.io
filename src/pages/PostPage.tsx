import { useParams, Link } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { getPostBySlug, type Post } from "@lib/posts";
import { asPostSlug } from "@lib/types";
import { formatDate } from "@lib/formatters";
import { pageContent, buildArticleJsonLd } from "@lib/content";
import { pageEntrance } from "@lib/animations";
import { ArrowLeftIcon, CalendarIcon } from "@lib/icons";
import Tag from "@components/Tag";
import { SEO } from "@components/SEO";

const content = pageContent.post;

/** Individual blog post page with async loading and error recovery */
export default function PostPage() {
    const { slug } = useParams<{ slug: string }>();
    const [post, setPost] = useState<Post | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    const loadPost = useCallback(async () => {
        if (!slug) {
            setLoading(false);
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const result = await getPostBySlug(asPostSlug(slug));
            setPost(result);
        } catch (err) {
            setError(err as Error);
        } finally {
            setLoading(false);
        }
    }, [slug]);

    useEffect(() => {
        loadPost();
    }, [loadPost]);

    if (loading) {
        return (
            <motion.div
                variants={pageEntrance}
                initial="hidden"
                animate="visible"
                className="text-center py-24"
            >
                <div className="text-zinc-400">{content.loading}</div>
            </motion.div>
        );
    }

    if (error) {
        return (
            <motion.div
                variants={pageEntrance}
                initial="hidden"
                animate="visible"
                className="text-center py-24"
            >
                <h1 className="text-4xl font-bold font-mono mb-4">{content.error.title}</h1>
                <p className="text-zinc-400 mb-8">
                    {content.error.description}
                </p>
                <button
                    onClick={loadPost}
                    className="inline-flex items-center gap-2 px-4 py-2 glass-card text-white hover:bg-white/10 transition-colors"
                >
                    {content.error.retry}
                </button>
            </motion.div>
        );
    }

    if (!post) {
        return (
            <motion.div
                variants={pageEntrance}
                initial="hidden"
                animate="visible"
                className="text-center py-24"
            >
                <h1 className="text-4xl font-bold font-mono mb-4">{content.notFound.title}</h1>
                <p className="text-zinc-400 mb-8">
                    {content.notFound.description}
                </p>
                <Link
                    to="/thoughts"
                    className="inline-flex items-center gap-2 text-white hover:text-zinc-300 transition-colors"
                >
                    <ArrowLeftIcon className="w-4 h-4" />
                    {content.notFound.backLink}
                </Link>
            </motion.div>
        );
    }

    const formattedDate = formatDate(post.date);

    const { Content } = post;

    return (
        <>
            <SEO
                title={post.title}
                description={post.excerpt}
                type="article"
                jsonLd={buildArticleJsonLd(post.title, post.date, post.excerpt)}
            />
            <motion.article
                variants={pageEntrance}
                initial="hidden"
                animate="visible"
                className="max-w-3xl mx-auto"
            >
                <Link
                    to="/thoughts"
                    className="inline-flex items-center gap-2 text-zinc-400 hover:text-white transition-colors mb-8"
                >
                    <ArrowLeftIcon className="w-4 h-4" />
                    {content.backLink}
                </Link>

                <header className="mb-12">
                    <div className="flex flex-wrap gap-2 mb-4">
                        {post.tags.map((tag) => (
                            <Tag key={tag} size="md">{tag}</Tag>
                        ))}
                    </div>

                    <h1 className="text-4xl md:text-5xl font-bold font-mono mb-4">
                        {post.title}
                    </h1>

                    <div className="flex items-center gap-2 text-zinc-400">
                        <CalendarIcon className="w-4 h-4" />
                        <time dateTime={post.date}>{formattedDate}</time>
                    </div>
                </header>

                <div className="prose-content">
                    <Content />
                </div>
            </motion.article>
        </>
    );
}
