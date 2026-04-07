import React from 'react';
import { useCart } from '../context/CartContext';
import { ShoppingCart, Laptop, Phone } from 'lucide-react';
import { motion } from 'framer-motion';

const Navbar = ({ setView, activeView }) => {
  const { cart } = useCart();
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <nav className="nav-blur sticky top-0 px-6 py-4 flex justify-between items-center transition-all">
      <div 
        className="flex items-center gap-2 cursor-pointer group"
        onClick={() => setView('shop')}
      >
        <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center font-bold text-xl group-hover:rotate-12 transition-transform">
          Z
        </div>
        <span className="text-2xl font-bold tracking-tighter">k.</span>
      </div>

      <div className="flex items-center gap-8">
        <button 
          onClick={() => setView('shop')}
          className={`flex items-center gap-2 text-sm font-medium transition-colors ${activeView === 'shop' ? 'text-primary' : 'text-slate-400 hover:text-white'}`}
        >
          <Laptop className="w-4 h-4" />
          Shop
        </button>
        <button 
          onClick={() => setView('contact')}
          className={`flex items-center gap-2 text-sm font-medium transition-colors ${activeView === 'contact' ? 'text-primary' : 'text-slate-400 hover:text-white'}`}
        >
          <Phone className="w-4 h-4" />
          Contact
        </button>
        
        <button 
          onClick={() => setView('cart')}
          className="relative glass p-2.5 rounded-xl hover:bg-white/10 transition-colors"
        >
          <ShoppingCart className="w-5 h-5" />
          {cartCount > 0 && (
            <motion.span 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute -top-1 -right-1 bg-primary text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-dark"
            >
              {cartCount}
            </motion.span>
          )}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
