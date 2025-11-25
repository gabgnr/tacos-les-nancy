import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Clock } from 'lucide-react';
import Button from '../components/Button';
import { ADDRESS, PHONE } from '../constants';

const Contact: React.FC = () => {
  return (
    <div className="pt-32 pb-24 min-h-screen bg-dark-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-display font-bold text-white mb-6">NOUS TROUVER</h1>
          <p className="text-gray-400">Venez déguster nos spécialités sur place ou à emporter.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 bg-dark-800 rounded-2xl overflow-hidden shadow-2xl">
          
          {/* Info Section */}
          <div className="p-10 lg:p-16 flex flex-col justify-center">
            <h2 className="text-3xl font-display font-bold text-brand mb-8">TACOS LES NANCY</h2>
            
            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-dark-700 flex items-center justify-center text-brand shrink-0">
                  <MapPin size={24} />
                </div>
                <div>
                  <h3 className="text-white font-bold text-lg mb-1">Adresse</h3>
                  <p className="text-gray-400">{ADDRESS}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-dark-700 flex items-center justify-center text-brand shrink-0">
                  <Phone size={24} />
                </div>
                <div>
                  <h3 className="text-white font-bold text-lg mb-1">Téléphone</h3>
                  <a 
                    href={`tel:${PHONE.replace(/\s/g, '')}`} 
                    className="text-gray-400 hover:text-brand transition-colors"
                  >
                    {PHONE}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-dark-700 flex items-center justify-center text-brand shrink-0">
                  <Clock size={24} />
                </div>
                <div>
                  <h3 className="text-white font-bold text-lg mb-1">Horaires</h3>
                  <div className="text-gray-400 space-y-1">
                    <div className="flex justify-between w-full max-w-xs">
                      <span>Lun - Jeu</span>
                      <span>11:00 - 23:00</span>
                    </div>
                    <div className="flex justify-between w-full max-w-xs">
                      <span>Ven - Sam</span>
                      <span>11:00 - 00:00</span>
                    </div>
                    <div className="flex justify-between w-full max-w-xs">
                      <span>Dimanche</span>
                      <span>12:00 - 23:00</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-12">
               <a href={`tel:${PHONE.replace(/\s/g, '')}`}>
                 <Button className="w-full sm:w-auto">Appeler maintenant</Button>
               </a>
            </div>
          </div>

          {/* Google Maps Iframe */}
          <div className="relative h-96 lg:h-auto bg-dark-700 min-h-[400px]">
             <iframe 
               width="100%" 
               height="100%" 
               frameBorder="0" 
               scrolling="no" 
               marginHeight={0} 
               marginWidth={0} 
               src="https://maps.google.com/maps?q=9+Rue+de+Rémich,+54500+Vandoeuvre-lès-Nancy&t=&z=15&ie=UTF8&iwloc=&output=embed"
               className="w-full h-full grayscale hover:grayscale-0 transition-all duration-500"
               title="Google Map Tacos Les Nancy"
             ></iframe>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Contact;