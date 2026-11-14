import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

/** Bandmitglieder: src/content/mitglieder/<slug>.md + Fotos daneben */
const mitglieder = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/mitglieder' }),
  schema: ({ image }) =>
    z.object({
      name: z.string(),
      instrument: z.string(),
      order: z.number(),
      portrait: image(),
      live: image().optional(),
    }),
});

/**
 * Fotogalerien: ein Ordner pro Galerie mit index.md und beliebig vielen .jpg.
 * Alle Bilder im Ordner werden automatisch (alphabetisch sortiert) angezeigt.
 */
const galerien = defineCollection({
  loader: glob({ pattern: '*/index.md', base: './src/content/galerien', generateId: ({ entry }) => entry.split('/')[0] }),
  schema: z.object({
    /** Anlass, z.B. "Jazzchälli Visp" */
    title: z.string(),
    date: z.coerce.date(),
    /** Ort, z.B. "Visp" */
    ort: z.string().optional(),
    /** Kurzbeschreibung (Untertitel, Meta-Description, Social-Media-Vorschau) */
    description: z.string().optional(),
    /** Dateiname des Titelbilds, z.B. "006.jpg" (Standard: erstes Bild) */
    cover: z.string().optional(),
    /** Fotograf/in, wird unter der Galerie genannt */
    fotograf: z.string().optional(),
    /** Ausschnitt aus der Setlist */
    setlist: z.array(z.string()).optional(),
    /** Video- oder Audioclip, Datei in public/, z.B. "/video/staldbach.mp4" oder "/audio/clip.mp3" */
    clip: z
      .object({
        src: z.string(),
        titel: z.string().optional(),
        poster: z.string().optional(),
      })
      .optional(),
    /** Bilder in Kapitel gruppieren; nicht zugeordnete Bilder erscheinen am Schluss */
    kapitel: z
      .array(
        z.object({
          titel: z.string(),
          text: z.string().optional(),
          bilder: z.array(z.string()),
        }),
      )
      .optional(),
    /** Alt-Text und Bildlegende pro Datei, z.B. "003.jpg": { alt: "...", text: "..." } */
    bilder: z.record(z.string(), z.object({ alt: z.string().optional(), text: z.string().optional() })).optional(),
  }),
});

/** Kommende Auftritte: src/content/auftritte/<datum>-<name>.md */
const auftritte = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/auftritte' }),
  schema: z.object({
    date: z.coerce.date(),
    title: z.string(),
    ort: z.string(),
    zeit: z.string().optional(),
    link: z.url().optional(),
  }),
});

export const collections = { mitglieder, galerien, auftritte };
