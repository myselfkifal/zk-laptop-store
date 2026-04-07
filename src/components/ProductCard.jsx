import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Cpu, MemoryStick, HardDrive, ShoppingCart } from 'lucide-react';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const [isFlying, setIsFlying] = useState(false);

  const handleAdd = () => {
    setIsFlying(true);
    addToCart(product);
    setTimeout(() => setIsFlying(false), 1000);
  };

  return (
    <motion.div 
      whileHover={{ y: -8 }}
      className="glass rounded-3xl p-6 flex flex-col gap-6 relative group"
    >
      <div className="w-full h-48 rounded-2xl overflow-hidden bg-dark-lighter/50 relative">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover transition-transform group-hover:scale-110 duration-700" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-dark to-transparent opacity-60" />
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex justify-between items-start">
          <div>
            <span className="text-[10px] font-bold text-primary uppercase tracking-widest">{product.category}</span>
            <h3 className="text-xl font-bold mt-1 tracking-tight">{product.name}</h3>
          </div>
          <p className="text-xl font-bold text-accent">Rs. {product.price.toLocaleString()}</p>
        </div>

        <div className="grid grid-cols-3 gap-2 py-4 border-y border-white/5">
          <div className="flex flex-col items-center gap-1">
            <Cpu className="w-4 h-4 text-slate-500" />
            <span className="text-[10px] text-slate-400">Core I7</span>
          </div>
          <div className="flex flex-col items-center gap-1 border-x border-white/5">
            <MemoryStick className="w-4 h-4 text-slate-500" />
            <span className="text-[10px] text-slate-400">{product.specs.ram}</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <HardDrive className="w-4 h-4 text-slate-500" />
            <span className="text-[10px] text-slate-400">{product.specs.storage}</span>
          </div>
        </div>

        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={handleAdd}
          className="btn-primary w-full flex items-center justify-center gap-2 group-hover:glow-on-hover"
        >
          Add to Cart
        </motion.button>
      </div>

      <AnimatePresence>
        {isFlying && (
          <motion.div
            initial={{ scale: 1, x: 0, y: 0, opacity: 1 }}
            animate={{ 
              scale: 0.1, 
              x: 500, 
              y: -500, 
              opacity: 0,
            }}
            transition={{ duration: 1, ease: "easeInOut" }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-[1000]"
          >
            <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center shadow-2xl">
               <img src={product.image} className="w-12 h-12 rounded-full object-cover" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default ProductCard;
