import React, { useState, useEffect } from 'react';

const ConnectionTest = () => {
  const [status, setStatus] = useState({
    backend: 'testing',
    message: 'Checking connection...',
    details: null,
    lastChecked: null
  });

  const testConnection = async () => {
    setStatus(prev => ({ ...prev, backend: 'testing', message: 'Testing connection...' }));
    
    const backendUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
    console.log('🔗 Testing connection to:', backendUrl);

    try {
      // Test health endpoint
      const healthUrl = backendUrl.replace('/api', '') + '/health';
      console.log('🏥 Testing health endpoint:', healthUrl);
      
      const response = await fetch(healthUrl, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        console.log('✅ Backend health check passed:', data);
        
        setStatus({
          backend: 'connected',
          message: 'Backend is connected and healthy!',
          details: data,
          lastChecked: new Date().toLocaleTimeString()
        });
      } else {
        console.warn('⚠️ Backend responded with error:', response.status);
        setStatus({
          backend: 'error',
          message: `Backend error: ${response.status} ${response.statusText}`,
          details: { status: response.status, statusText: response.statusText },
          lastChecked: new Date().toLocaleTimeString()
        });
      }
    } catch (error) {
      console.error('❌ Connection failed:', error);
      
      if (error.name === 'TypeError' && error.message.includes('fetch')) {
        setStatus({
          backend: 'sleeping',
          message: 'Backend is sleeping (Render free tier). Click "Wake Up" to activate it.',
          details: { error: error.message, type: 'network_error' },
          lastChecked: new Date().toLocaleTimeString()
        });
      } else {
        setStatus({
          backend: 'failed',
          message: 'Connection failed: ' + error.message,
          details: { error: error.message },
          lastChecked: new Date().toLocaleTimeString()
        });
      }
    }
  };

  const wakeUpBackend = async () => {
    setStatus(prev => ({ ...prev, backend: 'waking', message: 'Waking up backend... This may take 30-60 seconds.' }));
    
    const backendUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
    const healthUrl = backendUrl.replace('/api', '') + '/health';
    
    // Try multiple times with delays
    for (let attempt = 1; attempt <= 3; attempt++) {
      try {
        console.log(`🔄 Wake-up attempt ${attempt}/3...`);
        setStatus(prev => ({ ...prev, message: `Wake-up attempt ${attempt}/3... Please wait.` }));
        
        const response = await fetch(healthUrl, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
          const data = await response.json();
          console.log('✅ Backend is awake!', data);
          setStatus({
            backend: 'connected',
            message: 'Backend successfully woken up and connected!',
            details: data,
            lastChecked: new Date().toLocaleTimeString()
          });
          return;
        }
      } catch (error) {
        console.warn(`⚠️ Attempt ${attempt} failed:`, error.message);
      }

      // Wait before next attempt
      if (attempt < 3) {
        await new Promise(resolve => setTimeout(resolve, 10000)); // 10 second delay
      }
    }

    setStatus({
      backend: 'failed',
      message: 'Failed to wake up backend after 3 attempts. Please try again later.',
      details: { attempts: 3 },
      lastChecked: new Date().toLocaleTimeString()
    });
  };

  useEffect(() => {
    testConnection();
  }, []);

  const getStatusColor = () => {
    switch (status.backend) {
      case 'connected': return 'text-green-600 bg-green-50 border-green-200';
      case 'testing': 
      case 'waking': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'sleeping': return 'text-blue-600 bg-blue-50 border-blue-200';
      case 'error':
      case 'failed': return 'text-red-600 bg-red-50 border-red-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getStatusIcon = () => {
    switch (status.backend) {
      case 'connected': return '✅';
      case 'testing': return '🔄';
      case 'waking': return '⏰';
      case 'sleeping': return '😴';
      case 'error':
      case 'failed': return '❌';
      default: return '🔗';
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        🔗 Frontend ↔️ Backend Connection Test
      </h2>
      
      <div className={`p-4 rounded-lg border-2 ${getStatusColor()} mb-6`}>
        <div className="flex items-center justify-between mb-2">
          <span className="font-semibold">Connection Status:</span>
          <span className="text-2xl">{getStatusIcon()}</span>
        </div>
        <p className="text-sm mb-2">{status.message}</p>
        {status.lastChecked && (
          <p className="text-xs opacity-75">Last checked: {status.lastChecked}</p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="p-3 bg-gray-50 rounded">
          <h3 className="font-semibold text-gray-700 mb-2">Frontend</h3>
          <p className="text-sm text-gray-600">URL: {window.location.origin}</p>
          <p className="text-sm text-gray-600">Environment: {import.meta.env.MODE}</p>
        </div>
        <div className="p-3 bg-gray-50 rounded">
          <h3 className="font-semibold text-gray-700 mb-2">Backend</h3>
          <p className="text-sm text-gray-600">URL: {import.meta.env.VITE_API_URL}</p>
          <p className="text-sm text-gray-600">Status: {status.backend}</p>
        </div>
      </div>

      <div className="flex gap-3 justify-center">
        <button
          onClick={testConnection}
          disabled={status.backend === 'testing' || status.backend === 'waking'}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          🔄 Test Connection
        </button>
        
        {(status.backend === 'sleeping' || status.backend === 'failed') && (
          <button
            onClick={wakeUpBackend}
            disabled={status.backend === 'waking'}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            ⏰ Wake Up Backend
          </button>
        )}
      </div>

      {status.details && (
        <div className="mt-6 p-3 bg-gray-100 rounded">
          <h3 className="font-semibold text-gray-700 mb-2">Details:</h3>
          <pre className="text-xs text-gray-600 overflow-auto">
            {JSON.stringify(status.details, null, 2)}
          </pre>
        </div>
      )}

      <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded">
        <h3 className="font-semibold text-blue-800 mb-2">💡 About Render Free Tier</h3>
        <p className="text-sm text-blue-700">
          Your backend is hosted on Render's free tier, which puts the server to sleep after 15 minutes of inactivity. 
          This is normal! The first request after sleeping takes 30-60 seconds to wake up the server.
        </p>
      </div>
    </div>
  );
};

export default ConnectionTest;
