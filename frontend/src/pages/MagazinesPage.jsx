import React, { useState, useEffect } from 'react';
import { Search, Filter, BookOpen, Download, Calendar, Star } from 'lucide-react';
import MagazineCard from '../components/MagazineCard';

const MagazinesPage = () => {
  const [magazines, setMagazines] = useState([]);
  const [filteredMagazines, setFilteredMagazines] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [loading, setLoading] = useState(false);

  // Sample magazine data
  const sampleMagazines = [
    {
      id: 1,
      title: 'BERA TARAS 2024',
      description: 'Annual magazine featuring student achievements, cultural events, and academic excellence at SESWA.',
      type: 'annual',
      volume: 12,
      issue: 1,
      pages: 48,
      publishDate: '2024-01-15',
      downloads: 1250,
      featured: true,
      coverImage: null,
      pdfUrl: '/magazines/bera-taras-2024.pdf'
    },
    {
      id: 2,
      title: 'BERA TARAS 2023',
      description: 'Previous year annual magazine showcasing the journey of Santal engineering students.',
      type: 'annual',
      volume: 11,
      issue: 1,
      pages: 42,
      publishDate: '2023-01-20',
      downloads: 2100,
      featured: false,
      coverImage: null,
      pdfUrl: '/magazines/bera-taras-2023.pdf'
    },
    {
      id: 3,
      title: 'SESWA Newsletter Q4 2023',
      description: 'Quarterly newsletter with updates on events, achievements, and upcoming programs.',
      type: 'newsletter',
      volume: 5,
      issue: 4,
      pages: 16,
      publishDate: '2023-12-01',
      downloads: 850,
      featured: false,
      coverImage: null,
      pdfUrl: '/magazines/newsletter-q4-2023.pdf'
    },
    {
      id: 4,
      title: 'Special Edition: 20 Years of SESWA',
      description: 'Commemorative special edition celebrating 20 years of SESWA and its impact on the community.',
      type: 'special',
      volume: 1,
      issue: 1,
      pages: 64,
      publishDate: '2023-08-31',
      downloads: 3200,
      featured: true,
      coverImage: null,
      pdfUrl: '/magazines/20-years-special.pdf'
    }
  ];

  useEffect(() => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setMagazines(sampleMagazines);
      setFilteredMagazines(sampleMagazines);
      setLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    let filtered = magazines;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(magazine =>
        magazine.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        magazine.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by type
    if (selectedType !== 'all') {
      filtered = filtered.filter(magazine => magazine.type === selectedType);
    }

    setFilteredMagazines(filtered);
  }, [magazines, searchTerm, selectedType]);

  const handleDownload = (magazine) => {
    // Simulate download
    console.log('Downloading:', magazine.title);
    // In real implementation, this would trigger a file download
    alert(`Downloading ${magazine.title}...`);
  };

  const handleMagazineClick = (magazine) => {
    // Open magazine preview or details
    console.log('Opening magazine:', magazine.title);
    alert(`Opening preview for ${magazine.title}`);
  };

  const magazineTypes = [
    { value: 'all', label: 'All Types' },
    { value: 'annual', label: 'Annual' },
    { value: 'quarterly', label: 'Quarterly' },
    { value: 'newsletter', label: 'Newsletter' },
    { value: 'special', label: 'Special Edition' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-green-600 to-green-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <BookOpen className="h-16 w-16 mx-auto mb-4" />
            <h1 className="text-4xl font-bold mb-4">SESWA Magazines</h1>
            <p className="text-xl text-green-100 max-w-3xl mx-auto">
              Explore our collection of magazines featuring student achievements, cultural events, 
              and the rich heritage of the Santal engineering community.
            </p>
          </div>
        </div>
      </div>

      {/* Search and Filter Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search magazines..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>

            {/* Type Filter */}
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent appearance-none bg-white"
              >
                {magazineTypes.map(type => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Results Summary */}
        <div className="mb-6">
          <p className="text-gray-600">
            Showing {filteredMagazines.length} of {magazines.length} magazines
          </p>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading magazines...</p>
          </div>
        )}

        {/* Magazines Grid */}
        {!loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMagazines.map(magazine => (
              <MagazineCard
                key={magazine.id}
                magazine={magazine}
                onClick={handleMagazineClick}
                onDownload={handleDownload}
              />
            ))}
          </div>
        )}

        {/* No Results */}
        {!loading && filteredMagazines.length === 0 && (
          <div className="text-center py-12">
            <BookOpen className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No magazines found</h3>
            <p className="text-gray-600">
              Try adjusting your search terms or filters to find what you're looking for.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MagazinesPage;
