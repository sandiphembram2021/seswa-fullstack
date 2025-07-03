import React, { useState } from 'react';
import { Search, Building, GraduationCap, Users, MapPin } from 'lucide-react';

const CollegesPage = () => {
  const [searchQuery, setSearchQuery] = useState('');

  // Simplified college list - only names for now
  const collegesList = [
    'IIEST Shibpur',
    'NIT Durgapur',
    'IIT Kharagpur',
    'Jadavpur University',
    'KGEC',
    'JGEC',
    'CGEC',
    'MAKAUT',
    'UIT',
    'GCELT',
    'GCECT',
    'GCETT Bankura',
    'GCETT Serampore',
    'RKMGCE'
  ];

  // Filter colleges based on search
  const filteredColleges = collegesList.filter(college =>
    college.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const stats = [
    { icon: Building, label: 'Total Colleges', value: collegesList.length, color: 'text-primary-600' },
    { icon: GraduationCap, label: 'Government Colleges', value: '13', color: 'text-green-600' },
    { icon: Users, label: 'Private Colleges', value: '1', color: 'text-blue-600' },
    { icon: MapPin, label: 'Locations', value: '10+', color: 'text-purple-600' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12 animate-slide-in-bottom">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 animate-slide-in-bottom">
          <h1 className="text-4xl font-heading font-bold text-gray-900 mb-4">
            SESWA Partner Colleges
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto animate-stagger-1">
            SESWA members are studying across these prestigious engineering institutions
            in West Bengal and neighboring states.
          </p>
          <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg max-w-2xl mx-auto">
            <p className="text-yellow-800 text-sm">
              📝 <strong>Note:</strong> Detailed college information is being updated. Currently showing college names only.
            </p>
          </div>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className={`bg-white rounded-lg shadow-md p-6 text-center animate-scale-in animate-stagger-${index + 1} hover-lift`}>
              <stat.icon className={`h-8 w-8 mx-auto mb-3 ${stat.color} animate-float`} />
              <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
              <div className="text-sm text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Search */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8 animate-slide-in-bottom animate-stagger-2">
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Search colleges by name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300"
            />
          </div>
        </div>

        {/* Colleges Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredColleges.map((college, index) => (
            <div
              key={index}
              className={`bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 p-6 text-center hover-lift animate-scale-in animate-stagger-${(index % 6) + 1}`}
            >
              <div className="flex items-center justify-center w-16 h-16 bg-primary-100 rounded-full mx-auto mb-4 animate-float">
                <GraduationCap className="h-8 w-8 text-primary-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {college}
              </h3>
              <div className="text-sm text-gray-500 mb-3">
                SESWA Partner College
              </div>
              <div className="inline-flex items-center px-3 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                Active Members
              </div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredColleges.length === 0 && (
          <div className="text-center py-12 animate-slide-in-bottom">
            <Building className="h-16 w-16 text-gray-400 mx-auto mb-4 animate-float" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No colleges found</h3>
            <p className="text-gray-600 mb-6">
              Try adjusting your search or clear the search box.
            </p>
            <button
              onClick={() => setSearchQuery('')}
              className="bg-primary-600 hover:bg-primary-700 text-white font-semibold py-3 px-8 rounded-lg transition-all duration-300 hover-lift"
            >
              Clear Search
            </button>
          </div>
        )}

        {/* Call to Action */}
        <div className="mt-12 text-center bg-primary-600 text-white rounded-lg p-8 animate-slide-in-bottom animate-gradient">
          <h3 className="text-2xl font-bold mb-4 animate-slide-in-bottom">Is Your College Missing?</h3>
          <p className="text-primary-100 mb-6 max-w-2xl mx-auto animate-slide-in-bottom animate-stagger-1">
            If your engineering college is not listed here and you'd like to see it added to our network,
            please get in touch with us.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-in-bottom animate-stagger-2">
            <a
              href="/contact"
              className="bg-white text-primary-600 hover:bg-primary-50 font-semibold py-3 px-8 rounded-lg transition-all duration-300 hover-lift hover-glow"
            >
              Contact Us
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CollegesPage;
