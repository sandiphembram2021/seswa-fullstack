import React, { useState } from 'react';
import {
  Users,
  Video,
  Calendar,
  Clock,
  Star,
  MapPin,
  Briefcase,
  GraduationCap,
  MessageCircle,
  Phone,
  Mail,
  Award,
  BookOpen,
  Target,
  TrendingUp,
  X,
  Plus,
  Filter,
  Search
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useNotifications } from '../contexts/NotificationContext';
import VideoConference from './VideoConference';

const MentorshipProgram = ({ isOpen, onClose }) => {
  const { user } = useAuth();
  const { createSystemNotification } = useNotifications();
  
  const [activeTab, setActiveTab] = useState('browse');
  const [selectedMentor, setSelectedMentor] = useState(null);
  const [showVideoCall, setShowVideoCall] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterExpertise, setFilterExpertise] = useState('all');
  const [showBookingModal, setShowBookingModal] = useState(false);

  // Mock mentors data
  const mentors = [
    {
      id: 'mentor_1',
      name: 'Dr. Priya Hansda',
      title: 'Senior Software Engineer',
      company: 'Google',
      experience: '8 years',
      expertise: ['Software Engineering', 'Machine Learning', 'Career Development'],
      rating: 4.9,
      sessions: 156,
      location: 'Bangalore, India',
      college: 'IIEST Shibpur',
      graduationYear: '2015',
      bio: 'Passionate about helping students transition into tech careers. Specialized in software engineering and ML.',
      availability: 'Weekends',
      languages: ['English', 'Hindi', 'Bengali'],
      avatar: 'PH',
      isOnline: true,
      nextAvailable: '2024-12-15T10:00:00Z'
    },
    {
      id: 'mentor_2',
      name: 'Amit Soren',
      title: 'Product Manager',
      company: 'Microsoft',
      experience: '6 years',
      expertise: ['Product Management', 'Strategy', 'Leadership'],
      rating: 4.8,
      sessions: 89,
      location: 'Seattle, USA',
      college: 'NIT Durgapur',
      graduationYear: '2018',
      bio: 'Helping students understand product management and build leadership skills.',
      availability: 'Evenings IST',
      languages: ['English', 'Hindi'],
      avatar: 'AS',
      isOnline: false,
      nextAvailable: '2024-12-16T14:00:00Z'
    },
    {
      id: 'mentor_3',
      name: 'Dr. Anjali Kisku',
      title: 'Data Scientist',
      company: 'Tesla',
      experience: '10 years',
      expertise: ['Data Science', 'AI/ML', 'Research'],
      rating: 4.9,
      sessions: 203,
      location: 'San Francisco, USA',
      college: 'IIT Kharagpur',
      graduationYear: '2014',
      bio: 'Research-focused data scientist with expertise in AI and machine learning applications.',
      availability: 'Flexible',
      languages: ['English', 'Hindi', 'Bengali'],
      avatar: 'AK',
      isOnline: true,
      nextAvailable: '2024-12-15T16:00:00Z'
    }
  ];

  // Mock user sessions
  const userSessions = [
    {
      id: 'session_1',
      mentorId: 'mentor_1',
      mentorName: 'Dr. Priya Hansda',
      topic: 'Career Transition to Tech',
      scheduledTime: '2024-12-15T10:00:00Z',
      duration: 60,
      status: 'upcoming',
      type: 'video',
      notes: 'Discuss software engineering career path and interview preparation'
    },
    {
      id: 'session_2',
      mentorId: 'mentor_3',
      mentorName: 'Dr. Anjali Kisku',
      topic: 'Data Science Projects',
      scheduledTime: '2024-12-10T15:00:00Z',
      duration: 45,
      status: 'completed',
      type: 'video',
      notes: 'Portfolio review and project recommendations',
      rating: 5,
      feedback: 'Excellent session! Very helpful insights on building a strong data science portfolio.'
    }
  ];

  const filteredMentors = mentors.filter(mentor => {
    const matchesSearch = mentor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         mentor.expertise.some(exp => exp.toLowerCase().includes(searchTerm.toLowerCase())) ||
                         mentor.company.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = filterExpertise === 'all' || 
                         mentor.expertise.some(exp => exp.toLowerCase().includes(filterExpertise.toLowerCase()));
    
    return matchesSearch && matchesFilter;
  });

  const handleBookSession = (mentor) => {
    setSelectedMentor(mentor);
    setShowBookingModal(true);
  };

  const handleStartVideoCall = (mentor) => {
    setSelectedMentor(mentor);
    setShowVideoCall(true);
    createSystemNotification(
      'Video Call Starting',
      `Connecting to ${mentor.name} for mentorship session`,
      'normal'
    );
  };

  const confirmBooking = () => {
    createSystemNotification(
      'Session Booked',
      `Your mentorship session with ${selectedMentor.name} has been scheduled`,
      'high'
    );
    setShowBookingModal(false);
    setSelectedMentor(null);
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg shadow-xl w-full max-w-6xl h-[90vh] mx-4 overflow-hidden flex flex-col">
          {/* Header */}
          <div className="bg-gradient-to-r from-primary-600 to-primary-700 text-white p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Users className="h-6 w-6 mr-3" />
                <div>
                  <h2 className="text-2xl font-bold">Mentorship Program</h2>
                  <p className="text-primary-100">Connect with experienced alumni for career guidance</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="bg-white bg-opacity-20 hover:bg-opacity-30 text-white p-2 rounded-lg transition-colors duration-200"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="bg-gray-50 border-b border-gray-200 px-6">
            <nav className="flex space-x-8">
              {[
                { id: 'browse', name: 'Browse Mentors', icon: Search },
                { id: 'sessions', name: 'My Sessions', icon: Calendar },
                { id: 'progress', name: 'Progress', icon: TrendingUp }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
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

          {/* Content */}
          <div className="flex-1 overflow-hidden">
            {/* Browse Mentors Tab */}
            {activeTab === 'browse' && (
              <div className="h-full flex flex-col">
                {/* Search and Filters */}
                <div className="p-6 border-b border-gray-200">
                  <div className="flex items-center space-x-4">
                    <div className="flex-1 relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                      <input
                        type="text"
                        placeholder="Search mentors by name, expertise, or company..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                      />
                    </div>
                    <select
                      value={filterExpertise}
                      onChange={(e) => setFilterExpertise(e.target.value)}
                      className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
                    >
                      <option value="all">All Expertise</option>
                      <option value="software">Software Engineering</option>
                      <option value="data">Data Science</option>
                      <option value="product">Product Management</option>
                      <option value="machine">Machine Learning</option>
                    </select>
                  </div>
                </div>

                {/* Mentors Grid */}
                <div className="flex-1 overflow-y-auto p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredMentors.map((mentor) => (
                      <div key={mentor.id} className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow duration-200">
                        {/* Mentor Header */}
                        <div className="flex items-start space-x-4 mb-4">
                          <div className="relative">
                            <div className="w-16 h-16 bg-gradient-to-br from-primary-400 to-primary-600 rounded-full flex items-center justify-center">
                              <span className="text-white font-bold text-lg">{mentor.avatar}</span>
                            </div>
                            {mentor.isOnline && (
                              <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
                            )}
                          </div>
                          <div className="flex-1">
                            <h3 className="font-semibold text-gray-900">{mentor.name}</h3>
                            <p className="text-sm text-gray-600">{mentor.title}</p>
                            <p className="text-sm text-primary-600 font-medium">{mentor.company}</p>
                          </div>
                        </div>

                        {/* Rating and Stats */}
                        <div className="flex items-center space-x-4 mb-4 text-sm text-gray-600">
                          <div className="flex items-center">
                            <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
                            <span>{mentor.rating}</span>
                          </div>
                          <div className="flex items-center">
                            <Users className="h-4 w-4 mr-1" />
                            <span>{mentor.sessions} sessions</span>
                          </div>
                          <div className="flex items-center">
                            <Clock className="h-4 w-4 mr-1" />
                            <span>{mentor.experience}</span>
                          </div>
                        </div>

                        {/* Expertise Tags */}
                        <div className="mb-4">
                          <div className="flex flex-wrap gap-2">
                            {mentor.expertise.slice(0, 3).map((skill, index) => (
                              <span
                                key={index}
                                className="px-2 py-1 bg-primary-100 text-primary-700 text-xs rounded-full"
                              >
                                {skill}
                              </span>
                            ))}
                            {mentor.expertise.length > 3 && (
                              <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                                +{mentor.expertise.length - 3} more
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Bio */}
                        <p className="text-sm text-gray-600 mb-4 line-clamp-2">{mentor.bio}</p>

                        {/* Action Buttons */}
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleBookSession(mentor)}
                            className="flex-1 bg-primary-600 hover:bg-primary-700 text-white text-sm font-medium py-2 px-3 rounded-lg transition-colors duration-200"
                          >
                            Book Session
                          </button>
                          {mentor.isOnline && (
                            <button
                              onClick={() => handleStartVideoCall(mentor)}
                              className="bg-green-600 hover:bg-green-700 text-white p-2 rounded-lg transition-colors duration-200"
                              title="Start video call"
                            >
                              <Video className="h-4 w-4" />
                            </button>
                          )}
                          <button className="bg-gray-100 hover:bg-gray-200 text-gray-600 p-2 rounded-lg transition-colors duration-200">
                            <MessageCircle className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* My Sessions Tab */}
            {activeTab === 'sessions' && (
              <div className="p-6">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Upcoming Sessions</h3>
                    <div className="space-y-4">
                      {userSessions.filter(s => s.status === 'upcoming').map((session) => (
                        <div key={session.id} className="bg-white border border-gray-200 rounded-lg p-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                              <div className="w-12 h-12 bg-primary-600 rounded-full flex items-center justify-center">
                                <span className="text-white font-medium">
                                  {session.mentorName.split(' ').map(n => n[0]).join('')}
                                </span>
                              </div>
                              <div>
                                <h4 className="font-medium text-gray-900">{session.topic}</h4>
                                <p className="text-sm text-gray-600">with {session.mentorName}</p>
                                <p className="text-sm text-gray-500">
                                  {new Date(session.scheduledTime).toLocaleDateString()} at{' '}
                                  {new Date(session.scheduledTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center space-x-2">
                              <button
                                onClick={() => handleStartVideoCall(mentors.find(m => m.id === session.mentorId))}
                                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 flex items-center"
                              >
                                <Video className="h-4 w-4 mr-2" />
                                Join Call
                              </button>
                              <button className="border border-gray-300 text-gray-700 hover:bg-gray-50 px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200">
                                Reschedule
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Past Sessions</h3>
                    <div className="space-y-4">
                      {userSessions.filter(s => s.status === 'completed').map((session) => (
                        <div key={session.id} className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                              <div className="w-12 h-12 bg-gray-400 rounded-full flex items-center justify-center">
                                <span className="text-white font-medium">
                                  {session.mentorName.split(' ').map(n => n[0]).join('')}
                                </span>
                              </div>
                              <div>
                                <h4 className="font-medium text-gray-900">{session.topic}</h4>
                                <p className="text-sm text-gray-600">with {session.mentorName}</p>
                                <p className="text-sm text-gray-500">
                                  {new Date(session.scheduledTime).toLocaleDateString()}
                                </p>
                                {session.rating && (
                                  <div className="flex items-center mt-1">
                                    {[...Array(5)].map((_, i) => (
                                      <Star
                                        key={i}
                                        className={`h-3 w-3 ${
                                          i < session.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                                        }`}
                                      />
                                    ))}
                                  </div>
                                )}
                              </div>
                            </div>
                            <button className="text-primary-600 hover:text-primary-700 text-sm font-medium">
                              View Details
                            </button>
                          </div>
                          {session.feedback && (
                            <div className="mt-3 p-3 bg-white rounded border">
                              <p className="text-sm text-gray-700">{session.feedback}</p>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Progress Tab */}
            {activeTab === 'progress' && (
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <div className="bg-white border border-gray-200 rounded-lg p-6 text-center">
                    <div className="text-3xl font-bold text-primary-600 mb-2">12</div>
                    <div className="text-sm text-gray-600">Total Sessions</div>
                  </div>
                  <div className="bg-white border border-gray-200 rounded-lg p-6 text-center">
                    <div className="text-3xl font-bold text-green-600 mb-2">18</div>
                    <div className="text-sm text-gray-600">Hours of Mentorship</div>
                  </div>
                  <div className="bg-white border border-gray-200 rounded-lg p-6 text-center">
                    <div className="text-3xl font-bold text-yellow-600 mb-2">4.8</div>
                    <div className="text-sm text-gray-600">Average Rating</div>
                  </div>
                </div>

                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Learning Goals</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <Target className="h-5 w-5 text-primary-600" />
                        <span className="font-medium">Master Data Structures & Algorithms</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-32 bg-gray-200 rounded-full h-2">
                          <div className="bg-primary-600 h-2 rounded-full" style={{ width: '75%' }}></div>
                        </div>
                        <span className="text-sm text-gray-600">75%</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <Briefcase className="h-5 w-5 text-green-600" />
                        <span className="font-medium">Prepare for Technical Interviews</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-32 bg-gray-200 rounded-full h-2">
                          <div className="bg-green-600 h-2 rounded-full" style={{ width: '60%' }}></div>
                        </div>
                        <span className="text-sm text-gray-600">60%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Booking Modal */}
      {showBookingModal && selectedMentor && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-60">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Book Session with {selectedMentor.name}
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Session Topic
                </label>
                <input
                  type="text"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
                  placeholder="e.g., Career guidance, Interview prep"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Preferred Date & Time
                </label>
                <input
                  type="datetime-local"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Duration
                </label>
                <select className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500">
                  <option value="30">30 minutes</option>
                  <option value="45">45 minutes</option>
                  <option value="60">60 minutes</option>
                </select>
              </div>
            </div>
            <div className="flex space-x-3 mt-6">
              <button
                onClick={confirmBooking}
                className="flex-1 bg-primary-600 hover:bg-primary-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200"
              >
                Book Session
              </button>
              <button
                onClick={() => setShowBookingModal(false)}
                className="flex-1 border border-gray-300 text-gray-700 hover:bg-gray-50 font-medium py-2 px-4 rounded-lg transition-colors duration-200"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Video Conference */}
      <VideoConference
        isOpen={showVideoCall}
        onClose={() => setShowVideoCall(false)}
        mentorshipSession={{
          topic: 'Career Guidance Session',
          mentor: selectedMentor
        }}
        participants={selectedMentor ? [selectedMentor, user] : []}
        isHost={false}
      />
    </>
  );
};

export default MentorshipProgram;
