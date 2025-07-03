// Mock data for testing the resources section
export const mockResources = [
  {
    _id: '1',
    title: 'Complete React.js Tutorial Series',
    description: 'Comprehensive React.js tutorial covering hooks, context, routing, and state management. Perfect for beginners and intermediate developers.',
    type: 'study_material',
    category: 'computer_science',
    subcategory: 'Web Development',
    subject: 'React.js',
    difficulty: 'intermediate',
    author: {
      _id: 'author1',
      firstName: 'Priya',
      lastName: 'Soren',
      email: 'priya.soren@email.com'
    },
    fileUrl: 'https://example.com/react-tutorial.pdf',
    fileName: 'react-complete-guide.pdf',
    fileSize: 15728640, // 15MB
    fileType: 'pdf',
    externalUrl: 'https://reactjs.org/tutorial',
    tags: ['react', 'javascript', 'frontend', 'web development'],
    language: 'english',
    views: 1245,
    downloads: 387,
    likeCount: 89,
    isLiked: false,
    createdAt: '2024-11-15T10:00:00.000Z',
    thumbnail: null
  },
  {
    _id: '2',
    title: 'SC/ST Scholarship Information 2024-25',
    description: 'Comprehensive guide to scholarships available for SC/ST students in engineering. Includes application procedures, deadlines, and eligibility criteria for various government schemes.',
    type: 'study_material',
    category: 'general',
    subcategory: 'Scholarships',
    subject: 'Financial Aid',
    difficulty: 'beginner',
    author: {
      _id: 'author2',
      firstName: 'SESWA',
      lastName: 'Team',
      email: 'scholarships@seswa.org'
    },
    fileUrl: 'https://example.com/sc-st-scholarships.pdf',
    fileName: 'sc-st-scholarships-guide.pdf',
    fileSize: 5242880, // 5MB
    fileType: 'pdf',
    tags: ['scholarships', 'sc/st', 'financial aid', 'government schemes'],
    language: 'english',
    views: 2156,
    downloads: 567,
    likeCount: 189,
    isLiked: true,
    createdAt: '2024-11-20T09:00:00.000Z'
  },
  {
    _id: '3',
    title: 'Data Structures and Algorithms Notes',
    description: 'Comprehensive notes on data structures and algorithms with examples in C++ and Java. Includes time complexity analysis and practice problems.',
    type: 'study_material',
    category: 'computer_science',
    subcategory: 'Data Structures',
    subject: 'DSA',
    difficulty: 'intermediate',
    author: {
      _id: 'author3',
      firstName: 'Arjun',
      lastName: 'Murmu',
      email: 'arjun.murmu@email.com'
    },
    fileUrl: 'https://example.com/dsa-notes.pdf',
    fileName: 'dsa-complete-notes.pdf',
    fileSize: 8388608, // 8MB
    fileType: 'pdf',
    tags: ['dsa', 'algorithms', 'data structures', 'programming'],
    language: 'english',
    views: 987,
    downloads: 234,
    likeCount: 67,
    isLiked: false,
    createdAt: '2024-11-10T14:30:00.000Z'
  },
  {
    _id: '4',
    title: 'Summer Internship - Microsoft',
    description: 'Microsoft is offering summer internships for engineering students. Gain hands-on experience with cloud technologies and AI.',
    type: 'internship',
    category: 'computer_science',
    company: 'Microsoft India',
    location: 'Hyderabad, India',
    salary: '₹50,000/month',
    experience: 'Students',
    skills: ['C#', 'Azure', 'Machine Learning', 'Python'],
    applicationDeadline: '2025-01-15T23:59:59.000Z',
    applicationUrl: 'https://careers.microsoft.com/internships',
    jobType: 'internship',
    author: {
      _id: 'author4',
      firstName: 'Career',
      lastName: 'Team',
      email: 'careers@seswa.org'
    },
    tags: ['internship', 'microsoft', 'azure', 'machine learning'],
    language: 'english',
    views: 1876,
    downloads: 0,
    likeCount: 234,
    isLiked: false,
    createdAt: '2024-11-25T11:00:00.000Z'
  },
  {
    _id: '5',
    title: 'Machine Learning Fundamentals Blog',
    description: 'A comprehensive blog series covering machine learning fundamentals, from linear regression to neural networks.',
    type: 'blog',
    category: 'computer_science',
    subcategory: 'Machine Learning',
    subject: 'ML',
    difficulty: 'beginner',
    author: {
      _id: 'author5',
      firstName: 'Deepak',
      lastName: 'Marandi',
      email: 'deepak.marandi@email.com'
    },
    externalUrl: 'https://medium.com/@deepak/ml-fundamentals',
    tags: ['machine learning', 'ai', 'python', 'data science'],
    language: 'english',
    views: 756,
    downloads: 0,
    likeCount: 45,
    isLiked: true,
    createdAt: '2024-11-18T16:45:00.000Z'
  },
  {
    _id: '6',
    title: 'Mechanical Engineering Design Handbook',
    description: 'Complete handbook for mechanical engineering design principles, materials, and manufacturing processes.',
    type: 'study_material',
    category: 'mechanical',
    subcategory: 'Design',
    subject: 'Mechanical Design',
    difficulty: 'advanced',
    author: {
      _id: 'author6',
      firstName: 'Ravi',
      lastName: 'Hansda',
      email: 'ravi.hansda@email.com'
    },
    fileUrl: 'https://example.com/mech-design.pdf',
    fileName: 'mechanical-design-handbook.pdf',
    fileSize: 25165824, // 24MB
    fileType: 'pdf',
    tags: ['mechanical engineering', 'design', 'manufacturing'],
    language: 'english',
    views: 543,
    downloads: 123,
    likeCount: 34,
    isLiked: false,
    createdAt: '2024-11-12T13:20:00.000Z'
  },
  {
    _id: '7',
    title: 'Civil Engineer - L&T Construction',
    description: 'Larsen & Toubro is hiring civil engineers for infrastructure projects across India. Great opportunity for fresh graduates.',
    type: 'job',
    category: 'civil',
    company: 'Larsen & Toubro',
    location: 'Mumbai, India',
    salary: '₹6-8 LPA',
    experience: '0-2 years',
    skills: ['AutoCAD', 'Project Management', 'Structural Analysis'],
    applicationDeadline: '2024-12-20T23:59:59.000Z',
    applicationUrl: 'https://careers.larsentoubro.com',
    jobType: 'full-time',
    author: {
      _id: 'author7',
      firstName: 'Placement',
      lastName: 'Cell',
      email: 'placement@seswa.org'
    },
    tags: ['civil engineer', 'construction', 'infrastructure'],
    language: 'english',
    views: 892,
    downloads: 0,
    likeCount: 67,
    isLiked: false,
    createdAt: '2024-11-22T10:15:00.000Z'
  },
  {
    _id: '8',
    title: 'Electronics Circuit Analysis Video Series',
    description: 'Video tutorial series on electronics circuit analysis, covering AC/DC circuits, filters, and amplifiers.',
    type: 'video',
    category: 'electrical',
    subcategory: 'Circuit Analysis',
    subject: 'Electronics',
    difficulty: 'intermediate',
    author: {
      _id: 'author8',
      firstName: 'Manoj',
      lastName: 'Hemrom',
      email: 'manoj.hemrom@email.com'
    },
    externalUrl: 'https://youtube.com/playlist?list=electronics-circuits',
    tags: ['electronics', 'circuits', 'analysis', 'video tutorial'],
    language: 'english',
    views: 1234,
    downloads: 0,
    likeCount: 89,
    isLiked: false,
    createdAt: '2024-11-14T12:00:00.000Z'
  },
  {
    _id: '9',
    title: 'Chemical Process Engineering Notes',
    description: 'Detailed notes on chemical process engineering including mass transfer, heat transfer, and reaction engineering.',
    type: 'study_material',
    category: 'chemical',
    subcategory: 'Process Engineering',
    subject: 'Chemical Engineering',
    difficulty: 'advanced',
    author: {
      _id: 'author9',
      firstName: 'Anita',
      lastName: 'Besra',
      email: 'anita.besra@email.com'
    },
    fileUrl: 'https://example.com/chemical-process.pdf',
    fileName: 'chemical-process-engineering.pdf',
    fileSize: 18874368, // 18MB
    fileType: 'pdf',
    tags: ['chemical engineering', 'process', 'mass transfer'],
    language: 'english',
    views: 456,
    downloads: 89,
    likeCount: 23,
    isLiked: true,
    createdAt: '2024-11-08T15:30:00.000Z'
  },
  {
    _id: '10',
    title: 'Frontend Developer Internship - Flipkart',
    description: 'Flipkart is offering frontend developer internships. Work on e-commerce platforms and learn from industry experts.',
    type: 'internship',
    category: 'computer_science',
    company: 'Flipkart',
    location: 'Bangalore, India',
    salary: '₹40,000/month',
    experience: 'Students',
    skills: ['React', 'JavaScript', 'CSS', 'HTML'],
    applicationDeadline: '2025-01-10T23:59:59.000Z',
    applicationUrl: 'https://careers.flipkart.com/internships',
    jobType: 'internship',
    author: {
      _id: 'author10',
      firstName: 'Tech',
      lastName: 'Team',
      email: 'tech@seswa.org'
    },
    tags: ['internship', 'frontend', 'react', 'flipkart'],
    language: 'english',
    views: 1567,
    downloads: 0,
    likeCount: 178,
    isLiked: false,
    createdAt: '2024-11-28T09:45:00.000Z'
  },
  {
    _id: '11',
    title: 'WBJEE Preparation Guide for Santal Students',
    description: 'Complete preparation guide for WBJEE examination with tips, strategies, and practice questions. Specially curated for Santal engineering aspirants.',
    type: 'study_material',
    category: 'general',
    subcategory: 'Entrance Exams',
    subject: 'WBJEE',
    difficulty: 'intermediate',
    author: {
      _id: 'author11',
      firstName: 'SESWA',
      lastName: 'Academic Team',
      email: 'academic@seswa.org'
    },
    fileUrl: 'https://example.com/wbjee-guide.pdf',
    fileName: 'wbjee-preparation-guide.pdf',
    fileSize: 12582912, // 12MB
    fileType: 'pdf',
    tags: ['wbjee', 'entrance exam', 'preparation', 'engineering'],
    language: 'english',
    views: 1876,
    downloads: 456,
    likeCount: 234,
    isLiked: false,
    createdAt: '2024-11-30T10:00:00.000Z'
  },
  {
    _id: '12',
    title: 'SESWA Annual Magazine 2024',
    description: 'Annual magazine featuring articles, job details, diary of annual events, success stories of our members, and cultural content.',
    type: 'study_material',
    category: 'general',
    subcategory: 'Magazine',
    subject: 'Community',
    difficulty: 'beginner',
    author: {
      _id: 'author12',
      firstName: 'Editorial',
      lastName: 'Team',
      email: 'magazine@seswa.org'
    },
    fileUrl: 'https://example.com/seswa-magazine-2024.pdf',
    fileName: 'seswa-annual-magazine-2024.pdf',
    fileSize: 20971520, // 20MB
    fileType: 'pdf',
    tags: ['magazine', 'annual', 'community', 'success stories'],
    language: 'english',
    views: 987,
    downloads: 234,
    likeCount: 156,
    isLiked: true,
    createdAt: '2024-12-01T14:30:00.000Z'
  },
  {
    _id: '13',
    title: 'Santal Culture and Heritage Blog Series',
    description: 'Educational blog series about Santal culture, traditions, language, and heritage. Promoting cultural awareness among engineering students.',
    type: 'blog',
    category: 'general',
    subcategory: 'Culture',
    subject: 'Santal Heritage',
    difficulty: 'beginner',
    author: {
      _id: 'author13',
      firstName: 'Cultural',
      lastName: 'Committee',
      email: 'culture@seswa.org'
    },
    externalUrl: 'https://medium.com/@seswa/santal-culture-series',
    tags: ['santal culture', 'heritage', 'traditions', 'language'],
    language: 'english',
    views: 654,
    downloads: 0,
    likeCount: 89,
    isLiked: false,
    createdAt: '2024-11-25T16:00:00.000Z'
  }
];

// Mock API response structure
export const createMockResourcesResponse = (page = 1, limit = 12, filters = {}) => {
  let filteredResources = [...mockResources];

  // Apply filters
  if (filters.search) {
    const searchTerm = filters.search.toLowerCase();
    filteredResources = filteredResources.filter(resource =>
      resource.title.toLowerCase().includes(searchTerm) ||
      resource.description.toLowerCase().includes(searchTerm) ||
      resource.tags.some(tag => tag.toLowerCase().includes(searchTerm)) ||
      resource.company?.toLowerCase().includes(searchTerm) ||
      resource.subject?.toLowerCase().includes(searchTerm)
    );
  }

  if (filters.type) {
    filteredResources = filteredResources.filter(resource => resource.type === filters.type);
  }

  if (filters.category) {
    filteredResources = filteredResources.filter(resource => resource.category === filters.category);
  }

  if (filters.difficulty) {
    filteredResources = filteredResources.filter(resource => resource.difficulty === filters.difficulty);
  }

  // Sort by creation date (newest first)
  filteredResources.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  // Pagination
  const total = filteredResources.length;
  const pages = Math.ceil(total / limit);
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedResources = filteredResources.slice(startIndex, endIndex);

  return {
    success: true,
    count: paginatedResources.length,
    pagination: {
      page,
      limit,
      total,
      pages
    },
    data: {
      resources: paginatedResources
    }
  };
};
