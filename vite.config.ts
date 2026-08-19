import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import prerenderSeo from "./scripts/vite-plugin-prerender-seo.mjs";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), prerenderSeo()],
  server: {
    host: true,
    port: 5173,
  },
  build: {
    outDir: "dist",
    chunkSizeWarningLimit: 1500,
  },
});
