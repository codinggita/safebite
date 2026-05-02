import api from './api';
import { API_ENDPOINTS } from '../constants/api';

export const orderService = {
  placeOrder: async (data) => {
    const response = await api.post(API_ENDPOINTS.ORDERS.PLACE, data);
    return response.data;
  },
  
  getOrders: async () => {
    const response = await api.get(API_ENDPOINTS.ORDERS.LIST);
    return response.data;
  },
  
  getOrderById: async (id) => {
    const response = await api.get(API_ENDPOINTS.ORDERS.DETAIL(id));
    return response.data;
  },
  
  trackOrder: async (id) => {
    const response = await api.get(API_ENDPOINTS.ORDERS.TRACK(id));
    return response.data;
  }
};
