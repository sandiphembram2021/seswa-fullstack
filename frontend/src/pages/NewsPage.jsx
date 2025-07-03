import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Calendar, 
  Clock, 
  User, 
  Tag, 
  ArrowRight, 
  Bell,
  Megaphone,
  Award,
  Users,
  BookOpen,
  Briefcase,
  GraduationCap,
  AlertCircle,
  CheckCircle,
  Info
} from 'lucide-react';

const NewsPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedType, setSelectedType] = useState('all');

  // Mock news data
  const newsItems = [
    {
      id: 1,
      title: 'SESWA Annual Picnic 2025 - Registration Open',
      excerpt: 'Join us for our traditional annual picnic on January 26, 2025, at Eco Park, New Town. Early bird registration now open with special discounts.',
      content: 'The Santal Engineering Students\' Welfare Association is excited to announce the registration for our Annual Picnic 2025...',
      category: 'events',
      type: 'announcement',
      priority: 'high',
      author: 'SESWA Events Committee',
      publishedAt: '2024-12-01T10:00:00Z',
      image: null,
      tags: ['annual picnic', 'registration', 'community event'],
      views: 1250,
      isSticky: true
    },
    {
      id: 2,
      title: 'New Scholarship Program for SC/ST Engineering Students',
      excerpt: 'Government of West Bengal announces new scholarship scheme worth ₹2 crore for SC/ST engineering students. Application deadline: December 31, 2024.',
      content: 'The Government of West Bengal has launched a comprehensive scholarship program...',
      category: 'scholarships',
      type: 'notification',
      priority: 'high',
      author: 'SESWA Academic Team',
      publishedAt: '2024-11-28T14:30:00Z',
      image: null,
      tags: ['scholarship', 'government', 'sc/st', 'deadline'],
      views: 2100,
      isSticky: true
    },
    {
      id: 3,
      title: 'Alumni Success: Priya Murmu Joins Tesla as Senior Engineer',
      excerpt: 'SESWA alumna Priya Murmu (IIEST Shibpur 2015) has been promoted to Senior Engineer at Tesla, leading the battery optimization team.',
      content: 'We are proud to announce that our alumna Priya Murmu has achieved another milestone...',
      category: 'alumni',
      type: 'news',
      priority: 'medium',
      author: 'Alumni Relations',
      publishedAt: '2024-11-25T09:15:00Z',
      image: null,
      tags: ['alumni success', 'tesla', 'career growth'],
      views: 890,
      isSticky: false
    },
    {
      id: 4,
      title: 'WBJEE 2025 Counselling Guidance Sessions Announced',
      excerpt: 'Free WBJEE counselling sessions for Santal students. Expert guidance on college selection, seat allocation, and admission process.',
      content: 'SESWA is organizing comprehensive WBJEE counselling sessions...',
      category: 'academic',
      type: 'announcement',
      priority: 'high',
      author: 'Academic Committee',
      publishedAt: '2024-11-20T16:45:00Z',
      image: null,
      tags: ['wbjee', 'counselling', 'admission', 'guidance'],
      views: 1560,
      isSticky: false
    },
    {
      id: 5,
      title: 'New Partnership with Tech Mahindra for Internships',
      excerpt: 'SESWA signs MoU with Tech Mahindra to provide exclusive internship opportunities for our student members.',
      content: 'We are excited to announce our new partnership with Tech Mahindra...',
      category: 'partnerships',
      type: 'news',
      priority: 'medium',
      author: 'SESWA Executive',
      publishedAt: '2024-11-18T11:20:00Z',
      image: null,
      tags: ['partnership', 'tech mahindra', 'internships'],
      views: 1340,
      isSticky: false
    },
    {
      id: 6,
      title: 'Freshers Welcome 2024 - Huge Success!',
      excerpt: 'Over 150 new students attended our Freshers Welcome event. Thank you to all participants and organizers for making it memorable.',
      content: 'The SESWA Freshers Welcome 2024 was a tremendous success...',
      category: 'events',
      type: 'news',
      priority: 'low',
      author: 'Event Organizers',
      publishedAt: '2024-10-20T18:30:00Z',
      image: null,
      tags: ['freshers welcome', 'success', 'community'],
      views: 780,
      isSticky: false
    }
  ];

  const categories = [
    { id: 'all', name: 'All Categories', icon: Tag },
    { id: 'events', name: 'Events', icon: Calendar },
    { id: 'scholarships', name: 'Scholarships', icon: Award },
    { id: 'alumni', name: 'Alumni News', icon: Users },
    { id: 'academic', name: 'Academic', icon: BookOpen },
    { id: 'partnerships', name: 'Partnerships', icon: Briefcase }
  ];

  const types = [
    { id: 'all', name: 'All Types' },
    { id: 'announcement', name: 'Announcements' },
    { id: 'notification', name: 'Notifications' },
    { id: 'news', name: 'News' }
  ];

  const filteredNews = newsItems.filter(item => {
    const categoryMatch = selectedCategory === 'all' || item.category === selectedCategory;
    const typeMatch = selectedType === 'all' || item.type === selectedType;
    return categoryMatch && typeMatch;
  });

  const stickyNews = filteredNews.filter(item => item.isSticky);
  const regularNews = filteredNews.filter(item => !item.isSticky);

  const getPriorityIcon = (priority) => {
    switch (priority) {
      case 'high':
        return <AlertCircle className="h-4 w-4 text-red-500" />;
      case 'medium':
        return <Info className="h-4 w-4 text-yellow-500" />;
      case 'low':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      default:
        return <Info className="h-4 w-4 text-gray-500" />;
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'announcement':
        return <Megaphone className="h-4 w-4" />;
      case 'notification':
        return <Bell className="h-4 w-4" />;
      case 'news':
        return <BookOpen className="h-4 w-4" />;
      default:
        return <Info className="h-4 w-4" />;
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getTimeAgo = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));
    
    if (diffInHours < 24) {
      return `${diffInHours} hours ago`;
    } else {
      const diffInDays = Math.floor(diffInHours / 24);
      return `${diffInDays} days ago`;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-heading font-bold text-gray-900 mb-4">
            News & Notifications
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Stay updated with the latest announcements, events, scholarships, and news from the SESWA community.
          </p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Category Filter */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Categories</h3>
              <div className="grid grid-cols-2 gap-2">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`flex items-center p-3 rounded-lg border transition-colors duration-200 ${
                      selectedCategory === category.id
                        ? 'bg-primary-600 text-white border-primary-600'
                        : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    <category.icon className="h-4 w-4 mr-2" />
                    <span className="text-sm font-medium">{category.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Type Filter */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Types</h3>
              <div className="space-y-2">
                {types.map((type) => (
                  <button
                    key={type.id}
                    onClick={() => setSelectedType(type.id)}
                    className={`w-full flex items-center p-3 rounded-lg border transition-colors duration-200 ${
                      selectedType === type.id
                        ? 'bg-primary-600 text-white border-primary-600'
                        : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    <span className="text-sm font-medium">{type.name}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Sticky/Important News */}
        {stickyNews.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-heading font-bold text-gray-900 mb-6 flex items-center">
              <AlertCircle className="h-6 w-6 text-red-500 mr-2" />
              Important Announcements
            </h2>
            <div className="space-y-4">
              {stickyNews.map((item) => (
                <div key={item.id} className="bg-red-50 border-l-4 border-red-500 rounded-lg p-6 shadow-md">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center mb-2">
                        {getTypeIcon(item.type)}
                        <span className="ml-2 text-sm font-medium text-red-700 uppercase tracking-wide">
                          {item.type}
                        </span>
                        {getPriorityIcon(item.priority)}
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                      <p className="text-gray-700 mb-4">{item.excerpt}</p>
                      <div className="flex items-center text-sm text-gray-600 space-x-4">
                        <div className="flex items-center">
                          <User className="h-4 w-4 mr-1" />
                          <span>{item.author}</span>
                        </div>
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1" />
                          <span>{formatDate(item.publishedAt)}</span>
                        </div>
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-1" />
                          <span>{getTimeAgo(item.publishedAt)}</span>
                        </div>
                      </div>
                    </div>
                    <Link
                      to={`/news/${item.id}`}
                      className="ml-4 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 flex items-center"
                    >
                      Read More
                      <ArrowRight className="ml-1 h-3 w-3" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Regular News */}
        <div>
          <h2 className="text-2xl font-heading font-bold text-gray-900 mb-6">
            Latest Updates
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {regularNews.map((item) => (
              <div key={item.id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 overflow-hidden">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center">
                      {getTypeIcon(item.type)}
                      <span className="ml-2 text-sm font-medium text-primary-600 uppercase tracking-wide">
                        {item.type}
                      </span>
                    </div>
                    {getPriorityIcon(item.priority)}
                  </div>
                  
                  <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">
                    {item.title}
                  </h3>
                  
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {item.excerpt}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {item.tags.slice(0, 3).map((tag, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-sm text-gray-500 space-x-3">
                      <div className="flex items-center">
                        <User className="h-3 w-3 mr-1" />
                        <span>{item.author}</span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-3 w-3 mr-1" />
                        <span>{getTimeAgo(item.publishedAt)}</span>
                      </div>
                    </div>
                    <Link
                      to={`/news/${item.id}`}
                      className="text-primary-600 hover:text-primary-700 font-medium text-sm flex items-center"
                    >
                      Read More
                      <ArrowRight className="ml-1 h-3 w-3" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* No Results */}
        {filteredNews.length === 0 && (
          <div className="text-center py-12">
            <Bell className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No news found</h3>
            <p className="text-gray-600 mb-6">
              Try adjusting your filters or check back later for new updates.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSelectedType('all');
              }}
              className="btn-primary"
            >
              Clear Filters
            </button>
          </div>
        )}

        {/* Newsletter Signup */}
        <div className="mt-16 bg-primary-600 text-white rounded-lg p-8 text-center">
          <h2 className="text-2xl font-heading font-bold mb-4">
            Stay Updated
          </h2>
          <p className="text-primary-100 mb-6 max-w-2xl mx-auto">
            Subscribe to our newsletter to receive the latest news, announcements, 
            and opportunities directly in your inbox.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg text-gray-900 placeholder-gray-500"
            />
            <button className="bg-white text-primary-600 hover:bg-primary-50 font-semibold py-3 px-6 rounded-lg transition-colors duration-200">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsPage;
