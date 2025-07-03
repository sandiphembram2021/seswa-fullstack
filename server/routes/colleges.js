const express = require('express');
const College = require('../models/College');
const { body, validationResult } = require('express-validator');

const router = express.Router();

// @route   GET /api/colleges
// @desc    Get all active colleges
// @access  Public
router.get('/', async (req, res) => {
  try {
    const {
      page = 1,
      limit = 20,
      type,
      state,
      search,
      partner
    } = req.query;

    let query = { status: 'active' };
    
    if (type) {
      query.type = type;
    }
    
    if (state) {
      query['address.state'] = state;
    }
    
    if (partner === 'true') {
      query.isPartner = true;
    }
    
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { fullName: { $regex: search, $options: 'i' } },
        { shortName: { $regex: search, $options: 'i' } },
        { 'address.city': { $regex: search, $options: 'i' } }
      ];
    }

    const colleges = await College.find(query)
      .select('name fullName shortName type address.city address.state established stats isPartner logo')
      .sort({ name: 1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await College.countDocuments(query);

    res.json({
      success: true,
      data: {
        colleges,
        pagination: {
          current: parseInt(page),
          pages: Math.ceil(total / limit),
          total,
          limit: parseInt(limit)
        }
      }
    });

  } catch (error) {
    console.error('Get colleges error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch colleges'
    });
  }
});

// @route   GET /api/colleges/partners
// @desc    Get SESWA partner colleges
// @access  Public
router.get('/partners', async (req, res) => {
  try {
    const partnerColleges = await College.find({
      status: 'active',
      isPartner: true
    })
    .select('name shortName address.city address.state stats activeMemberCount')
    .sort({ name: 1 });

    res.json({
      success: true,
      data: { colleges: partnerColleges }
    });

  } catch (error) {
    console.error('Get partner colleges error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch partner colleges'
    });
  }
});

// @route   GET /api/colleges/stats
// @desc    Get college statistics
// @access  Public
router.get('/stats', async (req, res) => {
  try {
    const stats = await College.aggregate([
      { $match: { status: 'active' } },
      {
        $group: {
          _id: null,
          totalColleges: { $sum: 1 },
          partnerColleges: {
            $sum: { $cond: [{ $eq: ['$isPartner', true] }, 1, 0] }
          },
          governmentColleges: {
            $sum: { $cond: [{ $eq: ['$type', 'Government'] }, 1, 0] }
          },
          privateColleges: {
            $sum: { $cond: [{ $eq: ['$type', 'Private'] }, 1, 0] }
          },
          totalMembers: { $sum: '$stats.seswaStudents' },
          totalAlumni: { $sum: '$stats.alumni' }
        }
      }
    ]);

    const collegeStats = stats[0] || {
      totalColleges: 0,
      partnerColleges: 0,
      governmentColleges: 0,
      privateColleges: 0,
      totalMembers: 0,
      totalAlumni: 0
    };

    res.json({
      success: true,
      data: { stats: collegeStats }
    });

  } catch (error) {
    console.error('Get college stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch college statistics'
    });
  }
});

// @route   GET /api/colleges/:slug
// @desc    Get single college by slug
// @access  Public
router.get('/:slug', async (req, res) => {
  try {
    const college = await College.findOne({
      slug: req.params.slug,
      status: 'active'
    })
    .populate('representatives.user', 'firstName lastName email phone')
    .populate('seswaMembers.user', 'firstName lastName userType');

    if (!college) {
      return res.status(404).json({
        success: false,
        message: 'College not found'
      });
    }

    res.json({
      success: true,
      data: { college }
    });

  } catch (error) {
    console.error('Get college error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch college'
    });
  }
});

// @route   POST /api/colleges
// @desc    Create new college (Admin only)
// @access  Private/Admin
router.post('/', [
  body('name').trim().isLength({ min: 2 }).withMessage('College name is required'),
  body('address.city').trim().isLength({ min: 2 }).withMessage('City is required'),
  body('address.state').trim().isLength({ min: 2 }).withMessage('State is required')
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

    // Check if college already exists
    const existingCollege = await College.findOne({
      name: { $regex: new RegExp(req.body.name, 'i') }
    });

    if (existingCollege) {
      return res.status(400).json({
        success: false,
        message: 'College with this name already exists'
      });
    }

    const college = new College(req.body);
    await college.save();

    res.status(201).json({
      success: true,
      message: 'College created successfully',
      data: { college }
    });

  } catch (error) {
    console.error('Create college error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create college'
    });
  }
});

// @route   PUT /api/colleges/:id
// @desc    Update college (Admin only)
// @access  Private/Admin
router.put('/:id', async (req, res) => {
  try {
    const college = await College.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!college) {
      return res.status(404).json({
        success: false,
        message: 'College not found'
      });
    }

    res.json({
      success: true,
      message: 'College updated successfully',
      data: { college }
    });

  } catch (error) {
    console.error('Update college error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update college'
    });
  }
});

module.exports = router;
