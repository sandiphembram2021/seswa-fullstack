const mongoose = require('mongoose');

const collegeSchema = new mongoose.Schema({
  // Basic Information
  name: {
    type: String,
    required: [true, 'College name is required'],
    trim: true,
    unique: true
  },
  fullName: {
    type: String,
    trim: true
  },
  shortName: {
    type: String,
    trim: true,
    uppercase: true
  },
  
  // College Details
  type: {
    type: String,
    enum: ['Government', 'Private', 'Autonomous', 'Deemed'],
    default: 'Government'
  },
  affiliation: {
    type: String,
    trim: true
  },
  university: {
    type: String,
    trim: true
  },
  
  // Location Information
  address: {
    street: String,
    city: {
      type: String,
      required: [true, 'City is required']
    },
    district: String,
    state: {
      type: String,
      required: [true, 'State is required'],
      default: 'West Bengal'
    },
    pincode: {
      type: String,
      match: [/^[0-9]{6}$/, 'Please enter a valid 6-digit pincode']
    },
    country: {
      type: String,
      default: 'India'
    }
  },
  coordinates: {
    latitude: Number,
    longitude: Number
  },
  
  // Contact Information
  contact: {
    phone: {
      type: String,
      match: [/^[0-9]{10,11}$/, 'Please enter a valid phone number']
    },
    email: {
      type: String,
      lowercase: true,
      match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
    },
    website: {
      type: String,
      match: [/^https?:\/\/.+/, 'Please enter a valid website URL']
    },
    fax: String
  },
  
  // Academic Information
  established: {
    type: Number,
    min: [1800, 'Establishment year seems too early'],
    max: [new Date().getFullYear(), 'Establishment year cannot be in the future']
  },
  
  // Available Courses/Branches
  branches: [{
    name: {
      type: String,
      required: true
    },
    code: String,
    duration: {
      type: Number,
      default: 4
    },
    degree: {
      type: String,
      enum: ['B.Tech', 'B.E', 'M.Tech', 'M.E', 'PhD', 'Diploma'],
      default: 'B.Tech'
    },
    intake: Number,
    isActive: {
      type: Boolean,
      default: true
    }
  }],
  
  // SESWA Related Information
  seswaMembers: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    role: {
      type: String,
      enum: ['student', 'alumni', 'representative', 'coordinator'],
      default: 'student'
    },
    batch: String,
    branch: String,
    joinedAt: {
      type: Date,
      default: Date.now
    },
    isActive: {
      type: Boolean,
      default: true
    }
  }],
  
  // Representative Information
  representatives: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    name: String,
    position: {
      type: String,
      enum: ['coordinator', 'assistant-coordinator', 'member'],
      default: 'member'
    },
    contact: {
      phone: String,
      email: String
    },
    appointedAt: {
      type: Date,
      default: Date.now
    },
    isActive: {
      type: Boolean,
      default: true
    }
  }],
  
  // Statistics
  stats: {
    totalStudents: {
      type: Number,
      default: 0
    },
    seswaStudents: {
      type: Number,
      default: 0
    },
    alumni: {
      type: Number,
      default: 0
    },
    placementRate: {
      type: Number,
      min: 0,
      max: 100
    }
  },
  
  // Media
  logo: {
    type: String
  },
  images: [{
    url: String,
    caption: String,
    type: {
      type: String,
      enum: ['campus', 'building', 'lab', 'library', 'hostel', 'event'],
      default: 'campus'
    }
  }],
  
  // Additional Information
  description: {
    type: String,
    maxlength: [1000, 'Description cannot exceed 1000 characters']
  },
  facilities: [String],
  achievements: [String],
  
  // Status
  status: {
    type: String,
    enum: ['active', 'inactive', 'pending'],
    default: 'active'
  },
  isPartner: {
    type: Boolean,
    default: true
  },
  partnershipDate: {
    type: Date,
    default: Date.now
  },
  
  // SEO
  slug: {
    type: String,
    unique: true,
    lowercase: true
  },
  metaTitle: String,
  metaDescription: String,
  
  // Ranking and Recognition
  ranking: {
    nirf: Number,
    state: Number,
    category: String
  },
  accreditation: [{
    body: String,
    grade: String,
    validUntil: Date
  }]
}, {
  timestamps: true
});

// Create slug from name before saving
collegeSchema.pre('save', function(next) {
  if (this.isModified('name')) {
    this.slug = this.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  }
  next();
});

// Update member counts
collegeSchema.methods.updateMemberCounts = function() {
  this.stats.seswaStudents = this.seswaMembers.filter(member => 
    member.isActive && member.role === 'student'
  ).length;
  
  this.stats.alumni = this.seswaMembers.filter(member => 
    member.isActive && member.role === 'alumni'
  ).length;
};

// Indexes
collegeSchema.index({ name: 1 });
collegeSchema.index({ slug: 1 });
collegeSchema.index({ 'address.city': 1 });
collegeSchema.index({ 'address.state': 1 });
collegeSchema.index({ type: 1 });
collegeSchema.index({ status: 1 });
collegeSchema.index({ isPartner: 1 });

// Virtual for full address
collegeSchema.virtual('fullAddress').get(function() {
  const addr = this.address;
  return [addr.street, addr.city, addr.district, addr.state, addr.pincode]
    .filter(Boolean)
    .join(', ');
});

// Virtual for active member count
collegeSchema.virtual('activeMemberCount').get(function() {
  return this.seswaMembers.filter(member => member.isActive).length;
});

// Virtual for active representative count
collegeSchema.virtual('activeRepresentativeCount').get(function() {
  return this.representatives.filter(rep => rep.isActive).length;
});

// Ensure virtual fields are serialized
collegeSchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('College', collegeSchema);
