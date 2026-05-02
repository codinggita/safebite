import { createSelector } from '@reduxjs/toolkit';

const selectUserState = (state) => state.user;

export const selectProfile = createSelector([selectUserState], (user) => user.profile);
export const selectPreferences = createSelector([selectUserState], (user) => user.preferences);
export const selectAddresses = createSelector([selectUserState], (user) => user.addresses);
