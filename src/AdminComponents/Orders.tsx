import React, { useState, useEffect, useMemo } from 'react';
import { 
  ShoppingCart, 
  Search, 
  Filter, 
  Eye, 
  Package, 
  Calendar,
  User,
  MapPin,
  Phone,
  Mail,
  CheckCircle,
  Clock,
  Truck,
  XCircle,
  Edit,
  Trash2,
  Download,
  RefreshCw,
  Plus,
  AlertTriangle,
  DollarSign,
  TrendingUp,
  FileText
} from 'lucide-react';

// Enhanced Type Definitions
interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  sku?: string;
}

interface Order {
  id: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  shippingAddress: string;
  billingAddress?: string;
  date: string;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled' | 'refunded';
  total: number;
  subtotal: number;
  tax: number;
  shipping: number;
  discount?: number;
  items: OrderItem[];
  paymentMethod: string;
  trackingNumber?: string;
  notes?: string;
  priority: 'low' | 'medium' | 'high';
  estimatedDelivery?: string;
}

// Enhanced Mock Data
const mockOrders: Order[] = [
  {
    id: 'ORD-2025-001',
    customerName: 'John Smith',
    customerEmail: 'john.smith@email.com',
    customerPhone: '+1-555-0123',
    shippingAddress: '123 Main St, Anytown, ST 12345',
    billingAddress: '123 Main St, Anytown, ST 12345',
    date: '2025-08-06',
    status: 'pending',
    subtotal: 199.98,
    tax: 16.00,
    shipping: 9.99,
    total: 225.97,
    paymentMethod: 'Credit Card',
    priority: 'high',
    estimatedDelivery: '2025-08-08',
    items: [
      { 
        id: '1', 
        name: 'Wireless Headphones', 
        price: 99.99, 
        quantity: 2, 
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=100&h=100&fit=crop',
        sku: 'WH-001'
      }
    ],
    notes: 'Customer requested expedited shipping'
  },
  {
    id: 'ORD-2025-002',
    customerName: 'Sarah Johnson',
    customerEmail: 'sarah.j@email.com',
    customerPhone: '+1-555-0124',
    shippingAddress: '456 Oak Ave, Another City, ST 67890',
    date: '2025-08-05',
    status: 'shipped',
    subtotal: 79.99,
    tax: 6.40,
    shipping: 5.99,
    total: 92.38,
    paymentMethod: 'PayPal',
    priority: 'medium',
    trackingNumber: 'TRK123456789',
    estimatedDelivery: '2025-08-07',
    items: [
      { 
        id: '2', 
        name: 'Smartphone Case', 
        price: 24.99, 
        quantity: 1, 
        image: 'https://images.unsplash.com/photo-1556656793-08538906a9f8?w=100&h=100&fit=crop',
        sku: 'SC-002'
      },
      { 
        id: '3', 
        name: 'Screen Protector', 
        price: 14.99, 
        quantity: 2, 
        image: 'https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?w=100&h=100&fit=crop',
        sku: 'SP-003'
      },
      { 
        id: '4', 
        name: 'USB Cable', 
        price: 19.99, 
        quantity: 2, 
        image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=100&h=100&fit=crop',
        sku: 'UC-004'
      }
    ]
  },
  {
    id: 'ORD-2025-003',
    customerName: 'Michael Brown',
    customerEmail: 'mike.brown@email.com',
    customerPhone: '+1-555-0125',
    shippingAddress: '789 Pine Rd, Third Town, ST 11111',
    date: '2025-08-04',
    status: 'delivered',
    subtotal: 149.99,
    tax: 12.00,
    shipping: 0.00,
    discount: 15.00,
    total: 146.99,
    paymentMethod: 'Credit Card',
    priority: 'low',
    trackingNumber: 'TRK987654321',
    items: [
      { 
        id: '5', 
        name: 'Bluetooth Speaker', 
        price: 149.99, 
        quantity: 1, 
        image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=100&h=100&fit=crop',
        sku: 'BS-005'
      }
    ],
    notes: 'Free shipping applied for orders over PKR100'
  }
];

const Orders: React.FC = () => {
  // State Management
  const [orders, setOrders] = useState<Order[]>(mockOrders);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedPriority, setSelectedPriority] = useState('all');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [showOrderDetails, setShowOrderDetails] = useState(false);
  const [showAddOrder, setShowAddOrder] = useState(false);
  const [sortBy, setSortBy] = useState<'date' | 'total' | 'customer'>('date');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [dateRange, setDateRange] = useState({ start: '', end: '' });
  const [isLoading, setIsLoading] = useState(false);

  // Constants
  const statuses = ['all', 'pending', 'processing', 'shipped', 'delivered', 'cancelled', 'refunded'];
  const priorities = ['all', 'low', 'medium', 'high'];

  // Computed Statistics
  const orderStats = useMemo(() => {
    const total = orders.length;
    const pending = orders.filter(o => o.status === 'pending').length;
    const shipped = orders.filter(o => o.status === 'shipped').length;
    const delivered = orders.filter(o => o.status === 'delivered').length;
    const cancelled = orders.filter(o => o.status === 'cancelled').length;
    const totalRevenue = orders
      .filter(o => o.status !== 'cancelled' && o.status !== 'refunded')
      .reduce((sum, order) => sum + order.total, 0);
    const avgOrderValue = total > 0 ? totalRevenue / total : 0;
    const highPriorityOrders = orders.filter(o => o.priority === 'high').length;

    return {
      total,
      pending,
      shipped,
      delivered,
      cancelled,
      totalRevenue,
      avgOrderValue,
      highPriorityOrders
    };
  }, [orders]);

  // Filtered and Sorted Orders
  const filteredOrders = useMemo(() => {
    let filtered = orders.filter(order => {
      const matchesSearch = order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           order.customerEmail.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = selectedStatus === 'all' || order.status === selectedStatus;
      const matchesPriority = selectedPriority === 'all' || order.priority === selectedPriority;
      const matchesDateRange = !dateRange.start || !dateRange.end || 
                              (order.date >= dateRange.start && order.date <= dateRange.end);
      
      return matchesSearch && matchesStatus && matchesPriority && matchesDateRange;
    });

    // Sort orders
    filtered.sort((a, b) => {
      let compareValue = 0;
      
      switch (sortBy) {
        case 'date':
          compareValue = new Date(a.date).getTime() - new Date(b.date).getTime();
          break;
        case 'total':
          compareValue = a.total - b.total;
          break;
        case 'customer':
          compareValue = a.customerName.localeCompare(b.customerName);
          break;
      }
      
      return sortOrder === 'asc' ? compareValue : -compareValue;
    });

    return filtered;
  }, [orders, searchTerm, selectedStatus, selectedPriority, dateRange, sortBy, sortOrder]);

  // Status Badge Component
  const getStatusBadge = (status: string, priority?: string) => {
    const statusConfig = {
      pending: { color: 'bg-yellow-100 text-yellow-800 border-yellow-200', icon: Clock },
      processing: { color: 'bg-blue-100 text-blue-800 border-blue-200', icon: Package },
      shipped: { color: 'bg-purple-100 text-purple-800 border-purple-200', icon: Truck },
      delivered: { color: 'bg-green-100 text-green-800 border-green-200', icon: CheckCircle },
      cancelled: { color: 'bg-red-100 text-red-800 border-red-200', icon: XCircle },
      refunded: { color: 'bg-gray-100 text-gray-800 border-gray-200', icon: RefreshCw }
    };

    const config = statusConfig[status as keyof typeof statusConfig];
    const Icon = config.icon;

    return (
      <div className="flex items-center space-x-2">
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border PKR{config.color}`}>
          <Icon size={12} className="mr-1" />
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </span>
        {priority === 'high' && (
          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800 border border-red-200">
            <AlertTriangle size={10} className="mr-1" />
            High Priority
          </span>
        )}
      </div>
    );
  };

  // Priority Badge Component
  const getPriorityBadge = (priority: string) => {
    const colors = {
      low: 'bg-gray-100 text-gray-800',
      medium: 'bg-yellow-100 text-yellow-800',
      high: 'bg-red-100 text-red-800'
    };

    return (
      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium PKR{colors[priority as keyof typeof colors]}`}>
        {priority.charAt(0).toUpperCase() + priority.slice(1)}
      </span>
    );
  };

  // Update Order Status
  const updateOrderStatus = (orderId: string, newStatus: string) => {
    setIsLoading(true);
    setTimeout(() => {
      setOrders(orders.map(order => 
        order.id === orderId ? { ...order, status: newStatus as Order['status'] } : order
      ));
      if (selectedOrder?.id === orderId) {
        setSelectedOrder(prev => prev ? { ...prev, status: newStatus as Order['status'] } : null);
      }
      setIsLoading(false);
    }, 500);
  };

  // Delete Order
  const deleteOrder = (orderId: string) => {
    if (window.confirm('Are you sure you want to delete this order?')) {
      setOrders(orders.filter(order => order.id !== orderId));
      if (selectedOrder?.id === orderId) {
        setShowOrderDetails(false);
      }
    }
  };

  // Export Orders
  const exportOrders = () => {
    const csvContent = [
      ['Order ID', 'Customer', 'Email', 'Date', 'Status', 'Total', 'Priority'].join(','),
      ...filteredOrders.map(order => [
        order.id,
        order.customerName,
        order.customerEmail,
        order.date,
        order.status,
        order.total,
        order.priority
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'orders.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  // Order Details Modal Component
  const OrderDetailsModal = () => {
    if (!selectedOrder) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-xl shadow-xl w-full max-w-5xl mx-4 max-h-[90vh] overflow-y-auto">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold text-gray-900">Order Details</h2>
                <p className="text-sm text-gray-500 mt-1">Order {selectedOrder.id}</p>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => console.log('Print order')}
                  className="text-gray-400 hover:text-gray-600 p-2 rounded-lg hover:bg-gray-100"
                >
                  <FileText size={20} />
                </button>
                <button
                  onClick={() => setShowOrderDetails(false)}
                  className="text-gray-400 hover:text-gray-600 p-2 rounded-lg hover:bg-gray-100"
                >
                  <XCircle size={20} />
                </button>
              </div>
            </div>
          </div>
          
          <div className="p-6 space-y-6">
            {/* Order Info Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Order Information */}
              <div className="lg:col-span-1 space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Order Information</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Order ID:</span>
                    <span className="font-medium">{selectedOrder.id}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Date:</span>
                    <span className="font-medium">{selectedOrder.date}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Status:</span>
                    {getStatusBadge(selectedOrder.status, selectedOrder.priority)}
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Priority:</span>
                    {getPriorityBadge(selectedOrder.priority)}
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Payment:</span>
                    <span className="font-medium">{selectedOrder.paymentMethod}</span>
                  </div>
                  {selectedOrder.trackingNumber && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Tracking:</span>
                      <span className="font-medium text-blue-600">{selectedOrder.trackingNumber}</span>
                    </div>
                  )}
                  {selectedOrder.estimatedDelivery && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Est. Delivery:</span>
                      <span className="font-medium">{selectedOrder.estimatedDelivery}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Customer Information */}
              <div className="lg:col-span-1 space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Customer Information</h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <User size={16} className="text-gray-400" />
                    <span>{selectedOrder.customerName}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Mail size={16} className="text-gray-400" />
                    <span>{selectedOrder.customerEmail}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Phone size={16} className="text-gray-400" />
                    <span>{selectedOrder.customerPhone}</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <MapPin size={16} className="text-gray-400 mt-1" />
                    <div>
                      <p className="text-sm font-medium">Shipping Address:</p>
                      <p className="text-sm text-gray-600">{selectedOrder.shippingAddress}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1 space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Order Summary</h3>
                <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                  <div className="flex justify-between">
                    <span>Subtotal:</span>
                    <span>PKR{selectedOrder.subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tax:</span>
                    <span>PKR{selectedOrder.tax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping:</span>
                    <span>PKR{selectedOrder.shipping.toFixed(2)}</span>
                  </div>
                  {selectedOrder.discount && (
                    <div className="flex justify-between text-green-600">
                      <span>Discount:</span>
                      <span>-PKR{selectedOrder.discount.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="border-t border-gray-200 pt-2 flex justify-between font-bold text-lg">
                    <span>Total:</span>
                    <span>PKR{selectedOrder.total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Order Items */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Order Items ({selectedOrder.items.length})</h3>
              <div className="bg-gray-50 rounded-lg overflow-hidden">
                <table className="w-full">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Product</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">SKU</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Quantity</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Price</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Total</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {selectedOrder.items.map((item, index) => (
                      <tr key={index}>
                        <td className="px-4 py-3">
                          <div className="flex items-center space-x-3">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-12 h-12 rounded-lg object-cover"
                            />
                            <span className="font-medium">{item.name}</span>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-gray-600">{item.sku || 'N/A'}</td>
                        <td className="px-4 py-3">{item.quantity}</td>
                        <td className="px-4 py-3">PKR{item.price.toFixed(2)}</td>
                        <td className="px-4 py-3 font-medium">PKR{(item.quantity * item.price).toFixed(2)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Notes */}
            {selectedOrder.notes && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Notes</h3>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <p className="text-blue-800">{selectedOrder.notes}</p>
                </div>
              </div>
            )}

            {/* Status Update */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Update Status</h3>
              <div className="flex flex-wrap gap-2">
                {statuses.filter(s => s !== 'all').map(status => (
                  <button
                    key={status}
                    onClick={() => updateOrderStatus(selectedOrder.id, status)}
                    disabled={isLoading}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors disabled:opacity-50 PKR{
                      selectedOrder.status === status
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {isLoading && selectedOrder.status === status ? (
                      <RefreshCw size={14} className="animate-spin" />
                    ) : (
                      status.charAt(0).toUpperCase() + status.slice(1)
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Orders Management</h1>
          <p className="text-gray-600 mt-2">Track and manage customer orders efficiently</p>
        </div>
        <div className="flex items-center space-x-2 mt-4 sm:mt-0">
          <button
            onClick={exportOrders}
            className="inline-flex items-center px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
          >
            <Download size={16} className="mr-2" />
            Export
          </button>
          <button
            onClick={() => setShowAddOrder(true)}
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus size={16} className="mr-2" />
            Add Order
          </button>
        </div>
      </div>

      {/* Enhanced Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-4">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
          <div className="flex items-center">
            <ShoppingCart size={20} className="text-blue-600" />
            <div className="ml-3">
              <p className="text-xs font-medium text-gray-600">Total Orders</p>
              <p className="text-xl font-bold text-gray-900">{orderStats.total}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
          <div className="flex items-center">
            <Clock size={20} className="text-yellow-600" />
            <div className="ml-3">
              <p className="text-xs font-medium text-gray-600">Pending</p>
              <p className="text-xl font-bold text-gray-900">{orderStats.pending}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
          <div className="flex items-center">
            <Truck size={20} className="text-purple-600" />
            <div className="ml-3">
              <p className="text-xs font-medium text-gray-600">Shipped</p>
              <p className="text-xl font-bold text-gray-900">{orderStats.shipped}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
          <div className="flex items-center">
            <CheckCircle size={20} className="text-green-600" />
            <div className="ml-3">
              <p className="text-xs font-medium text-gray-600">Delivered</p>
              <p className="text-xl font-bold text-gray-900">{orderStats.delivered}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
          <div className="flex items-center">
            <DollarSign size={20} className="text-green-600" />
            <div className="ml-3">
              <p className="text-xs font-medium text-gray-600">Revenue</p>
              <p className="text-xl font-bold text-gray-900">PKR{orderStats.totalRevenue.toFixed(0)}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
          <div className="flex items-center">
            <AlertTriangle size={20} className="text-red-600" />
            <div className="ml-3">
              <p className="text-xs font-medium text-gray-600">High Priority</p>
              <p className="text-xl font-bold text-gray-900">{orderStats.highPriorityOrders}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Filters and Search */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
          <div className="lg:col-span-2">
            <div className="relative">
              <Search size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search orders, customers, or emails..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full"
              />
            </div>
          </div>
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {statuses.map(status => (
              <option key={status} value={status}>
                {status === 'all' ? 'All Status' : status.charAt(0).toUpperCase() + status.slice(1)}
              </option>
            ))}
          </select>
          <select
            value={selectedPriority}
            onChange={(e) => setSelectedPriority(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {priorities.map(priority => (
              <option key={priority} value={priority}>
                {priority === 'all' ? 'All Priority' : priority.charAt(0).toUpperCase() + priority.slice(1)}
              </option>
            ))}
          </select>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as 'date' | 'total' | 'customer')}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="date">Sort by Date</option>
            <option value="total">Sort by Total</option>
            <option value="customer">Sort by Customer</option>
          </select>
          <button
            onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
            className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center"
            title={`Sort PKR{sortOrder === 'asc' ? 'Descending' : 'Ascending'}`}
          >
            <TrendingUp size={16} className={`transform transition-transform PKR{sortOrder === 'desc' ? 'rotate-180' : ''}`} />
          </button>
        </div>
        
        {/* Date Range Filter */}
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">From Date</label>
            <input
              type="date"
              value={dateRange.start}
              onChange={(e) => setDateRange(prev => ({ ...prev, start: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">To Date</label>
            <input
              type="date"
              value={dateRange.end}
              onChange={(e) => setDateRange(prev => ({ ...prev, end: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="flex items-end">
            <button
              onClick={() => setDateRange({ start: '', end: '' })}
              className="px-4 py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Clear Dates
            </button>
          </div>
          <div className="flex items-end justify-end">
            <span className="text-sm text-gray-500">
              {filteredOrders.length} of {orders.length} orders
            </span>
          </div>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Order Info
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Items & Total
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status & Priority
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Payment & Delivery
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center">
                    <div className="flex flex-col items-center">
                      <ShoppingCart size={48} className="text-gray-300 mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 mb-2">No orders found</h3>
                      <p className="text-gray-500">Try adjusting your search or filter criteria</p>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{order.id}</div>
                        <div className="text-sm text-gray-500">{order.date}</div>
                        {order.trackingNumber && (
                          <div className="text-xs text-blue-600 mt-1">
                            Track: {order.trackingNumber}
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{order.customerName}</div>
                        <div className="text-sm text-gray-500">{order.customerEmail}</div>
                        <div className="text-xs text-gray-400">{order.customerPhone}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm text-gray-900">
                          {order.items.length} item{order.items.length !== 1 ? 's' : ''}
                        </div>
                        <div className="text-sm font-bold text-gray-900">PKR{order.total.toFixed(2)}</div>
                        {order.discount && (
                          <div className="text-xs text-green-600">
                            -PKR{order.discount.toFixed(2)} discount
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="space-y-1">
                        {getStatusBadge(order.status, order.priority)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm text-gray-900">{order.paymentMethod}</div>
                        {order.estimatedDelivery && (
                          <div className="text-sm text-gray-500">
                            Est: {order.estimatedDelivery}
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => {
                            setSelectedOrder(order);
                            setShowOrderDetails(true);
                          }}
                          className="text-blue-600 hover:text-blue-900 p-1 rounded hover:bg-blue-50 transition-colors"
                          title="View Details"
                        >
                          <Eye size={16} />
                        </button>
                        <button
                          onClick={() => console.log('Edit order', order.id)}
                          className="text-gray-600 hover:text-gray-900 p-1 rounded hover:bg-gray-50 transition-colors"
                          title="Edit Order"
                        >
                          <Edit size={16} />
                        </button>
                        <button
                          onClick={() => deleteOrder(order.id)}
                          className="text-red-600 hover:text-red-900 p-1 rounded hover:bg-red-50 transition-colors"
                          title="Delete Order"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {filteredOrders.length > 0 && (
          <div className="px-6 py-3 bg-gray-50 border-t border-gray-200 flex items-center justify-between">
            <div className="text-sm text-gray-700">
              Showing {filteredOrders.length} results
            </div>
            <div className="text-sm text-gray-500">
              Total Revenue: ${filteredOrders.reduce((sum, order) => sum + order.total, 0).toFixed(2)}
            </div>
          </div>
        )}
      </div>

      {/* Modals */}
      {showOrderDetails && <OrderDetailsModal />}

      {/* Add Order Modal Placeholder */}
      {showAddOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl mx-4">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-900">Add New Order</h2>
                <button
                  onClick={() => setShowAddOrder(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <XCircle size={24} />
                </button>
              </div>
            </div>
            <div className="p-6">
              <div className="text-center py-12">
                <Package size={48} className="mx-auto text-gray-300 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Add Order Form</h3>
                <p className="text-gray-500 mb-6">This feature would contain a form to add new orders</p>
                <button
                  onClick={() => setShowAddOrder(false)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Close for Now
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Loading Overlay */}
      {isLoading && (
        <div className="fixed inset-0 bg-black bg-opacity-25 flex items-center justify-center z-40">
          <div className="bg-white rounded-lg p-6 flex items-center space-x-3">
            <RefreshCw size={20} className="animate-spin text-blue-600" />
            <span className="text-gray-700">Updating order...</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Orders;