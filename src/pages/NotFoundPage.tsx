import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { HomeIcon, ArrowLeftIcon } from "@lib/icons";
import { pageContent } from "@lib/content";

/**
 * @description 404 page for missing routes
 * @remarks Provides navigation back to safe pages
 */
export default function NotFoundPage() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="min-h-[60vh] flex flex-col items-center justify-center text-center"
        >
            <h1 className="text-8xl font-bold font-mono text-white/10 mb-4">
                {pageContent.notFound.title}
            </h1>
            <h2 className="text-2xl font-semibold text-white mb-4">
                {pageContent.notFound.subtitle}
            </h2>
            <p className="text-zinc-400 mb-8 max-w-md">
                {pageContent.notFound.description}
            </p>

            <div className="flex gap-4">
                <Link
                    to="/"
                    className="inline-flex items-center gap-2 px-4 py-2 glass-card text-white hover:bg-white/10 transition-colors"
                >
                    <HomeIcon className="w-4 h-4" />
                    {pageContent.notFound.goHome}
                </Link>
                <button
                    onClick={() => window.history.back()}
                    className="inline-flex items-center gap-2 px-4 py-2 text-zinc-400 hover:text-white transition-colors"
                >
                    <ArrowLeftIcon className="w-4 h-4" />
                    {pageContent.notFound.goBack}
                </button>
            </div>
        </motion.div>
    );
}
