import React from 'react';
import { 
  Package, 
  AlertTriangle, 
  DollarSign, 
  TrendingUp,
  ArrowUp,
  ArrowDown,
  Eye,
  Edit,
  Trash2
} from 'lucide-react';
import { mockDashboardStats, mockProducts, mockStockMovements } from './Data/mockData';

const Dashboard: React.FC = () => {
  const stats = [
    {
      title: 'Total Products',
      value: mockDashboardStats.totalProducts,
      icon: Package,
      color: 'from-blue-500 to-blue-600',
      change: '+12%',
      isPositive: true
    },
    {
      title: 'Low Stock Items',
      value: mockDashboardStats.lowStockItems,
      icon: AlertTriangle,
      color: 'from-red-500 to-red-600',
      change: '-5%',
      isPositive: false
    },
    {
      title: 'Total Value',
      value: `$${mockDashboardStats.totalValue.toLocaleString()}`,
      icon: DollarSign,
      color: 'from-green-500 to-green-600',
      change: '+8%',
      isPositive: true
    },
    {
      title: 'Recent Movements',
      value: mockDashboardStats.recentMovements,
      icon: TrendingUp,
      color: 'from-purple-500 to-purple-600',
      change: '+15%',
      isPositive: true
    }
  ];

  const lowStockProducts = mockProducts.filter(product => product.stock <= product.minStock);

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-2">Welcome back! Here's what's happening with your inventory.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-900 mt-2">{stat.value}</p>
                <div className="flex items-center mt-2">
                  {stat.isPositive ? (
                    <ArrowUp size={16} className="text-green-500" />
                  ) : (
                    <ArrowDown size={16} className="text-red-500" />
                  )}
                  <span className={`text-sm font-medium ml-1 ${
                    stat.isPositive ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {stat.change}
                  </span>
                  <span className="text-gray-500 text-sm ml-1">vs last month</span>
                </div>
              </div>
              <div className={`w-12 h-12 bg-gradient-to-r ${stat.color} rounded-lg flex items-center justify-center`}>
                <stat.icon size={24} className="text-white" />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Low Stock Alert */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center space-x-2">
              <AlertTriangle size={20} className="text-red-500" />
              <h2 className="text-lg font-semibold text-gray-900">Low Stock Alert</h2>
            </div>
          </div>
          <div className="p-6">
            {lowStockProducts.length > 0 ? (
              <div className="space-y-4">
                {lowStockProducts.map((product) => (
                  <div key={product.id} className="flex items-center justify-between p-4 bg-red-50 rounded-lg border border-red-200">
                    <div className="flex items-center space-x-3">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-10 h-10 rounded-lg object-cover"
                      />
                      <div>
                        <p className="font-medium text-gray-900">{product.name}</p>
                        <p className="text-sm text-gray-600">SKU: {product.sku}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-red-600">
                        {product.stock} / {product.minStock} min
                      </p>
                      <p className="text-xs text-gray-500">Stock remaining</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-center py-8">No low stock items</p>
            )}
          </div>
        </div>

        {/* Recent Stock Movements */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Recent Stock Movements</h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {mockStockMovements.slice(0, 5).map((movement) => (
                <div key={movement.id} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      movement.type === 'in' ? 'bg-green-100' : 'bg-red-100'
                    }`}>
                      {movement.type === 'in' ? (
                        <ArrowUp size={16} className="text-green-600" />
                      ) : (
                        <ArrowDown size={16} className="text-red-600" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{movement.productName}</p>
                      <p className="text-sm text-gray-600">{movement.reason}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`font-medium ${
                      movement.type === 'in' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {movement.type === 'in' ? '+' : '-'}{movement.quantity}
                    </p>
                    <p className="text-xs text-gray-500">{movement.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="flex items-center space-x-3 p-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200">
            <Package size={20} className="text-blue-600" />
            <span className="font-medium text-gray-900">Add New Product</span>
          </button>
          <button className="flex items-center space-x-3 p-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200">
            <TrendingUp size={20} className="text-green-600" />
            <span className="font-medium text-gray-900">Stock Adjustment</span>
          </button>
          <button className="flex items-center space-x-3 p-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200">
            <Eye size={20} className="text-purple-600" />
            <span className="font-medium text-gray-900">Generate Report</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;