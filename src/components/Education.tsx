import { educationData } from '../data/educationData';
import './styles/Education.css';

export default function Education() {
  return (
    <section className="section education" id="education">
      <h3 className="section-title reveal">Education</h3>
      <div className="edu-grid">
        {educationData.map((edu) => (
          <div className="edu-card reveal" key={edu.institution}>
            <h3>
              <a href={edu.url} target="_blank" rel="noreferrer">
                {edu.institution}
              </a>
            </h3>
            <h4>
              {edu.degree} &middot; {edu.period}
            </h4>
            <p>{edu.grade}</p>
            <div className="edu-highlights">
              {edu.tags.map((tag) => (
                <span className="edu-tag" key={tag}>
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
