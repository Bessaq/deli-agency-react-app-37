
import React from 'react';
import { Plus, Flame } from 'lucide-react';
import { Product } from '../types/Product';

interface BestSellersProps {
  products: Product[];
  onAddToCart: (product: Product) => void;
}

const BestSellers = ({ products, onAddToCart }: BestSellersProps) => {
  return (
    <div className="px-4 py-3">
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-lg font-bold">Mais Vendidos</h2>
        <button className="text-sm text-red-950">Ver Todos</button>
      </div>
      <div className="grid grid-cols-2 gap-4">
        {products.map(product => (
          <div key={product.id} className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow">
            <div className="h-24 overflow-hidden">
              <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
            </div>
            <div className="p-2">
              <h3 className="font-medium text-sm">{product.name}</h3>
              <p className="font-bold text-sm text-red-700">R${product.price.toFixed(2)}</p>
              <div className="flex justify-between items-center mt-1">
                <div className="flex items-center">
                  <Flame className="text-orange-500 w-3 h-3" />
                  <span className="text-xs text-gray-600 ml-1">{product.calories} Cal</span>
                </div>
                <button 
                  onClick={() => onAddToCart(product)} 
                  className="text-white rounded-full w-6 h-6 flex items-center justify-center transition-colors bg-red-950 hover:bg-red-800"
                >
                  <Plus className="w-3 h-3" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BestSellers;
