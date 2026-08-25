import { lazy, Suspense, type ComponentType } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Layout from "./components/Layout";
import ScrollToTop from "./components/ScrollToTop";
import ScrollProgress from "./components/ScrollProgress";
import ErrorBoundary from "./components/ErrorBoundary";
import { useLenis } from "./hooks/useLenis";
import { services } from "./data/services";

// Vite fingerprints each chunk's filename per build. A tab left open across a
// deploy still has the PREVIOUS filenames in memory, so clicking a link to a
// route it hasn't loaded yet tries to fetch a chunk that no longer exists on
// the server -- the import rejects, nothing is mounted, and Layout (outside
// Suspense) keeps rendering its header over an otherwise blank page. Only a
// hard reload picks up the current index.html with the current filenames.
// This wrapper detects exactly that failure and reloads once automatically
// instead of leaving the visitor to guess that a refresh is the fix.
const RELOAD_KEY = "ptn-chunk-reload";

function lazyWithReload<T extends ComponentType<any>>(
  factory: () => Promise<{ default: T }>
) {
  return lazy(async () => {
    try {
      const mod = await factory();
      sessionStorage.removeItem(RELOAD_KEY);
      return mod;
    } catch (error) {
      if (sessionStorage.getItem(RELOAD_KEY)) throw error;
      sessionStorage.setItem(RELOAD_KEY, "1");
      window.location.reload();
      return new Promise<never>(() => {}); // reload is in flight; never settle
    }
  });
}

// Route-level code splitting: each major feature ships separately instead of
// forcing every visitor to download every page up front.
const Home = lazyWithReload(() => import("./pages/Home"));
const BookItYourself = lazyWithReload(() => import("./pages/BookItYourself"));
const About = lazyWithReload(() => import("./pages/About"));
const Contact = lazyWithReload(() => import("./pages/Contact"));
const PlanMyTrip = lazyWithReload(() => import("./pages/PlanMyTrip"));

// Postcards is intentionally one feature chunk. Opening /travel-tips loads the
// list and article renderer together, so clicking an article keeps fast SPA
// navigation without triggering a second lazy route fetch. This preserves
// code-splitting for visitors who never open Postcards while removing the
// deterministic blank-page failure on list -> article navigation.
const Blog = lazyWithReload(() =>
  import("./pages/PostcardsRoutes").then((module) => ({ default: module.Blog }))
);
const BlogPost = lazyWithReload(() =>
  import("./pages/PostcardsRoutes").then((module) => ({ default: module.BlogPost }))
);

const ServicePage = lazyWithReload(() => import("./pages/ServicePage"));
const ExploreTravel = lazyWithReload(() => import("./pages/ExploreTravel"));
const Privacy = lazyWithReload(() => import("./pages/Privacy"));
const Terms = lazyWithReload(() => import("./pages/Terms"));
const Accessibility = lazyWithReload(() => import("./pages/Accessibility"));
const NotFound = lazyWithReload(() => import("./pages/NotFound"));

function RouteLoadingFallback() {
  return (
    <div
      className="container-px flex min-h-[40vh] items-center justify-center py-24 text-center"
      role="status"
      aria-live="polite"
    >
      <span className="text-sm text-fog">Loading page…</span>
    </div>
  );
}

function RouteErrorFallback() {
  return (
    <div className="container-px flex min-h-[50vh] flex-col items-center justify-center gap-4 py-24 text-center">
      <p className="max-w-md text-fog">
        This page didn't load correctly. A refresh usually fixes a stale or interrupted page download.
      </p>
      <button
        type="button"
        onClick={() => window.location.reload()}
        className="btn-primary"
      >
        Reload page
      </button>
    </div>
  );
}

export default function App() {
  useLenis();
  const { pathname } = useLocation();

  return (
    <>
      <ScrollProgress />
      <ScrollToTop />
      <Layout>
        <ErrorBoundary key={pathname} fallback={<RouteErrorFallback />}>
          <Suspense fallback={<RouteLoadingFallback />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/book-it-yourself" element={<BookItYourself />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/plan-my-trip" element={<PlanMyTrip />} />
              <Route path="/travel-tips" element={<Blog />} />
              <Route path="/travel-tips/:slug" element={<BlogPost />} />
              <Route path="/explore-travel" element={<ExploreTravel />} />

              {/* Service pages keep their exact top-level URLs */}
              {services.map((s) => (
                <Route
                  key={s.slug}
                  path={`/${s.slug}`}
                  element={<ServicePage slug={s.slug} />}
                />
              ))}

              <Route path="/privacy" element={<Privacy />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="/accessibility" element={<Accessibility />} />

              <Route path="/404" element={<NotFound />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </ErrorBoundary>
      </Layout>
    </>
  );
}
