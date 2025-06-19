
import { Product, Testimonial } from '../types';

export const bestSellers: Product[] = [{
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

export const testimonials: Testimonial[] = [{
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
