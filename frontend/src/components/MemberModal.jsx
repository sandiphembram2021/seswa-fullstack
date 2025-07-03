import React from 'react';
import { X, MapPin, GraduationCap, Building, Calendar, Mail, Phone, Globe, Linkedin, Github, Twitter, Award, Users } from 'lucide-react';

const MemberModal = ({ member, isOpen, onClose }) => {
  if (!isOpen || !member) return null;

  const getInitials = (firstName, lastName) => {
    return `${firstName?.charAt(0) || ''}${lastName?.charAt(0) || ''}`.toUpperCase();
  };

  const getRoleColor = (role) => {
    switch (role) {
      case 'student':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'mentor':
        return 'bg-primary-100 text-primary-800 border-primary-200';
      case 'admin':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-900">Member Profile</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
          >
            <X className="h-5 w-5 text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Profile Header */}
          <div className="flex items-start space-x-4 mb-6">
            {member.avatar ? (
              <img
                src={member.avatar}
                alt={`${member.firstName} ${member.lastName}`}
                className="w-20 h-20 rounded-full object-cover"
              />
            ) : (
              <div className="w-20 h-20 rounded-full bg-primary-600 flex items-center justify-center">
                <span className="text-white font-semibold text-xl">
                  {getInitials(member.firstName, member.lastName)}
                </span>
              </div>
            )}
            <div className="flex-1">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                {member.firstName} {member.lastName}
              </h3>
              <div className="flex items-center space-x-3 mb-3">
                <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getRoleColor(member.role)}`}>
                  {member.role.charAt(0).toUpperCase() + member.role.slice(1)}
                </span>
                {member.membershipId && (
                  <span className="text-sm text-gray-500 font-mono">
                    ID: {member.membershipId}
                  </span>
                )}
              </div>
              {member.bio && (
                <p className="text-gray-600 leading-relaxed">{member.bio}</p>
              )}
            </div>
          </div>

          {/* Contact Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                <Mail className="h-5 w-5 mr-2 text-primary-600" />
                Contact Information
              </h4>
              <div className="space-y-2">
                <div className="flex items-center text-sm text-gray-600">
                  <Mail className="h-4 w-4 mr-2 text-gray-400" />
                  <a href={`mailto:${member.email}`} className="hover:text-primary-600">
                    {member.email}
                  </a>
                </div>
                {member.phone && (
                  <div className="flex items-center text-sm text-gray-600">
                    <Phone className="h-4 w-4 mr-2 text-gray-400" />
                    <a href={`tel:${member.phone}`} className="hover:text-primary-600">
                      {member.phone}
                    </a>
                  </div>
                )}
                {member.district && (
                  <div className="flex items-center text-sm text-gray-600">
                    <MapPin className="h-4 w-4 mr-2 text-gray-400" />
                    <span>{member.district}, West Bengal</span>
                  </div>
                )}
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                <Calendar className="h-5 w-5 mr-2 text-primary-600" />
                Membership Details
              </h4>
              <div className="space-y-2">
                {member.joinedDate && (
                  <div className="flex items-center text-sm text-gray-600">
                    <Calendar className="h-4 w-4 mr-2 text-gray-400" />
                    <span>Joined {formatDate(member.joinedDate)}</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Academic/Professional Information */}
          {(member.college || member.branch || member.company) && (
            <div className="mb-6">
              <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                <GraduationCap className="h-5 w-5 mr-2 text-primary-600" />
                {member.role === 'student' ? 'Academic Information' : 'Professional Information'}
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {member.college && (
                  <div className="flex items-center text-sm text-gray-600">
                    <GraduationCap className="h-4 w-4 mr-2 text-gray-400" />
                    <span>{member.college}</span>
                  </div>
                )}
                {member.branch && (
                  <div className="flex items-center text-sm text-gray-600">
                    <Building className="h-4 w-4 mr-2 text-gray-400" />
                    <span>{member.branch}</span>
                  </div>
                )}
                {member.company && (
                  <div className="flex items-center text-sm text-gray-600">
                    <Building className="h-4 w-4 mr-2 text-gray-400" />
                    <span>{member.company}</span>
                  </div>
                )}
                {member.designation && (
                  <div className="flex items-center text-sm text-gray-600">
                    <Award className="h-4 w-4 mr-2 text-gray-400" />
                    <span>{member.designation}</span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Social Links */}
          {member.socialLinks && Object.values(member.socialLinks).some(link => link) && (
            <div className="mb-6">
              <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                <Globe className="h-5 w-5 mr-2 text-primary-600" />
                Social Links
              </h4>
              <div className="flex space-x-3">
                {member.socialLinks.linkedin && (
                  <a
                    href={member.socialLinks.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors duration-200"
                  >
                    <Linkedin className="h-5 w-5" />
                  </a>
                )}
                {member.socialLinks.github && (
                  <a
                    href={member.socialLinks.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors duration-200"
                  >
                    <Github className="h-5 w-5" />
                  </a>
                )}
                {member.socialLinks.twitter && (
                  <a
                    href={member.socialLinks.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-blue-100 text-blue-400 rounded-lg hover:bg-blue-200 transition-colors duration-200"
                  >
                    <Twitter className="h-5 w-5" />
                  </a>
                )}
                {member.socialLinks.website && (
                  <a
                    href={member.socialLinks.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-primary-100 text-primary-600 rounded-lg hover:bg-primary-200 transition-colors duration-200"
                  >
                    <Globe className="h-5 w-5" />
                  </a>
                )}
              </div>
            </div>
          )}

          {/* Expertise (for mentors) */}
          {member.expertise && member.expertise.length > 0 && (
            <div className="mb-6">
              <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                <Award className="h-5 w-5 mr-2 text-primary-600" />
                Areas of Expertise
              </h4>
              <div className="flex flex-wrap gap-2">
                {member.expertise.map((skill, index) => (
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
        </div>

        {/* Footer */}
        <div className="border-t border-gray-200 px-6 py-4 bg-gray-50">
          <div className="flex justify-end space-x-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200"
            >
              Close
            </button>
            <a
              href={`mailto:${member.email}`}
              className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors duration-200"
            >
              Contact Member
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MemberModal;
