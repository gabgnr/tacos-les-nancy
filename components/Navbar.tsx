import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ShoppingBag } from 'lucide-react';
import { NAV_ITEMS, APP_NAME } from '../constants';
import { useCart } from '../context/CartContext';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { setIsCartOpen, items } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  return (
    <nav 
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-dark-900/95 backdrop-blur-md shadow-lg py-4' : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 group">
           <img 
             src="https://lh3.googleusercontent.com/a-/ALV-UjXdel_6hI6udHcUO8sSQJWQdu36y_LC1eMIUB2_UN6k-ZJbqfKw=w90-h90-p-rp-mo-br100" 
             alt="Tacos Les Nancy Logo"
             className="w-12 h-12 rounded-full border-2 border-brand group-hover:border-white transition-all shadow-lg shadow-brand/20"
           />
           <span className="font-display font-bold text-2xl tracking-tight text-white group-hover:text-brand transition-colors">
             TACOS LES <span className="text-brand group-hover:text-white transition-colors">NANCY</span>
           </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-8">
          {NAV_ITEMS.map((item) => (
            <Link 
              key={item.path} 
              to={item.path}
              className={`text-sm font-semibold tracking-wide hover:text-brand transition-colors ${
                location.pathname === item.path ? 'text-brand' : 'text-gray-300'
              }`}
            >
              {item.label}
            </Link>
          ))}
          
          <button 
            onClick={() => setIsCartOpen(true)}
            className="flex items-center gap-2 bg-brand text-dark-900 px-4 py-2 rounded-sm font-bold text-sm hover:bg-white hover:scale-105 transition-all relative"
          >
            <ShoppingBag size={18} />
            <span>PANIER</span>
            {items.length > 0 && (
              <motion.span 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-2 -right-2 bg-red-600 text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full border-2 border-dark-900"
              >
                {items.length}
              </motion.span>
            )}
          </button>
        </div>

        {/* Mobile Toggle & Cart */}
        <div className="flex items-center gap-4 md:hidden">
          <button 
            onClick={() => setIsCartOpen(true)}
            className="text-white hover:text-brand relative"
          >
            <ShoppingBag size={24} />
            {items.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-brand text-dark-900 text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full">
                {items.length}
              </span>
            )}
          </button>
          
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="text-white hover:text-brand transition-colors"
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: '100vh' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden absolute top-full left-0 w-full bg-dark-900/95 backdrop-blur-xl border-t border-dark-700 overflow-hidden"
          >
            <div className="flex flex-col items-center justify-center h-full space-y-8 pb-32">
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className="text-2xl font-display font-bold text-white hover:text-brand"
                >
                  {item.label}
                </Link>
              ))}
              <button 
                onClick={() => {
                  setIsOpen(false);
                  setIsCartOpen(true);
                }}
                className="mt-8 px-8 py-3 bg-brand text-dark-900 font-bold text-lg rounded-sm"
              >
                MON PANIER ({items.length})
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;