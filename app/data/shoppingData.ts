import { ShoppingItem } from '../types';

export const mockShoppingItems: ShoppingItem[] = [
  {
    id: '1',
    name: 'MacBook Pro M3',
    description: '14-inch MacBook Pro with M3 chip, 16GB RAM, 512GB SSD',
    price: 2399,
    category: 'Electronics',
    priority: 'high',
    status: 'planned',
    url: 'https://apple.com',
    image: 'https://images.pexels.com/photos/205421/pexels-photo-205421.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&dpr=1',
    dateAdded: new Date('2024-01-10'),
    notes: 'Need for development work'
  },
  {
    id: '2',
    name: 'Sony WH-1000XM5',
    description: 'Wireless Noise Canceling Headphones',
    price: 399,
    category: 'Electronics',
    priority: 'medium',
    status: 'wishlist',
    url: 'https://sony.com',
    image: 'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&dpr=1',
    dateAdded: new Date('2024-01-12'),
    notes: 'For better audio quality while working'
  },
  {
    id: '3',
    name: 'Standing Desk',
    description: 'Electric height adjustable standing desk',
    price: 599,
    category: 'Furniture',
    priority: 'medium',
    status: 'purchased',
    image: 'https://images.pexels.com/photos/4050315/pexels-photo-4050315.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&dpr=1',
    dateAdded: new Date('2024-01-05'),
    datePurchased: new Date('2024-01-15'),
    notes: 'Great for productivity and health'
  },
  {
    id: '4',
    name: 'Mechanical Keyboard',
    description: 'RGB Mechanical Gaming Keyboard',
    price: 149,
    category: 'Electronics',
    priority: 'low',
    status: 'wishlist',
    image: 'https://images.pexels.com/photos/2115256/pexels-photo-2115256.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&dpr=1',
    dateAdded: new Date('2024-01-14'),
    notes: 'For better typing experience'
  }
];

export const shoppingCategories = [
  'Electronics', 'Furniture', 'Clothing', 'Books', 'Sports', 'Home & Garden',
  'Automotive', 'Health & Beauty', 'Toys & Games', 'Food & Beverages', 'Other'
];