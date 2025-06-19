
import React, { useState, useRef } from 'react';
import HomePage from './sections/HomePage';
import StatusBar from '../components/StatusBar';
import NavigationHeader from '../components/NavigationHeader';
import FavoritesPage from '../components/pages/FavoritesPage';
import CartPage from '../components/pages/CartPage';
import ProfilePage from '../components/pages/ProfilePage';
import GooeyNavigation from '../components/GooeyNavigation';
import { useCart } from '../hooks/useCart';
import { bestSellers, testimonials } from '../data/constants';
import { NavItem } from '../types';

const Index = () => {
  const [activeTab, setActiveTab] = useState('home');
  const { cartItems, addToCart, removeFromCart, getCartTotal, getCartItemCount } = useCart();
  const navRef = useRef<HTMLDivElement>(null);
  const blobRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  const navItems: NavItem[] = [
    { id: 'home', icon: null, emoji: '🏠' },
    { id: 'favorites', icon: null, emoji: '♡' },
    { id: 'cart', icon: null, emoji: '🛒' },
    { id: 'profile', icon: null, emoji: '☺' }
  ];

  const handleTabClick = (tabId: string, event: React.MouseEvent<HTMLButtonElement>) => {
    setActiveTab(tabId);
    
    if (navRef.current && blobRef.current && ctaRef.current) {
      const button = event.currentTarget;
      const wrapperRect = navRef.current.getBoundingClientRect();
      const buttonRect = button.getBoundingClientRect();
      const centerX = buttonRect.left - wrapperRect.left + buttonRect.width / 2;
      
      navRef.current.style.setProperty('--pos', `${centerX}px`);
      
      if (blobRef.current) {
        blobRef.current.classList.add('active');
        setTimeout(() => {
          if (blobRef.current) {
            blobRef.current.classList.remove('active');
          }
        }, 600);
      }
    }
  };

  const getActiveIcon = () => {
    const activeItem = navItems.find(item => item.id === activeTab);
    return activeItem ? activeItem.emoji : '⟳';
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'favorites':
        return <FavoritesPage bestSellers={bestSellers} onAddToCart={addToCart} />;
      case 'cart':
        return <CartPage cartItems={cartItems} onRemoveFromCart={removeFromCart} cartTotal={getCartTotal()} />;
      case 'profile':
        return <ProfilePage />;
      default:
        return <HomePage bestSellers={bestSellers} testimonials={testimonials} onAddToCart={addToCart} />;
    }
  };

  return (
    <div className="relative w-full max-w-sm mx-auto min-h-screen bg-gray-50 text-gray-800 font-sans overflow-hidden">
      <svg xmlns="http://www.w3.org/2000/svg" className="absolute w-0 h-0">
        <defs>
          <filter id="goo">
            <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur"/>
            <feColorMatrix in="blur" mode="matrix"
              values="1 0 0 0 0
                      0 1 0 0 0
                      0 0 1 0 0
                      0 0 0 20 -10" result="goo"/>
            <feBlend in="SourceGraphic" in2="goo"/>
          </filter>
        </defs>
      </svg>

      <StatusBar />
      <NavigationHeader cartItemCount={getCartItemCount()} />
      {renderContent()}
      <GooeyNavigation 
        activeTab={activeTab}
        cartItemCount={getCartItemCount()}
        onTabClick={handleTabClick}
        getActiveIcon={getActiveIcon}
      />

      <style>
        {`
        .blob.active {
          animation: gooey-pop 0.6s forwards;
        }
        @keyframes gooey-pop {
          0%   { transform: translateX(-50%) scale(1); }
          30%  { transform: translateX(-50%) scale(1.2); }
          60%  { transform: translateX(-50%) scale(0.9); }
          100% { transform: translateX(-50%) scale(1); }
        }
        `}
      </style>
    </div>
  );
};

export default Index;
