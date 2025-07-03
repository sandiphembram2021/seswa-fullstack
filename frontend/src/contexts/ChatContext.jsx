import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { useNotifications } from './NotificationContext';

const ChatContext = createContext();

// Chat actions
const CHAT_ACTIONS = {
  SET_CHATS: 'SET_CHATS',
  ADD_CHAT: 'ADD_CHAT',
  UPDATE_CHAT: 'UPDATE_CHAT',
  ADD_MESSAGE: 'ADD_MESSAGE',
  MARK_MESSAGES_READ: 'MARK_MESSAGES_READ',
  SET_ACTIVE_CHAT: 'SET_ACTIVE_CHAT',
  SET_ONLINE_USERS: 'SET_ONLINE_USERS',
  SET_TYPING: 'SET_TYPING',
  SET_LOADING: 'SET_LOADING'
};

// Initial state
const initialState = {
  chats: [],
  activeChat: null,
  onlineUsers: [],
  typingUsers: {},
  loading: false,
  connected: false
};

// Reducer
const chatReducer = (state, action) => {
  switch (action.type) {
    case CHAT_ACTIONS.SET_CHATS:
      return {
        ...state,
        chats: action.payload
      };

    case CHAT_ACTIONS.ADD_CHAT:
      return {
        ...state,
        chats: [...state.chats, action.payload]
      };

    case CHAT_ACTIONS.UPDATE_CHAT:
      return {
        ...state,
        chats: state.chats.map(chat =>
          chat.id === action.payload.id ? { ...chat, ...action.payload } : chat
        )
      };

    case CHAT_ACTIONS.ADD_MESSAGE:
      return {
        ...state,
        chats: state.chats.map(chat =>
          chat.id === action.payload.chatId
            ? {
                ...chat,
                messages: [...(chat.messages || []), action.payload.message],
                lastMessage: action.payload.message,
                updatedAt: new Date().toISOString()
              }
            : chat
        )
      };

    case CHAT_ACTIONS.MARK_MESSAGES_READ:
      return {
        ...state,
        chats: state.chats.map(chat =>
          chat.id === action.payload.chatId
            ? {
                ...chat,
                messages: chat.messages?.map(msg =>
                  msg.senderId !== action.payload.userId ? { ...msg, read: true } : msg
                ) || []
              }
            : chat
        )
      };

    case CHAT_ACTIONS.SET_ACTIVE_CHAT:
      return {
        ...state,
        activeChat: action.payload
      };

    case CHAT_ACTIONS.SET_ONLINE_USERS:
      return {
        ...state,
        onlineUsers: action.payload
      };

    case CHAT_ACTIONS.SET_TYPING:
      return {
        ...state,
        typingUsers: {
          ...state.typingUsers,
          [action.payload.chatId]: action.payload.isTyping
            ? [...(state.typingUsers[action.payload.chatId] || []), action.payload.userId]
            : (state.typingUsers[action.payload.chatId] || []).filter(id => id !== action.payload.userId)
        }
      };

    case CHAT_ACTIONS.SET_LOADING:
      return {
        ...state,
        loading: action.payload
      };

    default:
      return state;
  }
};

// Provider component
export const ChatProvider = ({ children }) => {
  const [state, dispatch] = useReducer(chatReducer, initialState);
  const { user } = useAuth();
  const { createMessageNotification } = useNotifications();

  // Mock WebSocket connection (in real app, use actual WebSocket)
  useEffect(() => {
    if (user) {
      // Simulate WebSocket connection
      console.log('Chat system connected for user:', user.id);
      
      // Load existing chats
      loadChats();
      
      // Simulate receiving messages
      const interval = setInterval(() => {
        // This would be replaced with actual WebSocket message handling
        simulateIncomingMessage();
      }, 30000); // Every 30 seconds for demo

      return () => clearInterval(interval);
    }
  }, [user]);

  // Load chats from localStorage
  const loadChats = () => {
    const savedChats = localStorage.getItem(`seswa_chats_${user.id}`);
    if (savedChats) {
      try {
        const chats = JSON.parse(savedChats);
        dispatch({
          type: CHAT_ACTIONS.SET_CHATS,
          payload: chats
        });
      } catch (error) {
        console.error('Error loading chats:', error);
      }
    } else {
      // Initialize with default chats based on user type
      initializeDefaultChats();
    }
  };

  // Save chats to localStorage
  const saveChats = (chats) => {
    localStorage.setItem(`seswa_chats_${user.id}`, JSON.stringify(chats));
  };

  // Initialize default chats based on user type
  const initializeDefaultChats = () => {
    let defaultChats = [];

    if (user.userType === 'student') {
      // Students get mentorship chats
      defaultChats = [
        {
          id: 'mentorship_general',
          name: 'Mentorship Support',
          type: 'mentorship',
          participants: [user.id, 'mentor_1'],
          messages: [
            {
              id: '1',
              senderId: 'mentor_1',
              senderName: 'Dr. Priya Murmu',
              content: 'Welcome to SESWA mentorship! Feel free to ask any questions about your career path.',
              timestamp: new Date(Date.now() - 86400000).toISOString(),
              read: false
            }
          ],
          lastMessage: {
            content: 'Welcome to SESWA mentorship!',
            timestamp: new Date(Date.now() - 86400000).toISOString()
          },
          createdAt: new Date(Date.now() - 86400000).toISOString(),
          updatedAt: new Date(Date.now() - 86400000).toISOString()
        }
      ];
    } else if (user.userType === 'alumni') {
      // Alumni get student mentorship chats
      defaultChats = [
        {
          id: 'student_mentorship',
          name: 'Student Mentorship',
          type: 'mentorship',
          participants: [user.id, 'student_1'],
          messages: [],
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        }
      ];
    }

    dispatch({
      type: CHAT_ACTIONS.SET_CHATS,
      payload: defaultChats
    });
    saveChats(defaultChats);
  };

  // Simulate incoming message (replace with actual WebSocket handling)
  const simulateIncomingMessage = () => {
    if (Math.random() > 0.7 && state.chats.length > 0) {
      const randomChat = state.chats[Math.floor(Math.random() * state.chats.length)];
      const message = {
        id: Date.now().toString(),
        senderId: 'system',
        senderName: 'System',
        content: 'This is a simulated message for demo purposes.',
        timestamp: new Date().toISOString(),
        read: false
      };

      addMessage(randomChat.id, message);
    }
  };

  // Send message
  const sendMessage = (chatId, content, type = 'text') => {
    const message = {
      id: Date.now().toString(),
      senderId: user.id,
      senderName: `${user.firstName} ${user.lastName}`,
      content,
      type,
      timestamp: new Date().toISOString(),
      read: false
    };

    dispatch({
      type: CHAT_ACTIONS.ADD_MESSAGE,
      payload: { chatId, message }
    });

    // Save to localStorage
    const updatedChats = state.chats.map(chat =>
      chat.id === chatId
        ? {
            ...chat,
            messages: [...(chat.messages || []), message],
            lastMessage: message,
            updatedAt: new Date().toISOString()
          }
        : chat
    );
    saveChats(updatedChats);

    // In real app, emit to WebSocket
    console.log('Message sent:', message);
  };

  // Add message (for incoming messages)
  const addMessage = (chatId, message) => {
    dispatch({
      type: CHAT_ACTIONS.ADD_MESSAGE,
      payload: { chatId, message }
    });

    // Create notification for incoming messages
    if (message.senderId !== user.id) {
      createMessageNotification(
        `New message from ${message.senderName}`,
        message.content,
        message.senderId,
        chatId
      );
    }

    // Save to localStorage
    const updatedChats = state.chats.map(chat =>
      chat.id === chatId
        ? {
            ...chat,
            messages: [...(chat.messages || []), message],
            lastMessage: message,
            updatedAt: new Date().toISOString()
          }
        : chat
    );
    saveChats(updatedChats);
  };

  // Mark messages as read
  const markMessagesAsRead = (chatId) => {
    dispatch({
      type: CHAT_ACTIONS.MARK_MESSAGES_READ,
      payload: { chatId, userId: user.id }
    });

    // Save to localStorage
    const updatedChats = state.chats.map(chat =>
      chat.id === chatId
        ? {
            ...chat,
            messages: chat.messages?.map(msg =>
              msg.senderId !== user.id ? { ...msg, read: true } : msg
            ) || []
          }
        : chat
    );
    saveChats(updatedChats);
  };

  // Set active chat
  const setActiveChat = (chatId) => {
    const chat = state.chats.find(c => c.id === chatId);
    dispatch({
      type: CHAT_ACTIONS.SET_ACTIVE_CHAT,
      payload: chat
    });

    // Mark messages as read when opening chat
    if (chat) {
      markMessagesAsRead(chatId);
    }
  };

  // Create new chat
  const createChat = (participants, name, type = 'direct') => {
    const newChat = {
      id: Date.now().toString(),
      name,
      type,
      participants: [user.id, ...participants],
      messages: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    dispatch({
      type: CHAT_ACTIONS.ADD_CHAT,
      payload: newChat
    });

    const updatedChats = [...state.chats, newChat];
    saveChats(updatedChats);

    return newChat;
  };

  // Get unread message count
  const getUnreadCount = () => {
    return state.chats.reduce((total, chat) => {
      const unreadMessages = chat.messages?.filter(msg => 
        msg.senderId !== user.id && !msg.read
      ) || [];
      return total + unreadMessages.length;
    }, 0);
  };

  const value = {
    chats: state.chats,
    activeChat: state.activeChat,
    onlineUsers: state.onlineUsers,
    typingUsers: state.typingUsers,
    loading: state.loading,
    connected: state.connected,
    sendMessage,
    addMessage,
    markMessagesAsRead,
    setActiveChat,
    createChat,
    getUnreadCount
  };

  return (
    <ChatContext.Provider value={value}>
      {children}
    </ChatContext.Provider>
  );
};

// Hook to use chat context
export const useChat = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
};

export default ChatContext;
