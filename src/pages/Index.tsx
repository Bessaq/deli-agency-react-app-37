import React, { useState, useRef, useEffect } from 'react';
import logo from '../assets/logo.png';
import { Home, Heart, ShoppingCart, ClipboardList, User, Search, Bell, Plus, Star, Flame, RotateCcw } from 'lucide-react';
import HomePage from './sections/HomePage';

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  calories: number;
  rating?: number;
  category: string;
}

const Index = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [cartItems, setCartItems] = useState<Product[]>([]);
  const navRef = useRef<HTMLDivElement>(null);
  const blobRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  // Define navItems array
  const navItems = [
    { id: 'home', icon: Home, emoji: '🏠' },
    { id: 'favorites', icon: Heart, emoji: '♡' },
    { id: 'cart', icon: ShoppingCart, emoji: '🛒' },
    { id: 'profile', icon: User, emoji: '☺' }
  ];

  const bestSellers: Product[] = [{
    id: 1,
    name: 'Bolo Fofo Formigueiro',
    price: 39.90,
    image: './images/d5f6e42f-f35d-491b-ab12-8e28dd10df34.png',
    calories: 440,
    rating: 4.8,
    category: 'Bolos'
  }, {
    id: 2,
    name: 'Hambúrguer Artesanal',
    price: 24.90,
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=180&h=120&fit=crop&crop=center',
    calories: 520,
    rating: 4.6,
    category: 'Fast Food'
  }, {
    id: 3,
    name: 'Bolo de Chocolate',
    price: 18.50,
    image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=180&h=120&fit=crop&crop=center',
    calories: 320,
    rating: 4.9,
    category: 'Bolos'
  }, {
    id: 4,
    name: 'Suco Natural',
    price: 12.90,
    image: 'https://images.unsplash.com/photo-1613478223719-2ab802602423?w=180&h=120&fit=crop&crop=center',
    calories: 180,
    rating: 4.5,
    category: 'Bebidas'
  }];

  const testimonials = [{
    name: "Maria Silva",
    designation: "Cliente Frequente",
    description: "O melhor cappuccino da cidade! Sempre fresco e com aquele sabor especial que me faz voltar todos os dias.",
    profileImage: "https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=150&h=150&fit=crop&crop=face"
  }, {
    name: "João Santos",
    designation: "Amante de Café",
    description: "Atendimento excepcional e produtos de qualidade. A padaria virou minha segunda casa!",
    profileImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
  }, {
    name: "Ana Costa",
    designation: "Foodie Local",
    description: "Variedade incrível de produtos frescos. Os bolos são simplesmente divinos!",
    profileImage: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face"
  }];

  const addToCart = (product: Product) => {
    setCartItems([...cartItems, product]);
    console.log('Produto adicionado ao carrinho:', product.name);
  };

  const removeFromCart = (productId: number) => {
    setCartItems(cartItems.filter(item => item.id !== productId));
  };

  const getCartTotal = () => {
    return cartItems.reduce((total, item) => total + item.price, 0);
  };

  const getCartItemCount = () => {
    return cartItems.length;
  };

  const handleTabClick = (tabId: string, event: React.MouseEvent<HTMLButtonElement>) => {
    setActiveTab(tabId);
    
    if (navRef.current && blobRef.current && ctaRef.current) {
      const button = event.currentTarget;
      const wrapperRect = navRef.current.getBoundingClientRect();
      const buttonRect = button.getBoundingClientRect();
      const centerX = buttonRect.left - wrapperRect.left + buttonRect.width / 2;
      
      // Update CSS variable for blob and CTA position
      navRef.current.style.setProperty('--pos', `${centerX}px`);
      
      // Trigger gooey animation
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

  const renderHome = () => <HomePage bestSellers={bestSellers} testimonials={testimonials} onAddToCart={addToCart} />;

  const renderFavorites = () => <div className="pt-20 pb-20 px-4">
      <h2 className="text-xl font-bold mb-6">Seus Favoritos</h2>
      <div className="grid grid-cols-1 gap-4">
        {bestSellers.slice(0, 2).map(product => <div key={product.id} className="bg-white rounded-xl shadow-sm p-4 flex items-center">
            <img src={product.image} alt={product.name} className="w-16 h-16 rounded-lg object-cover mr-4" />
            <div className="flex-1">
              <h3 className="font-medium">{product.name}</h3>
              <p className="text-green-600 font-bold">R${product.price.toFixed(2)}</p>
              <div className="flex items-center mt-1">
                <Star className="text-yellow-400 w-4 h-4 fill-current" />
                <span className="text-sm text-gray-600 ml-1">{product.rating}</span>
              </div>
            </div>
            <button onClick={() => addToCart(product)} className="bg-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-green-600 transition-colors">
              <Plus className="w-4 h-4" />
            </button>
          </div>)}
      </div>
    </div>;

  const renderCart = () => <div className="pt-20 pb-20 px-4">
      <h2 className="text-xl font-bold mb-6">Carrinho</h2>
      {cartItems.length === 0 ? <div className="text-center py-12">
          <ShoppingCart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500">Seu carrinho está vazio</p>
        </div> : <>
          <div className="space-y-4 mb-6">
            {cartItems.map((item, index) => <div key={index} className="bg-white rounded-xl shadow-sm p-4 flex items-center">
                <img src={item.image} alt={item.name} className="w-16 h-16 rounded-lg object-cover mr-4" />
                <div className="flex-1">
                  <h3 className="font-medium">{item.name}</h3>
                  <p className="text-green-600 font-bold">R${item.price.toFixed(2)}</p>
                </div>
                <button onClick={() => removeFromCart(item.id)} className="bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-red-600 transition-colors">
                  <span className="text-sm">×</span>
                </button>
              </div>)}
          </div>
          <div className="bg-white rounded-xl shadow-sm p-4">
            <div className="flex justify-between items-center mb-4">
              <span className="text-lg font-bold">Total:</span>
              <span className="text-xl font-bold text-green-600">R${getCartTotal().toFixed(2)}</span>
            </div>
            <button className="w-full bg-green-500 text-white font-bold py-3 rounded-xl hover:bg-green-600 transition-colors">
              Finalizar Pedido
            </button>
          </div>
        </>}
    </div>;

  const renderOrders = () => <div className="pt-20 pb-20 px-4">
      <h2 className="text-xl font-bold mb-6">Meus Pedidos</h2>
      <div className="space-y-4">
        <div className="bg-white rounded-xl shadow-sm p-4">
          <div className="flex justify-between items-start mb-2">
            <div>
              <p className="font-medium">Pedido #1234</p>
              <p className="text-sm text-gray-600">2 itens • R$64,80</p>
            </div>
            <span className="bg-green-100 text-green-600 px-2 py-1 rounded-full text-xs font-medium">
              Entregue
            </span>
          </div>
          <p className="text-xs text-gray-500">Entregue em 15 de Maio, 2024</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-4">
          <div className="flex justify-between items-start mb-2">
            <div>
              <p className="font-medium">Pedido #1235</p>
              <p className="text-sm text-gray-600">1 item • R$39,90</p>
            </div>
            <span className="bg-yellow-100 text-yellow-600 px-2 py-1 rounded-full text-xs font-medium">
              Em preparo
            </span>
          </div>
          <p className="text-xs text-gray-500">Pedido feito há 20 minutos</p>
        </div>
      </div>
    </div>;

  const renderProfile = () => <div className="pt-20 pb-20 px-4">
      <div className="text-center mb-8">
        <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
          <User className="w-10 h-10 text-white" />
        </div>
        <h2 className="text-xl font-bold">João Silva</h2>
        <p className="text-gray-600">joao.silva@email.com</p>
      </div>
      
      <div className="space-y-4">
        <div className="bg-white rounded-xl shadow-sm p-4">
          <h3 className="font-medium mb-3">Configurações da Conta</h3>
          <div className="space-y-3">
            <button className="w-full text-left py-2 border-b border-gray-100">Editar Perfil</button>
            <button className="w-full text-left py-2 border-b border-gray-100">Endereços</button>
            <button className="w-full text-left py-2 border-b border-gray-100">Métodos de Pagamento</button>
            <button className="w-full text-left py-2">Notificações</button>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm p-4">
          <h3 className="font-medium mb-3">Suporte</h3>
          <div className="space-y-3">
            <button className="w-full text-left py-2 border-b border-gray-100">Central de Ajuda</button>
            <button className="w-full text-left py-2 border-b border-gray-100">Fale Conosco</button>
            <button className="w-full text-left py-2">Sobre o App</button>
          </div>
        </div>
      </div>
    </div>;

  const renderContent = () => {
    switch (activeTab) {
      case 'favorites':
        return renderFavorites();
      case 'cart':
        return renderCart();
      case 'orders':
        return renderOrders();
      case 'profile':
        return renderProfile();
      default:
        return renderHome();
    }
  };

  const getActiveIcon = () => {
    const activeItem = navItems.find(item => item.id === activeTab);
    return activeItem ? activeItem.emoji : '⟳';
  };

  return (
    <div className="relative w-full max-w-sm mx-auto min-h-screen bg-gray-50 text-gray-800 font-sans overflow-hidden">
      {/* SVG filter gooey */}
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

      {/* Status Bar */}
      <div className="bg-white px-4 py-2 flex justify-between items-center">
        <div className="text-xs font-medium">8:41</div>
        <div className="flex space-x-2 text-xs">
          <span>📶</span>
          <span>📶</span>
          <span>🔋</span>
        </div>
      </div>

      {/* Navigation Bar - Fixed at top */}
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
            {getCartItemCount() > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {getCartItemCount()}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Main Content */}
      {renderContent()}

      {/* New Gooey Bottom Navigation */}
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
                  onClick={(e) => handleTabClick(item.id, e)}
                  className={`w-14 h-14 flex items-center justify-center text-2xl transition-colors ${
                    activeTab === item.id ? 'text-transparent' : 'text-gray-400'
                  }`}
                >
                  <item.icon className="w-6 h-6" />
                  {item.id === 'cart' && getCartItemCount() > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center font-medium">
                      {getCartItemCount()}
                    </span>
                  )}
                </button>
              ))}
            </nav>
            
            {/* Blob inside goo for the effect */}
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
        
        {/* CTA outside goo for clean appearance */}
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
