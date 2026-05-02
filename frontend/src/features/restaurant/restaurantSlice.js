import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { restaurantService } from '../../services/restaurantService';

export const fetchRestaurants = createAsyncThunk(
  'restaurant/fetchAll',
  async (filters, { rejectWithValue }) => {
    try {
      const response = await restaurantService.getRestaurants(filters);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchRestaurantById = createAsyncThunk(
  'restaurant/fetchById',
  async (id, { rejectWithValue }) => {
    try {
      const response = await restaurantService.getRestaurantById(id);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  list: [],
  selected: null,
  filters: {
    query: '',
    onlySafeMode: false,
  },
  compareList: [],
  loading: false,
  error: null,
};

const restaurantSlice = createSlice({
  name: 'restaurant',
  initialState,
  reducers: {
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    addToCompare: (state, action) => {
      if (state.compareList.length < 3 && !state.compareList.find((r) => r.id === action.payload.id)) {
        state.compareList.push(action.payload);
      }
    },
    removeFromCompare: (state, action) => {
      state.compareList = state.compareList.filter((r) => r.id !== action.payload);
    },
    clearCompare: (state) => {
      state.compareList = [];
    },
    clearSelected: (state) => {
      state.selected = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch All
      .addCase(fetchRestaurants.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRestaurants.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchRestaurants.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch By ID
      .addCase(fetchRestaurantById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRestaurantById.fulfilled, (state, action) => {
        state.loading = false;
        state.selected = action.payload;
      })
      .addCase(fetchRestaurantById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const {
  setFilters,
  addToCompare,
  removeFromCompare,
  clearCompare,
  clearSelected
} = restaurantSlice.actions;

export default restaurantSlice.reducer;

