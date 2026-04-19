import { whatIDoData } from '../data/whatIDoData';
import './styles/WhatIDo.css';

export default function WhatIDo() {
  return (
    <section className="section whatido-section" id="whatido">
      <div className="whatido-header reveal">
        <h2 className="section-title">WHAT I DO</h2>
        <div className="whatido-dot"></div>
      </div>
      
      <div className="whatido-list">
        {whatIDoData.map((card, index) => (
          <div className="whatido-item reveal" key={card.title} style={{ transitionDelay: `${index * 0.1}s` }}>
            <div className="whatido-title-wrapper">
              <h3>{card.title}</h3>
              <p className="whatido-subtitle">{card.subtitle}</p>
            </div>
            <div className="whatido-desc-wrapper">
              <p>{card.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
