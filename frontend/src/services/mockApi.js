// Mock API service for development
class MockApiService {
  constructor() {
    this.users = JSON.parse(localStorage.getItem('mockUsers') || '[]');
    this.currentUser = JSON.parse(localStorage.getItem('mockCurrentUser') || 'null');
    this.token = localStorage.getItem('mockToken') || null;
  }

  // Save data to localStorage
  saveUsers() {
    localStorage.setItem('mockUsers', JSON.stringify(this.users));
  }

  saveCurrentUser(user) {
    this.currentUser = user;
    localStorage.setItem('mockCurrentUser', JSON.stringify(user));
  }

  saveToken(token) {
    this.token = token;
    localStorage.setItem('mockToken', token);
  }

  clearAuth() {
    this.currentUser = null;
    this.token = null;
    localStorage.removeItem('mockCurrentUser');
    localStorage.removeItem('mockToken');
  }

  // Generate mock token
  generateToken() {
    return 'mock_token_' + Math.random().toString(36).substr(2, 9);
  }

  // Generate user ID
  generateUserId() {
    return 'user_' + Math.random().toString(36).substr(2, 9);
  }

  // Simulate API delay
  delay(ms = 500) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  // Register user
  async register(userData) {
    await this.delay();

    // Check if user already exists
    const existingUser = this.users.find(user => user.email === userData.email);
    if (existingUser) {
      throw new Error('User with this email already exists');
    }

    // Create new user
    const newUser = {
      id: this.generateUserId(),
      firstName: userData.firstName,
      lastName: userData.lastName,
      email: userData.email,
      phone: userData.phone || '',
      userType: userData.userType,
      college: userData.collegeId || userData.college || '',
      branch: userData.branch || '',
      year: userData.year || '',
      graduationYear: userData.graduationYear || '',
      currentPosition: userData.currentPosition || '',
      company: userData.company || '',
      department: userData.department || '',
      employeeId: userData.employeeId || '',
      district: userData.district || '',
      isVerified: userData.userType === 'student', // Students auto-verified, others need approval
      isApproved: userData.userType === 'student', // Students auto-approved
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    // Add user to mock database
    this.users.push(newUser);
    this.saveUsers();

    // Generate token
    const token = this.generateToken();
    this.saveToken(token);
    this.saveCurrentUser(newUser);

    return {
      success: true,
      data: {
        user: newUser,
        token: token,
        message: userData.userType === 'student' 
          ? 'Registration successful! Welcome to SESWA.'
          : 'Registration submitted! Your application is under review.'
      }
    };
  }

  // Login user
  async login(email, password) {
    await this.delay();

    // Check for admin users first
    const adminUsers = {
      'admin@seswa.org': {
        id: 'admin_001',
        email: 'admin@seswa.org',
        password: 'admin123',
        firstName: 'Dr. Rajesh',
        lastName: 'Murmu',
        fullName: 'Dr. Rajesh Murmu',
        position: 'President',
        userType: 'admin',
        gbMemberCode: 'GB2024SESWA001',
        permissions: ['all'],
        isApproved: true
      },
      'secretary@seswa.org': {
        id: 'admin_002',
        email: 'secretary@seswa.org',
        password: 'secretary123',
        firstName: 'Priya',
        lastName: 'Hansda',
        fullName: 'Priya Hansda',
        position: 'Secretary',
        userType: 'admin',
        gbMemberCode: 'GB2024SESWA002',
        permissions: ['users', 'events', 'analytics'],
        isApproved: true
      },
      'treasurer@seswa.org': {
        id: 'admin_003',
        email: 'treasurer@seswa.org',
        password: 'treasurer123',
        firstName: 'Amit',
        lastName: 'Soren',
        fullName: 'Amit Soren',
        position: 'Treasurer',
        userType: 'admin',
        gbMemberCode: 'GB2024SESWA003',
        permissions: ['analytics', 'events', 'system'],
        isApproved: true
      },
      'vicepresident@seswa.org': {
        id: 'admin_004',
        email: 'vicepresident@seswa.org',
        password: 'vp123',
        firstName: 'Dr. Anjali',
        lastName: 'Kisku',
        fullName: 'Dr. Anjali Kisku',
        position: 'Vice President',
        userType: 'admin',
        gbMemberCode: 'GB2024SESWA004',
        permissions: ['users', 'events', 'magazines', 'analytics'],
        isApproved: true
      },
      'executive@seswa.org': {
        id: 'admin_005',
        email: 'executive@seswa.org',
        password: 'exec123',
        firstName: 'Suresh',
        lastName: 'Tudu',
        fullName: 'Suresh Tudu',
        position: 'Executive Member',
        userType: 'admin',
        gbMemberCode: 'GB2024SESWA005',
        permissions: ['events', 'magazines'],
        isApproved: true
      }
    };

    // Check if it's an admin login
    const adminUser = adminUsers[email];
    if (adminUser && adminUser.password === password) {
      // Generate token
      const token = this.generateToken();
      this.saveToken(token);
      this.saveCurrentUser(adminUser);

      return {
        success: true,
        data: {
          user: adminUser,
          token: token,
          message: 'Admin login successful!'
        }
      };
    }

    // Find regular user
    const user = this.users.find(u => u.email === email);
    if (!user) {
      throw new Error('Invalid email or password');
    }

    // Check password for regular users (simplified for demo)
    // In real app, passwords would be hashed
    if (user.password && user.password !== password) {
      throw new Error('Invalid email or password');
    }

    // Check if user is approved (for non-students)
    if (user.userType !== 'student' && !user.isApproved) {
      throw new Error('Your account is pending approval. Please wait for admin verification.');
    }

    // Generate token
    const token = this.generateToken();
    this.saveToken(token);
    this.saveCurrentUser(user);

    return {
      success: true,
      data: {
        user: user,
        token: token,
        message: 'Login successful!'
      }
    };
  }

  // Get current user
  async getCurrentUser() {
    await this.delay(200);

    if (!this.token || !this.currentUser) {
      throw new Error('Not authenticated');
    }

    return {
      success: true,
      data: {
        user: this.currentUser
      }
    };
  }

  // Logout
  async logout() {
    await this.delay(200);
    this.clearAuth();
    return {
      success: true,
      message: 'Logged out successfully'
    };
  }

  // Update profile
  async updateProfile(userData) {
    await this.delay();

    if (!this.currentUser) {
      throw new Error('Not authenticated');
    }

    // Update user in mock database
    const userIndex = this.users.findIndex(u => u.id === this.currentUser.id);
    if (userIndex !== -1) {
      this.users[userIndex] = { ...this.users[userIndex], ...userData, updatedAt: new Date().toISOString() };
      this.saveUsers();
      this.saveCurrentUser(this.users[userIndex]);
    }

    return {
      success: true,
      data: {
        user: this.currentUser,
        message: 'Profile updated successfully'
      }
    };
  }

  // Change password
  async changePassword(currentPassword, newPassword) {
    await this.delay();

    if (!this.currentUser) {
      throw new Error('Not authenticated');
    }

    // In a real app, you'd verify the current password
    // For mock, we'll just simulate success
    return {
      success: true,
      message: 'Password changed successfully'
    };
  }

  // Get all users (for admin)
  async getUsers() {
    await this.delay();
    return {
      success: true,
      data: {
        users: this.users
      }
    };
  }

  // Approve user (for admin)
  async approveUser(userId) {
    await this.delay();

    const userIndex = this.users.findIndex(u => u.id === userId);
    if (userIndex !== -1) {
      this.users[userIndex].isApproved = true;
      this.users[userIndex].updatedAt = new Date().toISOString();
      this.saveUsers();
    }

    return {
      success: true,
      message: 'User approved successfully'
    };
  }

  // Get colleges
  async getColleges() {
    await this.delay(200);
    
    const colleges = [
      { id: 'iiest', name: 'IIEST Shibpur', location: 'Howrah' },
      { id: 'nit-dgp', name: 'NIT Durgapur', location: 'Durgapur' },
      { id: 'iit-kgp', name: 'IIT Kharagpur', location: 'Kharagpur' },
      { id: 'ju', name: 'Jadavpur University', location: 'Kolkata' },
      { id: 'kgec', name: 'Kalyani Government Engineering College', location: 'Kalyani' },
      { id: 'jgec', name: 'Jalpaiguri Government Engineering College', location: 'Jalpaiguri' },
      { id: 'cgec', name: 'Cooch Behar Government Engineering College', location: 'Cooch Behar' },
      { id: 'makaut', name: 'Maulana Abul Kalam Azad University of Technology', location: 'Kolkata' },
      { id: 'uit', name: 'University Institute of Technology', location: 'Burdwan' },
      { id: 'gcelt', name: 'Government College of Engineering and Leather Technology', location: 'Kolkata' },
      { id: 'gcect', name: 'Government College of Engineering and Ceramic Technology', location: 'Kolkata' },
      { id: 'gcett-b', name: 'Government College of Engineering and Textile Technology, Berhampore', location: 'Berhampore' },
      { id: 'gcett-s', name: 'Government College of Engineering and Textile Technology, Serampore', location: 'Serampore' },
      { id: 'rkmgce', name: 'Ramakrishna Mission Shilpamandira', location: 'Belur Math' }
    ];

    return {
      success: true,
      data: { colleges }
    };
  }

  // Get branches for a college
  async getBranches(collegeId) {
    await this.delay(200);
    
    const branches = [
      'Computer Science Engineering',
      'Electronics and Communication Engineering',
      'Electrical Engineering',
      'Mechanical Engineering',
      'Civil Engineering',
      'Chemical Engineering',
      'Information Technology',
      'Electronics and Instrumentation Engineering',
      'Aerospace Engineering',
      'Biotechnology Engineering'
    ];

    return {
      success: true,
      data: { branches }
    };
  }
}

// Create singleton instance
const mockApi = new MockApiService();

export default mockApi;
