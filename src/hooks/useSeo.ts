import { useEffect } from "react";

/**
 * Lightweight per-page SEO. Sets <title> and meta description on mount.
 * (In Bolt you can later upgrade this to react-helmet-async for OG tags.)
 */
export function useSeo(title: string, description?: string) {
  useEffect(() => {
    if (title) document.title = title;
    if (description) {
      let tag = document.querySelector('meta[name="description"]');
      if (!tag) {
        tag = document.createElement("meta");
        tag.setAttribute("name", "description");
        document.head.appendChild(tag);
      }
      tag.setAttribute("content", description);
    }
  }, [title, description]);
}
