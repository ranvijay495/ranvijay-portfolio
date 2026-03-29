import { whatIDoData } from '../data/whatIDoData';
import './styles/WhatIDo.css';

export default function WhatIDo() {
  return (
    <section className="section" id="whatido">
      <div className="whatido">
        <div className="whatido-heading reveal">
          <h2>
            W<span className="italic">HAT</span>
            <br />
            I<span className="accent"> DO</span>
          </h2>
        </div>
        <div className="whatido-cards reveal">
          {whatIDoData.map((card) => (
            <div className="whatido-card" key={card.title}>
              <h3>{card.title}</h3>
              <h4>{card.subtitle}</h4>
              <p>{card.description}</p>
              <div className="tags">
                {card.tags.map((tag) => (
                  <span className="tag" key={tag}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
