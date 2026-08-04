import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, ArrowRight } from "lucide-react";
import { navLinks } from "../data/site";
import { assets, business } from "../lib/assets";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

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
          className="flex items-center gap-2 outline-none focus:outline-none focus-visible:ring-0"
          aria-label={business.name}
        >
          <img
            src={assets.logo}
            alt={business.name}
            className="h-14 w-auto object-contain md:h-16 lg:h-20"
          />
        </Link>

        {/* Desktop nav */}
        <div className="hidden items-center gap-7 lg:flex">
          {navLinks.map((link) =>
            link.cta ? (
              <Link key={link.to} to={link.to} className="btn-primary">
                {link.label}
                <ArrowRight size={16} />
              </Link>
            ) : (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === "/"}
                className={({ isActive }) =>
                  `text-sm font-medium transition-colors hover:text-ocean ${
                    isActive && link.to !== "/#explore"
                      ? "text-ocean"
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
          className="inline-flex h-10 w-10 items-center justify-center rounded-full text-ink lg:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close menu" : "Open menu"}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-t border-ink/10 bg-cream lg:hidden"
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
