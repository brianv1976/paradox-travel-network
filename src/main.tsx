import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { MotionConfig } from "framer-motion";
import App from "./App";
import "./index.css";

const rootEl = document.getElementById("root") as HTMLElement;
const tree = (
  <React.StrictMode>
    <MotionConfig reducedMotion="user">
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </MotionConfig>
  </React.StrictMode>
);

// The production build (see scripts/render-bodies.mjs) ships real,
// server-rendered content inside #root, not an empty div — hydrate onto it
// instead of discarding and re-rendering from scratch. `vite dev` and any
// build that skipped that step still have an empty #root, so fall back to a
// normal client render rather than hydrating nothing.
if (rootEl.hasChildNodes()) {
  ReactDOM.hydrateRoot(rootEl, tree);
} else {
  ReactDOM.createRoot(rootEl).render(tree);
}
