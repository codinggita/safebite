import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  restaurantId: null,
  subtotal: 0,
  discount: 0,
  total: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action) => {
      const { item, restaurantId } = action.payload;
      
      // If adding item from a different restaurant, clear cart first
      if (state.restaurantId !== null && state.restaurantId !== restaurantId) {
        state.items = [];
      }
      state.restaurantId = restaurantId;

      const existingItem = state.items.find((i) => i.id === item.id);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...item, quantity: 1 });
      }
    },
    removeItem: (state, action) => {
      const id = action.payload;
      state.items = state.items.filter((item) => item.id !== id);
      if (state.items.length === 0) {
        state.restaurantId = null;
      }
    },
    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const item = state.items.find((i) => i.id === id);
      if (item) {
        item.quantity = Math.max(1, quantity);
      }
    },
    clearCart: (state) => {
      state.items = [];
      state.restaurantId = null;
      state.discount = 0;
    },
    applyDiscount: (state, action) => {
      state.discount = action.payload;
    },
  },
});

export const { addItem, removeItem, updateQuantity, clearCart, applyDiscount } = cartSlice.actions;
export default cartSlice.reducer;
