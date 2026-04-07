import React from 'react';
import { useCart } from '../context/CartContext';

const CartDrawer = ({ isOpen, onClose, onCheckout }) => {
  const { cart, removeFromCart, updateQuantity, totalPrice } = useCart();

  if (!isOpen) return null;

  return (
    <div 
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 1000,
        display: 'flex',
        justifyContent: 'flex-end'
      }}
    >
      {/* Backdrop */}
      <div 
        onClick={onClose}
        style={{ 
          position: 'absolute', 
          inset: 0, 
          background: 'rgba(0,0,0,0.6)', 
          backdropFilter: 'blur(4px)' 
        }} 
      />

      {/* Drawer Content */}
      <div 
        className="glass animate-fade"
        style={{
          width: '400px',
          height: '100%',
          position: 'relative',
          padding: '2rem',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '-10px 0 30px rgba(0,0,0,0.5)',
          borderLeft: '1px solid var(--border-glass)'
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '1.5rem' }}>Your Cart</h2>
          <button onClick={onClose} style={{ background: 'transparent', fontSize: '1.5rem' }}>✕</button>
        </div>

        <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {cart.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '3rem 0', color: 'var(--text-muted)' }}>
              Your cart is empty.
            </div>
          ) : (
            cart.map((item) => (
              <div key={item.id} style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                <img 
                  src={item.image} 
                  alt={item.name} 
                  style={{ width: '60px', height: '60px', objectFit: 'cover', borderRadius: '8px' }} 
                />
                <div style={{ flex: 1 }}>
                  <h4 style={{ fontSize: '1rem' }}>{item.name}</h4>
                  <div style={{ color: 'var(--accent)', fontWeight: 600 }}>${item.price}</div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'var(--bg-glass)', padding: '0.3rem', borderRadius: '8px' }}>
                  <button onClick={() => updateQuantity(item.id, -1)} style={{ background: 'transparent', padding: '0 5px' }}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.id, 1)} style={{ background: 'transparent', padding: '0 5px' }}>+</button>
                </div>
                <button onClick={() => removeFromCart(item.id)} style={{ background: 'transparent', color: '#ef4444' }}>🗑️</button>
              </div>
            ))
          )}
        </div>

        <div style={{ marginTop: '2rem', paddingTop: '2rem', borderTop: '1px solid var(--border-glass)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.25rem', fontWeight: 700, marginBottom: '1.5rem' }}>
            <span>Total</span>
            <span>${totalPrice}</span>
          </div>
          <button 
            disabled={cart.length === 0}
            onClick={onCheckout}
            style={{ 
              width: '100%', 
              padding: '1rem', 
              background: 'var(--primary)', 
              color: 'white',
              opacity: cart.length === 0 ? 0.5 : 1,
              cursor: cart.length === 0 ? 'not-allowed' : 'pointer'
            }}
          >
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartDrawer;
