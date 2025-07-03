const express = require('express');
const Event = require('../models/Event');
const { body, validationResult } = require('express-validator');

const router = express.Router();

// @route   GET /api/events
// @desc    Get all published events
// @access  Public
router.get('/', async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      eventType,
      category,
      upcoming,
      search
    } = req.query;

    let query = { status: 'published' };
    
    if (eventType) {
      query.eventType = eventType;
    }
    
    if (category) {
      query.category = category;
    }
    
    if (upcoming === 'true') {
      query.startDate = { $gte: new Date() };
    }
    
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { 'venue.name': { $regex: search, $options: 'i' } }
      ];
    }

    const events = await Event.find(query)
      .populate('organizer', 'firstName lastName')
      .sort({ startDate: 1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Event.countDocuments(query);

    res.json({
      success: true,
      data: {
        events,
        pagination: {
          current: parseInt(page),
          pages: Math.ceil(total / limit),
          total,
          limit: parseInt(limit)
        }
      }
    });

  } catch (error) {
    console.error('Get events error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch events'
    });
  }
});

// @route   GET /api/events/upcoming
// @desc    Get upcoming events
// @access  Public
router.get('/upcoming', async (req, res) => {
  try {
    const { limit = 5 } = req.query;

    const upcomingEvents = await Event.find({
      status: 'published',
      startDate: { $gte: new Date() }
    })
    .populate('organizer', 'firstName lastName')
    .sort({ startDate: 1 })
    .limit(parseInt(limit));

    res.json({
      success: true,
      data: { events: upcomingEvents }
    });

  } catch (error) {
    console.error('Get upcoming events error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch upcoming events'
    });
  }
});

// @route   GET /api/events/:slug
// @desc    Get single event by slug
// @access  Public
router.get('/:slug', async (req, res) => {
  try {
    const event = await Event.findOne({
      slug: req.params.slug,
      status: 'published'
    }).populate('organizer', 'firstName lastName email phone');

    if (!event) {
      return res.status(404).json({
        success: false,
        message: 'Event not found'
      });
    }

    // Increment views
    event.views += 1;
    await event.save();

    res.json({
      success: true,
      data: { event }
    });

  } catch (error) {
    console.error('Get event error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch event'
    });
  }
});

// @route   POST /api/events/:id/register
// @desc    Register for an event
// @access  Private
router.post('/:id/register', async (req, res) => {
  try {
    const { userId, userName } = req.body;
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({
        success: false,
        message: 'Event not found'
      });
    }

    // Check if registration is open
    if (!event.isRegistrationOpen) {
      return res.status(400).json({
        success: false,
        message: 'Registration is not open for this event'
      });
    }

    // Check if user is already registered
    const existingRegistration = event.registeredParticipants.find(
      participant => participant.user.toString() === userId
    );

    if (existingRegistration) {
      return res.status(400).json({
        success: false,
        message: 'You are already registered for this event'
      });
    }

    // Add participant
    event.registeredParticipants.push({
      user: userId,
      status: 'registered'
    });

    await event.save();

    res.json({
      success: true,
      message: 'Successfully registered for the event',
      data: {
        participantCount: event.participantCount,
        availableSpots: event.availableSpots
      }
    });

  } catch (error) {
    console.error('Event registration error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to register for event'
    });
  }
});

module.exports = router;
