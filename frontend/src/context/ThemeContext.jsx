import React, { createContext, useMemo, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createTheme, ThemeProvider as MUIThemeProvider } from '@mui/material/styles';
import { selectTheme } from '../features/ui/uiSelectors';
import { setTheme } from '../features/ui/uiSlice';

export const ThemeContext = createContext({
  toggleThemeContext: () => {},
});

export const ThemeContextProvider = ({ children }) => {
  const dispatch = useDispatch();
  const themeMode = useSelector(selectTheme);

  // Initialize theme from localStorage or system preference
  useEffect(() => {
    const savedTheme = localStorage.getItem('safebite_theme');
    if (savedTheme) {
      dispatch(setTheme(savedTheme));
    } else {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      dispatch(setTheme(prefersDark ? 'dark' : 'light'));
    }
  }, [dispatch]);

  // Sync with Tailwind dark class and localStorage
  useEffect(() => {
    const root = document.documentElement;
    if (themeMode === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('safebite_theme', themeMode);
  }, [themeMode]);

  // Define MUI Theme syncing with our Tailwind config
  const muiTheme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: themeMode,
          primary: {
            main: themeMode === 'light' ? '#0F766E' : '#14B8A6',
          },
          secondary: {
            main: themeMode === 'light' ? '#F97316' : '#FB923C',
          },
          background: {
            default: themeMode === 'light' ? '#ffffff' : '#0D0F0E',
            paper: themeMode === 'light' ? '#f9f9f9' : '#1A1F1D',
          },
          text: {
            primary: themeMode === 'light' ? '#111827' : '#F9FAFB',
            secondary: themeMode === 'light' ? '#4B5563' : '#9CA3AF',
          },
        },
        typography: {
          fontFamily: '"Inter", "sans-serif"',
          h1: { fontFamily: '"Outfit", "sans-serif"' },
          h2: { fontFamily: '"Outfit", "sans-serif"' },
          h3: { fontFamily: '"Outfit", "sans-serif"' },
          h4: { fontFamily: '"Outfit", "sans-serif"' },
          h5: { fontFamily: '"Outfit", "sans-serif"' },
          h6: { fontFamily: '"Outfit", "sans-serif"' },
          button: { textTransform: 'none', fontWeight: 500 },
        },
        shape: { borderRadius: 8 },
        components: {
          MuiButton: {
            styleOverrides: { root: { boxShadow: 'none', '&:hover': { boxShadow: 'none' } } },
          },
        },
      }),
    [themeMode]
  );

  const toggleThemeContext = () => {
    dispatch(setTheme(themeMode === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider value={{ toggleThemeContext }}>
      <MUIThemeProvider theme={muiTheme}>{children}</MUIThemeProvider>
    </ThemeContext.Provider>
  );
};
