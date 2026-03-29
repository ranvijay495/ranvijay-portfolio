import { createContext, useState, useCallback, type ReactNode } from 'react';

export type VoiceMode = 'corporate' | 'story';

interface VoiceContextType {
  mode: VoiceMode;
  hasChosen: boolean;
  choose: (mode: VoiceMode) => void;
  setMode: (mode: VoiceMode) => void;
}

export const VoiceContext = createContext<VoiceContextType>({
  mode: 'corporate',
  hasChosen: false,
  choose: () => {},
  setMode: () => {},
});

export function VoiceProvider({ children }: { children: ReactNode }) {
  const [mode, setModeState] = useState<VoiceMode>('corporate');
  const [hasChosen, setHasChosen] = useState(false);

  const choose = useCallback((m: VoiceMode) => {
    setModeState(m);
    setHasChosen(true);
  }, []);

  const setMode = useCallback((m: VoiceMode) => {
    setModeState(m);
  }, []);

  return (
    <VoiceContext.Provider value={{ mode, hasChosen, choose, setMode }}>
      {children}
    </VoiceContext.Provider>
  );
}
