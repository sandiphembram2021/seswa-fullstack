import React, { useState, useEffect } from 'react';
import { CheckCircle, XCircle, Loader, RefreshCw, Server, Database, Wifi } from 'lucide-react';
import api from '../services/api';

const BackendConnectionTest = () => {
  const [connectionStatus, setConnectionStatus] = useState({
    backend: 'testing',
    database: 'testing',
    api: 'testing'
  });
  const [testResults, setTestResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const addTestResult = (test, status, message, data = null) => {
    setTestResults(prev => [...prev, {
      id: Date.now(),
      test,
      status,
      message,
      data,
      timestamp: new Date().toLocaleTimeString()
    }]);
  };

  const testBackendConnection = async () => {
    setIsLoading(true);
    setTestResults([]);

    // Log environment info
    const apiBaseUrl = api.defaults.baseURL;
    console.log('🔍 Testing with API Base URL:', apiBaseUrl);

    try {
      // Test 1: Backend Health Check
      addTestResult('Backend Health', 'testing', 'Checking backend server...');

      const healthResponse = await api.get('/health');
      const healthData = healthResponse.data;

      setConnectionStatus(prev => ({ ...prev, backend: 'connected' }));
      addTestResult('Backend Health', 'success', 'Backend server is running', healthData);

      // Check database status from health response
      if (healthData.database === 'connected') {
        setConnectionStatus(prev => ({ ...prev, database: 'connected' }));
        addTestResult('Database', 'success', 'MongoDB Atlas connected', { database: healthData.database });
      } else {
        setConnectionStatus(prev => ({ ...prev, database: 'error' }));
        addTestResult('Database', 'error', 'Database not connected');
      }

      // Test 2: API Test Endpoint
      addTestResult('API Test', 'testing', 'Testing API endpoint...');

      const apiResponse = await api.get('/test');
      const apiData = apiResponse.data;

      setConnectionStatus(prev => ({ ...prev, api: 'connected' }));
      addTestResult('API Test', 'success', 'API endpoint working', apiData);

      // Test 3: Contact Form Endpoint
      addTestResult('Contact API', 'testing', 'Testing contact form endpoint...');

      const contactResponse = await api.post('/contact', {
        name: 'Test User',
        email: 'test@example.com',
        subject: 'Connection Test',
        message: 'This is a test message from the frontend connection test.'
      });

      const contactData = contactResponse.data;

      if (contactData.success) {
        addTestResult('Contact API', 'success', 'Contact form endpoint working', contactData);
      } else {
        addTestResult('Contact API', 'error', 'Contact form endpoint failed');
      }

    } catch (error) {
      setConnectionStatus(prev => ({ 
        ...prev, 
        backend: 'error', 
        database: 'error', 
        api: 'error' 
      }));
      addTestResult('Connection', 'error', `Connection failed: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    testBackendConnection();
  }, []);

  const getStatusIcon = (status) => {
    switch (status) {
      case 'connected':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'error':
        return <XCircle className="h-5 w-5 text-red-500" />;
      case 'testing':
        return <Loader className="h-5 w-5 text-blue-500 animate-spin" />;
      default:
        return <Wifi className="h-5 w-5 text-gray-400" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'connected':
        return 'text-green-600 bg-green-50 border-green-200';
      case 'error':
        return 'text-red-600 bg-red-50 border-red-200';
      case 'testing':
        return 'text-blue-600 bg-blue-50 border-blue-200';
      default:
        return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Backend Connection Test</h2>
          <button
            onClick={testBackendConnection}
            disabled={isLoading}
            className="flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50"
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
            {isLoading ? 'Testing...' : 'Retest'}
          </button>
        </div>

        {/* Connection Status Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className={`p-4 rounded-lg border ${getStatusColor(connectionStatus.backend)}`}>
            <div className="flex items-center">
              <Server className="h-6 w-6 mr-3" />
              <div>
                <h3 className="font-semibold">Backend Server</h3>
                <div className="flex items-center mt-1">
                  {getStatusIcon(connectionStatus.backend)}
                  <span className="ml-2 text-sm capitalize">{connectionStatus.backend}</span>
                </div>
              </div>
            </div>
          </div>

          <div className={`p-4 rounded-lg border ${getStatusColor(connectionStatus.database)}`}>
            <div className="flex items-center">
              <Database className="h-6 w-6 mr-3" />
              <div>
                <h3 className="font-semibold">MongoDB Atlas</h3>
                <div className="flex items-center mt-1">
                  {getStatusIcon(connectionStatus.database)}
                  <span className="ml-2 text-sm capitalize">{connectionStatus.database}</span>
                </div>
              </div>
            </div>
          </div>

          <div className={`p-4 rounded-lg border ${getStatusColor(connectionStatus.api)}`}>
            <div className="flex items-center">
              <Wifi className="h-6 w-6 mr-3" />
              <div>
                <h3 className="font-semibold">API Endpoints</h3>
                <div className="flex items-center mt-1">
                  {getStatusIcon(connectionStatus.api)}
                  <span className="ml-2 text-sm capitalize">{connectionStatus.api}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Test Results */}
        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-gray-900">Test Results</h3>
          {testResults.length === 0 ? (
            <p className="text-gray-500">No test results yet. Click "Retest" to run connection tests.</p>
          ) : (
            <div className="space-y-2">
              {testResults.map((result) => (
                <div
                  key={result.id}
                  className={`p-3 rounded-lg border ${getStatusColor(result.status)}`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      {getStatusIcon(result.status)}
                      <span className="ml-2 font-medium">{result.test}</span>
                    </div>
                    <span className="text-xs text-gray-500">{result.timestamp}</span>
                  </div>
                  <p className="mt-1 text-sm">{result.message}</p>
                  {result.data && (
                    <details className="mt-2">
                      <summary className="text-xs text-gray-600 cursor-pointer">View Response Data</summary>
                      <pre className="mt-1 text-xs bg-gray-100 p-2 rounded overflow-x-auto">
                        {JSON.stringify(result.data, null, 2)}
                      </pre>
                    </details>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Connection Info */}
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <h4 className="font-semibold text-gray-900 mb-2">Connection Information</h4>
          <div className="text-sm text-gray-600 space-y-1">
            <p><strong>API Base URL:</strong> {api.defaults.baseURL}</p>
            <p><strong>Environment:</strong> {import.meta.env.MODE}</p>
            <p><strong>Frontend URL:</strong> {window.location.origin}</p>
            <p><strong>Database:</strong> MongoDB Atlas (seswa-db)</p>
            <p><strong>VITE_API_URL:</strong> {import.meta.env.VITE_API_URL || 'Not set'}</p>
            <p><strong>VITE_REACT_APP_API_URL:</strong> {import.meta.env.VITE_REACT_APP_API_URL || 'Not set'}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BackendConnectionTest;
