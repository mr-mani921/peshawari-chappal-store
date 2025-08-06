import { Product, Supplier, StockMovement, DashboardStats } from '../types/inventory';

export const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Wireless Bluetooth Headphones',
    sku: 'WBH-001',
    category: 'Electronics',
    price: 89.99,
    stock: 45,
    minStock: 10,
    supplier: 'TechCorp Ltd',
    description: 'High-quality wireless headphones with noise cancellation',
    image: 'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=300',
    status: 'active',
    createdAt: '2024-01-15',
    updatedAt: '2024-01-20'
  },
  {
    id: '2',
    name: 'Smart Watch Series X',
    sku: 'SWX-002',
    category: 'Electronics',
    price: 299.99,
    stock: 8,
    minStock: 15,
    supplier: 'SmartTech Inc',
    description: 'Advanced smartwatch with health monitoring features',
    image: 'https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?auto=compress&cs=tinysrgb&w=300',
    status: 'active',
    createdAt: '2024-01-10',
    updatedAt: '2024-01-18'
  },
  {
    id: '3',
    name: 'Ergonomic Office Chair',
    sku: 'EOC-003',
    category: 'Furniture',
    price: 249.99,
    stock: 0,
    minStock: 5,
    supplier: 'ComfortSeating Co',
    description: 'Premium ergonomic chair for office use',
    image: 'https://images.pexels.com/photos/586996/pexels-photo-586996.jpeg?auto=compress&cs=tinysrgb&w=300',
    status: 'out-of-stock',
    createdAt: '2024-01-05',
    updatedAt: '2024-01-22'
  },
  {
    id: '4',
    name: 'Stainless Steel Water Bottle',
    sku: 'SSWB-004',
    category: 'Accessories',
    price: 24.99,
    stock: 120,
    minStock: 20,
    supplier: 'EcoBottles Ltd',
    description: 'Insulated stainless steel water bottle',
    image: 'https://images.pexels.com/photos/1000084/pexels-photo-1000084.jpeg?auto=compress&cs=tinysrgb&w=300',
    status: 'active',
    createdAt: '2024-01-12',
    updatedAt: '2024-01-19'
  },
  {
    id: '5',
    name: 'Gaming Mechanical Keyboard',
    sku: 'GMK-005',
    category: 'Electronics',
    price: 129.99,
    stock: 25,
    minStock: 8,
    supplier: 'GameTech Pro',
    description: 'RGB mechanical keyboard for gaming',
    image: 'https://images.pexels.com/photos/2115257/pexels-photo-2115257.jpeg?auto=compress&cs=tinysrgb&w=300',
    status: 'active',
    createdAt: '2024-01-08',
    updatedAt: '2024-01-21'
  }
];

export const mockSuppliers: Supplier[] = [
  {
    id: '1',
    name: 'TechCorp Ltd',
    email: 'contact@techcorp.com',
    phone: '+1 (555) 123-4567',
    address: '123 Tech Street, Silicon Valley, CA 94000',
    productsCount: 15
  },
  {
    id: '2',
    name: 'SmartTech Inc',
    email: 'info@smarttech.com',
    phone: '+1 (555) 987-6543',
    address: '456 Innovation Ave, Austin, TX 78701',
    productsCount: 8
  },
  {
    id: '3',
    name: 'ComfortSeating Co',
    email: 'sales@comfortseating.com',
    phone: '+1 (555) 456-7890',
    address: '789 Furniture Blvd, Grand Rapids, MI 49503',
    productsCount: 12
  }
];

export const mockStockMovements: StockMovement[] = [
  {
    id: '1',
    productId: '1',
    productName: 'Wireless Bluetooth Headphones',
    type: 'in',
    quantity: 50,
    reason: 'New stock received',
    date: '2024-01-20',
    user: 'John Doe'
  },
  {
    id: '2',
    productId: '2',
    productName: 'Smart Watch Series X',
    type: 'out',
    quantity: 7,
    reason: 'Customer order',
    date: '2024-01-19',
    user: 'Jane Smith'
  },
  {
    id: '3',
    productId: '4',
    productName: 'Stainless Steel Water Bottle',
    type: 'in',
    quantity: 100,
    reason: 'Bulk purchase',
    date: '2024-01-18',
    user: 'Mike Johnson'
  }
];

export const mockDashboardStats: DashboardStats = {
  totalProducts: 5,
  lowStockItems: 2,
  totalValue: 45847.50,
  recentMovements: 15
};

export const mockOrders = [
  {
    id: 'ORD-001',
    date: '2025-07-30',
    status: 'pending',
    total: 129.98,
    customerName: 'Ali Khan',
    customerEmail: 'ali.khan@example.com',
    customerPhone: '+92 300 1234567',
    shippingAddress: '123 Mall Road, Lahore, Pakistan',
    items: [
      {
        name: 'Wireless Mouse',
        quantity: 2,
        price: 29.99,
        image: 'https://via.placeholder.com/50x50.png?text=Mouse',
      },
      {
        name: 'Keyboard',
        quantity: 1,
        price: 69.99,
        image: 'https://via.placeholder.com/50x50.png?text=Keyboard',
      },
    ],
  },
  {
    id: 'ORD-002',
    date: '2025-07-29',
    status: 'shipped',
    total: 249.97,
    customerName: 'Fatima Noor',
    customerEmail: 'fatima.noor@example.com',
    customerPhone: '+92 301 7654321',
    shippingAddress: 'House 45, F-11, Islamabad, Pakistan',
    items: [
      {
        name: 'Smartphone Case',
        quantity: 3,
        price: 19.99,
        image: 'https://via.placeholder.com/50x50.png?text=Case',
      },
      {
        name: 'Bluetooth Speaker',
        quantity: 1,
        price: 189.99,
        image: 'https://via.placeholder.com/50x50.png?text=Speaker',
      },
    ],
  },
  {
    id: 'ORD-003',
    date: '2025-07-28',
    status: 'delivered',
    total: 74.97,
    customerName: 'Zara Ahmed',
    customerEmail: 'zara.ahmed@example.com',
    customerPhone: '+92 302 4567890',
    shippingAddress: 'Street 10, Gulshan-e-Iqbal, Karachi, Pakistan',
    items: [
      {
        name: 'USB-C Charger',
        quantity: 1,
        price: 24.99,
        image: 'https://via.placeholder.com/50x50.png?text=Charger',
      },
      {
        name: 'Laptop Stand',
        quantity: 1,
        price: 49.98,
        image: 'https://via.placeholder.com/50x50.png?text=Stand',
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
