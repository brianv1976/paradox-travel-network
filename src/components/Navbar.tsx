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
            Logo crop fix — 2025-07-25
            The PNG canvas is 2400×1462 but the actual logo content is only
            1622×607 (67.6% wide, 41.5% tall), centered with ~388px left/right
            and ~428px top/bottom of transparent padding baked in.

            Fix: overflow-hidden container sized to the true logo aspect ratio
            (1622:607), with the full PNG absolutely positioned inside and
            offset to push the blank edges outside the clip boundary.

            Offset math (relative to rendered img size):
              height: canvas_h / content_h = 2400/607 → 240.9% of container
              left:   -(pad_left / content_w) = -(388/1622) = -23.9%
              top:    -(pad_top  / content_h) = -(428/607)  = -70.5%

            Mobile:  container h-20 (80px)  → 80 × 2.672 ≈ 214px wide
            Desktop: container h-24 (96px)  → 96 × 2.672 ≈ 257px wide
          */}
          <div
            className="relative h-20 overflow-hidden md:h-24"
            style={{ aspectRatio: "1622 / 607" }}
          >
            <img
              src={assets.logo}
              alt={business.name}
              className="absolute w-auto"
              style={{
                height: "240.9%",
                left: "-23.9%",
                top: "-70.5%",
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
