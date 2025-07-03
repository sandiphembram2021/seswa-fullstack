import React from 'react';
import ConnectionTest from '../components/ConnectionTest';

const ConnectionTestPage = () => {
  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            🔗 SESWA Platform Connection Test
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            This page tests the connection between your frontend (Vercel) and backend (Render). 
            Use this to verify that your deployment is working correctly.
          </p>
        </div>
        
        <ConnectionTest />
        
        <div className="mt-8 max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">🚀 Your SESWA Platform URLs</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-4 border border-gray-200 rounded-lg">
                <h3 className="font-semibold text-gray-700 mb-2">🎨 Frontend (Vercel)</h3>
                <a 
                  href="https://santal-welfare-association-s6yt.vercel.app/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 underline break-all"
                >
                  https://santal-welfare-association-s6yt.vercel.app/
                </a>
                <p className="text-sm text-gray-600 mt-2">
                  Your React frontend hosted on Vercel with automatic deployments.
                </p>
              </div>
              
              <div className="p-4 border border-gray-200 rounded-lg">
                <h3 className="font-semibold text-gray-700 mb-2">⚙️ Backend (Render)</h3>
                <a 
                  href="https://seswa-backend.onrender.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 underline break-all"
                >
                  https://seswa-backend.onrender.com
                </a>
                <p className="text-sm text-gray-600 mt-2">
                  Your Node.js API hosted on Render free tier (may sleep when inactive).
                </p>
              </div>
            </div>
            
            <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <h3 className="font-semibold text-yellow-800 mb-2">⚠️ Important Notes</h3>
              <ul className="text-sm text-yellow-700 space-y-1">
                <li>• <strong>Render Free Tier:</strong> Backend sleeps after 15 minutes of inactivity</li>
                <li>• <strong>Wake-up Time:</strong> First request after sleeping takes 30-60 seconds</li>
                <li>• <strong>CORS Configured:</strong> Frontend can communicate with backend</li>
                <li>• <strong>Auto Wake-up:</strong> Frontend automatically wakes up sleeping backend</li>
              </ul>
            </div>
            
            <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
              <h3 className="font-semibold text-green-800 mb-2">✅ What's Working</h3>
              <ul className="text-sm text-green-700 space-y-1">
                <li>• <strong>Frontend Deployment:</strong> React app deployed on Vercel</li>
                <li>• <strong>Backend Deployment:</strong> Node.js API deployed on Render</li>
                <li>• <strong>Environment Variables:</strong> API URL configured correctly</li>
                <li>• <strong>CORS Setup:</strong> Cross-origin requests enabled</li>
                <li>• <strong>Auto Wake-up:</strong> Smart backend wake-up system</li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="mt-8 text-center">
          <a 
            href="/" 
            className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            ← Back to Homepage
          </a>
        </div>
      </div>
    </div>
  );
};

export default ConnectionTestPage;
