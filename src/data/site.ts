/** Zentrale Inhalte, die nicht in eine Content-Collection passen. */

export const contact = {
  name: 'moonstruck',
  person: 'Pascal Salzmann',
  street: 'Kleegärtenstrasse 1C',
  city: '3930 Visp',
  phone: '+41 79 611 18 75',
  email: 'info@moonstruck.ch',
};

export const nav = [
  { href: '/', label: 'Home' },
  {
    href: '/die-band/',
    label: 'Die Band',
    children: [
      { href: '/die-band/bandmitglieder/', label: 'Bandmitglieder' },
      { href: '/die-band/klangprobe/', label: 'Klangprobe' },
      { href: '/die-band/stageplan/', label: 'Stageplan' },
    ],
  },
  { href: '/events/', label: 'Auftritte' },
  { href: '/events/fotogalerien/', label: 'Fotogalerien' },
  { href: '/kontakt/', label: 'Kontakt' },
];

export const repertoire = ['New Orleans Jazz', 'Street Jazz', 'Blues', 'Bebop', 'Funk', 'Soul'];

/** Klangproben: Dateien liegen in public/audio/ */
export const sounds = [
  { title: 'Hello Dolly', file: 'hellodolly.mp3' },
  { title: 'Jesus', file: 'jesus.mp3' },
  { title: 'I Feel Good', artist: 'James Brown', file: 'ifeelgood.mp3' },
  { title: 'Everybody', artist: 'Blues Brothers', file: 'everybody.mp3' },
  { title: 'Mad Guitar Blues', file: 'madguitar.mp3' },
  { title: 'Just Like That', file: 'justlikethat.mp3' },
  { title: 'Spinning Wheel', file: 'spinning.mp3' },
];

/** Bisherige Band-Highlights */
export const highlights = [
  'Savognin Bergbahnen',
  'Jazzclub Lindenholz',
  'Bluesnight, La Poste Visp',
  '10 Jahre moonstruck (November 2005)',
  'Open Air Frutigen, Rustica Pub',
  'Rocknacht Raron',
  'Gommer Open Air Lax',
  'Kulturwoche Riederalp',
  'Pontresina',
  'Ungarn-Tournee (diverse Konzerte in Ungarn)',
  'Benefizkonzert «Müsig fer z\'Oberwallis», Visp',
  'Open Air Gampel',
  'Sion 2006 (Feier auf der Planta)',
];
