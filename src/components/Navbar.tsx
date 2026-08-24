import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Menu, X, ArrowRight, MessageCircle } from "lucide-react";
import { navLinks } from "../data/site";
import Magnetic from "./Magnetic";
import { assets, business } from "../lib/assets";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const reduce = useReducedMotion();
  const headerRef = useRef<HTMLElement>(null);
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

  // Lock background scroll while the panel is open (it was previously
  // possible to scroll the page behind it, producing a confusing
  // double-scroll feel), and flag <body> so ConciergeBot can hide itself --
  // it was floating on top of the open panel on short landscape screens.
  useEffect(() => {
    document.body.classList.toggle("mobile-nav-open", open);
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.classList.remove("mobile-nav-open");
      document.body.style.overflow = "";
    };
  }, [open]);

  // Keep keyboard focus inside the visible navigation while it is expanded.
  // On short screens the fixed header can cover most of the page; allowing Tab
  // to wander into controls behind it leaves a keyboard focus indicator hidden
  // under the panel. Escape closes it and restores focus to the toggle.
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        setOpen(false);
        toggleRef.current?.focus();
        return;
      }
      if (e.key !== "Tab" || !headerRef.current) return;
      const focusable = Array.from(
        headerRef.current.querySelectorAll<HTMLElement>(
          'a[href]:not([tabindex="-1"]), button:not([disabled]):not([tabindex="-1"]), input:not([disabled]):not([tabindex="-1"]), [tabindex]:not([tabindex="-1"])'
        )
      ).filter((el) => el.getClientRects().length > 0);
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <header
      ref={headerRef}
      className={`fixed inset-x-0 top-0 z-50 flex max-h-[100dvh] flex-col transition-all duration-300 ease-smooth ${
        scrolled || open
          ? "bg-cream/95 shadow-soft backdrop-blur-md"
          : "bg-transparent"
      }`}
    >
      {/* shrink-0: the row itself (logo + toggle) never gets squeezed by the
          flex-column's max-height cap below -- only the menu panel should
          give up space, never this. */}
      <nav className="container-px flex shrink-0 items-center justify-between py-5 md:py-6">
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
                    isActive ? "text-ocean-dark" : "text-ink/80"
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
          className="inline-flex h-11 w-11 items-center justify-center rounded-full text-ink xl:hidden"
          onClick={() =>
            setOpen((v) => {
              const next = !v;
              if (next) window.dispatchEvent(new Event("close-concierge"));
              return next;
            })
          }
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
            initial={reduce ? false : { opacity: 0, height: 0 }}
            animate={reduce ? undefined : { opacity: 1, height: "auto" }}
            exit={reduce ? undefined : { opacity: 0, height: 0 }}
            transition={{ duration: reduce ? 0 : 0.35, ease: [0.22, 1, 0.36, 1] }}
            // min-h-0 overrides the flex default (min-height: auto, sized to
            // content) that would otherwise let this panel push the header
            // taller than the viewport instead of scrolling internally --
            // the classic flexbox scroll-child gotcha. No header-height
            // constant to guess or get wrong: the flex column above sizes
            // this to whatever space is actually left under the nav row, at
            // any breakpoint.
            className="min-h-0 overflow-y-auto overflow-x-hidden border-t border-ink/10 bg-cream xl:hidden"
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
              {/* Concierge's own floating launcher is hidden below md
                  (ConciergeBot.tsx) -- this is its only trigger on phones.
                  Dispatches the same open event the launcher button would,
                  and closes this menu first so the chat panel isn't
                  fighting it for screen space. */}
              <button
                onClick={() => {
                  setOpen(false);
                  window.dispatchEvent(new Event("open-concierge"));
                }}
                className="mt-1 flex items-center gap-2 rounded-xl px-3 py-3 text-left text-base font-medium text-ink/85 transition-colors hover:bg-sand md:hidden"
              >
                <MessageCircle size={18} />
                Ask Brian
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
