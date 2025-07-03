import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  BookOpen,
  Calendar,
  Users,
  Award,
  Bell,
  TrendingUp,
  Clock,
  MapPin,
  Download,
  ExternalLink,
  ChevronRight,
  GraduationCap,
  Briefcase,
  Star,
  Target,
  MessageCircle,
  FileText,
  Video,
  User,
  Send,
  Phone,
  Settings,
  Activity,
  Heart,
  Gift,
  Share2,
  CheckCircle,
  DollarSign
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useNotifications } from '../contexts/NotificationContext';
import { useChat } from '../contexts/ChatContext';

const StudentPortalPage = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [newMessage, setNewMessage] = useState('');
  const [selectedChat, setSelectedChat] = useState(null);

  const { user } = useAuth();
  const { notifications, unreadCount, markAsRead } = useNotifications();
  const { chats, activeChat, sendMessage, setActiveChat, getUnreadCount } = useChat();

  // Mock student data
  const studentData = {
    name: 'Rahul Soren',
    college: 'IIEST Shibpur',
    branch: 'Computer Science Engineering',
    year: '3rd Year',
    membershipId: 'SESWA2024001',
    joinDate: '2022-08-15',
    profileImage: null
  };

  // Mock dashboard data
  const upcomingEvents = [
    {
      id: 1,
      title: 'SESWA Annual Picnic 2025',
      date: '2025-01-26',
      time: '10:00 AM',
      location: 'Eco Park, New Town',
      type: 'Community Event',
      registered: true
    },
    {
      id: 2,
      title: 'Technical Workshop: React.js',
      date: '2025-01-15',
      time: '2:00 PM',
      location: 'Online',
      type: 'Workshop',
      registered: false
    },
    {
      id: 3,
      title: 'WBJEE Counselling Session',
      date: '2025-01-20',
      time: '11:00 AM',
      location: 'Community Hall',
      type: 'Academic',
      registered: true
    }
  ];

  const recentResources = [
    {
      id: 1,
      title: 'Data Structures and Algorithms Notes',
      type: 'Study Material',
      subject: 'Computer Science',
      downloads: 245,
      rating: 4.8
    },
    {
      id: 2,
      title: 'Software Engineer Internship at Microsoft',
      type: 'Job Opportunity',
      company: 'Microsoft',
      deadline: '2025-02-15',
      applied: false
    },
    {
      id: 3,
      title: 'SC/ST Scholarship Application Guide',
      type: 'Scholarship',
      amount: '₹50,000',
      deadline: '2025-01-31',
      applied: true
    }
  ];

  const mockNotifications = [
    {
      id: 1,
      title: 'Registration Reminder',
      message: 'Annual Picnic registration closes in 3 days',
      type: 'reminder',
      time: '2 hours ago',
      read: false
    },
    {
      id: 2,
      title: 'New Resource Added',
      message: 'Machine Learning study materials uploaded',
      type: 'update',
      time: '1 day ago',
      read: false
    },
    {
      id: 3,
      title: 'Event Update',
      message: 'Technical workshop venue changed to online',
      type: 'update',
      time: '2 days ago',
      read: true
    }
  ];

  // My Events Data
  const myEvents = [
    {
      id: 1,
      name: 'SESWA Annual Picnic 2025',
      date: '2025-01-26',
      time: '10:00 AM',
      location: 'Eco Park, New Town, Kolkata',
      status: 'registered',
      type: 'community',
      description: 'Annual community gathering with cultural programs, games, and traditional food.',
      registrationDate: '2024-12-01',
      capacity: 200,
      registered: 156,
      price: '₹500',
      organizer: 'SESWA Executive Committee',
      agenda: [
        '10:00 AM - Registration & Welcome',
        '11:00 AM - Cultural Programs',
        '1:00 PM - Traditional Lunch',
        '3:00 PM - Games & Activities',
        '5:00 PM - Closing Ceremony'
      ],
      requirements: ['Valid ID', 'Registration Confirmation', 'Comfortable Clothing'],
      image: '/api/placeholder/400/200'
    },
    {
      id: 2,
      name: 'Technical Workshop: React & Node.js',
      date: '2025-02-15',
      time: '2:00 PM',
      location: 'Online (Zoom)',
      status: 'registered',
      type: 'educational',
      description: 'Hands-on workshop covering modern web development with React and Node.js.',
      registrationDate: '2024-11-28',
      capacity: 50,
      registered: 42,
      price: 'Free',
      organizer: 'Alumni Tech Committee',
      agenda: [
        '2:00 PM - Introduction to React',
        '3:00 PM - Building Components',
        '4:00 PM - Node.js Backend',
        '5:00 PM - Full Stack Integration',
        '6:00 PM - Q&A Session'
      ],
      requirements: ['Laptop with Node.js installed', 'Basic JavaScript knowledge', 'Stable internet connection'],
      image: '/api/placeholder/400/200'
    },
    {
      id: 3,
      name: 'Sohrai Festival Celebration',
      date: '2025-01-30',
      time: '6:00 PM',
      location: 'Cultural Center, Howrah',
      status: 'interested',
      type: 'cultural',
      description: 'Traditional Santal harvest festival celebration with dance, music, and cultural performances.',
      registrationDate: null,
      capacity: 150,
      registered: 89,
      price: '₹200',
      organizer: 'Cultural Committee',
      agenda: [
        '6:00 PM - Traditional Welcome',
        '6:30 PM - Sohrai Dance Performance',
        '7:30 PM - Traditional Music',
        '8:30 PM - Community Feast',
        '9:30 PM - Cultural Exchange'
      ],
      requirements: ['Traditional attire encouraged', 'Registration required', 'Cultural participation welcome'],
      image: '/api/placeholder/400/200'
    },
    {
      id: 4,
      name: 'Career Guidance Session',
      date: '2025-02-20',
      time: '4:00 PM',
      location: 'IIEST Shibpur Campus',
      status: 'waitlist',
      type: 'professional',
      description: 'Career guidance session with industry experts and successful alumni.',
      registrationDate: '2024-12-05',
      capacity: 100,
      registered: 100,
      price: 'Free',
      organizer: 'Alumni Professional Network',
      agenda: [
        '4:00 PM - Industry Overview',
        '4:30 PM - Resume Building',
        '5:00 PM - Interview Preparation',
        '5:30 PM - Networking Session',
        '6:00 PM - One-on-One Mentoring'
      ],
      requirements: ['Resume (optional)', 'Notebook for notes', 'Professional attire'],
      image: '/api/placeholder/400/200'
    },
    {
      id: 5,
      name: 'Alumni Meet & Greet',
      date: '2025-03-10',
      time: '11:00 AM',
      location: 'Hotel Hindusthan International, Kolkata',
      status: 'not_registered',
      type: 'networking',
      description: 'Annual alumni gathering for networking, sharing experiences, and building connections.',
      registrationDate: null,
      capacity: 300,
      registered: 145,
      price: '₹1000',
      organizer: 'Alumni Association',
      agenda: [
        '11:00 AM - Registration & Welcome',
        '12:00 PM - Alumni Success Stories',
        '1:00 PM - Networking Lunch',
        '3:00 PM - Panel Discussions',
        '5:00 PM - Cultural Program',
        '7:00 PM - Dinner & Closing'
      ],
      requirements: ['Formal attire', 'Alumni ID or student ID', 'Registration confirmation'],
      image: '/api/placeholder/400/200'
    }
  ];

  const eventStats = [
    { label: 'Registered Events', value: myEvents.filter(e => e.status === 'registered').length, color: 'text-green-600' },
    { label: 'Upcoming Events', value: myEvents.filter(e => new Date(e.date) > new Date()).length, color: 'text-blue-600' },
    { label: 'Interested Events', value: myEvents.filter(e => e.status === 'interested').length, color: 'text-yellow-600' },
    { label: 'Total Available', value: myEvents.length, color: 'text-purple-600' }
  ];

  const quickStats = [
    { icon: Calendar, label: 'Events Attended', value: '12', color: 'text-blue-600' },
    { icon: BookOpen, label: 'Resources Downloaded', value: '28', color: 'text-green-600' },
    { icon: Award, label: 'Certificates Earned', value: '5', color: 'text-purple-600' },
    { icon: Users, label: 'Network Connections', value: '45', color: 'text-orange-600' }
  ];



  const mentorshipStatus = {
    hasMentor: true,
    mentorName: 'Dr. Priya Murmu',
    mentorCompany: 'Tesla',
    nextSession: '2025-01-18',
    sessionsCompleted: 8
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getEventTypeColor = (type) => {
    switch (type) {
      case 'Community Event': return 'bg-blue-100 text-blue-800';
      case 'Workshop': return 'bg-green-100 text-green-800';
      case 'Academic': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-gradient-to-br from-primary-400 to-primary-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-xl">
                  {studentData.name.split(' ').map(n => n[0]).join('')}
                </span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Welcome back, {studentData.name.split(' ')[0]}!
                </h1>
                <p className="text-gray-600">
                  {studentData.year} • {studentData.branch} • {studentData.college}
                </p>
                <p className="text-sm text-gray-500">
                  Member ID: {studentData.membershipId}
                </p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-500">Member since</div>
              <div className="font-semibold text-gray-900">{formatDate(studentData.joinDate)}</div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white rounded-lg shadow-md mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6 overflow-x-auto">
              {[
                { id: 'dashboard', name: 'Dashboard', icon: TrendingUp },
                { id: 'events', name: 'My Events', icon: Calendar },
                { id: 'chat', name: 'Chat', icon: MessageCircle, badge: getUnreadCount() },
                { id: 'resources', name: 'Resources', icon: BookOpen },
                { id: 'mentorship', name: 'Mentorship', icon: Users },
                { id: 'cultural', name: 'Cultural', icon: Heart }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center py-4 px-1 border-b-2 font-medium text-sm relative ${
                    activeTab === tab.id
                      ? 'border-primary-500 text-primary-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <tab.icon className="h-4 w-4 mr-2" />
                  {tab.name}
                  {tab.badge > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {tab.badge > 9 ? '9+' : tab.badge}
                    </span>
                  )}
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
              {quickStats.map((stat, index) => (
                <div key={index} className="bg-white rounded-lg shadow-md p-6 text-center">
                  <stat.icon className={`h-8 w-8 mx-auto mb-3 ${stat.color}`} />
                  <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Upcoming Events */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-gray-900">Upcoming Events</h2>
                  <Link to="/events" className="text-primary-600 hover:text-primary-700 text-sm font-medium">
                    View All
                  </Link>
                </div>
                <div className="space-y-4">
                  {upcomingEvents.slice(0, 3).map((event) => (
                    <div key={event.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900 mb-1">{event.title}</h3>
                          <div className="flex items-center text-sm text-gray-600 space-x-4 mb-2">
                            <div className="flex items-center">
                              <Calendar className="h-4 w-4 mr-1" />
                              <span>{formatDate(event.date)}</span>
                            </div>
                            <div className="flex items-center">
                              <Clock className="h-4 w-4 mr-1" />
                              <span>{event.time}</span>
                            </div>
                          </div>
                          <div className="flex items-center text-sm text-gray-600 mb-2">
                            <MapPin className="h-4 w-4 mr-1" />
                            <span>{event.location}</span>
                          </div>
                          <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getEventTypeColor(event.type)}`}>
                            {event.type}
                          </span>
                        </div>
                        <div className="ml-4">
                          {event.registered ? (
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                              Registered
                            </span>
                          ) : (
                            <button className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary-100 text-primary-800 hover:bg-primary-200">
                              Register
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent Resources */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-gray-900">Recent Resources</h2>
                  <Link to="/resources" className="text-primary-600 hover:text-primary-700 text-sm font-medium">
                    View All
                  </Link>
                </div>
                <div className="space-y-4">
                  {recentResources.map((resource) => (
                    <div key={resource.id} className="border border-gray-200 rounded-lg p-4">
                      <h3 className="font-semibold text-gray-900 mb-2">{resource.title}</h3>
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="inline-block px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 mb-2">
                            {resource.type}
                          </span>
                          {resource.subject && (
                            <p className="text-sm text-gray-600">Subject: {resource.subject}</p>
                          )}
                          {resource.company && (
                            <p className="text-sm text-gray-600">Company: {resource.company}</p>
                          )}
                          {resource.downloads && (
                            <div className="flex items-center text-sm text-gray-600">
                              <Download className="h-3 w-3 mr-1" />
                              <span>{resource.downloads} downloads</span>
                              {resource.rating && (
                                <>
                                  <Star className="h-3 w-3 ml-2 mr-1 text-yellow-500" />
                                  <span>{resource.rating}</span>
                                </>
                              )}
                            </div>
                          )}
                        </div>
                        <button className="text-primary-600 hover:text-primary-700">
                          <ExternalLink className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Notifications */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">Recent Notifications</h2>
                <Link to="/notifications" className="text-primary-600 hover:text-primary-700 text-sm font-medium">
                  View All
                </Link>
              </div>
              <div className="space-y-3">
                {mockNotifications.slice(0, 3).map((notification) => (
                  <div key={notification.id} className={`p-4 rounded-lg border ${notification.read ? 'bg-gray-50 border-gray-200' : 'bg-blue-50 border-blue-200'}`}>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">{notification.title}</h4>
                        <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                      </div>
                      <div className="text-xs text-gray-500 ml-4">{notification.time}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Chat Tab */}
        {activeTab === 'chat' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Chat List */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Messages</h2>
              <div className="space-y-3">
                {chats.map((chat) => {
                  const unreadMessages = chat.messages?.filter(msg =>
                    msg.senderId !== user.id && !msg.read
                  ) || [];

                  return (
                    <div
                      key={chat.id}
                      onClick={() => setActiveChat(chat.id)}
                      className={`p-4 rounded-lg cursor-pointer transition-colors duration-200 ${
                        activeChat?.id === chat.id ? 'bg-primary-50 border border-primary-200' : 'bg-gray-50 hover:bg-gray-100'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900">{chat.name}</h3>
                          {chat.lastMessage && (
                            <p className="text-sm text-gray-600 truncate">
                              {chat.lastMessage.content}
                            </p>
                          )}
                        </div>
                        <div className="text-right">
                          {chat.lastMessage && (
                            <p className="text-xs text-gray-500">
                              {new Date(chat.lastMessage.timestamp).toLocaleTimeString([], {
                                hour: '2-digit',
                                minute: '2-digit'
                              })}
                            </p>
                          )}
                          {unreadMessages.length > 0 && (
                            <span className="inline-block bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center mt-1">
                              {unreadMessages.length}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Chat Window */}
            <div className="lg:col-span-2 bg-white rounded-lg shadow-md flex flex-col h-96">
              {activeChat ? (
                <>
                  {/* Chat Header */}
                  <div className="p-4 border-b border-gray-200">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-gray-900">{activeChat.name}</h3>
                      <div className="flex items-center space-x-2">
                        <button className="p-2 text-gray-500 hover:text-gray-700 rounded-lg hover:bg-gray-100">
                          <Phone className="h-4 w-4" />
                        </button>
                        <button className="p-2 text-gray-500 hover:text-gray-700 rounded-lg hover:bg-gray-100">
                          <Video className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Messages */}
                  <div className="flex-1 p-4 overflow-y-auto">
                    <div className="space-y-4">
                      {activeChat.messages?.map((message) => (
                        <div
                          key={message.id}
                          className={`flex ${message.senderId === user.id ? 'justify-end' : 'justify-start'}`}
                        >
                          <div
                            className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                              message.senderId === user.id
                                ? 'bg-primary-600 text-white'
                                : 'bg-gray-200 text-gray-900'
                            }`}
                          >
                            <p className="text-sm">{message.content}</p>
                            <p className={`text-xs mt-1 ${
                              message.senderId === user.id ? 'text-primary-200' : 'text-gray-500'
                            }`}>
                              {new Date(message.timestamp).toLocaleTimeString([], {
                                hour: '2-digit',
                                minute: '2-digit'
                              })}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Message Input */}
                  <div className="p-4 border-t border-gray-200">
                    <div className="flex items-center space-x-2">
                      <input
                        type="text"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyPress={(e) => {
                          if (e.key === 'Enter' && newMessage.trim()) {
                            sendMessage(activeChat.id, newMessage.trim());
                            setNewMessage('');
                          }
                        }}
                        placeholder="Type a message..."
                        className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
                      />
                      <button
                        onClick={() => {
                          if (newMessage.trim()) {
                            sendMessage(activeChat.id, newMessage.trim());
                            setNewMessage('');
                          }
                        }}
                        className="bg-primary-600 hover:bg-primary-700 text-white p-2 rounded-lg transition-colors duration-200"
                      >
                        <Send className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                <div className="flex-1 flex items-center justify-center">
                  <div className="text-center text-gray-500">
                    <MessageCircle className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>Select a chat to start messaging</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* My Events Tab */}
        {activeTab === 'events' && (
          <div className="space-y-8">
            {/* Event Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {eventStats.map((stat, index) => (
                <div key={index} className="bg-white rounded-lg shadow-md p-6 text-center">
                  <div className={`text-2xl font-bold ${stat.color} mb-1`}>{stat.value}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Event Filters */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <h2 className="text-xl font-bold text-gray-900">My Events</h2>
                <div className="flex items-center space-x-4">
                  <select className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500">
                    <option value="all">All Events</option>
                    <option value="registered">Registered</option>
                    <option value="interested">Interested</option>
                    <option value="upcoming">Upcoming</option>
                  </select>
                  <select className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500">
                    <option value="all">All Types</option>
                    <option value="community">Community</option>
                    <option value="educational">Educational</option>
                    <option value="cultural">Cultural</option>
                    <option value="professional">Professional</option>
                    <option value="networking">Networking</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Events List */}
            <div className="space-y-6">
              {myEvents.map((event) => (
                <div key={event.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                  <div className="md:flex">
                    {/* Event Image */}
                    <div className="md:w-1/3">
                      <div className="h-48 md:h-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center">
                        <Calendar className="h-16 w-16 text-white opacity-80" />
                      </div>
                    </div>

                    {/* Event Details */}
                    <div className="md:w-2/3 p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <h3 className="text-xl font-bold text-gray-900">{event.name}</h3>
                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                              event.status === 'registered' ? 'bg-green-100 text-green-800' :
                              event.status === 'interested' ? 'bg-yellow-100 text-yellow-800' :
                              event.status === 'waitlist' ? 'bg-orange-100 text-orange-800' :
                              'bg-gray-100 text-gray-800'
                            }`}>
                              {event.status === 'registered' ? 'Registered' :
                               event.status === 'interested' ? 'Interested' :
                               event.status === 'waitlist' ? 'Waitlist' :
                               'Available'}
                            </span>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              event.type === 'community' ? 'bg-blue-100 text-blue-800' :
                              event.type === 'educational' ? 'bg-purple-100 text-purple-800' :
                              event.type === 'cultural' ? 'bg-orange-100 text-orange-800' :
                              event.type === 'professional' ? 'bg-green-100 text-green-800' :
                              'bg-gray-100 text-gray-800'
                            }`}>
                              {event.type}
                            </span>
                          </div>
                          <p className="text-gray-600 mb-4">{event.description}</p>

                          {/* Event Info */}
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600 mb-4">
                            <div className="flex items-center">
                              <Calendar className="h-4 w-4 mr-2 text-primary-600" />
                              <span>{new Date(event.date).toLocaleDateString()} at {event.time}</span>
                            </div>
                            <div className="flex items-center">
                              <MapPin className="h-4 w-4 mr-2 text-primary-600" />
                              <span>{event.location}</span>
                            </div>
                            <div className="flex items-center">
                              <Users className="h-4 w-4 mr-2 text-primary-600" />
                              <span>{event.registered}/{event.capacity} registered</span>
                            </div>
                            <div className="flex items-center">
                              <DollarSign className="h-4 w-4 mr-2 text-primary-600" />
                              <span>{event.price}</span>
                            </div>
                          </div>

                          {/* Registration Progress */}
                          <div className="mb-4">
                            <div className="flex items-center justify-between text-sm mb-2">
                              <span className="font-medium text-gray-700">Registration Progress</span>
                              <span className="text-gray-500">
                                {Math.round((event.registered / event.capacity) * 100)}% full
                              </span>
                            </div>
                            <div className="bg-gray-200 rounded-full h-2">
                              <div
                                className="bg-primary-600 h-2 rounded-full"
                                style={{ width: `${(event.registered / event.capacity) * 100}%` }}
                              ></div>
                            </div>
                          </div>

                          {/* Action Buttons */}
                          <div className="flex items-center space-x-3">
                            {event.status === 'registered' ? (
                              <>
                                <button className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200">
                                  View Details
                                </button>
                                <button className="border border-red-600 text-red-600 hover:bg-red-50 font-medium py-2 px-4 rounded-lg transition-colors duration-200">
                                  Cancel Registration
                                </button>
                              </>
                            ) : event.status === 'interested' ? (
                              <>
                                <button className="bg-primary-600 hover:bg-primary-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200">
                                  Register Now
                                </button>
                                <button className="border border-gray-600 text-gray-600 hover:bg-gray-50 font-medium py-2 px-4 rounded-lg transition-colors duration-200">
                                  Remove Interest
                                </button>
                              </>
                            ) : event.status === 'waitlist' ? (
                              <>
                                <button className="bg-orange-600 hover:bg-orange-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200">
                                  View Waitlist Status
                                </button>
                                <button className="border border-gray-600 text-gray-600 hover:bg-gray-50 font-medium py-2 px-4 rounded-lg transition-colors duration-200">
                                  Leave Waitlist
                                </button>
                              </>
                            ) : (
                              <>
                                <button className="bg-primary-600 hover:bg-primary-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200">
                                  Register
                                </button>
                                <button className="border border-primary-600 text-primary-600 hover:bg-primary-50 font-medium py-2 px-4 rounded-lg transition-colors duration-200">
                                  Mark Interested
                                </button>
                              </>
                            )}
                            <button className="text-gray-600 hover:text-gray-800 p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200">
                              <Share2 className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Expandable Event Details */}
                  {event.status === 'registered' && (
                    <div className="border-t border-gray-200 bg-gray-50 p-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Agenda */}
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-3">Event Agenda</h4>
                          <ul className="space-y-2 text-sm text-gray-600">
                            {event.agenda.map((item, index) => (
                              <li key={index} className="flex items-start">
                                <Clock className="h-4 w-4 mr-2 mt-0.5 text-primary-600 flex-shrink-0" />
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Requirements */}
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-3">Requirements</h4>
                          <ul className="space-y-2 text-sm text-gray-600">
                            {event.requirements.map((req, index) => (
                              <li key={index} className="flex items-start">
                                <CheckCircle className="h-4 w-4 mr-2 mt-0.5 text-green-600 flex-shrink-0" />
                                <span>{req}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      <div className="mt-4 pt-4 border-t border-gray-200">
                        <p className="text-sm text-gray-600">
                          <strong>Organizer:</strong> {event.organizer}
                          {event.registrationDate && (
                            <span className="ml-4">
                              <strong>Registered on:</strong> {new Date(event.registrationDate).toLocaleDateString()}
                            </span>
                          )}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Cultural Tab */}
        {activeTab === 'cultural' && (
          <div className="space-y-8">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Cultural Programs</h2>

              {/* Cultural Program Registration Form */}
              <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-lg p-6 mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Register for Cultural Events</h3>
                <form className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Event Type
                      </label>
                      <select className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500">
                        <option>Santal Dance Performance</option>
                        <option>Traditional Music</option>
                        <option>Cultural Drama</option>
                        <option>Art Exhibition</option>
                        <option>Poetry Recitation</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Experience Level
                      </label>
                      <select className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500">
                        <option>Beginner</option>
                        <option>Intermediate</option>
                        <option>Advanced</option>
                        <option>Professional</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Special Requirements or Notes
                    </label>
                    <textarea
                      rows="3"
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
                      placeholder="Any special requirements, previous experience, or additional information..."
                    ></textarea>
                  </div>
                  <button
                    type="submit"
                    className="bg-orange-600 hover:bg-orange-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors duration-200"
                  >
                    Submit Registration
                  </button>
                </form>
              </div>

              {/* Upcoming Cultural Events */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Upcoming Cultural Events</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    {
                      name: 'Sohrai Festival Celebration',
                      date: '2025-01-30',
                      time: '6:00 PM',
                      location: 'Cultural Center',
                      description: 'Traditional harvest festival with dance, music, and cultural performances'
                    },
                    {
                      name: 'Baha Festival Program',
                      date: '2025-02-15',
                      time: '5:00 PM',
                      location: 'Community Hall',
                      description: 'Spring festival celebration with flower decorations and traditional rituals'
                    }
                  ].map((event, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-4">
                      <h4 className="font-semibold text-gray-900 mb-2">{event.name}</h4>
                      <div className="space-y-1 text-sm text-gray-600 mb-3">
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-2" />
                          <span>{new Date(event.date).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-2" />
                          <span>{event.time}</span>
                        </div>
                        <div className="flex items-center">
                          <MapPin className="h-4 w-4 mr-2" />
                          <span>{event.location}</span>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 mb-3">{event.description}</p>
                      <button className="bg-primary-600 hover:bg-primary-700 text-white text-sm font-medium py-2 px-4 rounded-lg transition-colors duration-200">
                        Register to Participate
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Mentorship Tab */}
        {activeTab === 'mentorship' && (
          <div className="space-y-8">
            {mentorshipStatus.hasMentor ? (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Your Mentor</h2>
                <div className="flex items-center space-x-4 mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-xl">
                      {mentorshipStatus.mentorName.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{mentorshipStatus.mentorName}</h3>
                    <p className="text-gray-600">{mentorshipStatus.mentorCompany}</p>
                    <p className="text-sm text-gray-500">{mentorshipStatus.sessionsCompleted} sessions completed</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-4 bg-green-50 rounded-lg">
                    <h4 className="font-semibold text-gray-900 mb-2">Next Session</h4>
                    <p className="text-green-700">{formatDate(mentorshipStatus.nextSession)}</p>
                  </div>
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <h4 className="font-semibold text-gray-900 mb-2">Quick Actions</h4>
                    <div className="space-y-2">
                      <button className="w-full text-left text-blue-700 hover:text-blue-800 text-sm">
                        <MessageCircle className="h-4 w-4 inline mr-2" />
                        Send Message
                      </button>
                      <button className="w-full text-left text-blue-700 hover:text-blue-800 text-sm">
                        <Calendar className="h-4 w-4 inline mr-2" />
                        Schedule Session
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-md p-6 text-center">
                <Users className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h2 className="text-xl font-bold text-gray-900 mb-2">Find a Mentor</h2>
                <p className="text-gray-600 mb-6">
                  Connect with experienced alumni for career guidance and professional development.
                </p>
                <Link
                  to="/mentorship"
                  className="inline-flex items-center bg-primary-600 hover:bg-primary-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
                >
                  Browse Mentors
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentPortalPage;
