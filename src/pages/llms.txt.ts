/**
 * llms.txt – kompakte Zusammenfassung der Website für KI-Assistenten (ChatGPT, Claude, Perplexity …).
 * Format: https://llmstxt.org — wird bei jedem Build aus den Inhalten erzeugt, ist also immer aktuell.
 */
import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { contact, repertoire, sounds, highlights } from '../data/site';
import { upcomingGigs, galleries, formatDate, formatMonth } from '../lib/util';
import { abs } from '../lib/schema';

export const GET: APIRoute = async ({ site }) => {
  const u = (p: string) => abs(site, p);
  const members = (await getCollection('mitglieder')).sort((a, b) => a.data.order - b.data.order);
  const gigs = await upcomingGigs();
  const gals = await galleries();

  const md = `# moonstruck – soul blues jazz

> moonstruck ist eine Soul-, Blues- und Jazzband aus Visp (Wallis, Schweiz), gegründet 1995. Acht Musiker spielen ${repertoire.join(', ')} – «einfach alles, was ein Party- und Konzertpublikum verzaubert». Die Band ist buchbar für Hochzeiten, Firmenanlässe, Festivals und Konzerte, auf Wunsch auch als Street-Band ohne Verstärkung.

## Fakten

- Gründung: 1995 in Visp (VS)
- Besetzung: 8 Musiker, seit 1998 mit Lead Vocal
- Stil: traditioneller New Orleans Jazz, Street Jazz, Blues, Bebop, Funk, Soul; Repertoire u.a. Blues Brothers, The Commitments, James Brown
- Sprache der Website: Deutsch

## Buchung & Kontakt

- Kontaktperson: ${contact.person}, ${contact.street}, ${contact.city}
- Telefon: ${contact.phone}
- E-Mail: ${contact.email}
- [Kontaktseite](${u('/kontakt/')})

## Nächste öffentliche Auftritte

${gigs.length ? gigs.map((g) => `- ${formatDate(g.data.date)}${g.data.zeit ? `, ${g.data.zeit}` : ''}: ${g.data.title}, ${g.data.ort}`).join('\n') : '- Zurzeit keine öffentlichen Auftritte geplant.'}

## Bandmitglieder

${members.map((m) => `- ${m.data.name}: ${m.data.instrument}`).join('\n')}

## Seiten

- [Startseite](${u('/')}): Überblick, nächster Auftritt
- [Die Band](${u('/die-band/')}): Geschichte der Band seit 1995, Bandbeschrieb als PDF
- [Bandmitglieder](${u('/die-band/bandmitglieder/')}): die acht Musiker mit Instrumenten
- [Klangprobe](${u('/die-band/klangprobe/')}): Liveaufnahmen (${sounds.map((s) => s.title).join(', ')})
- [Stageplan](${u('/die-band/stageplan/')}): Bühnenaufstellung und Technik für Veranstalter (PDF)
- [Höhepunkte](${u('/events/')}): kommende Termine und bisherige Highlights
- [Fotogalerien](${u('/events/fotogalerien/')}): ${gals.length} Galerien von ${gals.at(-1)?.data.date.getUTCFullYear()} bis ${gals[0]?.data.date.getUTCFullYear()}
- [Kontakt](${u('/kontakt/')})

## Downloads

- [Bandbeschrieb (PDF)](${u('/downloads/Bandbeschrieb_moonstruck.pdf')})
- [Stageplan (PDF)](${u('/downloads/Stage-setup_moonstruck.pdf')})

## Bisherige Highlights

${highlights.map((h) => `- ${h}`).join('\n')}

## Fotogalerien

${gals.map((g) => `- [${g.data.title}${g.data.ort ? `, ${g.data.ort}` : ''} (${formatMonth(g.data.date)})](${u(`/events/fotogalerien/${g.id}/`)})`).join('\n')}
`;

  return new Response(md, { headers: { 'Content-Type': 'text/markdown; charset=utf-8' } });
};
