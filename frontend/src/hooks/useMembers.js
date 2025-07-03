import { useState, useEffect } from 'react';
import axios from 'axios';
import { createMockResponse } from '../data/mockMembers';

export const useMembers = (filters = {}) => {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 12,
    total: 0,
    pages: 0
  });

  const fetchMembers = async (page = 1, searchFilters = {}) => {
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
      const response = createMockResponse(page, pagination.limit, params);

      setMembers(response.data.users);
      setPagination({
        ...pagination,
        page: response.pagination.page,
        total: response.pagination.total,
        pages: response.pagination.pages
      });

      // Uncomment below when backend is ready
      /*
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/users`, {
        params
      });

      setMembers(response.data.data.users);
      setPagination({
        ...pagination,
        page: response.data.pagination.page,
        total: response.data.pagination.total,
        pages: response.data.pagination.pages
      });
      */
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch members');
      setMembers([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  const searchMembers = (searchFilters) => {
    fetchMembers(1, searchFilters);
  };

  const loadPage = (page) => {
    fetchMembers(page, filters);
  };

  return {
    members,
    loading,
    error,
    pagination,
    searchMembers,
    loadPage,
    refetch: () => fetchMembers(pagination.page, filters)
  };
};
