
import React from 'react';

const CookiePromoBanner = () => {
  return (
    <div className="px-4 py-3 relative z-0">
      <div className="relative bg-gradient-to-r from-slate-800 to-slate-900 rounded-xl overflow-hidden shadow-lg h-32">
        {/* Imagem de fundo cobrindo todo o container */}
        <img 
          src="/lovable-uploads/6ab83ab3-1a48-436d-826a-628334698b9d.png" 
          alt="Cookies Piraquê Goiabinha" 
          className="absolute inset-0 w-full h-full object-cover"
        />
        
        {/* Overlay escuro para melhor legibilidade do texto */}
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        
        {/* Conteúdo do banner */}
        <div className="relative p-4 flex items-center justify-between h-full z-10">
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
        </div>
      </div>
    </div>
  );
};

export default CookiePromoBanner;
