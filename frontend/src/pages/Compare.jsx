import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { removeFromCompare, clearCompare } from '../features/restaurant/restaurantSlice';
import { selectCompareList } from '../features/restaurant/restaurantSelectors';
import { APP_ROUTES } from '../constants/routes';
import SEO from '../components/shared/SEO';

const scoreColor = (s) => s >= 90 ? 'from-emerald-500 to-green-400' : s >= 80 ? 'from-yellow-500 to-amber-400' : 'from-orange-500 to-red-400';
const scoreLabel = (s) => s >= 90 ? 'Excellent' : s >= 80 ? 'Good' : s >= 60 ? 'Fair' : 'Poor';
const scoreBg = (s) => s >= 90 ? 'bg-emerald-500' : s >= 80 ? 'bg-yellow-500' : 'bg-orange-500';

const MetricRow = ({ label, values }) => (
  <div className="grid gap-4" style={{ gridTemplateColumns: `160px repeat(${values.length}, 1fr)` }}>
    <div className="py-4 text-sm font-bold text-gray-500 dark:text-gray-400 flex items-center">{label}</div>
    {values.map((v, i) => (
      <div key={i} className="py-4 flex items-center justify-center text-sm font-bold text-gray-900 dark:text-white">
        {v}
      </div>
    ))}
  </div>
);

const Compare = () => {
  const dispatch = useDispatch();
  const compareList = useSelector(selectCompareList);

  if (compareList.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-28 text-center">
        <SEO
          title="Compare Restaurants"
          description="Compare food safety scores, health ratings, and delivery info side by side on SafeBite."
          url="https://safebite.app/compare"
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex flex-col items-center"
        >
          <div className="w-28 h-28 bg-gray-100 dark:bg-surface-dark rounded-full flex items-center justify-center text-6xl mb-8 shadow-inner">⚖️</div>
          <h1 className="text-3xl font-display font-black text-gray-900 dark:text-white mb-4">Compare Restaurants</h1>
          <p className="text-gray-500 dark:text-gray-400 mb-8 max-w-md leading-relaxed">
            Add up to 3 restaurants to compare their safety scores, health ratings, and more — side by side.
          </p>
          <Link to={APP_ROUTES.RESTAURANTS}>
            <button className="px-8 py-4 rounded-2xl bg-gradient-to-r from-primary to-emerald-500 text-white font-bold text-lg shadow-lg shadow-primary/25 hover:-translate-y-0.5 transition-all">
              Browse Restaurants →
            </button>
          </Link>
          <p className="text-xs text-gray-400 mt-6">Hover over a restaurant card and click "⚖️ Compare" to add it here</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 animate-in fade-in">

      {/* Header */}
      <div className="flex items-center justify-between mb-10">
        <div>
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary dark:text-primary-dark px-3 py-1.5 rounded-full text-xs font-bold mb-3">
            <span>⚖️</span>
            Comparing {compareList.length} restaurant{compareList.length > 1 ? 's' : ''}
          </div>
          <h1 className="text-4xl font-display font-black text-gray-900 dark:text-white">Safety Comparison</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">See how restaurants stack up on what matters most.</p>
        </div>
        <button
          onClick={() => dispatch(clearCompare())}
          className="text-sm font-bold text-red-400 hover:text-red-600 bg-red-50 dark:bg-red-900/20 hover:bg-red-100 dark:hover:bg-red-900/30 px-4 py-2 rounded-xl transition-colors border border-red-100 dark:border-red-800"
        >
          Clear All
        </button>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        <AnimatePresence>
          {compareList.map((r, idx) => (
            <motion.div
              key={r.id}
              layout
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ delay: idx * 0.1 }}
              className="relative bg-white dark:bg-surface-dark rounded-[2rem] border border-gray-100 dark:border-gray-800 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group"
            >
              {/* Remove button */}
              <button
                onClick={() => dispatch(removeFromCompare(r.id))}
                className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-black/40 text-white flex items-center justify-center hover:bg-red-500 transition-colors text-sm font-bold"
              >
                ✕
              </button>

              {/* Image */}
              <div className="h-44 overflow-hidden">
                <img src={r.image} alt={r.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent h-44" />
              </div>

              <div className="p-6">
                <h3 className="text-xl font-display font-black text-gray-900 dark:text-white mb-1">{r.name}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-5">{r.cuisine.split(',')[0]}</p>

                {/* Safety Score — Hero metric */}
                <div className={`relative overflow-hidden rounded-2xl bg-gradient-to-r ${scoreColor(r.safetyScore)} p-4 mb-4 text-white`}>
                  <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/3" />
                  <p className="text-xs font-bold uppercase tracking-widest opacity-70 mb-1">Kitchen Safety Score</p>
                  <div className="flex items-end gap-2">
                    <span className="text-5xl font-display font-black leading-none">{r.safetyScore}</span>
                    <span className="text-lg opacity-70 mb-1">/ 100</span>
                    <span className="ml-auto text-xs font-bold bg-white/25 rounded-full px-3 py-1">{scoreLabel(r.safetyScore)}</span>
                  </div>
                  {/* Bar */}
                  <div className="mt-3 h-1.5 bg-white/30 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${r.safetyScore}%` }}
                      transition={{ duration: 1.2, delay: 0.3 }}
                      className="h-full bg-white rounded-full"
                    />
                  </div>
                </div>

                {/* Stats grid */}
                <div className="grid grid-cols-3 gap-2 mb-5">
                  {[
                    { label: '🌱 Health', value: `${r.healthRating}/10` },
                    { label: '⭐ Rating', value: r.rating },
                    { label: '💰 Price', value: r.priceRange },
                  ].map((s, i) => (
                    <div key={i} className="bg-gray-50 dark:bg-gray-800 rounded-xl p-3 text-center">
                      <p className="text-[10px] text-gray-400 font-bold mb-1">{s.label}</p>
                      <p className="font-black text-gray-900 dark:text-white text-sm">{s.value}</p>
                    </div>
                  ))}
                </div>

                <div className="flex gap-2">
                  <Link to={APP_ROUTES.RESTAURANT_DETAIL(r.id)} className="flex-1">
                    <button className="w-full py-2.5 rounded-xl border-2 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 font-bold text-sm hover:border-primary hover:text-primary dark:hover:text-primary-dark transition-colors">
                      View Menu
                    </button>
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}

          {/* Add more slot */}
          {compareList.length < 3 && (
            <motion.div
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="border-3 border-dashed border-gray-200 dark:border-gray-700 rounded-[2rem] flex flex-col items-center justify-center p-10 min-h-[420px] text-center group hover:border-primary/40 transition-colors cursor-default"
            >
              <div className="w-16 h-16 rounded-2xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-3xl mb-4 group-hover:scale-110 transition-transform">➕</div>
              <p className="font-bold text-gray-500 dark:text-gray-400 mb-2">Add Another Restaurant</p>
              <p className="text-xs text-gray-400 mb-5">Hover any card and click "⚖️ Compare"</p>
              <Link to={APP_ROUTES.RESTAURANTS}>
                <button className="px-5 py-2 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 font-bold text-sm hover:bg-primary/10 hover:text-primary dark:hover:text-primary-dark transition-colors">
                  Browse Restaurants
                </button>
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Comparison Table */}
      {compareList.length >= 2 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white dark:bg-surface-dark rounded-[2rem] border border-gray-100 dark:border-gray-800 overflow-hidden shadow-sm"
        >
          <div className="p-7 border-b border-gray-100 dark:border-gray-800">
            <h2 className="text-2xl font-display font-black text-gray-900 dark:text-white">Head-to-Head Breakdown</h2>
          </div>
          <div className="p-7 divide-y divide-gray-100 dark:divide-gray-800">
            <MetricRow label="🛡️ Safety Score"  values={compareList.map(r => <span className={`px-3 py-1 rounded-full text-white text-xs font-black ${scoreBg(r.safetyScore)}`}>{r.safetyScore}%</span>)} />
            <MetricRow label="🌱 Health Rating" values={compareList.map(r => `${r.healthRating}/10`)} />
            <MetricRow label="⭐ User Rating"   values={compareList.map(r => `★ ${r.rating}`)} />
            <MetricRow label="⏱ Delivery Time" values={compareList.map(r => r.deliveryTime)} />
            <MetricRow label="💰 Price Range"   values={compareList.map(r => r.priceRange)} />
            <MetricRow label="🍽️ Menu Items"    values={compareList.map(r => `${r.menu?.length || 0} items`)} />
          </div>
        </motion.div>
      )}

    </div>
  );
};

export default Compare;
