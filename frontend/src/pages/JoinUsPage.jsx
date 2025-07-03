import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { GraduationCap, Briefcase, Users, ArrowRight, CheckCircle, Star } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import Logo from '../components/Logo';

const JoinUsPage = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // Redirect if already authenticated
  React.useEffect(() => {
    if (isAuthenticated) {
      navigate('/', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const membershipOptions = [
    {
      type: 'student',
      title: 'Student Membership',
      description: 'For current engineering students from SESWA partner colleges',
      icon: GraduationCap,
      color: 'blue',
      path: '/student/register',
      features: [
        'Access to study materials and resources',
        'WBJEE counselling and guidance',
        'Scholarship information and support',
        'Annual picnic and freshers welcome events',
        'Peer networking and mentorship',
        'Career guidance and placement support'
      ],
      requirements: [
        'Currently enrolled in engineering college',
        'From one of our 14 partner institutions',
        'Valid student ID and college email',
        'Commitment to community values'
      ],
      badge: 'Most Popular',
      badgeColor: 'bg-blue-500'
    },
    {
      type: 'alumni',
      title: 'Alumni Membership',
      description: 'For graduated engineers and working professionals',
      icon: Briefcase,
      color: 'green',
      path: '/alumni/register',
      features: [
        'Professional networking opportunities',
        'Mentorship program participation',
        'Industry insights and job referrals',
        'Alumni events and reunions',
        'Give back to student community',
        'Leadership and volunteer opportunities'
      ],
      requirements: [
        'Graduated from engineering college',
        'Preferably from SESWA partner institutions',
        'Professional work experience',
        'Willingness to mentor students'
      ],
      badge: 'Professional',
      badgeColor: 'bg-green-500'
    },
    {
      type: 'representative',
      title: 'College Representative',
      description: 'For faculty, staff, and college coordinators',
      icon: Users,
      color: 'purple',
      path: '/representative/register',
      features: [
        'Coordinate SESWA activities at college',
        'Bridge between students and organization',
        'Organize campus events and programs',
        'Access to administrative resources',
        'Faculty and staff networking',
        'Student development initiatives'
      ],
      requirements: [
        'Faculty or staff at partner college',
        'Administrative or coordination role',
        'Commitment to student welfare',
        'Authorization from college administration'
      ],
      badge: 'Leadership',
      badgeColor: 'bg-purple-500'
    }
  ];

  const benefits = [
    {
      icon: GraduationCap,
      title: 'Academic Excellence',
      description: 'Access to study materials, WBJEE guidance, and scholarship information'
    },
    {
      icon: Users,
      title: 'Strong Community',
      description: 'Connect with 1000+ Santal engineering students and professionals'
    },
    {
      icon: Star,
      title: 'Cultural Heritage',
      description: 'Preserve and promote Santal culture while pursuing engineering careers'
    },
    {
      icon: Briefcase,
      title: 'Career Growth',
      description: 'Job opportunities, internships, and professional development support'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <Logo size="lg" />
          </div>
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-gray-900 mb-6">
            Join the SESWA Family
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Become part of the largest community of Santal engineering students and professionals. 
            Together, we support academic excellence while preserving our rich cultural heritage.
          </p>
          <div className="flex items-center justify-center space-x-8 text-sm text-gray-600">
            <div className="flex items-center">
              <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
              <span>Established 2003</span>
            </div>
            <div className="flex items-center">
              <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
              <span>14 Partner Colleges</span>
            </div>
            <div className="flex items-center">
              <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
              <span>1000+ Members</span>
            </div>
          </div>
        </div>

        {/* Membership Options */}
        <div className="mb-16">
          <h2 className="text-3xl font-heading font-bold text-gray-900 text-center mb-12">
            Choose Your Membership Type
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {membershipOptions.map((option) => (
              <div
                key={option.type}
                className="relative bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border-2 border-transparent hover:border-primary-200"
              >
                {/* Badge */}
                {option.badge && (
                  <div className={`absolute top-4 right-4 ${option.badgeColor} text-white text-xs font-bold px-3 py-1 rounded-full`}>
                    {option.badge}
                  </div>
                )}

                <div className="p-8">
                  {/* Icon and Title */}
                  <div className="text-center mb-6">
                    <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-4 bg-${option.color}-100`}>
                      <option.icon className={`h-8 w-8 text-${option.color}-600`} />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      {option.title}
                    </h3>
                    <p className="text-gray-600">
                      {option.description}
                    </p>
                  </div>

                  {/* Features */}
                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-900 mb-3">What you get:</h4>
                    <ul className="space-y-2">
                      {option.features.map((feature, index) => (
                        <li key={index} className="flex items-start">
                          <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                          <span className="text-sm text-gray-600">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Requirements */}
                  <div className="mb-8">
                    <h4 className="font-semibold text-gray-900 mb-3">Requirements:</h4>
                    <ul className="space-y-1">
                      {option.requirements.map((requirement, index) => (
                        <li key={index} className="text-sm text-gray-600">
                          • {requirement}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* CTA Button */}
                  <Link
                    to={option.path}
                    className={`w-full inline-flex items-center justify-center bg-${option.color}-600 hover:bg-${option.color}-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 group`}
                  >
                    Join as {option.type === 'college_representative' ? 'Representative' : option.type.charAt(0).toUpperCase() + option.type.slice(1)}
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Benefits Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-heading font-bold text-gray-900 text-center mb-12">
            Why Join SESWA?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary-100 mb-4">
                  <benefit.icon className="h-6 w-6 text-primary-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {benefit.title}
                </h3>
                <p className="text-gray-600 text-sm">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Our Colleges Section */}
        <div className="mb-16 bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-3xl font-heading font-bold text-gray-900 text-center mb-8">
            Our Partner Colleges
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4 text-center">
            {[
              'IIEST Shibpur', 'NIT Durgapur', 'IIT Kgp', 'JU', 'KGEC', 'JGEC', 'CGEC',
              'MAKAUT', 'UIT', 'GCELT', 'GCECT', 'GCETT B', 'GCETT S', 'RKMGCE'
            ].map((college, index) => (
              <div key={index} className="p-3 bg-gray-50 rounded-lg">
                <span className="text-sm font-medium text-gray-700">{college}</span>
              </div>
            ))}
          </div>
          <div className="text-center mt-6">
            <Link
              to="/colleges"
              className="text-primary-600 hover:text-primary-700 font-medium"
            >
              View all colleges →
            </Link>
          </div>
        </div>

        {/* Already a Member */}
        <div className="text-center bg-primary-600 text-white rounded-xl p-8">
          <h2 className="text-2xl font-heading font-bold mb-4">
            Already a Member?
          </h2>
          <p className="text-primary-100 mb-6">
            Sign in to access your account and connect with the community.
          </p>
          <Link
            to="/login"
            className="inline-flex items-center bg-white text-primary-600 hover:bg-primary-50 font-semibold py-3 px-8 rounded-lg transition-colors duration-200"
          >
            Sign In
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>

        {/* Contact Section */}
        <div className="mt-12 text-center">
          <p className="text-gray-600 mb-4">
            Have questions about membership? Need help with registration?
          </p>
          <Link
            to="/contact"
            className="text-primary-600 hover:text-primary-700 font-medium"
          >
            Contact us for support →
          </Link>
        </div>
      </div>
    </div>
  );
};

export default JoinUsPage;
