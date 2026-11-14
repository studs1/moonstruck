// @ts-check
import { defineConfig } from 'astro/config';

// SITE / BASE_PATH werden in der GitHub-Action gesetzt (actions/configure-pages).
// Solange die Seite unter <user>.github.io/<repo> läuft, ist BASE_PATH z.B. "/moonstruck";
// sobald www.moonstruck.ch als Custom Domain hinterlegt ist, ist BASE_PATH leer.
const site = process.env.SITE || 'https://www.moonstruck.ch';
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
  image: {
    responsiveStyles: true,
  },
});
