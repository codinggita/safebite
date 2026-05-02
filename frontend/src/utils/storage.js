import { STORAGE_KEYS } from '../constants/routes';

/**
 * LocalStorage wrapper with error handling mechanism
 */
export const storage = {
  get: (key) => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch {
      return null;
    }
  },
  set: (key, value) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // Ignore quota exceeded
    }
  },
  remove: (key) => {
    try {
      localStorage.removeItem(key);
    } catch { }
  },
  clear: () => {
    // Only clear safebite specific keys (except theme, which survives)
    storage.remove(STORAGE_KEYS.TOKEN);
    storage.remove(STORAGE_KEYS.PREFERENCES);
  }
};

/**
 * SessionStorage wrapper (cleared when browser closes)
 */
export const session = {
  get: (key) => {
    try {
      const item = sessionStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch {
      return null;
    }
  },
  set: (key, value) => {
    try {
      sessionStorage.setItem(key, JSON.stringify(value));
    } catch {}
  },
  remove: (key) => {
    try {
      sessionStorage.removeItem(key);
    } catch {}
  },
  clear: () => {
    session.remove(STORAGE_KEYS.CHECKOUT_STEP);
    session.remove(STORAGE_KEYS.CHECKOUT_DATA);
    session.remove(STORAGE_KEYS.ACTIVE_FILTERS);
  }
};
