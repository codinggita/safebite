import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { setFilters, fetchRestaurants, addToCompare } from '../features/restaurant/restaurantSlice';
import { selectFilteredRestaurants } from '../features/restaurant/restaurantSelectors';
import { APP_ROUTES } from '../constants/routes';
import { Badge } from '../components/ui';
import { SkeletonLoader, EmptyState } from '../components/shared';
import SEO from '../components/shared/SEO';

const scoreColor = (s) => s >= 90 ? 'bg-emerald-500' : s >= 80 ? 'bg-yellow-500' : s >= 60 ? 'bg-orange-400' : 'bg-red-500';
const scoreLabel = (s) => s >= 90 ? 'Excellent' : s >= 80 ? 'Good' : s >= 60 ? 'Fair' : 'Poor';
const scoreRing = (s) => s >= 90 ? 'ring-emerald-400' : s >= 80 ? 'ring-yellow-400' : s >= 60 ? 'ring-orange-400' : 'ring-red-400';

const Restaurants = () => {
  const dispatch = useDispatch();
  const filteredRestaurants = useSelector(selectFilteredRestaurants);
  const { loading, filters } = useSelector(state => state.restaurant);

  const [searchTerm, setSearchTerm] = useState(filters.query || '');
  const [safeMode, setSafeMode] = useState(filters.onlySafeMode || false);

  useEffect(() => {
    dispatch(fetchRestaurants({ query: searchTerm, onlySafeMode: safeMode }));
  }, [dispatch, searchTerm, safeMode]);

  useEffect(() => {
    dispatch(setFilters({ query: searchTerm, onlySafeMode: safeMode }));
  }, [searchTerm, safeMode, dispatch]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-in fade-in">
      <SEO
        title="Restaurants"
        description="Browse 1,200+ safety-verified restaurants near you. Filter by hygiene score, cuisine, and delivery time on SafeBite."
        url="https://safebite.app/restaurants"
      />

      {/* ── Page Header ── */}
      <div className="mb-10">
        <div className="inline-flex items-center gap-2 bg-primary/10 text-primary dark:text-primary-dark px-3 py-1.5 rounded-full text-xs font-bold mb-4">
          <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
          {filteredRestaurants.length} Restaurants Available
        </div>
        <h1 className="text-4xl font-display font-black text-gray-900 dark:text-white mb-2">
          Find <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-emerald-400">Safe</span> Restaurants
        </h1>
        <p className="text-gray-500 dark:text-gray-400 text-lg">Every listing is safety-verified. Hover a card to compare.</p>
      </div>

      {/* ── Filter Bar ── */}
      <div className="flex flex-col md:flex-row gap-4 mb-10">
        {/* Search */}
        <div className="relative flex-1">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg">🔍</div>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by name or cuisine..."
            className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white dark:bg-surface-dark border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all shadow-sm text-base font-medium"
          />
        </div>

        {/* Safe Mode Toggle */}
        <button
          onClick={() => setSafeMode(!safeMode)}
          className={`flex items-center gap-4 px-6 py-4 rounded-2xl border-2 font-bold transition-all duration-300 shadow-sm ${
            safeMode
              ? 'bg-emerald-50 dark:bg-emerald-900/20 border-emerald-400 text-emerald-700 dark:text-emerald-400 shadow-emerald-100 dark:shadow-none'
              : 'bg-white dark:bg-surface-dark border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:border-primary'
          }`}
        >
          <div className="text-left">
            <div className="text-sm font-black">{safeMode ? '🛡️ Safe Mode ON' : '🛡️ Safe Mode'}</div>
            <div className="text-xs font-medium opacity-70">Score 80+ only</div>
          </div>
          <div className={`relative w-12 h-6 rounded-full transition-colors ${safeMode ? 'bg-emerald-500' : 'bg-gray-300 dark:bg-gray-600'}`}>
            <span className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform duration-300 ${safeMode ? 'translate-x-6' : ''}`} />
          </div>
        </button>
      </div>

      {/* ── Grid ── */}
      <div className="min-h-[400px]">
        {loading ? (
          <SkeletonLoader variant="card" count={8} />
        ) : filteredRestaurants.length > 0 ? (
          <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            <AnimatePresence>
              {filteredRestaurants.map((r) => (
                <motion.div
                  key={r.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.25 }}
                  className="group"
                >
                  <Link to={APP_ROUTES.RESTAURANT_DETAIL(r.id)} className="block h-full outline-none focus:ring-2 focus:ring-primary rounded-[1.75rem]">
                    <div className="h-full flex flex-col bg-white dark:bg-surface-dark rounded-[1.75rem] shadow-sm hover:shadow-2xl border border-gray-100 dark:border-gray-800 overflow-hidden transition-all duration-400 hover:-translate-y-2">

                      {/* Image area */}
                      <div className="relative h-48 overflow-hidden">
                        <img
                          src={r.image}
                          alt={r.name}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        {/* Dark overlay on hover */}
                        <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors" />

                        {/* Safety score badge top-right */}
                        <div className={`absolute top-3 right-3 ${scoreColor(r.safetyScore)} text-white rounded-2xl px-3 py-1.5 flex items-center gap-1.5 shadow-lg`}>
                          <span className="text-xs font-black">{r.safetyScore}</span>
                          <span className="text-[10px] opacity-80">{scoreLabel(r.safetyScore)}</span>
                        </div>

                        {/* Compare button — appears on hover */}
                        <div className="absolute top-3 left-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                          <button
                            onClick={(e) => {
                              e.preventDefault();
                              dispatch(addToCompare(r));
                            }}
                            className="bg-white/90 dark:bg-black/70 backdrop-blur-md rounded-xl px-3 py-1.5 text-xs font-bold text-gray-800 dark:text-white hover:text-primary transition-colors shadow-lg border border-white/20"
                          >
                            ⚖️ Compare
                          </button>
                        </div>

                        {/* Cuisine pill at bottom of image */}
                        <div className="absolute bottom-3 left-3 bg-white/90 dark:bg-black/60 backdrop-blur-md rounded-full px-3 py-1 text-xs font-semibold text-gray-700 dark:text-gray-200">
                          {r.cuisine.split(',')[0]}
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-5 flex-1 flex flex-col">
                        <div className="flex items-start justify-between mb-2">
                          <h3 className="font-bold text-lg text-gray-900 dark:text-white leading-tight line-clamp-1">{r.name}</h3>
                          <div className="flex items-center gap-1 ml-2 flex-shrink-0">
                            <span className="text-yellow-400 text-sm">★</span>
                            <span className="text-sm font-bold text-gray-700 dark:text-gray-300">{r.rating}</span>
                          </div>
                        </div>

                        {/* Score bar */}
                        <div className="mb-4">
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Safety</span>
                            <span className="text-xs font-bold text-gray-600 dark:text-gray-300">{r.safetyScore}%</span>
                          </div>
                          <div className="h-1.5 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${r.safetyScore}%` }}
                              transition={{ duration: 1, delay: 0.2 }}
                              className={`h-full ${scoreColor(r.safetyScore)} rounded-full`}
                            />
                          </div>
                        </div>

                        <div className="mt-auto flex items-center justify-between pt-3 border-t border-gray-100 dark:border-gray-800">
                          <div className="flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400">
                            <span>⏱</span>
                            <span className="font-medium">{r.deliveryTime}</span>
                          </div>
                          <div className="flex items-center gap-1.5 text-sm font-semibold text-emerald-600 dark:text-emerald-400">
                            <span>🌱</span>
                            <span>{r.healthRating}/10</span>
                          </div>
                          <span className="text-sm font-bold text-gray-500 dark:text-gray-400">{r.priceRange}</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        ) : (
          <EmptyState
            title="No restaurants found"
            description={safeMode ? "No restaurants meet the 80+ safety score requirement." : "We couldn't find any matching restaurants."}
          />
        )}
      </div>
    </div>
  );
};

export default Restaurants;
