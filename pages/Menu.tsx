import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import MenuCard from '../components/MenuCard';
import { MENU_ITEMS } from '../constants';

const categories = [
  { id: 'all', label: 'Tout' },
  { id: 'tacos', label: 'Nos Tacos' },
  { id: 'burgers', label: 'Burgers' },
  { id: 'assiettes', label: 'Assiettes' },
  { id: 'texmex', label: 'Tex Mex' },
  { id: 'desserts', label: 'Desserts' },
];

const Menu: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('all');

  const filteredItems = activeCategory === 'all' 
    ? MENU_ITEMS 
    : MENU_ITEMS.filter(item => item.category === activeCategory);

  return (
    <div className="pt-32 pb-24 min-h-screen bg-dark-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-display font-bold text-white mb-6"
          >
            LA CARTE
          </motion.h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Découvrez nos créations. Des classiques indémodables aux nouveautés audacieuses.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-4 mb-16">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-6 py-2 rounded-full font-bold text-sm transition-all duration-300 border-2 ${
                activeCategory === cat.id 
                  ? 'bg-brand text-dark-900 border-brand' 
                  : 'bg-transparent text-gray-400 border-dark-700 hover:border-brand hover:text-white'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence>
            {filteredItems.map(item => (
              <MenuCard key={item.id} item={item} />
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredItems.length === 0 && (
          <div className="text-center text-gray-500 py-20">
            Aucun produit dans cette catégorie pour le moment.
          </div>
        )}

      </div>
    </div>
  );
};

export default Menu;
