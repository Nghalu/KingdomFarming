import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Product, CartItem, Farm, Review, Order, Analytics } from '../types';

interface AppContextType {
  products: Product[];
  farms: Farm[];
  reviews: Review[];
  orders: Order[];
  cart: CartItem[];
  analytics: Analytics;
  addToCart: (product: Product, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  updateCartQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  calculateOrderTotals: (items: CartItem[]) => { subtotal: number; commission: number; total: number };
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  selectedDistrict: string;
  setSelectedDistrict: (district: string) => void;
  organicOnly: boolean;
  setOrganicOnly: (organic: boolean) => void;
}

const AppContext = createContext<AppContextType | null>(null);

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
}

export function AppProvider({ children }: { children: ReactNode }) {
  // Mock data - replace with actual API calls
  const mockFarms: Farm[] = [
    {
      id: '1',
      farmerId: '1',
      name: 'Mokotso and Thetsane Agric Solutions',
      location: 'Sefika Complex',
      district: 'Maseru',
      coordinates: { lat: -29.3167, lng: 27.4833 },
      contactDetails: {
        phone: '+26658653136',
        email: '',
        whatsapp: '+26658653136'
      },
      description: 'Specializes on potato farming and seeds',
      practices: ['Mondial', 'Panamera'],
      images: ['https://scontent.fmba5-1.fna.fbcdn.net/v/t39.30808-6/528019336_10229448734418085_1386499042260624656_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeEBnF5z4HUaNf_cAB6XQ83WxJV2Cz0dd9zElXYLPR133FG6FDenqCqNid_AsR1WH5gIijpziPAMfJQy2YGQPwxX&_nc_ohc=bfWg2hfRYgoQ7kNvwEWYh13&_nc_oc=AdlLcSLPNAm3qvwqrqXQd_pgnVxmez23Of4uUsCcY4EaGH0nKr6Pk3MySxOy_tRDyTo&_nc_zt=23&_nc_ht=scontent.fmba5-1.fna&_nc_gid=NjGUiiVbFLTUdqpYUh_vHQ&oh=00_AfXUgl8P0-5dIvW2YC_ql1wPCNfJm1cVGnCzffWK9-TONw&oe=68B763BA'],
      verified: true,
      rating: 0,
      totalReviews: 0,
      createdAt: new Date('2023-01-15')
    },
    {
      id: '2',
      farmerId: '2',
      name: 'Letsoara Farm',
      location: 'Roma',
      district: 'Maseru',
      coordinates: { lat: -28.8719, lng: 28.0378 },
      contactDetails: {
        phone: '+26658653137',
        whatsapp: '+26658653137'
      },
      description: 'Letsoara Farm specializing in vegetables, seedlings,poultry and agric equipment.',
      practices: ['red cabbage', 'onion','eggs'],
      images: ['https://scontent.fmba5-1.fna.fbcdn.net/v/t39.30808-6/535548572_1208252797989347_1016873925245645002_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeET46vuHty3qwNyg7oSr245PBAhYEFdo_w8ECFgQV2j_DgKXhwU-L7Ulu57mgQ8twu0rjKq2ooBo3u3vhUrVTD6&_nc_ohc=QNLAyVgXR-EQ7kNvwHC6Vdv&_nc_oc=Admqu7FmyHkPj7QnATzxiSJNIsQssaH8reBuZ_HmTLIyDUbpZ4L7DPx6vr-2snfhAyg&_nc_zt=23&_nc_ht=scontent.fmba5-1.fna&_nc_gid=H_b8ZIJFzVsEXRZI82rMIw&oh=00_AfVxrBp19MZRhyiQVhFcn8weXFA5lATC3zaM9k-Sf0P1VQ&oe=68B764B3'],
      verified: true,
      rating: 0,
      totalReviews: 0,
      createdAt: new Date('2023-02-20')
    },
    {
      id: '3',
      farmerId: '3',
      name: 'Green Field Butchery',
      location: 'Selakhapane,Ha Foso',
      district: 'Berea',
      coordinates: { lat: -29.2064, lng: 27.7311 },
      contactDetails: {
        phone: '',
        email: '',
        whatsapp: '+26658653138'
      },
      description: 'Specializing in free-range meats',
      practices: ['beef', 'mutton', 'chicken', 'trout', 'sausages'],
      images: ['https://scontent.fmba5-1.fna.fbcdn.net/v/t39.30808-6/536282854_10238470909934617_8411820144341879701_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeEyFUQ4UEwh45tLd0AdmgQPPtaRUbFYTpw-1pFRsVhOnNo0vY9jcxS9o4wU2DdijkTLL8AV05Tibk56OA20I582&_nc_ohc=73PJtjcuAZYQ7kNvwHvbNAs&_nc_oc=Adlxbb-BCnA8HMnBFuuBasoLyF24rtsTXzOgIe8jUMnzFNURzr7OVQoQo4r0yXI77ao&_nc_zt=23&_nc_ht=scontent.fmba5-1.fna&_nc_gid=lMJOP1mhoEwmUCFxKhgWsQ&oh=00_AfUBlx0OCRJK5ln4hb_-o4ruP1GQ8kRuh3DUeQoBaFYHZw&oe=68B7739C'],
      verified: true,
      rating: 0,
      totalReviews: 0,
      createdAt: new Date('2025-08-10')
    }
  ];

  const mockProducts: Product[] = [
    {
      id: '1',
      farmerId: '1',
      farm: mockFarms[0],
      name: 'Fresh Organic Spinach',
      description: 'Crisp, fresh organic spinach grown without chemicals. Perfect for salads and cooking.',
      category: 'vegetables',
      price: 25,
      unit: '1 kg',
      images: ['https://images.pexels.com/photos/2325843/pexels-photo-2325843.jpeg'],
      inStock: true,
      quantity: 50,
      organic: true,
      featured: true,
      rating: 0,
      totalReviews: 0,
      createdAt: new Date('2024-01-10'),
      updatedAt: new Date('2024-01-15')
    },
    {
      id: '2',
      farmerId: '3',
      farm: mockFarms[2],
      name: 'Free-Range Chicken Eggs',
      description: 'Fresh eggs from free-range chickens. Rich in nutrients and flavor.',
      category: 'eggs',
      price: 45,
      unit: '30 eggs',
      images: [
        'https://images.pexels.com/photos/162712/egg-white-food-protein-162712.jpeg',
        'https://megrajpfarm.com/wp-content/uploads/2024/08/EGGTRAYB30160-B-scaled-1.jpg'
        
      ],
      inStock: true,
      quantity: 100,
      organic: false,
      featured: true,
      rating: 4.9,
      totalReviews: 67,
      createdAt: new Date('2024-01-05'),
      updatedAt: new Date('2024-01-20')
    },
    {
      id: '3',
      farmerId: '2',
      farm: mockFarms[1],
      name: 'Fresh Tomatoes',
      description: 'Vine-ripened tomatoes grown in mountain soil. Sweet and juicy.',
      category: 'vegetables',
      price: 30,
      unit: '2 kg',
      images: [
        'https://images.pexels.com/photos/533280/pexels-photo-533280.jpeg',
        'https://images.pexels.com/photos/1327838/pexels-photo-1327838.jpeg'
      ],
      inStock: true,
      quantity: 75,
      organic: false,
      featured: false,
      rating: 0,
      totalReviews: 0,
      createdAt: new Date('2024-01-12'),
      updatedAt: new Date('2024-01-18')
    },
    {
      id: '4',
      farmerId: '3',
      farm: mockFarms[2],
      name: 'Whole Free-Range Chicken',
      description: 'Fresh, healthy free-range chicken raised naturally without antibiotics.',
      category: 'chicken',
      price: 120,
      unit: '1 whole chicken (1.5kg)',
      images: [
        'https://ifoodreal.com/wp-content/uploads/2023/08/how-to-cut-up-a-whole-chicken.jpg',
        'https://static.vecteezy.com/system/resources/thumbnails/058/286/022/small/whole-fresh-raw-chicken-available-for-roasting-and-meal-preparation-png.png'
      ],
      inStock: true,
      quantity: 25,
      organic: false,
      featured: true,
      rating: 4.8,
      totalReviews: 45,
      createdAt: new Date('2024-01-08'),
      updatedAt: new Date('2024-01-22')
    },
    {
      id: '5',
      farmerId: '1',
      farm: mockFarms[0],
      name: 'Organic Fertilizer',
      description: 'Compost-based organic fertilizer perfect for home gardens and farming.',
      category: 'fertilizers',
      price: 80,
      unit: '10 kg bag',
      images: ['https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS-yBI-_0IKNPCHIXocX6cw1KeOzoqNBjJtqw&s',
              'https://image.made-in-china.com/202f0j00SKpWwAoscucy/High-Quality-BOPP-Laminated-PP-Woven-Chemicals-Urea-Fertilizer-Bag-25kg-50kg-100kg.webp'],
      inStock: true,
      quantity: 40,
      organic: true,
      featured: false,
      rating: 4.6,
      totalReviews: 28,
      createdAt: new Date('2024-01-14'),
      updatedAt: new Date('2024-01-19')
    },
    {
      id: '6',
      farmerId: '2',
      farm: mockFarms[1],
      name: 'Fresh Carrots',
      description: 'Sweet, crunchy carrots grown in highland soil. Rich in vitamins.',
      category: 'vegetables',
      price: 20,
      unit: '1 kg',
      images: ['https://images.pexels.com/photos/143133/pexels-photo-143133.jpeg'],
      inStock: true,
      quantity: 60,
      organic: false,
      featured: false,
      rating: 4.4,
      totalReviews: 19,
      createdAt: new Date('2024-01-16'),
      updatedAt: new Date('2024-01-21')
    }
  ];

  const mockAnalytics: Analytics = {
    totalFarmers: 3,
    totalConsumers: 12,
    totalOrders: 2834,
    totalRevenue: 456780,
    totalCommission: 45678, // 10% of revenue
    totalFarmerEarnings: 411102, // 90% of revenue
    monthlyGrowth: 15.3,
    topProducts: mockProducts.slice(0, 3),
    topFarmers: mockFarms.slice(0, 3)
  };

  const [products] = useState<Product[]>(mockProducts);
  const [farms] = useState<Farm[]>(mockFarms);
  const [reviews] = useState<Review[]>([]);
  const [orders] = useState<Order[]>([]);
  const [analytics] = useState<Analytics>(mockAnalytics);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [organicOnly, setOrganicOnly] = useState(false);

  const addToCart = (product: Product, quantity: number) => {
    setCart(prev => {
      const existingItem = prev.find(item => item.product.id === product.id);
      if (existingItem) {
        return prev.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => prev.filter(item => item.product.id !== productId));
  };

  const updateCartQuantity = (productId: string, quantity: number) => {
    setCart(prev =>
      prev.map(item =>
        item.product.id === productId
          ? { ...item, quantity }
          : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const calculateOrderTotals = (items: CartItem[]) => {
    const subtotal = items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
    const commission = Math.round(subtotal * 0.1); // 10% commission
    const total = subtotal; // Customer pays full amount
    
    return { subtotal, commission, total };
  };

  return (
    <AppContext.Provider value={{
      products,
      farms,
      reviews,
      orders,
      cart,
      analytics,
      addToCart,
      removeFromCart,
      updateCartQuantity,
      clearCart,
      calculateOrderTotals,
      searchTerm,
      setSearchTerm,
      selectedCategory,
      setSelectedCategory,
      selectedDistrict,
      setSelectedDistrict,
      organicOnly,
      setOrganicOnly
    }}>
      {children}
    </AppContext.Provider>
  );
}