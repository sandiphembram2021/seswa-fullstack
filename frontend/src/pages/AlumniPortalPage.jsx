import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  TrendingUp,
  Users,
  MessageCircle,
  Video,
  Edit,
  Plus,
  Calendar,
  DollarSign,
  Award,
  BookOpen,
  Send,
  Settings,
  BarChart3,
  Heart,
  Gift,
  Phone,
  Eye,
  Download,
  Share2
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useNotifications } from '../contexts/NotificationContext';
import { useChat } from '../contexts/ChatContext';

const AlumniPortalPage = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [newBlogPost, setNewBlogPost] = useState({ title: '', content: '', category: 'career' });
  const [newMentorshipProgram, setNewMentorshipProgram] = useState({
    title: '',
    description: '',
    duration: '',
    maxStudents: '',
    skills: ''
  });
  const [contributionAmount, setContributionAmount] = useState('');
  const [selectedEvent, setSelectedEvent] = useState('');

  const { user } = useAuth();
  const { notifications, createContributionNotification } = useNotifications();
  const { chats, sendMessage, setActiveChat } = useChat();

  // Mock data for alumni dashboard
  const alumniStats = [
    { icon: Users, label: 'Students Mentored', value: '24', color: 'text-blue-600' },
    { icon: BookOpen, label: 'Blog Posts', value: '12', color: 'text-green-600' },
    { icon: DollarSign, label: 'Total Contributions', value: '₹25,000', color: 'text-purple-600' },
    { icon: Award, label: 'Impact Score', value: '4.8', color: 'text-orange-600' }
  ];

  const mentorshipPrograms = [
    {
      id: 1,
      title: 'Software Engineering Career Path',
      description: 'Guide students through software engineering fundamentals and career development',
      duration: '3 months',
      studentsEnrolled: 8,
      maxStudents: 10,
      status: 'active',
      nextSession: '2025-01-15T14:00:00Z'
    },
    {
      id: 2,
      title: 'Technical Interview Preparation',
      description: 'Help students prepare for technical interviews at top tech companies',
      duration: '6 weeks',
      studentsEnrolled: 5,
      maxStudents: 8,
      status: 'active',
      nextSession: '2025-01-18T16:00:00Z'
    }
  ];

  const blogPosts = [
    {
      id: 1,
      title: 'Breaking into Tech: My Journey from College to Tesla',
      excerpt: 'Sharing my experience and tips for landing your first tech job...',
      category: 'career',
      publishedAt: '2024-11-20T10:00:00Z',
      views: 1250,
      likes: 89,
      comments: 23
    },
    {
      id: 2,
      title: 'Essential Skills for Modern Software Engineers',
      excerpt: 'The technical and soft skills that matter most in today\'s industry...',
      category: 'technical',
      publishedAt: '2024-11-15T14:30:00Z',
      views: 980,
      likes: 67,
      comments: 15
    }
  ];

  const contributionHistory = [
    {
      id: 1,
      event: 'Annual Picnic 2025',
      amount: 5000,
      date: '2024-12-01T10:00:00Z',
      status: 'completed'
    },
    {
      id: 2,
      event: 'Student Scholarship Fund',
      amount: 10000,
      date: '2024-10-15T10:00:00Z',
      status: 'completed'
    },
    {
      id: 3,
      event: 'Technical Workshop Series',
      amount: 3000,
      date: '2024-09-20T10:00:00Z',
      status: 'completed'
    }
  ];

  const upcomingEvents = [
    {
      id: 1,
      name: 'SESWA Annual Picnic 2025',
      date: '2025-01-26',
      targetAmount: 50000,
      raisedAmount: 35000,
      description: 'Community gathering and cultural celebration'
    },
    {
      id: 2,
      name: 'Student Scholarship Program',
      date: '2025-02-15',
      targetAmount: 100000,
      raisedAmount: 75000,
      description: 'Supporting deserving students with financial aid'
    }
  ];

  const handleCreateBlogPost = (e) => {
    e.preventDefault();
    console.log('Creating blog post:', newBlogPost);
    // In real app, this would call an API
    setNewBlogPost({ title: '', content: '', category: 'career' });
  };

  const handleCreateMentorshipProgram = (e) => {
    e.preventDefault();
    console.log('Creating mentorship program:', newMentorshipProgram);
    // In real app, this would call an API
    setNewMentorshipProgram({
      title: '',
      description: '',
      duration: '',
      maxStudents: '',
      skills: ''
    });
  };

  const handleContribution = (e) => {
    e.preventDefault();
    if (contributionAmount && selectedEvent) {
      console.log('Making contribution:', { amount: contributionAmount, event: selectedEvent });
      createContributionNotification(
        'Contribution Successful',
        `Thank you for contributing ₹${contributionAmount} to ${selectedEvent}`,
        Date.now().toString()
      );
      setContributionAmount('');
      setSelectedEvent('');
    }
  };

  const startVideoCall = (programId) => {
    // In real app, this would integrate with Jitsi or WebRTC
    console.log('Starting video call for program:', programId);
    window.open(`https://meet.jit.si/seswa-mentorship-${programId}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-xl">
                  {user?.firstName?.[0]}{user?.lastName?.[0]}
                </span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Welcome back, {user?.firstName}!
                </h1>
                <p className="text-gray-600">
                  Alumni • {user?.company || 'Professional'} • {user?.graduationYear || '2020'} Graduate
                </p>
                <p className="text-sm text-gray-500">
                  Making a difference in the SESWA community
                </p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-500">Member since</div>
              <div className="font-semibold text-gray-900">2020</div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white rounded-lg shadow-md mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6 overflow-x-auto">
              {[
                { id: 'dashboard', name: 'Dashboard', icon: TrendingUp },
                { id: 'mentorship', name: 'Mentorship', icon: Users },
                { id: 'blog', name: 'Blog Posts', icon: BookOpen },
                { id: 'contributions', name: 'Contributions', icon: Gift },
                { id: 'chat', name: 'Messages', icon: MessageCircle },
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
              {alumniStats.map((stat, index) => (
                <div key={index} className="bg-white rounded-lg shadow-md p-6 text-center">
                  <stat.icon className={`h-8 w-8 mx-auto mb-3 ${stat.color}`} />
                  <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Active Mentorship Programs */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-gray-900">Active Mentorship Programs</h2>
                  <button
                    onClick={() => setActiveTab('mentorship')}
                    className="text-primary-600 hover:text-primary-700 text-sm font-medium"
                  >
                    Manage All
                  </button>
                </div>
                <div className="space-y-4">
                  {mentorshipPrograms.slice(0, 2).map((program) => (
                    <div key={program.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="font-semibold text-gray-900">{program.title}</h3>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          program.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                        }`}>
                          {program.status}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mb-3">{program.description}</p>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-500">
                          {program.studentsEnrolled}/{program.maxStudents} students
                        </span>
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => startVideoCall(program.id)}
                            className="text-primary-600 hover:text-primary-700 font-medium"
                          >
                            <Video className="h-4 w-4" />
                          </button>
                          <button className="text-primary-600 hover:text-primary-700 font-medium">
                            <MessageCircle className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent Blog Posts */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-gray-900">Recent Blog Posts</h2>
                  <button
                    onClick={() => setActiveTab('blog')}
                    className="text-primary-600 hover:text-primary-700 text-sm font-medium"
                  >
                    View All
                  </button>
                </div>
                <div className="space-y-4">
                  {blogPosts.slice(0, 2).map((post) => (
                    <div key={post.id} className="border border-gray-200 rounded-lg p-4">
                      <h3 className="font-semibold text-gray-900 mb-2">{post.title}</h3>
                      <p className="text-sm text-gray-600 mb-3">{post.excerpt}</p>
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center space-x-4 text-gray-500">
                          <span className="flex items-center">
                            <Eye className="h-3 w-3 mr-1" />
                            {post.views}
                          </span>
                          <span className="flex items-center">
                            <Heart className="h-3 w-3 mr-1" />
                            {post.likes}
                          </span>
                        </div>
                        <button className="text-primary-600 hover:text-primary-700 font-medium">
                          Edit
                        </button>
                      </div>
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
            {/* Create New Program */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Create New Mentorship Program</h2>
              <form onSubmit={handleCreateMentorshipProgram} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Program Title
                    </label>
                    <input
                      type="text"
                      value={newMentorshipProgram.title}
                      onChange={(e) => setNewMentorshipProgram({...newMentorshipProgram, title: e.target.value})}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
                      placeholder="e.g., Data Science Career Path"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Duration
                    </label>
                    <select
                      value={newMentorshipProgram.duration}
                      onChange={(e) => setNewMentorshipProgram({...newMentorshipProgram, duration: e.target.value})}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
                    >
                      <option value="">Select Duration</option>
                      <option value="4 weeks">4 weeks</option>
                      <option value="6 weeks">6 weeks</option>
                      <option value="3 months">3 months</option>
                      <option value="6 months">6 months</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                  </label>
                  <textarea
                    rows="3"
                    value={newMentorshipProgram.description}
                    onChange={(e) => setNewMentorshipProgram({...newMentorshipProgram, description: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
                    placeholder="Describe what students will learn and achieve..."
                  ></textarea>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Maximum Students
                    </label>
                    <input
                      type="number"
                      value={newMentorshipProgram.maxStudents}
                      onChange={(e) => setNewMentorshipProgram({...newMentorshipProgram, maxStudents: e.target.value})}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
                      placeholder="e.g., 10"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Required Skills
                    </label>
                    <input
                      type="text"
                      value={newMentorshipProgram.skills}
                      onChange={(e) => setNewMentorshipProgram({...newMentorshipProgram, skills: e.target.value})}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
                      placeholder="e.g., Python, Statistics"
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  className="bg-primary-600 hover:bg-primary-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors duration-200"
                >
                  Create Program
                </button>
              </form>
            </div>

            {/* Existing Programs */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Your Mentorship Programs</h2>
              <div className="space-y-4">
                {mentorshipPrograms.map((program) => (
                  <div key={program.id} className="border border-gray-200 rounded-lg p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">{program.title}</h3>
                        <p className="text-gray-600 mb-3">{program.description}</p>
                        <div className="flex items-center space-x-6 text-sm text-gray-500">
                          <span>Duration: {program.duration}</span>
                          <span>Students: {program.studentsEnrolled}/{program.maxStudents}</span>
                          <span>Next Session: {new Date(program.nextSession).toLocaleDateString()}</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => startVideoCall(program.id)}
                          className="bg-green-600 hover:bg-green-700 text-white p-2 rounded-lg transition-colors duration-200"
                          title="Start Video Call"
                        >
                          <Video className="h-4 w-4" />
                        </button>
                        <button className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-lg transition-colors duration-200">
                          <MessageCircle className="h-4 w-4" />
                        </button>
                        <button className="bg-gray-600 hover:bg-gray-700 text-white p-2 rounded-lg transition-colors duration-200">
                          <Edit className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-700">Program Progress</span>
                        <span className="text-sm text-gray-500">{Math.round((program.studentsEnrolled / program.maxStudents) * 100)}% filled</span>
                      </div>
                      <div className="mt-2 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-primary-600 h-2 rounded-full" 
                          style={{ width: `${(program.studentsEnrolled / program.maxStudents) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Blog Tab */}
        {activeTab === 'blog' && (
          <div className="space-y-8">
            {/* Create New Blog Post */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Create New Blog Post</h2>
              <form onSubmit={handleCreateBlogPost} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Title
                    </label>
                    <input
                      type="text"
                      value={newBlogPost.title}
                      onChange={(e) => setNewBlogPost({...newBlogPost, title: e.target.value})}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
                      placeholder="Enter blog post title..."
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Category
                    </label>
                    <select
                      value={newBlogPost.category}
                      onChange={(e) => setNewBlogPost({...newBlogPost, category: e.target.value})}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
                    >
                      <option value="career">Career Advice</option>
                      <option value="technical">Technical</option>
                      <option value="personal">Personal Experience</option>
                      <option value="industry">Industry Insights</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Content
                  </label>
                  <textarea
                    rows="8"
                    value={newBlogPost.content}
                    onChange={(e) => setNewBlogPost({...newBlogPost, content: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
                    placeholder="Write your blog post content here..."
                  ></textarea>
                </div>
                <div className="flex items-center space-x-4">
                  <button
                    type="submit"
                    className="bg-primary-600 hover:bg-primary-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors duration-200"
                  >
                    Publish Post
                  </button>
                  <button
                    type="button"
                    className="border border-gray-300 text-gray-700 hover:bg-gray-50 font-semibold py-2 px-6 rounded-lg transition-colors duration-200"
                  >
                    Save Draft
                  </button>
                </div>
              </form>
            </div>

            {/* Existing Blog Posts */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Your Blog Posts</h2>
              <div className="space-y-4">
                {blogPosts.map((post) => (
                  <div key={post.id} className="border border-gray-200 rounded-lg p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">{post.title}</h3>
                        <p className="text-gray-600 mb-3">{post.excerpt}</p>
                        <div className="flex items-center space-x-6 text-sm text-gray-500">
                          <span className="flex items-center">
                            <Eye className="h-4 w-4 mr-1" />
                            {post.views} views
                          </span>
                          <span className="flex items-center">
                            <Heart className="h-4 w-4 mr-1" />
                            {post.likes} likes
                          </span>
                          <span className="flex items-center">
                            <MessageCircle className="h-4 w-4 mr-1" />
                            {post.comments} comments
                          </span>
                          <span>Published: {new Date(post.publishedAt).toLocaleDateString()}</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button className="text-primary-600 hover:text-primary-700 p-2 rounded-lg hover:bg-primary-50">
                          <Edit className="h-4 w-4" />
                        </button>
                        <button className="text-gray-600 hover:text-gray-700 p-2 rounded-lg hover:bg-gray-50">
                          <Share2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-700">Engagement Rate</span>
                        <span className="text-sm text-gray-500">{Math.round(((post.likes + post.comments) / post.views) * 100)}%</span>
                      </div>
                      <div className="mt-2 bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-green-600 h-2 rounded-full"
                          style={{ width: `${Math.round(((post.likes + post.comments) / post.views) * 100)}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Contributions Tab */}
        {activeTab === 'contributions' && (
          <div className="space-y-8">
            {/* Make New Contribution */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Make a Contribution</h2>
              <form onSubmit={handleContribution} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Select Event
                    </label>
                    <select
                      value={selectedEvent}
                      onChange={(e) => setSelectedEvent(e.target.value)}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
                    >
                      <option value="">Choose an event...</option>
                      {upcomingEvents.map((event) => (
                        <option key={event.id} value={event.name}>
                          {event.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Contribution Amount (₹)
                    </label>
                    <input
                      type="number"
                      value={contributionAmount}
                      onChange={(e) => setContributionAmount(e.target.value)}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
                      placeholder="Enter amount..."
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors duration-200"
                >
                  Contribute Now
                </button>
              </form>
            </div>

            {/* Upcoming Events Needing Contributions */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Events Needing Support</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {upcomingEvents.map((event) => (
                  <div key={event.id} className="border border-gray-200 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{event.name}</h3>
                    <p className="text-gray-600 mb-4">{event.description}</p>
                    <div className="mb-4">
                      <div className="flex items-center justify-between text-sm mb-2">
                        <span className="font-medium text-gray-700">Fundraising Progress</span>
                        <span className="text-gray-500">
                          ₹{event.raisedAmount.toLocaleString()} / ₹{event.targetAmount.toLocaleString()}
                        </span>
                      </div>
                      <div className="bg-gray-200 rounded-full h-3">
                        <div
                          className="bg-green-600 h-3 rounded-full"
                          style={{ width: `${(event.raisedAmount / event.targetAmount) * 100}%` }}
                        ></div>
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        {Math.round((event.raisedAmount / event.targetAmount) * 100)}% of goal reached
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">
                        Event Date: {new Date(event.date).toLocaleDateString()}
                      </span>
                      <button
                        onClick={() => {
                          setSelectedEvent(event.name);
                          setActiveTab('contributions');
                        }}
                        className="bg-primary-600 hover:bg-primary-700 text-white text-sm font-medium py-2 px-4 rounded-lg transition-colors duration-200"
                      >
                        Contribute
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Contribution History */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Your Contribution History</h2>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Event
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Amount
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {contributionHistory.map((contribution) => (
                      <tr key={contribution.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {contribution.event}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          ₹{contribution.amount.toLocaleString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {new Date(contribution.date).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            contribution.status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {contribution.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="mt-6 bg-green-50 rounded-lg p-4">
                <div className="flex items-center">
                  <Gift className="h-5 w-5 text-green-600 mr-2" />
                  <span className="font-semibold text-green-900">
                    Total Contributions: ₹{contributionHistory.reduce((sum, c) => sum + c.amount, 0).toLocaleString()}
                  </span>
                </div>
                <p className="text-sm text-green-700 mt-1">
                  Thank you for your generous support to the SESWA community!
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AlumniPortalPage;
