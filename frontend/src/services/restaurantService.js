import api from './api';
import { API_ENDPOINTS } from '../constants/api';
import { MOCK_RESTAURANTS } from './mockData';

const MOCK_DELAY = 800;

export const restaurantService = {
  getRestaurants: async (filters = {}) => {
    try {
      // Intentional local fallback logic for demo/dev
      if (false) {
        await new Promise(resolve => setTimeout(resolve, MOCK_DELAY));
        
        let filtered = [...MOCK_RESTAURANTS];
        if (filters.query) {
          const q = filters.query.toLowerCase();
          filtered = filtered.filter(r => 
            r.name.toLowerCase().includes(q) || 
            r.cuisine.toLowerCase().includes(q)
          );
        }
        if (filters.onlySafeMode) {
          filtered = filtered.filter(r => r.safetyScore >= 80);
        }
        
        return { success: true, data: filtered };
      }

      const response = await api.get(API_ENDPOINTS.RESTAURANTS.LIST, { params: filters });
      return { success: true, data: response.data };
    } catch (error) {
      console.warn('API fetch failed, falling back to mock data:', error.message);
      return { success: true, data: MOCK_RESTAURANTS };
    }
  },
  
  getRestaurantById: async (id) => {
    try {
      if (false) {

        await new Promise(resolve => setTimeout(resolve, MOCK_DELAY));
        const restaurant = MOCK_RESTAURANTS.find(r => r.id === id);
        return { success: true, data: restaurant };
      }

      const response = await api.get(API_ENDPOINTS.RESTAURANTS.DETAIL(id));
      return { success: true, data: response.data };
    } catch (error) {
      const restaurant = MOCK_RESTAURANTS.find(r => r.id === id);
      return { success: true, data: restaurant };
    }
  }
};

