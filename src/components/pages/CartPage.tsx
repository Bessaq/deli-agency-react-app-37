
import React from 'react';
import { ShoppingCart } from 'lucide-react';
import { Product } from '../../types';

interface CartPageProps {
  cartItems: Product[];
  onRemoveFromCart: (productId: number) => void;
  cartTotal: number;
}

const CartPage: React.FC<CartPageProps> = ({ cartItems, onRemoveFromCart, cartTotal }) => {
  return (
    <div className="pt-20 pb-20 px-4">
      <h2 className="text-xl font-bold mb-6">Carrinho</h2>
      {cartItems.length === 0 ? (
        <div className="text-center py-12">
          <ShoppingCart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500">Seu carrinho está vazio</p>
        </div>
      ) : (
        <>
          <div className="space-y-4 mb-6">
            {cartItems.map((item, index) => (
              <div key={index} className="bg-white rounded-xl shadow-sm p-4 flex items-center">
                <img src={item.image} alt={item.name} className="w-16 h-16 rounded-lg object-cover mr-4" />
                <div className="flex-1">
                  <h3 className="font-medium">{item.name}</h3>
                  <p className="text-green-600 font-bold">R${item.price.toFixed(2)}</p>
                </div>
                <button 
                  onClick={() => onRemoveFromCart(item.id)} 
                  className="bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-red-600 transition-colors"
                >
                  <span className="text-sm">×</span>
                </button>
              </div>
            ))}
          </div>
          <div className="bg-white rounded-xl shadow-sm p-4">
            <div className="flex justify-between items-center mb-4">
              <span className="text-lg font-bold">Total:</span>
              <span className="text-xl font-bold text-green-600">R${cartTotal.toFixed(2)}</span>
            </div>
            <button className="w-full bg-green-500 text-white font-bold py-3 rounded-xl hover:bg-green-600 transition-colors">
              Finalizar Pedido
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default CartPage;
