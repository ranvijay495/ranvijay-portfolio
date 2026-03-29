import { useContext } from 'react';
import { VoiceContext } from '../context/VoiceProvider';

export function useVoice() {
  return useContext(VoiceContext);
}
