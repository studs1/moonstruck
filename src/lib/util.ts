import { getCollection } from 'astro:content';
import type { ImageMetadata } from 'astro';

/** Pfad inkl. Base-URL (nötig solange die Seite unter /<repo>/ auf github.io läuft) */
export function url(path: string): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  return base + (path.startsWith('/') ? path : '/' + path);
}

const dateFmt = new Intl.DateTimeFormat('de-CH', { day: '2-digit', month: 'long', year: 'numeric', timeZone: 'UTC' });
const monthFmt = new Intl.DateTimeFormat('de-CH', { month: 'long', year: 'numeric', timeZone: 'UTC' });
export const formatDate = (d: Date) => dateFmt.format(d);
export const formatMonth = (d: Date) => monthFmt.format(d);

/** Kommende Auftritte (ab heute), aufsteigend sortiert */
export async function upcomingGigs() {
  const today = new Date();
  today.setUTCHours(0, 0, 0, 0);
  const all = await getCollection('auftritte');
  return all.filter((g) => g.data.date >= today).sort((a, b) => +a.data.date - +b.data.date);
}

// Alle Galerie-Bilder einmalig per Glob einlesen (Astro optimiert sie beim Build)
const galleryImages = import.meta.glob<{ default: ImageMetadata }>('/src/content/galerien/*/*.{jpg,jpeg,png,webp,JPG,JPEG,PNG,WEBP}', {
  eager: true,
});

export function imagesOf(slug: string): { file: string; path: string; img: ImageMetadata }[] {
  const prefix = `/src/content/galerien/${slug}/`;
  return Object.entries(galleryImages)
    .filter(([p]) => p.startsWith(prefix))
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([p, m]) => ({ file: p.slice(prefix.length), path: p, img: m.default }));
}

/**
 * Winziges, unscharfes Vorschaubild (ca. 300 Bytes) als Data-URI.
 * Wird als Hintergrund angezeigt, bis das richtige Bild geladen ist (ähnlich BlurHash/ThumbHash).
 */
const placeholderCache = new Map<string, string>();
export async function placeholder(srcPath: string): Promise<string> {
  const cached = placeholderCache.get(srcPath);
  if (cached) return cached;
  const { default: sharp } = await import('sharp');
  const { join } = await import('node:path');
  // Build läuft im Projektverzeichnis; srcPath ist z.B. "/src/content/galerien/x/001.jpg"
  const file = join(process.cwd(), srcPath);
  const buf = await sharp(file).resize(16, 16, { fit: 'inside' }).webp({ quality: 40 }).toBuffer();
  const uri = `data:image/webp;base64,${buf.toString('base64')}`;
  placeholderCache.set(srcPath, uri);
  return uri;
}

export async function galleries() {
  const all = await getCollection('galerien');
  return all
    .sort((a, b) => +b.data.date - +a.data.date)
    .map((g) => {
      const images = imagesOf(g.id);
      const cover = images.find((i) => i.file === g.data.cover) ?? images[0];
      return { ...g, images, cover };
    });
}
