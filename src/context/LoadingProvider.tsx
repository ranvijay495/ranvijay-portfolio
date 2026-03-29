import { createContext, useState, useCallback, type ReactNode } from 'react';

interface LoadingContextType {
  isLoading: boolean;
  progress: number;
  setLoaded: () => void;
  setProgress: (value: number) => void;
}

export const LoadingContext = createContext<LoadingContextType>({
  isLoading: true,
  progress: 0,
  setLoaded: () => {},
  setProgress: () => {},
});

export function LoadingProvider({ children }: { children: ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgressState] = useState(0);

  const setLoaded = useCallback(() => {
    setProgressState(100);
    setTimeout(() => setIsLoading(false), 400);
  }, []);

  const setProgress = useCallback((value: number) => {
    setProgressState((prev) => Math.max(prev, Math.min(100, value)));
  }, []);

  return (
    <LoadingContext.Provider value={{ isLoading, progress, setLoaded, setProgress }}>
      {children}
    </LoadingContext.Provider>
  );
}
