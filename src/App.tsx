import { lazy, Suspense, useContext, useEffect, useState } from 'react';
import { VoiceProvider } from './context/VoiceProvider';
import { LoadingProvider, LoadingContext } from './context/LoadingProvider';

const MainContainer = lazy(() => import('./components/MainContainer'));

function LoadingScreen() {
  const { isLoading } = useContext(LoadingContext);
  const [fadeOut, setFadeOut] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    if (!isLoading) {
      setFadeOut(true);
      const timer = setTimeout(() => setHidden(true), 600);
      return () => clearTimeout(timer);
    }
  }, [isLoading]);

  if (hidden) return null;

  return (
    <div className={`loading-screen ${fadeOut ? 'fade-out' : ''}`}>
      <div className="loading-text">RS</div>
    </div>
  );
}

function AppInner() {
  const { setLoaded } = useContext(LoadingContext);

  useEffect(() => {
    // Give a brief moment for initial render, then mark as loaded
    const timer = setTimeout(() => setLoaded(), 800);
    return () => clearTimeout(timer);
  }, [setLoaded]);

  return (
    <>
      <LoadingScreen />
      <Suspense fallback={null}>
        <MainContainer />
      </Suspense>
    </>
  );
}

export default function App() {
  return (
    <LoadingProvider>
      <VoiceProvider>
        <AppInner />
      </VoiceProvider>
    </LoadingProvider>
  );
}
