import React, { useState } from 'react';
import { 
  Camera, 
  Filter, 
  ChevronLeft, 
  ChevronRight, 
  X, 
  Calendar,
  MapPin,
  Users,
  Download,
  Share2
} from 'lucide-react';
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

const GalleryPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Extended gallery data - Real SESWA photos
  const galleryImages = [
    {
      id: 1,
      src: homeImage,
      alt: 'SESWA Community Gathering',
      title: 'SESWA Community Gathering',
      description: 'Members coming together to celebrate our shared heritage and goals',
      category: 'events',
      date: '2024-01-26',
      location: 'Community Center',
      photographer: 'SESWA Media Team'
    },
    {
      id: 2,
      src: image1,
      alt: 'SESWA Annual Function',
      title: 'Annual Function 2023',
      description: 'Celebrating achievements and milestones of SESWA community',
      category: 'events',
      date: '2023-08-31',
      location: 'IIEST Shibpur',
      photographer: 'Event Committee'
    },
    {
      id: 3,
      src: image2,
      alt: 'Cultural Performance',
      title: 'Santal Cultural Program',
      description: 'Traditional dance and music showcasing our rich heritage',
      category: 'cultural',
      date: '2023-12-15',
      location: 'Cultural Center',
      photographer: 'Cultural Committee'
    },
    {
      id: 4,
      src: image3,
      alt: 'Community Meeting',
      title: 'SESWA General Meeting',
      description: 'Important discussions about community development and future plans',
      category: 'meetings',
      date: '2023-10-20',
      location: 'Community Hall',
      photographer: 'Documentation Team'
    },
    {
      id: 5,
      src: image4,
      alt: 'Educational Workshop',
      title: 'Educational Guidance Session',
      description: 'Providing academic support and career guidance to students',
      category: 'academic',
      date: '2023-09-15',
      location: 'Education Center',
      photographer: 'Academic Team'
    },
    {
      id: 6,
      src: image5,
      alt: 'Youth Engagement',
      title: 'Youth Leadership Program',
      description: 'Empowering young members to take leadership roles in community',
      category: 'youth',
      date: '2023-11-20',
      location: 'Youth Center',
      photographer: 'Youth Committee'
    },
    {
      id: 7,
      src: image6,
      alt: 'Community Service',
      title: 'Social Service Initiative',
      description: 'SESWA members actively contributing to community welfare',
      category: 'community',
      date: '2023-07-08',
      location: 'Village Areas',
      photographer: 'Service Team'
    },
    {
      id: 8,
      src: image7,
      alt: 'Alumni Meet',
      title: 'Alumni Networking Event',
      description: 'Successful alumni sharing experiences and opportunities',
      category: 'alumni',
      date: '2023-12-10',
      location: 'Conference Hall',
      photographer: 'Alumni Relations'
    },
    {
      id: 9,
      src: image8,
      alt: 'Technical Training',
      title: 'Skills Development Workshop',
      description: 'Technical training sessions for engineering students',
      category: 'academic',
      date: '2023-06-22',
      location: 'Training Center',
      photographer: 'Technical Team'
    },
    {
      id: 10,
      src: image9,
      alt: 'Award Ceremony',
      title: 'Excellence Recognition',
      description: 'Honoring outstanding achievements in academics and community service',
      category: 'awards',
      date: '2023-05-30',
      location: 'Auditorium',
      photographer: 'Official Team'
    }
  ];

  const categories = [
    { id: 'all', name: 'All Photos', count: galleryImages.length },
    { id: 'events', name: 'Events', count: galleryImages.filter(img => img.category === 'events').length },
    { id: 'cultural', name: 'Cultural', count: galleryImages.filter(img => img.category === 'cultural').length },
    { id: 'academic', name: 'Academic', count: galleryImages.filter(img => img.category === 'academic').length },
    { id: 'alumni', name: 'Alumni', count: galleryImages.filter(img => img.category === 'alumni').length },
    { id: 'community', name: 'Community', count: galleryImages.filter(img => img.category === 'community').length },
    { id: 'meetings', name: 'Meetings', count: galleryImages.filter(img => img.category === 'meetings').length },
    { id: 'youth', name: 'Youth', count: galleryImages.filter(img => img.category === 'youth').length },
    { id: 'awards', name: 'Awards', count: galleryImages.filter(img => img.category === 'awards').length }
  ];

  const filteredImages = selectedCategory === 'all' 
    ? galleryImages 
    : galleryImages.filter(img => img.category === selectedCategory);

  const openLightbox = (index) => {
    const actualIndex = galleryImages.findIndex(img => img.id === filteredImages[index].id);
    setCurrentImageIndex(actualIndex);
    setSelectedImage(galleryImages[actualIndex]);
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

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 animate-slide-in-bottom">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 animate-slide-in-bottom">
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-gray-900 mb-4">
            SESWA Gallery
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto animate-stagger-1">
            Explore our vibrant community through photos capturing memorable moments,
            cultural celebrations, academic achievements, and community activities.
          </p>
        </div>

        {/* Category Filter */}
        <div className="mb-8">
          <div className="flex items-center mb-4">
            <Filter className="h-5 w-5 text-gray-600 mr-2" />
            <h3 className="text-lg font-semibold text-gray-900">Filter by Category</h3>
          </div>
          <div className="flex flex-wrap gap-3">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
                  selectedCategory === category.id
                    ? 'bg-primary-600 text-white'
                    : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                }`}
              >
                {category.name} ({category.count})
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
          {filteredImages.map((image, index) => (
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
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-70 transition-all duration-300 flex items-center justify-center">
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-center text-white p-4">
                  <Camera className="h-8 w-8 mx-auto mb-3" />
                  <h3 className="font-semibold text-sm mb-2">{image.title}</h3>
                  <p className="text-xs opacity-90 mb-2">{image.description}</p>
                  <div className="flex items-center justify-center text-xs opacity-75">
                    <Calendar className="h-3 w-3 mr-1" />
                    <span>{formatDate(image.date)}</span>
                  </div>
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

        {/* Stats */}
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <h3 className="text-2xl font-heading font-bold text-gray-900 mb-4">
            Gallery Statistics
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div>
              <div className="text-3xl font-bold text-primary-600 mb-1">{galleryImages.length}</div>
              <div className="text-gray-600">Total Photos</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary-600 mb-1">{categories.length - 1}</div>
              <div className="text-gray-600">Categories</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary-600 mb-1">50+</div>
              <div className="text-gray-600">Events Covered</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary-600 mb-1">2024</div>
              <div className="text-gray-600">Current Year</div>
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-95 z-50 flex items-center justify-center p-4">
          <div className="relative max-w-6xl max-h-full w-full">
            {/* Close Button */}
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 text-white hover:text-gray-300 z-10 bg-black bg-opacity-50 rounded-full p-2"
            >
              <X className="h-6 w-6" />
            </button>

            {/* Navigation Buttons */}
            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 z-10 bg-black bg-opacity-50 rounded-full p-2"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 z-10 bg-black bg-opacity-50 rounded-full p-2"
            >
              <ChevronRight className="h-6 w-6" />
            </button>

            {/* Image Container */}
            <div className="flex flex-col lg:flex-row h-full">
              {/* Image */}
              <div className="flex-1 flex items-center justify-center">
                <img
                  src={selectedImage.src}
                  alt={selectedImage.alt}
                  className="max-w-full max-h-[80vh] object-contain rounded-lg"
                />
              </div>

              {/* Image Info Panel */}
              <div className="lg:w-80 bg-white lg:bg-black lg:bg-opacity-80 text-gray-900 lg:text-white p-6 lg:overflow-y-auto">
                <h3 className="text-xl font-bold mb-3">{selectedImage.title}</h3>
                <p className="text-sm lg:text-gray-300 mb-4">{selectedImage.description}</p>
                
                <div className="space-y-3 text-sm">
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-2 text-primary-600 lg:text-primary-400" />
                    <span>{formatDate(selectedImage.date)}</span>
                  </div>
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 mr-2 text-primary-600 lg:text-primary-400" />
                    <span>{selectedImage.location}</span>
                  </div>
                  <div className="flex items-center">
                    <Camera className="h-4 w-4 mr-2 text-primary-600 lg:text-primary-400" />
                    <span>{selectedImage.photographer}</span>
                  </div>
                </div>

                <div className="mt-4">
                  <span className="inline-block px-3 py-1 bg-primary-600 text-white text-sm font-medium rounded-full capitalize">
                    {selectedImage.category}
                  </span>
                </div>

                {/* Image Counter */}
                <div className="mt-6 pt-4 border-t border-gray-300 lg:border-gray-600 text-sm lg:text-gray-400">
                  Photo {currentImageIndex + 1} of {galleryImages.length}
                </div>

                {/* Action Buttons */}
                <div className="mt-4 flex space-x-2">
                  <button className="flex-1 bg-primary-600 hover:bg-primary-700 text-white py-2 px-4 rounded-lg text-sm font-medium transition-colors duration-200 flex items-center justify-center">
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </button>
                  <button className="flex-1 bg-gray-600 hover:bg-gray-700 text-white py-2 px-4 rounded-lg text-sm font-medium transition-colors duration-200 flex items-center justify-center">
                    <Share2 className="h-4 w-4 mr-2" />
                    Share
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GalleryPage;
