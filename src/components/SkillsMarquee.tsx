import React from 'react';
import './styles/SkillsMarquee.css';

const UNIQUE_SKILLS = [
  'Leadership', 'Executive Alignment', 'Gen Management', 'Corp Strategy', 
  'Corp Development', 'Business Development', 'Investor Relations', 'Ops Management',
  'M&A', 'Post-Merger Integration', 'Due Diligence', 'Negotiations', 
  'Data Analytics', 'Digital Transformation', 'Context Engineering', 
  'Agentic System Design', 'LLM-Augmented M&A Diligence', 'Multi-Model AI Pipelines', 
  'MCP & Tool-Use Orchestration', 'Production AI Deployment', 'Claude API', 
  'Python', 'Node.js'
];

export default function SkillsMarquee() {
  const MarqueeHalf = () => (
    <>
      {UNIQUE_SKILLS.map((skill, index) => (
        <React.Fragment key={index}>
          <span className="skills-marquee-item">{skill}</span>
          <span className="skills-marquee-bullet">•</span>
        </React.Fragment>
      ))}
    </>
  );

  return (
    <section className="skills-marquee-section reveal" id="skills">
      <div style={{ padding: '0 5%', marginBottom: '60px' }}>
        <h3 className="section-title reveal">Skills</h3>
      </div>
      <div className="skills-marquee-container">
        {/* The track must contain the exact array duplicated twice so it can loop at 50% seamlessly */}
        <div className="skills-marquee-track">
          <MarqueeHalf />
          <MarqueeHalf />
        </div>
      </div>
    </section>
  );
}
