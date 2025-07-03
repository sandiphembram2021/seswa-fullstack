import React from 'react';
import { Link } from 'react-router-dom';
import { 
  BookOpen, 
  Calendar, 
  Users, 
  Award,
  TrendingUp,
  Target,
  Lightbulb,
  Heart,
  ArrowRight,
  GraduationCap,
  Briefcase,
  Star,
  Clock
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import StudentDashboard from '../components/StudentDashboard';

const StudentHomePage = () => {
  const { user, isAuthenticated } = useAuth();

  // Student-specific features
  const studentFeatures = [
    {
      icon: BookOpen,
      title: 'Study Resources',
      description: 'Access comprehensive study materials, notes, and academic resources curated for engineering students.',
      link: '/resources?type=study_material',
      color: 'bg-blue-500'
    },
    {
      icon: Calendar,
      title: 'Events & Workshops',
      description: 'Join technical workshops, cultural events, and networking sessions designed for student growth.',
      link: '/events',
      color: 'bg-green-500'
    },
    {
      icon: Users,
      title: 'Mentorship Program',
      description: 'Connect with experienced alumni for career guidance and professional development.',
      link: '/mentorship',
      color: 'bg-purple-500'
    },
    {
      icon: Award,
      title: 'Scholarships',
      description: 'Discover scholarship opportunities and financial aid programs for engineering students.',
      link: '/resources?type=scholarship',
      color: 'bg-orange-500'
    }
  ];

  const successStories = [
    {
      name: 'Rahul Soren',
      achievement: 'Software Engineer at Google',
      story: 'SESWA mentorship helped me prepare for technical interviews and land my dream job.',
      year: '2023 Graduate'
    },
    {
      name: 'Priya Murmu',
      achievement: 'Product Manager at Tesla',
      story: 'The networking opportunities and career guidance were invaluable for my growth.',
      year: '2020 Graduate'
    },
    {
      name: 'Anjali Hansda',
      achievement: 'Research Scientist at ISRO',
      story: 'SESWA resources and community support helped me pursue my passion for space research.',
      year: '2021 Graduate'
    }
  ];

  const upcomingOpportunities = [
    {
      title: 'Microsoft Summer Internship 2025',
      type: 'Internship',
      deadline: '2025-02-15',
      description: 'Software engineering internship with competitive stipend and mentorship.',
      urgent: true
    },
    {
      title: 'SC/ST Engineering Scholarship',
      type: 'Scholarship',
      deadline: '2025-01-31',
      description: 'Government scholarship worth ₹50,000 for eligible engineering students.',
      urgent: true
    },
    {
      title: 'Technical Workshop: AI/ML',
      type: 'Workshop',
      deadline: '2025-01-20',
      description: 'Hands-on workshop on machine learning with industry experts.',
      urgent: false
    }
  ];

  const communityStats = [
    { number: '500+', label: 'Student Members' },
    { number: '14', label: 'Partner Colleges' },
    { number: '100+', label: 'Events Annually' },
    { number: '₹50L+', label: 'Scholarships Distributed' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-heading font-bold mb-6">
              Student Portal
            </h1>
            <p className="text-xl text-primary-100 max-w-3xl mx-auto">
              Your gateway to academic excellence, career opportunities, and community connection. 
              Join 500+ engineering students in building a brighter future together.
            </p>
          </div>

          {/* Community Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
            {communityStats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-white mb-2">{stat.number}</div>
                <div className="text-primary-200 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {isAuthenticated ? (
              <Link
                to="/student/portal"
                className="bg-white text-primary-700 hover:bg-primary-50 font-semibold py-3 px-8 rounded-lg transition-colors duration-200 text-center inline-flex items-center justify-center"
              >
                Go to Dashboard
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            ) : (
              <>
                <Link
                  to="/student/register"
                  className="bg-white text-primary-700 hover:bg-primary-50 font-semibold py-3 px-8 rounded-lg transition-colors duration-200 text-center"
                >
                  Join as Student
                </Link>
                <Link
                  to="/student/login"
                  className="border-2 border-white text-white hover:bg-white hover:text-primary-700 font-semibold py-3 px-8 rounded-lg transition-colors duration-200 text-center"
                >
                  Student Login
                </Link>
              </>
            )}
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Student Dashboard (for authenticated users) */}
        {isAuthenticated && user?.userType === 'student' && (
          <section className="mb-16">
            <StudentDashboard user={user} />
          </section>
        )}

        {/* Student Features */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-heading font-bold text-gray-900 mb-4">
              Everything You Need to Succeed
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From academic resources to career opportunities, we provide comprehensive support 
              for your engineering journey.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {studentFeatures.map((feature, index) => (
              <Link
                key={index}
                to={feature.link}
                className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 overflow-hidden group"
              >
                <div className="p-6">
                  <div className={`w-12 h-12 ${feature.color} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-200`}>
                    <feature.icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-gray-600 text-sm mb-4">{feature.description}</p>
                  <div className="flex items-center text-primary-600 text-sm font-medium">
                    Explore
                    <ArrowRight className="ml-1 h-3 w-3 group-hover:translate-x-1 transition-transform duration-200" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Urgent Opportunities */}
        <section className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-heading font-bold text-gray-900 mb-4">
              Urgent Opportunities
            </h2>
            <p className="text-xl text-gray-600">
              Don't miss these time-sensitive opportunities for your career growth.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {upcomingOpportunities.map((opportunity, index) => (
              <div
                key={index}
                className={`bg-white rounded-lg shadow-md p-6 border-l-4 ${
                  opportunity.urgent ? 'border-red-500' : 'border-blue-500'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    opportunity.type === 'Internship' ? 'bg-blue-100 text-blue-800' :
                    opportunity.type === 'Scholarship' ? 'bg-green-100 text-green-800' :
                    'bg-purple-100 text-purple-800'
                  }`}>
                    {opportunity.type}
                  </span>
                  {opportunity.urgent && (
                    <span className="px-2 py-1 bg-red-100 text-red-800 text-xs font-medium rounded-full">
                      Urgent
                    </span>
                  )}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{opportunity.title}</h3>
                <p className="text-gray-600 text-sm mb-4">{opportunity.description}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-sm text-gray-500">
                    <Clock className="h-4 w-4 mr-1" />
                    <span>Due: {new Date(opportunity.deadline).toLocaleDateString()}</span>
                  </div>
                  <button className="text-primary-600 hover:text-primary-700 font-medium text-sm">
                    Apply Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Success Stories */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-heading font-bold text-gray-900 mb-4">
              Student Success Stories
            </h2>
            <p className="text-xl text-gray-600">
              See how SESWA has helped students achieve their career goals.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {successStories.map((story, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary-400 to-primary-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-sm">
                      {story.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div className="ml-3">
                    <h4 className="font-semibold text-gray-900">{story.name}</h4>
                    <p className="text-primary-600 text-sm">{story.achievement}</p>
                    <p className="text-gray-500 text-xs">{story.year}</p>
                  </div>
                </div>
                <p className="text-gray-600 text-sm italic">"{story.story}"</p>
              </div>
            ))}
          </div>
        </section>

        {/* Call to Action */}
        <section className="bg-primary-600 text-white rounded-lg p-8 text-center">
          <h2 className="text-2xl font-heading font-bold mb-4">
            Ready to Start Your Journey?
          </h2>
          <p className="text-primary-100 mb-6 max-w-2xl mx-auto">
            Join the SESWA student community and unlock access to resources, mentorship, 
            and opportunities that will accelerate your engineering career.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {!isAuthenticated && (
              <>
                <Link
                  to="/student/register"
                  className="bg-white text-primary-600 hover:bg-primary-50 font-semibold py-3 px-8 rounded-lg transition-colors duration-200 inline-flex items-center justify-center"
                >
                  Register as Student
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
                <Link
                  to="/about"
                  className="border-2 border-white text-white hover:bg-white hover:text-primary-600 font-semibold py-3 px-8 rounded-lg transition-colors duration-200"
                >
                  Learn More About SESWA
                </Link>
              </>
            )}
            {isAuthenticated && (
              <Link
                to="/student/portal"
                className="bg-white text-primary-600 hover:bg-primary-50 font-semibold py-3 px-8 rounded-lg transition-colors duration-200 inline-flex items-center justify-center"
              >
                Access Full Portal
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default StudentHomePage;
