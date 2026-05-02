import { combineReducers } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import userReducer from '../features/user/userSlice';
import uiReducer from '../features/ui/uiSlice';
import restaurantReducer from '../features/restaurant/restaurantSlice';
import cartReducer from '../features/cart/cartSlice';

const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  ui: uiReducer,
  restaurant: restaurantReducer,
  cart: cartReducer,
});

export default rootReducer;
