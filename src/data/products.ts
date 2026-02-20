export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
  material: string;
  color: string;
  size: string[];
  rating: number;
  reviews: number;
}

export const products: Product[] = [
  {
    id: 1,
    name: 'Classic Leather Oxford',
    price: 120,
    image: '/shoe1.jpeg',
    description: 'Timeless elegance meets everyday comfort. Handcrafted with premium leather, the Classic Leather Oxford is perfect for any occasion.',
    material: 'Premium Full-Grain Leather',
    color: 'Black',
    size: ['40', '41', '42', '43', '44', '45', '46'],
    rating: 4.8,
    reviews: 256,
  },
  {
    id: 2,
    name: 'Premium Chelsea Boot',
    price: 145,
    image: '/shoe2.jpeg',
    description: 'Modern sophistication with traditional craftsmanship. The Chelsea Boot features sleek design with superior comfort for all-day wear.',
    material: 'Genuine Leather',
    color: 'Brown',
    size: ['40', '41', '42', '43', '44', '45', '46'],
    rating: 4.9,
    reviews: 342,
  },
  {
    id: 3,
    name: 'Casual Loafer',
    price: 110,
    image: '/shoe3.jpeg',
    description: 'Effortless style and comfort combined. Perfect for casual outings and relaxed environments.',
    material: 'Suede Leather',
    color: 'Tan',
    size: ['40', '41', '42', '43', '44', '45', '46'],
    rating: 4.7,
    reviews: 198,
  },
  {
    id: 4,
    name: 'Elegant Derby Shoe',
    price: 135,
    image: '/shoe4.jpeg',
    description: 'Understated elegance for the discerning gentleman. The Derby Shoe combines classic styling with modern comfort features.',
    material: 'Premium Leather',
    color: 'Oxblood',
    size: ['40', '41', '42', '43', '44', '45', '46'],
    rating: 4.6,
    reviews: 178,
  },
  {
    id: 5,
    name: 'Modern Sneaker',
    price: 100,
    image: '/shoe5.jpeg',
    description: 'Contemporary design with comfort at its core. The Modern Sneaker bridges the gap between style and functionality.',
    material: 'Leather & Canvas',
    color: 'White',
    size: ['40', '41', '42', '43', '44', '45', '46'],
    rating: 4.8,
    reviews: 412,
  },
  {
    id: 6,
    name: 'Luxury Dress Shoe',
    price: 160,
    image: '/shoe6.jpeg',
    description: 'The pinnacle of formal footwear. Hand-polished leather and intricate detailing make this the ultimate dress shoe.',
    material: 'Italian Full-Grain Leather',
    color: 'Deep Black',
    size: ['40', '41', '42', '43', '44', '45', '46'],
    rating: 5.0,
    reviews: 289,
  },
];
