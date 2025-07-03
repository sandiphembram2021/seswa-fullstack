import React, { useState } from 'react';
import { Search, Filter, X, FileText, Briefcase, GraduationCap, BookOpen } from 'lucide-react';

const ResourceFilters = ({ onFilter, onClear, loading }) => {
  const [filters, setFilters] = useState({
    search: '',
    type: '',
    category: '',
    difficulty: ''
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
      type: '',
      category: '',
      difficulty: ''
    };
    setFilters(clearedFilters);
    setShowAdvanced(false);
    onClear();
  };

  const hasActiveFilters = Object.values(filters).some(value => value !== '');

  const resourceTypes = [
    { value: 'study_material', label: 'Study Materials', icon: FileText },
    { value: 'job', label: 'Job Opportunities', icon: Briefcase },
    { value: 'internship', label: 'Internships', icon: GraduationCap },
    { value: 'blog', label: 'Blogs', icon: BookOpen },
    { value: 'video', label: 'Videos', icon: BookOpen },
    { value: 'document', label: 'Documents', icon: FileText },
    { value: 'link', label: 'Links', icon: BookOpen }
  ];

  const categories = [
    { value: 'computer_science', label: 'Computer Science' },
    { value: 'mechanical', label: 'Mechanical Engineering' },
    { value: 'electrical', label: 'Electrical Engineering' },
    { value: 'civil', label: 'Civil Engineering' },
    { value: 'chemical', label: 'Chemical Engineering' },
    { value: 'electronics', label: 'Electronics Engineering' },
    { value: 'aerospace', label: 'Aerospace Engineering' },
    { value: 'biotechnology', label: 'Biotechnology' },
    { value: 'general', label: 'General' }
  ];

  const difficulties = [
    { value: 'beginner', label: 'Beginner' },
    { value: 'intermediate', label: 'Intermediate' },
    { value: 'advanced', label: 'Advanced' }
  ];

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      {/* Search Bar */}
      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
        <input
          type="text"
          placeholder="Search resources by title, description, tags, or company..."
          value={filters.search}
          onChange={(e) => handleFilterChange('search', e.target.value)}
          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          disabled={loading}
        />
      </div>

      {/* Quick Filter Buttons */}
      <div className="flex flex-wrap gap-3 mb-4">
        {resourceTypes.slice(0, 4).map(type => (
          <button
            key={type.value}
            onClick={() => handleFilterChange('type', filters.type === type.value ? '' : type.value)}
            className={`flex items-center px-4 py-2 rounded-lg border transition-colors duration-200 ${
              filters.type === type.value
                ? 'bg-primary-600 text-white border-primary-600'
                : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
            }`}
            disabled={loading}
          >
            <type.icon className="h-4 w-4 mr-2" />
            {type.label}
          </button>
        ))}
      </div>

      {/* Advanced Filters Toggle */}
      <div className="flex flex-wrap gap-3 mb-4">
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Resource Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <FileText className="inline h-4 w-4 mr-1" />
                Resource Type
              </label>
              <select
                value={filters.type}
                onChange={(e) => handleFilterChange('type', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                disabled={loading}
              >
                <option value="">All Types</option>
                {resourceTypes.map(type => (
                  <option key={type.value} value={type.value}>{type.label}</option>
                ))}
              </select>
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <BookOpen className="inline h-4 w-4 mr-1" />
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

            {/* Difficulty */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <GraduationCap className="inline h-4 w-4 mr-1" />
                Difficulty
              </label>
              <select
                value={filters.difficulty}
                onChange={(e) => handleFilterChange('difficulty', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                disabled={loading}
              >
                <option value="">All Levels</option>
                {difficulties.map(difficulty => (
                  <option key={difficulty.value} value={difficulty.value}>{difficulty.label}</option>
                ))}
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
              if (key === 'type') {
                const type = resourceTypes.find(t => t.value === value);
                displayValue = type ? type.label : value;
              } else if (key === 'category') {
                const cat = categories.find(c => c.value === value);
                displayValue = cat ? cat.label : value;
              } else if (key === 'difficulty') {
                const diff = difficulties.find(d => d.value === value);
                displayValue = diff ? diff.label : value;
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

export default ResourceFilters;
