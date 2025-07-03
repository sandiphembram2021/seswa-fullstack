import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  Calendar, 
  Clock, 
  User, 
  Tag, 
  ArrowLeft, 
  Share2,
  BookOpen,
  Eye,
  Heart,
  MessageCircle,
  Facebook,
  Twitter,
  Linkedin,
  Copy,
  CheckCircle
} from 'lucide-react';

const NewsDetailPage = () => {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [relatedNews, setRelatedNews] = useState([]);
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);

  // Mock article data
  const mockArticle = {
    id: 1,
    title: 'SESWA Annual Picnic 2025 - Registration Open',
    content: `
      <p>The Santal Engineering Students' Welfare Association is excited to announce the registration for our Annual Picnic 2025, scheduled for January 26, 2025, at the beautiful Eco Park in New Town, Kolkata.</p>
      
      <h2>Event Details</h2>
      <p>This year's annual picnic promises to be our biggest and most exciting event yet. We're expecting over 200 participants from across our 14 partner colleges, including students, alumni, and faculty members.</p>
      
      <h3>Date & Venue</h3>
      <ul>
        <li><strong>Date:</strong> January 26, 2025 (Republic Day)</li>
        <li><strong>Time:</strong> 10:00 AM - 6:00 PM</li>
        <li><strong>Venue:</strong> Eco Park, New Town, Kolkata</li>
        <li><strong>Registration Fee:</strong> ₹300 per person (Early Bird: ₹250)</li>
      </ul>
      
      <h3>Activities Planned</h3>
      <p>We have an exciting lineup of activities planned for the day:</p>
      <ul>
        <li>Cultural performances showcasing Santal traditions</li>
        <li>Technical quiz competition with exciting prizes</li>
        <li>Sports activities including cricket, football, and badminton</li>
        <li>Alumni networking session</li>
        <li>Traditional Santal lunch</li>
        <li>Photography contest</li>
        <li>Live music and dance performances</li>
      </ul>
      
      <h3>Registration Process</h3>
      <p>Registration is now open and will continue until January 20, 2025, or until we reach our capacity limit. Early bird registration (before December 15, 2024) is available at a discounted rate of ₹250.</p>
      
      <p>To register:</p>
      <ol>
        <li>Visit our registration portal</li>
        <li>Fill in your details and college information</li>
        <li>Make the payment online</li>
        <li>Receive confirmation email with event details</li>
      </ol>
      
      <h3>Transportation</h3>
      <p>We're arranging special buses from major colleges and railway stations. Transportation details will be shared with registered participants closer to the event date.</p>
      
      <h3>Contact Information</h3>
      <p>For any queries regarding the event, please contact:</p>
      <ul>
        <li>Email: events@seswa.org</li>
        <li>Phone: +91-XXXXXXXXXX</li>
        <li>WhatsApp Group: Link will be shared with registered participants</li>
      </ul>
      
      <p>Don't miss this opportunity to connect with fellow community members, celebrate our culture, and create lasting memories. Register today!</p>
    `,
    category: 'events',
    type: 'announcement',
    priority: 'high',
    author: 'SESWA Events Committee',
    publishedAt: '2024-12-01T10:00:00Z',
    updatedAt: '2024-12-01T10:00:00Z',
    image: null,
    tags: ['annual picnic', 'registration', 'community event', 'eco park', 'cultural'],
    views: 1250,
    likes: 89,
    comments: 23
  };

  const mockRelatedNews = [
    {
      id: 2,
      title: 'Freshers Welcome 2024 - Huge Success!',
      excerpt: 'Over 150 new students attended our Freshers Welcome event.',
      publishedAt: '2024-10-20T18:30:00Z',
      category: 'events'
    },
    {
      id: 3,
      title: 'WBJEE 2025 Counselling Guidance Sessions',
      excerpt: 'Free WBJEE counselling sessions for Santal students.',
      publishedAt: '2024-11-20T16:45:00Z',
      category: 'academic'
    },
    {
      id: 4,
      title: 'New Partnership with Tech Mahindra',
      excerpt: 'SESWA signs MoU for exclusive internship opportunities.',
      publishedAt: '2024-11-18T11:20:00Z',
      category: 'partnerships'
    }
  ];

  useEffect(() => {
    // In a real app, fetch article by ID
    setArticle(mockArticle);
    setRelatedNews(mockRelatedNews);
    setLikeCount(mockArticle.likes);
  }, [id]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikeCount(prev => isLiked ? prev - 1 : prev + 1);
  };

  const handleShare = (platform) => {
    const url = window.location.href;
    const title = article?.title || '';
    
    switch (platform) {
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
        break;
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`, '_blank');
        break;
      case 'linkedin':
        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, '_blank');
        break;
      case 'copy':
        navigator.clipboard.writeText(url);
        setCopySuccess(true);
        setTimeout(() => setCopySuccess(false), 2000);
        break;
    }
    setShowShareMenu(false);
  };

  if (!article) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading article...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <Link
          to="/news"
          className="inline-flex items-center text-primary-600 hover:text-primary-700 mb-8 font-medium"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to News
        </Link>

        {/* Article */}
        <article className="bg-white rounded-lg shadow-md overflow-hidden">
          {/* Header */}
          <div className="px-8 py-6 border-b border-gray-200">
            <div className="flex items-center mb-4">
              <span className="px-3 py-1 bg-primary-100 text-primary-800 text-sm font-medium rounded-full uppercase tracking-wide">
                {article.type}
              </span>
              <span className="ml-3 px-3 py-1 bg-gray-100 text-gray-700 text-sm font-medium rounded-full">
                {article.category}
              </span>
            </div>
            
            <h1 className="text-3xl md:text-4xl font-heading font-bold text-gray-900 mb-4">
              {article.title}
            </h1>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center text-sm text-gray-600 space-x-4">
                <div className="flex items-center">
                  <User className="h-4 w-4 mr-1" />
                  <span>{article.author}</span>
                </div>
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-1" />
                  <span>{formatDate(article.publishedAt)}</span>
                </div>
                <div className="flex items-center">
                  <Eye className="h-4 w-4 mr-1" />
                  <span>{article.views} views</span>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <button
                  onClick={handleLike}
                  className={`flex items-center space-x-1 px-3 py-1 rounded-lg transition-colors duration-200 ${
                    isLiked 
                      ? 'bg-red-100 text-red-600' 
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  <Heart className={`h-4 w-4 ${isLiked ? 'fill-current' : ''}`} />
                  <span>{likeCount}</span>
                </button>
                
                <div className="relative">
                  <button
                    onClick={() => setShowShareMenu(!showShareMenu)}
                    className="flex items-center space-x-1 px-3 py-1 bg-gray-100 text-gray-600 hover:bg-gray-200 rounded-lg transition-colors duration-200"
                  >
                    <Share2 className="h-4 w-4" />
                    <span>Share</span>
                  </button>
                  
                  {showShareMenu && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-10">
                      <div className="py-2">
                        <button
                          onClick={() => handleShare('facebook')}
                          className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          <Facebook className="h-4 w-4 mr-3 text-blue-600" />
                          Share on Facebook
                        </button>
                        <button
                          onClick={() => handleShare('twitter')}
                          className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          <Twitter className="h-4 w-4 mr-3 text-blue-400" />
                          Share on Twitter
                        </button>
                        <button
                          onClick={() => handleShare('linkedin')}
                          className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          <Linkedin className="h-4 w-4 mr-3 text-blue-700" />
                          Share on LinkedIn
                        </button>
                        <button
                          onClick={() => handleShare('copy')}
                          className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          {copySuccess ? (
                            <CheckCircle className="h-4 w-4 mr-3 text-green-600" />
                          ) : (
                            <Copy className="h-4 w-4 mr-3" />
                          )}
                          {copySuccess ? 'Copied!' : 'Copy Link'}
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="px-8 py-6">
            <div 
              className="prose prose-lg max-w-none"
              dangerouslySetInnerHTML={{ __html: article.content }}
            />
          </div>

          {/* Tags */}
          <div className="px-8 py-4 border-t border-gray-200">
            <div className="flex items-center">
              <Tag className="h-4 w-4 text-gray-400 mr-2" />
              <div className="flex flex-wrap gap-2">
                {article.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-gray-100 text-gray-600 text-sm rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </article>

        {/* Related News */}
        {relatedNews.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-heading font-bold text-gray-900 mb-6">
              Related News
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedNews.map((news) => (
                <Link
                  key={news.id}
                  to={`/news/${news.id}`}
                  className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 overflow-hidden"
                >
                  <div className="p-6">
                    <span className="px-2 py-1 bg-primary-100 text-primary-800 text-xs font-medium rounded-full uppercase tracking-wide">
                      {news.category}
                    </span>
                    <h3 className="text-lg font-semibold text-gray-900 mt-3 mb-2 line-clamp-2">
                      {news.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                      {news.excerpt}
                    </p>
                    <div className="flex items-center text-xs text-gray-500">
                      <Calendar className="h-3 w-3 mr-1" />
                      <span>{formatDate(news.publishedAt)}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NewsDetailPage;
