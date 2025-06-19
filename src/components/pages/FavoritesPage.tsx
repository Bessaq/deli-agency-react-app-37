
import React from 'react';
import { Star, Plus } from 'lucide-react';
import { Product } from '../../types';

interface FavoritesPageProps {
  bestSellers: Product[];
  onAddToCart: (product: Product) => void;
}

const FavoritesPage: React.FC<FavoritesPageProps> = ({ bestSellers, onAddToCart }) => {
  return (
    <div className="pt-20 pb-20 px-4">
      <h2 className="text-xl font-bold mb-6">Seus Favoritos</h2>
      <div className="grid grid-cols-1 gap-4">
        {bestSellers.slice(0, 2).map(product => (
          <div key={product.id} className="bg-white rounded-xl shadow-sm p-4 flex items-center">
            <img src={product.image} alt={product.name} className="w-16 h-16 rounded-lg object-cover mr-4" />
            <div className="flex-1">
              <h3 className="font-medium">{product.name}</h3>
              <p className="text-green-600 font-bold">R${product.price.toFixed(2)}</p>
              <div className="flex items-center mt-1">
                <Star className="text-yellow-400 w-4 h-4 fill-current" />
                <span className="text-sm text-gray-600 ml-1">{product.rating}</span>
              </div>
            </div>
            <button 
              onClick={() => onAddToCart(product)} 
              className="bg-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-green-600 transition-colors"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FavoritesPage;
