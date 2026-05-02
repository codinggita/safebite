import api from './api';
import { API_ENDPOINTS } from '../constants/api';

export const authService = {
  login: async (credentials) => {
    const response = await api.post(API_ENDPOINTS.AUTH.LOGIN, credentials);
    return response.data;
  },
  
  register: async (data) => {
    const response = await api.post(API_ENDPOINTS.AUTH.REGISTER, data);
    return response.data;
  },
  
  refreshToken: async () => {
    const response = await api.post(API_ENDPOINTS.AUTH.REFRESH);
    return response.data;
  }
};
