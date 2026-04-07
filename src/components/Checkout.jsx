import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { motion } from 'framer-motion';
import { CheckCircle, CreditCard, Truck, User } from 'lucide-react';

const Checkout = ({ onComplete }) => {
  const { cart, totalPrice, clearCart } = useCart();
  const [formData, setFormData] = useState({ name: '', address: '', phone: '', payment: 'Credit Card' });
  const [isOrdered, setIsOrdered] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsOrdered(true);
    setTimeout(() => {
      clearCart();
      onComplete();
    }, 4000);
  };

  if (isOrdered) {
    return (
      <div className="max-w-2xl mx-auto px-6 py-40">
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="glass rounded-[50px] p-12 text-center"
        >
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", delay: 0.2 }}
            className="w-24 h-24 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-8 border border-accent/30"
          >
            <CheckCircle className="w-12 h-12 text-accent" />
          </motion.div>
          <h2 className="text-4xl font-extrabold mb-4 tracking-tight">Order Confirmed!</h2>
          <p className="text-slate-400 mb-8 max-w-sm mx-auto">
            Your premium selection is now being prepared for shipping. Get ready for elite performance.
          </p>
          <div className="inline-block glass px-6 py-2 rounded-full text-slate-400 animate-pulse text-sm">
            Redirecting to showroom...
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-20">
      <h1 className="text-3xl font-bold tracking-tight mb-12">One step closer to greatness.</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
        <div className="lg:col-span-3">
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="glass p-10 rounded-[40px] flex flex-col gap-8">
              <div className="flex flex-col gap-6">
                <div className="space-y-4">
                  <label className="flex items-center gap-2 text-sm font-bold text-slate-400"><User className="w-4 h-4"/> Full Name</label>
                  <input required type="text" className="w-full glass bg-dark-lighter/50 px-6 py-4 rounded-2xl outline-none focus:border-primary transition-all" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
                </div>
                <div className="space-y-4">
                  <label className="flex items-center gap-2 text-sm font-bold text-slate-400"><Truck className="w-4 h-4"/> Shipping Address</label>
                  <textarea required className="w-full glass bg-dark-lighter/50 px-6 py-4 rounded-2xl outline-none focus:border-primary transition-all min-h-[120px]" value={formData.address} onChange={(e) => setFormData({...formData, address: e.target.value})} />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <label className="text-sm font-bold text-slate-400">Phone</label>
                    <input required type="tel" className="w-full glass bg-dark-lighter/50 px-6 py-4 rounded-2xl outline-none focus:border-primary transition-all" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} />
                  </div>
                  <div className="space-y-4">
                    <label className="flex items-center gap-2 text-sm font-bold text-slate-400"><CreditCard className="w-4 h-4"/> Payment Method</label>
                    <select className="w-full glass bg-dark-lighter/50 px-6 py-4 rounded-2xl outline-none focus:border-primary transition-all appearance-none" value={formData.payment} onChange={(e) => setFormData({...formData, payment: e.target.value})}>
                      <option>Credit Card</option>
                      <option>PayPal</option>
                      <option>Crypto</option>
                    </select>
                  </div>
                </div>
              </div>
              <button type="submit" className="btn-primary !py-5 text-lg">Confirm & Place Order</button>
            </div>
          </form>
        </div>

        <div className="lg:col-span-2">
          <div className="glass p-8 rounded-[40px] sticky top-28 h-fit">
            <h2 className="text-xl font-bold mb-8">Summary</h2>
            <div className="flex flex-col gap-4 mb-8">
              {cart.map(item => (
                <div key={item.id} className="flex justify-between items-center text-sm">
                  <span className="text-slate-400">{item.name} <span className="text-xs">x{item.quantity}</span></span>
                  <span className="font-bold">Rs. {(item.price * item.quantity).toLocaleString()}</span>
                </div>
              ))}
            </div>
            <div className="h-px bg-white/5 mb-6" />
            <div className="flex justify-between items-center">
              <span className="text-xl font-bold">Total</span>
              <span className="text-2xl font-bold text-accent">Rs. {totalPrice.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
