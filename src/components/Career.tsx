import { careerData } from '../data/careerData';
import StoryMask from './StoryMask';
import './styles/Career.css';

export default function Career() {
  return (
    <section className="section career-section" id="career">
      <div className="career-items">
        {careerData.map((entry) => {
          // Wrap content in identical structure for dual mapping
          const storyHtml = `<p class="career-desc story-text">${entry.story || entry.corporate}</p>`;
          const corporateHtml = `<p class="career-desc corporate-text">${entry.corporate}</p>`;

          return (
            <div className="career-item reveal" key={entry.id}>
              <div className="career-year">{entry.year}</div>
              <div className="career-details">
                <div className="career-role">
                  {entry.roleTitle}
                </div>
                <div className="career-company">
                  {entry.companyUrl ? (
                    <a href={entry.companyUrl} target="_blank" rel="noreferrer">
                      {entry.company}
                    </a>
                  ) : (
                    entry.company
                  )}
                  {entry.subtitle ? ` — ${entry.subtitle}` : ''}
                </div>
                
                <div className="career-content-wrapper">
                  {entry.hasDualContent ? (
                    <StoryMask
                      defaultHtml={storyHtml}
                      maskHtml={corporateHtml}
                      className="career-mask-wrapper"
                    />
                  ) : (
                    <p 
                      className="career-desc corporate-text" 
                      dangerouslySetInnerHTML={{ __html: entry.corporate }} 
                    />
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
