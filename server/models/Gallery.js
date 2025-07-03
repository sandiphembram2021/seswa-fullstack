const mongoose = require('mongoose');

const gallerySchema = new mongoose.Schema({
  // Basic Information
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
    maxlength: [200, 'Title cannot exceed 200 characters']
  },
  description: {
    type: String,
    trim: true,
    maxlength: [500, 'Description cannot exceed 500 characters']
  },
  
  // Image Information
  imageUrl: {
    type: String,
    required: [true, 'Image URL is required']
  },
  thumbnailUrl: {
    type: String
  },
  altText: {
    type: String,
    required: [true, 'Alt text is required for accessibility']
  },
  
  // Categorization
  category: {
    type: String,
    required: [true, 'Category is required'],
    enum: ['events', 'cultural', 'academic', 'alumni', 'community', 'meetings', 'youth', 'awards', 'workshops', 'celebrations'],
    default: 'events'
  },
  tags: [{
    type: String,
    trim: true,
    lowercase: true
  }],
  
  // Event/Context Information
  eventName: {
    type: String,
    trim: true
  },
  eventDate: {
    type: Date
  },
  location: {
    type: String,
    trim: true
  },
  
  // Technical Information
  fileSize: {
    type: Number
  },
  dimensions: {
    width: Number,
    height: Number
  },
  format: {
    type: String,
    enum: ['jpg', 'jpeg', 'png', 'gif', 'webp'],
    lowercase: true
  },
  
  // Upload Information
  uploadedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  uploaderName: {
    type: String,
    required: true
  },
  
  // Photographer Information
  photographer: {
    type: String,
    trim: true,
    default: 'SESWA Team'
  },
  photographerCredit: {
    type: String,
    trim: true
  },
  
  // Status and Visibility
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected', 'archived'],
    default: 'pending'
  },
  isPublic: {
    type: Boolean,
    default: true
  },
  isFeatured: {
    type: Boolean,
    default: false
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
    likedAt: {
      type: Date,
      default: Date.now
    }
  }],
  
  // Comments
  comments: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    userName: String,
    comment: {
      type: String,
      required: true,
      maxlength: [500, 'Comment cannot exceed 500 characters']
    },
    createdAt: {
      type: Date,
      default: Date.now
    },
    isApproved: {
      type: Boolean,
      default: false
    }
  }],
  
  // Moderation
  moderatedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  moderatedAt: {
    type: Date
  },
  moderationNotes: {
    type: String
  },
  
  // SEO and Metadata
  metaTitle: String,
  metaDescription: String,
  
  // Copyright and Usage
  copyrightInfo: {
    type: String,
    default: '© SESWA - Santal Engineering Students\' Welfare Association'
  },
  usageRights: {
    type: String,
    enum: ['public', 'restricted', 'private'],
    default: 'public'
  }
}, {
  timestamps: true
});

// Indexes for efficient queries
gallerySchema.index({ category: 1 });
gallerySchema.index({ status: 1 });
gallerySchema.index({ isPublic: 1 });
gallerySchema.index({ isFeatured: -1, createdAt: -1 });
gallerySchema.index({ eventDate: -1 });
gallerySchema.index({ tags: 1 });
gallerySchema.index({ uploadedBy: 1 });

// Virtual for like count
gallerySchema.virtual('likeCount').get(function() {
  return this.likes.length;
});

// Virtual for comment count
gallerySchema.virtual('commentCount').get(function() {
  return this.comments.filter(comment => comment.isApproved).length;
});

// Virtual for approved comments
gallerySchema.virtual('approvedComments').get(function() {
  return this.comments.filter(comment => comment.isApproved);
});

// Method to check if user has liked the image
gallerySchema.methods.isLikedBy = function(userId) {
  return this.likes.some(like => like.user.toString() === userId.toString());
};

// Method to toggle like
gallerySchema.methods.toggleLike = function(userId) {
  const existingLikeIndex = this.likes.findIndex(like => 
    like.user.toString() === userId.toString()
  );
  
  if (existingLikeIndex > -1) {
    this.likes.splice(existingLikeIndex, 1);
    return false; // unliked
  } else {
    this.likes.push({ user: userId });
    return true; // liked
  }
};

// Ensure virtual fields are serialized
gallerySchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Gallery', gallerySchema);
