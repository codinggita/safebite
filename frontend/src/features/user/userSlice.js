import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  profile: null,
  preferences: {},
  addresses: [],
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setProfile: (state, action) => {
      state.profile = action.payload;
    },
    updatePreferences: (state, action) => {
      state.preferences = { ...state.preferences, ...action.payload };
    },
    addAddress: (state, action) => {
      state.addresses.push(action.payload);
    },
    clearUser: () => initialState,
  },
});

export const { setProfile, updatePreferences, addAddress, clearUser } = userSlice.actions;
export default userSlice.reducer;
