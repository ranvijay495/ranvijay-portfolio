import { useVoice } from '../hooks/useVoice';
import type { VoiceMode } from '../context/VoiceProvider';
import './styles/ChoiceGate.css';

export default function ChoiceGate() {
  const { hasChosen, choose } = useVoice();

  if (hasChosen) return null;

  const handleChoice = (mode: VoiceMode) => {
    choose(mode);
    setTimeout(() => {
      document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  return (
    <section className="choice-gate" id="choiceGate">
      <h2>
        How would you like to <span>know me</span>?
      </h2>
      <p>Pick a lens — you can switch anytime.</p>
      <div className="choice-cards">
        <div className="choice-card" onClick={() => handleChoice('story')}>
          <span className="choice-icon">&#9998;</span>
          <h3>My Story</h3>
          <p>The real narrative — how things actually happened, in my own words.</p>
          <span className="choice-cta">Read this way &rarr;</span>
        </div>
        <div className="choice-card" onClick={() => handleChoice('corporate')}>
          <span className="choice-icon">&#9632;</span>
          <h3>Corporate</h3>
          <p>Metrics, milestones, and the boardroom version — structured and to the point.</p>
          <span className="choice-cta">Read this way &rarr;</span>
        </div>
      </div>
    </section>
  );
}
