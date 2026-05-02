import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { removeItem, updateQuantity, clearCart } from '../features/cart/cartSlice';
import {
  selectCartItems,
  selectCartSubtotal,
  selectCartTotal,
  selectCartItemCount
} from '../features/cart/cartSelectors';
import { APP_ROUTES } from '../constants/routes';
import { formatCurrency } from '../utils/formatters';
import SEO from '../components/shared/SEO';

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const items = useSelector(selectCartItems);
  const subtotal = useSelector(selectCartSubtotal);
  const total = useSelector(selectCartTotal);
  const itemCount = useSelector(selectCartItemCount);

  if (items.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-32 text-center">
        <SEO title="Cart" description="Review items in your SafeBite cart before checkout." url="https://safebite.app/cart" />
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex flex-col items-center"
        >
          <div className="w-28 h-28 bg-gray-100 dark:bg-surface-dark rounded-full flex items-center justify-center text-6xl mb-8 shadow-inner">
            🛒
          </div>
          <h2 className="text-3xl font-display font-black text-gray-900 dark:text-white mb-4">Your cart is empty</h2>
          <p className="text-gray-500 dark:text-gray-400 mb-8 max-w-sm mx-auto leading-relaxed">
            You haven't added anything yet. Browse our verified safe restaurants to find something delicious.
          </p>
          <Link to={APP_ROUTES.RESTAURANTS}>
            <button className="px-8 py-4 rounded-2xl bg-gradient-to-r from-primary to-emerald-500 text-white font-bold text-lg shadow-lg shadow-primary/25 hover:-translate-y-0.5 transition-all">
              Explore Restaurants →
            </button>
          </Link>
        </motion.div>
      </div>
    );
  }

  const tax = Math.round(subtotal * 0.05);
  const grandTotal = subtotal + tax;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 animate-in fade-in">

      {/* Header */}
      <div className="flex items-center justify-between mb-10">
        <div>
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary dark:text-primary-dark px-3 py-1.5 rounded-full text-xs font-bold mb-3">
            <span className="text-base">🛒</span>
            {itemCount} item{itemCount !== 1 ? 's' : ''} in cart
          </div>
          <h1 className="text-4xl font-display font-black text-gray-900 dark:text-white">Your Cart</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">All items from safety-verified kitchens</p>
        </div>
        <button
          onClick={() => dispatch(clearCart())}
          className="text-sm font-bold text-red-400 hover:text-red-600 bg-red-50 dark:bg-red-900/20 hover:bg-red-100 dark:hover:bg-red-900/30 px-4 py-2 rounded-xl transition-colors border border-red-100 dark:border-red-800"
        >
          Clear All
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

        {/* Items */}
        <div className="lg:col-span-2 space-y-4">
          <AnimatePresence>
            {items.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20, scale: 0.95 }}
                className="group flex items-center gap-5 p-5 bg-white dark:bg-surface-dark rounded-[1.5rem] border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-lg hover:border-primary/20 transition-all duration-300"
              >
                {/* Item icon */}
                <div className="w-16 h-16 rounded-2xl bg-gray-50 dark:bg-gray-800 flex items-center justify-center text-3xl flex-shrink-0 border border-gray-100 dark:border-gray-700 group-hover:scale-105 transition-transform">
                  🍽️
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-gray-900 dark:text-white text-base">{item.name}</h3>
                  <p className="text-sm text-gray-400 mt-0.5 line-clamp-1">{item.description}</p>
                  <div className="mt-2 flex items-center gap-3">
                    <span className="font-black text-primary dark:text-primary-dark">{formatCurrency(item.price)}</span>
                    {item.healthScore && (
                      <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/20 px-2 py-0.5 rounded-full">
                        🌱 Health {item.healthScore}%
                      </span>
                    )}
                  </div>
                </div>

                {/* Qty controls */}
                <div className="flex items-center gap-3 flex-shrink-0">
                  <div className="flex items-center bg-gray-100 dark:bg-gray-800 rounded-xl p-1 border border-gray-200 dark:border-gray-700">
                    <button
                      onClick={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity - 1 }))}
                      className="w-8 h-8 flex items-center justify-center hover:text-primary transition-colors font-bold text-lg text-gray-600 dark:text-gray-300"
                    >
                      −
                    </button>
                    <span className="w-8 text-center font-black text-gray-900 dark:text-white">{item.quantity}</span>
                    <button
                      onClick={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }))}
                      className="w-8 h-8 flex items-center justify-center hover:text-primary transition-colors font-bold text-lg text-gray-600 dark:text-gray-300"
                    >
                      +
                    </button>
                  </div>

                  <span className="font-black text-gray-700 dark:text-gray-200 w-20 text-right">
                    {formatCurrency(item.price * item.quantity)}
                  </span>

                  <button
                    onClick={() => dispatch(removeItem(item.id))}
                    className="p-2 rounded-xl text-gray-300 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                  >
                    🗑️
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Summary Sidebar */}
        <div className="lg:col-span-1">
          <div className="sticky top-28 space-y-4">
            {/* Order Summary Card */}
            <div className="bg-white dark:bg-surface-dark rounded-[1.75rem] border border-gray-100 dark:border-gray-800 shadow-sm p-7">
              <h2 className="text-xl font-display font-black text-gray-900 dark:text-white mb-6">Order Summary</h2>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Subtotal ({itemCount} items)</span>
                  <span className="font-semibold text-gray-900 dark:text-white">{formatCurrency(subtotal)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Delivery Fee</span>
                  <span className="font-bold text-emerald-600 dark:text-emerald-400">FREE 🎉</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Taxes & Charges (5%)</span>
                  <span className="font-semibold text-gray-900 dark:text-white">{formatCurrency(tax)}</span>
                </div>
                <div className="h-px bg-gray-100 dark:bg-gray-800 my-2" />
                <div className="flex justify-between">
                  <span className="font-black text-gray-900 dark:text-white text-lg">Total</span>
                  <span className="font-black text-transparent bg-clip-text bg-gradient-to-r from-primary to-emerald-500 text-xl">
                    {formatCurrency(grandTotal)}
                  </span>
                </div>
              </div>

              <Link to={APP_ROUTES.CHECKOUT}>
                <button className="w-full py-4 rounded-2xl bg-gradient-to-r from-primary to-emerald-500 text-white font-black text-lg shadow-xl shadow-primary/25 hover:shadow-2xl hover:shadow-primary/35 hover:-translate-y-0.5 transition-all">
                  Proceed to Checkout →
                </button>
              </Link>
            </div>

            {/* SafeBite Guarantee Badge */}
            <div className="p-5 bg-emerald-50 dark:bg-emerald-900/20 rounded-2xl border border-emerald-200 dark:border-emerald-800 flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-800 flex items-center justify-center text-xl flex-shrink-0">🛡️</div>
              <div>
                <p className="text-sm font-black text-emerald-800 dark:text-emerald-300 mb-1">SafeBite Guarantee</p>
                <p className="text-xs text-emerald-700 dark:text-emerald-400 leading-relaxed">
                  Every order comes with 100% kitchen hygiene transparency. We track your food from prep to delivery.
                </p>
              </div>
            </div>

            {/* Continue Shopping */}
            <Link to={APP_ROUTES.RESTAURANTS} className="block text-center text-sm font-bold text-gray-400 hover:text-primary dark:hover:text-primary-dark transition-colors py-2">
              ← Continue Shopping
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Cart;
