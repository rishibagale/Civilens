import { NextRequest, NextResponse } from "next/server";

/**
 * GET /api/event-image?q=<search term>
 *
 * Server-side proxy to Wikimedia Commons. We use this server route
 * (not a direct client call) for two reasons:
 *  1. Wikimedia requires a descriptive User-Agent per their TOS.
 *  2. It avoids CORS issues in the browser.
 *
 * The response is cached in-memory for 24h. Returned JSON:
 *   { url, thumbUrl, attribution, source: "wikimedia" | "fallback" }
 */

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const WIKIMEDIA_API = "https://commons.wikimedia.org/w/api.php";
const USER_AGENT =
  process.env.WIKIMEDIA_USER_AGENT ||
  "CuriosCivilens/1.0 (educational; open-source-exploration)";

interface ImageInfo {
  url: string;
  thumburl?: string;
}

interface CacheEntry {
  expires: number;
  data:
    | {
        url: string;
        thumbUrl: string;
        attribution: string;
        source: "wikimedia";
      }
    | null;
}

const cache = new Map<string, CacheEntry>();
const TTL_MS = 24 * 60 * 60 * 1000;

async function searchWikimedia(q: string): Promise<string | null> {
  const url =
    `${WIKIMEDIA_API}?action=query&list=search` +
    `&srsearch=${encodeURIComponent(q)}&srnamespace=6&format=json&srlimit=8`;
  const res = await fetch(url, {
    headers: { "User-Agent": USER_AGENT, Accept: "application/json" },
  });
  if (!res.ok) return null;
  const data = (await res.json()) as {
    query?: { search?: Array<{ title: string }> };
  };
  const results = data.query?.search ?? [];
  // Prefer common raster extensions; reject SVGs which are line drawings
  const ranked = results
    .map((r) => {
      const t = r.title.toLowerCase();
      if (/\.svg\b/.test(t)) return { title: r.title, score: 0 };
      if (/\.jpe?g\b/.test(t)) return { title: r.title, score: 3 };
      if (/\.png\b/.test(t)) return { title: r.title, score: 2 };
      if (/\.webp\b/.test(t)) return { title: r.title, score: 2 };
      return { title: r.title, score: 1 };
    })
    .sort((a, b) => b.score - a.score);
  return ranked[0]?.title ?? null;
}

async function resolveFileUrl(
  fileTitle: string,
  width = 1200,
): Promise<{ url: string; thumbUrl: string; attribution: string } | null> {
  const url =
    `${WIKIMEDIA_API}?action=query` +
    `&titles=${encodeURIComponent(fileTitle)}` +
    `&prop=imageinfo&iiprop=url|extmetadata&iiurlwidth=${width}` +
    `&format=json`;
  const res = await fetch(url, {
    headers: { "User-Agent": USER_AGENT, Accept: "application/json" },
  });
  if (!res.ok) return null;
  const data = (await res.json()) as {
    query?: {
      pages?: Record<
        string,
        {
          imageinfo?: Array<ImageInfo & { extmetadata?: Record<string, { value: string }> }>;
        }
      >;
    };
  };
  const pages = Object.values(data.query?.pages ?? {});
  const info = pages[0]?.imageinfo?.[0];
  if (!info) return null;
  const artist = info.extmetadata?.Artist?.value
    ?.replace(/<[^>]+>/g, "")
    .trim();
  const license = info.extmetadata?.LicenseShortName?.value?.trim();
  const attribution = [artist, license].filter(Boolean).join(" — ") || "Wikimedia Commons";
  return {
    url: info.url,
    thumbUrl: info.thumburl ?? info.url,
    attribution,
  };
}

export async function GET(req: NextRequest) {
  const q = req.nextUrl.searchParams.get("q")?.trim() ?? "";
  if (!q) {
    return NextResponse.json(
      { error: "Missing q parameter" },
      { status: 400 },
    );
  }

  const cached = cache.get(q);
  if (cached && cached.expires > Date.now()) {
    if (!cached.data) return NextResponse.json({ url: null, source: "fallback" });
    return NextResponse.json(cached.data, {
      headers: { "Cache-Control": "public, max-age=86400" },
    });
  }

  try {
    // Try progressively shorter queries so "Mongol Empire Genghis Khan" still
    // finds something if the full query misses.
    const words = q.split(/\s+/);
    for (let len = words.length; len >= 2; len--) {
      const sub = words.slice(0, len).join(" ");
      const fileTitle = await searchWikimedia(sub);
      if (fileTitle) {
        const resolved = await resolveFileUrl(fileTitle);
        if (resolved) {
          const data = {
            url: resolved.url,
            thumbUrl: resolved.thumbUrl,
            attribution: resolved.attribution,
            source: "wikimedia" as const,
          };
          cache.set(q, { data, expires: Date.now() + TTL_MS });
          return NextResponse.json(data, {
            headers: { "Cache-Control": "public, max-age=86400" },
          });
        }
      }
    }
    cache.set(q, { data: null, expires: Date.now() + TTL_MS });
    return NextResponse.json({ url: null, source: "fallback" });
  } catch (err) {
    console.error("[event-image] failed:", err);
    return NextResponse.json({ url: null, source: "fallback" });
  }
}
