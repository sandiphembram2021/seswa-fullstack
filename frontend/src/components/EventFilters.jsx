import React, { useState } from 'react';
import { Search, Filter, X, Calendar, Tag, MapPin } from 'lucide-react';

const EventFilters = ({ onFilter, onClear, loading }) => {
  const [filters, setFilters] = useState({
    search: '',
    eventType: '',
    category: '',
    upcoming: ''
  });
  const [showAdvanced, setShowAdvanced] = useState(false);

  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    
    // Auto-search on typing (debounced)
    if (key === 'search') {
      clearTimeout(window.searchTimeout);
      window.searchTimeout = setTimeout(() => {
        onFilter(newFilters);
      }, 300);
    } else {
      onFilter(newFilters);
    }
  };

  const handleClear = () => {
    const clearedFilters = {
      search: '',
      eventType: '',
      category: '',
      upcoming: ''
    };
    setFilters(clearedFilters);
    setShowAdvanced(false);
    onClear();
  };

  const hasActiveFilters = Object.values(filters).some(value => value !== '');

  const eventTypes = [
    { value: 'workshop', label: 'Workshop' },
    { value: 'seminar', label: 'Seminar' },
    { value: 'conference', label: 'Conference' },
    { value: 'webinar', label: 'Webinar' },
    { value: 'meetup', label: 'Meetup' },
    { value: 'cultural', label: 'Cultural' },
    { value: 'competition', label: 'Competition' }
  ];

  const categories = [
    { value: 'technical', label: 'Technical' },
    { value: 'career', label: 'Career' },
    { value: 'cultural', label: 'Cultural' },
    { value: 'academic', label: 'Academic' },
    { value: 'social', label: 'Social' }
  ];

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      {/* Search Bar */}
      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
        <input
          type="text"
          placeholder="Search events by title, description, or tags..."
          value={filters.search}
          onChange={(e) => handleFilterChange('search', e.target.value)}
          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          disabled={loading}
        />
      </div>

      {/* Quick Filters */}
      <div className="flex flex-wrap gap-3 mb-4">
        <select
          value={filters.upcoming}
          onChange={(e) => handleFilterChange('upcoming', e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          disabled={loading}
        >
          <option value="">All Events</option>
          <option value="true">Upcoming Events</option>
          <option value="false">Past Events</option>
        </select>

        <select
          value={filters.eventType}
          onChange={(e) => handleFilterChange('eventType', e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          disabled={loading}
        >
          <option value="">All Types</option>
          {eventTypes.map(type => (
            <option key={type.value} value={type.value}>{type.label}</option>
          ))}
        </select>

        <button
          onClick={() => setShowAdvanced(!showAdvanced)}
          className="flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200"
          disabled={loading}
        >
          <Filter className="h-4 w-4 mr-2" />
          Advanced Filters
        </button>

        {hasActiveFilters && (
          <button
            onClick={handleClear}
            className="flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors duration-200"
            disabled={loading}
          >
            <X className="h-4 w-4 mr-2" />
            Clear All
          </button>
        )}
      </div>

      {/* Advanced Filters */}
      {showAdvanced && (
        <div className="border-t border-gray-200 pt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Category Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Tag className="inline h-4 w-4 mr-1" />
                Category
              </label>
              <select
                value={filters.category}
                onChange={(e) => handleFilterChange('category', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                disabled={loading}
              >
                <option value="">All Categories</option>
                {categories.map(category => (
                  <option key={category.value} value={category.value}>{category.label}</option>
                ))}
              </select>
            </div>

            {/* Date Range Filter - Future Enhancement */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Calendar className="inline h-4 w-4 mr-1" />
                Date Range
              </label>
              <select
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                disabled={true}
              >
                <option value="">Coming Soon</option>
              </select>
            </div>
          </div>
        </div>
      )}

      {/* Active Filters Display */}
      {hasActiveFilters && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="flex flex-wrap gap-2">
            <span className="text-sm text-gray-600 mr-2">Active filters:</span>
            {Object.entries(filters).map(([key, value]) => {
              if (!value) return null;
              
              let displayValue = value;
              if (key === 'upcoming') {
                displayValue = value === 'true' ? 'Upcoming' : 'Past';
              } else if (key === 'eventType') {
                const type = eventTypes.find(t => t.value === value);
                displayValue = type ? type.label : value;
              } else if (key === 'category') {
                const cat = categories.find(c => c.value === value);
                displayValue = cat ? cat.label : value;
              }
              
              return (
                <span
                  key={key}
                  className="inline-flex items-center px-2 py-1 bg-primary-100 text-primary-800 text-xs rounded-full"
                >
                  {key}: {displayValue}
                  <button
                    onClick={() => handleFilterChange(key, '')}
                    className="ml-1 hover:text-primary-600"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </span>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default EventFilters;
