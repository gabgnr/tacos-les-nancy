import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronLeft, Check, ShoppingBag, RotateCcw } from 'lucide-react';
import Button from '../components/Button';
import { BUILDER_DATA } from '../constants';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

// Animation variants
const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 1000 : -1000,
    opacity: 0
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1
  },
  exit: (direction: number) => ({
    zIndex: 0,
    x: direction < 0 ? 1000 : -1000,
    opacity: 0
  })
};

const Builder: React.FC = () => {
  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState(0);
  const { addToCart } = useCart();
  const navigate = useNavigate();
  
  // Selection State
  const [size, setSize] = useState<typeof BUILDER_DATA.sizes[0] | null>(null);
  const [meats, setMeats] = useState<string[]>([]);
  const [sauces, setSauces] = useState<string[]>(['fromagere']);
  const [extras, setExtras] = useState<string[]>([]);

  // Steps Configuration
  const steps = [
    { title: "Choisissez la taille", subtitle: "Quelle est votre faim aujourd'hui ?" },
    { title: "Vos viandes", subtitle: size ? `Sélectionnez jusqu'à ${size.meatCount} viandes` : "Sélectionnez vos viandes" },
    { title: "Les sauces", subtitle: "Sauce fromagère incluse. Ajoutez du goût !" },
    { title: "Suppléments", subtitle: "Pour les plus gourmands (optionnel)" },
    { title: "Récapitulatif", subtitle: "Votre chef d'œuvre est prêt" }
  ];

  // Logic Handlers
  const handleNext = () => {
    if (step === 0 && !size) return;
    if (step === 1 && meats.length === 0) return;
    setDirection(1);
    setStep(prev => prev + 1);
  };

  const handleBack = () => {
    setDirection(-1);
    setStep(prev => prev - 1);
  };

  const toggleMeat = (meatId: string) => {
    if (!size) return;
    if (meats.includes(meatId)) {
      setMeats(meats.filter(m => m !== meatId));
    } else {
      if (meats.length < size.meatCount) {
        setMeats([...meats, meatId]);
      }
    }
  };

  const toggleSauce = (sauceId: string) => {
    if (sauceId === 'fromagere') return; // Cannot remove base sauce
    if (sauces.includes(sauceId)) {
      setSauces(sauces.filter(s => s !== sauceId));
    } else {
      if (sauces.length < 3) { // Limit to 2 extra sauces + fromagere
        setSauces([...sauces, sauceId]);
      }
    }
  };

  const toggleExtra = (extraId: string) => {
    if (extras.includes(extraId)) {
      setExtras(extras.filter(e => e !== extraId));
    } else {
      setExtras([...extras, extraId]);
    }
  };

  // Price Calculation
  const calculateTotal = () => {
    let total = size ? size.price : 0;
    extras.forEach(extraId => {
      const extra = BUILDER_DATA.extras.find(e => e.id === extraId);
      if (extra) total += extra.price;
    });
    return total;
  };

  const resetBuilder = () => {
    setStep(0);
    setSize(null);
    setMeats([]);
    setSauces(['fromagere']);
    setExtras([]);
  };

  const handleAddToCart = () => {
    if (!size) return;
    
    // Construct detail strings
    const meatNames = meats.map(m => BUILDER_DATA.meats.find(x => x.id === m)?.name).filter(Boolean) as string[];
    const sauceNames = sauces.map(s => BUILDER_DATA.sauces.find(x => x.id === s)?.name).filter(Boolean) as string[];
    const extraNames = extras.map(e => BUILDER_DATA.extras.find(x => x.id === e)?.name).filter(Boolean) as string[];
    
    const allDetails = [...meatNames, ...sauceNames, ...extraNames];

    addToCart({
      id: `custom-${size.id}`,
      name: `Tacos ${size.name}`,
      price: calculateTotal(),
      details: allDetails,
      description: "Tacos composé sur mesure"
    });

    // Reset and maybe navigate or show success
    resetBuilder();
    navigate('/menu');
  };

  return (
    <div className="pt-28 pb-20 min-h-screen bg-dark-900 overflow-hidden flex flex-col">
      <div className="max-w-5xl mx-auto px-4 w-full flex-grow flex flex-col">
        
        {/* Header & Progress */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl md:text-5xl font-display font-bold text-white mb-2">
            COMPOSEZ VOTRE <span className="text-brand">LÉGENDE</span>
          </h1>
          <p className="text-gray-400 mb-6">{steps[step].subtitle}</p>
          
          <div className="w-full h-1 bg-dark-700 rounded-full mb-8 relative overflow-hidden">
            <motion.div 
              className="h-full bg-brand"
              initial={{ width: 0 }}
              animate={{ width: `${((step + 1) / steps.length) * 100}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>

        {/* Dynamic Content Area */}
        <div className="relative flex-grow min-h-[400px]">
          <AnimatePresence initial={false} custom={direction} mode="wait">
            
            {/* Step 0: Size */}
            {step === 0 && (
              <motion.div 
                key="step0"
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="absolute inset-0 w-full"
              >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {BUILDER_DATA.sizes.map((option) => (
                    <div 
                      key={option.id}
                      onClick={() => {
                        setSize(option);
                        setMeats([]); // Reset meats if size changes
                      }}
                      className={`cursor-pointer group relative p-8 rounded-xl border-2 transition-all duration-300 flex flex-col items-center justify-center text-center gap-4 hover:shadow-lg hover:shadow-brand/10 ${
                        size?.id === option.id 
                          ? 'bg-brand/10 border-brand' 
                          : 'bg-dark-800 border-dark-700 hover:border-brand/50'
                      }`}
                    >
                      <div className="text-4xl font-display font-bold text-white group-hover:text-brand transition-colors">
                        {option.name}
                      </div>
                      <div className="text-brand font-bold text-xl">{option.price.toFixed(2)}€</div>
                      <p className="text-gray-400 text-sm">{option.desc}</p>
                      <div className="text-xs uppercase tracking-widest font-bold text-gray-500 mt-2">
                        {option.meatCount} Viande{option.meatCount > 1 ? 's' : ''}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Step 1: Meats */}
            {step === 1 && (
              <motion.div 
                key="step1"
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="absolute inset-0 w-full"
              >
                 <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {BUILDER_DATA.meats.map((meat) => {
                    const isSelected = meats.includes(meat.id);
                    const isDisabled = !isSelected && meats.length >= (size?.meatCount || 1);

                    return (
                      <button
                        key={meat.id}
                        onClick={() => toggleMeat(meat.id)}
                        disabled={isDisabled}
                        className={`p-6 rounded-lg border-2 transition-all text-center font-bold ${
                          isSelected 
                            ? 'bg-brand text-dark-900 border-brand scale-105 shadow-lg shadow-brand/20' 
                            : isDisabled
                              ? 'bg-dark-800 border-dark-700 text-dark-700 cursor-not-allowed opacity-50'
                              : 'bg-dark-800 border-dark-700 text-gray-300 hover:border-brand/50 hover:text-white'
                        }`}
                      >
                        {meat.name}
                        {isSelected && <Check size={16} className="inline-block ml-2" />}
                      </button>
                    );
                  })}
                 </div>
                 <p className="text-center mt-6 text-brand">
                   {meats.length} / {size?.meatCount} viandes sélectionnées
                 </p>
              </motion.div>
            )}

            {/* Step 2: Sauces */}
            {step === 2 && (
              <motion.div 
                key="step2"
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="absolute inset-0 w-full"
              >
                 <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {BUILDER_DATA.sauces.map((sauce) => {
                    const isSelected = sauces.includes(sauce.id);
                    const isRequired = sauce.required;

                    return (
                      <button
                        key={sauce.id}
                        onClick={() => toggleSauce(sauce.id)}
                        disabled={isRequired}
                        className={`p-6 rounded-lg border-2 transition-all text-center font-bold relative overflow-hidden ${
                          isRequired
                            ? 'bg-brand/20 border-brand/50 text-brand cursor-default'
                            : isSelected 
                              ? 'bg-brand text-dark-900 border-brand shadow-lg shadow-brand/20' 
                              : 'bg-dark-800 border-dark-700 text-gray-300 hover:border-brand/50 hover:text-white'
                        }`}
                      >
                        {sauce.name}
                        {isSelected && <Check size={16} className="inline-block ml-2" />}
                        {isRequired && <span className="absolute top-1 right-2 text-[10px] uppercase">Incluse</span>}
                      </button>
                    );
                  })}
                 </div>
              </motion.div>
            )}

            {/* Step 3: Extras */}
            {step === 3 && (
              <motion.div 
                key="step3"
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="absolute inset-0 w-full"
              >
                 <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {BUILDER_DATA.extras.map((extra) => {
                    const isSelected = extras.includes(extra.id);

                    return (
                      <button
                        key={extra.id}
                        onClick={() => toggleExtra(extra.id)}
                        className={`p-6 rounded-lg border-2 transition-all text-center font-bold flex flex-col items-center justify-center gap-2 ${
                          isSelected 
                            ? 'bg-brand text-dark-900 border-brand shadow-lg shadow-brand/20' 
                            : 'bg-dark-800 border-dark-700 text-gray-300 hover:border-brand/50 hover:text-white'
                        }`}
                      >
                        <span>{extra.name}</span>
                        <span className={`text-xs px-2 py-1 rounded-full ${isSelected ? 'bg-dark-900/20' : 'bg-dark-900 text-brand'}`}>
                          +{extra.price.toFixed(2)}€
                        </span>
                      </button>
                    );
                  })}
                 </div>
              </motion.div>
            )}

            {/* Step 4: Summary */}
            {step === 4 && (
              <motion.div 
                key="step4"
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="absolute inset-0 w-full flex flex-col items-center"
              >
                 <div className="bg-white text-dark-900 p-8 rounded-lg shadow-2xl max-w-md w-full relative">
                   <div className="absolute top-0 left-0 w-full h-2 bg-brand" />
                   
                   <h2 className="text-3xl font-display font-bold mb-6 text-center border-b border-gray-200 pb-4">
                     VOTRE TACOS
                   </h2>

                   <div className="space-y-4 mb-8">
                     <div className="flex justify-between font-bold text-lg">
                       <span>{size?.name}</span>
                       <span>{size?.price.toFixed(2)}€</span>
                     </div>
                     
                     <div className="pl-4 border-l-2 border-brand/50 space-y-2 text-sm text-gray-600">
                        <div className="flex flex-wrap gap-2">
                          <span className="font-semibold text-dark-900">Viandes:</span> 
                          {meats.map(m => BUILDER_DATA.meats.find(x => x.id === m)?.name).join(', ')}
                        </div>
                        <div className="flex flex-wrap gap-2">
                          <span className="font-semibold text-dark-900">Sauces:</span>
                          {sauces.map(s => BUILDER_DATA.sauces.find(x => x.id === s)?.name).join(', ')}
                        </div>
                        {extras.length > 0 && (
                          <div className="flex flex-col gap-1 mt-2">
                            <span className="font-semibold text-dark-900">Suppléments:</span>
                            {extras.map(e => {
                              const item = BUILDER_DATA.extras.find(x => x.id === e);
                              return (
                                <div key={e} className="flex justify-between">
                                  <span>- {item?.name}</span>
                                  <span>+{item?.price.toFixed(2)}€</span>
                                </div>
                              );
                            })}
                          </div>
                        )}
                     </div>

                     <div className="flex justify-between items-center text-2xl font-bold pt-4 border-t border-gray-200 mt-4">
                       <span>TOTAL</span>
                       <span className="text-brand-dark">{calculateTotal().toFixed(2)}€</span>
                     </div>
                   </div>

                   <div className="space-y-3">
                     <Button onClick={handleAddToCart} className="w-full flex justify-center gap-2">
                         <ShoppingBag size={20} />
                         AJOUTER AU PANIER
                     </Button>
                     
                     <button 
                       onClick={resetBuilder}
                       className="w-full py-3 text-sm text-gray-500 hover:text-dark-900 flex justify-center items-center gap-2 transition-colors"
                     >
                       <RotateCcw size={16} /> Recommencer
                     </button>
                   </div>

                 </div>
              </motion.div>
            )}

          </AnimatePresence>
        </div>

        {/* Footer Navigation Controls */}
        <div className="mt-8 flex justify-between items-center pt-8 border-t border-dark-800">
           {step > 0 && step < 4 && (
             <button 
               onClick={handleBack}
               className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
             >
               <ChevronLeft size={20} /> Précédent
             </button>
           )}
           {step === 0 && <div />} {/* Spacer */}

           {step < 4 && (
             <Button 
               onClick={handleNext} 
               disabled={
                 (step === 0 && !size) || 
                 (step === 1 && meats.length === 0)
               }
               className={
                 (step === 0 && !size) || (step === 1 && meats.length === 0) 
                 ? "opacity-50 cursor-not-allowed grayscale" 
                 : ""
               }
             >
               {step === 3 ? 'Terminer' : 'Suivant'} <ChevronRight size={20} className="ml-1" />
             </Button>
           )}
        </div>

      </div>
    </div>
  );
};

export default Builder;