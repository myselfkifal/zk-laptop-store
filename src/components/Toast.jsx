import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { CheckCircle } from 'lucide-react';

const Toast = () => {
  const { toast } = useCart();

  return (
    <AnimatePresence>
      {toast && (
        <motion.div
          initial={{ opacity: 0, y: 50, x: '-50%' }}
          animate={{ opacity: 1, y: 0, x: '-50%' }}
          exit={{ opacity: 0, y: 20, x: '-50%' }}
          className="fixed bottom-8 left-1/2 z-[100] flex items-center gap-3 glass px-6 py-3 rounded-full text-sm font-medium border-accent/20"
        >
          <CheckCircle className="w-4 h-4 text-accent" />
          {toast}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Toast;
