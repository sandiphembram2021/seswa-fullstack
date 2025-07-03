// Test connection between deployed frontend and backend
export const testDeployedConnection = async () => {
  const results = {
    frontend: {
      url: window.location.origin,
      environment: import.meta.env.MODE,
      apiUrl: import.meta.env.VITE_API_URL
    },
    backend: {
      url: 'https://seswa-backend.onrender.com',
      status: 'testing'
    },
    connection: {
      cors: 'testing',
      api: 'testing'
    }
  };

  console.log('🚀 Testing Deployed Application Connection...');
  console.log('📱 Frontend:', results.frontend);
  console.log('⚙️ Backend:', results.backend.url);

  try {
    // Test 1: Backend Health Check
    console.log('🏥 Testing backend health...');
    const healthResponse = await fetch('https://seswa-backend.onrender.com/health', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Origin': window.location.origin
      }
    });

    if (healthResponse.ok) {
      const healthData = await healthResponse.json();
      results.backend.status = 'healthy';
      results.backend.data = healthData;
      console.log('✅ Backend health check passed:', healthData);
    } else {
      results.backend.status = 'error';
      results.backend.error = `HTTP ${healthResponse.status}`;
      console.error('❌ Backend health check failed:', healthResponse.status);
    }

    // Test 2: CORS Check
    console.log('🌐 Testing CORS configuration...');
    const corsResponse = await fetch('https://seswa-backend.onrender.com/api/status', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Origin': window.location.origin
      },
      credentials: 'include'
    });

    if (corsResponse.ok) {
      const corsData = await corsResponse.json();
      results.connection.cors = 'working';
      results.connection.apiData = corsData;
      console.log('✅ CORS configuration working:', corsData);
    } else {
      results.connection.cors = 'error';
      results.connection.corsError = `HTTP ${corsResponse.status}`;
      console.error('❌ CORS test failed:', corsResponse.status);
    }

    // Test 3: API Endpoints
    console.log('📡 Testing API endpoints...');
    const apiTests = [
      { name: 'Events', endpoint: '/api/events' },
      { name: 'Magazines', endpoint: '/api/magazines' }
    ];

    results.connection.apiTests = {};

    for (const test of apiTests) {
      try {
        const response = await fetch(`https://seswa-backend.onrender.com${test.endpoint}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Origin': window.location.origin
          }
        });

        if (response.ok) {
          const data = await response.json();
          results.connection.apiTests[test.name] = {
            status: 'success',
            dataLength: Array.isArray(data.data) ? data.data.length : 'N/A'
          };
          console.log(`✅ ${test.name} API test passed`);
        } else {
          results.connection.apiTests[test.name] = {
            status: 'error',
            error: `HTTP ${response.status}`
          };
          console.error(`❌ ${test.name} API test failed:`, response.status);
        }
      } catch (error) {
        results.connection.apiTests[test.name] = {
          status: 'error',
          error: error.message
        };
        console.error(`❌ ${test.name} API test error:`, error.message);
      }
    }

    results.connection.api = 'tested';

  } catch (error) {
    console.error('❌ Connection test failed:', error);
    results.connection.error = error.message;
  }

  console.log('📊 Final Test Results:', results);
  return results;
};

// Test if we're running on deployed frontend
export const isDeployedFrontend = () => {
  return window.location.hostname.includes('vercel.app') || 
         window.location.hostname.includes('netlify.app') ||
         !window.location.hostname.includes('localhost');
};

// Get deployment info
export const getDeploymentInfo = () => {
  return {
    isDeployed: isDeployedFrontend(),
    frontendUrl: window.location.origin,
    backendUrl: import.meta.env.VITE_API_URL || 'https://seswa-backend.onrender.com/api',
    environment: import.meta.env.MODE,
    isProduction: import.meta.env.PROD
  };
};

// Auto-test on deployed frontend
if (isDeployedFrontend()) {
  console.log('🌐 Deployed frontend detected - running connection test...');
  testDeployedConnection().then(results => {
    if (results.backend.status === 'healthy' && results.connection.cors === 'working') {
      console.log('🎉 Deployment connection successful!');
    } else {
      console.warn('⚠️ Deployment connection issues detected. Check results above.');
    }
  });
}
