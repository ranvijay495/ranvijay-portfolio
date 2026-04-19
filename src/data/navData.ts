export interface OrgLogo {
  name: string;
  url: string;
  src: string;
  alt: string;
}

export const orgLogos: OrgLogo[] = [
  { name: 'BITS Pilani', url: 'https://www.bits-pilani.ac.in/', src: '/logos/bits.png', alt: 'BITS Pilani' },
  { name: 'ISB', url: 'https://www.isb.edu/', src: '/logos/isb.svg', alt: 'ISB' },
  { name: 'NMM', url: 'https://www.nmg-stena.com/', src: '/logos/nmg.png', alt: 'Northern Marine Management' },
  { name: 'MPS Limited', url: 'https://www.mpslimited.com/', src: '/logos/mps.png', alt: 'MPS Limited' },
  { name: 'Unbound', url: 'https://www.unboundmedicine.com/', src: '/logos/unbound.png', alt: 'Unbound Medicine' },
];

export const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Career', href: '#career' },
  { label: 'Contact', href: '#contact' },
];
