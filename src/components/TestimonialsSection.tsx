
import React from 'react';
import { Carousel, TestimonialCard } from './TestimonialCarousel';

interface Testimonial {
  name: string;
  designation: string;
  description: string;
  profileImage: string;
}

interface TestimonialsSectionProps {
  testimonials: Testimonial[];
}

const TestimonialsSection = ({ testimonials }: TestimonialsSectionProps) => {
  return (
    <div className="px-4 py-3">
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-lg font-bold">Avaliações dos Clientes</h2>
        <button className="text-sm text-green-600 hover:text-green-700">Ver Todas</button>
      </div>
      <Carousel 
        items={testimonials.map((testimonial, index) => (
          <TestimonialCard 
            key={index} 
            testimonial={testimonial} 
            index={index} 
            layout={true} 
            onCardClose={() => {}} 
          />
        ))} 
      />
    </div>
  );
};

export default TestimonialsSection;
