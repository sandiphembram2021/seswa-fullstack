import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Users, Calendar, BookOpen, Award, ChevronLeft, ChevronRight, X, Camera, Play, Pause } from 'lucide-react';
import Logo from '../components/Logo';
import homeImage from '../assets/home.jpg';
import image1 from '../assets/DSC_0442.JPG';
import image2 from '../assets/DSC_0681.JPG';
import image3 from '../assets/DSC_3169.JPG';
import image4 from '../assets/DSC_3287.JPG';
import image5 from '../assets/DSC_3321.JPG';
import image6 from '../assets/DSC_3335.JPG';
import image7 from '../assets/DSC_3475.JPG';
import image8 from '../assets/DSC_3634.JPG';
import image9 from '../assets/DSC_3675.JPG';

const HomePage = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isSlideshow, setIsSlideshow] = useState(true);
  const [slideshowInterval, setSlideshowInterval] = useState(null);

  // Gallery images data - Real SESWA photos
  const galleryImages = [
    {
      id: 1,
      src: homeImage,
      alt: 'SESWA Community Gathering',
      title: 'SESWA Community Gathering',
      description: 'Members coming together to celebrate our shared heritage and goals',
      category: 'events'
    },
    {
      id: 2,
      src: image1,
      alt: 'SESWA Annual Function',
      title: 'Annual Function 2023',
      description: 'Celebrating achievements and milestones of SESWA community',
      category: 'events'
    },
    {
      id: 3,
      src: image2,
      alt: 'Cultural Performance',
      title: 'Santal Cultural Program',
      description: 'Traditional dance and music showcasing our rich heritage',
      category: 'cultural'
    },
    {
      id: 4,
      src: image3,
      alt: 'Community Meeting',
      title: 'SESWA General Meeting',
      description: 'Important discussions about community development and future plans',
      category: 'meetings'
    },
    {
      id: 5,
      src: image4,
      alt: 'Educational Workshop',
      title: 'Educational Guidance Session',
      description: 'Providing academic support and career guidance to students',
      category: 'academic'
    },
    {
      id: 6,
      src: image5,
      alt: 'Youth Engagement',
      title: 'Youth Leadership Program',
      description: 'Empowering young members to take leadership roles',
      category: 'youth'
    },
    {
      id: 7,
      src: image6,
      alt: 'Community Service',
      title: 'Social Service Initiative',
      description: 'SESWA members actively contributing to community welfare',
      category: 'community'
    },
    {
      id: 8,
      src: image7,
      alt: 'Alumni Meet',
      title: 'Alumni Networking Event',
      description: 'Successful alumni sharing experiences and opportunities',
      category: 'alumni'
    },
    {
      id: 9,
      src: image8,
      alt: 'Technical Training',
      title: 'Skills Development Workshop',
      description: 'Technical training sessions for engineering students',
      category: 'academic'
    },
    {
      id: 10,
      src: image9,
      alt: 'Award Ceremony',
      title: 'Excellence Recognition',
      description: 'Honoring outstanding achievements in academics and community service',
      category: 'awards'
    }
  ];

  const features = [
    {
      icon: Users,
      title: 'Single Platform Unity',
      description: 'Bringing all Santal Engineering Students of West Bengal together on one platform since 2003.'
    },
    {
      icon: Calendar,
      title: 'Annual Events',
      description: 'Annual Picnic in January and Freshers Welcome in October for community bonding and networking.'
    },
    {
      icon: BookOpen,
      title: 'Academic Support',
      description: 'WBJEE counselling, scholarship information, and educational resources for student success.'
    },
    {
      icon: Award,
      title: 'Recognition & Awards',
      description: 'Awards for top 3 rank holders in WBJEE, IITJEE and AIEEE to encourage excellence.'
    }
  ];

  const stats = [
    { number: '500+', label: 'Active Members' },
    { number: '14', label: 'Partner Colleges' },
    { number: '100+', label: 'Events Organized' },
    { number: '200+', label: 'Success Stories' }
  ];

  // Auto-slideshow effect
  useEffect(() => {
    if (isSlideshow) {
      const interval = setInterval(() => {
        setCurrentSlideIndex(prev => (prev + 1) % galleryImages.length);
      }, 4000); // Change slide every 4 seconds

      setSlideshowInterval(interval);
      return () => clearInterval(interval);
    } else {
      if (slideshowInterval) {
        clearInterval(slideshowInterval);
        setSlideshowInterval(null);
      }
    }
  }, [isSlideshow, galleryImages.length]);

  // Gallery navigation functions
  const openLightbox = (index) => {
    setCurrentImageIndex(index);
    setSelectedImage(galleryImages[index]);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  const nextImage = () => {
    const nextIndex = (currentImageIndex + 1) % galleryImages.length;
    setCurrentImageIndex(nextIndex);
    setSelectedImage(galleryImages[nextIndex]);
  };

  const prevImage = () => {
    const prevIndex = (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
    setCurrentImageIndex(prevIndex);
    setSelectedImage(galleryImages[prevIndex]);
  };

  // Slideshow control functions
  const toggleSlideshow = () => {
    setIsSlideshow(!isSlideshow);
  };

  const goToSlide = (index) => {
    setCurrentSlideIndex(index);
  };

  const nextSlide = () => {
    setCurrentSlideIndex(prev => (prev + 1) % galleryImages.length);
  };

  const prevSlide = () => {
    setCurrentSlideIndex(prev => (prev - 1 + galleryImages.length) % galleryImages.length);
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-800 via-primary-700 to-primary-600 text-white overflow-hidden animate-gradient">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="z-10 animate-slide-in-left">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold leading-tight mb-6 animate-slide-in-bottom">
                Santal Engineering Students' Welfare Association - W.B.
              </h1>
              <p className="text-xl text-primary-100 mb-8 leading-relaxed animate-slide-in-bottom animate-stagger-1">
                Established in 2003, bringing all Santal Engineering Students of West Bengal together.
                Supporting academic excellence while preserving our rich cultural heritage.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 animate-slide-in-bottom animate-stagger-2">
                <Link
                  to="/about"
                  className="border-2 border-white text-white hover:bg-white hover:text-primary-700 font-semibold py-3 px-8 rounded-lg transition-all duration-300 text-center hover-lift"
                >
                  Learn More
                </Link>
              </div>
            </div>
            <div className="flex justify-center lg:justify-end animate-slide-in-right">
              <div className="relative animate-float">
                <img
                  src={homeImage}
                  alt="SESWA Community"
                  className="rounded-2xl shadow-2xl w-full max-w-md h-80 object-cover hover-scale transition-all duration-500"
                />
                <div className="absolute inset-0 bg-primary-900/20 rounded-2xl"></div>
                <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-3 animate-scale-in animate-stagger-3">
                  <Logo size="sm" showText={false} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className={`text-center animate-scale-in animate-stagger-${index + 1} hover-lift`}>
                <div className="text-3xl md:text-4xl font-bold text-primary-600 mb-2 animate-pulse-glow">
                  {stat.number}
                </div>
                <div className="text-gray-600 font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-slide-in-bottom">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-gray-900 mb-4">
              Our Mission & Vision
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto animate-stagger-1">
              Supporting Santal engineering students through education, community bonding, and cultural preservation since 2003.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className={`bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 hover-lift animate-scale-in animate-stagger-${index + 1}`}>
                <div className="bg-primary-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4 animate-float">
                  <feature.icon className="h-6 w-6 text-primary-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary-700 text-white py-16 animate-gradient">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4 animate-slide-in-bottom">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto animate-slide-in-bottom animate-stagger-1">
            Be part of the legacy that started in 2003. Explore our community of Santal engineering students across West Bengal.
          </p>
        </div>
      </section>

      {/* Latest Updates Section */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-slide-in-bottom">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-gray-900 mb-4">
              Latest Updates
            </h2>
            <p className="text-xl text-gray-600 animate-stagger-1">
              Stay connected with SESWA's latest events, achievements, and community developments.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Latest Event Update */}
            <div className="bg-gradient-to-br from-primary-50 to-primary-100 rounded-xl p-6 hover-lift animate-scale-in animate-stagger-1 border border-primary-200">
              <div className="flex items-center justify-between mb-4">
                <div className="bg-primary-600 text-white text-sm font-medium px-3 py-1 rounded-full inline-block">
                  📅 Event
                </div>
                <span className="text-xs text-primary-600 font-medium">Dec 15, 2024</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Annual SESWA Gathering 2024
              </h3>
              <p className="text-gray-700 mb-4">
                Join us for our biggest annual event celebrating 21 years of SESWA. Cultural programs, networking, and awards ceremony.
              </p>
              <Link
                to="/news"
                className="text-primary-600 hover:text-primary-700 font-medium inline-flex items-center transition-all duration-300 hover-glow"
              >
                Read More
                <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </div>

            {/* Achievement Update */}
            <div className="bg-gradient-to-br from-green-50 to-emerald-100 rounded-xl p-6 hover-lift animate-scale-in animate-stagger-2 border border-green-200">
              <div className="flex items-center justify-between mb-4">
                <div className="bg-green-600 text-white text-sm font-medium px-3 py-1 rounded-full inline-block">
                  🏆 Achievement
                </div>
                <span className="text-xs text-green-600 font-medium">Nov 28, 2024</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                SESWA Members Excel in Placements
              </h3>
              <p className="text-gray-700 mb-4">
                Proud to announce that 95% of our final year members secured excellent placements in top companies across India.
              </p>
              <Link
                to="/news"
                className="text-green-600 hover:text-green-700 font-medium inline-flex items-center transition-all duration-300 hover-glow"
              >
                View Details
                <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </div>

            {/* Community Update */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-xl p-6 hover-lift animate-scale-in animate-stagger-3 border border-blue-200">
              <div className="flex items-center justify-between mb-4">
                <div className="bg-blue-600 text-white text-sm font-medium px-3 py-1 rounded-full inline-block">
                  👥 Community
                </div>
                <span className="text-xs text-blue-600 font-medium">Dec 1, 2024</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                New College Partnership
              </h3>
              <p className="text-gray-700 mb-4">
                SESWA expands network with partnership agreements signed with 3 new engineering colleges in West Bengal.
              </p>
              <Link
                to="/colleges"
                className="text-blue-600 hover:text-blue-700 font-medium inline-flex items-center transition-all duration-300 hover-glow"
              >
                View Colleges
                <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </div>
          </div>

          {/* Recent Updates Timeline */}
          <div className="mt-16 animate-slide-in-bottom animate-stagger-4">
            <h3 className="text-2xl font-bold text-gray-900 text-center mb-8">Recent Updates</h3>
            <div className="max-w-3xl mx-auto space-y-4">
              <div className="flex items-center p-4 bg-gray-50 rounded-lg hover-lift transition-all duration-300">
                <div className="flex-shrink-0 w-3 h-3 bg-primary-600 rounded-full mr-4"></div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <p className="text-gray-900 font-medium">BERA TARAS Magazine 2024 Released</p>
                    <span className="text-sm text-gray-500">Nov 15, 2024</span>
                  </div>
                  <p className="text-gray-600 text-sm">Annual magazine featuring student achievements and cultural articles now available.</p>
                </div>
              </div>

              <div className="flex items-center p-4 bg-gray-50 rounded-lg hover-lift transition-all duration-300">
                <div className="flex-shrink-0 w-3 h-3 bg-green-600 rounded-full mr-4"></div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <p className="text-gray-900 font-medium">Scholarship Program Applications Open</p>
                    <span className="text-sm text-gray-500">Oct 30, 2024</span>
                  </div>
                  <p className="text-gray-600 text-sm">Merit-based scholarships available for engineering students. Apply before Dec 31st.</p>
                </div>
              </div>

              <div className="flex items-center p-4 bg-gray-50 rounded-lg hover-lift transition-all duration-300">
                <div className="flex-shrink-0 w-3 h-3 bg-blue-600 rounded-full mr-4"></div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <p className="text-gray-900 font-medium">Technical Workshop Series Launched</p>
                    <span className="text-sm text-gray-500">Oct 20, 2024</span>
                  </div>
                  <p className="text-gray-600 text-sm">Monthly workshops on emerging technologies for skill development.</p>
                </div>
              </div>
            </div>

            {/* View All Updates Button */}
            <div className="text-center mt-8">
              <Link
                to="/news"
                className="inline-flex items-center bg-primary-600 hover:bg-primary-700 text-white font-semibold py-3 px-8 rounded-lg transition-all duration-300 hover-lift hover-glow"
              >
                View All Updates
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Image Gallery Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-slide-in-bottom">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-gray-900 mb-4">
              Community Gallery
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto animate-stagger-1">
              Capturing moments from our events, celebrations, and community activities.
              See the vibrant spirit of SESWA in action.
            </p>
          </div>

          {/* Featured Slideshow */}
          <div className="relative mb-16 bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="relative h-96 md:h-[500px]">
              {/* Main Slide Image */}
              <img
                src={galleryImages[currentSlideIndex]?.src}
                alt={galleryImages[currentSlideIndex]?.alt}
                className="w-full h-full object-cover"
              />

              {/* Overlay Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>

              {/* Slide Content */}
              <div className="absolute bottom-0 left-0 right-0 p-4 md:p-8 text-white">
                <div className="max-w-4xl">
                  <span className="inline-block px-2 md:px-3 py-1 bg-primary-600 text-white text-xs md:text-sm font-medium rounded-full capitalize mb-2 md:mb-3">
                    {galleryImages[currentSlideIndex]?.category}
                  </span>
                  <h3 className="text-xl md:text-3xl font-bold mb-1 md:mb-2">
                    {galleryImages[currentSlideIndex]?.title}
                  </h3>
                  <p className="text-sm md:text-lg text-gray-200 line-clamp-2">
                    {galleryImages[currentSlideIndex]?.description}
                  </p>
                </div>
              </div>

              {/* Navigation Arrows */}
              <button
                onClick={prevSlide}
                className="absolute left-2 md:left-4 top-1/2 transform -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 md:p-3 rounded-full transition-all duration-200"
              >
                <ChevronLeft className="h-5 w-5 md:h-6 md:w-6" />
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-2 md:right-4 top-1/2 transform -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 md:p-3 rounded-full transition-all duration-200"
              >
                <ChevronRight className="h-5 w-5 md:h-6 md:w-6" />
              </button>

              {/* Play/Pause Button */}
              <button
                onClick={toggleSlideshow}
                className="absolute top-4 right-4 bg-black/30 hover:bg-black/50 text-white p-3 rounded-full transition-all duration-200"
              >
                {isSlideshow ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
              </button>
            </div>

            {/* Slide Indicators */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
              {galleryImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-200 ${
                    index === currentSlideIndex
                      ? 'bg-white'
                      : 'bg-white/50 hover:bg-white/75'
                  }`}
                />
              ))}
            </div>

            {/* Progress Bar */}
            {isSlideshow && (
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-black/20">
                <div
                  className="h-full bg-primary-600 transition-all duration-100 ease-linear"
                  style={{
                    width: `${((currentSlideIndex + 1) / galleryImages.length) * 100}%`
                  }}
                />
              </div>
            )}
          </div>

          {/* Gallery Grid */}
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Browse All Photos</h3>
            <p className="text-gray-600">Click any photo to view in full size</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {galleryImages.map((image, index) => (
              <div
                key={image.id}
                className={`relative group cursor-pointer overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all duration-300 transform hover:scale-105 animate-scale-in animate-stagger-${(index % 6) + 1} hover-lift`}
                onClick={() => openLightbox(index)}
              >
                <div className="aspect-w-4 aspect-h-3">
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-64 object-cover"
                  />
                </div>

                {/* Overlay */}
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-60 transition-all duration-300 flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-center text-white p-4">
                    <Camera className="h-8 w-8 mx-auto mb-2" />
                    <h3 className="font-semibold text-sm mb-1">{image.title}</h3>
                    <p className="text-xs opacity-90">{image.description}</p>
                  </div>
                </div>

                {/* Category Badge */}
                <div className="absolute top-3 left-3">
                  <span className="px-2 py-1 bg-primary-600 text-white text-xs font-medium rounded-full capitalize">
                    {image.category}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* View More Button */}
          <div className="text-center">
            <Link
              to="/gallery"
              className="inline-flex items-center bg-primary-600 hover:bg-primary-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-200"
            >
              View Full Gallery
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4">
          <div className="relative max-w-4xl max-h-full">
            {/* Close Button */}
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 text-white hover:text-gray-300 z-10"
            >
              <X className="h-8 w-8" />
            </button>

            {/* Navigation Buttons */}
            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 z-10"
            >
              <ChevronLeft className="h-8 w-8" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 z-10"
            >
              <ChevronRight className="h-8 w-8" />
            </button>

            {/* Image */}
            <div className="text-center">
              <img
                src={selectedImage.src}
                alt={selectedImage.alt}
                className="max-w-full max-h-[80vh] object-contain rounded-lg"
              />

              {/* Image Info */}
              <div className="mt-4 text-white">
                <h3 className="text-xl font-semibold mb-2">{selectedImage.title}</h3>
                <p className="text-gray-300 mb-2">{selectedImage.description}</p>
                <span className="inline-block px-3 py-1 bg-primary-600 text-white text-sm font-medium rounded-full capitalize">
                  {selectedImage.category}
                </span>
              </div>

              {/* Image Counter */}
              <div className="mt-4 text-gray-400 text-sm">
                {currentImageIndex + 1} of {galleryImages.length}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;
