import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import Logo from './Logo';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'News', href: '/news' },
    { name: 'Magazines', href: '/magazines' },
    { name: 'Gallery', href: '/gallery' },
    { name: 'Colleges', href: '/colleges' },
    { name: 'Contact', href: '/contact' }
  ];

  // Priority navigation for smaller screens
  const priorityNavigation = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'News', href: '/news' },
    { name: 'Contact', href: '/contact' }
  ];

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50 animate-slide-in-bottom">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center h-16 relative">
          {/* Logo - Fixed width with proper spacing */}
          <div className="flex-shrink-0 w-48 sm:w-64 lg:w-72">
            <Link to="/" className="flex items-center">
              <Logo
                size="sm"
                showText={true}
                className="flex-shrink-0"
              />
            </Link>
          </div>

          {/* Desktop Navigation - Centered */}
          <nav className="hidden lg:flex items-center space-x-4 flex-1 justify-center">
            {navigation.map((item, index) => (
              <Link
                key={item.name}
                to={item.href}
                className={`text-gray-700 hover:text-primary-600 px-2 py-2 text-sm font-medium transition-all duration-300 whitespace-nowrap hover-lift animate-slide-in-bottom animate-stagger-${index + 1}`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Medium screens navigation (simplified) - Centered */}
          <nav className="hidden md:flex lg:hidden items-center space-x-1 flex-1 justify-center">
            {priorityNavigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className="text-gray-700 hover:text-primary-600 px-1 py-2 text-xs font-medium transition-colors duration-200 whitespace-nowrap"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Right side - Mobile menu button or spacer */}
          <div className="flex items-center justify-end w-48 sm:w-64 lg:w-72">
            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-700 hover:text-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-500 p-2"
              >
                {isMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 border-t border-gray-200">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className="text-gray-700 hover:text-primary-600 block px-3 py-2 text-base font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}

            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
