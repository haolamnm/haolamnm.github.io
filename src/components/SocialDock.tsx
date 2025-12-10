import { motion } from "framer-motion";
import { socialLinks } from "@lib/config";
import {
    GithubIcon,
    LinkedinIcon,
    FacebookIcon,
    MailIcon,
    FileTextIcon,
} from "@lib/icons";

/**
 * @description Mac-style floating social dock with icon links
 */
const iconMap = {
    github: <GithubIcon />,
    linkedin: <LinkedinIcon />,
    facebook: <FacebookIcon />,
    email: <MailIcon className="w-5 h-5" />,
    resume: <FileTextIcon className="w-5 h-5" />,
} as const;

export default function SocialDock() {
    return (
        <motion.nav
            className="fixed bottom-6 left-0 right-0 z-50 flex justify-center"
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
                        className={`flex items-center justify-center w-10 h-10 rounded-xl transition-colors duration-200 ${"isPrimary" in link
                            ? "bg-white/10 border border-white/20 text-white shadow-lg shadow-white/5"
                            : "text-zinc-400 hover:text-white hover:bg-white/5"
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
