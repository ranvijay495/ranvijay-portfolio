import { useEffect, useState } from 'react';
import { orgLogos, navLinks } from '../data/navData';
import './styles/Navbar.css';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 100);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNav = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav
      className="navbar"
      style={
        scrolled
          ? {
              background: 'rgba(21, 21, 32, 0.55)',
              backdropFilter: 'blur(16px) saturate(160%)',
              WebkitBackdropFilter: 'blur(16px) saturate(160%)',
              borderBottom: '1px solid rgba(255,255,255,0.06)',
            }
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
