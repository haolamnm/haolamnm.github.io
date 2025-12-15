import { motion } from "framer-motion";
import { projects, type Project } from "@lib/projects";
import { pageContent } from "@lib/content";
import { GithubIcon, GlobeIcon, CodebergIcon } from "@lib/icons";
import { staggerContainer, fadeInUp, pageEntrance } from "@lib/animations";
import { useSearchList } from "@/hooks/useSearchList";
import GlassCard from "@components/GlassCard";
import Tag from "@components/Tag";
import { SEO } from "@components/SEO";
import { SearchInput } from "@components/SearchInput";
import { ExternalLink } from "@components/ExternalLink";

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
                            className="col-span-full text-center text-zinc-400 py-12"
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
        <motion.div variants={fadeInUp} layout>
            <GlassCard className={`h-full flex flex-col ${className}`} variant="hoverable">
                <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag) => (
                        <Tag key={tag} size="md">{tag}</Tag>
                    ))}
                </div>

                <h2 className="text-xl font-bold font-mono text-white mb-2">
                    {project.title}
                </h2>

                <p className="text-zinc-400 text-sm mb-4 grow">
                    {project.description}
                </p>

                <div className="flex gap-3 mt-auto pt-4 border-t border-white/5">
                    {project.github && (
                        <ExternalLink
                            href={project.github}
                            label={content.links.github}
                            icon={<GithubIcon className="w-4 h-4" />}
                            ariaLabel={`View ${project.title} on GitHub`}
                        />
                    )}
                    {project.codeberg && (
                        <ExternalLink
                            href={project.codeberg}
                            label={content.links.codeberg}
                            icon={<CodebergIcon className="w-4 h-4" />}
                            ariaLabel={`View ${project.title} on Codeberg`}
                        />
                    )}
                    {project.website && (
                        <ExternalLink
                            href={project.website}
                            label={content.links.website}
                            icon={<GlobeIcon className="w-4 h-4" />}
                            ariaLabel={`Visit ${project.title} website`}
                        />
                    )}
                </div>
            </GlassCard>
        </motion.div>
    );
}
