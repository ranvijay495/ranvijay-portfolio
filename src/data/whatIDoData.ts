export interface WhatIDoCard {
  title: string;
  subtitle: string;
  description: string;
  tags: string[];
}

export const whatIDoData: WhatIDoCard[] = [
  {
    title: 'M&A & INVESTMENTS',
    subtitle: 'End-to-End Deal Execution',
    description:
      'Leading acquisitions from sourcing to post-merger integration — due diligence, CXO alignment, investor engagement, and value realization across finance, legal, and operations.',
    tags: ['Due Diligence', 'Post-Merger Integration', 'Investor Relations', 'Deal Structuring', 'LOI Drafting'],
  },
  {
    title: 'STRATEGY & TURNAROUNDS',
    subtitle: 'Revenue Recovery & Cost Optimization',
    description:
      'Reversing revenue declines and margin compression through cross-platform analytics, structured cost recovery programs, and CXO-aligned execution roadmaps.',
    tags: ['Revenue Strategy', 'EBITDA Recovery', 'Data Analytics', 'Cost Optimization', 'Cloud & Infra'],
  },
];
