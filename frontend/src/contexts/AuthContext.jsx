import React, { createContext, useContext, useReducer, useEffect } from 'react';
import mockApi from '../services/mockApi';

const AuthContext = createContext();

// Auth reducer
const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN_START':
      return {
        ...state,
        loading: true,
        error: null
      };
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        user: action.payload.user,
        token: action.payload.token,
        error: null
      };
    case 'LOGIN_FAILURE':
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
        user: null,
        token: null,
        error: action.payload
      };
    case 'LOGOUT':
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
        user: null,
        token: null,
        error: null
      };
    case 'UPDATE_USER':
      return {
        ...state,
        user: { ...state.user, ...action.payload }
      };
    case 'CLEAR_ERROR':
      return {
        ...state,
        error: null
      };
    default:
      return state;
  }
};

// Initial state
const initialState = {
  isAuthenticated: false,
  user: null,
  token: localStorage.getItem('mockToken'),
  loading: false,
  error: null,
  permissions: [],
  lastActivity: null
};

// Auth Provider Component
export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Check for existing authentication on app load
  useEffect(() => {
    const token = localStorage.getItem('mockToken');
    if (token) {
      // Verify token on app load
      verifyToken();
    }
  }, []);

  // Set auth token
  const setAuthToken = (token) => {
    if (token) {
      localStorage.setItem('mockToken', token);
    } else {
      localStorage.removeItem('mockToken');
    }
  };

  // Verify token
  const verifyToken = async () => {
    try {
      const response = await mockApi.getCurrentUser();
      dispatch({
        type: 'LOGIN_SUCCESS',
        payload: {
          user: response.data.user,
          token: localStorage.getItem('mockToken')
        }
      });
    } catch (error) {
      dispatch({ type: 'LOGOUT' });
      setAuthToken(null);
    }
  };

  // Login
  const login = async (email, password) => {
    try {
      dispatch({ type: 'LOGIN_START' });

      const response = await mockApi.login(email, password);
      const { token, user } = response.data;

      setAuthToken(token);
      dispatch({
        type: 'LOGIN_SUCCESS',
        payload: {
          user: user,
          token
        }
      });

      return { success: true, data: response.data };
    } catch (error) {
      const errorMessage = error.message || 'Login failed';
      dispatch({
        type: 'LOGIN_FAILURE',
        payload: errorMessage
      });
      return { success: false, error: errorMessage };
    }
  };

  // Register
  const register = async (userData) => {
    try {
      dispatch({ type: 'LOGIN_START' });

      const response = await mockApi.register(userData);
      const { token, user } = response.data;

      setAuthToken(token);
      dispatch({
        type: 'LOGIN_SUCCESS',
        payload: {
          user: user,
          token
        }
      });

      return { success: true, data: response.data };
    } catch (error) {
      const errorMessage = error.message || 'Registration failed';
      dispatch({
        type: 'LOGIN_FAILURE',
        payload: errorMessage
      });
      return { success: false, error: errorMessage };
    }
  };

  // Logout
  const logout = async () => {
    try {
      await mockApi.logout();
    } catch (error) {
      // Continue with logout even if API call fails
    } finally {
      setAuthToken(null);
      dispatch({ type: 'LOGOUT' });
    }
  };

  // Update profile
  const updateProfile = async (userData) => {
    try {
      const response = await mockApi.updateProfile(userData);

      dispatch({
        type: 'UPDATE_USER',
        payload: response.data.user
      });

      return { success: true, data: response.data };
    } catch (error) {
      const errorMessage = error.message || 'Profile update failed';
      return { success: false, error: errorMessage };
    }
  };

  // Change password
  const changePassword = async (currentPassword, newPassword) => {
    try {
      const response = await mockApi.changePassword(currentPassword, newPassword);
      return { success: true, data: response.data };
    } catch (error) {
      const errorMessage = error.message || 'Password change failed';
      return { success: false, error: errorMessage };
    }
  };

  // Clear error
  const clearError = () => {
    dispatch({ type: 'CLEAR_ERROR' });
  };

  const value = {
    ...state,
    login,
    register,
    logout,
    updateProfile,
    changePassword,
    clearError
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;
