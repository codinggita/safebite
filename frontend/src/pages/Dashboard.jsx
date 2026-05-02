import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Card, Button, Badge } from '../components/ui';
import { SafetyScoreBadge, HealthRatingGauge } from '../components/shared';
import SEO from '../components/shared/SEO';
import { formatCurrency } from '../utils/formatters';
import { APP_ROUTES } from '../constants/routes';

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector(state => state.auth);

  const metrics = [
    { label: 'Safe Meals Ordered', value: '18', icon: '🛡️', change: '+3 this week', color: 'from-emerald-500 to-teal-400', lightBg: 'bg-emerald-50 dark:bg-emerald-900/20' },
    { label: 'Avg Safety Score', value: '92%', icon: '📈', change: 'Top 10% of users', color: 'from-blue-500 to-cyan-400', lightBg: 'bg-blue-50 dark:bg-blue-900/20' },
    { label: 'Health Points', value: '450', icon: '🌱', change: '+30 today', color: 'from-violet-500 to-purple-400', lightBg: 'bg-violet-50 dark:bg-violet-900/20' },
  ];

  const recentActivity = [
    { id: 1, restaurant: 'Green Bowl Cafe', date: 'Yesterday', score: 94, status: 'Delivered', amount: 450, emoji: '🥗', tag: 'Excellent' },
    { id: 2, restaurant: 'Sushi Zen', date: '3 days ago', score: 98, status: 'Delivered', amount: 890, emoji: '🍣', tag: 'Excellent' },
    { id: 3, restaurant: 'The Burger Joint', date: 'Last week', score: 82, status: 'Delivered', amount: 320, emoji: '🍔', tag: 'Good' },
  ];

  const scoreColor = (s) => s >= 90 ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400' : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400';

  return (
    <div className="p-6 md:p-10 max-w-7xl mx-auto animate-in fade-in duration-500">
      <SEO
        title="Dashboard"
        description="View your food safety stats, recent orders, health score, and personalised restaurant recommendations on SafeBite."
        url="https://safebite.app/dashboard"
      />

      {/* ── Header ── */}
      <div className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary dark:text-primary-dark px-3 py-1.5 rounded-full text-xs font-bold mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            Live Dashboard
          </div>
          <h1 className="text-4xl font-display font-black text-gray-900 dark:text-white">
            Hey, <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-emerald-400">{user?.fullName?.split(' ')[0] || 'Explorer'} 👋</span>
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1 text-lg">Here's your food safety & health overview.</p>
        </div>
        <div className="flex gap-3">
          <Link to={APP_ROUTES.RESTAURANTS}>
            <button className="px-6 py-3 rounded-2xl bg-gradient-to-r from-primary to-emerald-500 text-white font-bold shadow-lg shadow-primary/25 hover:shadow-xl hover:-translate-y-0.5 transition-all">
              New Order →
            </button>
          </Link>
        </div>
      </div>

      {/* ── Metric Cards ── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        {metrics.map((m, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white dark:bg-surface-dark rounded-[1.75rem] p-6 border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group"
          >
            <div className="flex items-center justify-between mb-5">
              <div className={`w-14 h-14 ${m.lightBg} rounded-2xl flex items-center justify-center text-2xl shadow-inner group-hover:scale-110 transition-transform`}>
                {m.icon}
              </div>
              <div className="text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/20 px-2.5 py-1 rounded-full">
                {m.change}
              </div>
            </div>
            <p className="text-sm font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-1">{m.label}</p>
            <p className={`text-4xl font-display font-black bg-gradient-to-r ${m.color} bg-clip-text text-transparent`}>{m.value}</p>
          </motion.div>
        ))}
      </div>

      {/* ── Main Grid ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* Recent Orders */}
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-display font-black text-gray-900 dark:text-white">Recent Activity</h2>
            <button className="text-sm font-bold text-primary dark:text-primary-dark hover:text-emerald-600 transition-colors">View All →</button>
          </div>

          <div className="space-y-4">
            {recentActivity.map((act, i) => (
              <motion.div
                key={act.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + i * 0.1 }}
                className="group flex items-center justify-between p-5 bg-white dark:bg-surface-dark rounded-[1.5rem] border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-lg hover:border-primary/30 transition-all duration-300"
              >
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-gray-50 dark:bg-gray-800 flex items-center justify-center text-2xl border border-gray-100 dark:border-gray-700 group-hover:scale-110 transition-transform">
                    {act.emoji}
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 dark:text-white text-base">{act.restaurant}</h4>
                    <p className="text-sm text-gray-400">{act.date} · {formatCurrency(act.amount)}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="text-center hidden sm:block">
                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-1">Safety</p>
                    <div className={`px-3 py-1 rounded-full text-xs font-black ${scoreColor(act.score)}`}>
                      {act.score}%
                    </div>
                  </div>
                  <div className="w-px h-8 bg-gray-100 dark:bg-gray-700 hidden sm:block" />
                  <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/20 px-3 py-1.5 rounded-full">
                    <span>✅</span> {act.status}
                  </div>
                  <span className="text-gray-300 group-hover:text-primary transition-colors text-lg">→</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Recommendation Sidebar */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-primary via-emerald-600 to-teal-700 p-8 text-white shadow-2xl h-full min-h-[380px] flex flex-col justify-between"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/15 rounded-full -translate-y-1/2 translate-x-1/3 blur-2xl" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-black/10 rounded-full translate-y-1/2 -translate-x-1/4 blur-2xl" />

            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 bg-white/20 rounded-full px-3 py-1.5 text-xs font-bold mb-5 border border-white/30">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-200 animate-pulse" />
                AI Recommended
              </div>
              <h3 className="text-2xl font-display font-black mb-3">Today's Top Pick</h3>
              <p className="text-white/80 text-sm leading-relaxed mb-6">
                Based on your hygiene preferences, Sushi Zen is today's highest-rated safe restaurant at 98%.
              </p>

              <div className="bg-white/15 backdrop-blur-md rounded-2xl p-4 mb-6 border border-white/20">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 rounded-xl bg-white/25 flex items-center justify-center text-2xl">🍣</div>
                  <div>
                    <p className="font-black text-lg leading-tight">Sushi Zen</p>
                    <p className="text-white/70 text-xs">Metro Center · Japanese</p>
                  </div>
                  <div className="ml-auto bg-emerald-400/30 rounded-xl px-3 py-1 border border-emerald-300/30">
                    <p className="text-xs font-black text-emerald-100">98%</p>
                  </div>
                </div>
                <div className="h-1.5 bg-white/20 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: '98%' }}
                    transition={{ duration: 1.5, delay: 0.8 }}
                    className="h-full bg-emerald-300 rounded-full"
                  />
                </div>
              </div>

              <Link to={APP_ROUTES.RESTAURANT_DETAIL('3')}>
                <button className="w-full py-3.5 rounded-2xl bg-white text-primary font-black hover:bg-gray-50 shadow-xl hover:-translate-y-0.5 transition-all">
                  Order from Sushi Zen →
                </button>
              </Link>
            </div>
          </motion.div>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;
