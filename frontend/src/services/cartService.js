import api from './api';
import { API_ENDPOINTS } from '../constants/api';

export const cartService = {
  syncCart: async (cartData) => {
    const response = await api.post(API_ENDPOINTS.CART.SYNC, cartData);
    return response.data;
  },
};
