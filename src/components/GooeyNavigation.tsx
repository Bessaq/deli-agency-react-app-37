
import React, { useRef } from 'react';
import { Home, Heart, ShoppingCart, User } from 'lucide-react';
import { NavItem } from '../types';

interface GooeyNavigationProps {
  activeTab: string;
  cartItemCount: number;
  onTabClick: (tabId: string, event: React.MouseEvent<HTMLButtonElement>) => void;
  getActiveIcon: () => string;
}

const GooeyNavigation: React.FC<GooeyNavigationProps> = ({ 
  activeTab, 
  cartItemCount, 
  onTabClick, 
  getActiveIcon 
}) => {
  const navRef = useRef<HTMLDivElement>(null);
  const blobRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  const navItems: NavItem[] = [
    { id: 'home', icon: Home, emoji: '🏠' },
    { id: 'favorites', icon: Heart, emoji: '♡' },
    { id: 'cart', icon: ShoppingCart, emoji: '🛒' },
    { id: 'profile', icon: User, emoji: '☺' }
  ];

  return (
    <div 
      ref={navRef}
      className="fixed bottom-0 left-0 right-0 w-full max-w-sm mx-auto h-20"
      style={{ '--pos': '50%' } as React.CSSProperties}
    >
      <div className="relative w-full h-full" style={{ filter: 'url(#goo)' }}>
        <div className="bg-white rounded-t-3xl h-full relative">
          <nav className="relative z-10 h-full flex items-center justify-around">
            {navItems.map((item) => (
              <button 
                key={item.id}
                onClick={(e) => onTabClick(item.id, e)}
                className={`w-14 h-14 flex items-center justify-center text-2xl transition-colors ${
                  activeTab === item.id ? 'text-transparent' : 'text-gray-400'
                }`}
              >
                <item.icon className="w-6 h-6" />
                {item.id === 'cart' && cartItemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center font-medium">
                    {cartItemCount}
                  </span>
                )}
              </button>
            ))}
          </nav>
          
          <div 
            ref={blobRef}
            className="absolute w-14 h-14 bg-white rounded-full z-0 transition-all duration-300 ease-out"
            style={{
              top: '-28px',
              left: 'var(--pos)',
              transform: 'translateX(-50%)'
            }}
          />
        </div>
      </div>
      
      <div 
        ref={ctaRef}
        className="absolute w-14 h-14 bg-white rounded-full flex items-center justify-center z-20 transition-all duration-300 ease-out pointer-events-none"
        style={{
          top: '52px',
          left: 'var(--pos)',
          transform: 'translateX(-50%)'
        }}
      >
        <span className="text-2xl text-red-600">{getActiveIcon()}</span>
      </div>
    </div>
  );
};

export default GooeyNavigation;
