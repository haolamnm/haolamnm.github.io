import { motion } from "framer-motion";
import { heroContent } from "@lib/content";
import { staggerContainer, fadeInUp, heroEntrance } from "@lib/animations";

/** Hero section - landing page focal point */
export default function Hero() {
  const { tagline } = heroContent;

  return (
    <section className="min-h-[70vh] flex flex-col items-center justify-center text-center">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="flex flex-col items-center"
      >
        <motion.span
          variants={fadeInUp}
          className="inline-block px-4 py-1.5 mb-6 text-sm font-mono text-zinc-300 glass-card"
        >
          {heroContent.role}
        </motion.span>

        <motion.h1
          variants={heroEntrance}
          className="text-5xl md:text-7xl lg:text-8xl font-bold font-sans tracking-tight mb-6"
        >
          <span className="text-shimmer">{heroContent.name}</span>
        </motion.h1>

        <motion.p
          variants={fadeInUp}
          className="text-xl md:text-2xl text-zinc-300 max-w-xl mb-8"
        >
          {tagline.prefix}{" "}
          <span className="text-white font-semibold">{tagline.emphasis1}</span>{" "}
          {tagline.middle}{" "}
          <span className="text-white font-semibold">{tagline.emphasis2}</span>
          {tagline.suffix}
        </motion.p>

        <motion.p
          variants={fadeInUp}
          className="text-base md:text-lg text-zinc-300 max-w-2xl leading-relaxed"
        >
          {heroContent.description}
        </motion.p>
      </motion.div>
    </section>
  );
}
