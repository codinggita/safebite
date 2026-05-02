import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectIsAuthenticated } from '../features/auth/authSelectors';
import { APP_ROUTES } from '../constants/routes';

const PrivateRoute = () => {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const location = useLocation();

  if (!isAuthenticated) {
    // Redirect unauthenticated users to login, pass intended location
    return <Navigate to={APP_ROUTES.LOGIN} state={{ from: location }} replace />;
  }

  return <Outlet />;
};

export default PrivateRoute;
