import React, { useState } from 'react';

const BackendWakeup = () => {
  const [wakeupStatus, setWakeupStatus] = useState({ status: 'idle', message: 'Ready to wake up backend' });

  const wakeUpBackend = async () => {
    setWakeupStatus({ status: 'waking', message: 'Waking up backend... This may take 30-60 seconds.' });
    
    const backendUrl = 'https://seswa-backend.onrender.com';
    const maxAttempts = 3;
    const delayBetweenAttempts = 10000; // 10 seconds

    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
      try {
        setWakeupStatus({ 
          status: 'waking', 
          message: `Wake-up attempt ${attempt}/${maxAttempts}... Please wait.` 
        });

        const response = await fetch(`${backendUrl}/health`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' }
        });

        if (response.ok) {
          const data = await response.json();
          setWakeupStatus({
            status: 'success',
            message: 'Backend is now awake and ready!',
            data
          });
          return;
        }
      } catch (error) {
        console.warn(`Wake-up attempt ${attempt} failed:`, error.message);
      }

      // Wait before next attempt (except for the last attempt)
      if (attempt < maxAttempts) {
        setWakeupStatus({ 
          status: 'waking', 
          message: `Attempt ${attempt} failed. Waiting 10 seconds before retry...` 
        });
        await new Promise(resolve => setTimeout(resolve, delayBetweenAttempts));
      }
    }

    setWakeupStatus({
      status: 'failed',
      message: 'Failed to wake up backend after 3 attempts. Please try again later or check if the backend is deployed correctly.'
    });
  };

  const getStatusColor = () => {
    switch (wakeupStatus.status) {
      case 'success': return 'text-green-600 bg-green-50 border-green-200';
      case 'waking': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'failed': return 'text-red-600 bg-red-50 border-red-200';
      default: return 'text-blue-600 bg-blue-50 border-blue-200';
    }
  };

  const getStatusIcon = () => {
    switch (wakeupStatus.status) {
      case 'success': return '✅';
      case 'waking': return '⏰';
      case 'failed': return '❌';
      default: return '😴';
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg mb-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
        😴 Backend Wake-up Service
      </h2>
      
      <div className={`p-4 rounded-lg border-2 ${getStatusColor()} mb-4`}>
        <div className="flex items-center justify-between mb-2">
          <span className="font-semibold">Status:</span>
          <span className="text-2xl">{getStatusIcon()}</span>
        </div>
        <p className="text-sm">{wakeupStatus.message}</p>
        {wakeupStatus.data && (
          <div className="mt-2 p-2 bg-white bg-opacity-50 rounded text-xs">
            <strong>Backend Response:</strong>
            <pre>{JSON.stringify(wakeupStatus.data, null, 2)}</pre>
          </div>
        )}
      </div>

      <div className="text-center">
        <button
          onClick={wakeUpBackend}
          disabled={wakeupStatus.status === 'waking'}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {wakeupStatus.status === 'waking' ? '⏰ Waking Up...' : '😴 Wake Up Backend'}
        </button>
      </div>

      <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <h3 className="font-semibold text-blue-800 mb-2">💡 About Render Free Tier</h3>
        <ul className="text-sm text-blue-700 space-y-1">
          <li>• Backend sleeps after 15 minutes of inactivity</li>
          <li>• First request after sleeping takes 30-60 seconds</li>
          <li>• This is normal behavior for free hosting</li>
          <li>• Once awake, backend responds normally</li>
        </ul>
      </div>

      <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
        <h3 className="font-semibold text-green-800 mb-2">🎯 What Happens Next</h3>
        <ul className="text-sm text-green-700 space-y-1">
          <li>• Backend will receive wake-up requests</li>
          <li>• Server will start and load your application</li>
          <li>• Database connections will be established</li>
          <li>• API endpoints will become available</li>
          <li>• Your frontend can then communicate normally</li>
        </ul>
      </div>
    </div>
  );
};

export default BackendWakeup;
