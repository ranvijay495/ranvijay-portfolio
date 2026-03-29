export interface EducationEntry {
  institution: string;
  url: string;
  degree: string;
  period: string;
  grade: string;
  tags: string[];
}

export const educationData: EducationEntry[] = [
  {
    institution: 'Indian School of Business',
    url: 'https://www.isb.edu/',
    degree: 'PGP',
    period: 'Apr 2024 – Apr 2025',
    grade: "CGPA: 3.82/4 · Dean's List",
    tags: ['Strategy & Leadership', 'IT Management'],
  },
  {
    institution: 'BITS Pilani',
    url: 'https://www.bits-pilani.ac.in/',
    degree: 'B.Tech Marine Engineering',
    period: 'Aug 2014 – Jul 2018',
    grade: 'CGPA: 9.65/10',
    tags: ['Marine Engineering', 'Systems & Operations'],
  },
];
