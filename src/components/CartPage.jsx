import React from 'react';
import { useCart } from '../context/CartContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Trash2, Minus, Plus, ShoppingBag, ArrowLeft } from 'lucide-react';

const CartPage = ({ setView }) => {
  const { cart, removeFromCart, updateQuantity, totalPrice } = useCart();

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="max-w-4xl mx-auto px-6 py-20"
    >
      <div className="flex items-center gap-4 mb-12">
        <button 
          onClick={() => setView('shop')}
          className="p-2 glass rounded-full hover:bg-white/10 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="text-3xl font-bold tracking-tight">Your Collection</h1>
      </div>

      {cart.length === 0 ? (
        <div className="glass rounded-[40px] py-24 text-center">
          <div className="w-20 h-20 bg-dark-lighter rounded-full flex items-center justify-center mx-auto mb-6">
            <ShoppingBag className="w-8 h-8 text-slate-600" />
          </div>
          <h2 className="text-xl font-semibold mb-2">Your collection is empty</h2>
          <p className="text-slate-400 mb-8 max-w-xs mx-auto">Discover our elite line of laptops and start building your setup.</p>
          <button 
            onClick={() => setView('shop')}
            className="btn-primary"
          >
            Explore Laptops
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 flex flex-col gap-4">
            <AnimatePresence mode="popLayout">
              {cart.map((item) => (
                <motion.div 
                  layout
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="glass p-4 rounded-3xl flex gap-6 items-center"
                >
                  <img src={item.image} className="w-24 h-24 rounded-2xl object-cover" />
                  <div className="flex-1">
                    <h3 className="font-bold text-lg">{item.name}</h3>
                    <p className="text-accent font-bold">Rs. {item.price.toLocaleString()}</p>
                  </div>
                  
                  <div className="flex items-center gap-4 bg-dark-lighter/50 px-4 py-2 rounded-2xl">
                    <button onClick={() => updateQuantity(item.id, -1)} className="hover:text-primary transition-colors"><Minus className="w-4 h-4" /></button>
                    <span className="font-bold w-4 text-center">{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, 1)} className="hover:text-primary transition-colors"><Plus className="w-4 h-4" /></button>
                  </div>

                  <button 
                    onClick={() => removeFromCart(item.id)}
                    className="p-3 glass rounded-2xl text-red-400 hover:bg-red-400/10 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          <div className="h-fit sticky top-28">
            <div className="glass p-8 rounded-[40px] flex flex-col gap-6">
              <h2 className="text-xl font-bold">Summary</h2>
              <div className="flex flex-col gap-4 text-slate-400">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="text-white">Rs. {totalPrice.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span className="text-accent font-medium">Free</span>
                </div>
              </div>
              <div className="h-px bg-white/5" />
              <div className="flex justify-between items-center">
                <span className="text-xl font-bold">Total</span>
                <span className="text-2xl font-bold text-accent">Rs. {totalPrice.toLocaleString()}</span>
              </div>
              <button 
                onClick={() => setView('checkout')}
                className="btn-primary !py-4 w-full"
              >
                Checkout
              </button>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default CartPage;
