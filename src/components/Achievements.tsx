import FastMarquee from 'react-fast-marquee';
// Handle CJS/ESM interop
const Marquee = (FastMarquee as any).default || FastMarquee;
import { achievementsData } from '../data/achievementsData';
import './styles/Achievements.css';

export default function Achievements() {
  return (
    <section className="achievements">
      <h3 className="achievements-title reveal">Key Impact</h3>
      <Marquee speed={40} gradientWidth={0} pauseOnHover>
        {achievementsData.map((item, i) => (
          <div className="marquee-item" key={i}>
            <div className="marquee-stat">{item.stat}</div>
            <div className="marquee-label">{item.label}</div>
          </div>
        ))}
      </Marquee>
    </section>
  );
}
