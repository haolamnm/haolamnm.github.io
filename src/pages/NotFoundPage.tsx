import { pageEntrance } from "@lib/animations";
import { pageContent } from "@lib/content";
import { ArrowLeftIcon, HomeIcon } from "@lib/icons";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

/** 404 page with navigation back to safe pages */
export default function NotFoundPage() {
  return (
    <motion.div
      variants={pageEntrance}
      initial="hidden"
      animate="visible"
      className="flex min-h-[60vh] flex-col items-center justify-center text-center"
    >
      <h1 className="mb-4 font-mono text-8xl font-bold text-white/10" aria-hidden="true">
        {pageContent.notFound.title}
      </h1>
      <h2 className="mb-4 text-2xl font-semibold text-white">{pageContent.notFound.subtitle}</h2>
      <p className="mb-8 max-w-md text-zinc-400">{pageContent.notFound.description}</p>

      <div className="flex gap-4">
        <Link
          to="/"
          className="glass-card inline-flex items-center gap-2 px-4 py-2 text-white transition-colors hover:bg-white/10"
        >
          <HomeIcon className="h-4 w-4" />
          {pageContent.notFound.goHome}
        </Link>
        <button
          onClick={() => globalThis.history.back()}
          className="inline-flex items-center gap-2 px-4 py-2 text-zinc-400 transition-colors hover:text-white"
        >
          <ArrowLeftIcon className="h-4 w-4" />
          {pageContent.notFound.goBack}
        </button>
      </div>
    </motion.div>
  );
}
