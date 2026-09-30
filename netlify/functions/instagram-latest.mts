/**
 * Returns the newest public Instagram post/Reel for the homepage's "Latest
 * from Paradox" card. Server-side only so the Instagram access token never
 * reaches the browser -- the client gets back just the few public fields
 * the card needs to render (id, caption excerpt, image, permalink).
 *
 * Requires an INSTAGRAM_ACCESS_TOKEN environment variable (Netlify env var,
 * never committed to the repo) for a connected Instagram professional
 * (Business or Creator) account. Until that's set up, this returns
 * `{ available: false }` -- not an error, just "nothing to show yet" -- and
 * the frontend card hides itself, leaving the static Follow buttons alone.
 * Same graceful response for a genuinely failed/expired/rate-limited call,
 * so a visitor never sees a broken card or a raw API error.
 *
 * In-memory cache (module scope survives while the function stays warm) so
 * a burst of homepage visits doesn't hammer the Graph API on every request.
 */
interface CachedResult {
  data: unknown;
  expiresAt: number;
}

const CACHE_TTL_MS = 60 * 60 * 1000; // 1 hour -- a new post doesn't need to appear instantly
let cache: CachedResult | null = null;

function json(data: unknown, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "public, max-age=300", // browser/CDN can also hold this briefly
    },
  });
}

const NOT_AVAILABLE = { available: false };

export default async (req: Request) => {
  if (req.method !== "GET") {
    return json({ error: "Method not allowed" }, 405);
  }

  if (cache && cache.expiresAt > Date.now()) {
    return json(cache.data);
  }

  const accessToken = Netlify.env.get("INSTAGRAM_ACCESS_TOKEN");
  if (!accessToken) {
    // Expected state until Brian completes the Meta/Instagram setup --
    // see the project handover notes. Not logged as an error.
    return json(NOT_AVAILABLE);
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 8000);

  try {
    const fields = "id,caption,media_type,media_url,thumbnail_url,permalink,timestamp";
    const url = `https://graph.instagram.com/me/media?fields=${fields}&limit=1&access_token=${encodeURIComponent(accessToken)}`;
    const response = await fetch(url, { signal: controller.signal });

    if (!response.ok) {
      const detail = await response.text();
      console.error("Instagram media request failed", response.status, detail.slice(0, 300));
      return json(NOT_AVAILABLE);
    }

    const payload = await response.json();
    const post = Array.isArray(payload?.data) ? payload.data[0] : undefined;
    if (!post || !post.permalink) {
      return json(NOT_AVAILABLE);
    }

    const image = post.media_type === "VIDEO" ? post.thumbnail_url : (post.media_url ?? post.thumbnail_url);
    if (!image) {
      return json(NOT_AVAILABLE);
    }

    const captionSource = typeof post.caption === "string" ? post.caption : "";
    const excerpt = captionSource.length > 140 ? `${captionSource.slice(0, 137)}...` : captionSource;

    const data = {
      available: true,
      image,
      caption: excerpt,
      permalink: post.permalink,
      isVideo: post.media_type === "VIDEO",
    };

    cache = { data, expiresAt: Date.now() + CACHE_TTL_MS };
    return json(data);
  } catch (error) {
    console.error("Instagram latest-post function error", error);
    return json(NOT_AVAILABLE);
  } finally {
    clearTimeout(timeout);
  }
};

export const config = {
  path: "/api/instagram-latest",
};
