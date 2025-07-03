const express = require('express');
const User = require('../models/User');

const router = express.Router();

// @route   GET /api/members
// @desc    Get all active members
// @access  Public
router.get('/', async (req, res) => {
  try {
    const {
      page = 1,
      limit = 20,
      userType,
      college,
      search
    } = req.query;

    let query = { isActive: true };
    
    if (userType) {
      query.userType = userType;
    }
    
    if (college) {
      query.college = { $regex: college, $options: 'i' };
    }
    
    if (search) {
      query.$or = [
        { firstName: { $regex: search, $options: 'i' } },
        { lastName: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { college: { $regex: search, $options: 'i' } }
      ];
    }

    const members = await User.find(query)
      .select('firstName lastName email userType college course year graduationYear company designation joinedAt')
      .sort({ joinedAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await User.countDocuments(query);

    res.json({
      success: true,
      data: {
        members,
        pagination: {
          current: parseInt(page),
          pages: Math.ceil(total / limit),
          total,
          limit: parseInt(limit)
        }
      }
    });

  } catch (error) {
    console.error('Get members error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch members'
    });
  }
});

// @route   GET /api/members/stats
// @desc    Get member statistics
// @access  Public
router.get('/stats', async (req, res) => {
  try {
    const stats = await User.aggregate([
      { $match: { isActive: true } },
      {
        $group: {
          _id: null,
          totalMembers: { $sum: 1 },
          students: {
            $sum: { $cond: [{ $eq: ['$userType', 'student'] }, 1, 0] }
          },
          alumni: {
            $sum: { $cond: [{ $eq: ['$userType', 'alumni'] }, 1, 0] }
          },
          representatives: {
            $sum: { $cond: [{ $eq: ['$userType', 'representative'] }, 1, 0] }
          }
        }
      }
    ]);

    const memberStats = stats[0] || {
      totalMembers: 0,
      students: 0,
      alumni: 0,
      representatives: 0
    };

    res.json({
      success: true,
      data: { stats: memberStats }
    });

  } catch (error) {
    console.error('Get member stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch member statistics'
    });
  }
});

module.exports = router;
