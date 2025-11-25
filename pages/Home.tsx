import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, Truck, ShieldCheck, Flame } from 'lucide-react';
import Button from '../components/Button';
import MenuCard from '../components/MenuCard';
import { MENU_ITEMS, TESTIMONIALS } from '../constants';
import { useCart } from '../context/CartContext';

const Home: React.FC = () => {
  const featuredItems = MENU_ITEMS.filter(item => item.popular).slice(0, 3);
  const { setIsCartOpen } = useCart();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
           <img 
             src="https://images.unsplash.com/photo-1551782450-a2132b4ba21d?auto=format&fit=crop&q=80&w=1920" 
             alt="French Tacos Delicious" 
             className="w-full h-full object-cover opacity-30"
           />
           <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-dark-900/60 to-dark-900/30" />
        </div>

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-brand font-bold tracking-[0.2em] uppercase mb-4 block"
          >
            Nancy • Depuis 2018
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-5xl md:text-7xl lg:text-8xl font-display font-bold text-white mb-6 leading-tight"
          >
            LE VRAI GOÛT <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand to-brand-light">DU STREET FOOD</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto mb-10 font-light"
          >
            Une expérience culinaire unique, préparée avec passion. Des produits frais, une sauce fromagère signature et un savoir-faire authentique pour combler toutes vos envies.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link to="/menu">
              <Button>Commander maintenant</Button>
            </Link>
            <Link to="/builder">
              <Button variant="outline">Créer mon tacos</Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Features Banner */}
      <div className="bg-brand py-8 relative z-20 -mt-20 sm:-mt-0">
        <div className="max-w-7xl mx-auto px-4 flex flex-wrap justify-around items-center gap-6 text-dark-900">
          <div className="flex items-center gap-3 font-bold font-display uppercase tracking-wider">
            <Flame size={24} /> <span>Sauce Maison</span>
          </div>
          <div className="flex items-center gap-3 font-bold font-display uppercase tracking-wider">
            <ShieldCheck size={24} /> <span>Produits Frais</span>
          </div>
          <div className="flex items-center gap-3 font-bold font-display uppercase tracking-wider">
            <Truck size={24} /> <span>Livraison Rapide</span>
          </div>
        </div>
      </div>

      {/* Favorites Section */}
      <section className="py-24 bg-dark-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">NOS INCONTOURNABLES</h2>
            <div className="w-24 h-1 bg-brand mx-auto rounded-full" />
            <p className="mt-4 text-gray-400">Les recettes qui ont fait notre réputation à Nancy</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredItems.map(item => (
              <MenuCard key={item.id} item={item} />
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/menu">
              <Button variant="ghost" icon={<ArrowRight size={18} />}>
                Découvrir toute la carte
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Immersive Image Section */}
      <section className="py-24 relative bg-fixed bg-cover bg-center" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1460306855393-0410f61241c7?auto=format&fit=crop&q=80&w=1920)' }}>
        <div className="absolute inset-0 bg-dark-900/80" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-6">
            FAIM DE LOUP OU PETITE FAIM ?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Composez votre Tacos de A à Z. Taille M, L ou XL, choisissez vos viandes, vos suppléments et créez votre légende.
          </p>
          <Link to="/builder">
             <Button variant="primary">Je crée mon tacos</Button>
          </Link>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-dark-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">ILS ONT KIFFÉ</h2>
            <div className="w-24 h-1 bg-brand mx-auto rounded-full" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TESTIMONIALS.map(t => (
              <motion.div 
                key={t.id}
                whileHover={{ y: -5 }}
                className="bg-dark-700 p-8 rounded-lg border border-dark-700 hover:border-brand/30 transition-all"
              >
                <div className="flex gap-1 text-brand mb-4">
                  {[...Array(t.rating)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
                </div>
                <p className="text-gray-300 mb-6 italic">"{t.comment}"</p>
                <div className="font-bold text-white font-display uppercase tracking-wide">
                  — {t.name}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;