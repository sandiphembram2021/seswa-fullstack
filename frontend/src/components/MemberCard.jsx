import React from 'react';
import { MapPin, GraduationCap, Building, Calendar, Mail, ExternalLink } from 'lucide-react';

const MemberCard = ({ member, onClick }) => {
  const getInitials = (firstName, lastName) => {
    return `${firstName?.charAt(0) || ''}${lastName?.charAt(0) || ''}`.toUpperCase();
  };

  const getRoleColor = (role) => {
    switch (role) {
      case 'student':
        return 'bg-blue-100 text-blue-800';
      case 'mentor':
        return 'bg-primary-100 text-primary-800';
      case 'admin':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatJoinDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short'
    });
  };

  return (
    <div 
      className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-200 p-6 cursor-pointer border border-gray-100 hover:border-primary-200"
      onClick={() => onClick && onClick(member)}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          {member.avatar ? (
            <img
              src={member.avatar}
              alt={`${member.firstName} ${member.lastName}`}
              className="w-12 h-12 rounded-full object-cover"
            />
          ) : (
            <div className="w-12 h-12 rounded-full bg-primary-600 flex items-center justify-center">
              <span className="text-white font-semibold text-sm">
                {getInitials(member.firstName, member.lastName)}
              </span>
            </div>
          )}
          <div>
            <h3 className="font-semibold text-gray-900 text-lg">
              {member.firstName} {member.lastName}
            </h3>
            <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getRoleColor(member.role)}`}>
              {member.role.charAt(0).toUpperCase() + member.role.slice(1)}
            </span>
          </div>
        </div>
        {member.membershipId && (
          <div className="text-xs text-gray-500 font-mono">
            #{member.membershipId}
          </div>
        )}
      </div>

      {/* Details */}
      <div className="space-y-2">
        {member.college && (
          <div className="flex items-center text-sm text-gray-600">
            <GraduationCap className="h-4 w-4 mr-2 text-gray-400" />
            <span className="truncate">{member.college}</span>
          </div>
        )}
        
        {member.branch && (
          <div className="flex items-center text-sm text-gray-600">
            <Building className="h-4 w-4 mr-2 text-gray-400" />
            <span className="truncate">{member.branch}</span>
          </div>
        )}
        
        {member.district && (
          <div className="flex items-center text-sm text-gray-600">
            <MapPin className="h-4 w-4 mr-2 text-gray-400" />
            <span className="truncate">{member.district}</span>
          </div>
        )}
        
        {member.joinedDate && (
          <div className="flex items-center text-sm text-gray-600">
            <Calendar className="h-4 w-4 mr-2 text-gray-400" />
            <span>Joined {formatJoinDate(member.joinedDate)}</span>
          </div>
        )}
      </div>

      {/* Bio */}
      {member.bio && (
        <div className="mt-3 pt-3 border-t border-gray-100">
          <p className="text-sm text-gray-600 line-clamp-2">
            {member.bio}
          </p>
        </div>
      )}

      {/* Footer */}
      <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between">
        <div className="flex items-center text-sm text-gray-500">
          <Mail className="h-4 w-4 mr-1" />
          <span className="truncate">{member.email}</span>
        </div>
        <ExternalLink className="h-4 w-4 text-gray-400" />
      </div>
    </div>
  );
};

export default MemberCard;
