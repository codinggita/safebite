export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    REFRESH: '/auth/refresh',
  },
  USER: {
    PROFILE: '/users/profile',
    UPDATE: '/users/profile',
    UPLOAD_AVATAR: '/users/avatar',
  },
  RESTAURANTS: {
    LIST: '/restaurants',
    DETAIL: (id) => `/restaurants/${id}`,
  },
  ORDERS: {
    PLACE: '/orders',
    LIST: '/orders',
    DETAIL: (id) => `/orders/${id}`,
    TRACK: (id) => `/orders/${id}/track`,
  },
  CART: {
    SYNC: '/cart/sync',
  }
};
