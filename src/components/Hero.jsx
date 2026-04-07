import React from 'react';
import { motion } from 'framer-motion';

const Hero = ({ onShopNow }) => {
  return (
    <section className="relative py-24 overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-primary/5 blur-[120px] rounded-full -z-10" />
      
      <div className="max-w-7xl mx-auto px-6 text-center">
        <motion.h1 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8 leading-[1.1]"
        >
          Elevate Your <br />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
            Digital Workflow
          </span>
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-12"
        >
          Experience the pinnacle of portable computing with Zk. Engineered for creators, built for gamers, designed for the future.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <button 
            onClick={onShopNow}
            className="group relative inline-flex items-center justify-center btn-primary !px-10 !py-4 overflow-hidden"
          >
            <span className="relative z-10">Start Exploring</span>
            <div className="absolute inset-0 bg-gradient-to-r from-primary-hover to-accent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
