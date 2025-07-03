import React, { useState, useEffect } from 'react';
import { testDeployedConnection, getDeploymentInfo } from '../utils/deploymentTest';

const DeploymentStatus = () => {
  const [deploymentInfo, setDeploymentInfo] = useState(null);
  const [testResults, setTestResults] = useState(null);
  const [testing, setTesting] = useState(false);

  useEffect(() => {
    const info = getDeploymentInfo();
    setDeploymentInfo(info);
    
    // Auto-test if deployed
    if (info.isDeployed) {
      runConnectionTest();
    }
  }, []);

  const runConnectionTest = async () => {
    setTesting(true);
    try {
      const results = await testDeployedConnection();
      setTestResults(results);
    } catch (error) {
      setTestResults({ error: error.message });
    }
    setTesting(false);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'healthy':
      case 'working':
      case 'success': return 'text-green-600';
      case 'testing': return 'text-yellow-600';
      case 'error': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'healthy':
      case 'working':
      case 'success': return '✅';
      case 'testing': return '🔄';
      case 'error': return '❌';
      default: return '⏳';
    }
  };

  if (!deploymentInfo) return null;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg mb-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        🚀 Deployment Status
      </h2>
      
      {/* Deployment Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="p-4 border border-gray-200 rounded-lg">
          <h3 className="font-semibold text-gray-700 mb-3">🎨 Frontend (Vercel)</h3>
          <div className="space-y-2 text-sm">
            <div><strong>URL:</strong> {deploymentInfo.frontendUrl}</div>
            <div><strong>Environment:</strong> {deploymentInfo.environment}</div>
            <div><strong>Deployed:</strong> {deploymentInfo.isDeployed ? '✅ Yes' : '❌ Local'}</div>
            <div><strong>Production:</strong> {deploymentInfo.isProduction ? '✅ Yes' : '❌ Development'}</div>
          </div>
        </div>
        
        <div className="p-4 border border-gray-200 rounded-lg">
          <h3 className="font-semibold text-gray-700 mb-3">⚙️ Backend (Render)</h3>
          <div className="space-y-2 text-sm">
            <div><strong>URL:</strong> https://seswa-backend.onrender.com</div>
            <div><strong>API:</strong> {deploymentInfo.backendUrl}</div>
            <div><strong>Status:</strong> {testResults?.backend?.status || 'Unknown'}</div>
            <div><strong>Tier:</strong> Free (may sleep)</div>
          </div>
        </div>
      </div>

      {/* Connection Test Results */}
      {testResults && (
        <div className="space-y-4 mb-6">
          <h3 className="font-semibold text-gray-700">🔗 Connection Test Results</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-3 border border-gray-200 rounded">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium">Backend Health</span>
                <span className={getStatusColor(testResults.backend?.status)}>
                  {getStatusIcon(testResults.backend?.status)}
                </span>
              </div>
              <div className="text-sm text-gray-600">
                {testResults.backend?.status === 'healthy' ? 'Server responding' : 
                 testResults.backend?.error || 'Testing...'}
              </div>
            </div>
            
            <div className="p-3 border border-gray-200 rounded">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium">CORS Config</span>
                <span className={getStatusColor(testResults.connection?.cors)}>
                  {getStatusIcon(testResults.connection?.cors)}
                </span>
              </div>
              <div className="text-sm text-gray-600">
                {testResults.connection?.cors === 'working' ? 'Cross-origin enabled' : 
                 testResults.connection?.corsError || 'Testing...'}
              </div>
            </div>
            
            <div className="p-3 border border-gray-200 rounded">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium">API Endpoints</span>
                <span className={getStatusColor(testResults.connection?.api)}>
                  {getStatusIcon(testResults.connection?.api)}
                </span>
              </div>
              <div className="text-sm text-gray-600">
                {testResults.connection?.apiTests ? 
                  `${Object.keys(testResults.connection.apiTests).length} endpoints tested` : 
                  'Testing...'}
              </div>
            </div>
          </div>

          {/* API Test Details */}
          {testResults.connection?.apiTests && (
            <div className="p-4 bg-gray-50 rounded-lg">
              <h4 className="font-medium text-gray-700 mb-2">API Endpoint Tests:</h4>
              <div className="space-y-1 text-sm">
                {Object.entries(testResults.connection.apiTests).map(([name, result]) => (
                  <div key={name} className="flex items-center justify-between">
                    <span>{name}:</span>
                    <span className={getStatusColor(result.status)}>
                      {getStatusIcon(result.status)} {result.status}
                      {result.dataLength && ` (${result.dataLength} items)`}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex gap-3 justify-center">
        <button
          onClick={runConnectionTest}
          disabled={testing}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {testing ? '🔄 Testing...' : '🧪 Test Connection'}
        </button>
        
        {deploymentInfo.isDeployed && (
          <a
            href="https://seswa-backend.onrender.com/health"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            🏥 Check Backend
          </a>
        )}
      </div>

      {/* Deployment Guide */}
      {deploymentInfo.isDeployed && (
        <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
          <h3 className="font-semibold text-green-800 mb-2">🎉 Deployment Active!</h3>
          <p className="text-sm text-green-700 mb-2">
            Your SESWA platform is deployed and accessible worldwide:
          </p>
          <ul className="text-sm text-green-700 space-y-1">
            <li>• <strong>Frontend:</strong> {deploymentInfo.frontendUrl}</li>
            <li>• <strong>Backend:</strong> https://seswa-backend.onrender.com</li>
            <li>• <strong>Auto-deployment:</strong> Enabled via Git push</li>
            <li>• <strong>HTTPS:</strong> Secured with SSL certificates</li>
          </ul>
        </div>
      )}

      {!deploymentInfo.isDeployed && (
        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <h3 className="font-semibold text-blue-800 mb-2">🔧 Local Development</h3>
          <p className="text-sm text-blue-700 mb-2">
            You're running in development mode. To deploy:
          </p>
          <ul className="text-sm text-blue-700 space-y-1">
            <li>• <strong>Frontend:</strong> Push to GitHub → Auto-deploy to Vercel</li>
            <li>• <strong>Backend:</strong> Push to GitHub → Auto-deploy to Render</li>
            <li>• <strong>Environment:</strong> Update production environment variables</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default DeploymentStatus;
