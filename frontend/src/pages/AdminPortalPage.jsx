import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  TrendingUp,
  Users,
  Calendar,
  DollarSign,
  Bell,
  Settings,
  Shield,
  UserCheck,
  UserX,
  BarChart3,
  PieChart,
  Activity,
  AlertTriangle,
  CheckCircle,
  Clock,
  Eye,
  Edit,
  Trash2,
  Download,
  Upload,
  Filter,
  Search,
  Plus,
  BookOpen
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useNotifications } from '../contexts/NotificationContext';

const AdminPortalPage = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedTimeRange, setSelectedTimeRange] = useState('30days');
  const [userFilter, setUserFilter] = useState('all');
  const [eventFilter, setEventFilter] = useState('all');

  // Form states
  const [newEvent, setNewEvent] = useState({
    name: '',
    description: '',
    date: '',
    time: '',
    location: '',
    capacity: '',
    price: '',
    type: 'community',
    image: null
  });
  const [newMagazine, setNewMagazine] = useState({
    title: '',
    year: '',
    description: '',
    file: null
  });
  const [showEventForm, setShowEventForm] = useState(false);
  const [showMagazineForm, setShowMagazineForm] = useState(false);

  const { user } = useAuth();
  const { createSystemNotification } = useNotifications();

  // Admin Dashboard Stats
  const adminStats = [
    { icon: Users, label: 'Total Members', value: '1,247', change: '+12%', color: 'text-blue-600' },
    { icon: Calendar, label: 'Active Events', value: '8', change: '+3', color: 'text-green-600' },
    { icon: DollarSign, label: 'Total Revenue', value: '₹2.8L', change: '+25%', color: 'text-purple-600' },
    { icon: UserCheck, label: 'Pending Approvals', value: '15', change: '+5', color: 'text-orange-600' }
  ];

  // User Management Data
  const pendingUsers = [
    {
      id: 1,
      name: 'Dr. Anjali Hansda',
      email: 'anjali.hansda@college.edu',
      userType: 'college_representative',
      college: 'IIEST Shibpur',
      department: 'Computer Science',
      submittedAt: '2024-12-01T09:00:00Z',
      documents: ['ID Proof', 'Employment Letter', 'College Authorization'],
      status: 'pending'
    },
    {
      id: 2,
      name: 'Suresh Murmu',
      email: 'suresh.murmu@alumni.com',
      userType: 'alumni',
      college: 'NIT Durgapur',
      graduationYear: '2018',
      currentCompany: 'Microsoft',
      submittedAt: '2024-11-30T16:30:00Z',
      documents: ['Degree Certificate', 'Employment Proof'],
      status: 'pending'
    },
    {
      id: 3,
      name: 'Rahul Kisku',
      email: 'rahul.kisku@student.edu',
      userType: 'student',
      college: 'IIEST Shibpur',
      year: '3rd Year',
      branch: 'Mechanical Engineering',
      submittedAt: '2024-12-02T14:15:00Z',
      documents: ['Student ID', 'Enrollment Certificate'],
      status: 'pending'
    }
  ];

  // System Analytics Data
  const userGrowth = [
    { month: 'Aug', students: 450, alumni: 180, representatives: 25 },
    { month: 'Sep', students: 520, alumni: 195, representatives: 28 },
    { month: 'Oct', students: 580, alumni: 210, representatives: 30 },
    { month: 'Nov', students: 650, alumni: 225, representatives: 32 },
    { month: 'Dec', students: 720, alumni: 240, representatives: 35 }
  ];

  const eventMetrics = [
    { name: 'Annual Picnic 2025', registrations: 156, capacity: 200, revenue: 78000, status: 'active' },
    { name: 'Tech Workshop Series', registrations: 89, capacity: 100, revenue: 0, status: 'active' },
    { name: 'Cultural Festival', registrations: 45, capacity: 150, revenue: 9000, status: 'planning' },
    { name: 'Alumni Meet 2025', registrations: 145, capacity: 300, revenue: 145000, status: 'active' }
  ];

  // Students Data
  const studentsData = [
    {
      id: 1,
      name: 'Rahul Soren',
      email: 'rahul.soren@student.edu',
      college: 'IIEST Shibpur',
      branch: 'Computer Science',
      year: '3rd Year',
      phone: '9876543210',
      district: 'Howrah',
      registrationDate: '2024-11-15',
      status: 'active',
      eventsAttended: 5,
      cgpa: 8.5
    },
    {
      id: 2,
      name: 'Priya Murmu',
      email: 'priya.murmu@student.edu',
      college: 'NIT Durgapur',
      branch: 'Mechanical Engineering',
      year: '2nd Year',
      phone: '9876543211',
      district: 'Durgapur',
      registrationDate: '2024-10-20',
      status: 'active',
      eventsAttended: 3,
      cgpa: 9.1
    },
    {
      id: 3,
      name: 'Amit Hansda',
      email: 'amit.hansda@student.edu',
      college: 'JU',
      branch: 'Electrical Engineering',
      year: '4th Year',
      phone: '9876543212',
      district: 'Kolkata',
      registrationDate: '2024-09-10',
      status: 'inactive',
      eventsAttended: 8,
      cgpa: 8.8
    }
  ];

  // Alumni Data
  const alumniData = [
    {
      id: 1,
      name: 'Dr. Anjali Hansda',
      email: 'anjali.hansda@company.com',
      college: 'IIEST Shibpur',
      graduationYear: '2015',
      currentPosition: 'Senior Software Engineer',
      company: 'Google',
      phone: '9876543213',
      district: 'Bangalore',
      registrationDate: '2024-08-15',
      status: 'active',
      contributions: 25000,
      mentorshipPrograms: 3
    },
    {
      id: 2,
      name: 'Suresh Kisku',
      email: 'suresh.kisku@company.com',
      college: 'NIT Durgapur',
      graduationYear: '2018',
      currentPosition: 'Product Manager',
      company: 'Microsoft',
      phone: '9876543214',
      district: 'Hyderabad',
      registrationDate: '2024-07-20',
      status: 'active',
      contributions: 15000,
      mentorshipPrograms: 2
    },
    {
      id: 3,
      name: 'Ravi Soren',
      email: 'ravi.soren@company.com',
      college: 'IIT Kharagpur',
      graduationYear: '2020',
      currentPosition: 'Data Scientist',
      company: 'Tesla',
      phone: '9876543215',
      district: 'Pune',
      registrationDate: '2024-06-10',
      status: 'active',
      contributions: 30000,
      mentorshipPrograms: 4
    }
  ];

  // Magazines Data
  const magazinesData = [
    {
      id: 1,
      title: 'BERA TARAS 2024',
      year: '2024',
      description: 'Annual magazine featuring community achievements and cultural events',
      uploadDate: '2024-12-01',
      fileSize: '18.5 MB',
      downloads: 245,
      status: 'published'
    },
    {
      id: 2,
      title: 'BERA TARAS 2023',
      year: '2023',
      description: 'Previous year magazine with student articles and success stories',
      uploadDate: '2023-12-15',
      fileSize: '16.2 MB',
      downloads: 1250,
      status: 'published'
    }
  ];

  const recentActivities = [
    {
      id: 1,
      type: 'user_registration',
      message: 'New alumni registration from Priya Soren',
      timestamp: '2024-12-01T14:30:00Z',
      severity: 'info'
    },
    {
      id: 2,
      type: 'event_created',
      message: 'New event "Career Guidance Session" created',
      timestamp: '2024-12-01T12:15:00Z',
      severity: 'success'
    },
    {
      id: 3,
      type: 'magazine_uploaded',
      message: 'BERA TARAS 2024 magazine uploaded successfully',
      timestamp: '2024-12-01T11:00:00Z',
      severity: 'success'
    },
    {
      id: 4,
      type: 'contribution',
      message: 'Large contribution received: ₹25,000 for Annual Picnic',
      timestamp: '2024-12-01T09:20:00Z',
      severity: 'success'
    }
  ];

  // System Settings
  const systemSettings = [
    { key: 'user_registration', label: 'User Registration', value: 'open', options: ['open', 'restricted', 'closed'] },
    { key: 'event_creation', label: 'Event Creation', value: 'representatives_only', options: ['all_users', 'representatives_only', 'admin_only'] },
    { key: 'auto_approval', label: 'Auto Approval', value: 'students_only', options: ['none', 'students_only', 'all_users'] },
    { key: 'notification_frequency', label: 'Notification Frequency', value: 'daily', options: ['real_time', 'hourly', 'daily', 'weekly'] }
  ];

  const handleApproveUser = (userId) => {
    console.log('Approving user:', userId);
    createSystemNotification(
      'User Approved',
      'User registration has been approved successfully',
      'normal'
    );
  };

  const handleRejectUser = (userId) => {
    console.log('Rejecting user:', userId);
    createSystemNotification(
      'User Rejected',
      'User registration has been rejected',
      'normal'
    );
  };

  const handleSystemSettingChange = (key, value) => {
    console.log('Updating system setting:', key, value);
    createSystemNotification(
      'Settings Updated',
      `${key} has been updated to ${value}`,
      'normal'
    );
  };

  const handleCreateEvent = (e) => {
    e.preventDefault();
    console.log('Creating event:', newEvent);
    createSystemNotification(
      'Event Created',
      `${newEvent.name} has been created successfully`,
      'high'
    );
    setNewEvent({
      name: '',
      description: '',
      date: '',
      time: '',
      location: '',
      capacity: '',
      price: '',
      type: 'community',
      image: null
    });
    setShowEventForm(false);
  };

  const handleUploadMagazine = (e) => {
    e.preventDefault();
    console.log('Uploading magazine:', newMagazine);
    createSystemNotification(
      'Magazine Uploaded',
      `${newMagazine.title} has been uploaded successfully`,
      'high'
    );
    setNewMagazine({
      title: '',
      year: '',
      description: '',
      file: null
    });
    setShowMagazineForm(false);
  };

  const handleEventInputChange = (e) => {
    const { name, value, files } = e.target;
    setNewEvent(prev => ({
      ...prev,
      [name]: files ? files[0] : value
    }));
  };

  const handleMagazineInputChange = (e) => {
    const { name, value, files } = e.target;
    setNewMagazine(prev => ({
      ...prev,
      [name]: files ? files[0] : value
    }));
  };

  const handleDeleteUser = (userId, userType) => {
    console.log('Deleting user:', userId, userType);
    createSystemNotification(
      'User Deleted',
      `User has been removed from the system`,
      'normal'
    );
  };

  const handleToggleUserStatus = (userId, userType) => {
    console.log('Toggling user status:', userId, userType);
    createSystemNotification(
      'User Status Updated',
      `User status has been updated`,
      'normal'
    );
  };

  const getActivityIcon = (type) => {
    switch (type) {
      case 'user_registration': return <UserCheck className="h-4 w-4 text-blue-500" />;
      case 'event_created': return <Calendar className="h-4 w-4 text-green-500" />;
      case 'system_alert': return <AlertTriangle className="h-4 w-4 text-orange-500" />;
      case 'contribution': return <DollarSign className="h-4 w-4 text-purple-500" />;
      default: return <Activity className="h-4 w-4 text-gray-500" />;
    }
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'success': return 'bg-green-50 border-green-200';
      case 'warning': return 'bg-yellow-50 border-yellow-200';
      case 'error': return 'bg-red-50 border-red-200';
      default: return 'bg-blue-50 border-blue-200';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-gradient-to-br from-red-400 to-red-600 rounded-full flex items-center justify-center">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Admin Dashboard
                </h1>
                <p className="text-gray-600">
                  {user?.position || 'GB Member'} • {user?.fullName || `${user?.firstName} ${user?.lastName}`}
                </p>
                <p className="text-sm text-gray-500">
                  GB Code: {user?.gbMemberCode} • Managing SESWA platform operations
                </p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-500">Last Login</div>
              <div className="font-semibold text-gray-900">
                {new Date().toLocaleDateString()}
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white rounded-lg shadow-md mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6 overflow-x-auto">
              {[
                { id: 'dashboard', name: 'Dashboard', icon: TrendingUp },
                { id: 'students', name: 'Student Management', icon: Users },
                { id: 'alumni', name: 'Alumni Management', icon: UserCheck },
                { id: 'events', name: 'Event Management', icon: Calendar },
                { id: 'magazines', name: 'Magazine Management', icon: BookOpen },
                { id: 'analytics', name: 'Analytics', icon: BarChart3 },
                { id: 'system', name: 'System Settings', icon: Settings }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab.id
                      ? 'border-red-500 text-red-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <tab.icon className="h-4 w-4 mr-2" />
                  {tab.name}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Dashboard Tab */}
        {activeTab === 'dashboard' && (
          <div className="space-y-8">
            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {adminStats.map((stat, index) => (
                <div key={index} className="bg-white rounded-lg shadow-md p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                      <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                      <p className={`text-sm ${stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                        {stat.change} from last month
                      </p>
                    </div>
                    <stat.icon className={`h-8 w-8 ${stat.color}`} />
                  </div>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Recent Activities */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Recent System Activities</h2>
                <div className="space-y-4">
                  {recentActivities.map((activity) => (
                    <div key={activity.id} className={`p-4 rounded-lg border ${getSeverityColor(activity.severity)}`}>
                      <div className="flex items-start space-x-3">
                        <div className="flex-shrink-0 mt-1">
                          {getActivityIcon(activity.type)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm text-gray-900">{activity.message}</p>
                          <p className="text-xs text-gray-500 mt-1">
                            {new Date(activity.timestamp).toLocaleString()}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Quick Actions</h2>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    onClick={() => setActiveTab('users')}
                    className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                  >
                    <UserCheck className="h-8 w-8 text-blue-600 mb-2" />
                    <span className="text-sm font-medium text-gray-900">Approve Users</span>
                    <span className="text-xs text-gray-500">{pendingUsers.length} pending</span>
                  </button>
                  <button
                    onClick={() => setActiveTab('events')}
                    className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                  >
                    <Calendar className="h-8 w-8 text-green-600 mb-2" />
                    <span className="text-sm font-medium text-gray-900">Manage Events</span>
                    <span className="text-xs text-gray-500">{eventMetrics.length} active</span>
                  </button>
                  <button
                    onClick={() => setActiveTab('analytics')}
                    className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                  >
                    <BarChart3 className="h-8 w-8 text-purple-600 mb-2" />
                    <span className="text-sm font-medium text-gray-900">View Analytics</span>
                    <span className="text-xs text-gray-500">Real-time data</span>
                  </button>
                  <button
                    onClick={() => setActiveTab('system')}
                    className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                  >
                    <Settings className="h-8 w-8 text-orange-600 mb-2" />
                    <span className="text-sm font-medium text-gray-900">System Settings</span>
                    <span className="text-xs text-gray-500">Configure platform</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Student Management Tab */}
        {activeTab === 'students' && (
          <div className="space-y-8">
            {/* Student Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="bg-white rounded-lg shadow-md p-6 text-center">
                <div className="text-2xl font-bold text-blue-600 mb-1">{studentsData.length}</div>
                <div className="text-sm text-gray-600">Total Students</div>
              </div>
              <div className="bg-white rounded-lg shadow-md p-6 text-center">
                <div className="text-2xl font-bold text-green-600 mb-1">
                  {studentsData.filter(s => s.status === 'active').length}
                </div>
                <div className="text-sm text-gray-600">Active Students</div>
              </div>
              <div className="bg-white rounded-lg shadow-md p-6 text-center">
                <div className="text-2xl font-bold text-purple-600 mb-1">
                  {(studentsData.reduce((sum, s) => sum + s.cgpa, 0) / studentsData.length).toFixed(1)}
                </div>
                <div className="text-sm text-gray-600">Average CGPA</div>
              </div>
              <div className="bg-white rounded-lg shadow-md p-6 text-center">
                <div className="text-2xl font-bold text-orange-600 mb-1">
                  {studentsData.reduce((sum, s) => sum + s.eventsAttended, 0)}
                </div>
                <div className="text-sm text-gray-600">Total Event Attendance</div>
              </div>
            </div>

            {/* Student Management */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">Student Management</h2>
                <div className="flex items-center space-x-4">
                  <select className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500">
                    <option value="all">All Students</option>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                  <select className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500">
                    <option value="all">All Colleges</option>
                    <option value="iiest">IIEST Shibpur</option>
                    <option value="nit">NIT Durgapur</option>
                    <option value="ju">JU</option>
                  </select>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Student Details
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Academic Info
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Performance
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {studentsData.map((student) => (
                      <tr key={student.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10">
                              <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                                <span className="text-sm font-medium text-blue-600">
                                  {student.name.split(' ').map(n => n[0]).join('')}
                                </span>
                              </div>
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">{student.name}</div>
                              <div className="text-sm text-gray-500">{student.email}</div>
                              <div className="text-sm text-gray-500">{student.phone}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{student.college}</div>
                          <div className="text-sm text-gray-500">{student.branch}</div>
                          <div className="text-sm text-gray-500">{student.year}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">CGPA: {student.cgpa}</div>
                          <div className="text-sm text-gray-500">Events: {student.eventsAttended}</div>
                          <div className="text-sm text-gray-500">Joined: {new Date(student.registrationDate).toLocaleDateString()}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            student.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                          }`}>
                            {student.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() => handleToggleUserStatus(student.id, 'student')}
                              className="text-blue-600 hover:text-blue-900"
                            >
                              <Edit className="h-4 w-4" />
                            </button>
                            <button className="text-green-600 hover:text-green-900">
                              <Eye className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => handleDeleteUser(student.id, 'student')}
                              className="text-red-600 hover:text-red-900"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Alumni Management Tab */}
        {activeTab === 'alumni' && (
          <div className="space-y-8">
            {/* Alumni Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="bg-white rounded-lg shadow-md p-6 text-center">
                <div className="text-2xl font-bold text-green-600 mb-1">{alumniData.length}</div>
                <div className="text-sm text-gray-600">Total Alumni</div>
              </div>
              <div className="bg-white rounded-lg shadow-md p-6 text-center">
                <div className="text-2xl font-bold text-purple-600 mb-1">
                  ₹{alumniData.reduce((sum, a) => sum + a.contributions, 0).toLocaleString()}
                </div>
                <div className="text-sm text-gray-600">Total Contributions</div>
              </div>
              <div className="bg-white rounded-lg shadow-md p-6 text-center">
                <div className="text-2xl font-bold text-blue-600 mb-1">
                  {alumniData.reduce((sum, a) => sum + a.mentorshipPrograms, 0)}
                </div>
                <div className="text-sm text-gray-600">Mentorship Programs</div>
              </div>
              <div className="bg-white rounded-lg shadow-md p-6 text-center">
                <div className="text-2xl font-bold text-orange-600 mb-1">
                  {alumniData.filter(a => a.status === 'active').length}
                </div>
                <div className="text-sm text-gray-600">Active Alumni</div>
              </div>
            </div>

            {/* Alumni Management */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">Alumni Management</h2>
                <div className="flex items-center space-x-4">
                  <select className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500">
                    <option value="all">All Alumni</option>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                  <select className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500">
                    <option value="all">All Years</option>
                    <option value="2020">2020</option>
                    <option value="2018">2018</option>
                    <option value="2015">2015</option>
                  </select>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Alumni Details
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Professional Info
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Contributions
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {alumniData.map((alumni) => (
                      <tr key={alumni.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10">
                              <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                                <span className="text-sm font-medium text-green-600">
                                  {alumni.name.split(' ').map(n => n[0]).join('')}
                                </span>
                              </div>
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">{alumni.name}</div>
                              <div className="text-sm text-gray-500">{alumni.email}</div>
                              <div className="text-sm text-gray-500">{alumni.college} - {alumni.graduationYear}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{alumni.currentPosition}</div>
                          <div className="text-sm text-gray-500">{alumni.company}</div>
                          <div className="text-sm text-gray-500">{alumni.district}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">₹{alumni.contributions.toLocaleString()}</div>
                          <div className="text-sm text-gray-500">Programs: {alumni.mentorshipPrograms}</div>
                          <div className="text-sm text-gray-500">Joined: {new Date(alumni.registrationDate).toLocaleDateString()}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            alumni.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                          }`}>
                            {alumni.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() => handleToggleUserStatus(alumni.id, 'alumni')}
                              className="text-blue-600 hover:text-blue-900"
                            >
                              <Edit className="h-4 w-4" />
                            </button>
                            <button className="text-green-600 hover:text-green-900">
                              <Eye className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => handleDeleteUser(alumni.id, 'alumni')}
                              className="text-red-600 hover:text-red-900"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* User Management Tab */}
        {activeTab === 'users' && (
          <div className="space-y-8">
            {/* User Filters */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <h2 className="text-xl font-bold text-gray-900">User Management</h2>
                <div className="flex items-center space-x-4">
                  <select
                    value={userFilter}
                    onChange={(e) => setUserFilter(e.target.value)}
                    className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
                  >
                    <option value="all">All Users</option>
                    <option value="pending">Pending Approval</option>
                    <option value="approved">Approved</option>
                    <option value="rejected">Rejected</option>
                  </select>
                  <select className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500">
                    <option value="all">All Types</option>
                    <option value="student">Students</option>
                    <option value="alumni">Alumni</option>
                    <option value="representative">Representatives</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Pending Approvals */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Pending User Approvals</h3>
              <div className="space-y-4">
                {pendingUsers.map((user) => (
                  <div key={user.id} className="border border-gray-200 rounded-lg p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-3">
                          <h4 className="text-lg font-semibold text-gray-900">{user.name}</h4>
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                            user.userType === 'student' ? 'bg-blue-100 text-blue-800' :
                            user.userType === 'alumni' ? 'bg-green-100 text-green-800' :
                            'bg-purple-100 text-purple-800'
                          }`}>
                            {user.userType.replace('_', ' ')}
                          </span>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600 mb-4">
                          <div>
                            <p><strong>Email:</strong> {user.email}</p>
                            <p><strong>College:</strong> {user.college}</p>
                            {user.department && <p><strong>Department:</strong> {user.department}</p>}
                            {user.graduationYear && <p><strong>Graduation Year:</strong> {user.graduationYear}</p>}
                            {user.currentCompany && <p><strong>Company:</strong> {user.currentCompany}</p>}
                          </div>
                          <div>
                            {user.year && <p><strong>Year:</strong> {user.year}</p>}
                            {user.branch && <p><strong>Branch:</strong> {user.branch}</p>}
                            <p><strong>Submitted:</strong> {new Date(user.submittedAt).toLocaleDateString()}</p>
                            <p><strong>Documents:</strong> {user.documents.length} files</p>
                          </div>
                        </div>

                        <div className="mb-4">
                          <h5 className="font-medium text-gray-900 mb-2">Submitted Documents:</h5>
                          <div className="flex flex-wrap gap-2">
                            {user.documents.map((doc, index) => (
                              <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                                {doc}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2 ml-4">
                        <button className="text-blue-600 hover:text-blue-700 p-2 rounded-lg hover:bg-blue-50">
                          <Eye className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleApproveUser(user.id)}
                          className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => handleRejectUser(user.id)}
                          className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200"
                        >
                          Reject
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Event Management Tab */}
        {activeTab === 'events' && (
          <div className="space-y-8">
            {/* Create Event Button */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-900">Event Management</h2>
                <button
                  onClick={() => setShowEventForm(true)}
                  className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200 flex items-center"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Create New Event
                </button>
              </div>
            </div>

            {/* Create Event Form */}
            {showEventForm && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-6">Create New Event</h3>
                <form onSubmit={handleCreateEvent} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Event Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={newEvent.name}
                        onChange={handleEventInputChange}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                        placeholder="Enter event name"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Event Type *
                      </label>
                      <select
                        name="type"
                        value={newEvent.type}
                        onChange={handleEventInputChange}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                      >
                        <option value="community">Community</option>
                        <option value="educational">Educational</option>
                        <option value="cultural">Cultural</option>
                        <option value="professional">Professional</option>
                        <option value="networking">Networking</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Description *
                    </label>
                    <textarea
                      name="description"
                      value={newEvent.description}
                      onChange={handleEventInputChange}
                      rows="3"
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                      placeholder="Enter event description"
                      required
                    ></textarea>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Date *
                      </label>
                      <input
                        type="date"
                        name="date"
                        value={newEvent.date}
                        onChange={handleEventInputChange}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Time *
                      </label>
                      <input
                        type="time"
                        name="time"
                        value={newEvent.time}
                        onChange={handleEventInputChange}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Capacity *
                      </label>
                      <input
                        type="number"
                        name="capacity"
                        value={newEvent.capacity}
                        onChange={handleEventInputChange}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                        placeholder="Max participants"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Location *
                      </label>
                      <input
                        type="text"
                        name="location"
                        value={newEvent.location}
                        onChange={handleEventInputChange}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                        placeholder="Event location"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Price
                      </label>
                      <input
                        type="text"
                        name="price"
                        value={newEvent.price}
                        onChange={handleEventInputChange}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                        placeholder="e.g., ₹500 or Free"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Event Photo
                    </label>
                    <input
                      type="file"
                      name="image"
                      onChange={handleEventInputChange}
                      accept="image/*"
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                    />
                    <p className="text-xs text-gray-500 mt-1">Upload event banner or promotional image</p>
                  </div>

                  <div className="flex items-center space-x-4">
                    <button
                      type="submit"
                      className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors duration-200"
                    >
                      Create Event
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowEventForm(false)}
                      className="border border-gray-300 text-gray-700 hover:bg-gray-50 font-semibold py-2 px-6 rounded-lg transition-colors duration-200"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Existing Events */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Existing Events</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Event Details
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date & Location
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Registrations
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {eventMetrics.map((event, index) => (
                      <tr key={index}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{event.name}</div>
                          <div className="text-sm text-gray-500">Revenue: ₹{event.revenue.toLocaleString()}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">Jan 26, 2025</div>
                          <div className="text-sm text-gray-500">Eco Park, Kolkata</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{event.registrations}/{event.capacity}</div>
                          <div className="text-sm text-gray-500">
                            {Math.round((event.registrations / event.capacity) * 100)}% filled
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            event.status === 'active' ? 'bg-green-100 text-green-800' :
                            event.status === 'planning' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-gray-100 text-gray-800'
                          }`}>
                            {event.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex items-center space-x-2">
                            <button className="text-blue-600 hover:text-blue-900">
                              <Edit className="h-4 w-4" />
                            </button>
                            <button className="text-green-600 hover:text-green-900">
                              <Eye className="h-4 w-4" />
                            </button>
                            <button className="text-red-600 hover:text-red-900">
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Magazine Management Tab */}
        {activeTab === 'magazines' && (
          <div className="space-y-8">
            {/* Upload Magazine Button */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-900">Magazine Management</h2>
                <button
                  onClick={() => setShowMagazineForm(true)}
                  className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200 flex items-center"
                >
                  <Upload className="h-4 w-4 mr-2" />
                  Upload New Magazine
                </button>
              </div>
            </div>

            {/* Upload Magazine Form */}
            {showMagazineForm && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-6">Upload New Magazine</h3>
                <form onSubmit={handleUploadMagazine} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Magazine Title *
                      </label>
                      <input
                        type="text"
                        name="title"
                        value={newMagazine.title}
                        onChange={handleMagazineInputChange}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                        placeholder="e.g., BERA TARAS 2025"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Year *
                      </label>
                      <input
                        type="number"
                        name="year"
                        value={newMagazine.year}
                        onChange={handleMagazineInputChange}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                        placeholder="2025"
                        min="2000"
                        max="2030"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Description *
                    </label>
                    <textarea
                      name="description"
                      value={newMagazine.description}
                      onChange={handleMagazineInputChange}
                      rows="3"
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                      placeholder="Brief description of the magazine content"
                      required
                    ></textarea>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      PDF File *
                    </label>
                    <input
                      type="file"
                      name="file"
                      onChange={handleMagazineInputChange}
                      accept=".pdf"
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                      required
                    />
                    <p className="text-xs text-gray-500 mt-1">Upload PDF file (max 50MB)</p>
                  </div>

                  <div className="flex items-center space-x-4">
                    <button
                      type="submit"
                      className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors duration-200"
                    >
                      Upload Magazine
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowMagazineForm(false)}
                      className="border border-gray-300 text-gray-700 hover:bg-gray-50 font-semibold py-2 px-6 rounded-lg transition-colors duration-200"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Existing Magazines */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Published Magazines</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {magazinesData.map((magazine) => (
                  <div key={magazine.id} className="border border-gray-200 rounded-lg p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="text-lg font-semibold text-gray-900">{magazine.title}</h4>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        magazine.status === 'published' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {magazine.status}
                      </span>
                    </div>

                    <p className="text-gray-600 text-sm mb-4">{magazine.description}</p>

                    <div className="space-y-2 text-sm text-gray-600 mb-4">
                      <div className="flex justify-between">
                        <span>Year:</span>
                        <span>{magazine.year}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>File Size:</span>
                        <span>{magazine.fileSize}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Downloads:</span>
                        <span>{magazine.downloads}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Uploaded:</span>
                        <span>{new Date(magazine.uploadDate).toLocaleDateString()}</span>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2 px-3 rounded-lg transition-colors duration-200">
                        <Download className="h-4 w-4 inline mr-1" />
                        Download
                      </button>
                      <button className="bg-gray-600 hover:bg-gray-700 text-white p-2 rounded-lg transition-colors duration-200">
                        <Edit className="h-4 w-4" />
                      </button>
                      <button className="bg-red-600 hover:bg-red-700 text-white p-2 rounded-lg transition-colors duration-200">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Analytics Tab */}
        {activeTab === 'analytics' && (
          <div className="space-y-8">
            {/* Time Range Selector */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-900">Platform Analytics</h2>
                <select
                  value={selectedTimeRange}
                  onChange={(e) => setSelectedTimeRange(e.target.value)}
                  className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  <option value="7days">Last 7 Days</option>
                  <option value="30days">Last 30 Days</option>
                  <option value="90days">Last 90 Days</option>
                  <option value="1year">Last Year</option>
                </select>
              </div>
            </div>

            {/* User Growth Analytics */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">User Growth Trends</h3>
              <div className="space-y-4">
                {userGrowth.map((month, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-semibold text-gray-900">{month.month} 2024</h4>
                      <span className="text-sm text-gray-500">
                        Total: {month.students + month.alumni + month.representatives}
                      </span>
                    </div>
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-600">{month.students}</div>
                        <div className="text-gray-600">Students</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-green-600">{month.alumni}</div>
                        <div className="text-gray-600">Alumni</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-purple-600">{month.representatives}</div>
                        <div className="text-gray-600">Representatives</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Event Performance */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Event Performance</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Event Name
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Registrations
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Capacity
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Revenue
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {eventMetrics.map((event, index) => (
                      <tr key={index}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {event.name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {event.registrations}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {event.capacity}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          ₹{event.revenue.toLocaleString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            event.status === 'active' ? 'bg-green-100 text-green-800' :
                            event.status === 'planning' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-gray-100 text-gray-800'
                          }`}>
                            {event.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* System Settings Tab */}
        {activeTab === 'system' && (
          <div className="space-y-8">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">System Configuration</h2>
              <div className="space-y-6">
                {systemSettings.map((setting) => (
                  <div key={setting.key} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div>
                      <h3 className="font-semibold text-gray-900">{setting.label}</h3>
                      <p className="text-sm text-gray-600">
                        Current: <span className="font-medium">{setting.value.replace('_', ' ')}</span>
                      </p>
                    </div>
                    <select
                      value={setting.value}
                      onChange={(e) => handleSystemSettingChange(setting.key, e.target.value)}
                      className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
                    >
                      {setting.options.map((option) => (
                        <option key={option} value={option}>
                          {option.replace('_', ' ')}
                        </option>
                      ))}
                    </select>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Security Tab */}
        {activeTab === 'security' && (
          <div className="space-y-8">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Security & Access Control</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="font-semibold text-gray-900">Access Logs</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between p-2 bg-gray-50 rounded">
                      <span>Admin Login</span>
                      <span className="text-gray-500">2 hours ago</span>
                    </div>
                    <div className="flex justify-between p-2 bg-gray-50 rounded">
                      <span>User Approval</span>
                      <span className="text-gray-500">4 hours ago</span>
                    </div>
                    <div className="flex justify-between p-2 bg-gray-50 rounded">
                      <span>System Settings Change</span>
                      <span className="text-gray-500">1 day ago</span>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <h3 className="font-semibold text-gray-900">Security Status</h3>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Two-Factor Authentication</span>
                      <span className="text-green-600 text-sm">Enabled</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">SSL Certificate</span>
                      <span className="text-green-600 text-sm">Valid</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Database Backup</span>
                      <span className="text-green-600 text-sm">Daily</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPortalPage;
