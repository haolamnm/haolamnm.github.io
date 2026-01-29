import { fadeInUp, heroEntrance, staggerContainer } from "@lib/animations";
import { heroContent } from "@lib/content";
import { motion } from "framer-motion";

/** Hero section - landing page focal point */
export default function Hero() {
  const { tagline } = heroContent;

  return (
    <section className="flex min-h-[70vh] flex-col items-center justify-center text-center">
      <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="flex flex-col items-center">
        <motion.span
          variants={fadeInUp}
          className="glass-card mb-6 inline-block px-4 py-1.5 font-mono text-sm text-zinc-300"
        >
          {heroContent.role}
        </motion.span>

        <motion.h1
          variants={heroEntrance}
          className="mb-6 font-sans text-5xl font-bold tracking-tight md:text-7xl lg:text-8xl"
        >
          <span className="text-shimmer">{heroContent.name}</span>
        </motion.h1>

        <motion.p variants={fadeInUp} className="mb-8 max-w-xl text-xl text-zinc-300 md:text-2xl">
          {tagline.prefix} <span className="font-semibold text-white">{tagline.emphasis1}</span> {tagline.middle}{" "}
          <span className="font-semibold text-white">{tagline.emphasis2}</span>
          {tagline.suffix}
        </motion.p>

        <motion.p variants={fadeInUp} className="max-w-2xl text-base leading-relaxed text-zinc-300 md:text-lg">
          {heroContent.description}
        </motion.p>
      </motion.div>
    </section>
  );
}
