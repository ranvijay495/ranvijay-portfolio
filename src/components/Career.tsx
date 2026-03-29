import { useVoice } from '../hooks/useVoice';
import { careerData } from '../data/careerData';
import './styles/Career.css';

export default function Career() {
  const { mode } = useVoice();

  return (
    <section className="career-section" id="career">
      <h2 className="career-heading reveal">
        My career <span>&</span>
        <br />
        experience
      </h2>
      <div className="career-items">
        <div className="career-line">
          <div className="career-dot-glow" />
        </div>

        {careerData.map((entry) => (
          <div className="career-item reveal" key={entry.id}>
            <div className="career-left">
              <div>
                <div className="career-role-title">
                  {entry.companyUrl && entry.id === 'isb' ? (
                    <>
                      PGP —{' '}
                      <a href={entry.companyUrl} target="_blank" rel="noreferrer">
                        Indian School of Business
                      </a>
                    </>
                  ) : (
                    entry.roleTitle
                  )}
                </div>
                <div className="career-company">
                  {entry.companyUrl && entry.id !== 'isb' ? (
                    <>
                      <a href={entry.companyUrl} target="_blank" rel="noreferrer">
                        {entry.company}
                      </a>
                      {entry.subtitle ? ` · ${entry.subtitle}` : ''}
                    </>
                  ) : entry.id === 'isb' ? (
                    entry.subtitle
                  ) : (
                    <>
                      {entry.company}
                      {entry.subtitle ? ` · ${entry.subtitle}` : ''}
                    </>
                  )}
                </div>
              </div>
              <div className="career-year">{entry.year}</div>
            </div>
            <div className="career-right">
              {entry.hasDualContent ? (
                <div key={mode} className="career-content-fade">
                  <p
                    className="career-desc"
                    dangerouslySetInnerHTML={{
                      __html: mode === 'corporate' ? entry.corporate : entry.story,
                    }}
                  />
                </div>
              ) : (
                <p className="career-desc">{entry.corporate}</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
