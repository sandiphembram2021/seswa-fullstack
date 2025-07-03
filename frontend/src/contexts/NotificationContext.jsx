import React, { createContext, useContext, useReducer, useEffect } from 'react';

const NotificationContext = createContext();

// Notification types
export const NOTIFICATION_TYPES = {
  EVENT: 'event',
  MESSAGE: 'message',
  MENTORSHIP: 'mentorship',
  CONTRIBUTION: 'contribution',
  SYSTEM: 'system',
  REMINDER: 'reminder'
};

// Notification actions
const NOTIFICATION_ACTIONS = {
  ADD_NOTIFICATION: 'ADD_NOTIFICATION',
  MARK_READ: 'MARK_READ',
  MARK_ALL_READ: 'MARK_ALL_READ',
  REMOVE_NOTIFICATION: 'REMOVE_NOTIFICATION',
  CLEAR_ALL: 'CLEAR_ALL',
  SET_NOTIFICATIONS: 'SET_NOTIFICATIONS'
};

// Initial state
const initialState = {
  notifications: [],
  unreadCount: 0,
  loading: false
};

// Reducer
const notificationReducer = (state, action) => {
  switch (action.type) {
    case NOTIFICATION_ACTIONS.ADD_NOTIFICATION:
      const newNotification = {
        id: Date.now().toString(),
        timestamp: new Date().toISOString(),
        read: false,
        ...action.payload
      };
      return {
        ...state,
        notifications: [newNotification, ...state.notifications],
        unreadCount: state.unreadCount + 1
      };

    case NOTIFICATION_ACTIONS.MARK_READ:
      return {
        ...state,
        notifications: state.notifications.map(notification =>
          notification.id === action.payload
            ? { ...notification, read: true }
            : notification
        ),
        unreadCount: Math.max(0, state.unreadCount - 1)
      };

    case NOTIFICATION_ACTIONS.MARK_ALL_READ:
      return {
        ...state,
        notifications: state.notifications.map(notification => ({
          ...notification,
          read: true
        })),
        unreadCount: 0
      };

    case NOTIFICATION_ACTIONS.REMOVE_NOTIFICATION:
      const notification = state.notifications.find(n => n.id === action.payload);
      return {
        ...state,
        notifications: state.notifications.filter(n => n.id !== action.payload),
        unreadCount: notification && !notification.read 
          ? Math.max(0, state.unreadCount - 1) 
          : state.unreadCount
      };

    case NOTIFICATION_ACTIONS.CLEAR_ALL:
      return {
        ...state,
        notifications: [],
        unreadCount: 0
      };

    case NOTIFICATION_ACTIONS.SET_NOTIFICATIONS:
      const unread = action.payload.filter(n => !n.read).length;
      return {
        ...state,
        notifications: action.payload,
        unreadCount: unread
      };

    default:
      return state;
  }
};

// Provider component
export const NotificationProvider = ({ children }) => {
  const [state, dispatch] = useReducer(notificationReducer, initialState);

  // Load notifications from localStorage on mount
  useEffect(() => {
    const savedNotifications = localStorage.getItem('seswa_notifications');
    if (savedNotifications) {
      try {
        const notifications = JSON.parse(savedNotifications);
        dispatch({
          type: NOTIFICATION_ACTIONS.SET_NOTIFICATIONS,
          payload: notifications
        });
      } catch (error) {
        console.error('Error loading notifications:', error);
      }
    }
  }, []);

  // Save notifications to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('seswa_notifications', JSON.stringify(state.notifications));
  }, [state.notifications]);

  // Add notification
  const addNotification = (notification) => {
    dispatch({
      type: NOTIFICATION_ACTIONS.ADD_NOTIFICATION,
      payload: notification
    });
  };

  // Mark notification as read
  const markAsRead = (notificationId) => {
    dispatch({
      type: NOTIFICATION_ACTIONS.MARK_READ,
      payload: notificationId
    });
  };

  // Mark all notifications as read
  const markAllAsRead = () => {
    dispatch({
      type: NOTIFICATION_ACTIONS.MARK_ALL_READ
    });
  };

  // Remove notification
  const removeNotification = (notificationId) => {
    dispatch({
      type: NOTIFICATION_ACTIONS.REMOVE_NOTIFICATION,
      payload: notificationId
    });
  };

  // Clear all notifications
  const clearAll = () => {
    dispatch({
      type: NOTIFICATION_ACTIONS.CLEAR_ALL
    });
  };

  // Get notifications by type
  const getNotificationsByType = (type) => {
    return state.notifications.filter(notification => notification.type === type);
  };

  // Get unread notifications
  const getUnreadNotifications = () => {
    return state.notifications.filter(notification => !notification.read);
  };

  // Create specific notification types
  const createEventNotification = (title, message, eventId, priority = 'normal') => {
    addNotification({
      type: NOTIFICATION_TYPES.EVENT,
      title,
      message,
      eventId,
      priority,
      actionUrl: `/events/${eventId}`
    });
  };

  const createMessageNotification = (title, message, senderId, chatId) => {
    addNotification({
      type: NOTIFICATION_TYPES.MESSAGE,
      title,
      message,
      senderId,
      chatId,
      actionUrl: `/chat/${chatId}`
    });
  };

  const createMentorshipNotification = (title, message, mentorshipId, priority = 'normal') => {
    addNotification({
      type: NOTIFICATION_TYPES.MENTORSHIP,
      title,
      message,
      mentorshipId,
      priority,
      actionUrl: `/mentorship/${mentorshipId}`
    });
  };

  const createContributionNotification = (title, message, contributionId) => {
    addNotification({
      type: NOTIFICATION_TYPES.CONTRIBUTION,
      title,
      message,
      contributionId,
      actionUrl: `/contributions/${contributionId}`
    });
  };

  const createSystemNotification = (title, message, priority = 'normal') => {
    addNotification({
      type: NOTIFICATION_TYPES.SYSTEM,
      title,
      message,
      priority
    });
  };

  const createReminderNotification = (title, message, reminderDate, actionUrl) => {
    addNotification({
      type: NOTIFICATION_TYPES.REMINDER,
      title,
      message,
      reminderDate,
      actionUrl,
      priority: 'high'
    });
  };

  const value = {
    notifications: state.notifications,
    unreadCount: state.unreadCount,
    loading: state.loading,
    addNotification,
    markAsRead,
    markAllAsRead,
    removeNotification,
    clearAll,
    getNotificationsByType,
    getUnreadNotifications,
    createEventNotification,
    createMessageNotification,
    createMentorshipNotification,
    createContributionNotification,
    createSystemNotification,
    createReminderNotification
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
};

// Hook to use notification context
export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
};

export default NotificationContext;
