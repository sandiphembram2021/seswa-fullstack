import React, { useState } from 'react';
import { Calendar, TrendingUp, Users, MapPin, Clock, AlertCircle, Download, FileText, BookOpen, Eye } from 'lucide-react';
import { useEvents } from '../hooks/useEvents';
import EventFilters from '../components/EventFilters';
import EventCard from '../components/EventCard';
import EventModal from '../components/EventModal';
import Pagination from '../components/Pagination';

const EventsPage = () => {
  const { events, loading, error, pagination, searchEvents, loadPage, registerForEvent, cancelRegistration } = useEvents();
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [registering, setRegistering] = useState(false);
  const [notification, setNotification] = useState(null);
  const [activeTab, setActiveTab] = useState('events');

  // Magazine data
  const magazines = [
    {
      id: 1,
      title: 'BERA TARAS 2016',
      subtitle: 'Annual E-Magazine',
      year: '2016',
      description: 'Our annual magazine featuring student articles, cultural events, academic achievements, and community stories from 2016.',
      coverImage: '/api/placeholder/300/400',
      pdfPath: '/assets/BERA TARAS 2016 e-magazine.pdf',
      fileSize: '15.2 MB',
      pages: 48,
      downloads: 1250,
      featured: true,
      highlights: [
        'Annual Picnic Coverage',
        'Student Achievement Stories',
        'Cultural Event Photos',
        'Alumni Success Stories',
        'Technical Articles'
      ]
    },
    {
      id: 2,
      title: 'BERA TARAS 2015',
      subtitle: 'Annual E-Magazine',
      year: '2015',
      description: 'A comprehensive collection of memories, achievements, and stories from the SESWA community in 2015.',
      coverImage: '/api/placeholder/300/400',
      pdfPath: '/assets/BERA TARAS 2015 e-magazine.pdf',
      fileSize: '12.8 MB',
      pages: 42,
      downloads: 980,
      featured: false,
      highlights: [
        'Freshers Welcome 2015',
        'Technical Workshop Reports',
        'Cultural Program Highlights',
        'Academic Excellence Awards',
        'Community Service Projects'
      ]
    }
  ];

  const handleEventClick = (event) => {
    setSelectedEvent(event);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedEvent(null);
  };

  const handleFilter = (filters) => {
    searchEvents(filters);
  };

  const handleClearFilters = () => {
    searchEvents({});
  };

  const handlePageChange = (page) => {
    loadPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleRegister = async (eventId) => {
    setRegistering(true);
    const result = await registerForEvent(eventId);
    setRegistering(false);

    if (result.success) {
      setNotification({ type: 'success', message: result.message });
      setTimeout(() => setNotification(null), 5000);
    } else {
      setNotification({ type: 'error', message: result.error });
      setTimeout(() => setNotification(null), 5000);
    }
  };

  const handleCancelRegistration = async (eventId) => {
    setRegistering(true);
    const result = await cancelRegistration(eventId);
    setRegistering(false);

    if (result.success) {
      setNotification({ type: 'success', message: result.message });
      setTimeout(() => setNotification(null), 5000);
    } else {
      setNotification({ type: 'error', message: result.error });
      setTimeout(() => setNotification(null), 5000);
    }
  };

  const handleDownloadMagazine = (magazine) => {
    // Create a temporary link element to trigger download
    const link = document.createElement('a');
    link.href = magazine.pdfPath;
    link.download = `${magazine.title.replace(/\s+/g, '_')}.pdf`;
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Show success notification
    setNotification({
      type: 'success',
      message: `${magazine.title} download started!`
    });
    setTimeout(() => setNotification(null), 3000);
  };

  const handleViewMagazine = (magazine) => {
    // Open PDF in new tab for viewing
    window.open(magazine.pdfPath, '_blank');
  };

  // Mock statistics for now
  const stats = [
    { icon: Calendar, label: 'Total Events', value: pagination.total || '25+', color: 'text-primary-600' },
    { icon: Clock, label: 'Upcoming', value: '8', color: 'text-blue-600' },
    { icon: Users, label: 'Registered', value: '450+', color: 'text-green-600' },
    { icon: MapPin, label: 'Locations', value: '12+', color: 'text-purple-600' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-heading font-bold text-gray-900 mb-4">
            Events & Publications
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Join our workshops, seminars, and community events. Also explore our annual
            BERA TARAS magazines and publications.
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white rounded-lg shadow-md mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              <button
                onClick={() => setActiveTab('events')}
                className={`flex items-center py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'events'
                    ? 'border-primary-500 text-primary-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <Calendar className="h-4 w-4 mr-2" />
                Events & Activities
              </button>
              <button
                onClick={() => setActiveTab('magazines')}
                className={`flex items-center py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'magazines'
                    ? 'border-primary-500 text-primary-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <BookOpen className="h-4 w-4 mr-2" />
                BERA TARAS Magazine
              </button>
            </nav>
          </div>
        </div>

        {/* Notification */}
        {notification && (
          <div className={`mb-6 p-4 rounded-lg flex items-center ${
            notification.type === 'success'
              ? 'bg-green-50 border border-green-200 text-green-800'
              : 'bg-red-50 border border-red-200 text-red-800'
          }`}>
            <AlertCircle className="h-5 w-5 mr-2" />
            {notification.message}
          </div>
        )}

        {/* Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md p-6 text-center">
              <stat.icon className={`h-8 w-8 mx-auto mb-3 ${stat.color}`} />
              <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
              <div className="text-sm text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Filters */}
        <EventFilters
          onFilter={handleFilter}
          onClear={handleClearFilters}
          loading={loading}
        />

        {/* Error State */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <p className="text-red-800 text-center">{error}</p>
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
          </div>
        )}

        {/* Events Grid */}
        {!loading && !error && (
          <>
            {events.length > 0 ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                  {events.map((event) => (
                    <EventCard
                      key={event._id}
                      event={event}
                      onClick={handleEventClick}
                      onRegister={handleRegister}
                      onCancelRegistration={handleCancelRegistration}
                      registering={registering}
                    />
                  ))}
                </div>

                {/* Pagination */}
                <Pagination
                  currentPage={pagination.page}
                  totalPages={pagination.pages}
                  onPageChange={handlePageChange}
                  loading={loading}
                />
              </>
            ) : (
              <div className="text-center py-12">
                <Calendar className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No events found</h3>
                <p className="text-gray-600 mb-6">
                  Try adjusting your search criteria or clearing the filters.
                </p>
                <button
                  onClick={handleClearFilters}
                  className="btn-primary"
                >
                  Clear Filters
                </button>
              </div>
            )}
          </>
        )}

        {/* Event Modal */}
        <EventModal
          event={selectedEvent}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onRegister={handleRegister}
          onCancelRegistration={handleCancelRegistration}
          registering={registering}
        />
      </div>
    </div>
  );
};

export default EventsPage;
