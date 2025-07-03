import { useState, useEffect } from 'react';
import axios from 'axios';
import { createMockEventsResponse } from '../data/mockEvents';

export const useEvents = (filters = {}) => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 9,
    total: 0,
    pages: 0
  });

  const fetchEvents = async (page = 1, searchFilters = {}) => {
    try {
      setLoading(true);
      setError(null);

      const params = {
        page,
        limit: pagination.limit,
        ...filters,
        ...searchFilters
      };

      // Remove empty filters
      Object.keys(params).forEach(key => {
        if (!params[key] || params[key] === '') {
          delete params[key];
        }
      });

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));

      // Use mock data for now
      const response = createMockEventsResponse(page, pagination.limit, params);

      setEvents(response.data.events);
      setPagination({
        ...pagination,
        page: response.pagination.page,
        total: response.pagination.total,
        pages: response.pagination.pages
      });

      // Uncomment below when backend is ready
      /*
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/events`, {
        params
      });

      setEvents(response.data.data.events);
      setPagination({
        ...pagination,
        page: response.data.pagination.page,
        total: response.data.pagination.total,
        pages: response.data.pagination.pages
      });
      */
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch events');
      setEvents([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const searchEvents = (searchFilters) => {
    fetchEvents(1, searchFilters);
  };

  const loadPage = (page) => {
    fetchEvents(page, filters);
  };

  const registerForEvent = async (eventId) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Update local state
      setEvents(prevEvents => 
        prevEvents.map(event => 
          event._id === eventId 
            ? { ...event, isRegistered: true, registrationCount: event.registrationCount + 1 }
            : event
        )
      );

      return { success: true, message: 'Successfully registered for event!' };

      // Uncomment below when backend is ready
      /*
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/events/${eventId}/register`);
      
      // Refresh events to get updated registration status
      await fetchEvents(pagination.page, filters);
      
      return { success: true, data: response.data };
      */
    } catch (err) {
      return { success: false, error: err.response?.data?.message || 'Registration failed' };
    }
  };

  const cancelRegistration = async (eventId) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Update local state
      setEvents(prevEvents => 
        prevEvents.map(event => 
          event._id === eventId 
            ? { ...event, isRegistered: false, registrationCount: Math.max(0, event.registrationCount - 1) }
            : event
        )
      );

      return { success: true, message: 'Registration cancelled successfully!' };

      // Uncomment below when backend is ready
      /*
      const response = await axios.delete(`${import.meta.env.VITE_API_URL}/events/${eventId}/register`);
      
      // Refresh events to get updated registration status
      await fetchEvents(pagination.page, filters);
      
      return { success: true, data: response.data };
      */
    } catch (err) {
      return { success: false, error: err.response?.data?.message || 'Cancellation failed' };
    }
  };

  return {
    events,
    loading,
    error,
    pagination,
    searchEvents,
    loadPage,
    registerForEvent,
    cancelRegistration,
    refetch: () => fetchEvents(pagination.page, filters)
  };
};
