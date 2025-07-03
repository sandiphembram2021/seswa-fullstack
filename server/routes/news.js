const express = require('express');
const News = require('../models/News');
const { body, validationResult } = require('express-validator');

const router = express.Router();

// @route   GET /api/news
// @desc    Get all published news
// @access  Public
router.get('/', async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      category,
      search,
      featured,
      pinned
    } = req.query;

    // Build query for published news only
    let query = { status: 'published' };
    
    if (category) {
      query.category = category;
    }
    
    if (featured === 'true') {
      query.isFeatured = true;
    }
    
    if (pinned === 'true') {
      query.isPinned = true;
    }
    
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { excerpt: { $regex: search, $options: 'i' } },
        { content: { $regex: search, $options: 'i' } },
        { tags: { $in: [new RegExp(search, 'i')] } }
      ];
    }

    // Sort: pinned first, then by publishedAt desc
    const sortQuery = { isPinned: -1, publishedAt: -1 };

    // Execute query with pagination
    const news = await News.find(query)
      .populate('author', 'firstName lastName')
      .select('-content') // Exclude full content for list view
      .sort(sortQuery)
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await News.countDocuments(query);

    res.json({
      success: true,
      data: {
        news,
        pagination: {
          current: parseInt(page),
          pages: Math.ceil(total / limit),
          total,
          limit: parseInt(limit)
        }
      }
    });

  } catch (error) {
    console.error('Get news error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch news'
    });
  }
});

// @route   GET /api/news/featured
// @desc    Get featured news
// @access  Public
router.get('/featured', async (req, res) => {
  try {
    const featuredNews = await News.find({
      status: 'published',
      isFeatured: true
    })
    .populate('author', 'firstName lastName')
    .select('-content')
    .sort({ publishedAt: -1 })
    .limit(5);

    res.json({
      success: true,
      data: { news: featuredNews }
    });

  } catch (error) {
    console.error('Get featured news error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch featured news'
    });
  }
});

// @route   GET /api/news/latest
// @desc    Get latest news
// @access  Public
router.get('/latest', async (req, res) => {
  try {
    const { limit = 5 } = req.query;

    const latestNews = await News.find({
      status: 'published'
    })
    .populate('author', 'firstName lastName')
    .select('title excerpt featuredImage category publishedAt slug')
    .sort({ publishedAt: -1 })
    .limit(parseInt(limit));

    res.json({
      success: true,
      data: { news: latestNews }
    });

  } catch (error) {
    console.error('Get latest news error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch latest news'
    });
  }
});

// @route   GET /api/news/categories
// @desc    Get news categories with counts
// @access  Public
router.get('/categories', async (req, res) => {
  try {
    const categories = await News.aggregate([
      { $match: { status: 'published' } },
      { $group: { _id: '$category', count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]);

    res.json({
      success: true,
      data: { categories }
    });

  } catch (error) {
    console.error('Get categories error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch categories'
    });
  }
});

// @route   GET /api/news/:slug
// @desc    Get single news by slug
// @access  Public
router.get('/:slug', async (req, res) => {
  try {
    const news = await News.findOne({
      slug: req.params.slug,
      status: 'published'
    }).populate('author', 'firstName lastName email');

    if (!news) {
      return res.status(404).json({
        success: false,
        message: 'News article not found'
      });
    }

    // Increment views
    news.views += 1;
    await news.save();

    res.json({
      success: true,
      data: { news }
    });

  } catch (error) {
    console.error('Get news by slug error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch news article'
    });
  }
});

// @route   POST /api/news
// @desc    Create new news (Admin only)
// @access  Private/Admin
router.post('/', [
  body('title').trim().isLength({ min: 5 }).withMessage('Title must be at least 5 characters'),
  body('excerpt').trim().isLength({ min: 10 }).withMessage('Excerpt must be at least 10 characters'),
  body('content').trim().isLength({ min: 50 }).withMessage('Content must be at least 50 characters'),
  body('category').isIn(['announcement', 'event', 'achievement', 'academic', 'placement', 'cultural', 'technical', 'community']),
  body('authorName').trim().isLength({ min: 2 }).withMessage('Author name is required')
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

    const newsData = {
      ...req.body,
      author: req.body.author || '507f1f77bcf86cd799439011' // Default author ID
    };

    const news = new News(newsData);
    await news.save();

    res.status(201).json({
      success: true,
      message: 'News created successfully',
      data: { news }
    });

  } catch (error) {
    console.error('Create news error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create news'
    });
  }
});

// @route   PUT /api/news/:id
// @desc    Update news (Admin only)
// @access  Private/Admin
router.put('/:id', async (req, res) => {
  try {
    const news = await News.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!news) {
      return res.status(404).json({
        success: false,
        message: 'News not found'
      });
    }

    res.json({
      success: true,
      message: 'News updated successfully',
      data: { news }
    });

  } catch (error) {
    console.error('Update news error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update news'
    });
  }
});

// @route   DELETE /api/news/:id
// @desc    Delete news (Admin only)
// @access  Private/Admin
router.delete('/:id', async (req, res) => {
  try {
    const news = await News.findByIdAndDelete(req.params.id);

    if (!news) {
      return res.status(404).json({
        success: false,
        message: 'News not found'
      });
    }

    res.json({
      success: true,
      message: 'News deleted successfully'
    });

  } catch (error) {
    console.error('Delete news error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete news'
    });
  }
});

// @route   POST /api/news/:id/like
// @desc    Like/unlike news
// @access  Private
router.post('/:id/like', async (req, res) => {
  try {
    const { userId } = req.body;
    const news = await News.findById(req.params.id);

    if (!news) {
      return res.status(404).json({
        success: false,
        message: 'News not found'
      });
    }

    const existingLikeIndex = news.likes.findIndex(
      like => like.user.toString() === userId
    );

    if (existingLikeIndex > -1) {
      // Unlike
      news.likes.splice(existingLikeIndex, 1);
    } else {
      // Like
      news.likes.push({ user: userId });
    }

    await news.save();

    res.json({
      success: true,
      message: existingLikeIndex > -1 ? 'News unliked' : 'News liked',
      data: {
        likeCount: news.likes.length,
        isLiked: existingLikeIndex === -1
      }
    });

  } catch (error) {
    console.error('Like news error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to like/unlike news'
    });
  }
});

module.exports = router;
