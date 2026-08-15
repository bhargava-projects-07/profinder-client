
import { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';

const Header = () => {
  const [currentPath, setCurrentPath] = useState('/');
  // NEW: State tracking for mobile slide-down menu visibility toggles
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setCurrentPath(location.pathname);
    setIsMenuOpen(false); // Auto-close menu drawer when navigating between pages
  }, [location.pathname]);

  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'Services', href: '/services' },
    { name: 'Book Service', href: '/book-service' },
    { name: 'Offers', href: '/offers-listing' },
    { name: 'Blogs', href: '/blogs-home' },
    { name: 'Contact Us', href: '/contact-us' },
  ];

  const baseStyle = "px-3 py-2 rounded-md text-lg font-medium transition-colors block md:inline-block";
  const activeStyle = "bg-blue-900 text-white";
  const inactiveStyle = "text-gray-900 hover:bg-gray-700 hover:text-white";

  return (
    <>
      {/* Outer Shell Wrapper (Refactored to handle responsive height extensions) */}
      <header className="sticky top-0 z-50 border-b border-gray-200 bg-white px-4 py-3 md:px-10">
        
        {/* Main Header Container bar */}
        <div className="flex items-center justify-between">
          {/* Logo Brand Anchor */}
          <div className="flex-shrink-0">
            <img src="/logo-2.png" alt="ProFinder" className="h-20 w-auto object-contain" />
          </div>

          {/* NEW: Hamburger Action Button Toggle (Visible ONLY on Mobile layout screens) */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            type="button"
            className="cursor-pointer rounded-md p-2 text-gray-900 hover:bg-gray-100 focus:outline-none lg:hidden"
            aria-label="Toggle Navigation Menu"
          >
            {isMenuOpen ? (
              // Close Icon (X symbol markup)
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              // Open Hamburger Menu Icon lines
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>

          {/* Desktop Navigation Links Container (Hidden on mobile via 'hidden', shown on desktop via 'md:flex') */}
          <nav className="hidden space-x-4 lg:flex">
            {navItems.map((item) => (
              <NavLink 
                to={item.href}
                key={item.href}
                className={`${baseStyle} ${currentPath === item.href ? activeStyle : inactiveStyle}`}
              >
                {item.name}
              </NavLink>
            ))}
          </nav>
        </div>

        {/* NEW: Mobile Slide-Down Dropdown Menu Layout Panel */}
        {isMenuOpen && (
          <nav className="mt-3 space-y-2 border-t border-gray-100 pt-3 lg:hidden">
            {navItems.map((item) => (
              <NavLink 
                to={item.href}
                key={item.href}
                className={`w-full ${baseStyle} ${currentPath === item.href ? activeStyle : inactiveStyle}`}
              >
                {item.name}
              </NavLink>
            ))}
          </nav>
        )}
      </header>
    </>
  );
};

export default Header;
