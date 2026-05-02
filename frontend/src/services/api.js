import axios from 'axios';
import axiosRetry from 'axios-retry';
import toast from 'react-hot-toast';
import { store } from '../store';
import { logout } from '../features/auth/authSlice';

// Create central Axios instance
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Implement exponential backoff retry for network errors
axiosRetry(api, {
  retries: 3,
  retryDelay: axiosRetry.exponentialDelay,
  retryCondition: (error) => {
    // Retry on network errors or 5xx status codes
    return axiosRetry.isNetworkOrIdempotentRequestError(error) || error.response?.status >= 500;
  },
});

// Request Interceptor: Attach Token
api.interceptors.request.use(
  (config) => {
    const token = store.getState().auth.token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor: Global Error Handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const { response } = error;
    
    // Check network connection
    if (!response) {
      toast.error('Network error. Please check your connection.');
      return Promise.reject(error);
    }

    const { status, data } = response;
    const errorMsg = data?.message || 'Something went wrong';

    switch (status) {
      case 401:
        // Unauthorized - trigger logout
        store.dispatch(logout());
        toast.error('Session expired. Please log in again.');
        break;
      case 403:
        toast.error('Access denied.');
        break;
      case 429:
        toast.error('Too many requests. Please slow down.');
        break;
      case 500:
      case 502:
      case 503:
        toast.error('Server error. We are working on it!');
        break;
      default:
        // Expose other errors to be handled by local components (e.g., 400 Bad Request)
        break;
    }

    return Promise.reject(error);
  }
);

export default api;
