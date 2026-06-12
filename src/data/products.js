import prod1 from '../assets/product_1.webp';
import prod2 from '../assets/product_2.webp';
import prod3 from '../assets/product_3.webp';
import prod4 from '../assets/product_4.webp';

export const products = [
  {
    id: '1',
    name: 'Turkish Fit 1',
    price: 1500,
    description: 'Premium Turkish fit. Where Fashion Looks Expensive.',
    sizes: ['S', 'M', 'L'],
    images: [prod1],
  },
  {
    id: '2',
    name: 'Berlin Streetwear',
    price: 2200,
    description: 'Elegant Berlin style fit. Premium quality material.',
    sizes: ['M', 'L', 'XL'],
    images: [prod2],
  },
  {
    id: '3',
    name: 'Paris Luxury',
    price: 850,
    description: 'Minimalist everyday luxury wear straight from Paris.',
    sizes: ['XS', 'S', 'M'],
    images: [prod3],
  },
  {
    id: '4',
    name: 'France Collection',
    price: 3100,
    description: 'The ultimate luxury statement piece from our France collection.',
    sizes: ['One Size'],
    images: [prod4],
  }
];
