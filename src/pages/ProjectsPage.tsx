import { ExternalLink } from "@components/ExternalLink";
import GlassCard from "@components/GlassCard";
import { SearchInput } from "@components/SearchInput";
import { SEOComponent } from "@components/SEO";
import Tag from "@components/Tag";
import { fadeInUp, pageEntrance, staggerContainer } from "@lib/animations";
import { pageContent } from "@lib/content";
import { CodebergIcon, GithubIcon, GlobeIcon, StarIcon } from "@lib/icons";
import { type Project, sortedProjects } from "@lib/projects";
import { motion } from "framer-motion";

import { type StringKeys, useSearchList } from "@/hooks/useSearchList";

const content = pageContent.projects;
const SEARCH_FIELDS: StringKeys<Project>[] = ["title", "tags", "description"];

/** Projects page with Bento Grid layout, search, and pagination */
export default function ProjectsPage() {
  const { query, setQuery, visible, filtered, hasMore, loadMore } = useSearchList({
    items: sortedProjects,
    searchFields: SEARCH_FIELDS,
  });

  return (
    <>
      <SEOComponent title={content.title} description={content.subtitle} />
      <section>
        <motion.div variants={pageEntrance} initial="hidden" animate="visible" className="mb-12">
          <h1 className="mb-4 font-mono text-4xl font-bold md:text-5xl">{content.title}</h1>
          <p className="max-w-2xl text-lg text-zinc-400">{content.subtitle}</p>
          <p className="mt-2 text-sm text-zinc-400">{content.projectCount(sortedProjects.length)}</p>
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

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3"
        >
          {visible.map((project) => (
            <ProjectCard key={project.id} project={project} className={project.featured ? "md:row-span-2" : ""} />
          ))}

          {filtered.length === 0 && (
            <motion.p variants={fadeInUp} className="col-span-full py-12 text-center text-zinc-400">
              {content.emptyState(query)}
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

function ProjectCard({ project, className = "" }: { readonly project: Project; readonly className?: string }) {
  return (
    <motion.div variants={fadeInUp} layout>
      <GlassCard className={`flex h-full flex-col ${className}`} variant="hoverable">
        <div className="mb-4 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <Tag key={tag} size="md">
              {tag}
            </Tag>
          ))}
        </div>

        <h2 className="mb-2 flex items-center gap-2 font-mono text-xl font-bold text-white">
          {project.title}
          {project.featured && <StarIcon className="h-4 w-4 text-amber-300" />}
        </h2>

        <p className="mb-4 grow text-sm text-zinc-400">{project.description}</p>

        <div className="mt-auto flex gap-3 border-t border-white/5 pt-4">
          {project.github && (
            <ExternalLink
              href={project.github}
              label={content.links.github}
              icon={<GithubIcon className="h-4 w-4" />}
              ariaLabel={`View ${project.title} on GitHub`}
            />
          )}
          {project.codeberg && (
            <ExternalLink
              href={project.codeberg}
              label={content.links.codeberg}
              icon={<CodebergIcon className="h-4 w-4" />}
              ariaLabel={`View ${project.title} on Codeberg`}
            />
          )}
          {project.website && (
            <ExternalLink
              href={project.website}
              label={content.links.website}
              icon={<GlobeIcon className="h-4 w-4" />}
              ariaLabel={`Visit ${project.title} website`}
            />
          )}
        </div>
      </GlassCard>
    </motion.div>
  );
}
