import { useEffect, useState } from 'react';
import { useVoice } from '../hooks/useVoice';
import { orgLogos, navLinks } from '../data/navData';
import './styles/Navbar.css';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const { hasChosen } = useVoice();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 100);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNav = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    if (!hasChosen) {
      const gate = document.getElementById('choiceGate');
      if (gate) gate.scrollIntoView({ behavior: 'smooth' });
      return;
    }
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav
      className="navbar"
      style={
        scrolled
          ? { background: 'rgba(10, 14, 23, 0.95)', backdropFilter: 'blur(10px)' }
          : undefined
      }
    >
      <a href="#" className="nav-logo">RS</a>

      <div className="nav-logos">
        {orgLogos.map((logo) => (
          <a key={logo.name} href={logo.url} target="_blank" rel="noreferrer" title={logo.name}>
            <img src={logo.src} alt={logo.alt} />
          </a>
        ))}
      </div>

      <ul className="nav-links">
        {navLinks.map((link) => (
          <li key={link.href}>
            <a href={link.href} onClick={(e) => handleNav(e, link.href)}>
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
