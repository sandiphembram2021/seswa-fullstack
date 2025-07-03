const express = require('express');
const Gallery = require('../models/Gallery');
const { body, validationResult } = require('express-validator');

const router = express.Router();

// @route   GET /api/gallery
// @desc    Get all approved gallery images
// @access  Public
router.get('/', async (req, res) => {
  try {
    const {
      page = 1,
      limit = 12,
      category,
      search,
      featured
    } = req.query;

    let query = { 
      status: 'approved',
      isPublic: true 
    };
    
    if (category) {
      query.category = category;
    }
    
    if (featured === 'true') {
      query.isFeatured = true;
    }
    
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { eventName: { $regex: search, $options: 'i' } },
        { tags: { $in: [new RegExp(search, 'i')] } }
      ];
    }

    const images = await Gallery.find(query)
      .populate('uploadedBy', 'firstName lastName')
      .select('-comments') // Exclude comments for list view
      .sort({ isFeatured: -1, createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Gallery.countDocuments(query);

    res.json({
      success: true,
      data: {
        images,
        pagination: {
          current: parseInt(page),
          pages: Math.ceil(total / limit),
          total,
          limit: parseInt(limit)
        }
      }
    });

  } catch (error) {
    console.error('Get gallery error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch gallery images'
    });
  }
});

// @route   GET /api/gallery/featured
// @desc    Get featured gallery images
// @access  Public
router.get('/featured', async (req, res) => {
  try {
    const { limit = 8 } = req.query;

    const featuredImages = await Gallery.find({
      status: 'approved',
      isPublic: true,
      isFeatured: true
    })
    .populate('uploadedBy', 'firstName lastName')
    .select('title imageUrl thumbnailUrl altText category eventName eventDate')
    .sort({ createdAt: -1 })
    .limit(parseInt(limit));

    res.json({
      success: true,
      data: { images: featuredImages }
    });

  } catch (error) {
    console.error('Get featured gallery error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch featured images'
    });
  }
});

// @route   GET /api/gallery/categories
// @desc    Get gallery categories with counts
// @access  Public
router.get('/categories', async (req, res) => {
  try {
    const categories = await Gallery.aggregate([
      { 
        $match: { 
          status: 'approved',
          isPublic: true 
        } 
      },
      { 
        $group: { 
          _id: '$category', 
          count: { $sum: 1 } 
        } 
      },
      { $sort: { count: -1 } }
    ]);

    res.json({
      success: true,
      data: { categories }
    });

  } catch (error) {
    console.error('Get gallery categories error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch categories'
    });
  }
});

// @route   GET /api/gallery/:id
// @desc    Get single gallery image
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const image = await Gallery.findOne({
      _id: req.params.id,
      status: 'approved',
      isPublic: true
    })
    .populate('uploadedBy', 'firstName lastName')
    .populate('comments.user', 'firstName lastName');

    if (!image) {
      return res.status(404).json({
        success: false,
        message: 'Image not found'
      });
    }

    // Increment views
    image.views += 1;
    await image.save();

    res.json({
      success: true,
      data: { image }
    });

  } catch (error) {
    console.error('Get gallery image error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch image'
    });
  }
});

// @route   POST /api/gallery/:id/like
// @desc    Like/unlike gallery image
// @access  Private
router.post('/:id/like', async (req, res) => {
  try {
    const { userId } = req.body;
    const image = await Gallery.findById(req.params.id);

    if (!image) {
      return res.status(404).json({
        success: false,
        message: 'Image not found'
      });
    }

    const isLiked = image.toggleLike(userId);
    await image.save();

    res.json({
      success: true,
      message: isLiked ? 'Image liked' : 'Image unliked',
      data: {
        likeCount: image.likeCount,
        isLiked
      }
    });

  } catch (error) {
    console.error('Like image error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to like/unlike image'
    });
  }
});

// @route   POST /api/gallery/:id/comment
// @desc    Add comment to gallery image
// @access  Private
router.post('/:id/comment', [
  body('comment').trim().isLength({ min: 1, max: 500 }).withMessage('Comment must be 1-500 characters')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const { userId, userName, comment } = req.body;
    const image = await Gallery.findById(req.params.id);

    if (!image) {
      return res.status(404).json({
        success: false,
        message: 'Image not found'
      });
    }

    image.comments.push({
      user: userId,
      userName,
      comment,
      isApproved: false // Comments need approval
    });

    await image.save();

    res.status(201).json({
      success: true,
      message: 'Comment added successfully (pending approval)',
      data: {
        commentCount: image.commentCount
      }
    });

  } catch (error) {
    console.error('Add comment error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to add comment'
    });
  }
});

module.exports = router;
