// Build-time podcast fetcher.
// Resolves the real RSS feedUrl via iTunes Lookup, then parses the XML.
// Fails gracefully: if anything errors, returns an empty list and the UI
// falls back to platform CTAs.

export type Episode = {
  title: string;
  description: string;
  published: string; // ISO
  durationLabel: string;
  link: string; // canonical episode URL when available
};

export type PodcastFeed = {
  id: string;
  title: string;
  artworkUrl: string | null;
  episodes: Episode[];
};

const ITUNES_LOOKUP = 'https://itunes.apple.com/lookup?id=';

function decode(str: string): string {
  return str
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, '$1')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(Number(n)));
}

function pick(item: string, tag: string): string {
  const re = new RegExp(`<${tag}[^>]*>([\\s\\S]*?)</${tag}>`, 'i');
  const m = item.match(re);
  return m ? decode(m[1]).trim() : '';
}

function pickAttr(item: string, tag: string, attr: string): string {
  const re = new RegExp(`<${tag}[^>]*\\b${attr}="([^"]+)"`, 'i');
  const m = item.match(re);
  return m ? m[1] : '';
}

function formatDuration(raw: string): string {
  if (!raw) return '';
  if (raw.includes(':')) {
    const parts = raw.split(':').map((p) => parseInt(p, 10));
    if (parts.some(Number.isNaN)) return '';
    let mins = 0;
    if (parts.length === 3) mins = parts[0] * 60 + parts[1];
    else if (parts.length === 2) mins = parts[0];
    return mins > 0 ? `${mins} min` : '';
  }
  const secs = parseInt(raw, 10);
  if (Number.isNaN(secs) || secs <= 0) return '';
  return `${Math.round(secs / 60)} min`;
}

async function resolveLookup(appleId: string): Promise<{ feedUrl?: string; artworkUrl600?: string } | null> {
  try {
    const res = await fetch(`${ITUNES_LOOKUP}${appleId}`, {
      headers: { 'user-agent': 'camilo-ramirez.com/1.0' },
    });
    if (!res.ok) return null;
    const json = (await res.json()) as { results?: Array<{ feedUrl?: string; artworkUrl600?: string }> };
    return json.results?.[0] ?? null;
  } catch {
    return null;
  }
}

async function fetchRss(feedUrl: string): Promise<string | null> {
  try {
    const res = await fetch(feedUrl, {
      headers: { 'user-agent': 'camilo-ramirez.com/1.0' },
    });
    if (!res.ok) return null;
    return await res.text();
  } catch {
    return null;
  }
}

function parseEpisodes(xml: string, limit: number): Episode[] {
  const items = xml.match(/<item[\s\S]*?<\/item>/g) ?? [];
  const out: Episode[] = [];
  for (const item of items.slice(0, limit)) {
    const title = pick(item, 'title');
    if (!title) continue;
    const link = pick(item, 'link') || pickAttr(item, 'enclosure', 'url');
    const pubDate = pick(item, 'pubDate');
    const dur = pick(item, 'itunes:duration');
    const rawDesc = pick(item, 'itunes:summary') || pick(item, 'description');
    const description = rawDesc.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim().slice(0, 240);
    out.push({
      title,
      description,
      published: pubDate ? new Date(pubDate).toISOString() : '',
      durationLabel: formatDuration(dur),
      link,
    });
  }
  return out;
}

export async function loadPodcast(opts: {
  id: string;
  title: string;
  appleId: string;
  limit?: number;
}): Promise<PodcastFeed> {
  const limit = opts.limit ?? 5;
  const lookup = await resolveLookup(opts.appleId);
  const artworkUrl = lookup?.artworkUrl600 ?? null;
  if (!lookup?.feedUrl) return { id: opts.id, title: opts.title, artworkUrl, episodes: [] };
  const xml = await fetchRss(lookup.feedUrl);
  if (!xml) return { id: opts.id, title: opts.title, artworkUrl, episodes: [] };
  return { id: opts.id, title: opts.title, artworkUrl, episodes: parseEpisodes(xml, limit) };
}
