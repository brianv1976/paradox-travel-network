import { lazy, Suspense, type ComponentType } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Layout from "./components/Layout";
import ScrollToTop from "./components/ScrollToTop";
import ScrollProgress from "./components/ScrollProgress";
import ErrorBoundary from "./components/ErrorBoundary";
import BlogPost from "./pages/BlogPost";
import { useLenis } from "./hooks/useLenis";
import { services } from "./data/services";

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
      return new Promise<never>(() => {});
    }
  });
}

// Keep route-level code splitting for heavier/less-frequent pages.
const Home = lazyWithReload(() => import("./pages/Home"));
const BookItYourself = lazyWithReload(() => import("./pages/BookItYourself"));
const About = lazyWithReload(() => import("./pages/About"));
const Contact = lazyWithReload(() => import("./pages/Contact"));
const PlanMyTrip = lazyWithReload(() => import("./pages/PlanMyTrip"));
const Blog = lazyWithReload(() => import("./pages/Blog"));
const PostcardsIssue01 = lazyWithReload(() => import("./pages/PostcardsIssue01"));

// Article navigation is a primary Postcards path. Keep the renderer eager so
// list -> article navigation never depends on a second route chunk.
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
              <Route path="/postcards/issue-01" element={<PostcardsIssue01 />} />
              <Route path="/travel-tips/:slug" element={<BlogPost />} />
              <Route path="/explore-travel" element={<ExploreTravel />} />

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
