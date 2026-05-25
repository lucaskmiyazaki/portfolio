import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === '/';

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  const handleNavClick = (target: string) => {
    setIsMenuOpen(false);
    if (isHome && target !== 'about') {
      scrollToSection(target);
    }
  };

  const hasDarkHero = location.pathname !== '/about';
  const transparent = hasDarkHero && !scrolled;

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${transparent ? 'bg-transparent border-transparent' : 'bg-white/80 backdrop-blur-md border-b border-gray-100'}`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-6 flex items-center justify-between">
        <Link to="/" className={`text-xl transition-colors ${transparent ? 'text-white hover:text-gray-200' : 'text-gray-900 hover:text-gray-700'}`}>
          Lucas Miyazaki
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {isHome ? (
            <button
              onClick={() => scrollToSection('work')}
              className={`transition-colors ${transparent ? 'text-gray-200 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}
            >
              Work
            </button>
          ) : (
            <Link to="/" className={`transition-colors ${transparent ? 'text-gray-200 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}>
              Work
            </Link>
          )}
          <Link
            to="/about"
            className={`transition-colors ${transparent ? 'text-gray-200 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}
          >
            About
          </Link>
          {isHome ? (
            <button
              onClick={() => scrollToSection('contact')}
              className={`transition-colors ${transparent ? 'text-gray-200 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}
            >
              Contact
            </button>
          ) : (
            <Link to="/" className={`transition-colors ${transparent ? 'text-gray-200 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}>
              Contact
            </Link>
          )}
        </nav>

        {/* Mobile Menu Button */}
        <button
          className={`md:hidden ${transparent ? 'text-white' : 'text-gray-600'}`}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
            {isMenuOpen ? (
              <path d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path d="M3 12h18M3 6h18M3 18h18" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <nav className="md:hidden border-t border-gray-100 bg-white">
          <div className="px-6 py-4 flex flex-col gap-4">
            {isHome ? (
              <button
                onClick={() => handleNavClick('work')}
                className="text-gray-600 hover:text-gray-900 text-left transition-colors"
              >
                Work
              </button>
            ) : (
              <Link
                to="/"
                onClick={() => setIsMenuOpen(false)}
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                Work
              </Link>
            )}
            <Link
              to="/about"
              onClick={() => setIsMenuOpen(false)}
              className="text-gray-600 hover:text-gray-900 text-left transition-colors"
            >
              About
            </Link>
            {isHome ? (
              <button
                onClick={() => handleNavClick('contact')}
                className="text-gray-600 hover:text-gray-900 text-left transition-colors"
              >
                Contact
              </button>
            ) : (
              <Link
                to="/"
                onClick={() => setIsMenuOpen(false)}
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                Contact
              </Link>
            )}
          </div>
        </nav>
      )}
    </header>
  );
}
