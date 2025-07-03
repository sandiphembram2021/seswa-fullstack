import React, { useState } from 'react';
import ManualApiTester from '../components/ManualApiTester';
import ConfigChecker from '../components/ConfigChecker';
import BackendWakeup from '../components/BackendWakeup';
import DeploymentStatus from '../components/DeploymentStatus';

const ManualApiTestPage = () => {
  const [showCurlExamples, setShowCurlExamples] = useState(false);

  const curlExamples = [
    {
      title: "Backend Health Check",
      command: "curl -X GET https://seswa-backend.onrender.com/health",
      description: "Check if the backend server is running and healthy"
    },
    {
      title: "API Status",
      command: "curl -X GET https://seswa-backend.onrender.com/api/status",
      description: "Get API status and available endpoints"
    },
    {
      title: "Get All Events",
      command: "curl -X GET https://seswa-backend.onrender.com/api/events",
      description: "Fetch all available events (public endpoint)"
    },
    {
      title: "Get All Magazines",
      command: "curl -X GET https://seswa-backend.onrender.com/api/magazines",
      description: "Fetch all published magazines (public endpoint)"
    },
    {
      title: "User Registration",
      command: `curl -X POST https://seswa-backend.onrender.com/api/auth/register \\
  -H "Content-Type: application/json" \\
  -d '{
    "firstName": "John",
    "lastName": "Doe",
    "email": "john.doe@example.com",
    "password": "password123",
    "userType": "student",
    "college": "IIEST Shibpur",
    "branch": "Computer Science",
    "year": "3rd Year"
  }'`,
      description: "Register a new user account"
    },
    {
      title: "User Login",
      command: `curl -X POST https://seswa-backend.onrender.com/api/auth/login \\
  -H "Content-Type: application/json" \\
  -d '{
    "email": "john.doe@example.com",
    "password": "password123"
  }'`,
      description: "Login with user credentials"
    },
    {
      title: "Get User Profile (with auth)",
      command: `curl -X GET https://seswa-backend.onrender.com/api/users/profile \\
  -H "Authorization: Bearer YOUR_JWT_TOKEN_HERE"`,
      description: "Get current user profile (requires authentication)"
    },
    {
      title: "Create New Event (with auth)",
      command: `curl -X POST https://seswa-backend.onrender.com/api/events \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer YOUR_JWT_TOKEN_HERE" \\
  -d '{
    "title": "Test Event",
    "description": "This is a test event",
    "date": "2024-12-31",
    "time": "18:00",
    "location": "Online",
    "category": "workshop",
    "maxParticipants": 50
  }'`,
      description: "Create a new event (requires authentication)"
    }
  ];

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    // You could add a toast notification here
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            🔧 Manual RESTful API Testing
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Test your SESWA backend API manually using our interactive tester or command-line tools. 
            This page helps you verify that your frontend can communicate with the backend using RESTful API calls.
          </p>
        </div>

        {/* Deployment Status */}
        <DeploymentStatus />

        {/* Configuration Checker */}
        <ConfigChecker />

        {/* Backend Wake-up Service */}
        <BackendWakeup />

        {/* Interactive API Tester */}
        <div className="mb-8">
          <ManualApiTester />
        </div>

        {/* cURL Examples Section */}
        <div className="max-w-6xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-800">💻 Command Line Examples (cURL)</h2>
              <button
                onClick={() => setShowCurlExamples(!showCurlExamples)}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                {showCurlExamples ? 'Hide' : 'Show'} cURL Examples
              </button>
            </div>

            {showCurlExamples && (
              <div className="space-y-6">
                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <h3 className="font-semibold text-blue-800 mb-2">📋 How to Use cURL</h3>
                  <p className="text-sm text-blue-700 mb-2">
                    Copy and paste these commands into your terminal/command prompt to test the API directly:
                  </p>
                  <ul className="text-sm text-blue-700 space-y-1">
                    <li>• <strong>Windows:</strong> Use Command Prompt or PowerShell</li>
                    <li>• <strong>Mac/Linux:</strong> Use Terminal</li>
                    <li>• <strong>Online:</strong> Use tools like Postman or Insomnia</li>
                  </ul>
                </div>

                {curlExamples.map((example, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg">
                    <div className="p-4 bg-gray-50 border-b border-gray-200">
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold text-gray-800">{example.title}</h3>
                        <button
                          onClick={() => copyToClipboard(example.command)}
                          className="px-3 py-1 bg-gray-600 text-white text-sm rounded hover:bg-gray-700"
                        >
                          📋 Copy
                        </button>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">{example.description}</p>
                    </div>
                    <div className="p-4">
                      <pre className="text-sm text-gray-800 overflow-x-auto bg-gray-100 p-3 rounded border">
                        {example.command}
                      </pre>
                    </div>
                  </div>
                ))}

                <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <h3 className="font-semibold text-yellow-800 mb-2">⚠️ Important Notes</h3>
                  <ul className="text-sm text-yellow-700 space-y-1">
                    <li>• Replace <code>YOUR_JWT_TOKEN_HERE</code> with actual JWT token from login response</li>
                    <li>• Backend may be sleeping on first request (Render free tier) - wait 30-60 seconds</li>
                    <li>• Some endpoints require authentication (JWT token in Authorization header)</li>
                    <li>• Check browser console for detailed error messages</li>
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* RESTful API Principles */}
        <div className="mt-8 max-w-6xl mx-auto bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">📚 RESTful API Principles</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-gray-700 mb-3">🔗 HTTP Methods</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><strong>GET:</strong> Retrieve data (read-only)</li>
                <li><strong>POST:</strong> Create new resources</li>
                <li><strong>PUT:</strong> Update existing resources</li>
                <li><strong>DELETE:</strong> Remove resources</li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold text-gray-700 mb-3">📊 Status Codes</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><strong>200:</strong> Success</li>
                <li><strong>201:</strong> Created</li>
                <li><strong>400:</strong> Bad Request</li>
                <li><strong>401:</strong> Unauthorized</li>
                <li><strong>404:</strong> Not Found</li>
                <li><strong>500:</strong> Server Error</li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold text-gray-700 mb-3">🔐 Authentication</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><strong>JWT Token:</strong> Bearer authentication</li>
                <li><strong>Header:</strong> Authorization: Bearer {'{token}'}</li>
                <li><strong>Login:</strong> POST /api/auth/login</li>
                <li><strong>Register:</strong> POST /api/auth/register</li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold text-gray-700 mb-3">📡 CORS</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><strong>Origin:</strong> Frontend domain allowed</li>
                <li><strong>Credentials:</strong> Cookies/auth included</li>
                <li><strong>Methods:</strong> GET, POST, PUT, DELETE</li>
                <li><strong>Headers:</strong> Content-Type, Authorization</li>
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

export default ManualApiTestPage;
