
import { useState } from 'react';
import { Product } from '../types';

export const useCart = () => {
  const [cartItems, setCartItems] = useState<Product[]>([]);

  const addToCart = (product: Product) => {
    setCartItems([...cartItems, product]);
    console.log('Produto adicionado ao carrinho:', product.name);
  };

  const removeFromCart = (productId: number) => {
    setCartItems(cartItems.filter(item => item.id !== productId));
  };

  const getCartTotal = () => {
    return cartItems.reduce((total, item) => total + item.price, 0);
  };

  const getCartItemCount = () => {
    return cartItems.length;
  };

  return {
    cartItems,
    addToCart,
    removeFromCart,
    getCartTotal,
    getCartItemCount
  };
};
