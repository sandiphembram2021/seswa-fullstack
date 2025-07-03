const express = require('express');

const router = express.Router();

// @route   GET /api/resources/magazines
// @desc    Get available magazines
// @access  Public
router.get('/magazines', async (req, res) => {
  try {
    // Static magazine data for now
    const magazines = [
      {
        id: 1,
        title: 'BERA TARAS 2016',
        description: 'Annual magazine featuring student achievements, cultural articles, and community highlights from 2016.',
        year: 2016,
        coverImage: '/api/placeholder/300/400',
        downloadUrl: '/downloads/bera-taras-2016.pdf',
        fileSize: '15.2 MB',
        pages: 48,
        publishedDate: '2016-12-31',
        category: 'annual',
        downloads: 1250,
        featured: true
      },
      {
        id: 2,
        title: 'BERA TARAS 2015',
        description: 'Annual magazine showcasing the vibrant SESWA community activities and achievements from 2015.',
        year: 2015,
        coverImage: '/api/placeholder/300/400',
        downloadUrl: '/downloads/bera-taras-2015.pdf',
        fileSize: '12.8 MB',
        pages: 42,
        publishedDate: '2015-12-31',
        category: 'annual',
        downloads: 980,
        featured: false
      }
    ];

    res.json({
      success: true,
      data: { magazines }
    });

  } catch (error) {
    console.error('Get magazines error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch magazines'
    });
  }
});

// @route   GET /api/resources/downloads
// @desc    Get downloadable resources
// @access  Public
router.get('/downloads', async (req, res) => {
  try {
    const downloads = [
      {
        id: 1,
        title: 'SESWA Membership Form',
        description: 'Official membership registration form for new members',
        fileUrl: '/downloads/seswa-membership-form.pdf',
        fileSize: '2.1 MB',
        category: 'forms',
        downloads: 450
      },
      {
        id: 2,
        title: 'Scholarship Application Form',
        description: 'Application form for SESWA scholarship program',
        fileUrl: '/downloads/scholarship-application.pdf',
        fileSize: '1.8 MB',
        category: 'forms',
        downloads: 320
      },
      {
        id: 3,
        title: 'Event Guidelines',
        description: 'Guidelines for organizing SESWA events',
        fileUrl: '/downloads/event-guidelines.pdf',
        fileSize: '3.2 MB',
        category: 'guidelines',
        downloads: 180
      }
    ];

    res.json({
      success: true,
      data: { downloads }
    });

  } catch (error) {
    console.error('Get downloads error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch downloads'
    });
  }
});

// @route   GET /api/resources/links
// @desc    Get useful links
// @access  Public
router.get('/links', async (req, res) => {
  try {
    const links = [
      {
        id: 1,
        title: 'WBJEE Official Website',
        description: 'West Bengal Joint Entrance Examination official portal',
        url: 'https://wbjeeb.nic.in/',
        category: 'academic',
        isExternal: true
      },
      {
        id: 2,
        title: 'IIEST Shibpur',
        description: 'Indian Institute of Engineering Science and Technology, Shibpur',
        url: 'https://www.iiests.ac.in/',
        category: 'colleges',
        isExternal: true
      },
      {
        id: 3,
        title: 'NIT Durgapur',
        description: 'National Institute of Technology Durgapur',
        url: 'https://nitdgp.ac.in/',
        category: 'colleges',
        isExternal: true
      },
      {
        id: 4,
        title: 'Jadavpur University',
        description: 'Jadavpur University official website',
        url: 'https://www.jaduniv.edu.in/',
        category: 'colleges',
        isExternal: true
      }
    ];

    res.json({
      success: true,
      data: { links }
    });

  } catch (error) {
    console.error('Get links error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch links'
    });
  }
});

module.exports = router;
