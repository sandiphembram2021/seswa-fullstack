import React from 'react';
import { Calendar, Download, Eye, FileText, BookOpen, Star } from 'lucide-react';

const MagazineCard = ({ magazine, onClick, onDownload }) => {
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getMagazineTypeColor = (type) => {
    switch (type) {
      case 'annual':
        return 'bg-blue-100 text-blue-800';
      case 'quarterly':
        return 'bg-green-100 text-green-800';
      case 'special':
        return 'bg-purple-100 text-purple-800';
      case 'newsletter':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleDownloadClick = (e) => {
    e.stopPropagation();
    if (onDownload) {
      onDownload(magazine);
    }
  };

  return (
    <div 
      className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-200 overflow-hidden cursor-pointer border border-gray-100 hover:border-primary-200"
      onClick={() => onClick && onClick(magazine)}
    >
      {/* Magazine Cover */}
      {magazine.coverImage ? (
        <img
          src={magazine.coverImage}
          alt={magazine.title}
          className="w-full h-48 object-cover"
        />
      ) : (
        <div className="w-full h-48 bg-gradient-to-br from-green-500 to-green-700 flex items-center justify-center">
          <div className="text-center text-white">
            <BookOpen className="h-12 w-12 mx-auto mb-2" />
            <p className="text-sm font-medium">{magazine.title}</p>
          </div>
        </div>
      )}

      <div className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex flex-wrap gap-2">
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getMagazineTypeColor(magazine.type)}`}>
              {magazine.type?.charAt(0).toUpperCase() + magazine.type?.slice(1) || 'Magazine'}
            </span>
            {magazine.featured && (
              <span className="px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                <Star className="h-3 w-3 inline mr-1" />
                Featured
              </span>
            )}
          </div>
          <div className="text-xs text-gray-500">
            {magazine.pages} pages
          </div>
        </div>

        {/* Title */}
        <h3 className="text-xl font-semibold text-gray-900 mb-2 line-clamp-2">
          {magazine.title}
        </h3>

        {/* Description */}
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {magazine.description}
        </p>

        {/* Magazine Details */}
        <div className="space-y-2 mb-4">
          <div className="flex items-center text-sm text-gray-600">
            <Calendar className="h-4 w-4 mr-2 text-gray-400" />
            <span>{formatDate(magazine.publishDate)}</span>
          </div>
          
          <div className="flex items-center text-sm text-gray-600">
            <FileText className="h-4 w-4 mr-2 text-gray-400" />
            <span>Volume {magazine.volume}, Issue {magazine.issue}</span>
          </div>
          
          <div className="flex items-center text-sm text-gray-600">
            <Download className="h-4 w-4 mr-2 text-gray-400" />
            <span>{magazine.downloads || 0} downloads</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="pt-4 border-t border-gray-100">
          <div className="flex gap-2">
            <button
              onClick={handleDownloadClick}
              className="flex-1 bg-primary-600 hover:bg-primary-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center"
            >
              <Download className="h-4 w-4 mr-2" />
              Download PDF
            </button>
            <button
              onClick={() => onClick && onClick(magazine)}
              className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-2 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center"
            >
              <Eye className="h-4 w-4 mr-2" />
              Preview
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MagazineCard;
