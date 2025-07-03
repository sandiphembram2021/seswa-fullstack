import axios from 'axios';

// Determine API base URL based on environment variables
const getApiBaseUrl = () => {
  // Check for Vite environment variable first (for Vercel deployment)
  if (import.meta.env.VITE_API_URL) {
    return import.meta.env.VITE_API_URL;
  }

  // Check for React environment variable (for other deployments)
  if (import.meta.env.VITE_REACT_APP_API_URL) {
    return import.meta.env.VITE_REACT_APP_API_URL;
  }

  // Production fallback - same domain API
  if (import.meta.env.PROD) {
    return '/api';
  }

  // Development fallback
  return 'http://localhost:5000/api';
};

// Create axios instance with base configuration
const api = axios.create({
  baseURL: getApiBaseUrl(),
  timeout: 30000, // 30 seconds timeout
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    // Log API calls in development
    if (import.meta.env.DEV) {
      console.log(`🔗 API Request: ${config.method?.toUpperCase()} ${config.url}`);
    }
    
    return config;
  },
  (error) => {
    console.error('API Request Error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor to handle common errors
api.interceptors.response.use(
  (response) => {
    // Log successful responses in development
    if (import.meta.env.DEV) {
      console.log(`✅ API Response: ${response.config.method?.toUpperCase()} ${response.config.url}`, response.data);
    }
    return response;
  },
  (error) => {
    console.error('API Response Error:', error);
    
    // Handle common error cases
    if (error.response?.status === 401) {
      // Unauthorized - clear token and redirect to login
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    } else if (error.response?.status === 403) {
      // Forbidden
      console.error('Access denied');
    } else if (error.response?.status >= 500) {
      // Server error
      console.error('Server error occurred');
    } else if (error.code === 'NETWORK_ERROR' || !error.response) {
      // Network error - backend might be sleeping
      console.warn('Network error - backend might be sleeping (Render free tier)');
    }
    
    return Promise.reject(error);
  }
);

// API service methods
export const apiService = {
  // Health check
  health: () => api.get('/health'.replace('/api', '')),
  
  // Status check
  status: () => api.get('/status'.replace('/api', '')),
  
  // Authentication
  auth: {
    login: (credentials) => api.post('/auth/login', credentials),
    register: (userData) => api.post('/auth/register', userData),
    logout: () => api.post('/auth/logout'),
    me: () => api.get('/auth/me'),
    forgotPassword: (email) => api.post('/auth/forgot-password', { email }),
    resetPassword: (token, password) => api.post('/auth/reset-password', { token, password }),
  },
  
  // Users
  users: {
    getProfile: () => api.get('/users/profile'),
    updateProfile: (data) => api.put('/users/profile', data),
    uploadAvatar: (formData) => api.post('/users/upload-avatar', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    }),
    getUsers: (params) => api.get('/users', { params }),
    getUser: (id) => api.get(`/users/${id}`),
  },
  
  // Events
  events: {
    getAll: (params) => api.get('/events', { params }),
    getById: (id) => api.get(`/events/${id}`),
    create: (data) => api.post('/events', data),
    update: (id, data) => api.put(`/events/${id}`, data),
    delete: (id) => api.delete(`/events/${id}`),
    register: (id) => api.post(`/events/${id}/register`),
    unregister: (id) => api.delete(`/events/${id}/register`),
  },
  
  // Chat
  chat: {
    getChats: () => api.get('/chat'),
    getChat: (id) => api.get(`/chat/${id}`),
    createChat: (data) => api.post('/chat', data),
    sendMessage: (chatId, data) => api.post(`/chat/${chatId}/messages`, data),
    markAsRead: (chatId, messageIds) => api.put(`/chat/${chatId}/read`, { messageIds }),
  },
  
  // Notifications
  notifications: {
    getAll: (params) => api.get('/notifications', { params }),
    getById: (id) => api.get(`/notifications/${id}`),
    markAsRead: (id) => api.put(`/notifications/${id}/read`),
    markMultipleAsRead: (ids) => api.put('/notifications/read', { notificationIds: ids }),
    markAllAsRead: () => api.put('/notifications/read-all'),
    getCounts: () => api.get('/notifications/counts'),
  },
  
  // Magazines
  magazines: {
    getAll: (params) => api.get('/magazines', { params }),
    getById: (id) => api.get(`/magazines/${id}`),
    download: (id) => api.get(`/magazines/${id}/download`, { responseType: 'blob' }),
    upload: (formData) => api.post('/magazines', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    }),
    rate: (id, rating, review) => api.post(`/magazines/${id}/rate`, { rating, review }),
    search: (query, params) => api.get('/magazines/search', { params: { q: query, ...params } }),
  },
  
  // Mentorship
  mentorship: {
    getMentors: (params) => api.get('/mentorship/mentors', { params }),
    getSessions: (params) => api.get('/mentorship/sessions', { params }),
    requestSession: (data) => api.post('/mentorship/request', data),
    respondToRequest: (sessionId, action, data) => api.put(`/mentorship/${sessionId}/respond`, { action, ...data }),
    startVideo: (sessionId) => api.post(`/mentorship/${sessionId}/start-video`),
    completeSession: (sessionId, data) => api.put(`/mentorship/${sessionId}/complete`, data),
    cancelSession: (sessionId, reason) => api.put(`/mentorship/${sessionId}/cancel`, { reason }),
    getStats: () => api.get('/mentorship/stats'),
  },
  
  // Resources
  resources: {
    getAll: (params) => api.get('/resources', { params }),
    getById: (id) => api.get(`/resources/${id}`),
    create: (data) => api.post('/resources', data),
    update: (id, data) => api.put(`/resources/${id}`, data),
    delete: (id) => api.delete(`/resources/${id}`),
  },
  
  // Contact
  contact: {
    send: (data) => api.post('/contact', data),
  },
  
  // Admin
  admin: {
    getStats: () => api.get('/admin/stats'),
    getUsers: (params) => api.get('/admin/users', { params }),
    updateUser: (id, data) => api.put(`/admin/users/${id}`, data),
    deleteUser: (id) => api.delete(`/admin/users/${id}`),
    getEvents: (params) => api.get('/admin/events', { params }),
    getMagazines: (params) => api.get('/admin/magazines', { params }),
    approveMagazine: (id) => api.put(`/admin/magazines/${id}/approve`),
    archiveMagazine: (id) => api.put(`/admin/magazines/${id}/archive`),
  },
};

// Export the configured axios instance as default
export default api;

// Helper function to check if backend is accessible
export const checkBackendHealth = async () => {
  try {
    const response = await apiService.health();
    return { success: true, data: response.data };
  } catch (error) {
    return { 
      success: false, 
      error: error.message,
      isNetworkError: error.code === 'NETWORK_ERROR' || !error.response
    };
  }
};

// Helper function to wake up backend (for Render free tier)
export const wakeUpBackend = async () => {
  try {
    console.log('🔄 Attempting to wake up backend...');
    await apiService.status();
    console.log('✅ Backend is awake');
    return true;
  } catch (error) {
    console.warn('⚠️ Backend wake-up failed:', error.message);
    return false;
  }
};
