import React, { useState, useEffect } from 'react';
import { CartProvider } from './context/CartContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProductGrid from './components/ProductGrid';
import CartPage from './components/CartPage';
import Checkout from './components/Checkout';
import Toast from './components/Toast';
import LoadingSkeleton from './components/LoadingSkeleton';
import { motion, AnimatePresence } from 'framer-motion';
import './index.css';

function App() {
  const [view, setView] = useState('shop'); // shop, cart, checkout, contact
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <CartProvider>
      <div className="min-h-screen bg-dark text-slate-100 font-sans selection:bg-primary/30">
        <Navbar 
          setView={setView} 
          activeView={view}
        />
        
        <main className="pb-20">
          <AnimatePresence mode="wait">
            {isLoading ? (
              <motion.div 
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <LoadingSkeleton />
              </motion.div>
            ) : (
              <motion.div
                key={view}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
              >
                {view === 'shop' && (
                  <>
                    <Hero onShopNow={() => document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })} />
                    <ProductGrid />
                  </>
                )}
                
                {view === 'cart' && (
                  <CartPage setView={setView} />
                )}

                {view === 'checkout' && (
                  <Checkout onComplete={() => setView('shop')} />
                )}

                {view === 'contact' && (
                  <div className="max-w-4xl mx-auto px-6 py-24">
                    <div className="glass p-12 rounded-[50px] text-center">
                      <h2 className="text-4xl font-bold mb-6 tracking-tight">Connect with Zk.</h2>
                      <p className="text-slate-400 text-lg mb-10 max-w-md mx-auto">
                        Whether you're a gamer, creator, or professional, our support team is ready to assist your journey.
                      </p>
                      <div className="flex flex-col md:flex-row gap-6 justify-center">
                        <div className="glass px-8 py-4 rounded-3xl">
                          <p className="text-xs font-bold text-primary mb-1 uppercase">Email</p>
                          <p className="font-medium">myselfkifal@gmail.com</p>
                        </div>
                        <div className="glass px-8 py-4 rounded-3xl">
                          <p className="text-xs font-bold text-primary mb-1 uppercase">Support</p>
                          <p className="font-medium">123456789</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </main>

        <Toast />

        <footer className="py-12 border-t border-white/5 text-center text-slate-500 text-sm">
          <p>© 2026 Zk Laptops. Precision Performance.</p>
        </footer>
      </div>
    </CartProvider>
  );
}

export default App;
