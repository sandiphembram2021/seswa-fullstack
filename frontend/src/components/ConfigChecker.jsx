import React, { useState, useEffect } from 'react';

const ConfigChecker = () => {
  const [config, setConfig] = useState({});
  const [backendTest, setBackendTest] = useState({ status: 'testing', message: 'Testing...' });

  useEffect(() => {
    // Get configuration
    const apiUrl = import.meta.env.VITE_API_URL;
    const backendUrl = apiUrl ? apiUrl.replace('/api', '') : 'Not configured';
    
    setConfig({
      apiUrl: apiUrl || 'Not configured',
      backendUrl,
      environment: import.meta.env.MODE,
      frontendUrl: window.location.origin
    });

    // Test backend connection
    testBackend(backendUrl);
  }, []);

  const testBackend = async (backendUrl) => {
    if (!backendUrl || backendUrl === 'Not configured') {
      setBackendTest({ status: 'error', message: 'Backend URL not configured' });
      return;
    }

    try {
      setBackendTest({ status: 'testing', message: 'Testing backend connection...' });
      
      const response = await fetch(`${backendUrl}/health`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      });

      if (response.ok) {
        const data = await response.json();
        setBackendTest({ 
          status: 'success', 
          message: 'Backend is healthy and responding!',
          data 
        });
      } else {
        setBackendTest({ 
          status: 'error', 
          message: `Backend responded with error: ${response.status}` 
        });
      }
    } catch (error) {
      if (error.message.includes('fetch')) {
        setBackendTest({ 
          status: 'sleeping', 
          message: 'Backend appears to be sleeping (Render free tier). This is normal - it will wake up on first request.' 
        });
      } else {
        setBackendTest({ 
          status: 'error', 
          message: `Connection failed: ${error.message}` 
        });
      }
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'success': return 'text-green-600 bg-green-50 border-green-200';
      case 'testing': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'sleeping': return 'text-blue-600 bg-blue-50 border-blue-200';
      case 'error': return 'text-red-600 bg-red-50 border-red-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'success': return '✅';
      case 'testing': return '🔄';
      case 'sleeping': return '😴';
      case 'error': return '❌';
      default: return '🔗';
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg mb-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        ⚙️ Configuration Status
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="p-4 border border-gray-200 rounded-lg">
          <h3 className="font-semibold text-gray-700 mb-3">🎨 Frontend Configuration</h3>
          <div className="space-y-2 text-sm">
            <div><strong>URL:</strong> {config.frontendUrl}</div>
            <div><strong>Environment:</strong> {config.environment}</div>
            <div><strong>API URL:</strong> {config.apiUrl}</div>
          </div>
        </div>
        
        <div className="p-4 border border-gray-200 rounded-lg">
          <h3 className="font-semibold text-gray-700 mb-3">⚙️ Backend Configuration</h3>
          <div className="space-y-2 text-sm">
            <div><strong>Backend URL:</strong> {config.backendUrl}</div>
            <div><strong>Expected:</strong> https://seswa-backend.onrender.com</div>
            <div><strong>API Endpoint:</strong> {config.apiUrl}</div>
          </div>
        </div>
      </div>

      <div className={`p-4 rounded-lg border-2 ${getStatusColor(backendTest.status)}`}>
        <div className="flex items-center justify-between mb-2">
          <span className="font-semibold">Backend Connection Test:</span>
          <span className="text-2xl">{getStatusIcon(backendTest.status)}</span>
        </div>
        <p className="text-sm">{backendTest.message}</p>
        {backendTest.data && (
          <div className="mt-2 p-2 bg-white bg-opacity-50 rounded text-xs">
            <strong>Backend Info:</strong> {JSON.stringify(backendTest.data, null, 2)}
          </div>
        )}
      </div>

      {config.apiUrl !== 'https://seswa-backend.onrender.com/api' && (
        <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <h3 className="font-semibold text-yellow-800 mb-2">⚠️ Configuration Issue Detected</h3>
          <p className="text-sm text-yellow-700 mb-2">
            Your API URL is not pointing to the deployed backend. Expected: <code>https://seswa-backend.onrender.com/api</code>
          </p>
          <p className="text-sm text-yellow-700">
            Current: <code>{config.apiUrl}</code>
          </p>
          <div className="mt-2 p-2 bg-yellow-100 rounded text-xs">
            <strong>Fix:</strong> Update your <code>.env</code> file with: <code>VITE_API_URL=https://seswa-backend.onrender.com/api</code>
          </div>
        </div>
      )}

      {backendTest.status === 'sleeping' && (
        <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <h3 className="font-semibold text-blue-800 mb-2">💡 About Render Free Tier</h3>
          <p className="text-sm text-blue-700">
            Your backend is hosted on Render's free tier, which puts servers to sleep after 15 minutes of inactivity. 
            The first request after sleeping takes 30-60 seconds to wake up the server. This is completely normal!
          </p>
          <button
            onClick={() => testBackend(config.backendUrl)}
            className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm"
          >
            🔄 Retry Connection
          </button>
        </div>
      )}
    </div>
  );
};

export default ConfigChecker;
