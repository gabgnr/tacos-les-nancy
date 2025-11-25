import React from 'react';
import { Facebook, Instagram, MapPin, Phone } from 'lucide-react';
import { ADDRESS, APP_NAME, PHONE, FACEBOOK_URL } from '../constants';

const Footer: React.FC = () => {
  return (
    <footer className="bg-dark-800 border-t border-dark-700 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          
          {/* Brand */}
          <div className="space-y-4">
            <h3 className="text-2xl font-display font-bold text-white">
              {APP_NAME}
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
              L'excellence du street food à Nancy. Des produits frais, des recettes originales et une passion pour le goût depuis notre ouverture.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 rounded-full bg-dark-700 flex items-center justify-center hover:bg-brand hover:text-dark-900 transition-all">
                <Instagram size={20} />
              </a>
              <a href={FACEBOOK_URL} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-dark-700 flex items-center justify-center hover:bg-brand hover:text-dark-900 transition-all">
                <Facebook size={20} />
              </a>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="text-lg font-bold text-brand uppercase tracking-wider">Nous Trouver</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-gray-300">
                <MapPin className="text-brand shrink-0 mt-1" size={18} />
                <span>{ADDRESS}</span>
              </li>
              <li className="flex items-center gap-3 text-gray-300">
                <Phone className="text-brand shrink-0" size={18} />
                <a href={`tel:${PHONE.replace(/\s/g, '')}`} className="hover:text-brand transition-colors">
                  {PHONE}
                </a>
              </li>
            </ul>
          </div>

          {/* Hours */}
          <div className="space-y-4">
            <h4 className="text-lg font-bold text-brand uppercase tracking-wider">Horaires</h4>
            <ul className="space-y-2 text-gray-300">
              <li className="flex justify-between border-b border-dark-700 pb-2">
                <span>Lundi - Jeudi</span>
                <span className="font-bold">11:00 - 23:00</span>
              </li>
              <li className="flex justify-between border-b border-dark-700 pb-2">
                <span>Vendredi - Samedi</span>
                <span className="font-bold">11:00 - 00:00</span>
              </li>
              <li className="flex justify-between pb-2">
                <span>Dimanche</span>
                <span className="font-bold">12:00 - 23:00</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-dark-700 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500">
          <p>© {new Date().getFullYear()} {APP_NAME}. Tous droits réservés.</p>
          <div className="flex space-x-6">
            <a href="#" className="hover:text-white transition-colors">Mentions Légales</a>
            <a href="#" className="hover:text-white transition-colors">Confidentialité</a>
            <a href="#" className="hover:text-white transition-colors">CGV</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;