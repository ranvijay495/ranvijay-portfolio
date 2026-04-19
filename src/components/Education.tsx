import { educationData } from '../data/educationData';
import './styles/Education.css';

export default function Education() {
  return (
    <section className="section education" id="education">
      <h3 className="section-title reveal">Education</h3>
      <div className="edu-list">
        {educationData.map((edu) => (
          <div className="edu-item reveal" key={edu.institution}>
            <div className="edu-institute">
              <a href={edu.url} target="_blank" rel="noreferrer">
                {edu.institution}
              </a>
            </div>
            <div className="edu-details-wrapper">
              <div className="edu-degree">
                {edu.degree}
              </div>
              <div className="edu-meta">
                {edu.period} {edu.grade ? `— ${edu.grade}` : ''}
              </div>
              <div className="edu-highlights">
                {edu.tags.map((tag) => {
                  const isGold = tag === "Dean's List" || tag.includes("First in");
                  return (
                    <span className={`edu-tag ${isGold ? 'edu-tag-gold' : ''}`} key={tag}>
                      {tag}
                    </span>
                  );
                })}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
