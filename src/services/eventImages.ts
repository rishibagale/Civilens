/**
 * eventImages.ts
 *
 * Client-side wrapper around the /api/event-image proxy. The proxy
 * calls Wikimedia Commons (per their TOS, with a real User-Agent)
 * and returns a stable image URL. This client adds a small in-memory
 * cache so the same event is never re-fetched within a session.
 */

export interface EventImage {
  url: string;
  thumbUrl: string;
  attribution: string;
  source: "wikimedia" | "fallback";
}

const memoryCache = new Map<string, EventImage | null>();

/** Format a year for display (handles BCE). */
export function formatYear(year: number): string {
  if (year < 0) return `${Math.abs(year)} BC`;
  if (year < 1000) return `${year} CE`;
  return `${year}`;
}

/**
 * Fetch an image for an event. Returns null if no query or no image
 * can be located; callers should fall back to a generative placeholder.
 */
export async function fetchEventImage(
  eventId: string,
  query: string,
  signal?: AbortSignal,
): Promise<EventImage | null> {
  if (!query) return null;
  if (memoryCache.has(eventId)) return memoryCache.get(eventId) ?? null;

  try {
    const res = await fetch(
      `/api/event-image?q=${encodeURIComponent(query)}`,
      { signal },
    );
    if (!res.ok) {
      memoryCache.set(eventId, null);
      return null;
    }
    const data = (await res.json()) as EventImage;
    memoryCache.set(eventId, data);
    return data;
  } catch {
    return null;
  }
}
