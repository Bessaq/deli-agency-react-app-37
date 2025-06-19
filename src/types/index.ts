
export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  calories: number;
  rating?: number;
  category: string;
}

export interface Testimonial {
  name: string;
  designation: string;
  description: string;
  profileImage: string;
}

export interface NavItem {
  id: string;
  icon: any;
  emoji: string;
}
