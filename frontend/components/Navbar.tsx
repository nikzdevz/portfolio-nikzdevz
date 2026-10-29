import { useEffect, useRef, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { COMPANY } from '../constants';

const NAV_LINKS = [
  { label: 'About', to: '/#about' },
  { label: 'Products', to: '/#products' },
  { label: 'All work', to: '/projects' },
  { label: 'Contact', to: '/#contact' },
];

const isCurrent = (pathname: string, hash: string, to: string) => {
  const [toPath, toHash = ''] = to.split('#');
  return pathname === toPath && hash === (toHash ? `#${toHash}` : '');
};

const BrandMark = () => (
  <Link className="brand-mark" to="/" aria-label="nikzdevz home">
    <span className="brand-mark__glyph" aria-hidden="true">
      <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
        <path d="M2 11 11 2M2 2l9 9" stroke="currentColor" strokeWidth="1.2" />
      </svg>
    </span>
    <span className="brand-mark__copy">
      <span className="brand-mark__name">nikzdevz</span>
      <span className="brand-mark__lab">Nikhil Kumar Gupta / {COMPANY.shortName}</span>
    </span>
  </Link>
);

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { pathname, hash } = useLocation();
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const updateScrollState = () => setScrolled(window.scrollY > 18);
    updateScrollState();
    window.addEventListener('scroll', updateScrollState, { passive: true });
    return () => window.removeEventListener('scroll', updateScrollState);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname, hash]);

  useEffect(() => {
    if (!isOpen) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
        toggleRef.current?.focus();
      }
    };
    window.addEventListener('keydown', closeOnEscape);
    return () => window.removeEventListener('keydown', closeOnEscape);
  }, [isOpen]);

  return (
    <header className={`nav${scrolled ? ' nav--scrolled' : ''}${isOpen ? ' nav--open' : ''}`}>
      <nav className="container" aria-label="Primary navigation">
        <div className="nav__inner">
          <BrandMark />
          <div className="nav__links">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.label}
                className={`nav__link${isCurrent(pathname, hash, link.to) ? ' nav__link--active' : ''}`}
                to={link.to}
                aria-current={isCurrent(pathname, hash, link.to) ? 'page' : undefined}
              >
                {link.label}
              </Link>
            ))}
            <Link className="button button--primary nav__cta nav__desktop-cta" to="/#contact">
              Work with me
            </Link>
          </div>
          <button
            ref={toggleRef}
            className="nav__toggle"
            type="button"
            onClick={() => setIsOpen((open) => !open)}
            aria-expanded={isOpen}
            aria-controls="mobile-navigation"
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
          >
            {isOpen ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
          </button>
        </div>
        {isOpen && (
          <div id="mobile-navigation" className="nav__mobile">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.label}
                className={`nav__link${isCurrent(pathname, hash, link.to) ? ' nav__link--active' : ''}`}
                to={link.to}
                aria-current={isCurrent(pathname, hash, link.to) ? 'page' : undefined}
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Link className="button button--primary nav__cta" to="/#contact" onClick={() => setIsOpen(false)}>
              Work with me
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navbar;

