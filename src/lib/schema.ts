/**
 * Strukturierte Daten (schema.org, JSON-LD) für Google & KI-Assistenten:
 * Band (MusicGroup), Auftritte (MusicEvent), Fotogalerien (ImageGallery), Brotkrumen.
 */
import { getCollection, type CollectionEntry } from 'astro:content';
import { contact, repertoire } from '../data/site';

export function abs(site: URL | undefined, path: string): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  return new URL(base + path, site).href;
}

export async function bandSchema(site: URL | undefined, image?: string) {
  const members = (await getCollection('mitglieder')).sort((a, b) => a.data.order - b.data.order);
  return {
    '@context': 'https://schema.org',
    '@type': 'MusicGroup',
    '@id': abs(site, '/#band'),
    name: 'moonstruck',
    alternateName: 'Moonstruck – soul blues jazz',
    slogan: 'soul blues jazz',
    description:
      'Soul-, Blues- und Jazzband aus Visp (Wallis), gegründet 1995. Acht Musiker spielen New Orleans Jazz, Street Jazz, Blues, Bebop und Funk für Party- und Konzertpublikum: Hochzeiten, Firmenanlässe, Festivals und Konzerte.',
    url: abs(site, '/'),
    logo: abs(site, '/favicon.svg'),
    image,
    genre: repertoire,
    foundingDate: '1995',
    foundingLocation: { '@type': 'Place', name: 'Visp', address: { '@type': 'PostalAddress', addressLocality: 'Visp', addressRegion: 'VS', addressCountry: 'CH' } },
    areaServed: ['Wallis', 'Schweiz'],
    email: contact.email,
    telephone: contact.phone.replace(/\s/g, ''),
    address: {
      '@type': 'PostalAddress',
      streetAddress: contact.street,
      postalCode: contact.city.split(' ')[0],
      addressLocality: contact.city.split(' ').slice(1).join(' '),
      addressCountry: 'CH',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'Booking',
      name: contact.person,
      email: contact.email,
      telephone: contact.phone.replace(/\s/g, ''),
      availableLanguage: 'de',
    },
    member: members.map((m) => ({
      '@type': 'OrganizationRole',
      member: { '@type': 'Person', name: m.data.name },
      roleName: m.data.instrument,
    })),
  };
}

export function eventSchema(site: URL | undefined, g: CollectionEntry<'auftritte'>, image?: string) {
  const day = g.data.date.toISOString().slice(0, 10);
  // Uhrzeit wie "20:00 Uhr" → ISO-Zeit, falls vorhanden
  const t = g.data.zeit?.match(/(\d{1,2})[:.](\d{2})/);
  const startDate = t ? `${day}T${t[1].padStart(2, '0')}:${t[2]}` : day;
  return {
    '@context': 'https://schema.org',
    '@type': 'MusicEvent',
    name: `moonstruck live: ${g.data.title}`,
    startDate,
    eventStatus: 'https://schema.org/EventScheduled',
    eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
    location: {
      '@type': 'Place',
      name: g.data.title,
      address: { '@type': 'PostalAddress', addressLocality: g.data.ort, addressCountry: 'CH' },
    },
    performer: { '@id': abs(site, '/#band') },
    image,
    url: g.data.link ?? abs(site, '/events/'),
    description: `moonstruck (soul blues jazz) live: ${g.data.title}, ${g.data.ort}.`,
  };
}

export function breadcrumbSchema(site: URL | undefined, items: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({ '@type': 'ListItem', position: i + 1, name: it.name, item: abs(site, it.path) })),
  };
}
