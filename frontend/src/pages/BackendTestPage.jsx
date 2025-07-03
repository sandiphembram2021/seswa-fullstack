import React from 'react';
import BackendConnectionTest from '../components/BackendConnectionTest';

const BackendTestPage = () => {
  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            SESWA Backend Connection Test
          </h1>
          <p className="text-lg text-gray-600">
            Test the connection between frontend and backend services
          </p>
        </div>
        
        <BackendConnectionTest />
        
        <div className="mt-8 text-center">
          <a
            href="/"
            className="inline-flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
          >
            ← Back to Homepage
          </a>
        </div>
      </div>
    </div>
  );
};

export default BackendTestPage;
