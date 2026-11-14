// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// SITE / BASE_PATH werden in der GitHub-Action gesetzt (actions/configure-pages).
// Solange die Seite unter <user>.github.io/<repo> läuft, ist BASE_PATH z.B. "/moonstruck";
// sobald www.moonstruck.ch als Custom Domain hinterlegt ist, ist BASE_PATH leer.
// Immer https verwenden: configure-pages liefert "http://…", solange "Enforce HTTPS" noch nicht aktiv ist.
const site = (process.env.SITE || 'https://www.moonstruck.ch').replace(/^http:\/\//, 'https://');
const base = process.env.BASE_PATH || '/';

// Alte Jimdo-URLs (Umlaute, Einzelseiten der Mitglieder) auf neue Seiten umleiten
const members = ['urs-heinzmann', 'andre-oggier', 'romeo-werlen', 'renato-zimmermann',
  'andreas-jäger', 'dario-heinzmann', 'pascal-salzmann', 'stefan-studer'];
const umlautGalleries = {
  'jazzchälli2024': 'jazzchaelli2024',
  'jazzchälli2022': 'jazzchaelli2022',
  'grächen2014': 'graechen2014',
  'jubliläum2005': 'jublilaeum2005',
  'unterbäch-2019': 'unterbaech-2019',
};

/** @type {Record<string, string>} */
const redirects = {};
for (const m of members) redirects[`/die-band/bandmitglieder/${m}`] = '/die-band/bandmitglieder/';
for (const [from, to] of Object.entries(umlautGalleries)) {
  redirects[`/events/fotogalerien/${from}`] = `/events/fotogalerien/${to}/`;
}

export default defineConfig({
  site,
  base,
  trailingSlash: 'ignore',
  redirects,
  integrations: [
    sitemap({
      // Umleitungsseiten (alte Jimdo-URLs) und 404 gehören nicht in die Sitemap
      filter: (page) => {
        const path = decodeURIComponent(new URL(page).pathname);
        return !path.includes('/404') && !Object.keys(redirects).some((r) => path.endsWith(r + '/') || path.endsWith(r));
      },
    }),
  ],
  image: {
    responsiveStyles: true,
  },
});
