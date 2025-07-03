import React from 'react';
import logoImage from '../assets/images (2).png';

const Logo = ({
  size = 'md',
  showText = true,
  className = '',
  variant = 'default'
}) => {
  const sizeClasses = {
    sm: 'h-8 w-8',
    md: 'h-12 w-12',
    lg: 'h-16 w-16',
    xl: 'h-20 w-20'
  };

  const textSizeClasses = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-2xl',
    xl: 'text-3xl'
  };

  return (
    <div className={`flex items-center space-x-3 ${className}`}>
      {/* Logo Image */}
      <div className={`${sizeClasses[size]} flex-shrink-0`}>
        <img
          src={logoImage}
          alt="SESWA Logo"
          className="h-full w-full object-contain"
          onError={(e) => {
            // Try fallback to public directory
            if (e.target.src !== '/logo.png') {
              e.target.src = '/logo.png';
            } else {
              // If both fail, show text logo
              e.target.style.display = 'none';
              e.target.nextSibling.style.display = 'flex';
            }
          }}
        />
        {/* Fallback Logo */}
        <div
          className={`${sizeClasses[size]} bg-primary-600 text-white rounded-lg items-center justify-center font-bold text-sm hidden`}
          style={{ display: 'none' }}
        >
          SESWA
        </div>
      </div>

      {/* Logo Text */}
      {showText && (
        <div className="flex flex-col min-w-0">
          <h1 className={`font-heading font-bold ${textSizeClasses[size]} ${
            variant === 'white' ? 'text-white' : 'text-primary-600'
          } leading-tight whitespace-nowrap`}>
            SESWA
          </h1>
          {size !== 'sm' && (
            <p className={`${
              variant === 'white' ? 'text-gray-200' : 'text-gray-600'
            } text-xs font-medium leading-tight whitespace-nowrap`}>
              Santal Engineering Students'<br />Welfare Association
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default Logo;
