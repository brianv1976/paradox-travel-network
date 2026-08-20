import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, ArrowRight } from "lucide-react";
import { navLinks } from "../data/site";
import Magnetic from "./Magnetic";
import { assets, business } from "../lib/assets";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Simple disclosure pattern, not a modal — page content behind the panel
  // stays interactive, so no focus trap. Escape still closes it and hands
  // focus back to the toggle, matching the pattern ConciergeBot uses.
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ease-smooth ${
        scrolled || open
          ? "bg-cream/95 shadow-soft backdrop-blur-md"
          : "bg-transparent"
      }`}
    >
      <nav className="container-px flex items-center justify-between py-5 md:py-6">
        <Link
          to="/"
          className="flex items-center gap-2 rounded-md outline-none focus-visible:ring-2 focus-visible:ring-ocean-dark focus-visible:ring-offset-2"
          aria-label={business.name}
        >
          <img
            src={assets.logo}
            alt={business.name}
            className="h-14 w-auto object-contain md:h-16 lg:h-20"
          />
        </Link>

        {/* Desktop nav. Switches at xl (1280px), not lg (1024px) --
            measured zero gap between logo and nav at 1024-1100px with all
            seven items + gap-7, only comfortable breathing room from
            ~1180px up. Keep hamburger through the cramped intermediate
            range rather than let it touch. */}
        <div className="hidden items-center gap-7 xl:flex">
          {navLinks.map((link) =>
            link.cta ? (
              <Magnetic key={link.to} strength={6}>
                <Link to={link.to} className="btn-primary">
                  {link.label}
                  <ArrowRight size={16} />
                </Link>
              </Magnetic>
            ) : (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === "/"}
                className={({ isActive }) =>
                  `text-sm font-medium transition-colors hover:text-ocean-dark ${
                    isActive && link.to !== "/#explore"
                      ? "text-ocean-dark"
                      : "text-ink/80"
                  }`
                }
              >
                {link.label}
              </NavLink>
            )
          )}
        </div>

        {/* Mobile toggle */}
        <button
          ref={toggleRef}
          className="inline-flex h-10 w-10 items-center justify-center rounded-full text-ink xl:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-nav-panel"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-nav-panel"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="max-h-[calc(100vh-72px)] overflow-y-auto overflow-x-hidden border-t border-ink/10 bg-cream xl:hidden"
          >
            <div className="container-px flex flex-col gap-1 py-5">
              {navLinks.map((link) =>
                link.cta ? (
                  <Link
                    key={link.to}
                    to={link.to}
                    className="btn-primary mt-3 w-full"
                  >
                    {link.label}
                    <ArrowRight size={16} />
                  </Link>
                ) : (
                  <Link
                    key={link.to}
                    to={link.to}
                    className="rounded-xl px-3 py-3 text-base font-medium text-ink/85 transition-colors hover:bg-sand"
                  >
                    {link.label}
                  </Link>
                )
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
