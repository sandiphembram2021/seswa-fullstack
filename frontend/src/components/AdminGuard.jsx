import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Shield, AlertTriangle } from 'lucide-react';

const AdminGuard = ({ children }) => {
  const { user, isAuthenticated } = useAuth();

  // Check if user is authenticated
  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  // Check if user is admin/GB member
  if (!user || user.userType !== 'admin') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <div className="mx-auto h-16 w-16 bg-red-100 rounded-full flex items-center justify-center">
              <AlertTriangle className="h-8 w-8 text-red-600" />
            </div>
            <h2 className="mt-6 text-3xl font-bold text-gray-900">
              Access Denied
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              This area is restricted to SESWA Governing Body members only.
            </p>
          </div>
          
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex items-start">
              <Shield className="h-5 w-5 text-red-600 mt-0.5 mr-3 flex-shrink-0" />
              <div>
                <h3 className="text-sm font-medium text-red-800">
                  Unauthorized Access Attempt
                </h3>
                <p className="text-sm text-red-700 mt-1">
                  You do not have the required permissions to access the admin portal. 
                  If you believe this is an error, please contact the system administrator.
                </p>
              </div>
            </div>
          </div>

          <div className="text-center space-y-4">
            <button
              onClick={() => window.history.back()}
              className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              Go Back
            </button>
            
            <p className="text-xs text-gray-500">
              Current user type: {user?.userType || 'Unknown'}
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Check if admin user is approved (in real app, this would be checked server-side)
  if (user.userType === 'admin' && !user.isApproved) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <div className="mx-auto h-16 w-16 bg-yellow-100 rounded-full flex items-center justify-center">
              <Shield className="h-8 w-8 text-yellow-600" />
            </div>
            <h2 className="mt-6 text-3xl font-bold text-gray-900">
              Approval Pending
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Your GB member account is pending approval.
            </p>
          </div>
          
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <div className="flex items-start">
              <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5 mr-3 flex-shrink-0" />
              <div>
                <h3 className="text-sm font-medium text-yellow-800">
                  Account Under Review
                </h3>
                <p className="text-sm text-yellow-700 mt-1">
                  Your GB member registration is currently being reviewed by the system administrator. 
                  You will receive a notification once your account is approved.
                </p>
              </div>
            </div>
          </div>

          <div className="text-center">
            <button
              onClick={() => window.history.back()}
              className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
            >
              Go Back
            </button>
          </div>
        </div>
      </div>
    );
  }

  // User is authenticated and authorized
  return children;
};

export default AdminGuard;
