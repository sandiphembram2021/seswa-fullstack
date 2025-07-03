// SESWA API Testing Script for Browser Console
// Copy and paste this into your browser console to test API endpoints manually

console.log('🚀 SESWA API Testing Script Loaded');
console.log('📡 Backend URL:', 'https://seswa-backend.onrender.com');

// Base configuration
const API_BASE = 'https://seswa-backend.onrender.com/api';
const BACKEND_BASE = 'https://seswa-backend.onrender.com';

// Helper function for API calls
async function callAPI(endpoint, options = {}) {
  const {
    method = 'GET',
    headers = {},
    body = null,
    includeAuth = false
  } = options;

  const url = endpoint.startsWith('http') ? endpoint : `${API_BASE}${endpoint}`;
  
  const requestHeaders = {
    'Content-Type': 'application/json',
    ...headers
  };

  // Add auth token if available
  if (includeAuth) {
    const token = localStorage.getItem('token');
    if (token) {
      requestHeaders.Authorization = `Bearer ${token}`;
    } else {
      console.warn('⚠️ No auth token found. Login first with: await login("email", "password")');
    }
  }

  const requestOptions = {
    method,
    headers: requestHeaders,
    credentials: 'include'
  };

  if (body && method !== 'GET') {
    requestOptions.body = typeof body === 'string' ? body : JSON.stringify(body);
  }

  console.log(`🔗 ${method} ${url}`);
  
  try {
    const response = await fetch(url, requestOptions);
    const data = await response.json();
    
    if (response.ok) {
      console.log(`✅ Success (${response.status}):`, data);
    } else {
      console.error(`❌ Error (${response.status}):`, data);
    }
    
    return { success: response.ok, status: response.status, data };
  } catch (error) {
    console.error('❌ Network Error:', error);
    return { success: false, error: error.message };
  }
}

// Quick test functions
window.seswaAPI = {
  // Backend health check
  health: () => callAPI(`${BACKEND_BASE}/health`),
  
  // API status
  status: () => callAPI(`${BACKEND_BASE}/api/status`),
  
  // Authentication
  register: (userData) => callAPI('/auth/register', {
    method: 'POST',
    body: userData
  }),
  
  login: async (email, password) => {
    const result = await callAPI('/auth/login', {
      method: 'POST',
      body: { email, password }
    });
    
    if (result.success && result.data.token) {
      localStorage.setItem('token', result.data.token);
      localStorage.setItem('user', JSON.stringify(result.data.user));
      console.log('✅ Login successful! Token saved.');
    }
    
    return result;
  },
  
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    console.log('✅ Logged out. Token removed.');
    return callAPI('/auth/logout', { method: 'POST', includeAuth: true });
  },
  
  me: () => callAPI('/auth/me', { includeAuth: true }),
  
  // Users
  getProfile: () => callAPI('/users/profile', { includeAuth: true }),
  
  updateProfile: (profileData) => callAPI('/users/profile', {
    method: 'PUT',
    body: profileData,
    includeAuth: true
  }),
  
  // Events
  getEvents: () => callAPI('/events'),
  
  getEvent: (id) => callAPI(`/events/${id}`),
  
  createEvent: (eventData) => callAPI('/events', {
    method: 'POST',
    body: eventData,
    includeAuth: true
  }),
  
  registerForEvent: (eventId) => callAPI(`/events/${eventId}/register`, {
    method: 'POST',
    includeAuth: true
  }),
  
  // Magazines
  getMagazines: () => callAPI('/magazines'),
  
  getMagazine: (id) => callAPI(`/magazines/${id}`),
  
  searchMagazines: (query) => callAPI(`/magazines/search?q=${encodeURIComponent(query)}`),
  
  // Chat
  getChats: () => callAPI('/chat', { includeAuth: true }),
  
  getChat: (id) => callAPI(`/chat/${id}`, { includeAuth: true }),
  
  createChat: (chatData) => callAPI('/chat', {
    method: 'POST',
    body: chatData,
    includeAuth: true
  }),
  
  // Notifications
  getNotifications: () => callAPI('/notifications', { includeAuth: true }),
  
  getNotificationCounts: () => callAPI('/notifications/counts', { includeAuth: true }),
  
  // Mentorship
  getMentors: () => callAPI('/mentorship/mentors', { includeAuth: true }),
  
  getSessions: () => callAPI('/mentorship/sessions', { includeAuth: true }),
  
  // Custom API call
  call: callAPI
};

// Quick test examples
console.log(`
🧪 SESWA API Test Examples:

// Basic tests (no auth required)
await seswaAPI.health()
await seswaAPI.status()
await seswaAPI.getEvents()
await seswaAPI.getMagazines()

// Authentication
await seswaAPI.register({
  firstName: "John",
  lastName: "Doe", 
  email: "john.doe@example.com",
  password: "password123",
  userType: "student",
  college: "IIEST Shibpur",
  branch: "Computer Science",
  year: "3rd Year"
})

await seswaAPI.login("john.doe@example.com", "password123")

// Authenticated tests (login first)
await seswaAPI.me()
await seswaAPI.getProfile()
await seswaAPI.getChats()
await seswaAPI.getNotifications()

// Custom API call
await seswaAPI.call('/custom/endpoint', {
  method: 'POST',
  body: { key: 'value' },
  includeAuth: true
})

// Check current auth status
console.log('Current token:', localStorage.getItem('token'))
console.log('Current user:', JSON.parse(localStorage.getItem('user') || 'null'))
`);

// Auto-run basic health check
console.log('🔄 Running automatic health check...');
seswaAPI.health().then(() => {
  console.log('✅ API testing script ready! Use seswaAPI.* functions to test endpoints.');
});
