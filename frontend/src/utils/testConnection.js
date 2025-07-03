// Test connection between frontend and backend
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const testBackendConnection = async () => {
  try {
    console.log('🔗 Testing backend connection...');
    console.log('📍 Backend URL:', API_BASE_URL);
    
    // Test health endpoint
    const healthResponse = await fetch(API_BASE_URL.replace('/api', '/health'), {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    if (healthResponse.ok) {
      const healthData = await healthResponse.json();
      console.log('✅ Backend health check passed:', healthData);
      
      // Test API status endpoint
      const statusResponse = await fetch(API_BASE_URL.replace('/api', '/api/status'), {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (statusResponse.ok) {
        const statusData = await statusResponse.json();
        console.log('✅ Backend API status:', statusData);
        return {
          success: true,
          health: healthData,
          status: statusData,
          message: 'Backend connection successful!'
        };
      } else {
        console.warn('⚠️ API status endpoint failed:', statusResponse.status);
        return {
          success: false,
          error: `API status failed: ${statusResponse.status}`,
          message: 'Backend partially accessible'
        };
      }
    } else {
      console.error('❌ Backend health check failed:', healthResponse.status);
      return {
        success: false,
        error: `Health check failed: ${healthResponse.status}`,
        message: 'Backend not accessible'
      };
    }
  } catch (error) {
    console.error('❌ Backend connection error:', error);
    return {
      success: false,
      error: error.message,
      message: 'Failed to connect to backend'
    };
  }
};

export const testCORSConnection = async () => {
  try {
    console.log('🌐 Testing CORS configuration...');
    
    const response = await fetch(API_BASE_URL.replace('/api', '/api/status'), {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Origin': window.location.origin
      },
      credentials: 'include'
    });
    
    if (response.ok) {
      console.log('✅ CORS configuration working');
      return { success: true, message: 'CORS configured correctly' };
    } else {
      console.warn('⚠️ CORS might have issues:', response.status);
      return { success: false, message: 'CORS configuration issues' };
    }
  } catch (error) {
    console.error('❌ CORS test failed:', error);
    return { success: false, error: error.message };
  }
};

export const displayConnectionStatus = async () => {
  const connectionTest = await testBackendConnection();
  const corsTest = await testCORSConnection();
  
  const status = {
    backend: connectionTest,
    cors: corsTest,
    frontend: {
      url: window.location.origin,
      environment: import.meta.env.MODE,
      apiUrl: API_BASE_URL
    }
  };
  
  console.log('📊 Complete Connection Status:', status);
  return status;
};

// Auto-test connection when in development
if (import.meta.env.DEV) {
  console.log('🔧 Development mode - Testing connections...');
  displayConnectionStatus();
}
