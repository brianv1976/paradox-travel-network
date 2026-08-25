import type { ReactNode } from "react";
import { useLocation } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import Navbar from "./Navbar";
import Footer from "./Footer";
import ConciergeBot from "./ConciergeBot";
import AnalyticsTracker from "./AnalyticsTracker";
import { smooth } from "../lib/motion";

export default function Layout({ children }: { children: ReactNode }) {
  const { pathname } = useLocation();
  const reduce = useReducedMotion();

  return (
    <div className="flex min-h-screen flex-col">
      <AnalyticsTracker />
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-ocean-dark focus:px-5 focus:py-3 focus:text-cream focus:shadow-lift"
      >
        Skip to main content
      </a>
      <Navbar />
      <main id="main-content" tabIndex={-1} className="flex-1">
        {reduce ? (
          children
        ) : (
          // Route transitions keep a quick entrance motion, but never block
          // the incoming route behind an exit animation. Blocking "wait" mode
          // can strand Suspense/lazy routes with only the persistent shell.
          <motion.div
            key={pathname}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.28, ease: smooth }}
          >
            {children}
          </motion.div>
        )}
      </main>
      <Footer />
      <ConciergeBot />
    </div>
  );
}
