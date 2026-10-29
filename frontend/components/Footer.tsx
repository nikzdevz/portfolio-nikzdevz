import { Link } from 'react-router-dom';
import { COMPANY } from '../constants';

const Footer = () => (
  <footer className="footer">
    <div className="container">
      <div className="footer__top">
        <div className="footer__brand">
          <p className="footer__name">{COMPANY.author}</p>
          <p className="footer__slogan">Founder of {COMPANY.name}. {COMPANY.slogan}</p>
        </div>
        <nav className="footer__links" aria-label="Footer navigation">
          <Link className="footer__link" to="/#about">About</Link>
          <Link className="footer__link" to="/#products">Products</Link>
          <Link className="footer__link" to="/projects">All work</Link>
          <Link className="footer__link" to="/#contact">Contact</Link>
        </nav>
      </div>
      <div className="footer__bottom">
        <p>© {new Date().getFullYear()} {COMPANY.author} / {COMPANY.name}.</p>
        <div className="social-links" aria-label="External profiles">
          <a href={COMPANY.github} target="_blank" rel="noopener noreferrer">GitHub</a>
          <a href={COMPANY.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
          <a href={COMPANY.twitter} target="_blank" rel="noopener noreferrer">Twitter</a>
          <a href={`mailto:${COMPANY.email}`}>Email</a>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
