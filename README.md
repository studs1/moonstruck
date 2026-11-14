# moonstruck.ch

Website der Band **moonstruck – soul blues jazz**, gebaut mit [Astro](https://astro.build) und automatisch auf GitHub Pages veröffentlicht.

## Lokal arbeiten

```sh
npm install        # einmalig
npm run dev        # Entwicklungsserver auf http://localhost:4321
npm run build      # Produktions-Build nach ./dist
npm run preview    # Build lokal ansehen
```

Jeder Push auf `main` baut und veröffentlicht die Seite automatisch (`.github/workflows/deploy.yml`).
Zusätzlich wird täglich neu gebaut, damit vergangene Auftritte von selbst verschwinden.

## Inhalte pflegen

| Was | Wo |
| --- | --- |
| **Neuer Auftritt** | Datei `src/content/auftritte/JJJJ-MM-TT-name.md` anlegen (siehe Beispiel unten) |
| **Neue Fotogalerie** | Ordner `src/content/galerien/<name>/` mit `index.md` + JPG-Dateien |
| Bandmitglieder | `src/content/mitglieder/<name>.md` + `-portrait.jpg` / `-live.jpg` |
| Klangproben | MP3 nach `public/audio/`, Eintrag in `src/data/site.ts` (`sounds`) |
| Kontaktdaten, Menü, Highlights, Repertoire | `src/data/site.ts` |
| PDFs (Bandbeschrieb, Stageplan) | `public/downloads/` |

### Auftritt

```md
---
date: 2027-03-20
title: Jazznacht
ort: Brig
zeit: 20:00 Uhr        # optional
link: https://...      # optional
---
```

### Fotogalerie

Nur `title` und `date` sind Pflicht, alles andere ist optional (vollständiges Beispiel: `src/content/galerien/staldbach2023/index.md`).

```md
---
title: Jazzchälli Visp
date: 2024-09-01
ort: Visp
description: Ein Satz für Untertitel, Google und WhatsApp-Vorschau
cover: 003.jpg                   # Titelbild, sonst das erste
fotograf: Vorname Nachname
setlist: ["Hello Dolly", "I Feel Good", "Everybody Needs Somebody"]
clip: { src: /video/jazzchaelli-2024.mp4, titel: "Ausschnitt", poster: /video/jazzchaelli-2024.jpg }
kapitel:                         # Bilder gruppieren; Rest erscheint unter «Weitere Bilder»
  - titel: Soundcheck
    bilder: ["001.jpg", "002.jpg"]
  - titel: Konzert
    text: Optionaler Satz zum Kapitel
    bilder: ["003.jpg", "004.jpg"]
bilder:                          # Alt-Text (Barrierefreiheit/Google) und Legende pro Bild
  "003.jpg": { alt: "Die ganze Band auf der Bühne", text: "Zugabe um Mitternacht" }
---

Hier ein paar Sätze zum Abend (Markdown). Erscheint als Einleitung unter dem Titelbild.
```

Alle Bilder im Ordner werden angezeigt (alphabetisch, z.B. `001.jpg`, `002.jpg`, …), im Originalformat ohne Beschnitt.
Bilder vorher auf max. ca. 2000 px Kantenlänge verkleinern. Astro erzeugt beim Build AVIF/WebP in mehreren Grössen und einen unscharfen Platzhalter.
Videos und Audioclips liegen in `public/video/` bzw. `public/audio/` (kurz halten, MP4/H.264 bzw. MP3).

Jedes Bild hat einen teilbaren Link, z.B. `/events/fotogalerien/staldbach2023/#foto-3`.

## Domain www.moonstruck.ch

Solange keine Custom Domain hinterlegt ist, läuft die Seite unter `https://<user>.github.io/<repo>/`.
Umstellung:

1. GitHub → Repository → *Settings → Pages* → Custom domain `www.moonstruck.ch` eintragen, *Enforce HTTPS* aktivieren.
2. Beim Domain-Anbieter DNS setzen:
   - `www` → `CNAME` → `<user>.github.io`
   - `@` (Apex) → `A` auf `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
3. Workflow einmal neu laufen lassen (Actions → *Run workflow*), damit die Links ohne `/<repo>` gebaut werden.
