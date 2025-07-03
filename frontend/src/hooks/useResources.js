import { useState, useEffect } from 'react';
import axios from 'axios';
import { createMockResourcesResponse } from '../data/mockResources';

export const useResources = (filters = {}) => {
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 12,
    total: 0,
    pages: 0
  });

  const fetchResources = async (page = 1, searchFilters = {}) => {
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
      const response = createMockResourcesResponse(page, pagination.limit, params);

      setResources(response.data.resources);
      setPagination({
        ...pagination,
        page: response.pagination.page,
        total: response.pagination.total,
        pages: response.pagination.pages
      });

      // Uncomment below when backend is ready
      /*
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/resources`, {
        params
      });

      setResources(response.data.data.resources);
      setPagination({
        ...pagination,
        page: response.data.pagination.page,
        total: response.data.pagination.total,
        pages: response.data.pagination.pages
      });
      */
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch resources');
      setResources([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchResources();
  }, []);

  const searchResources = (searchFilters) => {
    fetchResources(1, searchFilters);
  };

  const loadPage = (page) => {
    fetchResources(page, filters);
  };

  const likeResource = async (resourceId) => {
    try {
      // Update local state optimistically
      setResources(prevResources => 
        prevResources.map(resource => 
          resource._id === resourceId 
            ? { 
                ...resource, 
                isLiked: !resource.isLiked,
                likeCount: resource.isLiked ? resource.likeCount - 1 : resource.likeCount + 1
              }
            : resource
        )
      );

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 300));

      return { success: true };

      // Uncomment below when backend is ready
      /*
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/resources/${resourceId}/like`);
      return { success: true, data: response.data };
      */
    } catch (err) {
      // Revert optimistic update on error
      setResources(prevResources => 
        prevResources.map(resource => 
          resource._id === resourceId 
            ? { 
                ...resource, 
                isLiked: !resource.isLiked,
                likeCount: resource.isLiked ? resource.likeCount + 1 : resource.likeCount - 1
              }
            : resource
        )
      );
      return { success: false, error: err.response?.data?.message || 'Failed to like resource' };
    }
  };

  const downloadResource = async (resourceId) => {
    try {
      // Update download count
      setResources(prevResources => 
        prevResources.map(resource => 
          resource._id === resourceId 
            ? { ...resource, downloads: resource.downloads + 1 }
            : resource
        )
      );

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 300));

      return { success: true };

      // Uncomment below when backend is ready
      /*
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/resources/${resourceId}/download`);
      return { success: true, data: response.data };
      */
    } catch (err) {
      return { success: false, error: err.response?.data?.message || 'Failed to download resource' };
    }
  };

  return {
    resources,
    loading,
    error,
    pagination,
    searchResources,
    loadPage,
    likeResource,
    downloadResource,
    refetch: () => fetchResources(pagination.page, filters)
  };
};
