import { createContext, useState, useCallback, type ReactNode } from 'react';

interface LoadingContextType {
  isLoading: boolean;
  setLoaded: () => void;
}

export const LoadingContext = createContext<LoadingContextType>({
  isLoading: true,
  setLoaded: () => {},
});

export function LoadingProvider({ children }: { children: ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);

  const setLoaded = useCallback(() => {
    setIsLoading(false);
  }, []);

  return (
    <LoadingContext.Provider value={{ isLoading, setLoaded }}>
      {children}
    </LoadingContext.Provider>
  );
}
