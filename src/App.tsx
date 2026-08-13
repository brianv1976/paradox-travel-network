import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import ScrollToTop from "./components/ScrollToTop";
import ScrollProgress from "./components/ScrollProgress";
import { useLenis } from "./hooks/useLenis";
import { services } from "./data/services";

import Home from "./pages/Home";
import BookItYourself from "./pages/BookItYourself";
import About from "./pages/About";
import Contact from "./pages/Contact";
import PlanMyTrip from "./pages/PlanMyTrip";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import ServicePage from "./pages/ServicePage";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import Accessibility from "./pages/Accessibility";
import NotFound from "./pages/NotFound";

export default function App() {
  useLenis();

  return (
    <>
      <ScrollProgress />
      <ScrollToTop />
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/book-it-yourself" element={<BookItYourself />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/plan-my-trip" element={<PlanMyTrip />} />
          <Route path="/travel-tips" element={<Blog />} />
          <Route path="/travel-tips/:slug" element={<BlogPost />} />

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
      </Layout>
    </>
  );
}
