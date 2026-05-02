import { createSelector } from '@reduxjs/toolkit';

const selectCart = (state) => state.cart;

export const selectCartItems = createSelector(
  [selectCart],
  (cart) => cart.items
);

export const selectCartItemCount = createSelector(
  [selectCartItems],
  (items) => items.reduce((count, item) => count + item.quantity, 0)
);

export const selectCartSubtotal = createSelector(
  [selectCartItems],
  (items) => items.reduce((sum, item) => sum + (item.price * item.quantity), 0)
);

export const selectCartTotal = createSelector(
  [selectCartSubtotal, (state) => state.cart.discount],
  (subtotal, discount) => Math.max(0, subtotal - discount)
);

export const selectCartRestaurantId = createSelector(
  [selectCart],
  (cart) => cart.restaurantId
);

