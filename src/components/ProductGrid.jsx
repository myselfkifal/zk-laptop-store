import React, { useState } from 'react';
import { LAPTOPS } from '../data/laptops';
import ProductCard from './ProductCard';
import { motion, AnimatePresence } from 'framer-motion';
import { Search } from 'lucide-react';

const ProductGrid = () => {
  const [filter, setFilter] = useState('All');
  const [search, setSearch] = useState('');

  const filteredLaptops = LAPTOPS.filter(laptop => {
    const matchesCategory = filter === 'All' || laptop.category === filter;
    const matchesSearch = laptop.name.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const categories = ['All', 'Gaming', 'Business', 'Student', 'Coding'];

  return (
    <div className="max-w-7xl mx-auto px-6 py-20" id="products">
      <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-16">
        <div className="flex gap-2 p-1 glass rounded-2xl">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`relative px-6 py-2 text-sm font-medium rounded-xl transition-all ${filter === cat ? 'text-white' : 'text-slate-400 hover:text-slate-200'}`}
            >
              {cat}
              {filter === cat && (
                <motion.div 
                  layoutId="activeFilter"
                  className="absolute inset-0 bg-primary rounded-xl -z-10"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
            </button>
          ))}
        </div>

        <div className="relative group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-primary transition-colors" />
          <input 
            type="text" 
            placeholder="Search laltops..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-11 pr-6 py-3 w-[300px] glass rounded-2xl outline-none focus:border-primary/50 transition-all text-sm"
          />
        </div>
      </div>

      <motion.div 
        layout
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        <AnimatePresence mode="popLayout">
          {filteredLaptops.map(laptop => (
            <motion.div
              layout
              key={laptop.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
            >
              <ProductCard product={laptop} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {filteredLaptops.length === 0 && (
        <div className="text-center py-20 text-slate-500 italic">
          No masterpieces found matching your refinement.
        </div>
      )}
    </div>
  );
};

export default ProductGrid;
