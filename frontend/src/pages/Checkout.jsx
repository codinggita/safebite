import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Formik, Form } from 'formik';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';
import { deliveryAddressSchema } from '../utils/validators';
import { clearCart } from '../features/cart/cartSlice';
import { 
  selectCartItems, 
  selectCartSubtotal, 
  selectCartTotal 
} from '../features/cart/cartSelectors';
import { APP_ROUTES } from '../constants/routes';
import { Button, Card } from '../components/ui';
import { FormInput, StepIndicator } from '../components/shared';
import { formatCurrency } from '../utils/formatters';
import SEO from '../components/shared/SEO';

const Checkout = () => {
  const [step, setStep] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState('card');
  const items = useSelector(selectCartItems);
  const subtotal = useSelector(selectCartSubtotal);
  const total = useSelector(selectCartTotal);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const steps = ['Delivery', 'Payment', 'Review'];

  const handlePlaceOrder = () => {
    toast.success('Order placed successfully!');
    dispatch(clearCart());
    navigate(APP_ROUTES.ORDER_SUCCESS);
  };


  if (items.length === 0 && step !== 4) {
    navigate(APP_ROUTES.CART);
    return null;
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 animate-in fade-in">
      <SEO
        title="Checkout"
        description="Complete your SafeBite order — choose delivery address, payment method, and review your cart."
        url="https://safebite.app/checkout"
      />
      <div className="mb-10 text-center">
        <h1 className="text-3xl font-display font-bold text-gray-900 dark:text-white mb-6">Complete Your Order</h1>
        <div className="max-w-xl mx-auto">
          <StepIndicator steps={steps} currentStep={step} />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        
        {/* Form Area */}
        <div className="lg:col-span-2">
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
              >
                <Card className="p-8 bg-white dark:bg-surface-dark border-none shadow-sm">
                  <h2 className="text-xl font-bold mb-6">Where should we deliver?</h2>
                  <Formik
                    initialValues={{ addressLine: '', city: '', pincode: '', landmark: '', instructions: '' }}
                    validationSchema={deliveryAddressSchema}
                    onSubmit={() => setStep(2)}
                  >
                    {({ isValid, dirty }) => (
                      <Form className="space-y-4">
                        <FormInput name="addressLine" label="House / Flat No., Building, Street" placeholder="e.g. 402, Green Park" />
                        <div className="grid grid-cols-2 gap-4">
                          <FormInput name="city" label="City" placeholder="e.g. Mumbai" />
                          <FormInput name="pincode" label="Pincode" placeholder="e.g. 400001" />
                        </div>
                        <FormInput name="landmark" label="Landmark (Optional)" placeholder="e.g. Near Civic Center" />
                        <FormInput name="instructions" label="Delivery Instructions" placeholder="e.g. Leave at the gate" />
                        
                        <div className="pt-6">
                           <Button type="submit" className="w-full" size="lg" disabled={!(isValid && dirty)}>
                              Continue to Payment
                           </Button>
                        </div>
                      </Form>
                    )}
                  </Formik>
                </Card>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
              >
                <Card className="p-8 bg-white dark:bg-surface-dark border-none shadow-sm">
                  <h2 className="text-xl font-bold mb-6">Select Payment Method</h2>
                  <div className="space-y-4 mb-8">
                     {[
                       { id: 'card', label: 'Credit / Debit Card', icon: '💳' },
                       { id: 'upi', label: 'UPI (GPay, PhonePe)', icon: '📱' },
                       { id: 'cod', label: 'Cash on Delivery', icon: '💵' }
                     ].map((method) => (
                       <div 
                        key={method.id}
                        onClick={() => setPaymentMethod(method.id)}
                        className={`p-4 rounded-2xl border-2 cursor-pointer transition-all flex items-center justify-between
                          ${paymentMethod === method.id 
                            ? 'border-primary bg-primary/5' 
                            : 'border-gray-100 dark:border-gray-800 hover:border-gray-200'}
                        `}
                       >
                         <div className="flex items-center space-x-4">
                            <span className="text-2xl">{method.icon}</span>
                            <span className="font-bold">{method.label}</span>
                         </div>
                         <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center
                            ${paymentMethod === method.id ? 'border-primary bg-primary' : 'border-gray-300'}
                         `}>
                            {paymentMethod === method.id && <span className="text-white text-xs">✓</span>}
                         </div>
                       </div>
                     ))}
                  </div>
                  <div className="flex gap-4">
                     <Button variant="outline" className="flex-1" onClick={() => setStep(1)}>Back</Button>
                     <Button className="flex-2" onClick={() => setStep(3)}>Continue to Review</Button>
                  </div>
                </Card>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
              >
                <Card className="p-8 bg-white dark:bg-surface-dark border-none shadow-sm">
                  <h2 className="text-xl font-bold mb-6">Review & Place Order</h2>
                  <div className="space-y-6">
                     <div className="pb-6 border-b border-gray-100 dark:border-gray-800">
                        <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-3">Order Items</h3>
                        <div className="space-y-2">
                           {items.map(item => (
                             <div key={item.id} className="flex justify-between text-sm">
                                <span>{item.name} x {item.quantity}</span>
                                <span className="font-bold">{formatCurrency(item.price * item.quantity)}</span>
                             </div>
                           ))}
                        </div>
                     </div>
                     
                     <div className="pb-6 border-b border-gray-100 dark:border-gray-800">
                        <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-2">Payment Mode</h3>
                        <p className="font-medium flex items-center">
                           <span className="mr-2">{paymentMethod === 'card' ? '💳' : paymentMethod === 'upi' ? '📱' : '💵'}</span>
                           {paymentMethod.toUpperCase()}
                        </p>
                     </div>
                  </div>

                  <div className="flex gap-4 mt-10">
                     <Button variant="outline" className="flex-1" onClick={() => setStep(2)}>Back</Button>
                     <Button className="flex-2" onClick={handlePlaceOrder} size="lg">
                        Place Order {formatCurrency(total + (subtotal * 0.05))}
                     </Button>
                  </div>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Mini Summary Sidebar Sidebar */}
        <div className="lg:col-span-1">
          <Card className="p-6 bg-gray-50 dark:bg-black/20 border-none shadow-none sticky top-24">
             <h3 className="font-bold mb-4">Summary</h3>
             <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                   <span className="text-gray-500">Subtotal</span>
                   <span className="font-medium">{formatCurrency(subtotal)}</span>
                </div>
                <div className="flex justify-between">
                   <span className="text-gray-500">Service Fee</span>
                   <span className="font-medium">{formatCurrency(subtotal * 0.05)}</span>
                </div>
                <div className="flex justify-between">
                   <span className="text-gray-500">Delivery</span>
                   <span className="text-safe-green font-bold">FREE</span>
                </div>
                <div className="pt-4 border-t border-gray-200 dark:border-gray-700 flex justify-between font-bold text-lg">
                   <span>To Pay</span>
                   <span className="text-primary">{formatCurrency(total + (subtotal * 0.05))}</span>
                </div>
             </div>
          </Card>
        </div>

      </div>
    </div>
  );
};

export default Checkout;
