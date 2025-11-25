import { ReactNode } from 'react';

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: 'tacos' | 'burgers' | 'assiettes' | 'texmex' | 'desserts';
  image: string;
  popular?: boolean;
}

export interface NavItem {
  label: string;
  path: string;
}

export interface Testimonial {
  id: number;
  name: string;
  comment: string;
  rating: number;
}
