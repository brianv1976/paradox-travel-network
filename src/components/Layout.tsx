import type { ReactNode } from "react";
import { useLocation } from "react-router-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Navbar from "./Navbar";
import Footer from "./Footer";
import ConciergeBot from "./ConciergeBot";
import { smooth } from "../lib/motion";

export default function Layout({ children }: { children: ReactNode }) {
  const { pathname } = useLocation();
  const reduce = useReducedMotion();

  return (
    <div className="flex min-h-screen flex-col">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-ocean-dark focus:px-5 focus:py-3 focus:text-cream focus:shadow-lift"
      >
        Skip to main content
      </a>
      <Navbar />
      <main id="main-content" className="flex-1">
        {reduce ? (
          children
        ) : (
          // mode="wait" lets the old page finish leaving before the new one
          // arrives, so navigation reads as one continuous move instead of a
          // hard cut. Keep this short — it sits in front of every click.
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={pathname}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.32, ease: smooth }}
            >
              {children}
            </motion.div>
          </AnimatePresence>
        )}
      </main>
      <Footer />
      <ConciergeBot />
    </div>
  );
}
