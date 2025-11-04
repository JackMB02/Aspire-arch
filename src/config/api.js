// src/config/app.js

// Dynamic API base URL that works everywhere
const API_BASE_URL = window.location.hostname === 'localhost' 
  ? 'http://localhost:4000/api' 
  : 'https://aspire-arch-server.onrender.com/api';

console.log('🌐 API Base URL:', API_BASE_URL);
console.log('🏠 Current Host:', window.location.hostname);

export const API_ENDPOINTS = {
  // Test endpoints
  ROOT: `${API_BASE_URL}`,
  TEST: `${API_BASE_URL}/test`,
  HEALTH: `${API_BASE_URL}/health`,
  
  // Home page endpoint
  HOME: `${API_BASE_URL}/home`,
  
  // Auth endpoints
  LOGIN: `${API_BASE_URL}/auth/login`,
  
  // Items endpoints
  ITEMS: `${API_BASE_URL}/items`,
  
  // Contact endpoints
  CONTACT_INFO: `${API_BASE_URL}/contact/info`,
  CONTACT_SUBMIT: `${API_BASE_URL}/contact/submit`,
  
  // Architecture Colleagues Lab endpoints
  THE_COLLEAGUE_UNI: {
    BASE: `${API_BASE_URL}/thecolleagueuni`,
    CONTACT: `${API_BASE_URL}/thecolleagueuni/contact`,
    TEAM: `${API_BASE_URL}/thecolleagueuni/team`,
    MISSION: `${API_BASE_URL}/thecolleagueuni/mission`,
    INITIATIVES: `${API_BASE_URL}/thecolleagueuni/initiatives`,
    ABOUT: `${API_BASE_URL}/thecolleagueuni/about`,
    CONTACTS_ADMIN: `${API_BASE_URL}/thecolleagueuni/contacts`,
  },

  // ===== DESIGN PROJECTS ENDPOINTS =====
  DESIGN_PROJECTS: {
    // Public endpoints
    ALL_PROJECTS: `${API_BASE_URL}/design/projects`,
    ACADEMIC: `${API_BASE_URL}/design/projects/academic`,
    PROFESSIONAL: `${API_BASE_URL}/design/projects/professional`,
    COMPETITION: `${API_BASE_URL}/design/projects/competition`,
    FEATURED: `${API_BASE_URL}/design/featured`,
    SINGLE_PROJECT: (id) => `${API_BASE_URL}/design/project/${id}`,
    BY_SECTOR: (sector) => `${API_BASE_URL}/design/sector/${sector}`,
    SEARCH: `${API_BASE_URL}/design/search`,
    SECTORS: `${API_BASE_URL}/design/sectors`,
    
    // Admin endpoints
    ADMIN: {
      ALL_PROJECTS: `${API_BASE_URL}/design/admin/projects`,
      ACADEMIC: `${API_BASE_URL}/design/admin/projects/academic`,
      PROFESSIONAL: `${API_BASE_URL}/design/admin/projects/professional`,
      COMPETITION: `${API_BASE_URL}/design/admin/projects/competition`,
      BY_SECTOR: (sector) => `${API_BASE_URL}/design/admin/sector/${sector}`,
      STATS: `${API_BASE_URL}/design/admin/stats`,
      CREATE: `${API_BASE_URL}/design/projects`,
      UPDATE: (id) => `${API_BASE_URL}/design/projects/${id}`,
      DELETE: (id) => `${API_BASE_URL}/design/projects/${id}`,
      TOGGLE_PUBLISH: (id) => `${API_BASE_URL}/design/projects/${id}/toggle`,
      TOGGLE_FEATURED: (id) => `${API_BASE_URL}/design/projects/${id}/toggle-featured`,
    }
  },

  // Get Involved endpoints
  GET_INVOLVED: {
    MEMBERSHIP: `${API_BASE_URL}/get-involved/membership`,
    FEEDBACK: `${API_BASE_URL}/get-involved/feedback`,
    IDEAS: `${API_BASE_URL}/get-involved/ideas`,
  },

  // Education endpoints
  EDUCATION: {
    WORKSHOPS: `${API_BASE_URL}/education/workshops`,
    TUTORIALS: `${API_BASE_URL}/education/tutorials`,
    EXHIBITIONS: `${API_BASE_URL}/education/exhibitions`,
    EVENTS: `${API_BASE_URL}/education/events`,
  },
};

// Test API connection
export const testApiConnection = async () => {
  try {
    const response = await fetch(API_ENDPOINTS.TEST);
    const data = await response.json();
    return { success: true, data };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

// Generic API request function
export const apiRequest = async (endpoint, options = {}) => {
  try {
    const response = await fetch(endpoint, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('API request failed:', error);
    throw error;
  }
};

// Simple fetch helper for pages
export const fetchAPI = async (endpoint) => {
  try {
    const response = await fetch(endpoint);
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};