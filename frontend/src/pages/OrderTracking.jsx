import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Card, Button, Badge } from '../components/ui';
import { APP_ROUTES } from '../constants/routes';
import SEO from '../components/shared/SEO';

const OrderTracking = () => {
  const { id } = useParams();

  const trackSteps = [
    { title: 'Order Received', desc: 'The restaurant has received your request.', time: '10:00 AM', status: 'completed' },
    { title: 'Hygiene Verification', desc: 'Kitchen hygiene and staff health check in progress.', time: '10:05 AM', status: 'completed' },
    { title: 'Preparing Meal', desc: 'Your food is being prepared under safe standards.', time: '10:12 AM', status: 'current' },
    { title: 'Safe Packaging', desc: 'Double-sealed and sanitized packaging.', time: 'Pending', status: 'upcoming' },
    { title: 'On the Way', desc: 'Our rider is bringing your safe meal.', time: 'Pending', status: 'upcoming' },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 animate-in fade-in">
      <SEO title="Track Your Order" description="Track your SafeBite meal in real-time, including hygiene verification and rider progress." url={`https://safebite.app/orders/${id}`} />
      <div className="flex items-center justify-between mb-10">
        <div>
          <Badge variant="primary" size="sm" className="mb-2">Order #{id?.slice(-6).toUpperCase() || 'SB1234'}</Badge>
          <h1 className="text-3xl font-display font-bold">Track Your Meal</h1>
        </div>
        <Link to={APP_ROUTES.ORDERS}>
          <Button variant="ghost">View Order Info</Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Timeline */}
        <div className="md:col-span-2">
           <Card className="p-8 bg-white dark:bg-surface-dark border-none shadow-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
              
              <div className="relative space-y-10">
                 {trackSteps.map((step, i) => (
                    <div key={i} className="flex group">
                       {/* Line & Dot */}
                       <div className="flex flex-col items-center mr-6">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center text-lg z-10 
                            ${step.status === 'completed' ? 'bg-safe-green text-white' : 
                              step.status === 'current' ? 'bg-primary text-white shadow-lg shadow-primary/30 animate-pulse' : 
                              'bg-gray-100 dark:bg-gray-800 text-gray-400'}
                          `}>
                             {step.status === 'completed' ? '✓' : i + 1}
                          </div>
                          {i !== trackSteps.length - 1 && (
                             <div className={`w-1 h-10 -mb-10 mt-2 rounded-full ${step.status === 'completed' ? 'bg-safe-green' : 'bg-gray-100 dark:bg-gray-800'}`} />
                          )}
                       </div>
                       
                       {/* Content */}
                       <div className="flex-1 pb-10 border-b border-gray-50 dark:border-gray-800/50 last:border-0">
                          <div className="flex justify-between items-start mb-1">
                             <h3 className={`font-bold text-lg ${step.status === 'upcoming' ? 'text-gray-400' : 'text-gray-900 dark:text-white'}`}>
                                {step.title}
                             </h3>
                             <span className="text-xs font-mono text-gray-400">{step.time}</span>
                          </div>
                          <p className={`text-sm ${step.status === 'upcoming' ? 'text-gray-300 dark:text-gray-600' : 'text-gray-500 dark:text-gray-400'}`}>
                             {step.desc}
                          </p>
                       </div>
                    </div>
                 ))}
              </div>
           </Card>
        </div>

        {/* Rider Info Sidebar */}
        <div className="md:col-span-1">
           <div className="sticky top-24 space-y-6">
              <Card className="p-6 bg-white dark:bg-surface-dark border-none shadow-sm text-center">
                 <div className="w-20 h-20 rounded-full bg-gray-100 dark:bg-gray-800 mx-auto mb-4 overflow-hidden border-4 border-primary/10">
                    <img src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=200&auto=format&fit=crop" alt="Rider" className="w-full h-full object-cover" />
                 </div>
                 <h4 className="font-bold text-lg">Rahul S.</h4>
                 <p className="text-sm text-gray-500 mb-4">Your SafeBite Partner</p>
                 <div className="flex items-center justify-center space-x-1 mb-6">
                    {[1,2,3,4,5].map(s => <span key={s} className="text-yellow-400 text-xs">⭐</span>)}
                    <span className="text-xs text-gray-400 ml-1">(4.9)</span>
                 </div>
                 <Button className="w-full" variant="outline" size="sm">Call Rider</Button>
              </Card>

              <Card className="p-6 bg-safe-green/5 border border-safe-green/20 rounded-3xl">
                 <h4 className="font-bold text-safe-green text-sm flex items-center mb-3">
                    <span className="mr-2">🛡️</span>
                    Hygiene Guarantee
                 </h4>
                 <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
                    The restaurant confirmed sanitization of the prep area at 10:04 AM. Temperature of prepared food is 72°C.
                 </p>
              </Card>
           </div>
        </div>

      </div>
    </div>
  );
};

export default OrderTracking;
