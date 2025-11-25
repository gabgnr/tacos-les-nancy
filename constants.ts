
import { MenuItem, NavItem, Testimonial } from './types';

export const APP_NAME = "Tacos Les Nancy";
export const ADDRESS = "9 Rue de Rémich, 54500 Vandoeuvre-lès-Nancy";
export const PHONE = "+33 3 83 12 34 56"; // Placeholder logic
export const FACEBOOK_URL = "https://www.facebook.com/p/TACOS-LES-NANCY-100054468219556/?locale=fr_FR";

export const NAV_ITEMS: NavItem[] = [
  { label: 'Accueil', path: '/' },
  { label: 'Composer', path: '/builder' },
  { label: 'La Carte', path: '/menu' },
  { label: 'Notre Histoire', path: '/about' },
  { label: 'Contact', path: '/contact' },
];

// Images updated to look like authentic French Tacos (Rectangular grilled wraps) and Snack Burgers
export const MENU_ITEMS: MenuItem[] = [
  // Tacos
  {
    id: 't-1',
    name: 'Tacos Authentique (M)',
    description: '1 viande au choix, sauce fromagère maison secrète, frites croustillantes.',
    price: 8.50,
    category: 'tacos',
    // Image of a grilled burrito/wrap style, closer to French Tacos than Mexican tacos
    image: 'https://images.unsplash.com/photo-1564834724105-918b73d1b9e0?auto=format&fit=crop&q=80&w=800',
    popular: true
  },
  {
    id: 't-2',
    name: 'Tacos Giga (L)',
    description: '2 viandes au choix pour les grandes faims. Cordon bleu, Nuggets, Tenders ou Viande Hachée.',
    price: 10.50,
    category: 'tacos',
    // Image showing a hearty wrap cross-section
    image: 'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 't-3',
    name: 'Le Tacos Gratiné',
    description: 'Notre tacos signature recouvert d\'une couche généreuse de mozzarella et cheddar gratinés au four.',
    price: 11.90,
    category: 'tacos',
    // Image resembling a cheesy baked dish/wrap
    image: 'https://images.unsplash.com/photo-1588636669911-39659f5188f5?auto=format&fit=crop&q=80&w=800',
    popular: true
  },
  
  // Burgers
  {
    id: 'b-1',
    name: 'Le Savoyard',
    description: 'Pain brioché, steak 180g, galette de pomme de terre, fromage à raclette, oignons confits.',
    price: 9.90,
    category: 'burgers',
    // Delicious cheesy burger image
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&q=80&w=800',
    popular: true
  },
  {
    id: 'b-2',
    name: 'Chicken Tower',
    description: 'Double filet de poulet pané, cheddar fondu, salade croquante, mayonnaise poivrée.',
    price: 8.90,
    category: 'burgers',
    // Crispy chicken burger image
    image: 'https://images.unsplash.com/photo-1615297375086-4f40f06532d0?auto=format&fit=crop&q=80&w=800'
  },

  // Assiettes
  {
    id: 'a-1',
    name: 'Assiette Kebab',
    description: 'Viande kebab marinée, blé ou frites, salade composée, pain pita chaud.',
    price: 12.50,
    category: 'assiettes',
    image: 'https://images.unsplash.com/photo-1619860860774-1e2e173b5b63?auto=format&fit=crop&q=80&w=800'
  },
  
  // Tex Mex
  {
    id: 'tm-1',
    name: 'Mozza Sticks (x5)',
    description: 'Bâtonnets de mozzarella fondante panés aux herbes.',
    price: 4.50,
    category: 'texmex',
    image: 'https://images.unsplash.com/photo-1548340748-6d2b7d7daa80?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'tm-2',
    name: 'Tenders Box',
    description: '5 pièces de filets de poulet croustillants, servis avec sauce barbecue.',
    price: 6.90,
    category: 'texmex',
    image: 'https://images.unsplash.com/photo-1562967914-608f82629710?auto=format&fit=crop&q=80&w=800'
  },

  // Desserts
  {
    id: 'd-1',
    name: 'Tiramisu Maison',
    description: 'Le classique italien revisité par notre chef. Spéculoos ou Café.',
    price: 3.50,
    category: 'desserts',
    image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'd-2',
    name: 'Tarte au Daim',
    description: 'Une douceur croquante et fondante au caramel et chocolat.',
    price: 3.90,
    category: 'desserts',
    // Chocolate tart image
    image: 'https://images.unsplash.com/photo-1565492931448-4e89270e513e?auto=format&fit=crop&q=80&w=800'
  }
];

export const TESTIMONIALS: Testimonial[] = [
  { id: 1, name: "Lucas M.", comment: "Le meilleur tacos de Nancy, sans hésitation. La sauce fromagère est incroyable.", rating: 5 },
  { id: 2, name: "Sarah B.", comment: "Livraison rapide, c'est arrivé chaud et les portions sont généreuses.", rating: 5 },
  { id: 3, name: "Karim D.", comment: "Un lieu incontournable pour les étudiants. Rapport qualité-prix imbattable.", rating: 4 },
];

// Builder Data
export const BUILDER_DATA = {
  sizes: [
    { id: 'm', name: 'Taille M', meatCount: 1, price: 8.50, desc: 'Idéal pour une faim normale' },
    { id: 'l', name: 'Taille L', meatCount: 2, price: 10.50, desc: 'Pour les grosses faims' },
    { id: 'xl', name: 'Taille XL', meatCount: 3, price: 13.50, desc: 'Le défi du chef' },
  ],
  meats: [
    { id: 'tenders', name: 'Tenders Maison' },
    { id: 'cordon', name: 'Cordon Bleu' },
    { id: 'nuggets', name: 'Nuggets' },
    { id: 'hachee', name: 'Viande Hachée' },
    { id: 'merguez', name: 'Merguez' },
    { id: 'kebab', name: 'Viande Kebab' },
  ],
  sauces: [
    { id: 'fromagere', name: 'Sauce Fromagère', required: true },
    { id: 'algerienne', name: 'Algérienne' },
    { id: 'bbq', name: 'Barbecue' },
    { id: 'mayo', name: 'Mayonnaise' },
    { id: 'biggy', name: 'Biggy Burger' },
    { id: 'samourai', name: 'Samouraï' },
  ],
  extras: [
    { id: 'cheddar', name: 'Cheddar', price: 1.00 },
    { id: 'raclette', name: 'Raclette', price: 1.50 },
    { id: 'bacon', name: 'Bacon de Dinde', price: 1.00 },
    { id: 'oeuf', name: 'Oeuf', price: 1.00 },
    { id: 'chèvre', name: 'Chèvre', price: 1.50 },
  ]
};