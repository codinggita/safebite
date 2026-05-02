import { createSelector } from '@reduxjs/toolkit';

const selectUiState = (state) => state.ui;

export const selectTheme = createSelector([selectUiState], (ui) => ui.theme);
export const selectIsLoading = createSelector([selectUiState], (ui) => ui.isLoading);
export const selectSidebarOpen = createSelector([selectUiState], (ui) => ui.sidebarOpen);
export const selectAlerts = createSelector([selectUiState], (ui) => ui.alerts);
