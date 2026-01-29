import { navIndicator, navIndicatorTransition } from "@lib/animations";
import { navItems } from "@lib/config";
import { AnimatePresence, motion } from "framer-motion";
import { NavLink, useLocation } from "react-router-dom";

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
    <header className="fixed top-0 right-0 left-0 z-50">
      <nav className="glass-card mx-4 mt-4 rounded-xl border-white/10 px-2 py-3 md:mx-auto md:max-w-fit md:px-4">
        <ul className="flex items-center justify-center gap-1 md:gap-2">
          {navItems.map((item, index) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `relative rounded-lg px-4 py-2 text-sm font-medium transition-colors md:text-base ${
                    isActive ? "text-white" : "text-zinc-400 hover:text-zinc-200"
                  }`
                }
              >
                {item.label}
                <AnimatePresence>
                  {activeIndex === index && (
                    <motion.div
                      className="absolute inset-0 -z-10 rounded-lg bg-white/10"
                      variants={navIndicator}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      transition={navIndicatorTransition}
                    />
                  )}
                </AnimatePresence>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
