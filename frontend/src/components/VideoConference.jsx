import React, { useState, useRef, useEffect } from 'react';
import {
  Video,
  VideoOff,
  Mic,
  MicOff,
  Phone,
  PhoneOff,
  Monitor,
  MessageSquare,
  Users,
  Settings,
  Maximize,
  Minimize,
  Volume2,
  VolumeX,
  Camera,
  MoreVertical,
  Clock,
  X
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useNotifications } from '../contexts/NotificationContext';

const VideoConference = ({ 
  isOpen, 
  onClose, 
  mentorshipSession,
  participants = [],
  isHost = false 
}) => {
  const { user } = useAuth();
  const { createSystemNotification } = useNotifications();
  
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [isAudioOn, setIsAudioOn] = useState(true);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [showParticipants, setShowParticipants] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState('connecting');
  const [sessionDuration, setSessionDuration] = useState(0);
  const [chatMessages, setChatMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  
  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const chatEndRef = useRef(null);
  
  // Mock participants data
  const mockParticipants = [
    {
      id: 'mentor_1',
      name: 'Dr. Priya Hansda',
      role: 'Mentor',
      userType: 'alumni',
      isVideoOn: true,
      isAudioOn: true,
      isHost: true
    },
    {
      id: user?.id || 'student_1',
      name: user?.firstName + ' ' + user?.lastName || 'Current User',
      role: 'Mentee',
      userType: user?.userType || 'student',
      isVideoOn: isVideoOn,
      isAudioOn: isAudioOn,
      isHost: false
    }
  ];

  // Session timer
  useEffect(() => {
    if (isOpen && connectionStatus === 'connected') {
      const timer = setInterval(() => {
        setSessionDuration(prev => prev + 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [isOpen, connectionStatus]);

  // Simulate connection
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        setConnectionStatus('connected');
        createSystemNotification(
          'Video Conference Started',
          'You are now connected to the mentorship session',
          'normal'
        );
      }, 2000);
    }
  }, [isOpen, createSystemNotification]);

  // Auto-scroll chat
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages]);

  const formatDuration = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const toggleVideo = () => {
    setIsVideoOn(!isVideoOn);
    createSystemNotification(
      isVideoOn ? 'Camera Off' : 'Camera On',
      `Your camera is now ${isVideoOn ? 'disabled' : 'enabled'}`,
      'normal'
    );
  };

  const toggleAudio = () => {
    setIsAudioOn(!isAudioOn);
    createSystemNotification(
      isAudioOn ? 'Microphone Muted' : 'Microphone Unmuted',
      `Your microphone is now ${isAudioOn ? 'muted' : 'unmuted'}`,
      'normal'
    );
  };

  const toggleScreenShare = () => {
    setIsScreenSharing(!isScreenSharing);
    createSystemNotification(
      isScreenSharing ? 'Screen Share Stopped' : 'Screen Share Started',
      `Screen sharing is now ${isScreenSharing ? 'disabled' : 'enabled'}`,
      'normal'
    );
  };

  const endCall = () => {
    createSystemNotification(
      'Call Ended',
      `Mentorship session ended after ${formatDuration(sessionDuration)}`,
      'normal'
    );
    onClose();
  };

  const sendMessage = () => {
    if (!newMessage.trim()) return;
    
    const message = {
      id: Date.now(),
      senderId: user?.id,
      senderName: user?.firstName + ' ' + user?.lastName,
      content: newMessage,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    
    setChatMessages(prev => [...prev, message]);
    setNewMessage('');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black z-50 flex flex-col">
      {/* Header */}
      <div className="bg-gray-900 text-white p-4 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Video className="h-5 w-5 text-green-400" />
            <span className="font-medium">Mentorship Session</span>
          </div>
          {mentorshipSession && (
            <div className="text-sm text-gray-300">
              {mentorshipSession.topic || 'Career Guidance Session'}
            </div>
          )}
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2 text-sm">
            <Clock className="h-4 w-4" />
            <span>{formatDuration(sessionDuration)}</span>
          </div>
          <div className={`px-2 py-1 rounded-full text-xs ${
            connectionStatus === 'connected' ? 'bg-green-600' : 
            connectionStatus === 'connecting' ? 'bg-yellow-600' : 'bg-red-600'
          }`}>
            {connectionStatus}
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-700 rounded-lg transition-colors duration-200"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Main Video Area */}
      <div className="flex-1 flex">
        {/* Video Grid */}
        <div className="flex-1 relative bg-gray-900">
          {connectionStatus === 'connecting' ? (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center text-white">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
                <p className="text-lg">Connecting to mentorship session...</p>
                <p className="text-sm text-gray-300 mt-2">Please wait while we establish the connection</p>
              </div>
            </div>
          ) : (
            <div className="h-full grid grid-cols-1 md:grid-cols-2 gap-2 p-2">
              {/* Remote Video (Mentor) */}
              <div className="relative bg-gray-800 rounded-lg overflow-hidden">
                <video
                  ref={remoteVideoRef}
                  className="w-full h-full object-cover"
                  autoPlay
                  playsInline
                />
                {!mockParticipants[0]?.isVideoOn && (
                  <div className="absolute inset-0 flex items-center justify-center bg-gray-700">
                    <div className="text-center text-white">
                      <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-2">
                        <span className="text-xl font-bold">
                          {mockParticipants[0]?.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <p className="text-sm">{mockParticipants[0]?.name}</p>
                      <p className="text-xs text-gray-300">Camera off</p>
                    </div>
                  </div>
                )}
                <div className="absolute bottom-2 left-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-sm">
                  {mockParticipants[0]?.name} {mockParticipants[0]?.isHost && '(Host)'}
                </div>
                <div className="absolute bottom-2 right-2 flex space-x-1">
                  {!mockParticipants[0]?.isAudioOn && (
                    <div className="bg-red-600 p-1 rounded">
                      <MicOff className="h-3 w-3 text-white" />
                    </div>
                  )}
                </div>
              </div>

              {/* Local Video (You) */}
              <div className="relative bg-gray-800 rounded-lg overflow-hidden">
                <video
                  ref={localVideoRef}
                  className="w-full h-full object-cover scale-x-[-1]"
                  autoPlay
                  playsInline
                  muted
                />
                {!isVideoOn && (
                  <div className="absolute inset-0 flex items-center justify-center bg-gray-700">
                    <div className="text-center text-white">
                      <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-2">
                        <span className="text-xl font-bold">
                          {user?.firstName?.[0]}{user?.lastName?.[0]}
                        </span>
                      </div>
                      <p className="text-sm">You</p>
                      <p className="text-xs text-gray-300">Camera off</p>
                    </div>
                  </div>
                )}
                <div className="absolute bottom-2 left-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-sm">
                  You
                </div>
                <div className="absolute bottom-2 right-2 flex space-x-1">
                  {!isAudioOn && (
                    <div className="bg-red-600 p-1 rounded">
                      <MicOff className="h-3 w-3 text-white" />
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        {(showChat || showParticipants) && (
          <div className="w-80 bg-white border-l border-gray-200 flex flex-col">
            {/* Sidebar Header */}
            <div className="bg-gray-50 p-4 border-b border-gray-200">
              <div className="flex space-x-2">
                <button
                  onClick={() => {
                    setShowChat(true);
                    setShowParticipants(false);
                  }}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                    showChat ? 'bg-primary-600 text-white' : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  Chat
                </button>
                <button
                  onClick={() => {
                    setShowParticipants(true);
                    setShowChat(false);
                  }}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                    showParticipants ? 'bg-primary-600 text-white' : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  Participants ({mockParticipants.length})
                </button>
              </div>
            </div>

            {/* Chat Panel */}
            {showChat && (
              <div className="flex-1 flex flex-col">
                <div className="flex-1 overflow-y-auto p-4 space-y-3">
                  {chatMessages.length === 0 ? (
                    <div className="text-center text-gray-500 mt-8">
                      <MessageSquare className="h-8 w-8 mx-auto mb-2 text-gray-300" />
                      <p className="text-sm">No messages yet</p>
                      <p className="text-xs">Start the conversation!</p>
                    </div>
                  ) : (
                    chatMessages.map((message) => (
                      <div key={message.id} className="flex flex-col">
                        <div className="flex items-center space-x-2 mb-1">
                          <span className="text-xs font-medium text-gray-900">
                            {message.senderName}
                          </span>
                          <span className="text-xs text-gray-500">
                            {message.timestamp}
                          </span>
                        </div>
                        <div className="bg-gray-100 rounded-lg p-2">
                          <p className="text-sm text-gray-900">{message.content}</p>
                        </div>
                      </div>
                    ))
                  )}
                  <div ref={chatEndRef} />
                </div>
                
                <div className="p-4 border-t border-gray-200">
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Type a message..."
                      className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                    <button
                      onClick={sendMessage}
                      disabled={!newMessage.trim()}
                      className="bg-primary-600 hover:bg-primary-700 disabled:bg-gray-300 text-white px-3 py-2 rounded-lg transition-colors duration-200"
                    >
                      Send
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Participants Panel */}
            {showParticipants && (
              <div className="flex-1 overflow-y-auto p-4">
                <div className="space-y-3">
                  {mockParticipants.map((participant) => (
                    <div key={participant.id} className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-medium ${
                        participant.userType === 'alumni' ? 'bg-green-600' : 'bg-blue-600'
                      }`}>
                        {participant.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">
                          {participant.name}
                          {participant.isHost && (
                            <span className="ml-2 text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full">
                              Host
                            </span>
                          )}
                        </p>
                        <p className="text-xs text-gray-500 capitalize">{participant.role}</p>
                      </div>
                      <div className="flex space-x-1">
                        <div className={`p-1 rounded ${participant.isVideoOn ? 'bg-green-100' : 'bg-red-100'}`}>
                          {participant.isVideoOn ? (
                            <Video className="h-3 w-3 text-green-600" />
                          ) : (
                            <VideoOff className="h-3 w-3 text-red-600" />
                          )}
                        </div>
                        <div className={`p-1 rounded ${participant.isAudioOn ? 'bg-green-100' : 'bg-red-100'}`}>
                          {participant.isAudioOn ? (
                            <Mic className="h-3 w-3 text-green-600" />
                          ) : (
                            <MicOff className="h-3 w-3 text-red-600" />
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Controls */}
      <div className="bg-gray-900 p-4">
        <div className="flex items-center justify-center space-x-4">
          {/* Audio Control */}
          <button
            onClick={toggleAudio}
            className={`p-3 rounded-full transition-colors duration-200 ${
              isAudioOn ? 'bg-gray-700 hover:bg-gray-600 text-white' : 'bg-red-600 hover:bg-red-700 text-white'
            }`}
            title={isAudioOn ? 'Mute microphone' : 'Unmute microphone'}
          >
            {isAudioOn ? <Mic className="h-5 w-5" /> : <MicOff className="h-5 w-5" />}
          </button>

          {/* Video Control */}
          <button
            onClick={toggleVideo}
            className={`p-3 rounded-full transition-colors duration-200 ${
              isVideoOn ? 'bg-gray-700 hover:bg-gray-600 text-white' : 'bg-red-600 hover:bg-red-700 text-white'
            }`}
            title={isVideoOn ? 'Turn off camera' : 'Turn on camera'}
          >
            {isVideoOn ? <Video className="h-5 w-5" /> : <VideoOff className="h-5 w-5" />}
          </button>

          {/* Screen Share */}
          <button
            onClick={toggleScreenShare}
            className={`p-3 rounded-full transition-colors duration-200 ${
              isScreenSharing ? 'bg-blue-600 hover:bg-blue-700 text-white' : 'bg-gray-700 hover:bg-gray-600 text-white'
            }`}
            title={isScreenSharing ? 'Stop screen share' : 'Share screen'}
          >
            <Monitor className="h-5 w-5" />
          </button>

          {/* Chat Toggle */}
          <button
            onClick={() => setShowChat(!showChat)}
            className={`p-3 rounded-full transition-colors duration-200 ${
              showChat ? 'bg-primary-600 hover:bg-primary-700 text-white' : 'bg-gray-700 hover:bg-gray-600 text-white'
            }`}
            title="Toggle chat"
          >
            <MessageSquare className="h-5 w-5" />
          </button>

          {/* Participants Toggle */}
          <button
            onClick={() => setShowParticipants(!showParticipants)}
            className={`p-3 rounded-full transition-colors duration-200 ${
              showParticipants ? 'bg-primary-600 hover:bg-primary-700 text-white' : 'bg-gray-700 hover:bg-gray-600 text-white'
            }`}
            title="Show participants"
          >
            <Users className="h-5 w-5" />
          </button>

          {/* End Call */}
          <button
            onClick={endCall}
            className="p-3 rounded-full bg-red-600 hover:bg-red-700 text-white transition-colors duration-200"
            title="End call"
          >
            <PhoneOff className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default VideoConference;
