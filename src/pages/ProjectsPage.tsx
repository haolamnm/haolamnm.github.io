import { motion } from "framer-motion";
import { projects, type Project } from "@lib/projects";
import { pageContent } from "@lib/content";
import { SearchIcon, GithubIcon, GlobeIcon, CodebergIcon } from "@lib/icons";
import { staggerContainer, fadeInUp, pageEntrance } from "@lib/animations";
import { useSearchList } from "@/hooks/useSearchList";
import GlassCard from "@components/GlassCard";
import Tag from "@components/Tag";
import { SEO } from "@components/SEO";

const content = pageContent.projects;

/** Projects page with Bento Grid layout, search, and pagination */
export default function ProjectsPage() {
    const { query, setQuery, visible, filtered, hasMore, loadMore } = useSearchList({
        items: projects,
        searchFields: ["title", "tags", "description"],
    });

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
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            className="w-full pl-12 pr-4 py-3 glass-card bg-white/5 border-white/10 rounded-xl text-white placeholder:text-zinc-500 focus:outline-none focus:border-white/20"
                        />
                    </div>
                </motion.div>

                <motion.div
                    variants={staggerContainer}
                    initial="hidden"
                    animate="visible"
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
                >
                    {visible.map((project) => (
                        <ProjectCard
                            key={project.id}
                            project={project}
                            className={project.featured ? "md:row-span-2" : ""}
                        />
                    ))}

                    {filtered.length === 0 && (
                        <motion.p
                            variants={fadeInUp}
                            className="col-span-full text-center text-zinc-500 py-12"
                        >
                            {content.emptyState(query)}
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

function ProjectCard({
    project,
    className = "",
}: {
    project: Project;
    className?: string;
}) {
    return (
        <motion.div variants={fadeInUp}>
            <GlassCard className={`h-full flex flex-col ${className}`} variant="hoverable">
                <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag) => (
                        <Tag key={tag} size="md">{tag}</Tag>
                    ))}
                </div>

                <h3 className="text-xl font-bold font-mono text-white mb-2">
                    {project.title}
                </h3>

                <p className="text-zinc-400 text-sm mb-4 flex-grow">
                    {project.description}
                </p>

                <div className="flex gap-3 mt-auto pt-4 border-t border-white/5">
                    {project.github && (
                        <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-sm text-zinc-400 hover:text-white transition-colors"
                            aria-label={`View ${project.title} on GitHub`}
                        >
                            <GithubIcon className="w-4 h-4" />
                            <span>GitHub</span>
                        </a>
                    )}
                    {project.codeberg && (
                        <a
                            href={project.codeberg}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-sm text-zinc-400 hover:text-white transition-colors"
                            aria-label={`View ${project.title} on Codeberg`}
                        >
                            <CodebergIcon className="w-4 h-4" />
                            <span>Codeberg</span>
                        </a>
                    )}
                    {project.website && (
                        <a
                            href={project.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-sm text-zinc-400 hover:text-white transition-colors"
                            aria-label={`Visit ${project.title} website`}
                        >
                            <GlobeIcon className="w-4 h-4" />
                            <span>Website</span>
                        </a>
                    )}
                </div>
            </GlassCard>
        </motion.div>
    );
}
