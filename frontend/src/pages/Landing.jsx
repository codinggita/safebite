import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { APP_ROUTES } from '../constants/routes';
import { Button } from '../components/ui';
import SEO from '../components/shared/SEO';

const stats = [
  { value: '1,200+', label: 'Restaurants Verified' },
  { value: '99.2%', label: 'Safety Accuracy' },
  { value: '50K+', label: 'Safe Orders Delivered' },
  { value: '4.9★', label: 'Average Rating' },
];

const features = [
  {
    icon: '🔬',
    title: 'Real-Time Safety Scores',
    desc: 'Every kitchen is continuously monitored and scored. No fake reviews — only data-verified hygiene standards.',
    color: 'from-teal-500 to-emerald-400',
    bg: 'bg-teal-50 dark:bg-teal-900/20',
  },
  {
    icon: '🛡️',
    title: 'Only Safe Mode',
    desc: 'One toggle to filter your world to only restaurants with a certified 80+ safety score.',
    color: 'from-blue-500 to-cyan-400',
    bg: 'bg-blue-50 dark:bg-blue-900/20',
  },
  {
    icon: '⚖️',
    title: 'Smart Comparison',
    desc: 'Compare up to 3 restaurants side-by-side. Hygiene, ingredients, price — all in one matrix.',
    color: 'from-violet-500 to-purple-400',
    bg: 'bg-violet-50 dark:bg-violet-900/20',
  },
  {
    icon: '🌱',
    title: 'Health Intelligence',
    desc: 'Track your diet health score across every order. Understand what you eat, beyond just calories.',
    color: 'from-green-500 to-lime-400',
    bg: 'bg-green-50 dark:bg-green-900/20',
  },
];

const testimonials = [
  {
    quote: "SafeBite changed how I think about ordering food. I finally feel safe about what my kids eat.",
    name: "Priya Sharma",
    role: "Mom of 2 · Mumbai",
    avatar: "PS",
    color: "from-pink-400 to-rose-500",
  },
  {
    quote: "The comparison feature alone is worth it. I can instantly see which restaurant near me is safest.",
    name: "Arjun Mehta",
    role: "Fitness Enthusiast · Bangalore",
    avatar: "AM",
    color: "from-teal-400 to-emerald-500",
  },
  {
    quote: "As someone with food allergies, SafeBite is the first platform that actually cares about my safety.",
    name: "Neha Gupta",
    role: "Food Blogger · Delhi",
    avatar: "NG",
    color: "from-blue-400 to-violet-500",
  },
];

const howItWorks = [
  { step: '01', title: 'Browse Verified Restaurants', desc: 'Every restaurant displays a live safety score based on kitchen audits and hygiene standards.', icon: '🔍' },
  { step: '02', title: 'Filter by Safety Score', desc: 'Use Safe Mode to only show restaurants above your comfort threshold — your health, your rules.', icon: '🛡️' },
  { step: '03', title: 'Order with Confidence', desc: 'Complete your order knowing exactly what standards your meal was prepared under.', icon: '✅' },
];

const safetyIndicators = [
  { score: 98, label: 'Sushi Zen', tag: 'Excellent' },
  { score: 94, label: 'Green Bowl', tag: 'Great' },
  { score: 88, label: 'Mamma Mia', tag: 'Good' },
];

const Landing = () => {
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full overflow-x-hidden">
      <SEO
        title="Eat Smart. Eat Safe."
        description="SafeBite helps you find and order from safety-verified restaurants. Every kitchen is hygiene-rated so you always know what you're eating."
        url="https://safebite.app/"
      />

      {/* ── HERO ───────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex items-center pt-8 pb-24 overflow-hidden">
        {/* Ambient background */}
        <div className="absolute inset-0 -z-10 pointer-events-none">
          <motion.div
            animate={{ scale: [1, 1.3, 1], rotate: [0, 60, 0] }}
            transition={{ duration: 22, repeat: Infinity, ease: 'linear' }}
            className="absolute -top-40 -right-40 w-[700px] h-[700px] bg-primary/15 dark:bg-primary/25 rounded-full blur-[120px]"
          />
          <motion.div
            animate={{ scale: [1, 1.4, 1], rotate: [0, -80, 0] }}
            transition={{ duration: 28, repeat: Infinity, ease: 'linear' }}
            className="absolute -bottom-40 -left-40 w-[600px] h-[600px] bg-emerald-300/20 dark:bg-emerald-500/15 rounded-full blur-[120px]"
          />
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-blue-200/10 dark:bg-blue-400/10 rounded-full blur-[80px]"
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

            {/* ── Left: Copy ── */}
            <div className="text-center lg:text-left z-10">
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2 bg-white/80 dark:bg-surface-dark/80 backdrop-blur-md text-primary dark:text-primary-dark px-4 py-2 rounded-full font-bold text-sm mb-8 border border-primary/20 shadow-lg"
              >
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary" />
                </span>
                1,200+ kitchens verified in real-time
              </motion.div>

              {/* Headline */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-5xl md:text-6xl lg:text-[5.5rem] font-display font-black tracking-tight text-gray-900 dark:text-white mb-6 leading-[1.05]"
              >
                Food That's{' '}
                <span className="relative">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-emerald-500 to-accent">
                    Safe
                  </span>
                  <motion.svg
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{ duration: 1.2, delay: 0.8, ease: 'easeOut' }}
                    className="absolute -bottom-3 left-0 w-full"
                    viewBox="0 0 200 12" fill="none"
                  >
                    <motion.path d="M2 9 Q50 2 100 9 Q150 16 198 9" stroke="url(#grad)" strokeWidth="3" strokeLinecap="round" />
                    <defs>
                      <linearGradient id="grad" x1="0" y1="0" x2="1" y2="0">
                        <stop offset="0%" stopColor="#0F766E" />
                        <stop offset="100%" stopColor="#10b981" />
                      </linearGradient>
                    </defs>
                  </motion.svg>
                </span>
                {' '}for You.
              </motion.h1>

              {/* Sub */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-xl text-gray-500 dark:text-gray-400 mb-10 max-w-xl mx-auto lg:mx-0 leading-relaxed"
              >
                SafeBite is the only delivery platform that audits kitchens, tracks hygiene scores, and lets you eat knowing your health comes first — always.
              </motion.p>

              {/* CTAs */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mb-14"
              >
                <Link to={APP_ROUTES.RESTAURANTS}>
                  <button className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-gradient-to-r from-primary to-emerald-500 text-white font-bold text-lg shadow-xl shadow-primary/30 hover:shadow-2xl hover:shadow-primary/40 hover:-translate-y-1 transition-all duration-300">
                    <span>Explore Restaurants</span>
                    <motion.span animate={{ x: [0, 5, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>→</motion.span>
                    <div className="absolute inset-0 rounded-2xl bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </button>
                </Link>
                <Link to={APP_ROUTES.COMPARE}>
                  <button className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-white/80 dark:bg-surface-dark/80 backdrop-blur-md border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200 font-bold text-lg hover:border-primary hover:text-primary dark:hover:text-primary-dark hover:-translate-y-1 transition-all duration-300 shadow-lg">
                    <span>⚖️</span>
                    <span>Compare Safety</span>
                  </button>
                </Link>
              </motion.div>

              {/* Stats row */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="grid grid-cols-4 gap-4"
              >
                {stats.map((s, i) => (
                  <div key={i} className="text-center lg:text-left">
                    <div className="text-2xl font-display font-black text-gray-900 dark:text-white">{s.value}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 leading-tight">{s.label}</div>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* ── Right: Visual ── */}
            <motion.div
              initial={{ opacity: 0, x: 60 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.9, type: 'spring', bounce: 0.3 }}
              className="relative h-[600px] hidden lg:block"
            >
              {/* Glow behind image */}
              <div className="absolute inset-8 bg-gradient-to-tr from-primary to-accent opacity-20 rounded-[3rem] blur-3xl" />

              {/* Main image */}
              <div className="relative h-full rounded-[3rem] overflow-hidden shadow-2xl border-4 border-white/50 dark:border-white/10">
                <img
                  src="https://images.unsplash.com/photo-1490645935967-10de6ba17061?q=80&w=1000&auto=format&fit=crop"
                  alt="Healthy and safe food"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

                {/* Live score strip at bottom */}
                <div className="absolute bottom-6 left-6 right-6 bg-white/20 dark:bg-black/40 backdrop-blur-xl rounded-2xl p-4 border border-white/30">
                  <p className="text-white/70 text-xs font-bold uppercase tracking-wider mb-3">Live Safety Scores</p>
                  <div className="space-y-2">
                    {safetyIndicators.map((s, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold ${s.score >= 90 ? 'bg-emerald-500' : s.score >= 80 ? 'bg-yellow-500' : 'bg-orange-500'}`}>
                          {s.score}
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between mb-1">
                            <span className="text-white text-xs font-semibold">{s.label}</span>
                            <span className="text-white/60 text-xs">{s.tag}</span>
                          </div>
                          <div className="h-1 bg-white/20 rounded-full overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${s.score}%` }}
                              transition={{ duration: 1.5, delay: 0.5 + i * 0.2 }}
                              className="h-full bg-emerald-400 rounded-full"
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Floating badge 1 — safety */}
              <motion.div
                animate={{ y: [0, -12, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -left-10 top-20 bg-white dark:bg-surface-dark shadow-2xl rounded-2xl p-4 flex items-center gap-3 z-10 border border-gray-100 dark:border-gray-700"
              >
                <div className="w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center text-2xl">✅</div>
                <div>
                  <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">Safety Score</p>
                  <p className="text-xl font-display font-black text-gray-900 dark:text-white">98%</p>
                </div>
              </motion.div>

              {/* Floating badge 2 — health */}
              <motion.div
                animate={{ y: [0, 14, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1.2 }}
                className="absolute -right-10 top-56 bg-white dark:bg-surface-dark shadow-2xl rounded-2xl p-4 flex items-center gap-3 z-10 border border-gray-100 dark:border-gray-700"
              >
                <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-2xl">🌱</div>
                <div>
                  <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">Health Rating</p>
                  <p className="text-xl font-display font-black text-gray-900 dark:text-white">10 / 10</p>
                </div>
              </motion.div>

              {/* Floating badge 3 — order */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
                className="absolute -left-8 bottom-36 bg-gradient-to-r from-primary to-emerald-500 shadow-2xl rounded-2xl p-4 flex items-center gap-3 z-10"
              >
                <div className="text-white text-2xl">🛒</div>
                <div>
                  <p className="text-xs text-white/70 font-bold uppercase tracking-wider">Just Ordered</p>
                  <p className="text-white font-black">Sushi Zen ✓</p>
                </div>
              </motion.div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ──────────────────────────────────────── */}
      <section className="py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <span className="text-primary dark:text-primary-dark font-bold text-sm uppercase tracking-widest">Simple Process</span>
            <h2 className="text-4xl md:text-5xl font-display font-black text-gray-900 dark:text-white mt-3 mb-5">
              How SafeBite Works
            </h2>
            <p className="text-xl text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
              Three steps to eating with total confidence and zero guesswork.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {/* Connector line (desktop) */}
            <div className="hidden md:block absolute top-16 left-[calc(16.67%+2rem)] right-[calc(16.67%+2rem)] h-0.5 bg-gradient-to-r from-primary/30 via-primary to-primary/30 z-0" />

            {howItWorks.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                className="relative text-center z-10"
              >
                <div className="w-32 h-32 mx-auto mb-8 rounded-3xl bg-white dark:bg-surface-dark shadow-xl border border-gray-100 dark:border-gray-800 flex flex-col items-center justify-center gap-1 relative overflow-hidden group hover:-translate-y-2 transition-transform duration-300">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <span className="text-4xl">{step.icon}</span>
                  <span className="text-xs font-black text-primary dark:text-primary-dark tracking-widest">{step.step}</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{step.title}</h3>
                <p className="text-gray-500 dark:text-gray-400 leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURES ─────────────────────────────────────────── */}
      <section className="py-24 bg-gray-50 dark:bg-[#0E1210] relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none -z-0">
          <div className="absolute top-0 left-1/2 w-[600px] h-[600px] -translate-x-1/2 bg-primary/5 rounded-full blur-[100px]" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <span className="text-primary dark:text-primary-dark font-bold text-sm uppercase tracking-widest">Why SafeBite</span>
            <h2 className="text-4xl md:text-5xl font-display font-black text-gray-900 dark:text-white mt-3 mb-5">
              Every Feature Built for Your Safety
            </h2>
            <p className="text-xl text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
              We obsess over food safety so you never have to second-guess your meal.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((f, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                whileHover={{ y: -6 }}
                className="group bg-white dark:bg-surface-dark rounded-[2rem] p-8 border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-2xl transition-all duration-400 flex gap-6"
              >
                <div className={`w-16 h-16 ${f.bg} rounded-2xl flex items-center justify-center text-3xl flex-shrink-0 shadow-inner group-hover:scale-110 transition-transform duration-300`}>
                  {f.icon}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{f.title}</h3>
                  <p className="text-gray-500 dark:text-gray-400 leading-relaxed">{f.desc}</p>
                  <div className={`mt-4 inline-flex items-center gap-2 text-sm font-bold bg-gradient-to-r ${f.color} bg-clip-text text-transparent`}>
                    Learn more →
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ────────────────────────────────────── */}
      <section className="py-24 relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <span className="text-primary dark:text-primary-dark font-bold text-sm uppercase tracking-widest">Real People</span>
            <h2 className="text-4xl md:text-5xl font-display font-black text-gray-900 dark:text-white mt-3">
              Trusted by Thousands
            </h2>
          </motion.div>

          <div className="relative h-52">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTestimonial}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0 flex flex-col items-center justify-center"
              >
                <blockquote className="text-2xl font-medium text-gray-700 dark:text-gray-200 mb-8 leading-relaxed max-w-2xl mx-auto">
                  "{testimonials[activeTestimonial].quote}"
                </blockquote>
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${testimonials[activeTestimonial].color} text-white flex items-center justify-center font-bold text-sm shadow-lg`}>
                    {testimonials[activeTestimonial].avatar}
                  </div>
                  <div className="text-left">
                    <p className="font-bold text-gray-900 dark:text-white">{testimonials[activeTestimonial].name}</p>
                    <p className="text-sm text-gray-500">{testimonials[activeTestimonial].role}</p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Dots */}
          <div className="flex justify-center gap-2 mt-4">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveTestimonial(i)}
                className={`h-2 rounded-full transition-all duration-300 ${i === activeTestimonial ? 'w-8 bg-primary' : 'w-2 bg-gray-300 dark:bg-gray-700'}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ───────────────────────────────────────── */}
      <section className="py-8 px-4 sm:px-6 lg:px-8 pb-12">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative overflow-hidden rounded-[3rem] bg-gradient-to-br from-primary via-emerald-600 to-teal-700 p-12 md:p-20 text-white text-center shadow-2xl"
          >
            {/* Background shapes */}
            <div className="absolute top-0 left-0 w-72 h-72 bg-white/10 rounded-full -translate-x-1/2 -translate-y-1/2 blur-2xl" />
            <div className="absolute bottom-0 right-0 w-72 h-72 bg-black/10 rounded-full translate-x-1/2 translate-y-1/2 blur-2xl" />

            <div className="relative z-10">
              <span className="text-5xl mb-6 block">🍽️</span>
              <h2 className="text-4xl md:text-5xl font-display font-black mb-5">
                Start Eating Safely Today
              </h2>
              <p className="text-white/80 text-xl mb-10 max-w-xl mx-auto">
                Join 50,000+ people who prioritize their health with every single order.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to={APP_ROUTES.SIGNUP}>
                  <button className="px-10 py-4 rounded-2xl bg-white text-primary font-black text-lg hover:bg-gray-100 shadow-xl hover:-translate-y-1 transition-all duration-300">
                    Get Started Free →
                  </button>
                </Link>
                <Link to={APP_ROUTES.RESTAURANTS}>
                  <button className="px-10 py-4 rounded-2xl bg-white/20 backdrop-blur-md text-white font-bold text-lg border border-white/30 hover:bg-white/30 hover:-translate-y-1 transition-all duration-300">
                    Browse Restaurants
                  </button>
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  );
};

export default Landing;
