import { useVoice } from '../hooks/useVoice';
import type { VoiceMode } from '../context/VoiceProvider';
import './styles/MiniToggle.css';

export default function MiniToggle() {
  const { mode, hasChosen, setMode } = useVoice();

  if (!hasChosen) return null;

  const handleSwitch = (m: VoiceMode) => {
    setMode(m);
  };

  return (
    <div className="mini-toggle">
      <button
        className={`voice-btn ${mode === 'corporate' ? 'active' : ''}`}
        onClick={() => handleSwitch('corporate')}
      >
        Corporate
      </button>
      <button
        className={`voice-btn ${mode === 'story' ? 'active' : ''}`}
        onClick={() => handleSwitch('story')}
      >
        My Story
      </button>
    </div>
  );
}
