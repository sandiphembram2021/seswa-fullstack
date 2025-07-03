import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Shield, Eye, EyeOff, AlertCircle, Lock, User, ArrowLeft } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useNotifications } from '../contexts/NotificationContext';

const AdminLoginPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    gbMemberCode: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showQuickAccess, setShowQuickAccess] = useState(false);

  const { login } = useAuth();
  const { createSystemNotification } = useNotifications();
  const navigate = useNavigate();

  // GB Member verification codes and accounts (in real app, this would be server-side)
  const validGBMembers = {
    'GB2024SESWA001': {
      email: 'admin@seswa.org',
      password: 'admin123',
      name: 'Dr. Rajesh Murmu',
      position: 'President',
      permissions: ['all']
    },
    'GB2024SESWA002': {
      email: 'secretary@seswa.org',
      password: 'secretary123',
      name: 'Priya Hansda',
      position: 'Secretary',
      permissions: ['users', 'events', 'analytics']
    },
    'GB2024SESWA003': {
      email: 'treasurer@seswa.org',
      password: 'treasurer123',
      name: 'Amit Soren',
      position: 'Treasurer',
      permissions: ['analytics', 'events', 'system']
    },
    'GB2024SESWA004': {
      email: 'vicepresident@seswa.org',
      password: 'vp123',
      name: 'Dr. Anjali Kisku',
      position: 'Vice President',
      permissions: ['users', 'events', 'magazines', 'analytics']
    },
    'GB2024SESWA005': {
      email: 'executive@seswa.org',
      password: 'exec123',
      name: 'Suresh Tudu',
      position: 'Executive Member',
      permissions: ['events', 'magazines']
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setError('');
  };

  const quickLogin = (gbCode) => {
    const gbMember = validGBMembers[gbCode];
    setFormData({
      email: gbMember.email,
      password: gbMember.password,
      gbMemberCode: gbCode
    });
    setShowQuickAccess(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Validate GB Member Code format
      if (!formData.gbMemberCode.match(/^GB2024SESWA\d{3}$/)) {
        throw new Error('Invalid GB Member Code format. Use format: GB2024SESWA001');
      }

      // Validate GB Member Code exists
      const gbMember = validGBMembers[formData.gbMemberCode];
      if (!gbMember) {
        throw new Error('Invalid GB Member Code. Access denied.');
      }

      // Validate credentials match the GB member
      if (formData.email !== gbMember.email) {
        throw new Error(`Invalid email for GB code ${formData.gbMemberCode}. Expected: ${gbMember.email}`);
      }

      // Use the standard login flow
      const result = await login(formData.email, formData.password);

      if (result.success) {
        createSystemNotification(
          'Admin Login Successful',
          `Welcome ${result.data.user.fullName}!`,
          'high'
        );

        navigate('/admin/portal');
      } else {
        throw new Error(result.error || 'Login failed');
      }
    } catch (error) {
      setError(error.message);
      createSystemNotification(
        'Admin Login Failed',
        error.message,
        'high'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Back to Home */}
        <div className="text-center">
          <Link 
            to="/" 
            className="inline-flex items-center text-red-600 hover:text-red-700 font-medium"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Link>
        </div>

        {/* Header */}
        <div className="text-center">
          <div className="mx-auto h-16 w-16 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center">
            <Shield className="h-8 w-8 text-white" />
          </div>
          <h2 className="mt-6 text-3xl font-bold text-gray-900">
            Admin Portal Access
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Restricted access for GB members only
          </p>
        </div>

        {/* Security Notice */}
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-start">
            <AlertCircle className="h-5 w-5 text-red-600 mt-0.5 mr-3 flex-shrink-0" />
            <div>
              <h3 className="text-sm font-medium text-red-800">
                Authorized Access Only
              </h3>
              <p className="text-sm text-red-700 mt-1">
                This portal is restricted to SESWA Governing Body members. 
                Unauthorized access attempts are logged and monitored.
              </p>
            </div>
          </div>
        </div>

        {/* Login Form */}
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="bg-white rounded-lg shadow-md p-6 space-y-4">
            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Admin Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  placeholder="admin@seswa.org"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Admin Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={formData.password}
                  onChange={handleInputChange}
                  className="block w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  placeholder="Enter admin password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  )}
                </button>
              </div>
            </div>

            {/* GB Member Code Field */}
            <div>
              <label htmlFor="gbMemberCode" className="block text-sm font-medium text-gray-700 mb-2">
                GB Member Code
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Shield className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="gbMemberCode"
                  name="gbMemberCode"
                  type="text"
                  required
                  value={formData.gbMemberCode}
                  onChange={handleInputChange}
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  placeholder="GB2024SESWA001"
                />
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Enter your unique GB member verification code
              </p>
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                <div className="flex items-center">
                  <AlertCircle className="h-4 w-4 text-red-600 mr-2" />
                  <span className="text-sm text-red-700">{error}</span>
                </div>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
            >
              {loading ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Verifying Access...
                </div>
              ) : (
                <div className="flex items-center">
                  <Shield className="h-4 w-4 mr-2" />
                  Access Admin Portal
                </div>
              )}
            </button>
          </div>
        </form>

        {/* Quick Access */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-medium text-blue-800">Quick Access</h3>
            <button
              onClick={() => setShowQuickAccess(!showQuickAccess)}
              className="text-blue-600 hover:text-blue-700 text-sm font-medium"
            >
              {showQuickAccess ? 'Hide' : 'Show'} GB Accounts
            </button>
          </div>

          {showQuickAccess && (
            <div className="space-y-2">
              {Object.entries(validGBMembers).map(([code, member]) => (
                <button
                  key={code}
                  onClick={() => quickLogin(code)}
                  className="w-full text-left p-3 bg-white border border-blue-200 rounded-lg hover:bg-blue-50 transition-colors duration-200"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-blue-900">{member.name}</p>
                      <p className="text-xs text-blue-700">{member.position}</p>
                    </div>
                    <span className="text-xs text-blue-600 font-mono">{code}</span>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Demo Credentials */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <h3 className="text-sm font-medium text-yellow-800 mb-3">Manual Login Credentials</h3>
          <div className="text-xs text-yellow-700 space-y-3">
            <div className="border-b border-yellow-200 pb-2">
              <p><strong>President:</strong> admin@seswa.org / admin123 / GB2024SESWA001</p>
              <p className="text-yellow-600">Dr. Rajesh Murmu - Full Access</p>
            </div>
            <div className="border-b border-yellow-200 pb-2">
              <p><strong>Secretary:</strong> secretary@seswa.org / secretary123 / GB2024SESWA002</p>
              <p className="text-yellow-600">Priya Hansda - Users, Events, Analytics</p>
            </div>
            <div className="border-b border-yellow-200 pb-2">
              <p><strong>Treasurer:</strong> treasurer@seswa.org / treasurer123 / GB2024SESWA003</p>
              <p className="text-yellow-600">Amit Soren - Analytics, Events, System</p>
            </div>
            <div className="border-b border-yellow-200 pb-2">
              <p><strong>Vice President:</strong> vicepresident@seswa.org / vp123 / GB2024SESWA004</p>
              <p className="text-yellow-600">Dr. Anjali Kisku - Users, Events, Magazines, Analytics</p>
            </div>
            <div>
              <p><strong>Executive:</strong> executive@seswa.org / exec123 / GB2024SESWA005</p>
              <p className="text-yellow-600">Suresh Tudu - Events, Magazines</p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center">
          <p className="text-xs text-gray-500">
            © 2024 SESWA. All rights reserved. Unauthorized access is prohibited.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminLoginPage;
