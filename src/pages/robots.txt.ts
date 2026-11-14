import type { APIRoute } from 'astro';

// Alle Suchmaschinen und KI-Crawler sind willkommen (Band will gefunden und gebucht werden).
// Wer KI-Training ausschliessen möchte, kann z.B. "User-agent: GPTBot / Disallow: /" ergänzen.
export const GET: APIRoute = ({ site }) => {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  const sitemap = new URL(`${base}/sitemap-index.xml`, site).href;
  const llms = new URL(`${base}/llms.txt`, site).href;
  return new Response(`User-agent: *\nAllow: /\n\nSitemap: ${sitemap}\n# Zusammenfassung für KI-Assistenten: ${llms}\n`, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
