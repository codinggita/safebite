import React from 'react';
import { motion } from 'framer-motion';
import { Card, Button, Badge } from '../components/ui';
import { formatCurrency } from '../utils/formatters';
import { Link } from 'react-router-dom';
import { APP_ROUTES } from '../constants/routes';
import SEO from '../components/shared/SEO';

const Orders = () => {
  const orders = [
    { id: 'ORD-7721', restaurant: 'Green Bowl Cafe', date: 'April 26, 2026', total: 495, status: 'Delivered', safetyScore: 94 },
    { id: 'ORD-8832', restaurant: 'Sushi Zen', date: 'April 22, 2026', total: 1240, status: 'Delivered', safetyScore: 98 },
    { id: 'ORD-9910', restaurant: 'The Burger Joint', date: 'April 15, 2026', total: 680, status: 'Delivered', safetyScore: 82 },
  ];

  return (
    <div className="p-6 md:p-10 animate-in fade-in">
      <SEO title="Your Orders" description="View your past orders and food safety history on SafeBite." url="https://safebite.app/orders" />
      <header className="mb-10">
        <h1 className="text-3xl font-display font-bold text-gray-900 dark:text-white">Your Orders</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">History of your safe and healthy meals.</p>
      </header>

      <div className="space-y-6">
        {orders.map((order, i) => (
          <motion.div
            key={order.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <Card className="p-6 bg-white dark:bg-surface-dark border-none shadow-sm hover:shadow-md transition-all flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="flex items-center space-x-6">
                 <div className="w-16 h-16 rounded-2xl bg-primary/5 flex flex-col items-center justify-center text-primary">
                    <span className="text-xs font-bold uppercase tracking-tighter">Apr</span>
                    <span className="text-2xl font-bold font-display leading-none">{order.date.split(' ')[1].replace(',', '')}</span>
                 </div>
                 <div>
                    <div className="flex items-center space-x-2 mb-1">
                       <h3 className="font-bold text-lg">{order.restaurant}</h3>
                       <Badge variant="default" size="sm">{order.id}</Badge>
                    </div>
                    <p className="text-sm text-gray-500">{order.date} • {formatCurrency(order.total)}</p>
                 </div>
              </div>

              <div className="flex items-center gap-4 md:gap-10">
                 <div className="text-center">
                    <span className="block text-[10px] text-gray-400 uppercase font-bold mb-1">Safety Rating</span>
                    <div className="flex items-center space-x-2">
                       <div className={`w-3 h-3 rounded-full ${order.safetyScore >= 90 ? 'bg-safe-green' : 'bg-warning-yellow'}`} />
                       <span className="font-bold">{order.safetyScore}%</span>
                    </div>
                 </div>
                 <div className="h-10 w-px bg-gray-100 dark:bg-gray-800 hidden md:block" />
                 <Badge variant="success" className="bg-safe-green/10 text-safe-green border-none">{order.status}</Badge>
                 <Link to={APP_ROUTES.ORDER_TRACKING(order.id)}>
                    <Button variant="outline" size="sm">Details</Button>
                 </Link>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
