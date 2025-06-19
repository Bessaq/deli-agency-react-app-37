
import React from 'react';
import { Search, Bell } from 'lucide-react';
import logo from '../assets/logo.png';

interface NavigationHeaderProps {
  cartItemCount: number;
}

const NavigationHeader: React.FC<NavigationHeaderProps> = ({ cartItemCount }) => {
  return (
    <div className="fixed top-8 left-0 right-0 z-10 bg-white px-4 py-3 flex justify-between items-center shadow-sm max-w-sm mx-auto">
      <div className="flex items-center">
        <img src={logo} alt="Padaria Sobralense Logo" className="h-10" />
      </div>
      <div className="flex space-x-4">
        <button className="hover:bg-gray-100 p-2 rounded-full transition-colors">
          <Search className="w-5 h-5 text-gray-600" />
        </button>
        <button className="hover:bg-gray-100 p-2 rounded-full transition-colors relative">
          <Bell className="w-5 h-5 text-gray-600" />
          {cartItemCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {cartItemCount}
            </span>
          )}
        </button>
      </div>
    </div>
  );
};

export default NavigationHeader;
