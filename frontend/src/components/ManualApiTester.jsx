import React, { useState } from 'react';
import {
  makeApiCall,
  testBackendHealth,
  testApiStatus,
  authApiTests,
  eventApiTests,
  magazineApiTests,
  runFullApiTest
} from '../utils/manualApiTest';

const ManualApiTester = () => {
  const [results, setResults] = useState({});
  const [loading, setLoading] = useState({});
  const [customEndpoint, setCustomEndpoint] = useState('/api/status');
  const [customMethod, setCustomMethod] = useState('GET');
  const [customBody, setCustomBody] = useState('');

  const runTest = async (testName, testFunction) => {
    setLoading(prev => ({ ...prev, [testName]: true }));
    try {
      const result = await testFunction();
      setResults(prev => ({ ...prev, [testName]: result }));
    } catch (error) {
      setResults(prev => ({ ...prev, [testName]: { error: error.message } }));
    }
    setLoading(prev => ({ ...prev, [testName]: false }));
  };

  const runCustomApiCall = async () => {
    setLoading(prev => ({ ...prev, custom: true }));
    try {
      let body = null;
      if (customBody.trim() && customMethod !== 'GET') {
        try {
          body = JSON.parse(customBody);
        } catch {
          body = customBody;
        }
      }

      const result = await makeApiCall(customEndpoint, {
        method: customMethod,
        body,
        includeAuth: true
      });
      setResults(prev => ({ ...prev, custom: result }));
    } catch (error) {
      setResults(prev => ({ ...prev, custom: { error: error.message } }));
    }
    setLoading(prev => ({ ...prev, custom: false }));
  };

  const getStatusColor = (result) => {
    if (!result) return 'text-gray-500';
    if (result.success) return 'text-green-600';
    if (result.error) return 'text-red-600';
    return 'text-yellow-600';
  };

  const getStatusIcon = (result) => {
    if (!result) return '⏳';
    if (result.success) return '✅';
    if (result.error) return '❌';
    return '⚠️';
  };

  const formatResult = (result) => {
    if (!result) return 'Not tested';
    return JSON.stringify(result, null, 2);
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        🔧 Manual RESTful API Tester
      </h2>
      
      <div className="mb-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <h3 className="font-semibold text-blue-800 mb-2">📡 API Configuration</h3>
        <p className="text-sm text-blue-700">
          <strong>Backend URL:</strong> {import.meta.env.VITE_API_URL || 'http://localhost:5000/api'}
        </p>
        <p className="text-sm text-blue-700">
          <strong>Environment:</strong> {import.meta.env.MODE}
        </p>
      </div>

      {/* Quick Tests */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        <div className="p-4 border border-gray-200 rounded-lg">
          <h3 className="font-semibold text-gray-700 mb-3">🏥 Backend Health</h3>
          <button
            onClick={() => runTest('health', testBackendHealth)}
            disabled={loading.health}
            className="w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50 mb-2"
          >
            {loading.health ? '🔄 Testing...' : '🏥 Test Health'}
          </button>
          <div className={`text-sm ${getStatusColor(results.health)}`}>
            {getStatusIcon(results.health)} {results.health?.success ? 'Healthy' : results.health?.error || 'Not tested'}
          </div>
        </div>

        <div className="p-4 border border-gray-200 rounded-lg">
          <h3 className="font-semibold text-gray-700 mb-3">📊 API Status</h3>
          <button
            onClick={() => runTest('status', testApiStatus)}
            disabled={loading.status}
            className="w-full px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50 mb-2"
          >
            {loading.status ? '🔄 Testing...' : '📊 Test Status'}
          </button>
          <div className={`text-sm ${getStatusColor(results.status)}`}>
            {getStatusIcon(results.status)} {results.status?.success ? 'API Ready' : results.status?.error || 'Not tested'}
          </div>
        </div>

        <div className="p-4 border border-gray-200 rounded-lg">
          <h3 className="font-semibold text-gray-700 mb-3">📅 Events API</h3>
          <button
            onClick={() => runTest('events', eventApiTests.getAllEvents)}
            disabled={loading.events}
            className="w-full px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 disabled:opacity-50 mb-2"
          >
            {loading.events ? '🔄 Testing...' : '📅 Get Events'}
          </button>
          <div className={`text-sm ${getStatusColor(results.events)}`}>
            {getStatusIcon(results.events)} {results.events?.success ? 'Events Loaded' : results.events?.error || 'Not tested'}
          </div>
        </div>

        <div className="p-4 border border-gray-200 rounded-lg">
          <h3 className="font-semibold text-gray-700 mb-3">📖 Magazines API</h3>
          <button
            onClick={() => runTest('magazines', magazineApiTests.getAllMagazines)}
            disabled={loading.magazines}
            className="w-full px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 disabled:opacity-50 mb-2"
          >
            {loading.magazines ? '🔄 Testing...' : '📖 Get Magazines'}
          </button>
          <div className={`text-sm ${getStatusColor(results.magazines)}`}>
            {getStatusIcon(results.magazines)} {results.magazines?.success ? 'Magazines Loaded' : results.magazines?.error || 'Not tested'}
          </div>
        </div>

        <div className="p-4 border border-gray-200 rounded-lg">
          <h3 className="font-semibold text-gray-700 mb-3">🚀 Full Test Suite</h3>
          <button
            onClick={() => runTest('fullTest', runFullApiTest)}
            disabled={loading.fullTest}
            className="w-full px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 disabled:opacity-50 mb-2"
          >
            {loading.fullTest ? '🔄 Running...' : '🚀 Run All Tests'}
          </button>
          <div className={`text-sm ${getStatusColor(results.fullTest)}`}>
            {getStatusIcon(results.fullTest)} {results.fullTest?.backend?.success ? 'Tests Complete' : results.fullTest?.error || 'Not tested'}
          </div>
        </div>
      </div>

      {/* Custom API Call */}
      <div className="mb-8 p-4 border border-gray-300 rounded-lg bg-gray-50">
        <h3 className="font-semibold text-gray-700 mb-4">🔧 Custom API Call</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Method</label>
            <select
              value={customMethod}
              onChange={(e) => setCustomMethod(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="GET">GET</option>
              <option value="POST">POST</option>
              <option value="PUT">PUT</option>
              <option value="DELETE">DELETE</option>
            </select>
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Endpoint</label>
            <input
              type="text"
              value={customEndpoint}
              onChange={(e) => setCustomEndpoint(e.target.value)}
              placeholder="/api/endpoint"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
        
        {customMethod !== 'GET' && (
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Request Body (JSON)</label>
            <textarea
              value={customBody}
              onChange={(e) => setCustomBody(e.target.value)}
              placeholder='{"key": "value"}'
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        )}
        
        <button
          onClick={runCustomApiCall}
          disabled={loading.custom}
          className="px-6 py-2 bg-gray-700 text-white rounded hover:bg-gray-800 disabled:opacity-50"
        >
          {loading.custom ? '🔄 Calling...' : '📡 Make API Call'}
        </button>
      </div>

      {/* Results Display */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-gray-800">📊 Test Results</h3>
        
        {Object.entries(results).map(([testName, result]) => (
          <div key={testName} className="border border-gray-200 rounded-lg">
            <div className="p-3 bg-gray-50 border-b border-gray-200 flex items-center justify-between">
              <span className="font-medium text-gray-700">
                {getStatusIcon(result)} {testName.charAt(0).toUpperCase() + testName.slice(1)} Test
              </span>
              <span className={`text-sm ${getStatusColor(result)}`}>
                {result?.success ? `✅ Success (${result.status})` : 
                 result?.error ? `❌ Failed` : 
                 '⏳ Pending'}
              </span>
            </div>
            <div className="p-3">
              <pre className="text-xs text-gray-600 overflow-auto max-h-40 bg-white p-2 rounded border">
                {formatResult(result)}
              </pre>
            </div>
          </div>
        ))}
      </div>

      {/* API Documentation */}
      <div className="mt-8 p-4 bg-green-50 border border-green-200 rounded-lg">
        <h3 className="font-semibold text-green-800 mb-2">📚 Available API Endpoints</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-green-700">
          <div>
            <strong>Authentication:</strong>
            <ul className="ml-4 mt-1 space-y-1">
              <li>• POST /api/auth/register</li>
              <li>• POST /api/auth/login</li>
              <li>• GET /api/auth/me</li>
              <li>• POST /api/auth/logout</li>
            </ul>
          </div>
          <div>
            <strong>Events:</strong>
            <ul className="ml-4 mt-1 space-y-1">
              <li>• GET /api/events</li>
              <li>• GET /api/events/:id</li>
              <li>• POST /api/events</li>
              <li>• POST /api/events/:id/register</li>
            </ul>
          </div>
          <div>
            <strong>Chat:</strong>
            <ul className="ml-4 mt-1 space-y-1">
              <li>• GET /api/chat</li>
              <li>• POST /api/chat</li>
              <li>• POST /api/chat/:id/messages</li>
              <li>• PUT /api/chat/:id/read</li>
            </ul>
          </div>
          <div>
            <strong>Magazines:</strong>
            <ul className="ml-4 mt-1 space-y-1">
              <li>• GET /api/magazines</li>
              <li>• GET /api/magazines/search</li>
              <li>• POST /api/magazines</li>
              <li>• GET /api/magazines/:id/download</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManualApiTester;
