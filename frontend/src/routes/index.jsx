import React, { Suspense } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { APP_ROUTES } from '../constants/routes';

import PrivateRoute from './PrivateRoute';
import ErrorBoundary from '../components/shared/ErrorBoundary';


// Layouts
const PublicLayout = React.lazy(() => import('../layouts/PublicLayout'));
const AuthLayout = React.lazy(() => import('../layouts/AuthLayout'));
const DashboardLayout = React.lazy(() => import('../layouts/DashboardLayout'));

// Pages
const Landing = React.lazy(() => import('../pages/Landing'));
const Login = React.lazy(() => import('../pages/Login'));
const Signup = React.lazy(() => import('../pages/Signup'));
const Dashboard = React.lazy(() => import('../pages/Dashboard'));
const Restaurants = React.lazy(() => import('../pages/Restaurants'));
const RestaurantDetail = React.lazy(() => import('../pages/RestaurantDetail'));
const Compare = React.lazy(() => import('../pages/Compare'));
const Cart = React.lazy(() => import('../pages/Cart'));
const Checkout = React.lazy(() => import('../pages/Checkout'));
const Orders = React.lazy(() => import('../pages/Orders'));
const OrderTracking = React.lazy(() => import('../pages/OrderTracking'));
const OrderSuccess = React.lazy(() => import('../pages/OrderSuccess'));
const Profile = React.lazy(() => import('../pages/Profile'));
const NotFound = React.lazy(() => import('../pages/NotFound'));


// Fallback loader
const Loader = () => <div className="h-screen w-full flex items-center justify-center">Loading...</div>;

const AppRouter = () => {
  const location = useLocation();

  return (
    <ErrorBoundary>
      <Suspense fallback={<Loader />}>
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            {/* Public Layout - Open to all */}
            <Route element={<PublicLayout />}>
              <Route path={APP_ROUTES.HOME} element={<Landing />} />
              <Route path={APP_ROUTES.RESTAURANTS} element={<Restaurants />} />
              <Route path={APP_ROUTES.RESTAURANT_DETAIL(':id')} element={<RestaurantDetail />} />
              <Route path={APP_ROUTES.COMPARE} element={<Compare />} />
              
              {/* Private Routes in Public Layout */}
              <Route element={<PrivateRoute />}>
                <Route path={APP_ROUTES.CART} element={<Cart />} />
                <Route path={APP_ROUTES.CHECKOUT} element={<Checkout />} />
                <Route path={APP_ROUTES.ORDER_SUCCESS} element={<OrderSuccess />} />
                <Route path={APP_ROUTES.ORDER_TRACKING(':id')} element={<OrderTracking />} />
              </Route>
            </Route>

            {/* Auth Layout - For unauthenticated users */}
            <Route element={<AuthLayout />}>
              <Route path={APP_ROUTES.LOGIN} element={<Login />} />
              <Route path={APP_ROUTES.SIGNUP} element={<Signup />} />
            </Route>

            {/* Dashboard Layout - strictly Private */}
            <Route element={<PrivateRoute />}>
              <Route element={<DashboardLayout />}>
                <Route path={APP_ROUTES.DASHBOARD} element={<Dashboard />} />
                <Route path={APP_ROUTES.PROFILE} element={<Profile />} />
                <Route path={APP_ROUTES.ORDERS} element={<Orders />} />
              </Route>
            </Route>

            {/* 404 Catch All */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AnimatePresence>
      </Suspense>
    </ErrorBoundary>
  );
};


export default AppRouter;
