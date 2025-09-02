export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: 'farmer' | 'consumer' | 'admin';
  district?: string;
  isVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Farm {
  id: string;
  farmerId: string;
  name: string;
  location: string;
  district: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
  contactDetails: {
    phone: string;
    email?: string;
    whatsapp?: string;
  };
  description: string;
  practices: string[];
  images: string[];
  verified: boolean;
  rating: number;
  totalReviews: number;
  createdAt: Date;
}

export interface Product {
  id: string;
  farmerId: string;
  farm: Farm;
  name: string;
  description: string;
  category: ProductCategory;
  price: number;
  unit: string;
  images: string[];
  inStock: boolean;
  quantity: number;
  organic: boolean;
  featured: boolean;
  rating: number;
  totalReviews: number;
  createdAt: Date;
  updatedAt: Date;
}

export type ProductCategory = 
  | 'vegetables' 
  | 'fruits'
  | 'grains'
  | 'poultry' 
  | 'livestock' 
  | 'meats'
  | 'dairy'
  | 'seedlings' 
  | 'fertilizers'
  | 'herbs';

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Order {
  id: string;
  consumerId: string;
  consumer: User;
  items: OrderItem[];
  subtotal: number;
  commission: number; // 10% of subtotal
  total: number; // subtotal (commission already included)
  status: 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  deliveryOption: 'pickup-farm' | 'pickup-point' | 'delivery';
  deliveryAddress?: string;
  pickupLocation?: string;
  paymentMethod: 'ecocash' | 'mpesa';
  paymentStatus: 'pending' | 'paid' | 'failed';
  farmerPayouts: FarmerPayout[];
  createdAt: Date;
  updatedAt: Date;
}

export interface OrderItem {
  id: string;
  orderId: string;
  productId: string;
  product: Product;
  quantity: number;
  price: number; // price at time of order
  subtotal: number; // quantity * price
  farmerEarnings: number; // 90% of subtotal
  commission: number; // 10% of subtotal
}

export interface FarmerPayout {
  id: string;
  orderId: string;
  farmerId: string;
  farmer: User;
  amount: number; // 90% of their items total
  status: 'pending' | 'processing' | 'paid' | 'failed';
  paymentMethod: 'ecocash' | 'mpesa' | 'visa' | 'mastercard';
  transactionId?: string;
  paidAt?: Date;
  createdAt: Date;
}

export interface Review {
  id: string;
  consumerId: string;
  consumer: User;
  farmerId: string;
  farmer: User;
  productId?: string;
  product?: Product;
  rating: number;
  comment: string;
  verified: boolean; // only if consumer actually bought from farmer
  createdAt: Date;
}

export interface Commission {
  id: string;
  orderId: string;
  order: Order;
  amount: number;
  status: 'pending' | 'collected';
  collectedAt?: Date;
  createdAt: Date;
}

export interface Analytics {
  totalFarmers: number;
  totalConsumers: number;
  totalOrders: number;
  totalRevenue: number;
  totalCommission: number;
  totalFarmerEarnings: number;
  monthlyGrowth: number;
  topProducts: Product[];
  topFarmers: Farm[];
}