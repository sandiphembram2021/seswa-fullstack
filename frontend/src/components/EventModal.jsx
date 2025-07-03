import React, { useState } from 'react';
import { X, Calendar, Clock, MapPin, Users, IndianRupee, Globe, User, Building, CheckCircle, ExternalLink } from 'lucide-react';

const EventModal = ({ event, isOpen, onClose, onRegister, onCancelRegistration, registering }) => {
  if (!isOpen || !event) return null;

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatTime = (time) => {
    return time;
  };

  const getEventTypeColor = (type) => {
    switch (type) {
      case 'workshop':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'seminar':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'conference':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'cultural':
        return 'bg-pink-100 text-pink-800 border-pink-200';
      case 'competition':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const isUpcoming = new Date(event.startDate) > new Date();
  const isRegistrationOpen = event.registrationRequired && 
    (!event.registrationDeadline || new Date(event.registrationDeadline) > new Date()) &&
    (!event.maxParticipants || event.registrationCount < event.maxParticipants);

  const handleRegisterClick = () => {
    if (event.isRegistered) {
      onCancelRegistration(event._id);
    } else {
      onRegister(event._id);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-900">Event Details</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
          >
            <X className="h-5 w-5 text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Event Banner */}
          {event.banner ? (
            <img
              src={event.banner}
              alt={event.title}
              className="w-full h-64 object-cover rounded-lg mb-6"
            />
          ) : (
            <div className="w-full h-64 bg-gradient-to-br from-primary-500 to-primary-700 rounded-lg flex items-center justify-center mb-6">
              <div className="text-center text-white">
                <Calendar className="h-16 w-16 mx-auto mb-4" />
                <p className="text-xl font-semibold">{formatDate(event.startDate)}</p>
              </div>
            </div>
          )}

          {/* Event Header */}
          <div className="flex items-start justify-between mb-6">
            <div className="flex-1">
              <div className="flex flex-wrap gap-2 mb-3">
                <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getEventTypeColor(event.eventType)}`}>
                  {event.eventType.charAt(0).toUpperCase() + event.eventType.slice(1)}
                </span>
                <span className="px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800 border border-gray-200">
                  {event.category.charAt(0).toUpperCase() + event.category.slice(1)}
                </span>
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-3">{event.title}</h1>
              <p className="text-gray-600 leading-relaxed">{event.description}</p>
            </div>
            {event.isRegistered && (
              <div className="ml-4 flex items-center text-green-600">
                <CheckCircle className="h-6 w-6 mr-2" />
                <span className="font-medium">Registered</span>
              </div>
            )}
          </div>

          {/* Event Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {/* Date & Time */}
            <div className="space-y-4">
              <h3 className="font-semibold text-gray-900 text-lg">Date & Time</h3>
              <div className="space-y-3">
                <div className="flex items-center text-gray-600">
                  <Calendar className="h-5 w-5 mr-3 text-gray-400" />
                  <div>
                    <p className="font-medium">{formatDate(event.startDate)}</p>
                    {event.startDate !== event.endDate && (
                      <p className="text-sm">to {formatDate(event.endDate)}</p>
                    )}
                  </div>
                </div>
                <div className="flex items-center text-gray-600">
                  <Clock className="h-5 w-5 mr-3 text-gray-400" />
                  <span>{formatTime(event.startTime)} - {formatTime(event.endTime)}</span>
                </div>
              </div>
            </div>

            {/* Location */}
            <div className="space-y-4">
              <h3 className="font-semibold text-gray-900 text-lg">Location</h3>
              <div className="space-y-3">
                <div className="flex items-start text-gray-600">
                  {event.isOnline ? (
                    <>
                      <Globe className="h-5 w-5 mr-3 text-gray-400 mt-0.5" />
                      <div>
                        <p className="font-medium">Online Event</p>
                        {event.meetingLink && (
                          <a
                            href={event.meetingLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary-600 hover:text-primary-700 text-sm inline-flex items-center mt-1"
                          >
                            Join Meeting <ExternalLink className="h-3 w-3 ml-1" />
                          </a>
                        )}
                      </div>
                    </>
                  ) : (
                    <>
                      <MapPin className="h-5 w-5 mr-3 text-gray-400 mt-0.5" />
                      <div>
                        <p className="font-medium">{event.venue}</p>
                        {event.address && <p className="text-sm">{event.address}</p>}
                        {event.city && <p className="text-sm">{event.city}</p>}
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Registration Info */}
          {event.registrationRequired && (
            <div className="bg-gray-50 rounded-lg p-6 mb-6">
              <h3 className="font-semibold text-gray-900 text-lg mb-4">Registration Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center text-gray-600">
                  <Users className="h-5 w-5 mr-3 text-gray-400" />
                  <div>
                    <p className="font-medium">{event.registrationCount} registered</p>
                    {event.maxParticipants && (
                      <p className="text-sm">Max: {event.maxParticipants}</p>
                    )}
                  </div>
                </div>
                
                {event.registrationFee > 0 && (
                  <div className="flex items-center text-gray-600">
                    <IndianRupee className="h-5 w-5 mr-3 text-gray-400" />
                    <div>
                      <p className="font-medium">₹{event.registrationFee}</p>
                      <p className="text-sm">Registration Fee</p>
                    </div>
                  </div>
                )}
                
                {event.registrationDeadline && (
                  <div className="flex items-center text-gray-600">
                    <Calendar className="h-5 w-5 mr-3 text-gray-400" />
                    <div>
                      <p className="font-medium">
                        {new Date(event.registrationDeadline).toLocaleDateString()}
                      </p>
                      <p className="text-sm">Registration Deadline</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Speakers */}
          {event.speakers && event.speakers.length > 0 && (
            <div className="mb-6">
              <h3 className="font-semibold text-gray-900 text-lg mb-4">Speakers</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {event.speakers.map((speaker, index) => (
                  <div key={index} className="flex items-start space-x-3 p-4 bg-gray-50 rounded-lg">
                    <div className="w-12 h-12 bg-primary-600 rounded-full flex items-center justify-center">
                      <User className="h-6 w-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900">{speaker.name}</h4>
                      <p className="text-sm text-gray-600">{speaker.designation}</p>
                      {speaker.company && (
                        <p className="text-sm text-gray-500">{speaker.company}</p>
                      )}
                      {speaker.bio && (
                        <p className="text-sm text-gray-600 mt-2">{speaker.bio}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tags */}
          {event.tags && event.tags.length > 0 && (
            <div className="mb-6">
              <h3 className="font-semibold text-gray-900 text-lg mb-3">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {event.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-primary-100 text-primary-800 text-sm rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Organizer */}
          <div className="mb-6">
            <h3 className="font-semibold text-gray-900 text-lg mb-3">Organized by</h3>
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary-600 rounded-full flex items-center justify-center">
                <User className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="font-medium text-gray-900">
                  {event.organizer.firstName} {event.organizer.lastName}
                </p>
                <p className="text-sm text-gray-600">{event.organizer.email}</p>
              </div>
            </div>
          </div>
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
            
            {event.registrationRequired && isUpcoming && (
              <div className="flex space-x-3">
                {event.isRegistered ? (
                  <button
                    onClick={handleRegisterClick}
                    disabled={registering}
                    className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {registering ? 'Cancelling...' : 'Cancel Registration'}
                  </button>
                ) : isRegistrationOpen ? (
                  <button
                    onClick={handleRegisterClick}
                    disabled={registering}
                    className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {registering ? 'Registering...' : 'Register Now'}
                  </button>
                ) : (
                  <div className="px-6 py-2 bg-gray-300 text-gray-600 rounded-lg">
                    {event.maxParticipants && event.registrationCount >= event.maxParticipants
                      ? 'Event Full'
                      : 'Registration Closed'
                    }
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventModal;
