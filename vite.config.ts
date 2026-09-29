import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import prerenderSeo from "./scripts/vite-plugin-prerender-seo.mjs";

// https://vitejs.dev/config/
export default defineConfig(({ isSsrBuild }) => ({
  plugins: [react(), prerenderSeo()],
  server: {
    host: true,
    port: 5173,
  },
  build: {
    outDir: "dist",
    chunkSizeWarningLimit: 1500,
    // `vite build --ssr src/entry-server.tsx --outDir dist-ssr` (see
    // scripts/render-bodies.mjs) needs an ESM entry Node can `import()`
    // directly, since package.json sets "type": "module" — Vite's default
    // SSR output is CJS otherwise, which Node would then fail to parse.
    rollupOptions: isSsrBuild ? { output: { format: "es" } } : undefined,
  },
}));
