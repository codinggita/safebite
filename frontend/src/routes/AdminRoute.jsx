import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectUser } from '../features/auth/authSelectors';
import { APP_ROUTES } from '../constants/routes';

const AdminRoute = () => {
  const user = useSelector(selectUser);

  if (!user || user.role !== 'admin') {
    return <Navigate to={APP_ROUTES.DASHBOARD} replace />;
  }

  return <Outlet />;
};

export default AdminRoute;
