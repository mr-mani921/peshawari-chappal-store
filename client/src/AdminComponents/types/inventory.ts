export interface InventoryProduct {
  id: string;
  name: string;
  color: string;
  category: string;
  price: number;
  stock: number;
  minStock: number;
  supplier: string;
  description: string;
  image: string;
  status: 'active' | 'inactive' | 'out-of-stock';
  createdAt: string;
  updatedAt: string;
}


export interface Supplier {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  productsCount: number;
}

export interface StockMovement {
  id: string;
  productId: string;
  productName: string;
  type: 'in' | 'out' | 'adjustment';
  quantity: number;
  reason: string;
  date: string;
  user: string;
}

export interface DashboardStats {
  totalProducts: number;
  lowStockItems: number;
  totalValue: number;
  recentMovements: number;
}
export interface OrderItem {
  name: string;
  quantity: number;
  price: number;
  image: string;
}

export interface Order {
  id: string;
  date: string;
  status: string; // or use a union type like 'pending' | 'shipped' | ...
  total: number;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  shippingAddress: string;
  items: OrderItem[]; // use the OrderItem interface you already created
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  joinDate: string;
  lastLogin: string;
  role: string;   // ← now accepts any string
  status: string; // ← now accepts any string
}
