// src/hooks/useApi.js
import { useState, useEffect } from 'react';
import { API_ENDPOINTS, fetchAPI } from '../config/app';

export const useApi = (endpoint, mockData = null) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const result = await fetchAPI(endpoint);
        setData(result);
      } catch (err) {
        console.error('API Error:', err);
        setError(err.message);
        
        // Use mock data if provided
        if (mockData) {
          setData(mockData);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [endpoint]);

  return { data, loading, error };
};

// Pre-configured hooks for your pages
export const useHomeData = () => {
  const mockData = {
    success: true,
    data: {
      featuredDesigns: [
        {
          id: 1,
          title: "Urban Green Park",
          type: "Public Space", 
          image: "/images/park.jpg",
          description: "Sustainable urban park design integrating native vegetation and community spaces",
        },
        {
          id: 2,
          title: "Modern Campus Library",
          type: "Educational",
          image: "/images/library.jpg", 
          description: "Innovative learning environment with sustainable features and flexible spaces",
        },
        {
          id: 3,
          title: "Luxury Residential Villa",
          type: "Residential",
          image: "/images/villa.jpg",
          description: "Contemporary villa blending modern architecture with natural landscapes",
        },
      ],
      researchHighlights: [
        {
          id: 1,
          title: "Biophilic Design in Urban Environments",
          author: "Dr. Elena Rodriguez", 
          date: "May 2023",
          excerpt: "Exploring how natural elements in urban design improve wellbeing and environmental performance.",
        },
        {
          id: 2,
          title: "Sustainable Materials in Modern Architecture",
          author: "Michael Chen",
          date: "April 2023",
          excerpt: "Analysis of innovative sustainable materials and their application in contemporary building design.",
        },
      ],
      upcomingEvents: [
        {
          id: 1,
          title: "Architecture Exhibition Opening",
          date: "2023-06-15",
          time: "6:00 PM", 
          location: "City Art Gallery",
          image: "/images/exhibition.jpg",
        },
        {
          id: 2,
          title: "Sustainable Design Workshop",
          date: "2023-06-22",
          time: "2:00 PM",
          location: "Community Center",
          image: "/images/workshop.jpg",
        },
      ]
    },
    message: "Live data from backend"
  };

  return useApi(API_ENDPOINTS.HOME, mockData);
};

export const useDesigns = () => {
  return useApi(API_ENDPOINTS.DESIGN_PROJECTS.ALL_PROJECTS);
};

export const useResearch = () => {
  return useApi(API_ENDPOINTS.RESEARCH); // Add RESEARCH to your config if needed
};

export const useEvents = () => {
  return useApi(API_ENDPOINTS.EVENTS); // Add EVENTS to your config if needed
};