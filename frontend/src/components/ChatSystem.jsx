import React, { useState, useRef, useEffect } from 'react';
import {
  MessageCircle,
  Send,
  X,
  Search,
  Phone,
  Video,
  MoreVertical,
  Paperclip,
  Smile,
  Users,
  User,
  Circle,
  GraduationCap
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import VideoConference from './VideoConference';
import MentorshipProgram from './MentorshipProgram';

const ChatSystem = ({ isOpen, onClose }) => {
  const { user } = useAuth();
  const [activeChat, setActiveChat] = useState(null);
  const [message, setMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [showVideoCall, setShowVideoCall] = useState(false);
  const [showMentorshipProgram, setShowMentorshipProgram] = useState(false);
  const messagesEndRef = useRef(null);

  // Mock chat data
  const [chats] = useState([
    {
      id: 1,
      name: 'Priya Hansda',
      userType: 'alumni',
      avatar: 'PH',
      lastMessage: 'Thanks for the career guidance!',
      timestamp: '2 min ago',
      unread: 2,
      online: true,
      messages: [
        {
          id: 1,
          senderId: 'user_2',
          senderName: 'Priya Hansda',
          content: 'Hi! I saw your profile and would love to get some career advice.',
          timestamp: '10:30 AM',
          type: 'text'
        },
        {
          id: 2,
          senderId: user?.id,
          senderName: user?.firstName + ' ' + user?.lastName,
          content: 'Of course! I\'d be happy to help. What specific area are you interested in?',
          timestamp: '10:32 AM',
          type: 'text'
        },
        {
          id: 3,
          senderId: 'user_2',
          senderName: 'Priya Hansda',
          content: 'I\'m particularly interested in software engineering roles at tech companies.',
          timestamp: '10:35 AM',
          type: 'text'
        },
        {
          id: 4,
          senderId: 'user_2',
          senderName: 'Priya Hansda',
          content: 'Thanks for the career guidance!',
          timestamp: '2 min ago',
          type: 'text'
        }
      ]
    },
    {
      id: 2,
      name: 'Amit Soren',
      userType: 'student',
      avatar: 'AS',
      lastMessage: 'When is the next event?',
      timestamp: '1 hour ago',
      unread: 0,
      online: false,
      messages: [
        {
          id: 1,
          senderId: 'user_3',
          senderName: 'Amit Soren',
          content: 'Hello! I wanted to ask about upcoming events.',
          timestamp: '9:15 AM',
          type: 'text'
        },
        {
          id: 2,
          senderId: 'user_3',
          senderName: 'Amit Soren',
          content: 'When is the next event?',
          timestamp: '1 hour ago',
          type: 'text'
        }
      ]
    },
    {
      id: 3,
      name: 'SESWA Community',
      userType: 'group',
      avatar: 'SC',
      lastMessage: 'Welcome new members!',
      timestamp: '3 hours ago',
      unread: 5,
      online: true,
      messages: [
        {
          id: 1,
          senderId: 'admin',
          senderName: 'Admin',
          content: 'Welcome to the SESWA community chat!',
          timestamp: '8:00 AM',
          type: 'text'
        },
        {
          id: 2,
          senderId: 'admin',
          senderName: 'Admin',
          content: 'Welcome new members!',
          timestamp: '3 hours ago',
          type: 'text'
        }
      ]
    }
  ]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [activeChat?.messages]);

  const handleSendMessage = () => {
    if (!message.trim() || !activeChat) return;

    const newMessage = {
      id: Date.now(),
      senderId: user?.id,
      senderName: user?.firstName + ' ' + user?.lastName,
      content: message,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      type: 'text'
    };

    // In real app, this would send to server
    activeChat.messages.push(newMessage);
    setMessage('');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const filteredChats = chats.filter(chat =>
    chat.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-6xl h-[80vh] mx-4 overflow-hidden flex">
        {/* Chat List Sidebar */}
        <div className="w-1/3 border-r border-gray-200 flex flex-col">
          {/* Header */}
          <div className="bg-primary-600 text-white p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <MessageCircle className="h-6 w-6 mr-3" />
                <h2 className="text-lg font-semibold">Messages</h2>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setShowMentorshipProgram(true)}
                  className="bg-white bg-opacity-20 hover:bg-opacity-30 text-white p-2 rounded-lg transition-colors duration-200"
                  title="Mentorship Program"
                >
                  <GraduationCap className="h-4 w-4" />
                </button>
                <button
                  onClick={onClose}
                  className="bg-white bg-opacity-20 hover:bg-opacity-30 text-white p-2 rounded-lg transition-colors duration-200"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Search */}
          <div className="p-4 border-b border-gray-200">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Search conversations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
          </div>

          {/* Chat List */}
          <div className="flex-1 overflow-y-auto">
            {filteredChats.map((chat) => (
              <div
                key={chat.id}
                onClick={() => setActiveChat(chat)}
                className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors duration-200 ${
                  activeChat?.id === chat.id ? 'bg-primary-50 border-primary-200' : ''
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-semibold ${
                      chat.userType === 'alumni' ? 'bg-green-500' :
                      chat.userType === 'student' ? 'bg-blue-500' :
                      chat.userType === 'group' ? 'bg-purple-500' : 'bg-gray-500'
                    }`}>
                      {chat.userType === 'group' ? (
                        <Users className="h-6 w-6" />
                      ) : (
                        chat.avatar
                      )}
                    </div>
                    {chat.online && chat.userType !== 'group' && (
                      <Circle className="absolute bottom-0 right-0 h-3 w-3 text-green-500 fill-current" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium text-gray-900 truncate">{chat.name}</h3>
                      <span className="text-xs text-gray-500">{chat.timestamp}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-gray-600 truncate">{chat.lastMessage}</p>
                      {chat.unread > 0 && (
                        <span className="bg-primary-600 text-white text-xs rounded-full px-2 py-1 min-w-[20px] text-center">
                          {chat.unread}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col">
          {activeChat ? (
            <>
              {/* Chat Header */}
              <div className="bg-white border-b border-gray-200 p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold ${
                      activeChat.userType === 'alumni' ? 'bg-green-500' :
                      activeChat.userType === 'student' ? 'bg-blue-500' :
                      activeChat.userType === 'group' ? 'bg-purple-500' : 'bg-gray-500'
                    }`}>
                      {activeChat.userType === 'group' ? (
                        <Users className="h-5 w-5" />
                      ) : (
                        activeChat.avatar
                      )}
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">{activeChat.name}</h3>
                      <p className="text-sm text-gray-500 capitalize">
                        {activeChat.userType === 'group' ? 'Community Group' : 
                         activeChat.online ? 'Online' : 'Offline'}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {activeChat.userType !== 'group' && (
                      <>
                        <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg">
                          <Phone className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => setShowVideoCall(true)}
                          className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg"
                          title="Start video call"
                        >
                          <Video className="h-4 w-4" />
                        </button>
                      </>
                    )}
                    <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg">
                      <MoreVertical className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {activeChat.messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex ${msg.senderId === user?.id ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                      msg.senderId === user?.id
                        ? 'bg-primary-600 text-white'
                        : 'bg-gray-100 text-gray-900'
                    }`}>
                      {msg.senderId !== user?.id && activeChat.userType === 'group' && (
                        <p className="text-xs font-medium mb-1 opacity-75">{msg.senderName}</p>
                      )}
                      <p className="text-sm">{msg.content}</p>
                      <p className={`text-xs mt-1 ${
                        msg.senderId === user?.id ? 'text-primary-100' : 'text-gray-500'
                      }`}>
                        {msg.timestamp}
                      </p>
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>

              {/* Message Input */}
              <div className="border-t border-gray-200 p-4">
                <div className="flex items-center space-x-2">
                  <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg">
                    <Paperclip className="h-4 w-4" />
                  </button>
                  <div className="flex-1 relative">
                    <input
                      type="text"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Type a message..."
                      className="w-full border border-gray-300 rounded-lg px-4 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                    <button className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 text-gray-500 hover:text-gray-700">
                      <Smile className="h-4 w-4" />
                    </button>
                  </div>
                  <button
                    onClick={handleSendMessage}
                    disabled={!message.trim()}
                    className="bg-primary-600 hover:bg-primary-700 disabled:bg-gray-300 text-white p-2 rounded-lg transition-colors duration-200"
                  >
                    <Send className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </>
          ) : (
            /* No Chat Selected */
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <MessageCircle className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Select a conversation</h3>
                <p className="text-gray-500">Choose a conversation from the sidebar to start messaging.</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Video Conference */}
      <VideoConference
        isOpen={showVideoCall}
        onClose={() => setShowVideoCall(false)}
        mentorshipSession={{
          topic: 'Direct Video Call',
          participant: activeChat
        }}
        participants={activeChat ? [activeChat, user] : []}
        isHost={false}
      />

      {/* Mentorship Program */}
      <MentorshipProgram
        isOpen={showMentorshipProgram}
        onClose={() => setShowMentorshipProgram(false)}
      />
    </div>
  );
};

export default ChatSystem;
