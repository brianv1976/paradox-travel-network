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

  const items = navLinks.filter((l) => !l.cta);
  const cta = navLinks.find((l) => l.cta);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ease-smooth ${
        scrolled || open
          ? "bg-cream/95 shadow-soft backdrop-blur-md"
          : "bg-transparent"
      }`}
    >
      <nav className="container-px flex h-[128px] items-center justify-between">
        <Link
          to="/"
          className="flex items-center gap-2 outline-none focus:outline-none focus-visible:ring-0"
          aria-label={business.name}
        >
          {/*
            Logo crop — negative margin method (v3)
            PNG canvas 2400×1462, content 1622×607 at offset (388,428).
            Render img at fixed px size, negative margins push padding
            outside the overflow-hidden container.
            Mobile:  img 316×193, margins -51px -56px, container 214×80
            Desktop: img 380×231, margins -61px -68px, container 257×96
          */}
          <div
            className="overflow-hidden"
            style={{ width: 214, height: 80 }}
          >
            <img
              src={assets.logo}
              alt={business.name}
              style={{
                width: 316,
                height: 193,
                marginLeft: -51,
                marginTop: -56,
                display: "block",
              }}
            />
          </div>
        </Link>

        {/* Desktop nav */}
        <div className="hidden items-center gap-7 lg:flex">
          {items.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
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
          ))}
          {cta && (
            <Link to={cta.to} className="btn-primary">
              {cta.label}
              <ArrowRight size={16} />
            </Link>
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
              {items.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="rounded-xl px-3 py-3 text-base font-medium text-ink/85 transition-colors hover:bg-sand"
                >
                  {link.label}
                </Link>
              ))}
              {cta && (
                <Link to={cta.to} className="btn-primary mt-3 w-full">
                  {cta.label}
                  <ArrowRight size={16} />
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
