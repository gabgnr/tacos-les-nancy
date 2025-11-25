import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { CheckCircle, Lock, Loader } from 'lucide-react';

const Payment: React.FC = () => {
  const { cartTotal, deliveryFee, clearCart } = useCart();
  const navigate = useNavigate();
  const [processing, setProcessing] = useState(false);
  const [success, setSuccess] = useState(false);

  const total = (cartTotal + deliveryFee).toFixed(2);

  const handlePayment = (e: React.FormEvent) => {
    e.preventDefault();
    setProcessing(true);

    // Simulate API call
    setTimeout(() => {
      setProcessing(false);
      setSuccess(true);
      clearCart();
    }, 2500);
  };

  return (
    <div className="min-h-screen bg-dark-900 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <AnimatePresence mode="wait">
          {!success ? (
            <motion.div
              key="payment-form"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-2xl shadow-2xl overflow-hidden"
            >
              {/* Header */}
              <div className="bg-dark-800 p-6 text-center border-b border-dark-700">
                <h1 className="text-xl font-bold text-white">Paiement Sécurisé</h1>
                <p className="text-brand text-2xl font-bold mt-2">{total}€</p>
              </div>

              {/* Form */}
              <form onSubmit={handlePayment} className="p-8 space-y-6">
                
                {/* Visual Card */}
                <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-xl p-6 text-white shadow-lg mb-8 relative overflow-hidden">
                  <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-white/10 rounded-full blur-xl" />
                  <div className="flex justify-between items-start mb-8">
                    <div className="w-12 h-8 bg-yellow-500/80 rounded-md" />
                    <span className="font-mono text-sm opacity-50">CREDIT</span>
                  </div>
                  <div className="space-y-4">
                    <div className="font-mono text-xl tracking-widest">•••• •••• •••• 4242</div>
                    <div className="flex justify-between text-xs opacity-70 uppercase">
                      <span>Titulaire</span>
                      <span>EXP</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Numéro de carte</label>
                    <input type="text" placeholder="0000 0000 0000 0000" className="w-full border-b-2 border-gray-200 py-2 focus:border-brand focus:outline-none transition-colors" required />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Date d'exp.</label>
                      <input type="text" placeholder="MM/YY" className="w-full border-b-2 border-gray-200 py-2 focus:border-brand focus:outline-none transition-colors" required />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-500 uppercase mb-1">CVC</label>
                      <input type="text" placeholder="123" className="w-full border-b-2 border-gray-200 py-2 focus:border-brand focus:outline-none transition-colors" required />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Nom sur la carte</label>
                    <input type="text" placeholder="JEAN DUPONT" className="w-full border-b-2 border-gray-200 py-2 focus:border-brand focus:outline-none transition-colors" required />
                  </div>
                </div>

                <button 
                  type="submit" 
                  disabled={processing}
                  className="w-full bg-brand text-dark-900 font-bold py-4 rounded-lg shadow-lg hover:shadow-xl transition-all disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center gap-2"
                >
                  {processing ? (
                    <><Loader className="animate-spin" size={20} /> Traitement...</>
                  ) : (
                    <><Lock size={18} /> Payer {total}€</>
                  )}
                </button>
              </form>
            </motion.div>
          ) : (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-2xl shadow-2xl p-10 text-center"
            >
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 text-green-500">
                <CheckCircle size={48} />
              </div>
              <h2 className="text-2xl font-bold text-dark-900 mb-2">Paiement Réussi !</h2>
              <p className="text-gray-500 mb-8">Votre commande a été confirmée. <br/>Préparez vos papilles.</p>
              <button 
                onClick={() => navigate('/')}
                className="bg-dark-900 text-white px-8 py-3 rounded-full font-bold hover:bg-brand hover:text-dark-900 transition-all"
              >
                Retour à l'accueil
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Payment;