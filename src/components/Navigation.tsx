import { NavLink, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { navItems } from "@lib/config";

/** Navigation with glass styling and active indicator */
export default function Navigation() {
    const location = useLocation();

    const getActiveIndex = () => {
        return navItems.findIndex((item) =>
            item.path === "/"
                ? location.pathname === "/"
                : location.pathname === item.path || location.pathname.startsWith(`${item.path}/`)
        );
    };

    const activeIndex = getActiveIndex();

    return (
        <header className="fixed top-0 left-0 right-0 z-50">
            <nav className="glass-card mx-4 mt-4 md:mx-auto md:max-w-fit px-2 py-3 md:px-4 rounded-xl border-white/10">
                <ul className="flex items-center justify-center gap-1 md:gap-2">
                    {navItems.map((item, index) => (
                        <li key={item.path}>
                            <NavLink
                                to={item.path}
                                className={({ isActive }) =>
                                    `relative px-4 py-2 rounded-lg font-medium text-sm md:text-base transition-colors ${isActive ? "text-white" : "text-zinc-400 hover:text-zinc-200"
                                    }`
                                }
                            >
                                {item.label}
                                {activeIndex === index && (
                                    <motion.div
                                        layoutId="active-nav"
                                        className="absolute inset-0 bg-white/10 rounded-lg -z-10"
                                        initial={false}
                                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                    />
                                )}
                            </NavLink>
                        </li>
                    ))}
                </ul>
            </nav>
        </header>
    );
}
