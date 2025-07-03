import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  TrendingUp,
  Users,
  Calendar,
  DollarSign,
  Bell,
  BarChart3,
  PieChart,
  Settings,
  Plus,
  Edit,
  Send,
  Eye,
  Download,
  Filter,
  Search,
  AlertCircle,
  CheckCircle,
  Clock,
  MapPin
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useNotifications } from '../contexts/NotificationContext';

const RepresentativePortalPage = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [newAnnouncement, setNewAnnouncement] = useState({
    title: '',
    message: '',
    type: 'general',
    priority: 'normal',
    targetAudience: 'all'
  });
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [dateFilter, setDateFilter] = useState('all');

  const { user } = useAuth();
  const { createEventNotification, createSystemNotification } = useNotifications();

  // Mock data for representative dashboard
  const dashboardStats = [
    { icon: Users, label: 'Total Students', value: '1,247', color: 'text-blue-600', change: '+12%' },
    { icon: Calendar, label: 'Active Events', value: '8', color: 'text-green-600', change: '+3' },
    { icon: DollarSign, label: 'Total Contributions', value: '₹2.8L', color: 'text-purple-600', change: '+25%' },
    { icon: Bell, label: 'Pending Approvals', value: '15', color: 'text-orange-600', change: '+5' }
  ];

  const events = [
    {
      id: 1,
      name: 'SESWA Annual Picnic 2025',
      date: '2025-01-26',
      location: 'Eco Park, New Town',
      registrations: 156,
      capacity: 200,
      contributions: 35000,
      target: 50000,
      status: 'active',
      description: 'Annual community gathering with cultural programs'
    },
    {
      id: 2,
      name: 'Technical Workshop Series',
      date: '2025-02-15',
      location: 'Online',
      registrations: 89,
      capacity: 100,
      contributions: 15000,
      target: 25000,
      status: 'active',
      description: 'Monthly technical skill development workshops'
    },
    {
      id: 3,
      name: 'Cultural Festival 2025',
      date: '2025-03-10',
      location: 'Community Hall',
      registrations: 45,
      capacity: 150,
      contributions: 8000,
      target: 30000,
      status: 'planning',
      description: 'Celebration of Santal culture and traditions'
    }
  ];

  const recentActivities = [
    {
      id: 1,
      type: 'registration',
      message: 'Rahul Soren registered for Annual Picnic 2025',
      timestamp: '2024-12-01T14:30:00Z',
      user: 'Rahul Soren',
      event: 'Annual Picnic 2025'
    },
    {
      id: 2,
      type: 'contribution',
      message: 'Priya Murmu contributed ₹5,000 to Student Scholarship Fund',
      timestamp: '2024-12-01T12:15:00Z',
      user: 'Priya Murmu',
      amount: 5000
    },
    {
      id: 3,
      type: 'approval',
      message: 'New alumni registration pending approval',
      timestamp: '2024-12-01T10:45:00Z',
      user: 'Dr. Anjali Hansda',
      status: 'pending'
    }
  ];

  const contributionTrends = [
    { month: 'Aug', amount: 45000 },
    { month: 'Sep', amount: 52000 },
    { month: 'Oct', amount: 38000 },
    { month: 'Nov', amount: 67000 },
    { month: 'Dec', amount: 89000 }
  ];

  const eventParticipation = [
    { event: 'Annual Picnic', students: 156, alumni: 45, representatives: 8 },
    { event: 'Tech Workshop', students: 89, alumni: 23, representatives: 5 },
    { event: 'Cultural Festival', students: 45, alumni: 12, representatives: 3 }
  ];

  const handleSendAnnouncement = (e) => {
    e.preventDefault();
    console.log('Sending announcement:', newAnnouncement);
    
    // Create notification based on announcement
    if (newAnnouncement.type === 'event') {
      createEventNotification(
        newAnnouncement.title,
        newAnnouncement.message,
        'general',
        newAnnouncement.priority
      );
    } else {
      createSystemNotification(
        newAnnouncement.title,
        newAnnouncement.message,
        newAnnouncement.priority
      );
    }
    
    setNewAnnouncement({
      title: '',
      message: '',
      type: 'general',
      priority: 'normal',
      targetAudience: 'all'
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'planning': return 'bg-yellow-100 text-yellow-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getActivityIcon = (type) => {
    switch (type) {
      case 'registration': return <Users className="h-4 w-4 text-blue-500" />;
      case 'contribution': return <DollarSign className="h-4 w-4 text-green-500" />;
      case 'approval': return <AlertCircle className="h-4 w-4 text-orange-500" />;
      default: return <Bell className="h-4 w-4 text-gray-500" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-xl">
                  {user?.firstName?.[0]}{user?.lastName?.[0]}
                </span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Welcome, {user?.firstName}!
                </h1>
                <p className="text-gray-600">
                  College Representative • {user?.college || 'IIEST Shibpur'} • {user?.department || 'Computer Science'}
                </p>
                <p className="text-sm text-gray-500">
                  Managing SESWA community operations
                </p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-500">Active since</div>
              <div className="font-semibold text-gray-900">2022</div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white rounded-lg shadow-md mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6 overflow-x-auto">
              {[
                { id: 'dashboard', name: 'Dashboard', icon: TrendingUp },
                { id: 'events', name: 'Event Management', icon: Calendar },
                { id: 'analytics', name: 'Analytics', icon: BarChart3 },
                { id: 'announcements', name: 'Announcements', icon: Bell },
                { id: 'approvals', name: 'Approvals', icon: CheckCircle },
                { id: 'settings', name: 'Settings', icon: Settings }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab.id
                      ? 'border-primary-500 text-primary-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <tab.icon className="h-4 w-4 mr-2" />
                  {tab.name}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Dashboard Tab */}
        {activeTab === 'dashboard' && (
          <div className="space-y-8">
            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {dashboardStats.map((stat, index) => (
                <div key={index} className="bg-white rounded-lg shadow-md p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                      <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                      <p className={`text-sm ${stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                        {stat.change} from last month
                      </p>
                    </div>
                    <stat.icon className={`h-8 w-8 ${stat.color}`} />
                  </div>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Recent Activities */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Recent Activities</h2>
                <div className="space-y-4">
                  {recentActivities.map((activity) => (
                    <div key={activity.id} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                      <div className="flex-shrink-0 mt-1">
                        {getActivityIcon(activity.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-gray-900">{activity.message}</p>
                        <p className="text-xs text-gray-500 mt-1">
                          {new Date(activity.timestamp).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Quick Actions</h2>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    onClick={() => setActiveTab('announcements')}
                    className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                  >
                    <Bell className="h-8 w-8 text-blue-600 mb-2" />
                    <span className="text-sm font-medium text-gray-900">Send Announcement</span>
                  </button>
                  <button
                    onClick={() => setActiveTab('events')}
                    className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                  >
                    <Calendar className="h-8 w-8 text-green-600 mb-2" />
                    <span className="text-sm font-medium text-gray-900">Manage Events</span>
                  </button>
                  <button
                    onClick={() => setActiveTab('analytics')}
                    className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                  >
                    <BarChart3 className="h-8 w-8 text-purple-600 mb-2" />
                    <span className="text-sm font-medium text-gray-900">View Analytics</span>
                  </button>
                  <button
                    onClick={() => setActiveTab('approvals')}
                    className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                  >
                    <CheckCircle className="h-8 w-8 text-orange-600 mb-2" />
                    <span className="text-sm font-medium text-gray-900">Review Approvals</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Events Tab */}
        {activeTab === 'events' && (
          <div className="space-y-8">
            {/* Event Overview */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">Event Management</h2>
                <button className="bg-primary-600 hover:bg-primary-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200 flex items-center">
                  <Plus className="h-4 w-4 mr-2" />
                  Create Event
                </button>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {events.map((event) => (
                  <div key={event.id} className="border border-gray-200 rounded-lg p-6">
                    <div className="flex items-start justify-between mb-4">
                      <h3 className="text-lg font-semibold text-gray-900">{event.name}</h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(event.status)}`}>
                        {event.status}
                      </span>
                    </div>
                    
                    <p className="text-gray-600 text-sm mb-4">{event.description}</p>
                    
                    <div className="space-y-3 text-sm">
                      <div className="flex items-center text-gray-600">
                        <Calendar className="h-4 w-4 mr-2" />
                        <span>{new Date(event.date).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <MapPin className="h-4 w-4 mr-2" />
                        <span>{event.location}</span>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <Users className="h-4 w-4 mr-2" />
                        <span>{event.registrations}/{event.capacity} registered</span>
                      </div>
                    </div>
                    
                    {/* Registration Progress */}
                    <div className="mt-4">
                      <div className="flex items-center justify-between text-sm mb-2">
                        <span className="font-medium text-gray-700">Registration Progress</span>
                        <span className="text-gray-500">
                          {Math.round((event.registrations / event.capacity) * 100)}%
                        </span>
                      </div>
                      <div className="bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full" 
                          style={{ width: `${(event.registrations / event.capacity) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                    
                    {/* Contribution Progress */}
                    <div className="mt-4">
                      <div className="flex items-center justify-between text-sm mb-2">
                        <span className="font-medium text-gray-700">Funding Progress</span>
                        <span className="text-gray-500">
                          ₹{event.contributions.toLocaleString()}/₹{event.target.toLocaleString()}
                        </span>
                      </div>
                      <div className="bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-green-600 h-2 rounded-full" 
                          style={{ width: `${(event.contributions / event.target) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                    
                    <div className="mt-6 flex items-center space-x-2">
                      <button className="flex-1 bg-primary-600 hover:bg-primary-700 text-white text-sm font-medium py-2 px-3 rounded-lg transition-colors duration-200">
                        <Eye className="h-4 w-4 inline mr-1" />
                        View Details
                      </button>
                      <button className="bg-gray-600 hover:bg-gray-700 text-white p-2 rounded-lg transition-colors duration-200">
                        <Edit className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Analytics Tab */}
        {activeTab === 'analytics' && (
          <div className="space-y-8">
            {/* Analytics Overview */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Contribution Trends */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Contribution Trends</h2>
                <div className="space-y-4">
                  {contributionTrends.map((trend, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-700">{trend.month}</span>
                      <div className="flex items-center space-x-3">
                        <div className="w-32 bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-purple-600 h-2 rounded-full"
                            style={{ width: `${(trend.amount / 100000) * 100}%` }}
                          ></div>
                        </div>
                        <span className="text-sm text-gray-600 w-16 text-right">
                          ₹{(trend.amount / 1000).toFixed(0)}K
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-6 p-4 bg-purple-50 rounded-lg">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-purple-900">Total (5 months)</span>
                    <span className="font-bold text-purple-900">
                      ₹{contributionTrends.reduce((sum, t) => sum + t.amount, 0).toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>

              {/* Event Participation */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Event Participation</h2>
                <div className="space-y-4">
                  {eventParticipation.map((event, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-4">
                      <h3 className="font-semibold text-gray-900 mb-3">{event.event}</h3>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-blue-600">Students</span>
                          <span className="font-medium">{event.students}</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-green-600">Alumni</span>
                          <span className="font-medium">{event.alumni}</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-purple-600">Representatives</span>
                          <span className="font-medium">{event.representatives}</span>
                        </div>
                        <div className="pt-2 border-t border-gray-200">
                          <div className="flex items-center justify-between text-sm font-semibold">
                            <span>Total</span>
                            <span>{event.students + event.alumni + event.representatives}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Detailed Analytics */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Detailed Analytics</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center p-6 bg-blue-50 rounded-lg">
                  <div className="text-3xl font-bold text-blue-600 mb-2">78%</div>
                  <div className="text-sm text-blue-800">Average Event Attendance</div>
                </div>
                <div className="text-center p-6 bg-green-50 rounded-lg">
                  <div className="text-3xl font-bold text-green-600 mb-2">₹2.8L</div>
                  <div className="text-sm text-green-800">Total Contributions</div>
                </div>
                <div className="text-center p-6 bg-purple-50 rounded-lg">
                  <div className="text-3xl font-bold text-purple-600 mb-2">4.7</div>
                  <div className="text-sm text-purple-800">Average Event Rating</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Announcements Tab */}
        {activeTab === 'announcements' && (
          <div className="space-y-8">
            {/* Send New Announcement */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Send Announcement</h2>
              <form onSubmit={handleSendAnnouncement} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Announcement Type
                    </label>
                    <select
                      value={newAnnouncement.type}
                      onChange={(e) => setNewAnnouncement({...newAnnouncement, type: e.target.value})}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
                    >
                      <option value="general">General</option>
                      <option value="event">Event</option>
                      <option value="academic">Academic</option>
                      <option value="emergency">Emergency</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Priority
                    </label>
                    <select
                      value={newAnnouncement.priority}
                      onChange={(e) => setNewAnnouncement({...newAnnouncement, priority: e.target.value})}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
                    >
                      <option value="low">Low</option>
                      <option value="normal">Normal</option>
                      <option value="high">High</option>
                      <option value="urgent">Urgent</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Target Audience
                  </label>
                  <select
                    value={newAnnouncement.targetAudience}
                    onChange={(e) => setNewAnnouncement({...newAnnouncement, targetAudience: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
                  >
                    <option value="all">All Members</option>
                    <option value="students">Students Only</option>
                    <option value="alumni">Alumni Only</option>
                    <option value="representatives">Representatives Only</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Title
                  </label>
                  <input
                    type="text"
                    value={newAnnouncement.title}
                    onChange={(e) => setNewAnnouncement({...newAnnouncement, title: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
                    placeholder="Enter announcement title..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Message
                  </label>
                  <textarea
                    rows="4"
                    value={newAnnouncement.message}
                    onChange={(e) => setNewAnnouncement({...newAnnouncement, message: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
                    placeholder="Enter your announcement message..."
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="bg-primary-600 hover:bg-primary-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors duration-200 flex items-center"
                >
                  <Send className="h-4 w-4 mr-2" />
                  Send Announcement
                </button>
              </form>
            </div>

            {/* Recent Announcements */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Recent Announcements</h2>
              <div className="space-y-4">
                {[
                  {
                    id: 1,
                    title: 'Annual Picnic Registration Extended',
                    message: 'Due to popular demand, we have extended the registration deadline for the Annual Picnic 2025.',
                    type: 'event',
                    priority: 'high',
                    sentAt: '2024-12-01T10:00:00Z',
                    recipients: 1247
                  },
                  {
                    id: 2,
                    title: 'New Scholarship Opportunities',
                    message: 'Several new scholarship opportunities are now available for eligible students.',
                    type: 'academic',
                    priority: 'normal',
                    sentAt: '2024-11-28T14:30:00Z',
                    recipients: 856
                  }
                ].map((announcement) => (
                  <div key={announcement.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-semibold text-gray-900">{announcement.title}</h3>
                      <div className="flex items-center space-x-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          announcement.priority === 'high' ? 'bg-red-100 text-red-800' :
                          announcement.priority === 'normal' ? 'bg-blue-100 text-blue-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {announcement.priority}
                        </span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          announcement.type === 'event' ? 'bg-green-100 text-green-800' :
                          announcement.type === 'academic' ? 'bg-purple-100 text-purple-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {announcement.type}
                        </span>
                      </div>
                    </div>
                    <p className="text-gray-600 text-sm mb-3">{announcement.message}</p>
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span>Sent to {announcement.recipients} members</span>
                      <span>{new Date(announcement.sentAt).toLocaleString()}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Approvals Tab */}
        {activeTab === 'approvals' && (
          <div className="space-y-8">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Pending Approvals</h2>
              <div className="space-y-4">
                {[
                  {
                    id: 1,
                    type: 'registration',
                    name: 'Dr. Anjali Hansda',
                    email: 'anjali.hansda@college.edu',
                    userType: 'college_representative',
                    college: 'IIEST Shibpur',
                    department: 'Computer Science',
                    submittedAt: '2024-12-01T09:00:00Z'
                  },
                  {
                    id: 2,
                    type: 'registration',
                    name: 'Suresh Murmu',
                    email: 'suresh.murmu@alumni.com',
                    userType: 'alumni',
                    college: 'NIT Durgapur',
                    graduationYear: '2018',
                    submittedAt: '2024-11-30T16:30:00Z'
                  }
                ].map((approval) => (
                  <div key={approval.id} className="border border-gray-200 rounded-lg p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 mb-2">{approval.name}</h3>
                        <div className="space-y-1 text-sm text-gray-600">
                          <p>Email: {approval.email}</p>
                          <p>Type: {approval.userType.replace('_', ' ')}</p>
                          <p>College: {approval.college}</p>
                          {approval.department && <p>Department: {approval.department}</p>}
                          {approval.graduationYear && <p>Graduation Year: {approval.graduationYear}</p>}
                          <p>Submitted: {new Date(approval.submittedAt).toLocaleString()}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200">
                          Approve
                        </button>
                        <button className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200">
                          Reject
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RepresentativePortalPage;
