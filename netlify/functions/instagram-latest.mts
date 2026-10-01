type InstagramMedia = {
  id: string;
  caption?: string;
  media_type?: string;
  media_url?: string;
  permalink?: string;
  thumbnail_url?: string;
};

function json(data: unknown, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "public, max-age=300, s-maxage=1800, stale-while-revalidate=86400",
    },
  });
}

export default async (req: Request) => {
  if (req.method !== "GET") return json({ error: "Method not allowed" }, 405);

  const accessToken = Netlify.env.get("INSTAGRAM_ACCESS_TOKEN");
  if (!accessToken) return new Response(null, { status: 204 });

  const fields = "id,caption,media_type,media_url,permalink,thumbnail_url,timestamp";
  const endpoint = new URL("https://graph.instagram.com/me/media");
  endpoint.searchParams.set("fields", fields);
  endpoint.searchParams.set("limit", "1");
  endpoint.searchParams.set("access_token", accessToken);

  try {
    const response = await fetch(endpoint, { signal: AbortSignal.timeout(8000) });
    if (!response.ok) {
      console.error("Instagram latest-media request failed", response.status);
      return new Response(null, { status: 204 });
    }

    const payload = (await response.json()) as { data?: InstagramMedia[] };
    const post = payload.data?.[0];
    if (!post?.permalink) return new Response(null, { status: 204 });

    return json({
      post: {
        permalink: post.permalink,
        mediaType: post.media_type,
        mediaUrl: post.media_url,
        thumbnailUrl: post.thumbnail_url,
        caption: post.caption?.slice(0, 280),
      },
    });
  } catch (error) {
    console.error("Instagram latest-media function error", error);
    return new Response(null, { status: 204 });
  }
};

export const config = {
  path: "/api/instagram-latest",
};
