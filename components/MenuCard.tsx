import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MenuItem } from '../types';
import { Plus, Check } from 'lucide-react';
import { useCart } from '../context/CartContext';

const MenuCard: React.FC<{ item: MenuItem }> = ({ item }) => {
  const { addToCart } = useCart();
  const [isAdded, setIsAdded] = useState(false);

  const handleAdd = () => {
    addToCart({
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image,
      description: item.description
    });
    
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1500);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group relative bg-dark-800 rounded-lg overflow-hidden border border-dark-700 hover:border-brand/50 transition-all duration-300 shadow-lg hover:shadow-brand/10"
    >
      {item.popular && (
        <div className="absolute top-4 left-4 z-10 bg-brand text-dark-900 text-xs font-bold px-3 py-1 uppercase rounded-sm shadow-md">
          Populaire
        </div>
      )}
      
      <div className="relative h-48 overflow-hidden">
        <img 
          src={item.image} 
          alt={item.name} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-transparent to-transparent opacity-80" />
      </div>

      <div className="p-6 relative">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-display font-bold text-white group-hover:text-brand transition-colors">
            {item.name}
          </h3>
          <span className="text-lg font-bold text-brand bg-brand/10 px-2 py-1 rounded">
            {item.price.toFixed(2)}€
          </span>
        </div>
        
        <p className="text-gray-400 text-sm mb-6 line-clamp-2 h-10">
          {item.description}
        </p>

        <button 
          onClick={handleAdd}
          className={`w-full flex items-center justify-center gap-2 py-3 rounded-sm font-semibold text-sm transition-all duration-300 ${
            isAdded 
              ? 'bg-green-500 text-white hover:bg-green-600' 
              : 'bg-dark-700 hover:bg-white text-white hover:text-dark-900'
          }`}
        >
          {isAdded ? (
            <>
              <span>AJOUTÉ</span>
              <Check size={16} />
            </>
          ) : (
            <>
              <span>COMMANDER</span>
              <Plus size={16} />
            </>
          )}
        </button>
      </div>
    </motion.div>
  );
};

export default MenuCard;