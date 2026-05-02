import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';
import { fetchRestaurantById, clearSelected, addToCompare } from '../features/restaurant/restaurantSlice';
import { addItem } from '../features/cart/cartSlice';
import { APP_ROUTES } from '../constants/routes';
import { SkeletonLoader } from '../components/shared';
import { formatCurrency } from '../utils/formatters';
import SEO from '../components/shared/SEO';

const scoreColor = (s) => s >= 90 ? 'bg-emerald-500' : s >= 80 ? 'bg-yellow-500' : s >= 60 ? 'bg-orange-400' : 'bg-red-500';
const scoreLabel = (s) => s >= 90 ? 'Excellent' : s >= 80 ? 'Good' : s >= 60 ? 'Fair' : 'Poor';

const RestaurantDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { selected: restaurant, loading } = useSelector((state) => state.restaurant);
  const cartItemCount = useSelector(state => state.cart?.items?.reduce((acc, i) => acc + i.quantity, 0) || 0);
  const [activeTab, setActiveTab] = useState('menu');

  useEffect(() => {
    dispatch(fetchRestaurantById(id));
    return () => dispatch(clearSelected());
  }, [dispatch, id]);

  const handleAddToCart = (item) => {
    dispatch(addItem({ item, restaurantId: id }));
    toast.success(`${item.name} added to cart! 🛒`);
  };

  if (loading || !restaurant) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="h-80 bg-gray-100 dark:bg-gray-800 animate-pulse rounded-[2rem] mb-8" />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            <SkeletonLoader variant="card" count={3} />
          </div>
          <div><SkeletonLoader variant="card" count={1} /></div>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: 'menu', label: '🍽️ Menu', count: restaurant.menu?.length || 0 },
    { id: 'safety', label: '🛡️ Safety' },
    { id: 'about', label: 'ℹ️ About' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
    >
      <SEO
        title={restaurant.name}
        description={`Order from ${restaurant.name} — Safety Score ${restaurant.safetyScore}%. ${restaurant.cuisine} restaurant in ${restaurant.location}. Verified by SafeBite.`}
        url={`https://safebite.app/restaurants/${id}`}
      />
      {/* Back Button */}
      <button
        onClick={() => navigate(APP_ROUTES.RESTAURANTS)}
        className="mb-6 inline-flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-primary dark:hover:text-primary-dark transition-colors group"
      >
        <span className="group-hover:-translate-x-1 transition-transform">←</span>
        Back to Restaurants
      </button>

      {/* ── Hero ── */}
      <div className="relative h-72 md:h-96 rounded-[2.5rem] overflow-hidden shadow-2xl mb-10">
        <img
          src={restaurant.image}
          alt={restaurant.name}
          className="w-full h-full object-cover"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

        {/* Content at bottom */}
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">

            {/* Restaurant info */}
            <div className="text-white">
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <div className="flex items-center gap-1.5 bg-yellow-400/20 backdrop-blur-md border border-yellow-400/30 text-yellow-300 px-3 py-1 rounded-full text-xs font-bold">
                  ⭐ {restaurant.rating}
                  <span className="opacity-70">({restaurant.reviews} reviews)</span>
                </div>
                <span className="text-white/60 text-sm">{restaurant.priceRange}</span>
                <span className="text-white/40">·</span>
                <span className="text-white/70 text-sm">{restaurant.deliveryTime}</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-display font-black mb-2 leading-tight">{restaurant.name}</h1>
              <p className="text-gray-300 text-base">{restaurant.cuisine} · {restaurant.location}</p>
            </div>

            {/* Score badges */}
            <div className="flex flex-wrap gap-3">
              {/* Safety Score */}
              <div className="bg-white/15 backdrop-blur-xl border border-white/20 rounded-2xl px-5 py-3 text-white">
                <p className="text-[10px] uppercase tracking-widest opacity-60 font-bold mb-1">Safety Score</p>
                <div className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-full ${scoreColor(restaurant.safetyScore)}`} />
                  <span className="text-2xl font-display font-black">{restaurant.safetyScore}%</span>
                  <span className="text-xs opacity-60">{scoreLabel(restaurant.safetyScore)}</span>
                </div>
              </div>

              {/* Health Rating */}
              <div className="bg-white/15 backdrop-blur-xl border border-white/20 rounded-2xl px-5 py-3 text-white">
                <p className="text-[10px] uppercase tracking-widest opacity-60 font-bold mb-1">Health Rating</p>
                <div className="flex items-center gap-2">
                  <span className="text-lg">🌱</span>
                  <span className="text-2xl font-display font-black">{restaurant.healthRating}</span>
                  <span className="text-xs opacity-60">/ 10</span>
                </div>
              </div>

              {/* Compare button */}
              <button
                onClick={() => {
                  dispatch(addToCompare(restaurant));
                  toast.success(`${restaurant.name} added to compare!`);
                }}
                className="bg-white/15 hover:bg-white/25 backdrop-blur-xl border border-white/25 rounded-2xl px-5 py-3 text-white font-bold transition-all hover:scale-105 flex items-center gap-2"
              >
                <span>⚖️</span>
                <span>Compare</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ── Main Grid ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* Left: Tabs + Content */}
        <div className="lg:col-span-2">

          {/* Tab bar */}
          <div className="flex gap-2 bg-gray-100 dark:bg-surface-dark/50 rounded-2xl p-1.5 mb-8 w-fit">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative px-5 py-2.5 rounded-xl text-sm font-bold transition-all duration-200 ${
                  activeTab === tab.id
                    ? 'text-gray-900 dark:text-white'
                    : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
                }`}
              >
                {activeTab === tab.id && (
                  <motion.div
                    layoutId="tab-bg"
                    className="absolute inset-0 bg-white dark:bg-surface-dark rounded-xl shadow-sm"
                    initial={false}
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative z-10 flex items-center gap-2">
                  {tab.label}
                  {tab.count > 0 && (
                    <span className="bg-primary/10 text-primary dark:text-primary-dark text-xs px-2 py-0.5 rounded-full font-black">{tab.count}</span>
                  )}
                </span>
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">

            {/* Menu Tab */}
            {activeTab === 'menu' && (
              <motion.div
                key="menu"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-4"
              >
                {restaurant.menu?.length > 0 ? restaurant.menu.map((item) => (
                  <motion.div
                    key={item.id}
                    whileHover={{ y: -2 }}
                    className="group flex items-center gap-5 p-5 bg-white dark:bg-surface-dark rounded-[1.5rem] border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-lg hover:border-primary/20 transition-all duration-300"
                  >
                    <div className="w-16 h-16 rounded-2xl bg-gray-50 dark:bg-gray-800 flex items-center justify-center text-3xl flex-shrink-0 border border-gray-100 dark:border-gray-700 group-hover:scale-105 transition-transform">
                      🍽️
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <h3 className="font-bold text-lg text-gray-900 dark:text-white">{item.name}</h3>
                        {item.healthScore >= 80 && (
                          <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/20 px-2.5 py-0.5 rounded-full border border-emerald-200 dark:border-emerald-800">
                            🌱 Health {item.healthScore}%
                          </span>
                        )}
                      </div>
                      <p className="text-gray-400 text-sm mb-2">{item.description}</p>
                      <span className="font-black text-primary dark:text-primary-dark text-lg">{formatCurrency(item.price)}</span>
                    </div>

                    <button
                      onClick={() => handleAddToCart(item)}
                      className="flex-shrink-0 px-5 py-2.5 rounded-xl bg-gradient-to-r from-primary to-emerald-500 text-white font-bold text-sm shadow-md shadow-primary/20 hover:shadow-lg hover:-translate-y-0.5 transition-all"
                    >
                      + Add
                    </button>
                  </motion.div>
                )) : (
                  <div className="text-center py-20 text-gray-400">
                    <div className="text-5xl mb-4">🍽️</div>
                    <p className="font-medium">Menu not available yet.</p>
                  </div>
                )}
              </motion.div>
            )}

            {/* Safety Tab */}
            {activeTab === 'safety' && (
              <motion.div
                key="safety"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-6"
              >
                {/* Score header */}
                <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-primary via-emerald-600 to-teal-700 p-8 text-white">
                  <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/3 blur-2xl" />
                  <div className="relative z-10 flex items-center gap-6">
                    <div className="w-24 h-24 rounded-3xl bg-white/20 backdrop-blur-md border border-white/30 flex flex-col items-center justify-center">
                      <span className="text-4xl font-display font-black">{restaurant.safetyScore}</span>
                      <span className="text-xs opacity-70">/ 100</span>
                    </div>
                    <div>
                      <h3 className="text-2xl font-display font-black mb-1">{scoreLabel(restaurant.safetyScore)} Kitchen</h3>
                      <p className="text-white/75 max-w-xs">This restaurant meets SafeBite's rigorous kitchen hygiene standards.</p>
                    </div>
                  </div>
                </div>

                {/* Safety features */}
                <div className="bg-white dark:bg-surface-dark rounded-[1.75rem] p-7 border border-gray-100 dark:border-gray-800">
                  <h3 className="text-xl font-display font-black text-gray-900 dark:text-white mb-5">Verified Safety Features</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {restaurant.safetyFeatures?.map((f, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.08 }}
                        className="flex items-center gap-3 p-4 bg-emerald-50 dark:bg-emerald-900/20 rounded-2xl border border-emerald-100 dark:border-emerald-800"
                      >
                        <div className="w-8 h-8 rounded-full bg-emerald-100 dark:bg-emerald-800 flex items-center justify-center text-emerald-600 dark:text-emerald-400 font-black text-sm flex-shrink-0">✓</div>
                        <span className="text-sm font-semibold text-emerald-800 dark:text-emerald-200">{f}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {/* About Tab */}
            {activeTab === 'about' && (
              <motion.div
                key="about"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="bg-white dark:bg-surface-dark rounded-[1.75rem] p-8 border border-gray-100 dark:border-gray-800 space-y-6"
              >
                <div>
                  <h3 className="text-2xl font-display font-black text-gray-900 dark:text-white mb-3">About {restaurant.name}</h3>
                  <p className="text-gray-500 dark:text-gray-400 leading-relaxed text-lg">{restaurant.description}</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { label: '⏱ Delivery Time', value: restaurant.deliveryTime },
                    { label: '💰 Price Range', value: restaurant.priceRange },
                    { label: '📍 Location', value: restaurant.location },
                    { label: '🕐 Open Hours', value: '9 AM – 11 PM' },
                    { label: '📞 Contact', value: '+91 98765 43210' },
                  ].map((info, i) => (
                    <div key={i} className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-2xl">
                      <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-1">{info.label}</p>
                      <p className="font-bold text-gray-900 dark:text-white">{info.value}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

          </AnimatePresence>
        </div>

        {/* Right: Sidebar */}
        <div className="lg:col-span-1">
          <div className="sticky top-28 space-y-5">

            {/* Delivery card */}
            <div className="bg-white dark:bg-surface-dark rounded-[1.75rem] p-6 border border-gray-100 dark:border-gray-800 shadow-sm">
              <h4 className="font-display font-black text-gray-900 dark:text-white text-lg mb-5">Delivery Info</h4>
              <div className="space-y-4 mb-6">
                <div className="flex justify-between items-center py-3 border-b border-gray-100 dark:border-gray-800">
                  <span className="text-gray-500 text-sm flex items-center gap-2"><span>⏱</span> Delivery Time</span>
                  <span className="font-bold text-gray-900 dark:text-white">{restaurant.deliveryTime}</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-gray-100 dark:border-gray-800">
                  <span className="text-gray-500 text-sm flex items-center gap-2"><span>🚚</span> Delivery Fee</span>
                  <span className="font-bold text-emerald-600 dark:text-emerald-400">FREE</span>
                </div>
                <div className="flex justify-between items-center py-3">
                  <span className="text-gray-500 text-sm flex items-center gap-2"><span>💳</span> Min. Order</span>
                  <span className="font-bold text-gray-900 dark:text-white">₹199</span>
                </div>
              </div>

              <button
                onClick={() => navigate(APP_ROUTES.CART)}
                className="relative w-full py-4 rounded-2xl bg-gradient-to-r from-primary to-emerald-500 text-white font-black text-base shadow-lg shadow-primary/25 hover:shadow-xl hover:-translate-y-0.5 transition-all group overflow-hidden"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  🛒 View Cart
                  {cartItemCount > 0 && (
                    <span className="bg-white/30 backdrop-blur-md rounded-full w-6 h-6 flex items-center justify-center text-xs font-black">{cartItemCount}</span>
                  )}
                </span>
                <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
            </div>

            {/* SafeBite Guarantee */}
            <div className="p-5 bg-emerald-50 dark:bg-emerald-900/20 rounded-2xl border border-emerald-200 dark:border-emerald-800 flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-800 flex items-center justify-center text-xl flex-shrink-0">🛡️</div>
              <div>
                <p className="text-sm font-black text-emerald-800 dark:text-emerald-300 mb-1">SafeBite Certified</p>
                <p className="text-xs text-emerald-700 dark:text-emerald-400 leading-relaxed">
                  This kitchen is manually audited and maintains a consistent 80+ safety score.
                </p>
              </div>
            </div>

          </div>
        </div>

      </div>
    </motion.div>
  );
};

export default RestaurantDetail;
