// API Configuration Utility
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

// API endpoints
export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: `${API_BASE_URL}/api/auth/login`,
  },
  AGENTS: `${API_BASE_URL}/api/agents`,
  DISTRIBUTIONS: {
    BASE: `${API_BASE_URL}/api/distributions`,
    UPLOAD: `${API_BASE_URL}/api/distributions/upload`,
  },
};

// Utility function to get the base URL
export const getApiBaseUrl = () => API_BASE_URL;

// Helper function for making API requests
export const apiRequest = async (url, options = {}) => {
  try {
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'An error occurred');
    }

    return await response.json();
  } catch (error) {
    throw error;
  }
};

export default API_ENDPOINTS;