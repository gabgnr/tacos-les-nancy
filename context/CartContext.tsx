import React, { createContext, useContext, useState, ReactNode } from 'react';

export type CartItem = {
  internalId: string;
  id: string; // Product ID (e.g., 't-1')
  name: string;
  price: number;
  image?: string;
  details?: string[]; // For custom tacos (e.g., "Sauce Algérienne", "Viande Hachée")
  description?: string;
};

type DeliveryMode = 'delivery' | 'takeaway';

interface CartContextType {
  items: CartItem[];
  addToCart: (item: Omit<CartItem, 'internalId'>) => void;
  removeFromCart: (internalId: string) => void;
  clearCart: () => void;
  cartTotal: number;
  isCartOpen: boolean;
  setIsCartOpen: (isOpen: boolean) => void;
  deliveryMode: DeliveryMode;
  setDeliveryMode: (mode: DeliveryMode) => void;
  deliveryFee: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [deliveryMode, setDeliveryMode] = useState<DeliveryMode>('delivery');

  const addToCart = (item: Omit<CartItem, 'internalId'>) => {
    const newItem = { ...item, internalId: Date.now().toString() + Math.random() };
    setItems((prev) => [...prev, newItem]);
    setIsCartOpen(true);
  };

  const removeFromCart = (internalId: string) => {
    setItems((prev) => prev.filter((item) => item.internalId !== internalId));
  };

  const clearCart = () => {
    setItems([]);
  };

  const cartTotal = items.reduce((acc, item) => acc + item.price, 0);
  const deliveryFee = deliveryMode === 'delivery' ? 2.50 : 0;

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        clearCart,
        cartTotal,
        isCartOpen,
        setIsCartOpen,
        deliveryMode,
        setDeliveryMode,
        deliveryFee,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};