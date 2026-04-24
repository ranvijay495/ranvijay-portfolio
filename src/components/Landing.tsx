import { useEffect, useRef } from 'react';
import portraitImg from '../assets/cinematic-portrait.png';
import './styles/Landing.css';

export default function Landing() {
  const heroRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const maskRef = useRef<HTMLDivElement>(null);
  const spotlightRef = useRef<HTMLDivElement>(null);
  const portraitRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLImageElement>(null);

  // Use refs to track the lerp targets vs current position
  const mouse = useRef({ x: 0, y: 0, radius: 0 });
  const current = useRef({ x: 0, y: 0, radius: 0 });


  // Parallax Rotation Logic for Cinematic Portrait
  useEffect(() => {
    const onScroll = () => {
      if (portraitRef.current) {
        const scrollY = window.scrollY;
        const maxScroll = window.innerHeight;
        const progress = Math.min(scrollY / maxScroll, 1); // 0 → 1
        
        // Constrain Y-axis rotation to a subtle, premium holographic pan (-12deg max)
        const rotationY = progress * -12;
        
        // Anchor the rotation perfectly in the center to maintain physical scale, 
        portraitRef.current.style.transformOrigin = 'center center';
        portraitRef.current.style.transform = `perspective(4000px) rotateY(${rotationY}deg)`;
        
        // Fade in the harsh split-light layer as you scroll
        if (glowRef.current) {
          glowRef.current.style.opacity = `${progress}`;
        }
      }
    };
    
    // Use passive listener for butter-smooth scroll performance
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Frame Loop for Buttery Smooth Lerp tracking of the Orange Circle
  useEffect(() => {
    let animationFrameId: number;
    
    // Position mask center to default to center of the element on mount
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const hw = (rect.width / 2) + 300;
      const hh = (rect.height / 2) + 300;
      mouse.current.x = hw;
      mouse.current.y = hh;
      current.current.x = hw;
      current.current.y = hh;
    }

    const render = () => {
      // Instantly track X and Y so cursor never escapes the center
      current.current.x = mouse.current.x;
      current.current.y = mouse.current.y;
      
      // Smoothly interpolate the radius only
      current.current.radius += (mouse.current.radius - current.current.radius) * 0.15;

      if (maskRef.current) {
        maskRef.current.style.clipPath = `circle(${current.current.radius}px at ${current.current.x}px ${current.current.y}px)`;
      }
      animationFrameId = requestAnimationFrame(render);
    };
    render();

    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;

    const onMouseMove = (e: MouseEvent) => {
      // Main hero ambient spotlight
      if (spotlightRef.current) {
        spotlightRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
      }

      // Track the mouse coordinates relative to the text block bounds mapped to mask bounds
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        mouse.current.x = (e.clientX - rect.left) + 300;
        mouse.current.y = (e.clientY - rect.top) + 300;
      }
    };

    hero.addEventListener('mousemove', onMouseMove);
    return () => hero.removeEventListener('mousemove', onMouseMove);
  }, []);

  return (
    <section className="hero" id="home" ref={heroRef}>
      {/* Cinematic Background Image Layer */}
      <div className="hero-bg-wrapper">
        <div className="hero-bg-image-container" ref={portraitRef}>
          <img src={portraitImg} alt="" className="hero-bg-image" />
          <img src={portraitImg} alt="" className="hero-bg-image hero-half-glow" ref={glowRef} />
        </div>
        <div className="hero-bg-overlay" />
      </div>

      <div className="hero-spotlight" ref={spotlightRef} />

      <div className="hero-content">
        <p className="hero-greeting">R A N V I J A Y &nbsp; S I N G H</p>
        <div
          className="hero-name-container"
          ref={containerRef}
          onMouseEnter={() => {
            // Expand circle on hover to encompass area.
            // 280px is a solid large radius.
            mouse.current.radius = 280;
          }}
          onMouseLeave={() => {
            // Shrink completely back into nothingness
            mouse.current.radius = 0;
          }}
          onTouchStart={(e) => {
            // Position the circle at the touch point, then expand.
            const touch = e.touches[0];
            if (containerRef.current && touch) {
              const rect = containerRef.current.getBoundingClientRect();
              mouse.current.x = (touch.clientX - rect.left) + 300;
              mouse.current.y = (touch.clientY - rect.top) + 300;
            }
            mouse.current.radius = 280;
          }}
          onTouchMove={(e) => {
            const touch = e.touches[0];
            if (containerRef.current && touch) {
              const rect = containerRef.current.getBoundingClientRect();
              mouse.current.x = (touch.clientX - rect.left) + 300;
              mouse.current.y = (touch.clientY - rect.top) + 300;
            }
          }}
          onTouchEnd={() => {
            // Keep the reveal visible briefly after lift, then shrink.
            setTimeout(() => { mouse.current.radius = 0; }, 800);
          }}
        >
          <h1 className="hero-name hero-default">
            CEO'S OFFICE,<br />
            <span className="accent-text">M&A,</span><br />
            CORPORATE<br />
            DEVELOPMENT,<br />
            STRATEGY
          </h1>
          <div className="hero-hover-block" ref={maskRef}>
            <h1 className="hero-name hero-hover-text">
              ENGINEERING,<br />
              OPERATIONS,<br />
              MBA
            </h1>
          </div>
        </div>
        <p className="hero-role">
          Director — M&amp;A, Strategy &amp; CEO's Office
        </p>
      </div>



      <div className="hero-scroll">
        <span>Scroll</span>
        <div className="scroll-line" />
      </div>
    </section>
  );
}
