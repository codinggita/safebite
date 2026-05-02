import api from './api';
import { API_ENDPOINTS } from '../constants/api';

export const userService = {
  getProfile: async () => {
    const response = await api.get(API_ENDPOINTS.USER.PROFILE);
    return response.data;
  },
  
  updateProfile: async (data) => {
    const response = await api.put(API_ENDPOINTS.USER.UPDATE, data);
    return response.data;
  },
  
  uploadAvatar: async (file) => {
    const formData = new FormData();
    formData.append('avatar', file);
    const response = await api.post(API_ENDPOINTS.USER.UPLOAD_AVATAR, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  }
};
