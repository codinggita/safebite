import { useSelector, useDispatch } from 'react-redux';
import { 
  selectUser, 
  selectIsAuthenticated, 
  selectAuthLoading 
} from '../features/auth/authSelectors';
import { loginStart, loginSuccess, loginFailure, logout } from '../features/auth/authSlice';
import { authService } from '../services/authService';
import { storage, session } from '../utils/storage';
import { clearUser } from '../features/user/userSlice';
import toast from 'react-hot-toast';

/**
 * Custom hook to handle authentication tasks and state
 */
export const useAuth = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const loading = useSelector(selectAuthLoading);

  const handleLogin = async (credentials, rememberMe = true) => {
    try {
      dispatch(loginStart());
      const data = await authService.login(credentials);
      dispatch(loginSuccess(data));
      
      // we only use localStorage if rememberMe is checked, otherwise sessionStorage
      // (Redux Persist is set up for authSlice, so that handles Redux side)
      if (rememberMe) {
        storage.set('safebite_token', data.token);
      } else {
        session.set('safebite_token', data.token);
      }

      toast.success('Logged in successfully');
      return { success: true };
    } catch (error) {
      dispatch(loginFailure(error.message));
      return { success: false, error: error.message };
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    dispatch(clearUser());
    storage.remove('safebite_token');
    storage.remove('safebite_preferences');
    session.remove('safebite_checkout_step');
    session.remove('safebite_checkout_data');
    session.remove('safebite_active_filters');
    // Note: safebite_theme explicitly not cleared
  };

  return {
    user,
    isAuthenticated,
    loading,
    login: handleLogin,
    logout: handleLogout,
  };
};
