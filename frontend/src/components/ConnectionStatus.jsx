import React, { useState, useEffect } from 'react';
import { testBackendConnection, testCORSConnection } from '../utils/testConnection';

const ConnectionStatus = () => {
  const [connectionStatus, setConnectionStatus] = useState({
    backend: { success: null, loading: true },
    cors: { success: null, loading: true },
    lastChecked: null
  });

  const checkConnection = async () => {
    setConnectionStatus(prev => ({
      ...prev,
      backend: { ...prev.backend, loading: true },
      cors: { ...prev.cors, loading: true }
    }));

    try {
      const [backendResult, corsResult] = await Promise.all([
        testBackendConnection(),
        testCORSConnection()
      ]);

      setConnectionStatus({
        backend: { ...backendResult, loading: false },
        cors: { ...corsResult, loading: false },
        lastChecked: new Date().toLocaleTimeString()
      });
    } catch (error) {
      console.error('Connection test failed:', error);
      setConnectionStatus(prev => ({
        backend: { success: false, error: error.message, loading: false },
        cors: { success: false, error: error.message, loading: false },
        lastChecked: new Date().toLocaleTimeString()
      }));
    }
  };

  useEffect(() => {
    checkConnection();
    // Check connection every 30 seconds
    const interval = setInterval(checkConnection, 30000);
    return () => clearInterval(interval);
  }, []);

  const getStatusIcon = (status) => {
    if (status.loading) return '🔄';
    if (status.success) return '✅';
    return '❌';
  };

  const getStatusColor = (status) => {
    if (status.loading) return 'text-yellow-600';
    if (status.success) return 'text-green-600';
    return 'text-red-600';
  };

  return (
    <div className="fixed bottom-4 right-4 bg-white shadow-lg rounded-lg p-4 border max-w-sm z-50">
      <div className="flex items-center justify-between mb-2">
        <h3 className="font-semibold text-gray-800">Connection Status</h3>
        <button
          onClick={checkConnection}
          className="text-blue-600 hover:text-blue-800 text-sm"
          disabled={connectionStatus.backend.loading || connectionStatus.cors.loading}
        >
          Refresh
        </button>
      </div>
      
      <div className="space-y-2 text-sm">
        <div className="flex items-center justify-between">
          <span>Backend API:</span>
          <span className={`flex items-center ${getStatusColor(connectionStatus.backend)}`}>
            {getStatusIcon(connectionStatus.backend)}
            <span className="ml-1">
              {connectionStatus.backend.loading ? 'Checking...' : 
               connectionStatus.backend.success ? 'Connected' : 'Failed'}
            </span>
          </span>
        </div>
        
        <div className="flex items-center justify-between">
          <span>CORS Config:</span>
          <span className={`flex items-center ${getStatusColor(connectionStatus.cors)}`}>
            {getStatusIcon(connectionStatus.cors)}
            <span className="ml-1">
              {connectionStatus.cors.loading ? 'Checking...' : 
               connectionStatus.cors.success ? 'Working' : 'Issues'}
            </span>
          </span>
        </div>
        
        {connectionStatus.lastChecked && (
          <div className="text-xs text-gray-500 pt-1 border-t">
            Last checked: {connectionStatus.lastChecked}
          </div>
        )}
        
        <div className="text-xs text-gray-600 pt-1">
          <div>Frontend: {window.location.origin}</div>
          <div>Backend: {import.meta.env.VITE_API_URL}</div>
        </div>
        
        {(!connectionStatus.backend.success || !connectionStatus.cors.success) && (
          <div className="mt-2 p-2 bg-yellow-50 border border-yellow-200 rounded text-xs">
            <p className="text-yellow-800">
              {!connectionStatus.backend.success && 'Backend may be sleeping (Render free tier). '}
              {!connectionStatus.cors.success && 'CORS configuration may need adjustment.'}
            </p>
            <p className="text-yellow-700 mt-1">
              Try refreshing or wait a moment for the backend to wake up.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ConnectionStatus;
