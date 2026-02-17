export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
}

export const products: Product[] = [
  { id: 1, name: 'Classic Leather Oxford', price: 120, image: '/shoe1.png' },
  { id: 2, name: 'Premium Chelsea Boot', price: 145, image: '/shoe2.png' },
  { id: 3, name: 'Casual Loafer', price: 110, image: '/shoe3.png' },
  { id: 4, name: 'Elegant Derby Shoe', price: 135, image: '/shoe4.png' },
  { id: 5, name: 'Modern Sneaker', price: 100, image: '/shoe5.png' },
  { id: 6, name: 'Luxury Dress Shoe', price: 160, image: '/shoe6.png' },
];
