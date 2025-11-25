import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import Button from '../components/Button';
import { ArrowLeft, CreditCard } from 'lucide-react';

const Checkout: React.FC = () => {
  const { cartTotal, deliveryMode, deliveryFee, items } = useCart();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    address: '',
    city: '',
    postalCode: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/payment');
  };

  if (items.length === 0) {
    return (
      <div className="pt-32 pb-24 min-h-screen bg-dark-900 text-center flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold text-white mb-4">Votre panier est vide</h2>
        <Button onClick={() => navigate('/menu')}>Retour au menu</Button>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-24 min-h-screen bg-dark-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-400 hover:text-brand mb-8 transition-colors"
        >
          <ArrowLeft size={20} /> Retour
        </button>

        <h1 className="text-3xl md:text-5xl font-display font-bold text-white mb-12">
          FINALISER LA <span className="text-brand">COMMANDE</span>
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* Form */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-dark-800 p-8 rounded-lg border border-dark-700"
          >
            <h2 className="text-xl font-bold text-white mb-6 uppercase tracking-wide border-b border-dark-700 pb-2">
              Vos Coordonnées
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-400">Prénom</label>
                  <input 
                    required
                    type="text" 
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className="w-full bg-dark-900 border border-dark-700 rounded-md p-3 text-white focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand"
                    placeholder="Jean"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-400">Nom</label>
                  <input 
                    required
                    type="text" 
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className="w-full bg-dark-900 border border-dark-700 rounded-md p-3 text-white focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand"
                    placeholder="Dupont"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-400">Téléphone</label>
                <input 
                  required
                  type="tel" 
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full bg-dark-900 border border-dark-700 rounded-md p-3 text-white focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand"
                  placeholder="06 12 34 56 78"
                />
              </div>

              {deliveryMode === 'delivery' && (
                <>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-400">Adresse de livraison</label>
                    <input 
                      required
                      type="text" 
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      className="w-full bg-dark-900 border border-dark-700 rounded-md p-3 text-white focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand"
                      placeholder="10 Rue de la République"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-gray-400">Code Postal</label>
                      <input 
                        required
                        type="text" 
                        name="postalCode"
                        value={formData.postalCode}
                        onChange={handleInputChange}
                        className="w-full bg-dark-900 border border-dark-700 rounded-md p-3 text-white focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand"
                        placeholder="54000"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-gray-400">Ville</label>
                      <input 
                        required
                        type="text" 
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        className="w-full bg-dark-900 border border-dark-700 rounded-md p-3 text-white focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand"
                        placeholder="Nancy"
                      />
                    </div>
                  </div>
                </>
              )}

              <Button className="w-full py-4 mt-8 flex justify-center gap-2">
                PASSER AU PAIEMENT <CreditCard size={20} />
              </Button>
            </form>
          </motion.div>

          {/* Summary */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
             <div className="bg-dark-800 p-8 rounded-lg border border-dark-700">
                <h2 className="text-xl font-bold text-white mb-6 uppercase tracking-wide border-b border-dark-700 pb-2">
                  Récapitulatif
                </h2>
                <div className="space-y-4 max-h-64 overflow-y-auto mb-6 pr-2">
                  {items.map((item) => (
                    <div key={item.internalId} className="flex justify-between items-start text-sm">
                       <div>
                         <span className="text-white font-bold block">{item.name}</span>
                         {item.details && <span className="text-gray-500 text-xs">{item.details.join(', ')}</span>}
                       </div>
                       <span className="text-brand">{item.price.toFixed(2)}€</span>
                    </div>
                  ))}
                </div>

                <div className="border-t border-dark-700 pt-4 space-y-2 text-sm text-gray-400">
                   <div className="flex justify-between">
                     <span>Sous-total</span>
                     <span>{cartTotal.toFixed(2)}€</span>
                   </div>
                   <div className="flex justify-between">
                     <span>Mode</span>
                     <span className="uppercase font-bold text-white">{deliveryMode === 'delivery' ? 'Livraison' : 'À emporter'}</span>
                   </div>
                   {deliveryMode === 'delivery' && (
                     <div className="flex justify-between">
                       <span>Frais de livraison</span>
                       <span>{deliveryFee.toFixed(2)}€</span>
                     </div>
                   )}
                   <div className="flex justify-between text-2xl font-bold text-white pt-4 border-t border-dark-700 mt-4">
                     <span>TOTAL</span>
                     <span className="text-brand">{(cartTotal + deliveryFee).toFixed(2)}€</span>
                   </div>
                </div>
             </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;