const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  // Basic Information
  title: {
    type: String,
    required: [true, 'Event title is required'],
    trim: true,
    maxlength: [200, 'Title cannot exceed 200 characters']
  },
  slug: {
    type: String,
    unique: true,
    lowercase: true
  },
  description: {
    type: String,
    required: [true, 'Event description is required'],
    trim: true
  },
  shortDescription: {
    type: String,
    required: [true, 'Short description is required'],
    maxlength: [300, 'Short description cannot exceed 300 characters']
  },
  
  // Event Details
  eventType: {
    type: String,
    required: [true, 'Event type is required'],
    enum: ['workshop', 'seminar', 'cultural', 'technical', 'networking', 'competition', 'meeting', 'celebration'],
    default: 'workshop'
  },
  category: {
    type: String,
    enum: ['academic', 'cultural', 'technical', 'social', 'professional'],
    default: 'academic'
  },
  
  // Date and Time
  startDate: {
    type: Date,
    required: [true, 'Start date is required']
  },
  endDate: {
    type: Date,
    required: [true, 'End date is required']
  },
  startTime: {
    type: String,
    required: [true, 'Start time is required']
  },
  endTime: {
    type: String,
    required: [true, 'End time is required']
  },
  timezone: {
    type: String,
    default: 'Asia/Kolkata'
  },
  
  // Location
  venue: {
    name: {
      type: String,
      required: [true, 'Venue name is required']
    },
    address: {
      street: String,
      city: String,
      state: String,
      pincode: String,
      country: {
        type: String,
        default: 'India'
      }
    },
    coordinates: {
      latitude: Number,
      longitude: Number
    }
  },
  isOnline: {
    type: Boolean,
    default: false
  },
  onlineLink: {
    type: String,
    validate: {
      validator: function(v) {
        return !this.isOnline || (v && v.length > 0);
      },
      message: 'Online link is required for online events'
    }
  },
  
  // Registration
  registrationRequired: {
    type: Boolean,
    default: true
  },
  registrationDeadline: Date,
  maxParticipants: {
    type: Number,
    min: [1, 'Maximum participants must be at least 1']
  },
  registrationFee: {
    type: Number,
    default: 0,
    min: [0, 'Registration fee cannot be negative']
  },
  registrationLink: String,
  
  // Participants
  registeredParticipants: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    registeredAt: {
      type: Date,
      default: Date.now
    },
    status: {
      type: String,
      enum: ['registered', 'confirmed', 'attended', 'cancelled'],
      default: 'registered'
    },
    paymentStatus: {
      type: String,
      enum: ['pending', 'paid', 'refunded'],
      default: 'pending'
    }
  }],
  
  // Organizer Information
  organizer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  organizerName: {
    type: String,
    required: true
  },
  contactEmail: {
    type: String,
    required: [true, 'Contact email is required'],
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
  },
  contactPhone: String,
  
  // Media
  featuredImage: String,
  images: [{
    url: String,
    caption: String,
    alt: String
  }],
  
  // Status
  status: {
    type: String,
    enum: ['draft', 'published', 'cancelled', 'completed'],
    default: 'draft'
  },
  
  // Additional Information
  tags: [{
    type: String,
    trim: true,
    lowercase: true
  }],
  requirements: [String],
  agenda: [{
    time: String,
    title: String,
    description: String,
    speaker: String
  }],
  
  // Engagement
  views: {
    type: Number,
    default: 0
  },
  
  // SEO
  metaTitle: String,
  metaDescription: String
}, {
  timestamps: true
});

// Create slug from title before saving
eventSchema.pre('save', function(next) {
  if (this.isModified('title')) {
    this.slug = this.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  }
  next();
});

// Validate end date is after start date
eventSchema.pre('save', function(next) {
  if (this.endDate <= this.startDate) {
    next(new Error('End date must be after start date'));
  } else {
    next();
  }
});

// Indexes
eventSchema.index({ slug: 1 });
eventSchema.index({ startDate: 1 });
eventSchema.index({ eventType: 1 });
eventSchema.index({ status: 1 });
eventSchema.index({ 'venue.address.city': 1 });

// Virtual for participant count
eventSchema.virtual('participantCount').get(function() {
  return this.registeredParticipants.length;
});

// Virtual for available spots
eventSchema.virtual('availableSpots').get(function() {
  if (!this.maxParticipants) return null;
  return this.maxParticipants - this.registeredParticipants.length;
});

// Virtual for registration status
eventSchema.virtual('isRegistrationOpen').get(function() {
  const now = new Date();
  const hasDeadlinePassed = this.registrationDeadline && now > this.registrationDeadline;
  const isFull = this.maxParticipants && this.registeredParticipants.length >= this.maxParticipants;
  const isEventPast = now > this.startDate;
  
  return this.registrationRequired && 
         this.status === 'published' && 
         !hasDeadlinePassed && 
         !isFull && 
         !isEventPast;
});

// Ensure virtual fields are serialized
eventSchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Event', eventSchema);
