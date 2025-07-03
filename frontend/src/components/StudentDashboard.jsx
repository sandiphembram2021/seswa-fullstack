import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Calendar, 
  BookOpen, 
  Award, 
  Users, 
  TrendingUp,
  Bell,
  ChevronRight,
  Clock,
  MapPin,
  Star,
  Download
} from 'lucide-react';

const StudentDashboard = ({ user }) => {
  // Mock data for student dashboard
  const dashboardData = {
    stats: [
      { icon: Calendar, label: 'Events Attended', value: '12', color: 'text-blue-600' },
      { icon: BookOpen, label: 'Resources Used', value: '28', color: 'text-green-600' },
      { icon: Award, label: 'Achievements', value: '5', color: 'text-purple-600' },
      { icon: Users, label: 'Connections', value: '45', color: 'text-orange-600' }
    ],
    upcomingEvents: [
      {
        id: 1,
        title: 'SESWA Annual Picnic 2025',
        date: '2025-01-26',
        time: '10:00 AM',
        location: 'Eco Park',
        registered: true
      },
      {
        id: 2,
        title: 'Technical Workshop',
        date: '2025-01-15',
        time: '2:00 PM',
        location: 'Online',
        registered: false
      }
    ],
    recentResources: [
      {
        id: 1,
        title: 'Data Structures Notes',
        type: 'Study Material',
        downloads: 245,
        rating: 4.8
      },
      {
        id: 2,
        title: 'Microsoft Internship',
        type: 'Job Opportunity',
        deadline: '2025-02-15',
        applied: false
      }
    ],
    notifications: [
      {
        id: 1,
        title: 'Registration Reminder',
        message: 'Annual Picnic registration closes in 3 days',
        time: '2 hours ago',
        unread: true
      },
      {
        id: 2,
        title: 'New Resource',
        message: 'ML study materials uploaded',
        time: '1 day ago',
        unread: true
      }
    ]
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-700 rounded-lg p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold mb-2">
              Welcome back, {user?.firstName || 'Student'}!
            </h2>
            <p className="text-primary-100">
              {user?.college || 'Engineering College'} • {user?.branch || 'Engineering'} • {user?.year || '3rd Year'}
            </p>
          </div>
          <div className="text-right">
            <div className="text-primary-200 text-sm">Member since</div>
            <div className="font-semibold">Aug 2022</div>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {dashboardData.stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md p-4 text-center">
            <stat.icon className={`h-6 w-6 mx-auto mb-2 ${stat.color}`} />
            <div className="text-xl font-bold text-gray-900">{stat.value}</div>
            <div className="text-xs text-gray-600">{stat.label}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Upcoming Events */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Upcoming Events</h3>
            <Link to="/student/portal" className="text-primary-600 hover:text-primary-700 text-sm">
              View All
            </Link>
          </div>
          <div className="space-y-3">
            {dashboardData.upcomingEvents.map((event) => (
              <div key={event.id} className="border border-gray-200 rounded-lg p-3">
                <h4 className="font-medium text-gray-900 text-sm mb-1">{event.title}</h4>
                <div className="flex items-center text-xs text-gray-600 space-x-3 mb-2">
                  <div className="flex items-center">
                    <Calendar className="h-3 w-3 mr-1" />
                    <span>{formatDate(event.date)}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-3 w-3 mr-1" />
                    <span>{event.time}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-xs text-gray-600">
                    <MapPin className="h-3 w-3 mr-1" />
                    <span>{event.location}</span>
                  </div>
                  {event.registered ? (
                    <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                      Registered
                    </span>
                  ) : (
                    <button className="px-2 py-1 bg-primary-100 text-primary-800 text-xs rounded-full hover:bg-primary-200">
                      Register
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Resources */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Recent Resources</h3>
            <Link to="/resources" className="text-primary-600 hover:text-primary-700 text-sm">
              View All
            </Link>
          </div>
          <div className="space-y-3">
            {dashboardData.recentResources.map((resource) => (
              <div key={resource.id} className="border border-gray-200 rounded-lg p-3">
                <h4 className="font-medium text-gray-900 text-sm mb-1">{resource.title}</h4>
                <span className="inline-block px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full mb-2">
                  {resource.type}
                </span>
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-xs text-gray-600">
                    {resource.downloads && (
                      <>
                        <Download className="h-3 w-3 mr-1" />
                        <span>{resource.downloads}</span>
                        {resource.rating && (
                          <>
                            <Star className="h-3 w-3 ml-2 mr-1 text-yellow-500" />
                            <span>{resource.rating}</span>
                          </>
                        )}
                      </>
                    )}
                    {resource.deadline && (
                      <span className="text-red-600">Due: {formatDate(resource.deadline)}</span>
                    )}
                  </div>
                  <button className="text-primary-600 hover:text-primary-700 text-xs">
                    View
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Notifications */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Recent Notifications</h3>
          <Link to="/student/portal" className="text-primary-600 hover:text-primary-700 text-sm">
            View All
          </Link>
        </div>
        <div className="space-y-3">
          {dashboardData.notifications.map((notification) => (
            <div key={notification.id} className={`p-3 rounded-lg ${notification.unread ? 'bg-blue-50 border border-blue-200' : 'bg-gray-50'}`}>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900 text-sm">{notification.title}</h4>
                  <p className="text-xs text-gray-600 mt-1">{notification.message}</p>
                </div>
                <div className="text-xs text-gray-500 ml-2">{notification.time}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <Link
            to="/events"
            className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200"
          >
            <Calendar className="h-6 w-6 text-blue-600 mb-2" />
            <span className="text-sm font-medium text-gray-900">Browse Events</span>
          </Link>
          <Link
            to="/resources"
            className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200"
          >
            <BookOpen className="h-6 w-6 text-green-600 mb-2" />
            <span className="text-sm font-medium text-gray-900">Study Materials</span>
          </Link>
          <Link
            to="/mentorship"
            className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200"
          >
            <Users className="h-6 w-6 text-purple-600 mb-2" />
            <span className="text-sm font-medium text-gray-900">Find Mentor</span>
          </Link>
          <Link
            to="/student/portal"
            className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200"
          >
            <TrendingUp className="h-6 w-6 text-orange-600 mb-2" />
            <span className="text-sm font-medium text-gray-900">Full Portal</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
