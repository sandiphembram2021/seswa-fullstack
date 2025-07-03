// Mock data for testing the events section
export const mockEvents = [
  {
    _id: '1',
    title: 'Web Development Workshop',
    description: 'Learn modern web development with React, Node.js, and MongoDB. This comprehensive workshop covers full-stack development from basics to advanced concepts.',
    shortDescription: 'Learn modern web development with React, Node.js, and MongoDB.',
    eventType: 'workshop',
    category: 'technical',
    startDate: '2024-12-15T10:00:00.000Z',
    endDate: '2024-12-15T17:00:00.000Z',
    startTime: '10:00 AM',
    endTime: '5:00 PM',
    venue: 'SESWA Community Center',
    address: 'Salt Lake, Kolkata',
    city: 'Kolkata',
    isOnline: false,
    registrationRequired: true,
    registrationDeadline: '2024-12-13T23:59:59.000Z',
    maxParticipants: 50,
    registrationFee: 0,
    organizer: {
      _id: 'org1',
      firstName: 'Priya',
      lastName: 'Soren',
      email: 'priya.soren@email.com'
    },
    status: 'published',
    banner: null,
    tags: ['web development', 'react', 'nodejs', 'mongodb'],
    registrationCount: 32,
    isRegistered: false,
    views: 245,
    speakers: [
      {
        name: 'Priya Soren',
        designation: 'Software Engineer',
        company: 'Google India',
        bio: 'Senior software engineer with 5+ years experience in web development.'
      }
    ]
  },
  {
    _id: '2',
    title: 'Career Guidance Seminar',
    description: 'Get insights into career opportunities in engineering, tips for job interviews, and guidance on building a successful career path.',
    shortDescription: 'Career opportunities and guidance for engineering students.',
    eventType: 'seminar',
    category: 'career',
    startDate: '2024-12-20T14:00:00.000Z',
    endDate: '2024-12-20T16:00:00.000Z',
    startTime: '2:00 PM',
    endTime: '4:00 PM',
    venue: 'Online',
    isOnline: true,
    meetingLink: 'https://meet.google.com/abc-defg-hij',
    registrationRequired: true,
    registrationDeadline: '2024-12-19T23:59:59.000Z',
    maxParticipants: 100,
    registrationFee: 0,
    organizer: {
      _id: 'org2',
      firstName: 'Deepak',
      lastName: 'Marandi',
      email: 'deepak.marandi@email.com'
    },
    status: 'published',
    banner: null,
    tags: ['career', 'guidance', 'interview', 'jobs'],
    registrationCount: 67,
    isRegistered: true,
    views: 189,
    speakers: [
      {
        name: 'Rekha Soy',
        designation: 'Product Manager',
        company: 'Microsoft India',
        bio: 'Product management expert with focus on career development.'
      },
      {
        name: 'Deepak Marandi',
        designation: 'Senior Consultant',
        company: 'Infosys',
        bio: 'Experienced in enterprise solutions and team leadership.'
      }
    ]
  },
  {
    _id: '3',
    title: 'AI & Machine Learning Conference',
    description: 'Explore the latest trends in artificial intelligence and machine learning. Learn about real-world applications and future opportunities.',
    shortDescription: 'Latest trends in AI and machine learning.',
    eventType: 'conference',
    category: 'technical',
    startDate: '2024-12-25T09:00:00.000Z',
    endDate: '2024-12-25T18:00:00.000Z',
    startTime: '9:00 AM',
    endTime: '6:00 PM',
    venue: 'IIT Kharagpur',
    address: 'Kharagpur, West Bengal',
    city: 'Kharagpur',
    isOnline: false,
    registrationRequired: true,
    registrationDeadline: '2024-12-22T23:59:59.000Z',
    maxParticipants: 200,
    registrationFee: 500,
    organizer: {
      _id: 'org3',
      firstName: 'Admin',
      lastName: 'SESWA',
      email: 'admin@seswa.org'
    },
    status: 'published',
    banner: null,
    tags: ['ai', 'machine learning', 'conference', 'technology'],
    registrationCount: 156,
    isRegistered: false,
    views: 423,
    speakers: [
      {
        name: 'Dr. Rajesh Kumar',
        designation: 'Professor',
        company: 'IIT Kharagpur',
        bio: 'AI researcher with 15+ years experience.'
      }
    ]
  },
  {
    _id: '4',
    title: 'Annual Picnic 2025 - SESWA Community Gathering',
    description: 'Join us for our traditional annual picnic during the last week of January. A perfect opportunity to bond with fellow Santal engineering students, share experiences, and strengthen our community ties.',
    shortDescription: 'Annual community picnic for bonding and networking.',
    eventType: 'cultural',
    category: 'cultural',
    startDate: '2025-01-26T10:00:00.000Z',
    endDate: '2025-01-26T18:00:00.000Z',
    startTime: '10:00 AM',
    endTime: '6:00 PM',
    venue: 'Eco Park',
    address: 'New Town, Kolkata',
    city: 'Kolkata',
    isOnline: false,
    registrationRequired: true,
    registrationDeadline: '2025-01-20T23:59:59.000Z',
    maxParticipants: 200,
    registrationFee: 300,
    organizer: {
      _id: 'org4',
      firstName: 'SESWA',
      lastName: 'Committee',
      email: 'events@seswa.org'
    },
    status: 'published',
    banner: null,
    tags: ['annual picnic', 'community', 'networking', 'santal culture'],
    registrationCount: 156,
    isRegistered: false,
    views: 287,
    speakers: []
  },
  {
    _id: '5',
    title: 'Entrepreneurship Bootcamp',
    description: 'Learn the fundamentals of starting your own business. From idea validation to funding, get all the insights you need.',
    shortDescription: 'Learn to start your own business from idea to funding.',
    eventType: 'workshop',
    category: 'career',
    startDate: '2025-01-05T10:00:00.000Z',
    endDate: '2025-01-06T17:00:00.000Z',
    startTime: '10:00 AM',
    endTime: '5:00 PM',
    venue: 'Techno India University',
    address: 'Salt Lake, Kolkata',
    city: 'Kolkata',
    isOnline: false,
    registrationRequired: true,
    registrationDeadline: '2025-01-03T23:59:59.000Z',
    maxParticipants: 75,
    registrationFee: 1000,
    organizer: {
      _id: 'org5',
      firstName: 'Startup',
      lastName: 'Cell',
      email: 'startup@seswa.org'
    },
    status: 'published',
    banner: null,
    tags: ['entrepreneurship', 'startup', 'business', 'funding'],
    registrationCount: 23,
    isRegistered: false,
    views: 134,
    speakers: [
      {
        name: 'Amit Sharma',
        designation: 'Founder & CEO',
        company: 'TechStart Solutions',
        bio: 'Serial entrepreneur with 3 successful exits.'
      }
    ]
  },
  {
    _id: '6',
    title: 'Coding Competition - CodeFest 2025',
    description: 'Test your programming skills in this exciting coding competition. Prizes worth ₹50,000 to be won!',
    shortDescription: 'Programming competition with prizes worth ₹50,000.',
    eventType: 'competition',
    category: 'technical',
    startDate: '2025-01-10T10:00:00.000Z',
    endDate: '2025-01-10T18:00:00.000Z',
    startTime: '10:00 AM',
    endTime: '6:00 PM',
    venue: 'Jadavpur University',
    address: 'Jadavpur, Kolkata',
    city: 'Kolkata',
    isOnline: false,
    registrationRequired: true,
    registrationDeadline: '2025-01-08T23:59:59.000Z',
    maxParticipants: 100,
    registrationFee: 200,
    organizer: {
      _id: 'org6',
      firstName: 'Tech',
      lastName: 'Committee',
      email: 'tech@seswa.org'
    },
    status: 'published',
    banner: null,
    tags: ['coding', 'competition', 'programming', 'prizes'],
    registrationCount: 78,
    isRegistered: true,
    views: 298,
    speakers: []
  },
  {
    _id: '7',
    title: 'Freshers Welcome 2024 - SESWA',
    description: 'Welcome new Santal engineering students to our community. Meet seniors, learn about SESWA activities, and get guidance for your engineering journey.',
    shortDescription: 'Welcome event for new engineering students.',
    eventType: 'cultural',
    category: 'cultural',
    startDate: '2024-10-15T16:00:00.000Z',
    endDate: '2024-10-15T20:00:00.000Z',
    startTime: '4:00 PM',
    endTime: '8:00 PM',
    venue: 'SESWA Community Center',
    address: 'Nityananda Nagar, D.S.Lane, Howrah',
    city: 'Kolkata',
    isOnline: false,
    registrationRequired: true,
    registrationDeadline: '2024-10-12T23:59:59.000Z',
    maxParticipants: 100,
    registrationFee: 0,
    organizer: {
      _id: 'org7',
      firstName: 'SESWA',
      lastName: 'Executive',
      email: 'freshers@seswa.org'
    },
    status: 'published',
    banner: null,
    tags: ['freshers', 'welcome', 'community', 'networking'],
    registrationCount: 78,
    isRegistered: true,
    views: 198,
    speakers: [
      {
        name: 'Senior Members',
        designation: 'SESWA Alumni',
        company: 'Various Companies',
        bio: 'Guidance and mentorship from senior community members.'
      }
    ]
  },
  {
    _id: '8',
    title: 'WBJEE Counselling Guidance Session',
    description: 'Expert guidance for WBJEE seat selection and counselling process. Get advice from experienced members and understand the admission process.',
    shortDescription: 'WBJEE counselling guidance and seat selection advice.',
    eventType: 'seminar',
    category: 'academic',
    startDate: '2025-07-15T14:00:00.000Z',
    endDate: '2025-07-15T17:00:00.000Z',
    startTime: '2:00 PM',
    endTime: '5:00 PM',
    venue: 'Online',
    isOnline: true,
    meetingLink: 'https://meet.google.com/wbjee-guidance',
    registrationRequired: true,
    registrationDeadline: '2025-07-13T23:59:59.000Z',
    maxParticipants: 150,
    registrationFee: 0,
    organizer: {
      _id: 'org8',
      firstName: 'Academic',
      lastName: 'Committee',
      email: 'academic@seswa.org'
    },
    status: 'published',
    banner: null,
    tags: ['wbjee', 'counselling', 'guidance', 'admission'],
    registrationCount: 89,
    isRegistered: false,
    views: 234,
    speakers: [
      {
        name: 'SESWA Alumni',
        designation: 'Engineering Graduates',
        company: 'Top Engineering Colleges',
        bio: 'Experienced graduates who can guide through the admission process.'
      }
    ]
  }
];

// Mock API response structure
export const createMockEventsResponse = (page = 1, limit = 9, filters = {}) => {
  let filteredEvents = [...mockEvents];

  // Apply filters
  if (filters.search) {
    const searchTerm = filters.search.toLowerCase();
    filteredEvents = filteredEvents.filter(event =>
      event.title.toLowerCase().includes(searchTerm) ||
      event.description.toLowerCase().includes(searchTerm) ||
      event.tags.some(tag => tag.toLowerCase().includes(searchTerm)) ||
      event.venue.toLowerCase().includes(searchTerm)
    );
  }

  if (filters.eventType) {
    filteredEvents = filteredEvents.filter(event => event.eventType === filters.eventType);
  }

  if (filters.category) {
    filteredEvents = filteredEvents.filter(event => event.category === filters.category);
  }

  if (filters.upcoming === 'true') {
    const now = new Date();
    filteredEvents = filteredEvents.filter(event => new Date(event.startDate) >= now);
  } else if (filters.upcoming === 'false') {
    const now = new Date();
    filteredEvents = filteredEvents.filter(event => new Date(event.endDate) < now);
  }

  // Sort by start date
  filteredEvents.sort((a, b) => new Date(a.startDate) - new Date(b.startDate));

  // Pagination
  const total = filteredEvents.length;
  const pages = Math.ceil(total / limit);
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedEvents = filteredEvents.slice(startIndex, endIndex);

  return {
    success: true,
    count: paginatedEvents.length,
    pagination: {
      page,
      limit,
      total,
      pages
    },
    data: {
      events: paginatedEvents
    }
  };
};
