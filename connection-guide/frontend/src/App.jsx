// Frontend App - API Consumer
import React, { useState, useEffect } from 'react';
import axios from 'axios';

// 🔗 API Configuration
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:6000/api';

function App() {
  // 📊 State for data from backend
  const [users, setUsers] = useState([]);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [connectionStatus, setConnectionStatus] = useState('checking');

  // 📝 Form states
  const [userForm, setUserForm] = useState({ name: '', email: '', role: 'student' });
  const [eventForm, setEventForm] = useState({ title: '', date: '', location: '' });

  // 🔌 Test Backend Connection
  const testConnection = async () => {
    try {
      setConnectionStatus('checking');
      const response = await axios.get('http://localhost:6000/health');
      console.log('✅ Backend connection successful:', response.data);
      setConnectionStatus('connected');
      setError(null);
    } catch (error) {
      console.error('❌ Backend connection failed:', error);
      setConnectionStatus('disconnected');
      setError('Cannot connect to backend server');
    }
  };

  // 📥 Fetch Users from Backend
  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_BASE_URL}/users`);
      console.log('📥 Users fetched:', response.data);
      setUsers(response.data.data || []);
      setError(null);
    } catch (error) {
      console.error('❌ Error fetching users:', error);
      setError('Failed to fetch users');
    } finally {
      setLoading(false);
    }
  };

  // 📥 Fetch Events from Backend
  const fetchEvents = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_BASE_URL}/events`);
      console.log('📥 Events fetched:', response.data);
      setEvents(response.data.data || []);
      setError(null);
    } catch (error) {
      console.error('❌ Error fetching events:', error);
      setError('Failed to fetch events');
    } finally {
      setLoading(false);
    }
  };

  // 📤 Create User
  const createUser = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axios.post(`${API_BASE_URL}/users`, userForm);
      console.log('📤 User created:', response.data);
      
      // Reset form and refresh data
      setUserForm({ name: '', email: '', role: 'student' });
      await fetchUsers();
      setError(null);
    } catch (error) {
      console.error('❌ Error creating user:', error);
      setError('Failed to create user');
    } finally {
      setLoading(false);
    }
  };

  // 📤 Create Event
  const createEvent = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axios.post(`${API_BASE_URL}/events`, eventForm);
      console.log('📤 Event created:', response.data);
      
      // Reset form and refresh data
      setEventForm({ title: '', date: '', location: '' });
      await fetchEvents();
      setError(null);
    } catch (error) {
      console.error('❌ Error creating event:', error);
      setError('Failed to create event');
    } finally {
      setLoading(false);
    }
  };

  // 🔄 Load data on component mount
  useEffect(() => {
    testConnection();
    fetchUsers();
    fetchEvents();
  }, []);

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>🔗 Frontend-Backend Connection Demo</h1>
      
      {/* Connection Status */}
      <div style={{ 
        padding: '10px', 
        marginBottom: '20px', 
        borderRadius: '5px',
        backgroundColor: connectionStatus === 'connected' ? '#d4edda' : 
                        connectionStatus === 'disconnected' ? '#f8d7da' : '#fff3cd',
        border: `1px solid ${connectionStatus === 'connected' ? '#c3e6cb' : 
                            connectionStatus === 'disconnected' ? '#f5c6cb' : '#ffeaa7'}`
      }}>
        <strong>Backend Status:</strong> 
        {connectionStatus === 'connected' && ' ✅ Connected'}
        {connectionStatus === 'disconnected' && ' ❌ Disconnected'}
        {connectionStatus === 'checking' && ' 🔄 Checking...'}
        <button 
          onClick={testConnection}
          style={{ marginLeft: '10px', padding: '5px 10px' }}
        >
          Test Connection
        </button>
      </div>

      {/* Error Display */}
      {error && (
        <div style={{ 
          padding: '10px', 
          marginBottom: '20px', 
          backgroundColor: '#f8d7da', 
          border: '1px solid #f5c6cb',
          borderRadius: '5px',
          color: '#721c24'
        }}>
          ❌ {error}
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        
        {/* Users Section */}
        <div>
          <h2>👥 Users</h2>
          
          {/* Create User Form */}
          <form onSubmit={createUser} style={{ marginBottom: '20px', padding: '15px', border: '1px solid #ddd', borderRadius: '5px' }}>
            <h3>Add New User</h3>
            <input
              type="text"
              placeholder="Name"
              value={userForm.name}
              onChange={(e) => setUserForm({...userForm, name: e.target.value})}
              required
              style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
            />
            <input
              type="email"
              placeholder="Email"
              value={userForm.email}
              onChange={(e) => setUserForm({...userForm, email: e.target.value})}
              required
              style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
            />
            <select
              value={userForm.role}
              onChange={(e) => setUserForm({...userForm, role: e.target.value})}
              style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
            >
              <option value="student">Student</option>
              <option value="alumni">Alumni</option>
              <option value="representative">Representative</option>
            </select>
            <button 
              type="submit" 
              disabled={loading}
              style={{ 
                width: '100%', 
                padding: '10px', 
                backgroundColor: '#007bff', 
                color: 'white', 
                border: 'none', 
                borderRadius: '3px',
                cursor: loading ? 'not-allowed' : 'pointer'
              }}
            >
              {loading ? '⏳ Creating...' : '➕ Add User'}
            </button>
          </form>

          {/* Users List */}
          <div>
            <h3>Users List ({users.length})</h3>
            {loading && <p>🔄 Loading users...</p>}
            {users.map(user => (
              <div key={user.id} style={{ 
                padding: '10px', 
                margin: '5px 0', 
                border: '1px solid #eee', 
                borderRadius: '3px',
                backgroundColor: '#f9f9f9'
              }}>
                <strong>{user.name}</strong> ({user.role})<br/>
                <small>{user.email}</small>
              </div>
            ))}
            {users.length === 0 && !loading && <p>No users found</p>}
          </div>
        </div>

        {/* Events Section */}
        <div>
          <h2>📅 Events</h2>
          
          {/* Create Event Form */}
          <form onSubmit={createEvent} style={{ marginBottom: '20px', padding: '15px', border: '1px solid #ddd', borderRadius: '5px' }}>
            <h3>Add New Event</h3>
            <input
              type="text"
              placeholder="Event Title"
              value={eventForm.title}
              onChange={(e) => setEventForm({...eventForm, title: e.target.value})}
              required
              style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
            />
            <input
              type="date"
              value={eventForm.date}
              onChange={(e) => setEventForm({...eventForm, date: e.target.value})}
              required
              style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
            />
            <input
              type="text"
              placeholder="Location"
              value={eventForm.location}
              onChange={(e) => setEventForm({...eventForm, location: e.target.value})}
              style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
            />
            <button 
              type="submit" 
              disabled={loading}
              style={{ 
                width: '100%', 
                padding: '10px', 
                backgroundColor: '#28a745', 
                color: 'white', 
                border: 'none', 
                borderRadius: '3px',
                cursor: loading ? 'not-allowed' : 'pointer'
              }}
            >
              {loading ? '⏳ Creating...' : '➕ Add Event'}
            </button>
          </form>

          {/* Events List */}
          <div>
            <h3>Events List ({events.length})</h3>
            {loading && <p>🔄 Loading events...</p>}
            {events.map(event => (
              <div key={event.id} style={{ 
                padding: '10px', 
                margin: '5px 0', 
                border: '1px solid #eee', 
                borderRadius: '3px',
                backgroundColor: '#f9f9f9'
              }}>
                <strong>{event.title}</strong><br/>
                <small>📅 {event.date} • 📍 {event.location}</small>
              </div>
            ))}
            {events.length === 0 && !loading && <p>No events found</p>}
          </div>
        </div>
      </div>

      {/* API Information */}
      <div style={{ marginTop: '30px', padding: '15px', backgroundColor: '#e9ecef', borderRadius: '5px' }}>
        <h3>🔗 API Connection Info</h3>
        <p><strong>Backend URL:</strong> http://localhost:5000</p>
        <p><strong>API Base URL:</strong> {API_BASE_URL}</p>
        <p><strong>Frontend URL:</strong> {window.location.origin}</p>
        <p><strong>CORS:</strong> Enabled for cross-origin requests</p>
      </div>
    </div>
  );
}

export default App;
