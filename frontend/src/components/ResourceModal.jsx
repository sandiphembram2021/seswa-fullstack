import React from 'react';
import { 
  X, 
  FileText, 
  Briefcase, 
  GraduationCap, 
  BookOpen, 
  Video, 
  Download, 
  ExternalLink, 
  Heart, 
  Eye, 
  Calendar, 
  User, 
  Building, 
  MapPin, 
  IndianRupee, 
  Clock,
  Tag
} from 'lucide-react';

const ResourceModal = ({ resource, isOpen, onClose, onLike, onDownload, liking }) => {
  if (!isOpen || !resource) return null;

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
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'job':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'internship':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'blog':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'video':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'beginner':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'intermediate':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'advanced':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
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
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const isJobOrInternship = resource.type === 'job' || resource.type === 'internship';
  const hasFile = resource.fileUrl || resource.fileName;
  const hasExternalLink = resource.externalUrl || resource.applicationUrl;
  const ResourceIcon = getResourceIcon(resource.type);

  const handleLikeClick = () => {
    onLike(resource._id);
  };

  const handleDownloadClick = () => {
    if (hasFile) {
      onDownload(resource._id);
      if (resource.fileUrl) {
        window.open(resource.fileUrl, '_blank');
      }
    } else if (hasExternalLink) {
      window.open(resource.externalUrl || resource.applicationUrl, '_blank');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-900">Resource Details</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
          >
            <X className="h-5 w-5 text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Resource Header */}
          <div className="flex items-start justify-between mb-6">
            <div className="flex-1">
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-3 bg-primary-100 rounded-lg">
                  <ResourceIcon className="h-6 w-6 text-primary-600" />
                </div>
                <div className="flex flex-wrap gap-2">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getResourceTypeColor(resource.type)}`}>
                    {resource.type.replace('_', ' ').charAt(0).toUpperCase() + resource.type.replace('_', ' ').slice(1)}
                  </span>
                  {resource.difficulty && (
                    <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getDifficultyColor(resource.difficulty)}`}>
                      {resource.difficulty.charAt(0).toUpperCase() + resource.difficulty.slice(1)}
                    </span>
                  )}
                </div>
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-3">{resource.title}</h1>
              <p className="text-gray-600 leading-relaxed text-lg">{resource.description}</p>
            </div>
            <button
              onClick={handleLikeClick}
              disabled={liking}
              className={`ml-4 p-3 rounded-full transition-colors duration-200 ${
                resource.isLiked 
                  ? 'text-red-500 hover:text-red-600 bg-red-50' 
                  : 'text-gray-400 hover:text-red-500 hover:bg-red-50'
              }`}
            >
              <Heart className={`h-6 w-6 ${resource.isLiked ? 'fill-current' : ''}`} />
            </button>
          </div>

          {/* Resource Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {/* Basic Information */}
            <div className="space-y-4">
              <h3 className="font-semibold text-gray-900 text-lg">Information</h3>
              <div className="space-y-3">
                <div className="flex items-center text-gray-600">
                  <User className="h-5 w-5 mr-3 text-gray-400" />
                  <div>
                    <p className="font-medium">Author</p>
                    <p className="text-sm">{resource.author.firstName} {resource.author.lastName}</p>
                  </div>
                </div>
                <div className="flex items-center text-gray-600">
                  <Calendar className="h-5 w-5 mr-3 text-gray-400" />
                  <div>
                    <p className="font-medium">Published</p>
                    <p className="text-sm">{formatDate(resource.createdAt)}</p>
                  </div>
                </div>
                {resource.subject && (
                  <div className="flex items-center text-gray-600">
                    <BookOpen className="h-5 w-5 mr-3 text-gray-400" />
                    <div>
                      <p className="font-medium">Subject</p>
                      <p className="text-sm">{resource.subject}</p>
                    </div>
                  </div>
                )}
                {resource.fileSize && (
                  <div className="flex items-center text-gray-600">
                    <FileText className="h-5 w-5 mr-3 text-gray-400" />
                    <div>
                      <p className="font-medium">File Size</p>
                      <p className="text-sm">{formatFileSize(resource.fileSize)}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Job/Internship specific info */}
            {isJobOrInternship && (
              <div className="space-y-4">
                <h3 className="font-semibold text-gray-900 text-lg">Job Details</h3>
                <div className="space-y-3">
                  {resource.company && (
                    <div className="flex items-center text-gray-600">
                      <Building className="h-5 w-5 mr-3 text-gray-400" />
                      <div>
                        <p className="font-medium">Company</p>
                        <p className="text-sm">{resource.company}</p>
                      </div>
                    </div>
                  )}
                  {resource.location && (
                    <div className="flex items-center text-gray-600">
                      <MapPin className="h-5 w-5 mr-3 text-gray-400" />
                      <div>
                        <p className="font-medium">Location</p>
                        <p className="text-sm">{resource.location}</p>
                      </div>
                    </div>
                  )}
                  {resource.salary && (
                    <div className="flex items-center text-gray-600">
                      <IndianRupee className="h-5 w-5 mr-3 text-gray-400" />
                      <div>
                        <p className="font-medium">Salary</p>
                        <p className="text-sm">{resource.salary}</p>
                      </div>
                    </div>
                  )}
                  {resource.experience && (
                    <div className="flex items-center text-gray-600">
                      <GraduationCap className="h-5 w-5 mr-3 text-gray-400" />
                      <div>
                        <p className="font-medium">Experience</p>
                        <p className="text-sm">{resource.experience}</p>
                      </div>
                    </div>
                  )}
                  {resource.applicationDeadline && (
                    <div className="flex items-center text-gray-600">
                      <Clock className="h-5 w-5 mr-3 text-gray-400" />
                      <div>
                        <p className="font-medium">Application Deadline</p>
                        <p className="text-sm">{formatDate(resource.applicationDeadline)}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Statistics for non-job resources */}
            {!isJobOrInternship && (
              <div className="space-y-4">
                <h3 className="font-semibold text-gray-900 text-lg">Statistics</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <Eye className="h-5 w-5 mx-auto mb-1 text-gray-400" />
                    <p className="text-lg font-semibold text-gray-900">{resource.views}</p>
                    <p className="text-xs text-gray-600">Views</p>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <Download className="h-5 w-5 mx-auto mb-1 text-gray-400" />
                    <p className="text-lg font-semibold text-gray-900">{resource.downloads}</p>
                    <p className="text-xs text-gray-600">Downloads</p>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <Heart className="h-5 w-5 mx-auto mb-1 text-gray-400" />
                    <p className="text-lg font-semibold text-gray-900">{resource.likeCount}</p>
                    <p className="text-xs text-gray-600">Likes</p>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <Calendar className="h-5 w-5 mx-auto mb-1 text-gray-400" />
                    <p className="text-lg font-semibold text-gray-900">
                      {new Date(resource.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    </p>
                    <p className="text-xs text-gray-600">Published</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Skills (for jobs/internships) */}
          {isJobOrInternship && resource.skills && resource.skills.length > 0 && (
            <div className="mb-6">
              <h3 className="font-semibold text-gray-900 text-lg mb-3">Required Skills</h3>
              <div className="flex flex-wrap gap-2">
                {resource.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-primary-100 text-primary-800 text-sm rounded-full"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Tags */}
          {resource.tags && resource.tags.length > 0 && (
            <div className="mb-6">
              <h3 className="font-semibold text-gray-900 text-lg mb-3 flex items-center">
                <Tag className="h-5 w-5 mr-2" />
                Tags
              </h3>
              <div className="flex flex-wrap gap-2">
                {resource.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-gray-200 px-6 py-4 bg-gray-50">
          <div className="flex justify-between items-center">
            <button
              onClick={onClose}
              className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200"
            >
              Close
            </button>
            
            <div className="flex space-x-3">
              <button
                onClick={handleLikeClick}
                disabled={liking}
                className={`px-4 py-2 rounded-lg transition-colors duration-200 disabled:opacity-50 ${
                  resource.isLiked
                    ? 'bg-red-600 text-white hover:bg-red-700'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                <Heart className={`h-4 w-4 mr-2 inline ${resource.isLiked ? 'fill-current' : ''}`} />
                {resource.isLiked ? 'Liked' : 'Like'}
              </button>
              
              <button
                onClick={handleDownloadClick}
                className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors duration-200"
              >
                {hasFile ? (
                  <>
                    <Download className="h-4 w-4 mr-2 inline" />
                    Download
                  </>
                ) : (
                  <>
                    <ExternalLink className="h-4 w-4 mr-2 inline" />
                    {isJobOrInternship ? 'Apply Now' : 'View Resource'}
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResourceModal;
