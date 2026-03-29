import './styles/Contact.css';

const ArrowIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M7 17 17 7M7 7h10v10" />
  </svg>
);

export default function Contact() {
  return (
    <section className="contact-section" id="contact">
      <h2 className="reveal">Contact</h2>
      <div className="contact-grid">
        <div className="contact-col reveal">
          <h4>Connect</h4>
          <a
            href="https://www.linkedin.com/in/ranvijays243"
            target="_blank"
            rel="noreferrer"
            className="contact-link"
          >
            LinkedIn — ranvijays243
            <ArrowIcon />
          </a>
          <h4>Email</h4>
          <a href="mailto:ranvijay0401@gmail.com" className="contact-link">
            ranvijay0401@gmail.com
            <ArrowIcon />
          </a>
          <h4>Phone</h4>
          <a href="tel:+918795808000" className="contact-link">
            +91 879 580 8000
            <ArrowIcon />
          </a>
        </div>
        <div className="contact-col reveal">
          <h4>Social</h4>
          <a
            href="https://www.linkedin.com/in/ranvijays243"
            target="_blank"
            rel="noreferrer"
            className="contact-link"
          >
            LinkedIn
            <ArrowIcon />
          </a>
        </div>
      </div>
    </section>
  );
}
