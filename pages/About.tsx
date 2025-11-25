import React from 'react';
import { motion } from 'framer-motion';
import { ChefHat, Heart, Award } from 'lucide-react';

const About: React.FC = () => {
  return (
    <div className="pt-32 pb-24 min-h-screen bg-dark-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Intro */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-32">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-6xl font-display font-bold text-white mb-8">
              PLUS QU'UN TACOS, <br />
              <span className="text-brand">UNE PASSION</span>
            </h1>
            <p className="text-gray-300 text-lg leading-relaxed mb-6">
              L'aventure Tacos Les Nancy a commencé avec une idée simple : proposer à Nancy le véritable Tacos Français, généreux et gourmand, loin des standards industriels.
            </p>
            <p className="text-gray-300 text-lg leading-relaxed mb-6">
              Situé Rue de Norvège, notre restaurant est devenu le point de rendez-vous des amateurs de street food de qualité. Notre secret ? Une sauce fromagère préparée chaque matin, des viandes marinées avec soin et une équipe passionnée.
            </p>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="absolute inset-0 bg-brand rounded-lg transform rotate-3" />
            <img 
              src="https://images.unsplash.com/photo-1556910103-1c02745a30bf?auto=format&fit=crop&q=80&w=800" 
              alt="Cuisine de restaurant" 
              className="relative rounded-lg shadow-2xl transform -rotate-3 transition-transform hover:rotate-0 duration-500"
            />
          </motion.div>
        </div>

        {/* Values */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="bg-dark-800 p-8 rounded-lg border-t-4 border-brand">
            <ChefHat size={48} className="text-brand mb-6" />
            <h3 className="text-2xl font-display font-bold text-white mb-4">Savoir-Faire</h3>
            <p className="text-gray-400">
              Nos cuisiniers maîtrisent l'art du pliage et de la cuisson parfaite. Chaque commande est préparée à la minute sous vos yeux.
            </p>
          </div>
          <div className="bg-dark-800 p-8 rounded-lg border-t-4 border-brand">
            <Heart size={48} className="text-brand mb-6" />
            <h3 className="text-2xl font-display font-bold text-white mb-4">Qualité</h3>
            <p className="text-gray-400">
              Pas de compromis. Nous sélectionnons nos fournisseurs pour garantir fraîcheur et goût authentique à chaque bouchée.
            </p>
          </div>
          <div className="bg-dark-800 p-8 rounded-lg border-t-4 border-brand">
            <Award size={48} className="text-brand mb-6" />
            <h3 className="text-2xl font-display font-bold text-white mb-4">Hygiène</h3>
            <p className="text-gray-400">
              Une cuisine impeccable et des normes de sécurité alimentaire strictes pour vous régaler en toute confiance.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default About;