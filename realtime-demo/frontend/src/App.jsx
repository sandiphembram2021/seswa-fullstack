import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import axios from 'axios';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';

const API_BASE = 'http://localhost:8000/api';
const SOCKET_URL = 'http://localhost:8000';

function App() {
  // State for SESWA real-time data
  const [socket, setSocket] = useState(null);
  const [connected, setConnected] = useState(false);
  const [seswaData, setSeswaData] = useState({
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
      activeMentorships: 0
    },
    liveStats: {
      onlineUsers: 0,
      todayRegistrations: 0,
      todayEvents: 0,
      activeMentoringSessions: 0
    }
  });
  
  // State for SESWA-specific data
  const [liveStatsHistory, setLiveStatsHistory] = useState([]);
  const [seswaActivities, setSeswaActivities] = useState([]);
  const [mentorshipUpdates, setMentorshipUpdates] = useState([]);

  // State for SESWA forms
  const [studentForm, setStudentForm] = useState({
    firstName: '', lastName: '', email: '', college: 'IIEST Shibpur', branch: '', year: ''
  });
  const [alumniForm, setAlumniForm] = useState({
    firstName: '', lastName: '', email: '', college: 'IIEST Shibpur', graduationYear: '', currentCompany: ''
  });
  const [eventForm, setEventForm] = useState({
    title: '', description: '', date: '', time: '', location: '', category: 'workshop'
  });
  const [currentUser, setCurrentUser] = useState({ name: '', type: '' });

  // Initialize Socket.IO connection
  useEffect(() => {
    const newSocket = io(SOCKET_URL, {
      transports: ['websocket', 'polling']
    });

    newSocket.on('connect', () => {
      console.log('✅ Connected to server');
      setConnected(true);
      setSocket(newSocket);
    });

    newSocket.on('disconnect', () => {
      console.log('❌ Disconnected from server');
      setConnected(false);
    });

    // Listen for SESWA initial data
    newSocket.on('seswa_initial_data', (data) => {
      console.log('🎓 Received SESWA initial data:', data);
      setSeswaData(data);
    });

    // Listen for SESWA real-time updates
    newSocket.on('new_student', (student) => {
      setSeswaData(prev => ({
        ...prev,
        students: [...prev.students, student]
      }));
    });

    newSocket.on('new_alumni', (alumni) => {
      setSeswaData(prev => ({
        ...prev,
        alumni: [...prev.alumni, alumni]
      }));
    });

    newSocket.on('new_event', (event) => {
      setSeswaData(prev => ({
        ...prev,
        events: [...prev.events, event]
      }));
    });

    newSocket.on('new_mentorship', (session) => {
      setSeswaData(prev => ({
        ...prev,
        mentorshipSessions: [...prev.mentorshipSessions, session]
      }));
    });

    newSocket.on('analytics_update', (analytics) => {
      setSeswaData(prev => ({
        ...prev,
        analytics
      }));
    });

    newSocket.on('seswa_live_stats_update', (stats) => {
      setSeswaData(prev => ({
        ...prev,
        liveStats: stats
      }));

      // Add to history for chart
      setLiveStatsHistory(prev => {
        const newHistory = [...prev, {
          time: new Date().toLocaleTimeString(),
          onlineUsers: stats.onlineUsers,
          registrations: stats.todayRegistrations,
          events: stats.todayEvents,
          mentorships: stats.activeMentoringSessions
        }];
        return newHistory.slice(-15); // Keep last 15 points
      });
    });

    newSocket.on('seswa_activity', (activity) => {
      setSeswaActivities(prev => [activity, ...prev.slice(0, 9)]); // Keep last 10 activities
    });

    newSocket.on('seswa_mentorship_update', (update) => {
      setMentorshipUpdates(prev => [update, ...prev.slice(0, 4)]); // Keep last 5 updates
    });

    newSocket.on('seswa_user_joined', (userData) => {
      setSeswaActivities(prev => [{
        id: Date.now(),
        type: 'user_joined',
        message: `${userData.name} (${userData.userType}) joined from ${userData.college}`,
        timestamp: userData.timestamp,
        icon: userData.userType === 'student' ? '🎓' : '👨‍💼'
      }, ...prev.slice(0, 9)]);
    });

    return () => newSocket.close();
  }, []);

  // Fetch SESWA initial data via REST API
  useEffect(() => {
    const fetchSeswaData = async () => {
      try {
        const response = await axios.get(`${API_BASE}/dashboard`);
        setSeswaData(response.data.data);
      } catch (error) {
        console.error('Error fetching SESWA data:', error);
      }
    };

    fetchSeswaData();
  }, []);

  // Handle adding students
  const addStudent = async () => {
    if (!studentForm.firstName.trim() || !studentForm.lastName.trim() || !studentForm.email.trim()) return;

    try {
      await axios.post(`${API_BASE}/students`, studentForm);

      // Also emit via Socket.IO for immediate feedback
      if (socket) {
        socket.emit('seswa_user_join', {
          ...studentForm,
          userType: 'student'
        });
      }

      setStudentForm({
        firstName: '', lastName: '', email: '', college: 'IIEST Shibpur', branch: '', year: ''
      });
    } catch (error) {
      console.error('Error adding student:', error);
    }
  };

  // Handle adding alumni
  const addAlumni = async () => {
    if (!alumniForm.firstName.trim() || !alumniForm.lastName.trim() || !alumniForm.email.trim()) return;

    try {
      await axios.post(`${API_BASE}/alumni`, alumniForm);

      // Also emit via Socket.IO for immediate feedback
      if (socket) {
        socket.emit('seswa_user_join', {
          ...alumniForm,
          userType: 'alumni'
        });
      }

      setAlumniForm({
        firstName: '', lastName: '', email: '', college: 'IIEST Shibpur', graduationYear: '', currentCompany: ''
      });
    } catch (error) {
      console.error('Error adding alumni:', error);
    }
  };

  // Handle creating events
  const createEvent = async () => {
    if (!eventForm.title.trim() || !eventForm.description.trim() || !eventForm.date.trim()) return;

    try {
      await axios.post(`${API_BASE}/events`, eventForm);

      setEventForm({
        title: '', description: '', date: '', time: '', location: '', category: 'workshop'
      });
    } catch (error) {
      console.error('Error creating event:', error);
    }
  };

  // SESWA colleges list
  const seswaColleges = [
    'IIEST Shibpur', 'NIT Durgapur', 'IIT Kgp', 'JU', 'KGEC', 'JGEC',
    'CGEC', 'MAKAUT', 'UIT', 'GCELT', 'GCECT', 'GCETT B', 'GCETT S', 'RKMGCE'
  ];

  return (
    <div style={{
      padding: '20px',
      color: 'white',
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)'
    }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        {/* SESWA Header */}
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <h1 style={{ fontSize: '3rem', margin: '0 0 10px 0', color: '#fff' }}>
            🎓 SESWA Portal
          </h1>
          <p style={{ fontSize: '1.3rem', opacity: 0.9, marginBottom: '10px' }}>
            Santal Engineering Students Welfare Association
          </p>
          <p style={{ fontSize: '1rem', opacity: 0.8, marginBottom: '15px' }}>
            Real-Time Student & Alumni Management System
          </p>
          <div style={{
            display: 'inline-block',
            padding: '10px 20px',
            borderRadius: '25px',
            background: connected ? '#10B981' : '#EF4444',
            fontSize: '16px',
            fontWeight: 'bold',
            boxShadow: '0 4px 15px rgba(0,0,0,0.2)'
          }}>
            {connected ? '🟢 Portal Online' : '🔴 Portal Offline'}
          </div>
        </div>

        {/* SESWA Analytics Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '20px',
          marginBottom: '30px'
        }}>
          <div style={{
            background: 'rgba(255,255,255,0.15)',
            padding: '25px',
            borderRadius: '15px',
            textAlign: 'center',
            boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
            border: '1px solid rgba(255,255,255,0.2)'
          }}>
            <h3 style={{ margin: '0 0 15px 0', color: '#E0F2FE' }}>🎓 Students</h3>
            <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#38BDF8' }}>
              {seswaData.analytics.totalStudents}
            </div>
            <div style={{ fontSize: '0.9rem', opacity: 0.8, marginTop: '5px' }}>
              Registered Students
            </div>
          </div>

          <div style={{
            background: 'rgba(255,255,255,0.15)',
            padding: '25px',
            borderRadius: '15px',
            textAlign: 'center',
            boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
            border: '1px solid rgba(255,255,255,0.2)'
          }}>
            <h3 style={{ margin: '0 0 15px 0', color: '#FEF3C7' }}>👨‍💼 Alumni</h3>
            <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#F59E0B' }}>
              {seswaData.analytics.totalAlumni}
            </div>
            <div style={{ fontSize: '0.9rem', opacity: 0.8, marginTop: '5px' }}>
              Active Alumni
            </div>
          </div>

          <div style={{
            background: 'rgba(255,255,255,0.15)',
            padding: '25px',
            borderRadius: '15px',
            textAlign: 'center',
            boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
            border: '1px solid rgba(255,255,255,0.2)'
          }}>
            <h3 style={{ margin: '0 0 15px 0', color: '#D1FAE5' }}>🟢 Online</h3>
            <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#10B981' }}>
              {seswaData.liveStats.onlineUsers}
            </div>
            <div style={{ fontSize: '0.9rem', opacity: 0.8, marginTop: '5px' }}>
              Users Online
            </div>
          </div>

          <div style={{
            background: 'rgba(255,255,255,0.15)',
            padding: '25px',
            borderRadius: '15px',
            textAlign: 'center',
            boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
            border: '1px solid rgba(255,255,255,0.2)'
          }}>
            <h3 style={{ margin: '0 0 15px 0', color: '#FECACA' }}>📅 Events</h3>
            <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#EF4444' }}>
              {seswaData.analytics.totalEvents}
            </div>
            <div style={{ fontSize: '0.9rem', opacity: 0.8, marginTop: '5px' }}>
              Total Events
            </div>
          </div>

          <div style={{
            background: 'rgba(255,255,255,0.15)',
            padding: '25px',
            borderRadius: '15px',
            textAlign: 'center',
            boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
            border: '1px solid rgba(255,255,255,0.2)'
          }}>
            <h3 style={{ margin: '0 0 15px 0', color: '#E9D5FF' }}>🤝 Mentorship</h3>
            <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#8B5CF6' }}>
              {seswaData.analytics.activeMentorships}
            </div>
            <div style={{ fontSize: '0.9rem', opacity: 0.8, marginTop: '5px' }}>
              Active Sessions
            </div>
          </div>
        </div>

        {/* SESWA Charts */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(450px, 1fr))',
          gap: '25px',
          marginBottom: '30px'
        }}>
          {/* Live Activity Chart */}
          <div style={{
            background: 'rgba(255,255,255,0.15)',
            padding: '25px',
            borderRadius: '15px',
            boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
            border: '1px solid rgba(255,255,255,0.2)'
          }}>
            <h3 style={{ margin: '0 0 20px 0', color: '#E0F2FE' }}>📊 Live Portal Activity</h3>
            <ResponsiveContainer width="100%" height={220}>
              <LineChart data={liveStatsHistory}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.3)" />
                <XAxis dataKey="time" stroke="white" fontSize={12} />
                <YAxis stroke="white" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    background: 'rgba(0,0,0,0.9)',
                    border: 'none',
                    borderRadius: '8px',
                    color: 'white'
                  }}
                />
                <Line type="monotone" dataKey="onlineUsers" stroke="#38BDF8" strokeWidth={3} name="Online Users" />
                <Line type="monotone" dataKey="registrations" stroke="#10B981" strokeWidth={2} name="Today's Registrations" />
                <Line type="monotone" dataKey="mentorships" stroke="#8B5CF6" strokeWidth={2} name="Active Mentorships" />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Live SESWA Activities */}
          <div style={{
            background: 'rgba(255,255,255,0.15)',
            padding: '25px',
            borderRadius: '15px',
            boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
            border: '1px solid rgba(255,255,255,0.2)'
          }}>
            <h3 style={{ margin: '0 0 20px 0', color: '#FEF3C7' }}>🔔 Live SESWA Activities</h3>
            <div style={{ maxHeight: '220px', overflowY: 'auto' }}>
              {seswaActivities.map((activity, index) => (
                <div key={activity.id} style={{
                  padding: '12px 0',
                  borderBottom: '1px solid rgba(255,255,255,0.2)',
                  fontSize: '14px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px'
                }}>
                  <span style={{ fontSize: '18px' }}>{activity.icon}</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ color: '#E0F2FE' }}>{activity.message}</div>
                    <div style={{ opacity: 0.7, fontSize: '12px', marginTop: '2px' }}>
                      {new Date(activity.timestamp).toLocaleTimeString()}
                    </div>
                  </div>
                </div>
              ))}
              {seswaActivities.length === 0 && (
                <div style={{ textAlign: 'center', opacity: 0.7, padding: '20px' }}>
                  Waiting for live activities...
                </div>
              )}
            </div>
          </div>
        </div>

        {/* SESWA Registration Forms */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
          gap: '25px',
          marginBottom: '30px'
        }}>
          {/* Student Registration Form */}
          <div style={{
            background: 'rgba(255,255,255,0.15)',
            padding: '25px',
            borderRadius: '15px',
            boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
            border: '1px solid rgba(255,255,255,0.2)'
          }}>
            <h3 style={{ margin: '0 0 20px 0', color: '#E0F2FE' }}>🎓 Student Registration</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '10px' }}>
              <input
                type="text"
                placeholder="First Name"
                value={studentForm.firstName}
                onChange={(e) => setStudentForm({...studentForm, firstName: e.target.value})}
                style={{
                  padding: '12px',
                  border: 'none',
                  borderRadius: '8px',
                  background: 'rgba(255,255,255,0.2)',
                  color: 'white',
                  fontSize: '14px'
                }}
              />
              <input
                type="text"
                placeholder="Last Name"
                value={studentForm.lastName}
                onChange={(e) => setStudentForm({...studentForm, lastName: e.target.value})}
                style={{
                  padding: '12px',
                  border: 'none',
                  borderRadius: '8px',
                  background: 'rgba(255,255,255,0.2)',
                  color: 'white',
                  fontSize: '14px'
                }}
              />
            </div>
            <input
              type="email"
              placeholder="Email Address"
              value={studentForm.email}
              onChange={(e) => setStudentForm({...studentForm, email: e.target.value})}
              style={{
                width: '100%',
                padding: '12px',
                marginBottom: '10px',
                border: 'none',
                borderRadius: '8px',
                background: 'rgba(255,255,255,0.2)',
                color: 'white',
                fontSize: '14px'
              }}
            />
            <select
              value={studentForm.college}
              onChange={(e) => setStudentForm({...studentForm, college: e.target.value})}
              style={{
                width: '100%',
                padding: '12px',
                marginBottom: '10px',
                border: 'none',
                borderRadius: '8px',
                background: 'rgba(255,255,255,0.2)',
                color: 'white',
                fontSize: '14px'
              }}
            >
              {seswaColleges.map(college => (
                <option key={college} value={college} style={{color: 'black'}}>{college}</option>
              ))}
            </select>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '15px' }}>
              <input
                type="text"
                placeholder="Branch (e.g., CSE)"
                value={studentForm.branch}
                onChange={(e) => setStudentForm({...studentForm, branch: e.target.value})}
                style={{
                  padding: '12px',
                  border: 'none',
                  borderRadius: '8px',
                  background: 'rgba(255,255,255,0.2)',
                  color: 'white',
                  fontSize: '14px'
                }}
              />
              <input
                type="text"
                placeholder="Year (e.g., 3rd Year)"
                value={studentForm.year}
                onChange={(e) => setStudentForm({...studentForm, year: e.target.value})}
                style={{
                  padding: '12px',
                  border: 'none',
                  borderRadius: '8px',
                  background: 'rgba(255,255,255,0.2)',
                  color: 'white',
                  fontSize: '14px'
                }}
              />
            </div>
            <button
              onClick={addStudent}
              style={{
                width: '100%',
                padding: '15px',
                border: 'none',
                borderRadius: '8px',
                background: 'linear-gradient(135deg, #38BDF8, #0EA5E9)',
                color: 'white',
                fontSize: '16px',
                fontWeight: 'bold',
                cursor: 'pointer',
                boxShadow: '0 4px 15px rgba(56, 189, 248, 0.3)'
              }}
            >
              Register Student
            </button>
          </div>

          {/* Alumni Registration Form */}
          <div style={{
            background: 'rgba(255,255,255,0.15)',
            padding: '25px',
            borderRadius: '15px',
            boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
            border: '1px solid rgba(255,255,255,0.2)'
          }}>
            <h3 style={{ margin: '0 0 20px 0', color: '#FEF3C7' }}>👨‍💼 Alumni Registration</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '10px' }}>
              <input
                type="text"
                placeholder="First Name"
                value={alumniForm.firstName}
                onChange={(e) => setAlumniForm({...alumniForm, firstName: e.target.value})}
                style={{
                  padding: '12px',
                  border: 'none',
                  borderRadius: '8px',
                  background: 'rgba(255,255,255,0.2)',
                  color: 'white',
                  fontSize: '14px'
                }}
              />
              <input
                type="text"
                placeholder="Last Name"
                value={alumniForm.lastName}
                onChange={(e) => setAlumniForm({...alumniForm, lastName: e.target.value})}
                style={{
                  padding: '12px',
                  border: 'none',
                  borderRadius: '8px',
                  background: 'rgba(255,255,255,0.2)',
                  color: 'white',
                  fontSize: '14px'
                }}
              />
            </div>
            <input
              type="email"
              placeholder="Email Address"
              value={alumniForm.email}
              onChange={(e) => setAlumniForm({...alumniForm, email: e.target.value})}
              style={{
                width: '100%',
                padding: '12px',
                marginBottom: '10px',
                border: 'none',
                borderRadius: '8px',
                background: 'rgba(255,255,255,0.2)',
                color: 'white',
                fontSize: '14px'
              }}
            />
            <select
              value={alumniForm.college}
              onChange={(e) => setAlumniForm({...alumniForm, college: e.target.value})}
              style={{
                width: '100%',
                padding: '12px',
                marginBottom: '10px',
                border: 'none',
                borderRadius: '8px',
                background: 'rgba(255,255,255,0.2)',
                color: 'white',
                fontSize: '14px'
              }}
            >
              {seswaColleges.map(college => (
                <option key={college} value={college} style={{color: 'black'}}>{college}</option>
              ))}
            </select>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '15px' }}>
              <input
                type="text"
                placeholder="Graduation Year"
                value={alumniForm.graduationYear}
                onChange={(e) => setAlumniForm({...alumniForm, graduationYear: e.target.value})}
                style={{
                  padding: '12px',
                  border: 'none',
                  borderRadius: '8px',
                  background: 'rgba(255,255,255,0.2)',
                  color: 'white',
                  fontSize: '14px'
                }}
              />
              <input
                type="text"
                placeholder="Current Company"
                value={alumniForm.currentCompany}
                onChange={(e) => setAlumniForm({...alumniForm, currentCompany: e.target.value})}
                style={{
                  padding: '12px',
                  border: 'none',
                  borderRadius: '8px',
                  background: 'rgba(255,255,255,0.2)',
                  color: 'white',
                  fontSize: '14px'
                }}
              />
            </div>
            <button
              onClick={addAlumni}
              style={{
                width: '100%',
                padding: '15px',
                border: 'none',
                borderRadius: '8px',
                background: 'linear-gradient(135deg, #F59E0B, #D97706)',
                color: 'white',
                fontSize: '16px',
                fontWeight: 'bold',
                cursor: 'pointer',
                boxShadow: '0 4px 15px rgba(245, 158, 11, 0.3)'
              }}
            >
              Register Alumni
            </button>
          </div>

          {/* Event Creation Form */}
          <div style={{
            background: 'rgba(255,255,255,0.15)',
            padding: '25px',
            borderRadius: '15px',
            boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
            border: '1px solid rgba(255,255,255,0.2)'
          }}>
            <h3 style={{ margin: '0 0 20px 0', color: '#FECACA' }}>📅 Create Event</h3>
            <input
              type="text"
              placeholder="Event Title"
              value={eventForm.title}
              onChange={(e) => setEventForm({...eventForm, title: e.target.value})}
              style={{
                width: '100%',
                padding: '12px',
                marginBottom: '10px',
                border: 'none',
                borderRadius: '8px',
                background: 'rgba(255,255,255,0.2)',
                color: 'white',
                fontSize: '14px'
              }}
            />
            <textarea
              placeholder="Event Description"
              value={eventForm.description}
              onChange={(e) => setEventForm({...eventForm, description: e.target.value})}
              rows={3}
              style={{
                width: '100%',
                padding: '12px',
                marginBottom: '10px',
                border: 'none',
                borderRadius: '8px',
                background: 'rgba(255,255,255,0.2)',
                color: 'white',
                fontSize: '14px',
                resize: 'vertical'
              }}
            />
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '10px' }}>
              <input
                type="date"
                value={eventForm.date}
                onChange={(e) => setEventForm({...eventForm, date: e.target.value})}
                style={{
                  padding: '12px',
                  border: 'none',
                  borderRadius: '8px',
                  background: 'rgba(255,255,255,0.2)',
                  color: 'white',
                  fontSize: '14px'
                }}
              />
              <input
                type="time"
                value={eventForm.time}
                onChange={(e) => setEventForm({...eventForm, time: e.target.value})}
                style={{
                  padding: '12px',
                  border: 'none',
                  borderRadius: '8px',
                  background: 'rgba(255,255,255,0.2)',
                  color: 'white',
                  fontSize: '14px'
                }}
              />
            </div>
            <input
              type="text"
              placeholder="Location (e.g., Online, IIEST Shibpur)"
              value={eventForm.location}
              onChange={(e) => setEventForm({...eventForm, location: e.target.value})}
              style={{
                width: '100%',
                padding: '12px',
                marginBottom: '15px',
                border: 'none',
                borderRadius: '8px',
                background: 'rgba(255,255,255,0.2)',
                color: 'white',
                fontSize: '14px'
              }}
            />
            <button
              onClick={createEvent}
              style={{
                width: '100%',
                padding: '15px',
                border: 'none',
                borderRadius: '8px',
                background: 'linear-gradient(135deg, #EF4444, #DC2626)',
                color: 'white',
                fontSize: '16px',
                fontWeight: 'bold',
                cursor: 'pointer',
                boxShadow: '0 4px 15px rgba(239, 68, 68, 0.3)'
              }}
            >
              Create Event
            </button>
          </div>
        </div>

        {/* SESWA Live Data Display */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
          gap: '25px'
        }}>
          {/* Recent Students */}
          <div style={{
            background: 'rgba(255,255,255,0.15)',
            padding: '25px',
            borderRadius: '15px',
            boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
            border: '1px solid rgba(255,255,255,0.2)'
          }}>
            <h3 style={{ margin: '0 0 20px 0', color: '#E0F2FE' }}>🎓 Recent Students</h3>
            <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
              {seswaData.students.slice(-8).map((student) => (
                <div key={student.id} style={{
                  padding: '15px 0',
                  borderBottom: '1px solid rgba(255,255,255,0.2)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '15px'
                }}>
                  <div style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #38BDF8, #0EA5E9)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '18px'
                  }}>
                    🎓
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 'bold', fontSize: '16px', color: '#E0F2FE' }}>
                      {student.firstName} {student.lastName}
                    </div>
                    <div style={{ fontSize: '14px', opacity: 0.8, color: '#B0E7FF' }}>
                      {student.college} • {student.branch} • {student.year}
                    </div>
                    <div style={{ fontSize: '12px', opacity: 0.7, marginTop: '2px' }}>
                      {student.email}
                    </div>
                  </div>
                  <div style={{
                    padding: '4px 8px',
                    borderRadius: '12px',
                    background: 'rgba(56, 189, 248, 0.3)',
                    fontSize: '12px',
                    color: '#38BDF8'
                  }}>
                    Student
                  </div>
                </div>
              ))}
              {seswaData.students.length === 0 && (
                <div style={{ textAlign: 'center', opacity: 0.7, padding: '40px 20px' }}>
                  No students registered yet
                </div>
              )}
            </div>
          </div>

          {/* Recent Alumni */}
          <div style={{
            background: 'rgba(255,255,255,0.15)',
            padding: '25px',
            borderRadius: '15px',
            boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
            border: '1px solid rgba(255,255,255,0.2)'
          }}>
            <h3 style={{ margin: '0 0 20px 0', color: '#FEF3C7' }}>👨‍💼 Recent Alumni</h3>
            <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
              {seswaData.alumni.slice(-8).map((alumni) => (
                <div key={alumni.id} style={{
                  padding: '15px 0',
                  borderBottom: '1px solid rgba(255,255,255,0.2)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '15px'
                }}>
                  <div style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #F59E0B, #D97706)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '18px'
                  }}>
                    👨‍💼
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 'bold', fontSize: '16px', color: '#FEF3C7' }}>
                      {alumni.firstName} {alumni.lastName}
                    </div>
                    <div style={{ fontSize: '14px', opacity: 0.8, color: '#FDE68A' }}>
                      {alumni.college} • Class of {alumni.graduationYear}
                    </div>
                    <div style={{ fontSize: '12px', opacity: 0.7, marginTop: '2px' }}>
                      {alumni.currentCompany} • {alumni.email}
                    </div>
                  </div>
                  <div style={{
                    padding: '4px 8px',
                    borderRadius: '12px',
                    background: 'rgba(245, 158, 11, 0.3)',
                    fontSize: '12px',
                    color: '#F59E0B'
                  }}>
                    Alumni
                  </div>
                </div>
              ))}
              {seswaData.alumni.length === 0 && (
                <div style={{ textAlign: 'center', opacity: 0.7, padding: '40px 20px' }}>
                  No alumni registered yet
                </div>
              )}
            </div>
          </div>

          {/* Recent Events */}
          <div style={{
            background: 'rgba(255,255,255,0.15)',
            padding: '25px',
            borderRadius: '15px',
            boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
            border: '1px solid rgba(255,255,255,0.2)'
          }}>
            <h3 style={{ margin: '0 0 20px 0', color: '#FECACA' }}>📅 Recent Events</h3>
            <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
              {seswaData.events.slice(-6).map((event) => (
                <div key={event.id} style={{
                  padding: '15px 0',
                  borderBottom: '1px solid rgba(255,255,255,0.2)'
                }}>
                  <div style={{ fontWeight: 'bold', fontSize: '16px', color: '#FECACA', marginBottom: '5px' }}>
                    {event.title}
                  </div>
                  <div style={{ fontSize: '14px', opacity: 0.8, marginBottom: '8px', color: '#FCA5A5' }}>
                    {event.description}
                  </div>
                  <div style={{ display: 'flex', gap: '15px', fontSize: '12px', opacity: 0.7 }}>
                    <span>📅 {event.date}</span>
                    <span>🕐 {event.time}</span>
                    <span>📍 {event.location}</span>
                  </div>
                  <div style={{
                    marginTop: '8px',
                    padding: '4px 8px',
                    borderRadius: '12px',
                    background: 'rgba(239, 68, 68, 0.3)',
                    fontSize: '12px',
                    color: '#EF4444',
                    display: 'inline-block'
                  }}>
                    {event.category}
                  </div>
                </div>
              ))}
              {seswaData.events.length === 0 && (
                <div style={{ textAlign: 'center', opacity: 0.7, padding: '40px 20px' }}>
                  No events created yet
                </div>
              )}
            </div>
          </div>

          {/* Mentorship Updates */}
          <div style={{
            background: 'rgba(255,255,255,0.15)',
            padding: '25px',
            borderRadius: '15px',
            boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
            border: '1px solid rgba(255,255,255,0.2)'
          }}>
            <h3 style={{ margin: '0 0 20px 0', color: '#E9D5FF' }}>🤝 Mentorship Updates</h3>
            <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
              {mentorshipUpdates.map((update) => (
                <div key={update.id} style={{
                  padding: '12px 0',
                  borderBottom: '1px solid rgba(255,255,255,0.2)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px'
                }}>
                  <span style={{ fontSize: '18px' }}>🤝</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ color: '#E9D5FF', fontSize: '14px' }}>{update.message}</div>
                    <div style={{ opacity: 0.7, fontSize: '12px', marginTop: '2px' }}>
                      {new Date(update.timestamp).toLocaleTimeString()}
                    </div>
                  </div>
                </div>
              ))}
              {mentorshipUpdates.length === 0 && (
                <div style={{ textAlign: 'center', opacity: 0.7, padding: '40px 20px' }}>
                  Waiting for mentorship updates...
                </div>
              )}
            </div>
          </div>
        </div>

        {/* SESWA Footer */}
        <div style={{ textAlign: 'center', marginTop: '50px', padding: '30px', opacity: 0.9 }}>
          <div style={{
            background: 'rgba(255,255,255,0.1)',
            padding: '25px',
            borderRadius: '15px',
            marginBottom: '20px'
          }}>
            <h3 style={{ margin: '0 0 15px 0', color: '#E0F2FE' }}>🎓 About SESWA</h3>
            <p style={{ fontSize: '16px', lineHeight: '1.6', color: '#B0E7FF' }}>
              Santal Engineering Students Welfare Association (SESWA) was founded on August 31, 2003,
              at Bengal Engineering & Science University, Shibpur. Our mission is to promote Santal culture,
              provide academic support, facilitate scholarships, and organize community events.
            </p>
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '30px',
              marginTop: '20px',
              flexWrap: 'wrap'
            }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '24px', marginBottom: '5px' }}>📍</div>
                <div style={{ fontSize: '14px', opacity: 0.8 }}>Nityananda Nagar, D.S.Lane<br/>Howrah, Kolkata, India, 711 109</div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '24px', marginBottom: '5px' }}>📧</div>
                <div style={{ fontSize: '14px', opacity: 0.8 }}>seswawb@gmail.com</div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '24px', marginBottom: '5px' }}>🎯</div>
                <div style={{ fontSize: '14px', opacity: 0.8 }}>Founded: August 31, 2003</div>
              </div>
            </div>
          </div>

          <div style={{ fontSize: '14px', opacity: 0.7, color: '#B0E7FF' }}>
            <p>🚀 Real-time SESWA Portal powered by React + Node.js</p>
            <p>📡 Live updates via Socket.IO • REST API for data management</p>
            <p>💻 Connecting Santal engineering students and alumni worldwide</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
