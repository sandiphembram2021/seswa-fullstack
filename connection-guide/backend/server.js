// Backend Server - API Provider
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 6000;

// 🌐 CORS Configuration - CRITICAL for frontend-backend connection
const corsOptions = {
  origin: [
    'http://localhost:3000',    // React default
    'http://localhost:5173',    // Vite default
    'http://localhost:8080',    // Vue default
    'https://your-frontend-domain.com'  // Production frontend
  ],
  credentials: true,  // Allow cookies/auth headers
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
};

app.use(cors(corsOptions));
app.use(express.json());  // Parse JSON requests

// 📊 Sample Data (in production, use a database)
let users = [
  { id: 1, name: 'John Doe', email: 'john@example.com', role: 'student' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'alumni' }
];

let events = [
  { id: 1, title: 'Tech Workshop', date: '2024-12-15', location: 'Online' },
  { id: 2, title: 'Annual Picnic', date: '2024-12-20', location: 'Park' }
];

// 🏥 Health Check Endpoint
app.get('/health', (req, res) => {
  res.json({
    status: 'OK',
    message: 'Backend server is running!',
    timestamp: new Date().toISOString()
  });
});

// 📡 API Status Endpoint
app.get('/api/status', (req, res) => {
  res.json({
    success: true,
    message: 'API is working!',
    endpoints: [
      'GET /api/users',
      'POST /api/users',
      'GET /api/events',
      'POST /api/events'
    ]
  });
});

// 👥 User Endpoints
app.get('/api/users', (req, res) => {
  res.json({
    success: true,
    data: users,
    count: users.length
  });
});

app.post('/api/users', (req, res) => {
  const { name, email, role } = req.body;
  
  if (!name || !email) {
    return res.status(400).json({
      success: false,
      error: 'Name and email are required'
    });
  }

  const newUser = {
    id: users.length + 1,
    name,
    email,
    role: role || 'student',
    createdAt: new Date().toISOString()
  };

  users.push(newUser);

  res.status(201).json({
    success: true,
    data: newUser,
    message: 'User created successfully'
  });
});

app.get('/api/users/:id', (req, res) => {
  const userId = parseInt(req.params.id);
  const user = users.find(u => u.id === userId);

  if (!user) {
    return res.status(404).json({
      success: false,
      error: 'User not found'
    });
  }

  res.json({
    success: true,
    data: user
  });
});

// 📅 Event Endpoints
app.get('/api/events', (req, res) => {
  res.json({
    success: true,
    data: events,
    count: events.length
  });
});

app.post('/api/events', (req, res) => {
  const { title, date, location } = req.body;
  
  if (!title || !date) {
    return res.status(400).json({
      success: false,
      error: 'Title and date are required'
    });
  }

  const newEvent = {
    id: events.length + 1,
    title,
    date,
    location: location || 'TBD',
    createdAt: new Date().toISOString()
  };

  events.push(newEvent);

  res.status(201).json({
    success: true,
    data: newEvent,
    message: 'Event created successfully'
  });
});

// 🚀 Start Server
app.listen(PORT, () => {
  console.log(`🚀 Backend Server running on port ${PORT}`);
  console.log(`🌐 CORS enabled for frontend connections`);
  console.log(`🔗 API endpoints:`);
  console.log(`   - GET  http://localhost:${PORT}/health`);
  console.log(`   - GET  http://localhost:${PORT}/api/status`);
  console.log(`   - GET  http://localhost:${PORT}/api/users`);
  console.log(`   - POST http://localhost:${PORT}/api/users`);
  console.log(`   - GET  http://localhost:${PORT}/api/events`);
  console.log(`   - POST http://localhost:${PORT}/api/events`);
});

module.exports = app;
