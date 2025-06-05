
import React from 'react';

const PromotionalBanner = () => {
  return (
    <div className="px-4 py-3">
      <div className="relative bg-gradient-to-r from-orange-600 to-orange-700 rounded-xl overflow-hidden shadow-lg">
        <div className="absolute inset-0 opacity-30">
          <img src="/images/8d627e50-cf95-4e22-94f3-6795c260882b.png" alt="Background" className="w-full h-full object-cover" />
        </div>
        <div className="relative p-4 flex items-center">
          <div className="w-2/3">
            <p className="text-white text-sm font-medium">Peru assado para o Natal</p>
            <h3 className="text-white text-xl font-bold">30% OFF</h3>
            <p className="text-white text-xs mb-2">em até 2 horas</p>
            <button className="bg-white text-orange-600 text-xs font-medium px-3 py-1 rounded-full hover:bg-gray-100 transition-colors">
              Pedir Agora
            </button>
          </div>
          <div className="absolute right-4 bottom-0">
            <div className="w-20 h-20 bg-yellow-400 rounded-full flex items-center justify-center">
              <span className="text-2xl">🍗</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PromotionalBanner;
