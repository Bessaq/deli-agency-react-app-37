
import React from 'react';
import { Flame } from 'lucide-react';
import { Product } from '../types/Product';
import { BentoGrid, BentoCard } from './ui/bento-grid';

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
      <BentoGrid className="grid-cols-2 auto-rows-[12rem]">
        {products.map(product => (
          <BentoCard
            key={product.id}
            name={product.name}
            className="col-span-1"
            background={
              <div className="h-full overflow-hidden">
                <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
              </div>
            }
            Icon={Flame}
            description={`R$${product.price.toFixed(2)} • ${product.calories} Cal`}
            href="#"
            cta="Adicionar"
          />
        ))}
      </BentoGrid>
    </div>
  );
};

export default BestSellers;
