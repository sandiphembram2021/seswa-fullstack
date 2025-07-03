const mongoose = require('mongoose');

const newsSchema = new mongoose.Schema({
  // Basic Information
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
    maxlength: [200, 'Title cannot exceed 200 characters']
  },
  slug: {
    type: String,
    unique: true,
    lowercase: true
  },
  excerpt: {
    type: String,
    required: [true, 'Excerpt is required'],
    trim: true,
    maxlength: [300, 'Excerpt cannot exceed 300 characters']
  },
  content: {
    type: String,
    required: [true, 'Content is required']
  },
  
  // Media
  featuredImage: {
    type: String,
    default: ''
  },
  images: [{
    url: String,
    caption: String,
    alt: String
  }],
  
  // Categorization
  category: {
    type: String,
    required: [true, 'Category is required'],
    enum: ['announcement', 'event', 'achievement', 'academic', 'placement', 'cultural', 'technical', 'community'],
    default: 'announcement'
  },
  tags: [{
    type: String,
    trim: true,
    lowercase: true
  }],
  
  // Author Information
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  authorName: {
    type: String,
    required: true
  },
  
  // Publishing
  status: {
    type: String,
    enum: ['draft', 'published', 'archived'],
    default: 'draft'
  },
  publishedAt: {
    type: Date
  },
  
  // Engagement
  views: {
    type: Number,
    default: 0
  },
  likes: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  }],
  
  // SEO
  metaTitle: String,
  metaDescription: String,
  
  // Event specific fields (if news is about an event)
  eventDate: Date,
  eventLocation: String,
  eventRegistrationLink: String,
  
  // Priority and Featured
  isPinned: {
    type: Boolean,
    default: false
  },
  isFeatured: {
    type: Boolean,
    default: false
  },
  priority: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

// Create slug from title before saving
newsSchema.pre('save', function(next) {
  if (this.isModified('title')) {
    this.slug = this.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  }
  
  // Set publishedAt when status changes to published
  if (this.isModified('status') && this.status === 'published' && !this.publishedAt) {
    this.publishedAt = new Date();
  }
  
  next();
});

// Indexes for efficient queries
newsSchema.index({ slug: 1 });
newsSchema.index({ category: 1 });
newsSchema.index({ status: 1 });
newsSchema.index({ publishedAt: -1 });
newsSchema.index({ isPinned: -1, publishedAt: -1 });
newsSchema.index({ isFeatured: -1, publishedAt: -1 });

// Virtual for like count
newsSchema.virtual('likeCount').get(function() {
  return this.likes.length;
});

// Ensure virtual fields are serialized
newsSchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('News', newsSchema);
