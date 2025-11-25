import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Trash2, ShoppingBag, Bike, Store } from 'lucide-react';
import { useCart } from '../context/CartContext';
import Button from './Button';
import { useNavigate } from 'react-router-dom';

const CartDrawer: React.FC = () => {
  const { 
    isCartOpen, 
    setIsCartOpen, 
    items, 
    removeFromCart, 
    cartTotal, 
    deliveryMode, 
    setDeliveryMode,
    deliveryFee 
  } = useCart();
  
  const navigate = useNavigate();

  const handleCheckout = () => {
    setIsCartOpen(false);
    navigate('/checkout');
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCartOpen(false)}
            className="fixed inset-0 bg-black/60 z-[60] backdrop-blur-sm"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-dark-900 border-l border-dark-700 z-[70] shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="p-6 border-b border-dark-700 flex justify-between items-center bg-dark-800">
              <h2 className="text-xl font-display font-bold text-white flex items-center gap-2">
                <ShoppingBag className="text-brand" /> 
                PANIER <span className="text-gray-500 text-sm font-sans font-normal">({items.length} articles)</span>
              </h2>
              <button 
                onClick={() => setIsCartOpen(false)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            {/* Mode Toggle */}
            <div className="p-4 bg-dark-800/50">
              <div className="grid grid-cols-2 gap-2 bg-dark-900 p-1 rounded-lg border border-dark-700">
                <button
                  onClick={() => setDeliveryMode('delivery')}
                  className={`flex items-center justify-center gap-2 py-2 rounded-md font-bold text-sm transition-all ${
                    deliveryMode === 'delivery' 
                      ? 'bg-brand text-dark-900 shadow-lg' 
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  <Bike size={16} /> Livraison
                </button>
                <button
                  onClick={() => setDeliveryMode('takeaway')}
                  className={`flex items-center justify-center gap-2 py-2 rounded-md font-bold text-sm transition-all ${
                    deliveryMode === 'takeaway' 
                      ? 'bg-brand text-dark-900 shadow-lg' 
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  <Store size={16} /> À emporter
                </button>
              </div>
            </div>

            {/* Items List */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-gray-500 space-y-4">
                  <ShoppingBag size={48} className="opacity-20" />
                  <p>Votre panier est vide</p>
                  <Button variant="outline" onClick={() => setIsCartOpen(false)}>
                    Voir la carte
                  </Button>
                </div>
              ) : (
                items.map((item) => (
                  <motion.div 
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    key={item.internalId}
                    className="flex gap-4 bg-dark-800 p-4 rounded-lg border border-dark-700"
                  >
                    {item.image && (
                      <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-md" />
                    )}
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <h3 className="font-bold text-white text-sm">{item.name}</h3>
                        <span className="text-brand font-bold text-sm">{item.price.toFixed(2)}€</span>
                      </div>
                      
                      {item.details && item.details.length > 0 && (
                        <p className="text-xs text-gray-400 mt-1">
                          {item.details.join(', ')}
                        </p>
                      )}
                      
                      {item.description && !item.details && (
                        <p className="text-xs text-gray-400 mt-1 line-clamp-1">
                          {item.description}
                        </p>
                      )}
                    </div>
                    <button 
                      onClick={() => removeFromCart(item.internalId)}
                      className="text-gray-500 hover:text-red-500 transition-colors self-center p-2"
                    >
                      <Trash2 size={18} />
                    </button>
                  </motion.div>
                ))
              )}
            </div>

            {/* Footer / Total */}
            {items.length > 0 && (
              <div className="p-6 bg-dark-800 border-t border-dark-700 space-y-4">
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between text-gray-400">
                    <span>Sous-total</span>
                    <span>{cartTotal.toFixed(2)}€</span>
                  </div>
                  {deliveryMode === 'delivery' && (
                    <div className="flex justify-between text-gray-400">
                      <span>Frais de livraison</span>
                      <span>{deliveryFee.toFixed(2)}€</span>
                    </div>
                  )}
                  <div className="flex justify-between text-xl font-bold text-white pt-2 border-t border-dark-700">
                    <span>Total</span>
                    <span className="text-brand">{(cartTotal + deliveryFee).toFixed(2)}€</span>
                  </div>
                </div>
                
                <Button 
                  onClick={handleCheckout} 
                  className="w-full py-4 text-lg shadow-lg shadow-brand/20"
                >
                  COMMANDER
                </Button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartDrawer;