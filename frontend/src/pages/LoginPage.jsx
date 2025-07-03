import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { GraduationCap, Briefcase, Users, ArrowRight } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import Logo from '../components/Logo';

const LoginPage = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // Redirect if already authenticated
  React.useEffect(() => {
    if (isAuthenticated) {
      navigate('/', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const loginOptions = [
    {
      type: 'student',
      title: 'Student Login',
      description: 'Current engineering students from SESWA member colleges',
      icon: GraduationCap,
      color: 'blue',
      path: '/student/login'
    },
    {
      type: 'alumni',
      title: 'Alumni Login',
      description: 'Graduated engineers and working professionals',
      icon: Briefcase,
      color: 'green',
      path: '/alumni/login'
    },
    {
      type: 'representative',
      title: 'College Representative',
      description: 'Faculty, staff, and college coordinators',
      icon: Users,
      color: 'purple',
      path: '/representative/login'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <Logo size="lg" />
          </div>
          <h1 className="text-4xl font-heading font-bold text-gray-900 mb-4">
            Welcome to SESWA
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Choose your login type to access your SESWA account and connect with our community.
          </p>
        </div>

        {/* Login Options */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {loginOptions.map((option) => (
            <Link
              key={option.type}
              to={option.path}
              className="group bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-200 overflow-hidden border-2 border-transparent hover:border-primary-200"
            >
              <div className="p-8 text-center">
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-6 bg-${option.color}-100`}>
                  <option.icon className={`h-8 w-8 text-${option.color}-600`} />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {option.title}
                </h3>
                <p className="text-gray-600 text-sm mb-6">
                  {option.description}
                </p>
                <div className={`inline-flex items-center text-${option.color}-600 font-medium group-hover:text-${option.color}-700`}>
                  Sign In
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* New User Section */}
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <h2 className="text-2xl font-heading font-bold text-gray-900 mb-4">
            New to SESWA?
          </h2>
          <p className="text-gray-600 mb-6">
            Join our community of Santal engineering students, alumni, and professionals.
          </p>
          <Link
            to="/register"
            className="inline-flex items-center bg-primary-600 hover:bg-primary-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-200"
          >
            Create Account
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>

        {/* Admin Portal Access */}
        <div className="mt-8 bg-red-50 border border-red-200 rounded-lg p-6 text-center">
          <h3 className="text-lg font-semibold text-red-900 mb-2">
            SESWA Governing Body Members
          </h3>
          <p className="text-red-700 text-sm mb-4">
            Restricted access for GB members only
          </p>
          <Link
            to="/admin/login"
            className="inline-flex items-center bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors duration-200"
          >
            Admin Portal Access
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>

        {/* Additional Info */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-600">
            By signing in, you agree to our{' '}
            <Link to="/terms" className="text-primary-600 hover:text-primary-500">
              Terms of Service
            </Link>{' '}
            and{' '}
            <Link to="/privacy" className="text-primary-600 hover:text-primary-500">
              Privacy Policy
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
