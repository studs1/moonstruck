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
// Alte Galerie-Adressen (Jimdo mit Umlauten, Jahr am Schluss) → neues Schema JAHR-name
const oldGalleries = {
  'jazzchälli2024': '2024-jazzchaelli',
  'jazzchälli2022': '2022-jazzchaelli',
  'grächen2014': '2014-graechen',
  'jubliläum2005': '2005-jubilaeum',
  'unterbäch-2019': '2019-unterbaech',
  '150-jahre-edelweiss-st-niklaus-2022': '2022-150-jahre-edelweiss-st-niklaus',
  '20-jahre-enalpin2022': '2022-20-jahre-enalpin',
  'benefiz2000': '2000-benefiz',
  'bluesnight2014': '2014-bluesnight',
  'bodmer2010': '2010-bodmer',
  'champagnerdinner-saas-fee-2023': '2023-champagnerdinner-saas-fee',
  'coppex2016': '2016-coppex',
  'diavolezza2006': '2006-diavolezza',
  'gampel-jazz-2019': '2019-gampel-jazz',
  'gornergrat2001': '2001-gornergrat',
  'graechen2014': '2014-graechen',
  'jazzchaelli2004': '2004-jazzchaelli',
  'jazzchaelli2011': '2011-jazzchaelli',
  'jazzchaelli2022': '2022-jazzchaelli',
  'jazzchaelli2024': '2024-jazzchaelli',
  'jublilaeum2005': '2005-jubilaeum',
  'laposte2010': '2010-laposte',
  'lauberiwisa2012': '2012-lauberiwisa',
  'lax2002': '2002-lax',
  'luzern2018': '2018-luzern',
  'mgb2023': '2023-mgb',
  'rebsorten2011': '2011-rebsorten',
  'riederalp2002': '2002-riederalp',
  'saas-fee-genussmeile-2019': '2019-saas-fee-genussmeile',
  'savognin2016': '2016-savognin',
  'savognin2017': '2017-savognin',
  'shootinggraechen2015': '2015-shootinggraechen',
  'staldbach2023': '2023-staldbach',
  'tuennel2000': '2000-tuennel',
  'ungarn2001': '2001-ungarn',
  'unterbaech-2019': '2019-unterbaech',
  'valley2002': '2002-valley',
  'vifra2013': '2013-vifra',
  'vispe2009': '2009-vispe',
  'zermatt2009': '2009-zermatt',
};

/** @type {Record<string, string>} */
const redirects = {};
for (const m of members) redirects[`/die-band/bandmitglieder/${m}`] = '/die-band/bandmitglieder/';
for (const [from, to] of Object.entries(oldGalleries)) {
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
