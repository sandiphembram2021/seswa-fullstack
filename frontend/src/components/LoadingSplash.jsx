import React, { useState, useEffect } from 'react';
import Logo from './Logo';

const LoadingSplash = ({ onLoadingComplete }) => {
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  const loadingSteps = [
    { text: 'Initializing SESWA Portal...', duration: 800 },
    { text: 'Loading Community Data...', duration: 600 },
    { text: 'Preparing News & Updates...', duration: 500 },
    { text: 'Setting up Gallery...', duration: 400 },
    { text: 'Finalizing Experience...', duration: 300 }
  ];

  useEffect(() => {
    let progressInterval;
    let stepTimeout;

    const startLoading = () => {
      // Progress bar animation
      progressInterval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            clearInterval(progressInterval);
            // Start fade out after completion
            setTimeout(() => {
              setIsVisible(false);
              setTimeout(() => {
                onLoadingComplete();
              }, 500); // Wait for fade out animation
            }, 300);
            return 100;
          }
          return prev + 2;
        });
      }, 50);

      // Step progression
      const progressSteps = () => {
        if (currentStep < loadingSteps.length - 1) {
          stepTimeout = setTimeout(() => {
            setCurrentStep(prev => prev + 1);
            progressSteps();
          }, loadingSteps[currentStep].duration);
        }
      };

      progressSteps();
    };

    startLoading();

    return () => {
      if (progressInterval) clearInterval(progressInterval);
      if (stepTimeout) clearTimeout(stepTimeout);
    };
  }, [currentStep, onLoadingComplete]);

  if (!isVisible) {
    return null;
  }

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center bg-white transition-opacity duration-500 ${
      isVisible ? 'opacity-100' : 'opacity-0'
    }`}>
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary-200 to-transparent transform rotate-12 animate-pulse"></div>
        <div className="absolute inset-0 bg-gradient-to-l from-transparent via-primary-100 to-transparent transform -rotate-12 animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-primary-300 rounded-full animate-ping opacity-30" style={{ animationDelay: '0.5s' }}></div>
        <div className="absolute top-3/4 right-1/4 w-1 h-1 bg-primary-400 rounded-full animate-ping opacity-30" style={{ animationDelay: '1.5s' }}></div>
        <div className="absolute bottom-1/4 left-1/3 w-1.5 h-1.5 bg-primary-500 rounded-full animate-ping opacity-30" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 right-1/3 w-1 h-1 bg-primary-300 rounded-full animate-ping opacity-30" style={{ animationDelay: '0.8s' }}></div>
      </div>

      {/* Loading Content */}
      <div className="relative text-center text-gray-800 max-w-lg mx-auto px-6">
        {/* Logo */}
        <div className="mb-8 flex justify-center">
          <div className="animate-float">
            <Logo
              size="xl"
              showText={true}
              className="drop-shadow-lg"
            />
          </div>
        </div>

        {/* Welcome Text */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-3 animate-fade-in text-gray-900">
            Welcome to SESWA
          </h1>
          <p className="text-gray-600 text-xl animate-fade-in-delay font-light">
            Santal Engineering Students' Welfare Association
          </p>
        </div>

        {/* Loading Steps */}
        <div className="mb-10">
          <div className="text-gray-700 text-base mb-6 h-8 flex items-center justify-center">
            <span className="animate-fade-in font-medium">
              {loadingSteps[currentStep]?.text}
            </span>
          </div>

          {/* Ring-Style Loading Animation */}
          <div className="flex justify-center mb-6">
            <div className="relative w-24 h-24">
              {/* Outer Ring */}
              <div className="absolute inset-0 border-4 border-gray-200 rounded-full"></div>

              {/* Progress Ring */}
              <div
                className="absolute inset-0 border-4 border-primary-600 rounded-full transition-all duration-300 ease-out"
                style={{
                  borderTopColor: 'transparent',
                  borderRightColor: 'transparent',
                  borderBottomColor: 'transparent',
                  transform: `rotate(${(progress / 100) * 360}deg)`,
                  transformOrigin: 'center'
                }}
              ></div>

              {/* Inner Ring with Spin */}
              <div className="absolute inset-2 border-2 border-primary-300 border-t-transparent rounded-full animate-spin"></div>

              {/* Center Percentage */}
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-lg font-bold text-primary-600">{progress}%</span>
              </div>
            </div>
          </div>

          {/* Progress Text */}
          <div className="text-gray-600 text-sm font-medium">
            Loading Complete
          </div>
        </div>

        {/* Ring Loading Dots */}
        <div className="flex justify-center space-x-2 mb-8">
          <div className="w-3 h-3 bg-primary-600 rounded-full animate-bounce"></div>
          <div className="w-3 h-3 bg-primary-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
          <div className="w-3 h-3 bg-primary-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
        </div>

        {/* Founding Info */}
        <div className="text-gray-600 text-sm space-y-1">
          <p className="font-medium">Founded August 31, 2003</p>
          <p className="text-gray-500">Bengal Engineering & Science University, Shibpur</p>
        </div>
      </div>

      {/* Clean Decorative Elements */}
      <div className="absolute top-10 left-10 w-20 h-20 border-2 border-primary-200 rounded-full animate-spin-slow opacity-30"></div>
      <div className="absolute bottom-10 right-10 w-16 h-16 border-2 border-primary-300 rounded-full animate-spin-slow opacity-30" style={{ animationDirection: 'reverse' }}></div>
      <div className="absolute top-1/3 right-16 w-12 h-12 border-2 border-primary-400 rounded-full animate-pulse opacity-30"></div>
      <div className="absolute bottom-1/3 left-16 w-8 h-8 border-2 border-primary-200 rounded-full animate-pulse opacity-30" style={{ animationDelay: '1s' }}></div>

      {/* Additional Clean Elements */}
      <div className="absolute top-1/2 left-8 w-4 h-4 bg-primary-300 rounded-full opacity-40 animate-float" style={{ animationDelay: '0.5s' }}></div>
      <div className="absolute top-1/4 right-8 w-3 h-3 bg-primary-400 rounded-full opacity-40 animate-float" style={{ animationDelay: '1.2s' }}></div>
    </div>
  );
};

export default LoadingSplash;
