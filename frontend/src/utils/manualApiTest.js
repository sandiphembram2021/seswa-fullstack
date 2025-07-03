// Manual RESTful API Testing Utilities
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
const BACKEND_BASE_URL = API_BASE_URL.replace('/api', '');

console.log('🔧 API Configuration:');
console.log('📡 API_BASE_URL:', API_BASE_URL);
console.log('🏠 BACKEND_BASE_URL:', BACKEND_BASE_URL);

// Helper function to make manual API calls
export const makeApiCall = async (endpoint, options = {}) => {
  const {
    method = 'GET',
    headers = {},
    body = null,
    includeAuth = false
  } = options;

  const url = endpoint.startsWith('http') ? endpoint : `${API_BASE_URL}${endpoint}`;
  
  const requestHeaders = {
    'Content-Type': 'application/json',
    ...headers
  };

  // Add authentication token if requested
  if (includeAuth) {
    const token = localStorage.getItem('token');
    if (token) {
      requestHeaders.Authorization = `Bearer ${token}`;
    }
  }

  const requestOptions = {
    method,
    headers: requestHeaders,
    credentials: 'include', // Include cookies for CORS
  };

  if (body && method !== 'GET') {
    requestOptions.body = typeof body === 'string' ? body : JSON.stringify(body);
  }

  console.log(`🔗 Manual API Call: ${method} ${url}`);
  console.log('📤 Request:', requestOptions);

  try {
    const response = await fetch(url, requestOptions);
    const responseData = await response.json();
    
    console.log(`📥 Response (${response.status}):`, responseData);
    
    return {
      success: response.ok,
      status: response.status,
      statusText: response.statusText,
      data: responseData,
      headers: Object.fromEntries(response.headers.entries())
    };
  } catch (error) {
    console.error('❌ API Call Failed:', error);
    return {
      success: false,
      error: error.message,
      type: 'network_error'
    };
  }
};

// Test Backend Health
export const testBackendHealth = async () => {
  console.log('🏥 Testing Backend Health...');
  return await makeApiCall(`${BACKEND_BASE_URL}/health`);
};

// Test API Status
export const testApiStatus = async () => {
  console.log('📊 Testing API Status...');
  return await makeApiCall(`${BACKEND_BASE_URL}/api/status`);
};

// Authentication API Tests
export const authApiTests = {
  // Test user registration
  register: async (userData) => {
    console.log('👤 Testing User Registration...');
    return await makeApiCall('/auth/register', {
      method: 'POST',
      body: userData
    });
  },

  // Test user login
  login: async (credentials) => {
    console.log('🔐 Testing User Login...');
    return await makeApiCall('/auth/login', {
      method: 'POST',
      body: credentials
    });
  },

  // Test get current user
  getCurrentUser: async () => {
    console.log('👤 Testing Get Current User...');
    return await makeApiCall('/auth/me', {
      method: 'GET',
      includeAuth: true
    });
  },

  // Test logout
  logout: async () => {
    console.log('🚪 Testing User Logout...');
    return await makeApiCall('/auth/logout', {
      method: 'POST',
      includeAuth: true
    });
  }
};

// User API Tests
export const userApiTests = {
  // Get user profile
  getProfile: async () => {
    console.log('👤 Testing Get User Profile...');
    return await makeApiCall('/users/profile', {
      method: 'GET',
      includeAuth: true
    });
  },

  // Update user profile
  updateProfile: async (profileData) => {
    console.log('✏️ Testing Update User Profile...');
    return await makeApiCall('/users/profile', {
      method: 'PUT',
      body: profileData,
      includeAuth: true
    });
  },

  // Get all users (admin)
  getAllUsers: async () => {
    console.log('👥 Testing Get All Users...');
    return await makeApiCall('/users', {
      method: 'GET',
      includeAuth: true
    });
  }
};

// Event API Tests
export const eventApiTests = {
  // Get all events
  getAllEvents: async () => {
    console.log('📅 Testing Get All Events...');
    return await makeApiCall('/events');
  },

  // Get specific event
  getEvent: async (eventId) => {
    console.log(`📅 Testing Get Event ${eventId}...`);
    return await makeApiCall(`/events/${eventId}`);
  },

  // Create new event
  createEvent: async (eventData) => {
    console.log('➕ Testing Create Event...');
    return await makeApiCall('/events', {
      method: 'POST',
      body: eventData,
      includeAuth: true
    });
  },

  // Register for event
  registerForEvent: async (eventId) => {
    console.log(`📝 Testing Event Registration for ${eventId}...`);
    return await makeApiCall(`/events/${eventId}/register`, {
      method: 'POST',
      includeAuth: true
    });
  }
};

// Chat API Tests
export const chatApiTests = {
  // Get user chats
  getUserChats: async () => {
    console.log('💬 Testing Get User Chats...');
    return await makeApiCall('/chat', {
      method: 'GET',
      includeAuth: true
    });
  },

  // Get specific chat
  getChat: async (chatId) => {
    console.log(`💬 Testing Get Chat ${chatId}...`);
    return await makeApiCall(`/chat/${chatId}`, {
      method: 'GET',
      includeAuth: true
    });
  },

  // Create new chat
  createChat: async (chatData) => {
    console.log('➕ Testing Create Chat...');
    return await makeApiCall('/chat', {
      method: 'POST',
      body: chatData,
      includeAuth: true
    });
  },

  // Send message
  sendMessage: async (chatId, messageData) => {
    console.log(`📤 Testing Send Message to ${chatId}...`);
    return await makeApiCall(`/chat/${chatId}/messages`, {
      method: 'POST',
      body: messageData,
      includeAuth: true
    });
  }
};

// Notification API Tests
export const notificationApiTests = {
  // Get notifications
  getNotifications: async () => {
    console.log('🔔 Testing Get Notifications...');
    return await makeApiCall('/notifications', {
      method: 'GET',
      includeAuth: true
    });
  },

  // Get notification counts
  getNotificationCounts: async () => {
    console.log('🔢 Testing Get Notification Counts...');
    return await makeApiCall('/notifications/counts', {
      method: 'GET',
      includeAuth: true
    });
  },

  // Mark notification as read
  markAsRead: async (notificationId) => {
    console.log(`✅ Testing Mark Notification ${notificationId} as Read...`);
    return await makeApiCall(`/notifications/${notificationId}/read`, {
      method: 'PUT',
      includeAuth: true
    });
  }
};

// Magazine API Tests
export const magazineApiTests = {
  // Get all magazines
  getAllMagazines: async () => {
    console.log('📖 Testing Get All Magazines...');
    return await makeApiCall('/magazines');
  },

  // Get specific magazine
  getMagazine: async (magazineId) => {
    console.log(`📖 Testing Get Magazine ${magazineId}...`);
    return await makeApiCall(`/magazines/${magazineId}`);
  },

  // Search magazines
  searchMagazines: async (query) => {
    console.log(`🔍 Testing Search Magazines: "${query}"...`);
    return await makeApiCall(`/magazines/search?q=${encodeURIComponent(query)}`);
  },

  // Rate magazine
  rateMagazine: async (magazineId, rating, review) => {
    console.log(`⭐ Testing Rate Magazine ${magazineId}...`);
    return await makeApiCall(`/magazines/${magazineId}/rate`, {
      method: 'POST',
      body: { rating, review },
      includeAuth: true
    });
  }
};

// Mentorship API Tests
export const mentorshipApiTests = {
  // Get available mentors
  getMentors: async () => {
    console.log('🤝 Testing Get Available Mentors...');
    return await makeApiCall('/mentorship/mentors', {
      method: 'GET',
      includeAuth: true
    });
  },

  // Get user's mentorship sessions
  getSessions: async () => {
    console.log('📋 Testing Get Mentorship Sessions...');
    return await makeApiCall('/mentorship/sessions', {
      method: 'GET',
      includeAuth: true
    });
  },

  // Request mentorship session
  requestSession: async (sessionData) => {
    console.log('📝 Testing Request Mentorship Session...');
    return await makeApiCall('/mentorship/request', {
      method: 'POST',
      body: sessionData,
      includeAuth: true
    });
  },

  // Get mentorship statistics
  getStats: async () => {
    console.log('📊 Testing Get Mentorship Stats...');
    return await makeApiCall('/mentorship/stats', {
      method: 'GET',
      includeAuth: true
    });
  }
};

// Comprehensive API Test Suite
export const runFullApiTest = async () => {
  console.log('🚀 Starting Comprehensive API Test Suite...');
  
  const results = {
    backend: null,
    api: null,
    auth: {},
    users: {},
    events: {},
    chat: {},
    notifications: {},
    magazines: {},
    mentorship: {}
  };

  try {
    // Test backend health
    results.backend = await testBackendHealth();
    
    // Test API status
    results.api = await testApiStatus();
    
    // Test public endpoints (no auth required)
    results.events.getAll = await eventApiTests.getAllEvents();
    results.magazines.getAll = await magazineApiTests.getAllMagazines();
    
    console.log('✅ Public API tests completed');
    
    // Note: Auth-required tests would need valid credentials
    console.log('ℹ️ Authentication-required tests skipped (need valid login)');
    
  } catch (error) {
    console.error('❌ API Test Suite Failed:', error);
  }
  
  console.log('📊 API Test Results:', results);
  return results;
};

// Export all test functions
export default {
  makeApiCall,
  testBackendHealth,
  testApiStatus,
  authApiTests,
  userApiTests,
  eventApiTests,
  chatApiTests,
  notificationApiTests,
  magazineApiTests,
  mentorshipApiTests,
  runFullApiTest
};
