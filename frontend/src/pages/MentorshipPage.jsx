import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Users,
  GraduationCap,
  Briefcase,
  MessageCircle,
  Calendar,
  ArrowRight,
  CheckCircle,
  Star,
  Target,
  Heart,
  BookOpen,
  TrendingUp,
  Video
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import MentorshipProgram from '../components/MentorshipProgram';

const MentorshipPage = () => {
  const { user, isAuthenticated } = useAuth();
  const [activeTab, setActiveTab] = useState('mentee');
  const [showMentorshipProgram, setShowMentorshipProgram] = useState(false);

  const mentorshipStats = [
    { icon: Users, label: 'Active Mentors', value: '150+', color: 'text-blue-600' },
    { icon: GraduationCap, label: 'Students Mentored', value: '300+', color: 'text-green-600' },
    { icon: Briefcase, label: 'Career Transitions', value: '200+', color: 'text-purple-600' },
    { icon: Star, label: 'Success Rate', value: '92%', color: 'text-orange-600' }
  ];

  const mentorshipAreas = [
    {
      icon: Briefcase,
      title: 'Career Guidance',
      description: 'Get advice on career paths, job search strategies, and industry insights.'
    },
    {
      icon: BookOpen,
      title: 'Technical Skills',
      description: 'Learn new technologies, programming languages, and engineering practices.'
    },
    {
      icon: TrendingUp,
      title: 'Professional Development',
      description: 'Develop leadership skills, communication, and project management abilities.'
    },
    {
      icon: Target,
      title: 'Goal Setting',
      description: 'Set and achieve academic and professional goals with structured guidance.'
    }
  ];

  const menteeRequirements = [
    'Currently enrolled in engineering college or recent graduate',
    'Commitment to regular mentorship sessions',
    'Clear goals and expectations from mentorship',
    'Willingness to learn and implement feedback'
  ];

  const mentorRequirements = [
    'Engineering graduate with 3+ years of experience',
    'Working in a relevant industry or field',
    'Passion for helping students and young professionals',
    'Ability to commit 2-3 hours per month for mentorship'
  ];

  const successStories = [
    {
      name: 'Rahul Soren',
      role: 'Software Engineer at Microsoft',
      story: 'Through SESWA mentorship, I learned about system design and got guidance for my Microsoft interview. My mentor helped me prepare and build confidence.',
      mentor: 'Priya Murmu (Google)'
    },
    {
      name: 'Anjali Hansda',
      role: 'Product Manager at Flipkart',
      story: 'My mentor guided me through the transition from engineering to product management. The career advice and industry insights were invaluable.',
      mentor: 'Arjun Marandi (Amazon)'
    },
    {
      name: 'Vikash Tudu',
      role: 'Research Scientist at ISRO',
      story: 'The mentorship program helped me focus on research opportunities and navigate the path to joining ISRO. Forever grateful for the guidance.',
      mentor: 'Dr. Sunita Soren (DRDO)'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-gray-900 mb-6">
            SESWA Mentorship Program
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Connecting experienced alumni with current students and young professionals
            for career guidance, skill development, and personal growth through video conferencing.
          </p>

          {/* Video Conference CTA */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            {isAuthenticated ? (
              <button
                onClick={() => setShowMentorshipProgram(true)}
                className="bg-primary-600 hover:bg-primary-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-200 flex items-center justify-center"
              >
                <Video className="h-5 w-5 mr-2" />
                Start Video Mentorship
              </button>
            ) : (
              <Link
                to="/login"
                className="bg-primary-600 hover:bg-primary-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-200 flex items-center justify-center"
              >
                Join SESWA for Mentorship
                <ArrowRight className="h-5 w-5 ml-2" />
              </Link>
            )}
            <Link
              to="/about"
              className="border-2 border-primary-600 text-primary-600 hover:bg-primary-600 hover:text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-200"
            >
              Learn More
            </Link>
          </div>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {mentorshipStats.map((stat, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md p-6 text-center">
              <stat.icon className={`h-8 w-8 mx-auto mb-3 ${stat.color}`} />
              <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
              <div className="text-sm text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Mentorship Areas */}
        <div className="mb-16">
          <h2 className="text-3xl font-heading font-bold text-gray-900 text-center mb-12">
            Mentorship Areas
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {mentorshipAreas.map((area, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-lg transition-shadow duration-200">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary-100 mb-4">
                  <area.icon className="h-6 w-6 text-primary-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {area.title}
                </h3>
                <p className="text-gray-600 text-sm">
                  {area.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Join as Mentee or Mentor */}
        <div className="mb-16">
          <h2 className="text-3xl font-heading font-bold text-gray-900 text-center mb-8">
            Join the Program
          </h2>
          
          {/* Tab Navigation */}
          <div className="flex justify-center mb-8">
            <div className="bg-gray-200 rounded-lg p-1">
              <button
                onClick={() => setActiveTab('mentee')}
                className={`px-6 py-2 rounded-md font-medium transition-colors duration-200 ${
                  activeTab === 'mentee'
                    ? 'bg-white text-primary-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Become a Mentee
              </button>
              <button
                onClick={() => setActiveTab('mentor')}
                className={`px-6 py-2 rounded-md font-medium transition-colors duration-200 ${
                  activeTab === 'mentor'
                    ? 'bg-white text-primary-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Become a Mentor
              </button>
            </div>
          </div>

          {/* Tab Content */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {activeTab === 'mentee' ? (
              <>
                <div className="bg-white rounded-lg shadow-md p-8">
                  <div className="flex items-center mb-6">
                    <GraduationCap className="h-8 w-8 text-blue-600 mr-3" />
                    <h3 className="text-2xl font-bold text-gray-900">For Students & Young Professionals</h3>
                  </div>
                  <p className="text-gray-600 mb-6">
                    Get personalized guidance from experienced alumni to accelerate your career growth 
                    and achieve your professional goals.
                  </p>
                  <h4 className="font-semibold text-gray-900 mb-4">Requirements:</h4>
                  <ul className="space-y-2 mb-6">
                    {menteeRequirements.map((req, index) => (
                      <li key={index} className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-600 text-sm">{req}</span>
                      </li>
                    ))}
                  </ul>
                  <Link
                    to="/student/register"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 inline-flex items-center justify-center"
                  >
                    Apply as Mentee
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </div>
                <div className="bg-blue-50 rounded-lg p-8">
                  <h4 className="font-semibold text-gray-900 mb-4">What You'll Get:</h4>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <MessageCircle className="h-5 w-5 text-blue-600 mr-3 mt-0.5" />
                      <span className="text-gray-700">Monthly 1-on-1 sessions with your mentor</span>
                    </li>
                    <li className="flex items-start">
                      <Target className="h-5 w-5 text-blue-600 mr-3 mt-0.5" />
                      <span className="text-gray-700">Personalized career roadmap and goal setting</span>
                    </li>
                    <li className="flex items-start">
                      <BookOpen className="h-5 w-5 text-blue-600 mr-3 mt-0.5" />
                      <span className="text-gray-700">Industry insights and skill development guidance</span>
                    </li>
                    <li className="flex items-start">
                      <Users className="h-5 w-5 text-blue-600 mr-3 mt-0.5" />
                      <span className="text-gray-700">Access to alumni network and opportunities</span>
                    </li>
                  </ul>
                </div>
              </>
            ) : (
              <>
                <div className="bg-white rounded-lg shadow-md p-8">
                  <div className="flex items-center mb-6">
                    <Briefcase className="h-8 w-8 text-green-600 mr-3" />
                    <h3 className="text-2xl font-bold text-gray-900">For Experienced Alumni</h3>
                  </div>
                  <p className="text-gray-600 mb-6">
                    Share your knowledge and experience to help the next generation of Santal engineers 
                    succeed in their careers.
                  </p>
                  <h4 className="font-semibold text-gray-900 mb-4">Requirements:</h4>
                  <ul className="space-y-2 mb-6">
                    {mentorRequirements.map((req, index) => (
                      <li key={index} className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-600 text-sm">{req}</span>
                      </li>
                    ))}
                  </ul>
                  <Link
                    to="/alumni/register"
                    className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 inline-flex items-center justify-center"
                  >
                    Apply as Mentor
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </div>
                <div className="bg-green-50 rounded-lg p-8">
                  <h4 className="font-semibold text-gray-900 mb-4">Impact You'll Make:</h4>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <Heart className="h-5 w-5 text-green-600 mr-3 mt-0.5" />
                      <span className="text-gray-700">Help shape the career of young professionals</span>
                    </li>
                    <li className="flex items-start">
                      <TrendingUp className="h-5 w-5 text-green-600 mr-3 mt-0.5" />
                      <span className="text-gray-700">Contribute to community growth and success</span>
                    </li>
                    <li className="flex items-start">
                      <Users className="h-5 w-5 text-green-600 mr-3 mt-0.5" />
                      <span className="text-gray-700">Expand your professional network</span>
                    </li>
                    <li className="flex items-start">
                      <Star className="h-5 w-5 text-green-600 mr-3 mt-0.5" />
                      <span className="text-gray-700">Recognition as a community leader</span>
                    </li>
                  </ul>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Success Stories */}
        <div className="mb-16">
          <h2 className="text-3xl font-heading font-bold text-gray-900 text-center mb-12">
            Success Stories
          </h2>
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
                    <p className="text-primary-600 text-sm">{story.role}</p>
                  </div>
                </div>
                <p className="text-gray-600 text-sm mb-4 italic">"{story.story}"</p>
                <p className="text-gray-500 text-xs">
                  <strong>Mentor:</strong> {story.mentor}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* How It Works */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-16">
          <h2 className="text-3xl font-heading font-bold text-gray-900 text-center mb-8">
            How It Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-primary-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 font-bold">
                1
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Apply</h3>
              <p className="text-gray-600 text-sm">Submit your application as a mentee or mentor</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-primary-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 font-bold">
                2
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Match</h3>
              <p className="text-gray-600 text-sm">Get matched based on goals, interests, and expertise</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-primary-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 font-bold">
                3
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Connect</h3>
              <p className="text-gray-600 text-sm">Start regular mentorship sessions and goal setting</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-primary-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 font-bold">
                4
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Grow</h3>
              <p className="text-gray-600 text-sm">Achieve your goals with ongoing support and guidance</p>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center bg-primary-600 text-white rounded-lg p-8">
          <h2 className="text-2xl font-heading font-bold mb-4">
            Ready to Start Your Mentorship Journey?
          </h2>
          <p className="text-primary-100 mb-6 max-w-2xl mx-auto">
            Join our mentorship program and be part of a community that believes in 
            lifting each other up and achieving success together.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/student/register"
              className="bg-white text-primary-600 hover:bg-primary-50 font-semibold py-3 px-8 rounded-lg transition-colors duration-200 inline-flex items-center justify-center"
            >
              Find a Mentor
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
            <Link
              to="/alumni/register"
              className="border-2 border-white text-white hover:bg-white hover:text-primary-600 font-semibold py-3 px-8 rounded-lg transition-colors duration-200"
            >
              Become a Mentor
            </Link>
          </div>
        </div>
      </div>

      {/* Mentorship Program Modal */}
      <MentorshipProgram
        isOpen={showMentorshipProgram}
        onClose={() => setShowMentorshipProgram(false)}
      />
    </div>
  );
};

export default MentorshipPage;
