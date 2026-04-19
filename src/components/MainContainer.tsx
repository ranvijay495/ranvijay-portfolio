import { useEffect, useState, useCallback } from 'react';
import Navbar from './Navbar';
import Landing from './Landing';
import About from './About';
import WhatIDo from './WhatIDo';
import Career from './Career';
import Achievements from './Achievements';
import Education from './Education';
import SkillsMarquee from './SkillsMarquee';
import Contact from './Contact';
import Footer from './Footer';
import SocialIcons from './SocialIcons';
import Cursor from './Cursor';

function setupRevealObserver() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    },
    { threshold: 0.05, rootMargin: '0px 0px -10% 0px' }
  );

  document.querySelectorAll('.reveal:not(.visible)').forEach((el) => {
    observer.observe(el);
  });

  return observer;
}

export default function MainContainer() {
  const [isDesktop, setIsDesktop] = useState(window.innerWidth > 1024);

  useEffect(() => {
    const onResize = () => setIsDesktop(window.innerWidth > 1024);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  // Setup observer on mount for any existing .reveal elements
  useEffect(() => {
    const obs = setupRevealObserver();
    return () => obs.disconnect();
  }, []);

  // Ref callback: when the content div mounts, set up a fresh observer for its children
  const onContentMount = useCallback((node: HTMLDivElement | null) => {
    if (!node) return;

    // Double-rAF ensures the browser has actually painted the new DOM
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        const obs = setupRevealObserver();

        // Also directly mark elements that are already in the viewport as visible
        // This handles the case where scrollIntoView placed the element in view
        node.querySelectorAll('.reveal:not(.visible)').forEach((el) => {
          const rect = el.getBoundingClientRect();
          if (rect.top < window.innerHeight && rect.bottom > 0) {
            el.classList.add('visible');
          }
        });

        // Store observer on the node for cleanup if needed
        (node as any)._revealObserver = obs;
      });
    });

    return () => {
      (node as any)?._revealObserver?.disconnect();
    };
  }, []);

  return (
    <>
      {/* Ambient Orbs */}
      <div className="glow-orb glow-orb-1" />
      <div className="glow-orb glow-orb-2" />

      <SocialIcons />
      <Navbar />
      <Landing />
      <div ref={onContentMount}>
        <About />
        <WhatIDo />
        <Career />
        <Achievements />
        <Education />
        <SkillsMarquee />
        <Contact />
        <Footer />
      </div>

      {isDesktop && <Cursor />}
    </>
  );
}
