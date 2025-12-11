import type { ReactNode } from "react";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Navigation from "@components/Navigation";
import SocialDock from "@components/SocialDock";
import { footerContent } from "@lib/content";

interface MainLayoutProps {
    children: ReactNode;
}

/** Resets scroll position on route change */
function ScrollToTop() {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    return null;
}

/**
 * Main layout wrapper.
 * Provides consistent navigation, footer, and social dock.
 */
export default function MainLayout({ children }: MainLayoutProps) {
    return (
        <div className="relative min-h-screen overflow-x-hidden">
            <ScrollToTop />

            <Navigation />

            <main className="relative z-10 pt-20 pb-32">
                <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-6xl">
                    {children}
                </div>
            </main>

            <SocialDock />

            <footer className="fixed bottom-20 md:bottom-2 left-0 right-0 md:left-auto md:right-4 z-40 flex justify-center md:justify-end">
                <a
                    href={footerContent.bugReport.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-zinc-400 hover:text-zinc-300 transition-colors"
                >
                    {footerContent.bugReport.text}
                </a>
            </footer>
        </div>
    );
}
