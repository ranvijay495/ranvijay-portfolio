import { aboutData } from '../data/aboutData';
import StoryMask from './StoryMask';
import './styles/About.css';

export default function About() {
  const storyHtml = `<p class="about-text">${aboutData.storyMain}</p><p class="about-text about-sub">${aboutData.storySub}</p>`;
  const corporateHtml = `<p class="about-text">${aboutData.corporate}</p>`;

  return (
    <section className="section about" id="about">
      <div className="about-inner reveal">
        <h3 className="section-title">About Me</h3>
        <StoryMask 
          defaultHtml={storyHtml} 
          maskHtml={corporateHtml} 
          className="about-content-fade"
        />
      </div>
    </section>
  );
}
