import { useVoice } from '../hooks/useVoice';
import { aboutData } from '../data/aboutData';
import './styles/About.css';

export default function About() {
  const { mode } = useVoice();

  return (
    <section className="section about" id="about">
      <div className="about-inner reveal">
        <h3 className="section-title">About Me</h3>
        {mode === 'corporate' ? (
          <div key="corporate" className="about-content-fade">
            <p
              className="about-text"
              dangerouslySetInnerHTML={{ __html: aboutData.corporate }}
            />
          </div>
        ) : (
          <div key="story" className="about-content-fade">
            <p
              className="about-text"
              dangerouslySetInnerHTML={{ __html: aboutData.storyMain }}
            />
            <p
              className="about-text about-sub"
              dangerouslySetInnerHTML={{ __html: aboutData.storySub }}
            />
          </div>
        )}
      </div>
    </section>
  );
}
