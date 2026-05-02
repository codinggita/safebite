import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button, Card } from '../components/ui';
import { APP_ROUTES } from '../constants/routes';
import confetti from 'canvas-confetti';
import SEO from '../components/shared/SEO';

const OrderSuccess = () => {
  useEffect(() => {
    // Celebration effect for 0.1% premium feel
    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    const randomInRange = (min, max) => Math.random() * (max - min) + min;

    const interval = setInterval(function() {
      const timeLeft = animationEnd - Date.now();
      if (timeLeft <= 0) return clearInterval(interval);

      const particleCount = 50 * (timeLeft / duration);
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
    }, 250);
    
    return () => clearInterval(interval);
  }, []);



  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center px-4">
      <SEO title="Order Success" description="Your SafeBite order has been confirmed! We are preparing your meal with high hygiene standards." url="https://safebite.app/order-success" />
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
        className="w-24 h-24 bg-safe-green rounded-full flex items-center justify-center text-white text-4xl mb-8 shadow-2xl shadow-safe-green/40"
      >
        ✓
      </motion.div>
      
      <motion.h1 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-4xl md:text-5xl font-display font-bold text-gray-900 dark:text-white text-center mb-4"
      >
        Order Confirmed!
      </motion.h1>
      
      <motion.p 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="text-gray-500 dark:text-gray-400 text-center max-w-md mb-10"
      >
        Your meal is being prepared under strict safety standards. We've notified the restaurant to begin their verification process.
      </motion.p>
      
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="flex flex-col sm:flex-row gap-4"
      >
        <Link to={APP_ROUTES.DASHBOARD}>
          <Button variant="primary" size="lg">Track My Order</Button>
        </Link>
        <Link to={APP_ROUTES.HOME}>
          <Button variant="outline" size="lg">Go to Home</Button>
        </Link>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="mt-16"
      >
        <Card className="p-4 bg-primary/5 border-none flex items-center space-x-3 text-sm text-primary">
           <span className="text-xl">🥗</span>
           <span>You just earned 20 Health Points!</span>
        </Card>
      </motion.div>
    </div>
  );
};

export default OrderSuccess;
