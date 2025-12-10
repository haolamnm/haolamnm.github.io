import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { getPostBySlug } from "@lib/posts";
import { pageEntrance } from "@lib/animations";
import { ArrowLeftIcon, CalendarIcon } from "@lib/icons";
import Tag from "@components/Tag";
import { SEO } from "@components/SEO";

/**
 * @description Individual blog post page
 */
export default function PostPage() {
    const { slug } = useParams<{ slug: string }>();
    const post = slug ? getPostBySlug(slug) : null;

    if (!post) {
        return (
            <motion.div
                variants={pageEntrance}
                initial="hidden"
                animate="visible"
                className="text-center py-24"
            >
                <h1 className="text-4xl font-bold font-mono mb-4">Post Not Found</h1>
                <p className="text-zinc-400 mb-8">
                    The post you're looking for doesn't exist.
                </p>
                <Link
                    to="/thoughts"
                    className="inline-flex items-center gap-2 text-white hover:text-zinc-300 transition-colors"
                >
                    <ArrowLeftIcon className="w-4 h-4" />
                    Back to Thoughts
                </Link>
            </motion.div>
        );
    }

    const formattedDate = new Date(post.date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });

    const { Content } = post;

    return (
        <>
            <SEO title={post.title} description={post.excerpt} type="article" />
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
                    Back to Thoughts
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
