const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);

// Configure CORS for both Express and Socket.IO
const corsOptions = {
  origin: ["http://localhost:3000", "http://localhost:5173", "http://localhost:3001"],
  credentials: true
};

app.use(cors(corsOptions));
app.use(express.json());

// Configure Socket.IO with CORS
const io = socketIo(server, {
  cors: corsOptions
});

// SESWA Portal Real-time Data Store
let seswaData = {
  students: [],
  alumni: [],
  events: [],
  mentorshipSessions: [],
  notifications: [],
  chatMessages: [],
  analytics: {
    totalStudents: 0,
    totalAlumni: 0,
    activeUsers: 0,
    totalEvents: 0,
    activeMentorships: 0,
    totalNotifications: 0,
    serverUptime: Date.now()
  },
  liveStats: {
    onlineUsers: 0,
    todayRegistrations: 0,
    todayEvents: 0,
    activeMentoringSessions: 0
  }
};

// Middleware to track requests
app.use((req, res, next) => {
  seswaData.liveStats.onlineUsers++;
  next();
});

// REST API Endpoints
app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: Date.now() - seswaData.analytics.serverUptime,
    message: 'SESWA Portal Backend is running!'
  });
});

app.get('/api/dashboard', (req, res) => {
  res.json({
    success: true,
    data: seswaData,
    timestamp: new Date().toISOString()
  });
});

app.get('/api/students', (req, res) => {
  res.json({
    success: true,
    students: seswaData.students,
    count: seswaData.students.length
  });
});

app.get('/api/alumni', (req, res) => {
  res.json({
    success: true,
    alumni: seswaData.alumni,
    count: seswaData.alumni.length
  });
});

app.get('/api/events', (req, res) => {
  res.json({
    success: true,
    events: seswaData.events,
    count: seswaData.events.length
  });
});

app.get('/api/mentorship', (req, res) => {
  res.json({
    success: true,
    sessions: seswaData.mentorshipSessions,
    count: seswaData.mentorshipSessions.length
  });
});

app.get('/api/notifications', (req, res) => {
  res.json({
    success: true,
    notifications: seswaData.notifications,
    count: seswaData.notifications.length
  });
});

app.post('/api/students', (req, res) => {
  const { firstName, lastName, email, college, branch, year } = req.body;

  if (!firstName || !lastName || !email || !college) {
    return res.status(400).json({
      success: false,
      error: 'First name, last name, email, and college are required'
    });
  }

  const newStudent = {
    id: Date.now(),
    firstName,
    lastName,
    email,
    college,
    branch: branch || 'Not specified',
    year: year || 'Not specified',
    userType: 'student',
    joinedAt: new Date().toISOString(),
    isOnline: true
  };

  seswaData.students.push(newStudent);
  seswaData.analytics.totalStudents++;
  seswaData.analytics.activeUsers++;
  seswaData.liveStats.todayRegistrations++;

  // Emit to all connected clients
  io.emit('new_student', newStudent);
  io.emit('analytics_update', seswaData.analytics);

  res.json({
    success: true,
    student: newStudent
  });
});

app.post('/api/alumni', (req, res) => {
  const { firstName, lastName, email, college, graduationYear, currentCompany } = req.body;

  if (!firstName || !lastName || !email || !college) {
    return res.status(400).json({
      success: false,
      error: 'First name, last name, email, and college are required'
    });
  }

  const newAlumni = {
    id: Date.now(),
    firstName,
    lastName,
    email,
    college,
    graduationYear: graduationYear || 'Not specified',
    currentCompany: currentCompany || 'Not specified',
    userType: 'alumni',
    joinedAt: new Date().toISOString(),
    isOnline: true
  };

  seswaData.alumni.push(newAlumni);
  seswaData.analytics.totalAlumni++;
  seswaData.analytics.activeUsers++;
  seswaData.liveStats.todayRegistrations++;

  // Emit to all connected clients
  io.emit('new_alumni', newAlumni);
  io.emit('analytics_update', seswaData.analytics);

  res.json({
    success: true,
    alumni: newAlumni
  });
});

app.post('/api/events', (req, res) => {
  const { title, description, date, time, location, category } = req.body;

  if (!title || !description || !date) {
    return res.status(400).json({
      success: false,
      error: 'Title, description, and date are required'
    });
  }

  const newEvent = {
    id: Date.now(),
    title,
    description,
    date,
    time: time || '18:00',
    location: location || 'Online',
    category: category || 'general',
    createdAt: new Date().toISOString(),
    registrations: 0
  };

  seswaData.events.push(newEvent);
  seswaData.analytics.totalEvents++;
  seswaData.liveStats.todayEvents++;

  // Emit to all connected clients
  io.emit('new_event', newEvent);
  io.emit('analytics_update', seswaData.analytics);

  res.json({
    success: true,
    event: newEvent
  });
});

app.post('/api/mentorship', (req, res) => {
  const { studentName, mentorName, topic, duration } = req.body;

  if (!studentName || !mentorName || !topic) {
    return res.status(400).json({
      success: false,
      error: 'Student name, mentor name, and topic are required'
    });
  }

  const newSession = {
    id: Date.now(),
    studentName,
    mentorName,
    topic,
    duration: duration || 60,
    status: 'scheduled',
    createdAt: new Date().toISOString()
  };

  seswaData.mentorshipSessions.push(newSession);
  seswaData.analytics.activeMentorships++;
  seswaData.liveStats.activeMentoringSessions++;

  // Emit to all connected clients
  io.emit('new_mentorship', newSession);
  io.emit('analytics_update', seswaData.analytics);

  res.json({
    success: true,
    session: newSession
  });
});

app.post('/api/notifications', (req, res) => {
  const { title, message, type, targetAudience } = req.body;

  if (!title || !message) {
    return res.status(400).json({
      success: false,
      error: 'Title and message are required'
    });
  }

  const newNotification = {
    id: Date.now(),
    title,
    message,
    type: type || 'info',
    targetAudience: targetAudience || 'all',
    createdAt: new Date().toISOString(),
    isRead: false
  };

  seswaData.notifications.push(newNotification);
  seswaData.analytics.totalNotifications++;

  // Emit to all connected clients
  io.emit('new_notification', newNotification);
  io.emit('analytics_update', seswaData.analytics);

  res.json({
    success: true,
    notification: newNotification
  });
});

// Socket.IO real-time connections
io.on('connection', (socket) => {
  console.log(`🔌 SESWA User connected: ${socket.id}`);
  seswaData.analytics.activeUsers++;
  seswaData.liveStats.onlineUsers++;

  // Send current SESWA data to new connection
  socket.emit('seswa_initial_data', seswaData);

  // Handle SESWA user joining
  socket.on('seswa_user_join', (userData) => {
    console.log(`👤 SESWA User joined: ${userData.firstName} ${userData.lastName} (${userData.userType})`);
    socket.userData = userData;

    // Broadcast to all clients
    io.emit('seswa_user_joined', {
      name: `${userData.firstName} ${userData.lastName}`,
      userType: userData.userType,
      college: userData.college,
      timestamp: new Date().toISOString()
    });

    io.emit('analytics_update', seswaData.analytics);
  });

  // Handle SESWA chat messages
  socket.on('seswa_send_message', (messageData) => {
    const newMessage = {
      id: Date.now(),
      message: messageData.message,
      senderName: messageData.senderName || socket.userData?.firstName || 'Anonymous',
      senderType: messageData.senderType || socket.userData?.userType || 'unknown',
      timestamp: new Date().toISOString()
    };

    seswaData.chatMessages.push(newMessage);

    // Broadcast to all clients
    io.emit('seswa_new_message', newMessage);
    io.emit('analytics_update', seswaData.analytics);
  });

  // Handle typing indicators
  socket.on('typing_start', (data) => {
    socket.broadcast.emit('user_typing', {
      username: data.username || socket.username,
      timestamp: new Date().toISOString()
    });
  });

  socket.on('typing_stop', (data) => {
    socket.broadcast.emit('user_stopped_typing', {
      username: data.username || socket.username
    });
  });

  // Handle disconnection
  socket.on('disconnect', () => {
    console.log(`🔌 SESWA User disconnected: ${socket.id}`);
    seswaData.analytics.activeUsers = Math.max(0, seswaData.analytics.activeUsers - 1);
    seswaData.liveStats.onlineUsers = Math.max(0, seswaData.liveStats.onlineUsers - 1);

    if (socket.userData) {
      io.emit('seswa_user_left', {
        name: `${socket.userData.firstName} ${socket.userData.lastName}`,
        userType: socket.userData.userType,
        timestamp: new Date().toISOString()
      });
    }

    io.emit('analytics_update', seswaData.analytics);
  });
});

// Generate SESWA real-time data for demonstration
setInterval(() => {
  // Simulate SESWA live stats
  seswaData.liveStats.onlineUsers = Math.max(1, seswaData.liveStats.onlineUsers + Math.floor(Math.random() * 3) - 1);

  // Emit live stats to all clients
  io.emit('seswa_live_stats_update', seswaData.liveStats);
}, 3000); // Every 3 seconds

// Generate SESWA-specific events
setInterval(() => {
  const seswaEvents = [
    'New student registered from IIEST Shibpur',
    'Alumni joined from NIT Durgapur',
    'Mentorship session started',
    'New event created: Technical Workshop',
    'Magazine "BERA TARAS" uploaded',
    'Video conference session initiated',
    'Scholarship notification sent',
    'WBJEE counseling session scheduled',
    'Cultural event registration opened',
    'Alumni networking event announced'
  ];

  const randomEvent = {
    id: Date.now(),
    type: 'seswa_activity',
    message: seswaEvents[Math.floor(Math.random() * seswaEvents.length)],
    timestamp: new Date().toISOString(),
    icon: ['🎓', '👥', '📚', '🎯', '📖', '💻', '🏆', '📋', '🎭', '🤝'][Math.floor(Math.random() * 10)]
  };

  io.emit('seswa_activity', randomEvent);
}, 4000); // Every 4 seconds

// Generate mentorship notifications
setInterval(() => {
  const mentorshipUpdates = [
    'New mentorship request from CSE student',
    'Mentorship session completed successfully',
    'Alumni mentor available for guidance',
    'Career guidance session scheduled',
    'Technical interview preparation started'
  ];

  const mentorshipEvent = {
    id: Date.now(),
    type: 'mentorship_update',
    message: mentorshipUpdates[Math.floor(Math.random() * mentorshipUpdates.length)],
    timestamp: new Date().toISOString()
  };

  io.emit('seswa_mentorship_update', mentorshipEvent);
}, 7000); // Every 7 seconds

const PORT = process.env.PORT || 8000;

server.listen(PORT, () => {
  console.log(`🎓 SESWA Portal Backend Server running on port ${PORT}`);
  console.log(`📡 Socket.IO enabled for real-time SESWA features`);
  console.log(`🌐 CORS enabled for frontend connections`);
  console.log(`🔗 SESWA API endpoints:`);
  console.log(`   - GET  http://localhost:${PORT}/api/health`);
  console.log(`   - GET  http://localhost:${PORT}/api/dashboard`);
  console.log(`   - GET  http://localhost:${PORT}/api/students`);
  console.log(`   - GET  http://localhost:${PORT}/api/alumni`);
  console.log(`   - GET  http://localhost:${PORT}/api/events`);
  console.log(`   - GET  http://localhost:${PORT}/api/mentorship`);
  console.log(`   - POST http://localhost:${PORT}/api/students`);
  console.log(`   - POST http://localhost:${PORT}/api/alumni`);
  console.log(`   - POST http://localhost:${PORT}/api/events`);
  console.log(`   - POST http://localhost:${PORT}/api/mentorship`);
});
