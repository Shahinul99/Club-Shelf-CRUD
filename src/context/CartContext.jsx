import { createContext, useContext, useEffect, useMemo, useState } from 'react';

const CartContext = createContext(null);
const CART_STORAGE_KEY = 'club-shelf-cart';

function readCart() {
  try {
    const savedCart = JSON.parse(localStorage.getItem(CART_STORAGE_KEY) || '[]');
    return Array.isArray(savedCart) ? savedCart : [];
  } catch (error) {
    console.error('Could not read the saved cart:', error);
    return [];
  }
}

export function CartProvider({ children }) {
  const [items, setItems] = useState(readCart);

  useEffect(() => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const value = useMemo(() => ({
    items,
    addToCart(product) {
      setItems((current) => {
        const existing = current.find((item) => item.product._id === product._id);
        if (existing) {
          return current.map((item) => (
            item.product._id === product._id
              ? { ...item, quantity: Math.min(item.quantity + 1, Number(product.stock) || 1) }
              : item
          ));
        }
        return [...current, { product, quantity: 1 }];
      });
    },
    updateQuantity(id, quantity) {
      setItems((current) => current.map((item) => (
        item.product._id === id
          ? { ...item, quantity: Math.max(1, Math.min(quantity, Number(item.product.stock) || 1)) }
          : item
      )));
    },
    removeFromCart(id) {
      setItems((current) => current.filter((item) => item.product._id !== id));
    },
  }), [items]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used inside CartProvider');
  return context;
}
