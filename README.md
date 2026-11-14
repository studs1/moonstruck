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

```md
---
title: Jazzchälli Visp
date: 2024-09-01
description: Optionaler Text unter dem Titel
cover: 003.jpg         # optional, sonst erstes Bild
---
```

Alle Bilder im Ordner werden alphabetisch angezeigt (z.B. `001.jpg`, `002.jpg`, …).
Bilder vorher auf max. ca. 2000 px Kantenlänge verkleinern; Astro erzeugt beim Build automatisch optimierte WebP-Varianten.

## Domain www.moonstruck.ch

Solange keine Custom Domain hinterlegt ist, läuft die Seite unter `https://<user>.github.io/<repo>/`.
Umstellung:

1. GitHub → Repository → *Settings → Pages* → Custom domain `www.moonstruck.ch` eintragen, *Enforce HTTPS* aktivieren.
2. Beim Domain-Anbieter DNS setzen:
   - `www` → `CNAME` → `<user>.github.io`
   - `@` (Apex) → `A` auf `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
3. Workflow einmal neu laufen lassen (Actions → *Run workflow*), damit die Links ohne `/<repo>` gebaut werden.
