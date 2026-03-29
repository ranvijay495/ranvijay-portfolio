export interface CareerEntry {
  id: string;
  roleTitle: string;
  company: string;
  companyUrl?: string;
  subtitle?: string;
  year: string;
  corporate: string;
  story: string;
  hasDualContent?: boolean;
}

export const careerData: CareerEntry[] = [
  {
    id: 'mps',
    roleTitle: 'Director — Corporate Development, CEO\'s Office & Strategy',
    company: 'MPS Limited',
    companyUrl: 'https://www.mpslimited.com/',
    subtitle: '~USD 450M Market Cap',
    year: 'NOW',
    hasDualContent: true,
    corporate: `Delivered MPS's <a href="https://www.unboundmedicine.com/news/unbound_medicine_acquired_by_mps_limited" target="_blank" rel="noreferrer">largest-ever acquisition (USD 16.5M)</a>. Spearheaded post-acquisition integration of <a href="https://www.unboundmedicine.com/" target="_blank" rel="noreferrer">Unbound Medicine</a> across Finance, IT, Legal, Business and Operations. Reversed a 40% YoY revenue decline to 8% growth within 5 months. Drove EBITDA margin recovery from 18% back toward 30% benchmark.`,
    story: `Led the <a href="https://www.unboundmedicine.com/news/unbound_medicine_acquired_by_mps_limited" target="_blank" rel="noreferrer">acquisition of Unbound Medicine</a> from LOI to SPA, driving FDD, TDD, and LDD diligence workstreams and executive alignment. Working closely with the CEO on MPS's global M&A initiatives. Tackling abstract, unstructured strategic problems and turning them into clear decisions and actionable outcomes. Comfortable being uncomfortable, mentored by the best, and confident I'll figure it out and deliver.`,
  },
  {
    id: 'isb',
    roleTitle: 'PGP — Indian School of Business',
    company: 'ISB',
    companyUrl: 'https://www.isb.edu/',
    subtitle: "Dean's List · CGPA 3.82/4",
    year: '2024–25',
    hasDualContent: true,
    corporate: `Majors in Strategy & Leadership and IT Management. Graduated on Dean's List with a 3.82/4 CGPA, building expertise in corporate strategy, digital transformation, and business leadership.`,
    story: `Stepped back into the classroom to build business knowledge, strategy, and leadership muscle. This experience helped me connect execution on the ground with enterprise-level thinking — bridging the gap between running operations and shaping where the company goes next.`,
  },
  {
    id: 'nmm-3eo',
    roleTitle: 'Operations Manager (3EO)',
    company: 'Northern Marine Management',
    companyUrl: 'https://www.nmg-stena.com/',
    subtitle: 'Glasgow',
    year: '2022–24',
    hasDualContent: true,
    corporate: `Led a 16-person multinational team through multiple 72k running hour MGE overhauls worth over $1.5M. Oversaw operation and maintenance of Tri-Fuel Engines (48MW). Controlled inventory valued at over $10M. Initiated spare part management project saving $1.4M. Ensured compliance across USCG, OCIMF SIRE, CDI, flag state, and port state inspections.`,
    story: `Leveled up into a bigger role, leading a 16-member multinational team through heavy engine overhauls, high-power tri-fuel operations, and the kind of maintenance planning that keeps ships moving and accountants happy. Took charge of spares, schedules, and safety, cut costs without cutting corners, and made sure audits, operations, and day-to-day realities ran smoothly with no surprises.`,
  },
  {
    id: 'nmm-4eo',
    roleTitle: 'Operations Manager (4EO)',
    company: 'Northern Marine Management',
    companyUrl: 'https://www.nmg-stena.com/',
    subtitle: 'Glasgow',
    year: '2020–22',
    hasDualContent: true,
    corporate: `Led a multinational team of 12+ through 30+ critical bunkering operations valued at over $35M with zero commercial losses. Strategically managed fuel inventory. Successfully averted a major engine fire as leader of the firefighting team. Delivered over 40 training sessions on safety and emergency response. Maintained precise technical records in compliance with global regulations.`,
    story: `Got hands-on with real-world vessel operations, leading multinational crews, managing critical machinery and fuel, running safety drills, and responding to situations where things actually go wrong. Learned to stay calm, take charge, and deliver under pressure, while keeping safety, compliance, and day-to-day operations rock solid.`,
  },
  {
    id: 'nmm-je',
    roleTitle: 'Junior Engineer',
    company: 'Northern Marine Management',
    companyUrl: 'https://www.nmg-stena.com/',
    subtitle: 'Glasgow',
    year: '2020',
    hasDualContent: true,
    corporate: `Took on engineering responsibilities early in career. Applied classroom learning to real operational problems. Built foundational technical competence in live maritime environments.`,
    story: `Took on real responsibility early as a Junior Engineer. Applied classroom learning to real problems and resolved issues hands-on. Built confidence by owning outcomes and delivering in live environments.`,
  },
  {
    id: 'nmm-trainee',
    roleTitle: 'Trainee Marine Engineer',
    company: 'Northern Marine Management',
    companyUrl: 'https://www.nmg-stena.com/',
    subtitle: 'Glasgow',
    year: '2018–20',
    hasDualContent: true,
    corporate: `Completed structured marine engineering training programme. Developed foundational skills in vessel operations, maintenance systems, and regulatory compliance under professional mentorship.`,
    story: `Bridged the gap between 'The Professor said so' and 'The Officer did so' by shadowing professionals to see how university theory actually moves the needle in the real world.`,
  },
  {
    id: 'bits',
    roleTitle: 'B.Tech Marine Engineering',
    company: 'BITS Pilani',
    companyUrl: 'https://www.bits-pilani.ac.in/',
    subtitle: 'CGPA 9.65/10',
    year: '2014–18',
    hasDualContent: false,
    corporate: `Graduated from one of India's premier engineering institutions with distinction in Marine Engineering, building a strong foundation in technical operations, systems thinking, and engineering leadership.`,
    story: `Graduated from one of India's premier engineering institutions with distinction in Marine Engineering, building a strong foundation in technical operations, systems thinking, and engineering leadership.`,
  },
];
