import { createSelector } from '@reduxjs/toolkit';

const selectRestaurantState = (state) => state.restaurant;

export const selectRestaurants = createSelector(
  [selectRestaurantState],
  (restaurant) => restaurant.list
);

export const selectSelectedRestaurant = createSelector(
  [selectRestaurantState],
  (restaurant) => restaurant.selected
);

export const selectFilters = createSelector(
  [selectRestaurantState],
  (restaurant) => restaurant.filters
);

export const selectCompareList = createSelector(
  [selectRestaurantState],
  (restaurant) => restaurant.compareList
);

// Derived selector: filtered restaurants based on active filters
export const selectFilteredRestaurants = createSelector(
  [selectRestaurants, selectFilters],
  (restaurants, filters) => {
    let filtered = [...restaurants];
    
    // Example: Only Safe Mode
    if (filters.onlySafeMode) {
      filtered = filtered.filter((r) => r.safetyScore >= 80);
    }
    
    // Example: Search Query
    if (filters.query) {
      const q = filters.query.toLowerCase();
      filtered = filtered.filter((r) => r.name.toLowerCase().includes(q) || r.cuisine.toLowerCase().includes(q));
    }
    
    return filtered;
  }
);
