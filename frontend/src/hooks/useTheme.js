import { useContext } from 'react';
import { useSelector } from 'react-redux';
import { selectTheme } from '../features/ui/uiSelectors';
import { ThemeContext } from '../context/ThemeContext';

/**
 * Custom hook for accessing and toggling the current theme
 */
export const useTheme = () => {
  const theme = useSelector(selectTheme);
  const { toggleThemeContext } = useContext(ThemeContext);

  return {
    theme,
    isDark: theme === 'dark',
    toggleTheme: toggleThemeContext,
  };
};
