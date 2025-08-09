import { Product, Supplier, StockMovement, DashboardStats } from '../types/inventory';

export const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Premium Norozi Chappal',
    color: 'Brown',
    category: 'Norozi ',
    price: 2500.00,
    stock: 45,
    minStock: 10,
    supplier: 'Khan Leather Works',
    description: 'Traditional handcrafted Norozi chappal with premium leather finish',
    image: 'https://www.peshawarichappals.pk/wp-content/uploads/2024/08/48-300x300.jpg',
    status: 'active',
    createdAt: '2024-01-15',
    updatedAt: '2024-01-20'
  },
  {
    id: '2',
    name: 'Classic Zardari Chappal',
    color: 'Black',
    category: 'Zardari',
    price: 3500.00,
    stock: 8,
    minStock: 15,
    supplier: 'Sindhi Footwear Co',
    description: 'Elegant Zardari style chappal with traditional embossed patterns',
    image: 'https://www.peshawarichappals.pk/wp-content/uploads/2024/08/482-300x300.jpg',
    status: 'active',
    createdAt: '2024-01-10',
    updatedAt: '2024-01-18'
  },
  {
    id: '3',
    name: 'Royal Kaptaan Chappal',
    color: 'Tan',
    category: 'Kaptaan',
    price: 4200.00,
    stock: 0,
    minStock: 5,
    supplier: 'Tribal Crafts Ltd',
    description: 'Premium Kaptaan chappal inspired by traditional tribal designs',
    image: 'https://www.peshawarichappals.pk/wp-content/uploads/2024/08/4-300x300.jpg',
    status: 'out-of-stock',
    createdAt: '2024-01-05',
    updatedAt: '2024-01-22'
  },
  {
    id: '4',
    name: 'Traditional Peshawari Chappal',
    color: 'Natural',
    category: 'Peshawari',
    price: 1800.00,
    stock: 120,
    minStock: 20,
    supplier: 'Frontier Footwear',
    description: 'Authentic Peshawari chappal made with traditional techniques',
    image: 'https://www.peshawarichappals.pk/wp-content/uploads/2024/08/42-300x300.jpg',
    status: 'active',
    createdAt: '2024-01-12',
    updatedAt: '2024-01-19'
  },
  {
    id: '5',
    name: 'Luxury Norozi Chappal',
    color: 'Dark Brown',
    category: 'Norozi',
    price: 2800.00,
    stock: 25,
    minStock: 8,
    supplier: 'Heritage Leather Works',
    description: 'Luxury handcrafted Norozi chappal with premium finish',
    image: 'https://www.peshawarichappals.pk/wp-content/uploads/2024/08/37-300x300.jpg',
    status: 'active',
    createdAt: '2024-01-08',
    updatedAt: '2024-01-21'
  }
];

export const mockSuppliers: Supplier[] = [
  {
    id: '1',
    name: 'Khan Leather Works',
    email: 'contact@khanleather.com',
    phone: '+92 91 5123456',
    address: 'Qissa Khwani Bazaar, Peshawar, KPK, Pakistan',
    productsCount: 25
  },
  {
    id: '2',
    name: 'Sindhi Footwear Co',
    email: 'info@sindhifootwear.com',
    phone: '+92 21 3456789',
    address: 'Saddar Bazaar, Karachi, Sindh, Pakistan',
    productsCount: 18
  },
  {
    id: '3',
    name: 'Tribal Crafts Ltd',
    email: 'sales@tribalcrafts.com',
    phone: '+92 51 9876543',
    address: 'F-7 Markaz, Islamabad, Pakistan',
    productsCount: 12
  },
  {
    id: '4',
    name: 'Frontier Footwear',
    email: 'orders@frontierfootwear.pk',
    phone: '+92 91 2234567',
    address: 'Hashtnagri Road, Peshawar, KPK, Pakistan',
    productsCount: 30
  },
  {
    id: '5',
    name: 'Heritage Leather Works',
    email: 'contact@heritageleather.pk',
    phone: '+92 42 3654789',
    address: 'Anarkali Bazaar, Lahore, Punjab, Pakistan',
    productsCount: 22
  }
];

export const mockStockMovements: StockMovement[] = [
  {
    id: '1',
    productId: '1',
    productName: 'Premium Norozi Chappal',
    type: 'in',
    quantity: 50,
    reason: 'New stock received',
    date: '2024-01-20',
    user: 'Ahmad Ali'
  },
  {
    id: '2',
    productId: '2',
    productName: 'Classic Zardari Chappal',
    type: 'out',
    quantity: 7,
    reason: 'Customer order',
    date: '2024-01-19',
    user: 'Fatima Sheikh'
  },
  {
    id: '3',
    productId: '4',
    productName: 'Traditional Peshawari Chappal',
    type: 'in',
    quantity: 100,
    reason: 'Bulk purchase',
    date: '2024-01-18',
    user: 'Muhammad Khan'
  }
];

export const mockDashboardStats: DashboardStats = {
  totalProducts: 5,
  lowStockItems: 2,
  totalValue: 75800.00,
  recentMovements: 15
};

export const mockOrders = [
  {
    id: 'ORD-001',
    date: '2025-07-30',
    status: 'pending',
    total: 5300.00,
    customerName: 'Ali Khan',
    customerEmail: 'ali.khan@example.com',
    customerPhone: '+92 300 1234567',
    shippingAddress: '123 Mall Road, Lahore, Pakistan',
    items: [
      {
        name: 'Premium Norozi Chappal',
        quantity: 1,
        price: 2500.00,
        image: 'https://www.peshawarichappals.pk/wp-content/uploads/2024/08/372-300x300.jpg',
      },
      {
        name: 'Luxury Norozi Chappal',
        quantity: 1,
        price: 2800.00,
        image: 'https://www.peshawarichappals.pk/wp-content/uploads/2024/08/38-300x300.jpg',
      },
    ],
  },
  {
    id: 'ORD-002',
    date: '2025-07-29',
    status: 'shipped',
    total: 7700.00,
    customerName: 'Fatima Noor',
    customerEmail: 'fatima.noor@example.com',
    customerPhone: '+92 301 7654321',
    shippingAddress: 'House 45, F-11, Islamabad, Pakistan',
    items: [
      {
        name: 'Royal Kaptaan Chappal',
        quantity: 1,
        price: 4200.00,
        image: 'https://www.peshawarichappals.pk/wp-content/uploads/2024/08/382-300x300.jpg',
      },
      {
        name: 'Classic Zardari Chappal',
        quantity: 1,
        price: 3500.00,
        image: 'https://www.peshawarichappals.pk/wp-content/uploads/2024/08/231-300x300.jpg',
      },
    ],
  },
  {
    id: 'ORD-003',
    date: '2025-07-28',
    status: 'delivered',
    total: 3600.00,
    customerName: 'Zara Ahmed',
    customerEmail: 'zara.ahmed@example.com',
    customerPhone: '+92 302 4567890',
    shippingAddress: 'Street 10, Gulshan-e-Iqbal, Karachi, Pakistan',
    items: [
      {
        name: 'Traditional Peshawari Chappal',
        quantity: 2,
        price: 1800.00,
        image: 'https://www.peshawarichappals.pk/wp-content/uploads/2024/08/23-300x300.jpg',
      },
    ],
  },
];

export const mockUsers = [
  {
    id: 'USR-001',
    name: 'Ali Raza',
    email: 'ali.raza@example.com',
    phone: '+92 300 1234567',
    address: '123 Main Street, Lahore, Pakistan',
    joinDate: '2024-11-01',
    lastLogin: '2025-07-31 09:15 AM',
    role: 'admin',
    status: 'active',
  },
  {
    id: 'USR-002',
    name: 'Fatima Bano',
    email: 'fatima.bano@example.com',
    phone: '+92 301 7654321',
    address: 'Block 5, Clifton, Karachi, Pakistan',
    joinDate: '2023-09-12',
    lastLogin: '2025-07-30 02:45 PM',
    role: 'user',
    status: 'inactive',
  },
  {
    id: 'USR-003',
    name: 'Zubair Khan',
    email: 'zubair.khan@example.com',
    phone: '+92 302 4567890',
    address: 'House 20, F-10, Islamabad, Pakistan',
    joinDate: '2022-01-20',
    lastLogin: '2025-07-29 06:10 PM',
    role: 'moderator',
    status: 'active',
  }
];