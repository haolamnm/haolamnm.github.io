import { SEOComponent } from "@components/SEO";
import Tag from "@components/Tag";
import { pageEntrance } from "@lib/animations";
import { buildArticleJsonLd, pageContent } from "@lib/content";
import { formatDate } from "@lib/formatters";
import { ArrowLeftIcon, CalendarIcon } from "@lib/icons";
import { getPostBySlug, type Post } from "@lib/posts";
import { asPostSlug } from "@lib/types";
import { motion } from "framer-motion";
import { useCallback, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

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
    loadPost().catch(() => {
      // Error already handled in loadPost via setError
    });
  }, [loadPost]);

  if (loading) {
    return (
      <motion.div variants={pageEntrance} initial="hidden" animate="visible" className="py-24 text-center">
        <div className="text-zinc-400">{content.loading}</div>
      </motion.div>
    );
  }

  if (error) {
    return (
      <motion.div variants={pageEntrance} initial="hidden" animate="visible" className="py-24 text-center">
        <h1 className="mb-4 font-mono text-4xl font-bold">{content.error.title}</h1>
        <p className="mb-8 text-zinc-400">{content.error.description}</p>
        <button
          onClick={() => {
            loadPost().catch(() => {
              // Error handled in loadPost
            });
          }}
          className="glass-card inline-flex items-center gap-2 px-4 py-2 text-white transition-colors hover:bg-white/10"
        >
          {content.error.retry}
        </button>
      </motion.div>
    );
  }

  if (!post) {
    return (
      <motion.div variants={pageEntrance} initial="hidden" animate="visible" className="py-24 text-center">
        <h1 className="mb-4 font-mono text-4xl font-bold">{content.notFound.title}</h1>
        <p className="mb-8 text-zinc-400">{content.notFound.description}</p>
        <Link
          to="/thoughts"
          className="inline-flex items-center gap-2 text-white transition-colors hover:text-zinc-300"
        >
          <ArrowLeftIcon className="h-4 w-4" />
          {content.notFound.backLink}
        </Link>
      </motion.div>
    );
  }

  const formattedDate = formatDate(post.date);

  const { Content } = post;

  return (
    <>
      <SEOComponent
        title={post.title}
        description={post.excerpt}
        type="article"
        jsonLd={buildArticleJsonLd(post.title, post.date, post.excerpt)}
      />
      <motion.article variants={pageEntrance} initial="hidden" animate="visible" className="mx-auto max-w-3xl">
        <Link
          to="/thoughts"
          className="mb-8 inline-flex items-center gap-2 text-zinc-400 transition-colors hover:text-white"
        >
          <ArrowLeftIcon className="h-4 w-4" />
          {content.backLink}
        </Link>

        <header className="mb-12">
          <div className="mb-4 flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <Tag key={tag} size="md">
                {tag}
              </Tag>
            ))}
          </div>

          <h1 className="mb-4 font-mono text-4xl font-bold md:text-5xl">{post.title}</h1>

          <div className="flex items-center gap-2 text-zinc-400">
            <CalendarIcon className="h-4 w-4" />
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
