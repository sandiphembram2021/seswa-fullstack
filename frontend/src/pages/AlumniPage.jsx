import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Briefcase, 
  GraduationCap, 
  Users, 
  Award, 
  MapPin, 
  Building, 
  Calendar,
  ArrowRight,
  Star,
  TrendingUp,
  Heart,
  Target
} from 'lucide-react';

const AlumniPage = () => {
  const [selectedYear, setSelectedYear] = useState('all');
  const [selectedCompany, setSelectedCompany] = useState('all');

  // Mock alumni data
  const featuredAlumni = [
    {
      id: 1,
      name: 'Dr. Rajesh Soren',
      graduationYear: 2010,
      college: 'IIT Kharagpur',
      branch: 'Computer Science Engineering',
      currentPosition: 'Senior Software Engineer',
      company: 'Google India',
      location: 'Bangalore',
      achievements: ['Tech Lead for Google Pay', 'Published 15+ research papers'],
      image: null
    },
    {
      id: 2,
      name: 'Priya Murmu',
      graduationYear: 2015,
      college: 'IIEST Shibpur',
      branch: 'Mechanical Engineering',
      currentPosition: 'Product Manager',
      company: 'Tesla',
      location: 'California, USA',
      achievements: ['Led Model 3 battery optimization', 'Forbes 30 Under 30'],
      image: null
    },
    {
      id: 3,
      name: 'Arjun Hansda',
      graduationYear: 2012,
      college: 'NIT Durgapur',
      branch: 'Civil Engineering',
      currentPosition: 'Project Director',
      company: 'L&T Construction',
      location: 'Mumbai',
      achievements: ['Led 5+ major infrastructure projects', 'Excellence in Engineering Award'],
      image: null
    },
    {
      id: 4,
      name: 'Sunita Marandi',
      graduationYear: 2018,
      college: 'Jadavpur University',
      branch: 'Electronics Engineering',
      currentPosition: 'Research Scientist',
      company: 'ISRO',
      location: 'Bangalore',
      achievements: ['Chandrayaan-3 mission contributor', 'Young Scientist Award'],
      image: null
    }
  ];

  const stats = [
    { icon: Users, label: 'Total Alumni', value: '500+', color: 'text-blue-600' },
    { icon: Building, label: 'Companies', value: '200+', color: 'text-green-600' },
    { icon: MapPin, label: 'Countries', value: '15+', color: 'text-purple-600' },
    { icon: Award, label: 'Industry Leaders', value: '50+', color: 'text-orange-600' }
  ];

  const benefits = [
    {
      icon: Users,
      title: 'Professional Network',
      description: 'Connect with 500+ alumni across various industries and locations worldwide.'
    },
    {
      icon: Briefcase,
      title: 'Career Opportunities',
      description: 'Access exclusive job openings and referrals from alumni in top companies.'
    },
    {
      icon: GraduationCap,
      title: 'Mentorship Program',
      description: 'Get guidance from experienced professionals in your field of interest.'
    },
    {
      icon: Heart,
      title: 'Give Back',
      description: 'Support current students through scholarships, guidance, and resources.'
    }
  ];

  const topCompanies = [
    'Google', 'Microsoft', 'Amazon', 'Tesla', 'ISRO', 'L&T', 'TCS', 'Infosys',
    'Wipro', 'IBM', 'Oracle', 'Samsung', 'Intel', 'Qualcomm', 'Adobe'
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-gray-900 mb-6">
            SESWA Alumni Network
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Our alumni are making their mark across the globe, from leading tech companies 
            to groundbreaking research institutions. Join our growing network of successful 
            Santal engineering professionals.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/alumni/register"
              className="bg-primary-600 hover:bg-primary-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-200 inline-flex items-center justify-center"
            >
              Join Alumni Network
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
            <Link
              to="/alumni/login"
              className="border-2 border-primary-600 text-primary-600 hover:bg-primary-50 font-semibold py-3 px-8 rounded-lg transition-colors duration-200"
            >
              Alumni Login
            </Link>
          </div>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md p-6 text-center">
              <stat.icon className={`h-8 w-8 mx-auto mb-3 ${stat.color}`} />
              <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
              <div className="text-sm text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Featured Alumni */}
        <div className="mb-16">
          <h2 className="text-3xl font-heading font-bold text-gray-900 text-center mb-12">
            Featured Alumni
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredAlumni.map((alumni) => (
              <div key={alumni.id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 overflow-hidden">
                <div className="p-6">
                  {/* Profile Image Placeholder */}
                  <div className="w-20 h-20 bg-gradient-to-br from-primary-400 to-primary-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <span className="text-white font-bold text-xl">
                      {alumni.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  
                  <h3 className="text-lg font-semibold text-gray-900 text-center mb-2">
                    {alumni.name}
                  </h3>
                  
                  <div className="text-center mb-4">
                    <p className="text-primary-600 font-medium text-sm">{alumni.currentPosition}</p>
                    <p className="text-gray-600 text-sm">{alumni.company}</p>
                    <p className="text-gray-500 text-xs">{alumni.location}</p>
                  </div>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-xs text-gray-600">
                      <GraduationCap className="h-3 w-3 mr-2" />
                      <span>{alumni.college} ({alumni.graduationYear})</span>
                    </div>
                    <div className="flex items-center text-xs text-gray-600">
                      <Award className="h-3 w-3 mr-2" />
                      <span>{alumni.branch}</span>
                    </div>
                  </div>

                  <div className="border-t pt-3">
                    <p className="text-xs text-gray-600 font-medium mb-1">Key Achievements:</p>
                    <ul className="text-xs text-gray-600 space-y-1">
                      {alumni.achievements.slice(0, 2).map((achievement, index) => (
                        <li key={index} className="flex items-start">
                          <Star className="h-2 w-2 mt-1 mr-1 text-yellow-500 flex-shrink-0" />
                          <span>{achievement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Companies */}
        <div className="mb-16 bg-white rounded-lg shadow-md p-8">
          <h2 className="text-3xl font-heading font-bold text-gray-900 text-center mb-8">
            Where Our Alumni Work
          </h2>
          <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-8 gap-4 text-center">
            {topCompanies.map((company, index) => (
              <div key={index} className="p-3 bg-gray-50 rounded-lg">
                <span className="text-sm font-medium text-gray-700">{company}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Benefits */}
        <div className="mb-16">
          <h2 className="text-3xl font-heading font-bold text-gray-900 text-center mb-12">
            Alumni Network Benefits
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

        {/* Success Stories */}
        <div className="mb-16 bg-primary-600 text-white rounded-lg p-8">
          <h2 className="text-3xl font-heading font-bold text-center mb-8">
            Success Stories
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <TrendingUp className="h-12 w-12 mx-auto mb-4 text-primary-200" />
              <h3 className="text-xl font-semibold mb-2">Career Growth</h3>
              <p className="text-primary-100 text-sm">
                85% of our alumni report significant career advancement within 5 years of graduation.
              </p>
            </div>
            <div className="text-center">
              <Target className="h-12 w-12 mx-auto mb-4 text-primary-200" />
              <h3 className="text-xl font-semibold mb-2">Industry Impact</h3>
              <p className="text-primary-100 text-sm">
                Our alumni lead major projects in Fortune 500 companies and cutting-edge startups.
              </p>
            </div>
            <div className="text-center">
              <Heart className="h-12 w-12 mx-auto mb-4 text-primary-200" />
              <h3 className="text-xl font-semibold mb-2">Giving Back</h3>
              <p className="text-primary-100 text-sm">
                Alumni have contributed ₹50+ lakhs in scholarships and mentorship programs.
              </p>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-heading font-bold text-gray-900 mb-4">
            Ready to Join Our Alumni Network?
          </h2>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Connect with fellow SESWA graduates, access exclusive opportunities, 
            and help shape the future of our community.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/alumni/register"
              className="bg-primary-600 hover:bg-primary-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-200 inline-flex items-center justify-center"
            >
              Register as Alumni
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
            <Link
              to="/contact"
              className="border-2 border-gray-300 text-gray-700 hover:bg-gray-50 font-semibold py-3 px-8 rounded-lg transition-colors duration-200"
            >
              Contact Alumni Relations
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlumniPage;
