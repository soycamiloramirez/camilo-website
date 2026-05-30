#!/usr/bin/env node
/**
 * IndexNow ping — runs after `npm run build` (postbuild).
 *
 * Reads the freshly built sitemap, extracts every URL of camilo-ramirez.com,
 * and POSTs them to the IndexNow API so Bing/Yandex/Naver/Seznam pick up new
 * content almost instantly (vs waiting for a crawl).
 *
 * Skipped automatically in local dev: only runs when VERCEL=1 (i.e. during a
 * Vercel build) or when INDEXNOW_FORCE=1 is set.
 *
 * Google does NOT participate in IndexNow — for Google we rely on Search
 * Console's sitemap submission + organic discovery.
 */
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

const HOST = 'camilo-ramirez.com';
const KEY = '0a1b3c5d7e9f1234567890abcdef1234';
const KEY_LOCATION = `https://${HOST}/${KEY}.txt`;

function readSitemap() {
  const candidates = [
    join(process.cwd(), 'dist', 'client', 'sitemap-0.xml'),
    join(process.cwd(), 'dist', 'sitemap-0.xml'),
    join(process.cwd(), '.vercel', 'output', 'static', 'sitemap-0.xml'),
  ];
  for (const p of candidates) {
    try {
      return readFileSync(p, 'utf-8');
    } catch {}
  }
  return null;
}

if (!process.env.VERCEL && !process.env.INDEXNOW_FORCE) {
  console.log('[indexnow] skipped (set INDEXNOW_FORCE=1 to run locally)');
  process.exit(0);
}

const xml = readSitemap();
if (!xml) {
  console.warn('[indexnow] sitemap not found, skipping');
  process.exit(0);
}

const urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)]
  .map((m) => m[1])
  .filter((u) => u.includes(HOST));

if (urls.length === 0) {
  console.warn('[indexnow] no URLs found in sitemap');
  process.exit(0);
}

console.log(`[indexnow] pinging ${urls.length} URLs`);

try {
  const res = await fetch('https://api.indexnow.org/IndexNow', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify({
      host: HOST,
      key: KEY,
      keyLocation: KEY_LOCATION,
      urlList: urls,
    }),
  });
  console.log(`[indexnow] ${res.status} ${res.statusText}`);
  if (!res.ok) {
    const text = await res.text();
    console.warn('[indexnow] body:', text.slice(0, 200));
  }
} catch (err) {
  console.warn('[indexnow] request failed:', err.message);
  // Non-fatal: don't block the build over an indexing ping.
  process.exit(0);
}
