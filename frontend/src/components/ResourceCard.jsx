import React from 'react';
import { 
  FileText, 
  Briefcase, 
  GraduationCap, 
  BookOpen, 
  Video, 
  ExternalLink, 
  Download, 
  Heart, 
  Eye, 
  Calendar,
  User,
  Building,
  MapPin,
  IndianRupee,
  Clock
} from 'lucide-react';

const ResourceCard = ({ resource, onClick, onLike, onDownload, liking }) => {
  const getResourceIcon = (type) => {
    switch (type) {
      case 'study_material':
        return FileText;
      case 'job':
        return Briefcase;
      case 'internship':
        return GraduationCap;
      case 'blog':
        return BookOpen;
      case 'video':
        return Video;
      default:
        return FileText;
    }
  };

  const getResourceTypeColor = (type) => {
    switch (type) {
      case 'study_material':
        return 'bg-blue-100 text-blue-800';
      case 'job':
        return 'bg-green-100 text-green-800';
      case 'internship':
        return 'bg-purple-100 text-purple-800';
      case 'blog':
        return 'bg-orange-100 text-orange-800';
      case 'video':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'beginner':
        return 'bg-green-100 text-green-800';
      case 'intermediate':
        return 'bg-yellow-100 text-yellow-800';
      case 'advanced':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatFileSize = (bytes) => {
    if (!bytes) return '';
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return Math.round(bytes / Math.pow(1024, i) * 100) / 100 + ' ' + sizes[i];
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const isJobOrInternship = resource.type === 'job' || resource.type === 'internship';
  const hasFile = resource.fileUrl || resource.fileName;
  const hasExternalLink = resource.externalUrl || resource.applicationUrl;
  const ResourceIcon = getResourceIcon(resource.type);

  const handleLikeClick = (e) => {
    e.stopPropagation();
    onLike(resource._id);
  };

  const handleDownloadClick = (e) => {
    e.stopPropagation();
    if (hasFile) {
      onDownload(resource._id);
      // In a real app, this would trigger the actual download
      if (resource.fileUrl) {
        window.open(resource.fileUrl, '_blank');
      }
    } else if (hasExternalLink) {
      window.open(resource.externalUrl || resource.applicationUrl, '_blank');
    }
  };

  return (
    <div 
      className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-200 overflow-hidden cursor-pointer border border-gray-100 hover:border-primary-200"
      onClick={() => onClick && onClick(resource)}
    >
      {/* Header */}
      <div className="p-6 pb-4">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center space-x-2">
            <div className="p-2 bg-primary-100 rounded-lg">
              <ResourceIcon className="h-5 w-5 text-primary-600" />
            </div>
            <div className="flex flex-wrap gap-2">
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getResourceTypeColor(resource.type)}`}>
                {resource.type.replace('_', ' ').charAt(0).toUpperCase() + resource.type.replace('_', ' ').slice(1)}
              </span>
              {resource.difficulty && (
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(resource.difficulty)}`}>
                  {resource.difficulty.charAt(0).toUpperCase() + resource.difficulty.slice(1)}
                </span>
              )}
            </div>
          </div>
          <button
            onClick={handleLikeClick}
            disabled={liking}
            className={`p-2 rounded-full transition-colors duration-200 ${
              resource.isLiked 
                ? 'text-red-500 hover:text-red-600' 
                : 'text-gray-400 hover:text-red-500'
            }`}
          >
            <Heart className={`h-5 w-5 ${resource.isLiked ? 'fill-current' : ''}`} />
          </button>
        </div>

        {/* Title */}
        <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
          {resource.title}
        </h3>

        {/* Description */}
        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
          {resource.description}
        </p>

        {/* Job/Internship specific info */}
        {isJobOrInternship && (
          <div className="space-y-2 mb-4">
            {resource.company && (
              <div className="flex items-center text-sm text-gray-600">
                <Building className="h-4 w-4 mr-2 text-gray-400" />
                <span>{resource.company}</span>
              </div>
            )}
            {resource.location && (
              <div className="flex items-center text-sm text-gray-600">
                <MapPin className="h-4 w-4 mr-2 text-gray-400" />
                <span>{resource.location}</span>
              </div>
            )}
            {resource.salary && (
              <div className="flex items-center text-sm text-gray-600">
                <IndianRupee className="h-4 w-4 mr-2 text-gray-400" />
                <span>{resource.salary}</span>
              </div>
            )}
            {resource.applicationDeadline && (
              <div className="flex items-center text-sm text-gray-600">
                <Clock className="h-4 w-4 mr-2 text-gray-400" />
                <span>Apply by {formatDate(resource.applicationDeadline)}</span>
              </div>
            )}
          </div>
        )}

        {/* Study material specific info */}
        {!isJobOrInternship && (
          <div className="space-y-2 mb-4">
            {resource.subject && (
              <div className="flex items-center text-sm text-gray-600">
                <BookOpen className="h-4 w-4 mr-2 text-gray-400" />
                <span>{resource.subject}</span>
              </div>
            )}
            {resource.fileSize && (
              <div className="flex items-center text-sm text-gray-600">
                <FileText className="h-4 w-4 mr-2 text-gray-400" />
                <span>{formatFileSize(resource.fileSize)}</span>
              </div>
            )}
          </div>
        )}

        {/* Author */}
        <div className="flex items-center text-sm text-gray-600 mb-4">
          <User className="h-4 w-4 mr-2 text-gray-400" />
          <span>By {resource.author.firstName} {resource.author.lastName}</span>
        </div>

        {/* Tags */}
        {resource.tags && resource.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-4">
            {resource.tags.slice(0, 3).map((tag, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
              >
                {tag}
              </span>
            ))}
            {resource.tags.length > 3 && (
              <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                +{resource.tags.length - 3} more
              </span>
            )}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
        <div className="flex items-center justify-between">
          {/* Stats */}
          <div className="flex items-center space-x-4 text-sm text-gray-500">
            <div className="flex items-center">
              <Eye className="h-4 w-4 mr-1" />
              <span>{resource.views}</span>
            </div>
            {resource.downloads > 0 && (
              <div className="flex items-center">
                <Download className="h-4 w-4 mr-1" />
                <span>{resource.downloads}</span>
              </div>
            )}
            <div className="flex items-center">
              <Heart className="h-4 w-4 mr-1" />
              <span>{resource.likeCount}</span>
            </div>
            <div className="flex items-center">
              <Calendar className="h-4 w-4 mr-1" />
              <span>{formatDate(resource.createdAt)}</span>
            </div>
          </div>

          {/* Action Button */}
          <button
            onClick={handleDownloadClick}
            className="flex items-center px-3 py-1.5 bg-primary-600 text-white text-sm rounded-lg hover:bg-primary-700 transition-colors duration-200"
          >
            {hasFile ? (
              <>
                <Download className="h-4 w-4 mr-1" />
                Download
              </>
            ) : (
              <>
                <ExternalLink className="h-4 w-4 mr-1" />
                {isJobOrInternship ? 'Apply' : 'View'}
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResourceCard;
