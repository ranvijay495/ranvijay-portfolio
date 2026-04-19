import { lazy, Suspense, useContext, useEffect, useRef, useState } from 'react';
import { LoadingProvider, LoadingContext } from './context/LoadingProvider';

const MainContainer = lazy(() => import('./components/MainContainer'));

function LoadingScreen() {
  const { isLoading, progress } = useContext(LoadingContext);
  const [fadeOut, setFadeOut] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [displayProgress, setDisplayProgress] = useState(0);
  const rafRef = useRef<number>(0);

  // Smoothly animate the displayed number
  useEffect(() => {
    const animate = () => {
      setDisplayProgress((prev) => {
        const diff = progress - prev;
        if (Math.abs(diff) < 0.5) return progress;
        return prev + diff * 0.15;
      });
      rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, [progress]);

  useEffect(() => {
    if (!isLoading) {
      setFadeOut(true);
      const timer = setTimeout(() => setHidden(true), 600);
      return () => clearTimeout(timer);
    }
  }, [isLoading]);

  if (hidden) return null;

  const pct = Math.round(displayProgress);

  return (
    <div className={`loading-screen ${fadeOut ? 'fade-out' : ''}`}>
      {/* Giant outlined name behind */}
      <div className="loading-name-bg">
        <div className="loading-name-reveal" style={{ width: `${pct}%` }}>
          <span>RANVIJAY SINGH</span>
        </div>
        <div className="loading-name-outline">
          <span>RANVIJAY SINGH</span>
        </div>
      </div>

      {/* Vertical sweep line */}
      <div className="loading-vline" style={{ left: `${pct}%` }} />

      {/* Bottom percentage */}
      <div className="loading-bottom">
        <span className="loading-bottom-label">LOADING</span>
        <span className="loading-bottom-pct">{pct}%</span>
      </div>
    </div>
  );
}

function AppInner() {
  const { setLoaded } = useContext(LoadingContext);

  useEffect(() => {
    setLoaded();
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
      <AppInner />
    </LoadingProvider>
  );
}
