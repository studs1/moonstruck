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
    title: z.string(),
    date: z.coerce.date(),
    description: z.string().optional(),
    /** Dateiname des Titelbilds, z.B. "006.jpg" (Standard: erstes Bild) */
    cover: z.string().optional(),
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
