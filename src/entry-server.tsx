/**
 * Build-time-only server render entry (used by `vite build --ssr` and
 * scripts/render-bodies.mjs). Never shipped to the client bundle.
 *
 * Renders the REAL App.tsx -- same lazy-loaded routes, same Suspense
 * boundaries the browser uses -- swapping only BrowserRouter for
 * StaticRouter. `renderToPipeableStream` + `onAllReady` (not `onShellReady`)
 * is required here, not plain `renderToString`: App.tsx code-splits every
 * page via React.lazy(), and a synchronous renderToString resolves a
 * still-loading lazy component by emitting its Suspense *fallback*
 * ("Loading page…"), not the real page. onAllReady waits for every
 * suspended boundary -- including the dynamic import()s the lazy chunks
 * trigger -- to actually resolve before the stream is read, so the HTML
 * this produces is what the browser eventually settles on too. Because it's
 * the same tree (same lazy()/Suspense structure) the browser hydrates,
 * there's no server/client structural mismatch to reconcile.
 */
import { renderToPipeableStream } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import { MotionConfig } from "framer-motion";
import { PassThrough } from "node:stream";
import App from "./App";

export function renderRoute(url: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const { pipe } = renderToPipeableStream(
      <MotionConfig reducedMotion="user">
        <StaticRouter location={url}>
          <App />
        </StaticRouter>
      </MotionConfig>,
      {
        onAllReady() {
          const chunks: Buffer[] = [];
          const collector = new PassThrough();
          collector.on("data", (chunk) => chunks.push(chunk));
          collector.on("end", () => resolve(Buffer.concat(chunks).toString("utf-8")));
          collector.on("error", reject);
          pipe(collector);
        },
        onError(error) {
          reject(error);
        },
      }
    );
  });
}
