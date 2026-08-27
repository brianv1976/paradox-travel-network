import type { ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import ConciergeBot from "./ConciergeBot";
import AnalyticsTracker from "./AnalyticsTracker";
import { smooth } from "../lib/motion";

/** The Postcards issue pages are a full-bleed editorial object, not a
 * website page — the standard chrome nav reads as "just a website" and
 * breaks that illusion, so it's swapped for a minimal floating back-link. */
function MinimalNav() {
  return (
    <div className="fixed left-4 top-4 z-50 sm:left-6 sm:top-6">
      <Link
        to="/travel-tips"
        className="inline-flex items-center gap-1.5 bg-black/25 px-3 py-2 text-[10px] font-black uppercase tracking-[.16em] text-white backdrop-blur-sm transition-colors hover:bg-black/40"
      >
        <ArrowLeft size={13} /> Postcards Hub
      </Link>
    </div>
  );
}

export default function Layout({ children }: { children: ReactNode }) {
  const { pathname } = useLocation();
  const reduce = useReducedMotion();
  const isPostcardIssue = pathname.startsWith("/postcards/");

  return (
    <div className="flex min-h-screen flex-col">
      <AnalyticsTracker />
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-ocean-dark focus:px-5 focus:py-3 focus:text-cream focus:shadow-lift"
      >
        Skip to main content
      </a>
      {isPostcardIssue ? <MinimalNav /> : <Navbar />}
      <main id="main-content" tabIndex={-1} className="flex-1">
        {reduce ? (
          children
        ) : (
          // Keep route motion visual, never blocking: incoming content mounts
          // immediately instead of waiting behind an exiting lazy route.
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
