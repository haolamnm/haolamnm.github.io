import type { ReactNode } from "react";
import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import Navigation from "@components/Navigation";
import SocialDock from "@components/SocialDock";
import { footerContent } from "@lib/content";

interface MainLayoutProps {
  readonly children: ReactNode;
}

/**
 * Resets scroll position and moves focus on route change.
 * Focus management ensures screen reader users start at page content.
 * Skips on initial load to prevent focus ring flash.
 */
function ScrollToTop() {
  const { pathname } = useLocation();
  const isInitialMount = useRef(true);

  useEffect(() => {
    globalThis.scrollTo(0, 0);

    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }

    const main = document.querySelector("main");
    if (main) {
      main.setAttribute("tabindex", "-1");
      main.style.outline = "none"; // Prevent any focus ring
      main.focus({ preventScroll: true });
    }
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

      {/*
              pt-20: Offset for fixed header (approx 80px)
              pb-32: Offset for fixed social dock at bottom + breathing room
            */}
      <main className="relative z-10 pt-20 pb-32 min-h-screen">
        <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-6xl">
          {children}
        </div>
      </main>

      <SocialDock />

      <footer className="fixed bottom-1 md:bottom-2 left-0 right-0 md:left-auto md:right-4 z-40 flex justify-center md:justify-end">
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
