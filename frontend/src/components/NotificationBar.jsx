import React, { useState, useEffect } from 'react';
import { X, Bell, Calendar, BookOpen, Users, ExternalLink } from 'lucide-react';

const NotificationBar = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [currentNotification, setCurrentNotification] = useState(0);

  // Sample notifications/updates
  const notifications = [
    {
      id: 1,
      type: 'update',
      icon: BookOpen,
      title: 'New Magazine Released!',
      message: 'BERA TARAS 2024 is now available for download.',
      action: 'Download Now',
      link: '/magazines',
      color: 'bg-green-600',
      priority: 'high'
    },
    {
      id: 2,
      type: 'news',
      icon: Bell,
      title: 'Latest News Update',
      message: 'SESWA Annual Gathering 2024 announced with exciting programs.',
      action: 'Read News',
      link: '/news',
      color: 'bg-blue-600',
      priority: 'high'
    },
    {
      id: 3,
      type: 'gallery',
      icon: Calendar,
      title: 'New Photos Added',
      message: 'Check out photos from recent cultural heritage workshop.',
      action: 'View Gallery',
      link: '/gallery',
      color: 'bg-purple-600',
      priority: 'medium'
    },
    {
      id: 4,
      type: 'announcement',
      icon: Users,
      title: 'Scholarship Program',
      message: 'New merit-based scholarships available for engineering students.',
      action: 'Learn More',
      link: '/news',
      color: 'bg-orange-600',
      priority: 'medium'
    }
  ];

  // Auto-rotate notifications every 5 seconds
  useEffect(() => {
    if (notifications.length > 1) {
      const interval = setInterval(() => {
        setCurrentNotification((prev) => (prev + 1) % notifications.length);
      }, 5000);

      return () => clearInterval(interval);
    }
  }, [notifications.length]);

  // Check if notification was dismissed
  useEffect(() => {
    const dismissed = localStorage.getItem('seswa-notification-dismissed');
    if (dismissed) {
      const dismissedDate = new Date(dismissed);
      const now = new Date();
      const daysDiff = (now - dismissedDate) / (1000 * 60 * 60 * 24);
      
      // Show again after 7 days
      if (daysDiff < 7) {
        setIsVisible(false);
      }
    }
  }, []);

  const handleDismiss = () => {
    setIsVisible(false);
    localStorage.setItem('seswa-notification-dismissed', new Date().toISOString());
  };

  const handleAction = (link) => {
    if (link && link !== '#') {
      window.location.href = link;
    }
  };

  if (!isVisible || notifications.length === 0) {
    return null;
  }

  const notification = notifications[currentNotification];
  const IconComponent = notification.icon;

  return (
    <div className={`${notification.color} text-white relative overflow-hidden`}>
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent transform -skew-x-12"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-3">
          {/* Notification Content */}
          <div className="flex items-center space-x-4 flex-1">
            {/* Icon */}
            <div className="flex-shrink-0">
              <IconComponent className="h-6 w-6" />
            </div>

            {/* Message */}
            <div className="flex-1 min-w-0">
              <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4">
                <div className="flex-1">
                  <p className="text-sm font-medium">
                    {notification.title}
                  </p>
                  <p className="text-sm opacity-90 hidden sm:block">
                    {notification.message}
                  </p>
                </div>

                {/* Action Button */}
                {notification.action && (
                  <div className="mt-2 sm:mt-0 flex-shrink-0">
                    <button
                      onClick={() => handleAction(notification.link)}
                      className="bg-white bg-opacity-20 hover:bg-opacity-30 text-white text-sm font-medium px-4 py-2 rounded-md transition-all duration-200 flex items-center space-x-2"
                    >
                      <span>{notification.action}</span>
                      {notification.link !== '#' && (
                        <ExternalLink className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Navigation Dots (if multiple notifications) */}
          {notifications.length > 1 && (
            <div className="hidden sm:flex items-center space-x-2 mx-4">
              {notifications.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentNotification(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-200 ${
                    index === currentNotification
                      ? 'bg-white'
                      : 'bg-white bg-opacity-50 hover:bg-opacity-75'
                  }`}
                />
              ))}
            </div>
          )}

          {/* Close Button */}
          <div className="flex-shrink-0 ml-4">
            <button
              onClick={handleDismiss}
              className="text-white hover:text-gray-200 transition-colors duration-200"
              aria-label="Dismiss notification"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Progress Bar (for auto-rotation) */}
      {notifications.length > 1 && (
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-black bg-opacity-20">
          <div 
            className="h-full bg-white bg-opacity-50 transition-all duration-100 ease-linear"
            style={{
              width: `${((currentNotification + 1) / notifications.length) * 100}%`
            }}
          />
        </div>
      )}
    </div>
  );
};

export default NotificationBar;
