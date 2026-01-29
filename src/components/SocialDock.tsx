import { socialLinks } from "@lib/config";
import { FacebookIcon, FileTextIcon, GithubIcon, LinkedinIcon, MailIcon } from "@lib/icons";
import { motion } from "framer-motion";

const iconMap = {
  github: <GithubIcon />,
  linkedin: <LinkedinIcon />,
  facebook: <FacebookIcon />,
  email: <MailIcon className="h-5 w-5" />,
  resume: <FileTextIcon className="h-5 w-5" />,
};

/** Mac-style floating social dock */
export default function SocialDock() {
  return (
    <motion.nav
      className="fixed right-0 bottom-6 left-0 z-50 flex justify-center"
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.5, type: "spring", stiffness: 200, damping: 25 }}
      aria-label="Social links"
    >
      <div className="glass-card flex items-center gap-1 p-2">
        {socialLinks.map((link) => (
          <motion.a
            key={link.label}
            href={link.href}
            target={link.href.startsWith("http") ? "_blank" : undefined}
            rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
            aria-label={link.label}
            title={link.label}
            className={`flex h-10 w-10 items-center justify-center rounded-xl transition-colors duration-200 ${
              link.isPrimary === true
                ? "border border-white/20 bg-white/10 text-white shadow-lg shadow-white/5"
                : "text-zinc-400 hover:bg-white/5 hover:text-white"
            }`}
            whileHover={{ scale: 1.15, y: -2 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            {iconMap[link.platform]}
          </motion.a>
        ))}
      </div>
    </motion.nav>
  );
}
