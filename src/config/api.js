// src/config/api.js
const API_BASE_URL = 'http://localhost:4000/api';

export const API_ENDPOINTS = {
  // Test endpoints
  ROOT: `${API_BASE_URL}`,
  TEST: `${API_BASE_URL}/test`,
  HEALTH: `${API_BASE_URL}/health`,
  
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