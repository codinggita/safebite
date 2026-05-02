export const APP_ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  SIGNUP: '/signup',
  DASHBOARD: '/dashboard',
  RESTAURANTS: '/restaurants',
  RESTAURANT_DETAIL: (id) => `/restaurants/${id}`,
  COMPARE: '/compare',
  CART: '/cart',
  CHECKOUT: '/checkout',
  ORDERS: '/orders',
  ORDER_SUCCESS: '/order-success',
  ORDER_TRACKING: (id) => `/orders/${id}/track`,
  PROFILE: '/profile',
};

export const STORAGE_KEYS = {
  THEME: 'safebite_theme',
  TOKEN: 'safebite_token',
  PREFERENCES: 'safebite_preferences',
  CHECKOUT_STEP: 'safebite_checkout_step',
  CHECKOUT_DATA: 'safebite_checkout_data',
  ACTIVE_FILTERS: 'safebite_active_filters',
};
