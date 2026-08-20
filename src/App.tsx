import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import ScrollToTop from "./components/ScrollToTop";
import ScrollProgress from "./components/ScrollProgress";
import { useLenis } from "./hooks/useLenis";
import { services } from "./data/services";

// Route-level code splitting: each page ships as its own chunk instead of
// one shared bundle, so visiting one page doesn't download every page.
const Home = lazy(() => import("./pages/Home"));
const BookItYourself = lazy(() => import("./pages/BookItYourself"));
const About = lazy(() => import("./pages/About"));
const Contact = lazy(() => import("./pages/Contact"));
const PlanMyTrip = lazy(() => import("./pages/PlanMyTrip"));
const Blog = lazy(() => import("./pages/Blog"));
const BlogPost = lazy(() => import("./pages/BlogPost"));
const ServicePage = lazy(() => import("./pages/ServicePage"));
const ExploreTravel = lazy(() => import("./pages/ExploreTravel"));
const Privacy = lazy(() => import("./pages/Privacy"));
const Terms = lazy(() => import("./pages/Terms"));
const Accessibility = lazy(() => import("./pages/Accessibility"));
const NotFound = lazy(() => import("./pages/NotFound"));

export default function App() {
  useLenis();

  return (
    <>
      <ScrollProgress />
      <ScrollToTop />
      <Layout>
        <Suspense fallback={null}>
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
      </Layout>
    </>
  );
}
