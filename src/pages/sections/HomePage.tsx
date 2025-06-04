
import React from 'react';
import { Product } from '../../types/Product';
import { Component } from '../../components/ui/3d-icon-tabs-1';
import PromotionalBanner from '../../components/PromotionalBanner';
import BestSellers from '../../components/BestSellers';
import CookiePromoBanner from '../../components/CookiePromoBanner';

interface HomePageProps {
  bestSellers: Product[];
  testimonials: any[];
  onAddToCart: (product: Product) => void;
}

const HomePage = ({ bestSellers, onAddToCart }: HomePageProps) => {
  return (
    <div className="pt-20 pb-20">
      {/* Categories */}
      <div className="py-3 bg-white">
        <Component />
      </div>

      {/* Promotional Banner */}
      <PromotionalBanner />

      {/* Best Sellers Section */}
      <BestSellers products={bestSellers} onAddToCart={onAddToCart} />

      {/* Cookie Promo Banner */}
      <CookiePromoBanner />
    </div>
  );
};

export default HomePage;
