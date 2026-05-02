import { createSelector } from '@reduxjs/toolkit';

const selectAuthState = (state) => state.auth;

export const selectUser = createSelector(
  [selectAuthState],
  (auth) => auth.user
);

export const selectIsAuthenticated = createSelector(
  [selectAuthState],
  (auth) => auth.isAuthenticated
);

export const selectAuthToken = createSelector(
  [selectAuthState],
  (auth) => auth.token
);

export const selectAuthLoading = createSelector(
  [selectAuthState],
  (auth) => auth.loading
);
