import { lazy, Suspense, useContext, useEffect, useRef, useState } from 'react';
import { VoiceProvider } from './context/VoiceProvider';
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
  const { setLoaded, setProgress } = useContext(LoadingContext);

  useEffect(() => {
    let completed = 0;
    const totalSteps = 5;

    const step = () => {
      completed++;
      setProgress((completed / totalSteps) * 100);
      if (completed >= totalSteps) {
        setLoaded();
      }
    };

    // Track document ready
    if (document.readyState === 'complete') {
      step();
    } else {
      window.addEventListener('load', step, { once: true });
    }

    // Track fonts
    document.fonts.ready.then(() => step());

    // Track stylesheets loaded
    const styleSheets = document.querySelectorAll('link[rel="stylesheet"]');
    if (styleSheets.length === 0) {
      step();
    } else {
      let loaded = false;
      const markLoaded = () => { if (!loaded) { loaded = true; step(); } };
      styleSheets.forEach((s) => {
        if ((s as HTMLLinkElement).sheet) {
          markLoaded();
        } else {
          s.addEventListener('load', markLoaded, { once: true });
        }
      });
      // Fallback
      setTimeout(markLoaded, 2000);
    }

    // Simulate progressive loading for remaining assets
    const t1 = setTimeout(() => step(), 500);
    const t2 = setTimeout(() => step(), 1200);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [setLoaded, setProgress]);

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
