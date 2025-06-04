
import React from 'react';

const CookiePromoBanner = () => {
  return (
    <div className="px-4 py-3">
      <div className="relative bg-gradient-to-r from-slate-800 to-slate-900 rounded-xl overflow-hidden shadow-lg">
        <div className="relative p-4 flex items-center justify-between">
          <div className="flex-1">
            <h3 className="text-white text-2xl font-bold leading-tight mb-2">
              50% de desconto<br />
              na sua primeira<br />
              compra
            </h3>
            <button className="bg-orange-500 text-white text-sm font-semibold px-6 py-3 rounded-full hover:bg-orange-600 transition-colors">
              Compre agora
            </button>
          </div>
          <div className="flex-shrink-0 ml-4">
            <img 
              src="/lovable-uploads/fa92059a-aba1-4fb8-8bcf-abd2eb15b916.png" 
              alt="Cookies Piraquê" 
              className="w-32 h-20 object-contain"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CookiePromoBanner;
