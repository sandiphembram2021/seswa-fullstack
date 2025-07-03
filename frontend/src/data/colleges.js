// List of colleges where SESWA has student members
// Import colleges service for dynamic data
import collegesService from '../services/collegesService';
export const colleges = [
  {
    id: 'iiest-shibpur',
    name: 'IIEST Shibpur',
    fullName: 'Indian Institute of Engineering Science and Technology, Shibpur',
    location: 'Howrah, West Bengal',
    type: 'Government',
    established: 1856,
    website: 'https://www.iiests.ac.in/',
    logo: null,
    description: 'One of the oldest engineering institutions in India, formerly Bengal Engineering and Science University.',
    branches: [
      'Computer Science and Engineering',
      'Electronics and Telecommunication Engineering',
      'Electrical Engineering',
      'Mechanical Engineering',
      'Civil Engineering',
      'Chemical Engineering',
      'Mining Engineering',
      'Metallurgical and Materials Engineering',
      'Information Technology',
      'Architecture'
    ]
  },
  {
    id: 'nit-durgapur',
    name: 'NIT Durgapur',
    fullName: 'National Institute of Technology Durgapur',
    location: 'Durgapur, West Bengal',
    type: 'Government',
    established: 1960,
    website: 'https://nitdgp.ac.in/',
    logo: null,
    description: 'A premier technical institution and one of the 31 National Institutes of Technology in India.',
    branches: [
      'Computer Science and Engineering',
      'Electronics and Communication Engineering',
      'Electrical Engineering',
      'Mechanical Engineering',
      'Civil Engineering',
      'Chemical Engineering',
      'Metallurgical and Materials Engineering',
      'Biotechnology and Medical Engineering'
    ]
  },
  {
    id: 'iit-kharagpur',
    name: 'IIT Kharagpur',
    fullName: 'Indian Institute of Technology Kharagpur',
    location: 'Kharagpur, West Bengal',
    type: 'Government',
    established: 1951,
    website: 'https://www.iitkgp.ac.in/',
    logo: null,
    description: 'The first IIT established in India and one of the most prestigious engineering institutions.',
    branches: [
      'Computer Science and Engineering',
      'Electronics and Electrical Communication Engineering',
      'Electrical Engineering',
      'Mechanical Engineering',
      'Civil Engineering',
      'Chemical Engineering',
      'Metallurgical and Materials Engineering',
      'Mining Engineering',
      'Aerospace Engineering',
      'Biotechnology',
      'Ocean Engineering and Naval Architecture'
    ]
  },
  {
    id: 'jadavpur-university',
    name: 'Jadavpur University',
    fullName: 'Jadavpur University',
    location: 'Kolkata, West Bengal',
    type: 'Government',
    established: 1955,
    website: 'https://www.jaduniv.edu.in/',
    logo: null,
    description: 'A prestigious state university known for its engineering and technology programs.',
    branches: [
      'Computer Science and Engineering',
      'Electronics and Telecommunication Engineering',
      'Electrical Engineering',
      'Mechanical Engineering',
      'Civil Engineering',
      'Chemical Engineering',
      'Metallurgical and Materials Engineering',
      'Production Engineering',
      'Information Technology',
      'Food Technology and Biochemical Engineering'
    ]
  },
  {
    id: 'kgec',
    name: 'KGEC',
    fullName: 'Kalyani Government Engineering College',
    location: 'Kalyani, West Bengal',
    type: 'Government',
    established: 1995,
    website: 'https://www.kgec.edu.in/',
    logo: null,
    description: 'A government engineering college affiliated to Maulana Abul Kalam Azad University of Technology.',
    branches: [
      'Computer Science and Engineering',
      'Electronics and Communication Engineering',
      'Electrical Engineering',
      'Mechanical Engineering',
      'Civil Engineering',
      'Information Technology'
    ]
  },
  {
    id: 'jgec',
    name: 'JGEC',
    fullName: 'Jalpaiguri Government Engineering College',
    location: 'Jalpaiguri, West Bengal',
    type: 'Government',
    established: 1961,
    website: 'https://www.jgec.ac.in/',
    logo: null,
    description: 'A government engineering college in North Bengal region.',
    branches: [
      'Computer Science and Engineering',
      'Electronics and Communication Engineering',
      'Electrical Engineering',
      'Mechanical Engineering',
      'Civil Engineering'
    ]
  },
  {
    id: 'cgec',
    name: 'CGEC',
    fullName: 'Cooch Behar Government Engineering College',
    location: 'Cooch Behar, West Bengal',
    type: 'Government',
    established: 2006,
    website: 'https://www.cgec.edu.in/',
    logo: null,
    description: 'A government engineering college serving the North Bengal region.',
    branches: [
      'Computer Science and Engineering',
      'Electronics and Communication Engineering',
      'Electrical Engineering',
      'Mechanical Engineering',
      'Civil Engineering'
    ]
  },
  {
    id: 'makaut',
    name: 'MAKAUT',
    fullName: 'Maulana Abul Kalam Azad University of Technology',
    location: 'Kolkata, West Bengal',
    type: 'Government',
    established: 2001,
    website: 'https://makautwb.ac.in/',
    logo: null,
    description: 'A state technological university with multiple affiliated colleges.',
    branches: [
      'Computer Science and Engineering',
      'Electronics and Communication Engineering',
      'Electrical Engineering',
      'Mechanical Engineering',
      'Civil Engineering',
      'Information Technology',
      'Chemical Engineering'
    ]
  },
  {
    id: 'uit',
    name: 'UIT',
    fullName: 'University Institute of Technology',
    location: 'Burdwan, West Bengal',
    type: 'Government',
    established: 2001,
    website: 'https://www.buruniv.ac.in/',
    logo: null,
    description: 'Engineering college under University of Burdwan.',
    branches: [
      'Computer Science and Engineering',
      'Electronics and Communication Engineering',
      'Electrical Engineering',
      'Mechanical Engineering',
      'Civil Engineering'
    ]
  },
  {
    id: 'gcelt',
    name: 'GCELT',
    fullName: 'Government College of Engineering and Leather Technology',
    location: 'Kolkata, West Bengal',
    type: 'Government',
    established: 1947,
    website: 'https://www.gcelt.gov.in/',
    logo: null,
    description: 'A government engineering college specializing in leather technology and general engineering.',
    branches: [
      'Computer Science and Engineering',
      'Electronics and Communication Engineering',
      'Electrical Engineering',
      'Mechanical Engineering',
      'Civil Engineering',
      'Leather Technology'
    ]
  },
  {
    id: 'gcect',
    name: 'GCECT',
    fullName: 'Government College of Engineering and Ceramic Technology',
    location: 'Kolkata, West Bengal',
    type: 'Government',
    established: 1941,
    website: 'https://www.gcect.ac.in/',
    logo: null,
    description: 'A government engineering college with specialization in ceramic technology.',
    branches: [
      'Computer Science and Engineering',
      'Electronics and Communication Engineering',
      'Electrical Engineering',
      'Mechanical Engineering',
      'Civil Engineering',
      'Ceramic Technology'
    ]
  },
  {
    id: 'gcett-bankura',
    name: 'GCETT Bankura',
    fullName: 'Government College of Engineering and Textile Technology, Berhampore',
    location: 'Bankura, West Bengal',
    type: 'Government',
    established: 2012,
    website: 'https://www.gcettb.ac.in/',
    logo: null,
    description: 'Government engineering college with textile technology specialization.',
    branches: [
      'Computer Science and Engineering',
      'Electronics and Communication Engineering',
      'Electrical Engineering',
      'Mechanical Engineering',
      'Civil Engineering',
      'Textile Technology'
    ]
  },
  {
    id: 'gcett-serampore',
    name: 'GCETT Serampore',
    fullName: 'Government College of Engineering and Textile Technology, Serampore',
    location: 'Serampore, West Bengal',
    type: 'Government',
    established: 2012,
    website: 'https://www.gcetts.ac.in/',
    logo: null,
    description: 'Government engineering college focusing on textile and general engineering.',
    branches: [
      'Computer Science and Engineering',
      'Electronics and Communication Engineering',
      'Electrical Engineering',
      'Mechanical Engineering',
      'Civil Engineering',
      'Textile Technology'
    ]
  },
  {
    id: 'rkmgce',
    name: 'RKMGCE',
    fullName: 'Ramakrishna Mission Giridih College of Engineering',
    location: 'Giridih, Jharkhand',
    type: 'Private',
    established: 2009,
    website: 'https://www.rkmgce.ac.in/',
    logo: null,
    description: 'A private engineering college under Ramakrishna Mission.',
    branches: [
      'Computer Science and Engineering',
      'Electronics and Communication Engineering',
      'Electrical Engineering',
      'Mechanical Engineering',
      'Civil Engineering'
    ]
  }
];

// Helper functions
export const getCollegeById = (id) => {
  return colleges.find(college => college.id === id);
};

export const getCollegesByType = (type) => {
  return colleges.filter(college => college.type === type);
};

export const searchColleges = (query) => {
  const searchTerm = query.toLowerCase();
  return colleges.filter(college =>
    college.name.toLowerCase().includes(searchTerm) ||
    college.fullName.toLowerCase().includes(searchTerm) ||
    college.location.toLowerCase().includes(searchTerm)
  );
};

// Export service for dynamic data fetching
export { collegesService };
