import React, { useState, useEffect, useMemo } from "react";
import {
  ShoppingCart,
  Search,
  Eye,
  Package,
  CheckCircle,
  Clock,
  XCircle,
  Edit,
  Trash2,
  Download,
  Plus,
  DollarSign,
  FileText,
  MapPin,
  Phone,
  Mail,
  User,
} from "lucide-react";
import { useOrders } from "../pages/Contexts/Order";
import API from "../utils/api";
import { Danger, Info, Success } from "../utils/Tostify";

// Updated Type Definitions according to Mongoose schema
interface OrderItem {
  id: string;
  image: string;
  price: number;
  name: string;
  quantity: number;
  size: string;
  color: string;
  style: string;
  material: string;
  sole: string;
  customizations?: {
    color?: { name: string; label: string; hex: string; price: number };
    style?: { name: string; label: string; price: number };
    material?: { name: string; label: string; price: number };
    sole?: { name: string; label: string; price: number };
  };
  customizationPrice: number;
  basePrice: number;
  originalPrice: number;
  rating: number;
  reviewCount: number;
  cartId?: string;
}

interface Order {
  _id: string;
  uid: string;
  customerInfo: {
    country: string;
    townCity: string;
    streetAddress: string;
    coupon?: string;
    phone: string;
    email?: string;
    note?: string;
    fullName: string;
  };
  items: OrderItem[];
  totalAmount: number;
  orderStatus: "pending" | "delivered";
  orderDate: string;
  orderNumber: string;
  paymentMethod: string;
  totalQuantity: number;
}

const Orders: React.FC = () => {
  const { orders, setOrders } = useOrders();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [showOrderDetails, setShowOrderDetails] = useState(false);
  const [sortBy, setSortBy] = useState<"date" | "total" | "customer">("date");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [dateRange, setDateRange] = useState({ start: "", end: "" });

  // Constants
  const statuses = ["all", "delivered"];

  // Computed Statistics
  const orderStats = useMemo(() => {
    const total = orders.length;
    const pending = orders.filter((o) => o.orderStatus === "pending").length;
    const delivered = orders.filter(
      (o) => o.orderStatus === "delivered"
    ).length;
    const totalRevenue = orders.reduce(
      (sum, order) => sum + order.totalAmount,
      0
    );
    const avgOrderValue = total > 0 ? totalRevenue / total : 0;

    return {
      total,
      pending,
      delivered,
      totalRevenue,
      avgOrderValue,
    };
  }, [orders]);

  // Filtered and Sorted Orders
  const filteredOrders = useMemo(() => {
    let filtered = orders.filter((order) => {
      const matchesSearch =
        order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.customerInfo.fullName
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        order.customerInfo.email
          ?.toLowerCase()
          .includes(searchTerm.toLowerCase());

      const matchesStatus =
        selectedStatus === "all" || order.orderStatus === selectedStatus;
      const matchesDateRange =
        !dateRange.start ||
        !dateRange.end ||
        (order.orderDate >= dateRange.start &&
          order.orderDate <= dateRange.end);

      return matchesSearch && matchesStatus && matchesDateRange;
    });

    // Sort orders
    filtered.sort((a, b) => {
      let compareValue = 0;

      switch (sortBy) {
        case "date":
          compareValue =
            new Date(a.orderDate).getTime() - new Date(b.orderDate).getTime();
          break;
        case "total":
          compareValue = a.totalAmount - b.totalAmount;
          break;
        case "customer":
          compareValue = a.customerInfo.fullName.localeCompare(
            b.customerInfo.fullName
          );
          break;
      }

      return sortOrder === "asc" ? compareValue : -compareValue;
    });

    return filtered;
  }, [orders, searchTerm, selectedStatus, dateRange, sortBy, sortOrder]);

  // Status Badge Component
  const getStatusBadge = (status: string) => {
    const statusConfig = {
      pending: {
        color: "bg-yellow-100 text-yellow-800 border-yellow-200",
        icon: Clock,
      },
      delivered: {
        color: "bg-green-100 text-green-800 border-green-200",
        icon: CheckCircle,
      },
    };

    const config = statusConfig[status as keyof typeof statusConfig];
    const Icon = config.icon;

    return (
      <span
        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${config.color}`}
      >
        <Icon size={12} className="mr-1" />
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  // Update Order Status
  const updateOrderStatus = async (
    orderId: string,
    newStatus: "pending" | "delivered"
  ) => {
    try {
      const res = await API.post(`/orders/deliver/${orderId}`);
      console.log(res.data);
      setOrders(
        orders.map((order) =>
          order._id === orderId ? { ...order, orderStatus: newStatus } : order
        )
      );
      if (selectedOrder?._id === orderId) {
        setSelectedOrder((prev) =>
          prev ? { ...prev, orderStatus: newStatus } : null
        );
        Success("Order successfully delivered");
      }
    } catch (error) {
      console.log(error.message);
      Danger("Failed to deliver order");
    }
  };

  // Delete Order
  const deleteOrder = async (orderId: string) => {
    if (window.confirm("Are you sure you want to delete this order?")) {
      try {
        const res = await API.delete(`/orders/delete/${orderId}`);
        console.log(res.data);
        setOrders(orders.filter((order) => order._id !== orderId));
        Info("Order successfully deleted");
        if (selectedOrder?._id === orderId) {
          setShowOrderDetails(false);
        }
      } catch (error) {
        console.log(error.message);
      }
    }
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
                <h2 className="text-xl font-semibold text-gray-900">
                  Order Details
                </h2>
                <p className="text-sm text-gray-500 mt-1">
                  Order {selectedOrder.orderNumber}
                </p>
              </div>
              <button
                onClick={() => setShowOrderDetails(false)}
                className="text-gray-400 hover:text-gray-600 p-2 rounded-lg hover:bg-gray-100"
              >
                <XCircle size={20} />
              </button>
            </div>
          </div>

          <div className="p-6 space-y-6">
            {/* Order Info Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Order Information */}
              <div className="lg:col-span-1 space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Order Information
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Order Number:</span>
                    <span className="font-medium">
                      {selectedOrder.orderNumber}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Date:</span>
                    <span className="font-medium">
                      {new Date(selectedOrder.orderDate).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Status:</span>
                    {getStatusBadge(selectedOrder.orderStatus)}
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Payment:</span>
                    <span className="font-medium">
                      {selectedOrder.paymentMethod}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total Items:</span>
                    <span className="font-medium">
                      {selectedOrder.totalQuantity}
                    </span>
                  </div>
                </div>
              </div>

              {/* Customer Information */}
              <div className="lg:col-span-2 space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Customer Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <User size={16} className="text-gray-400" />
                      <span>{selectedOrder.customerInfo.fullName}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Phone size={16} className="text-gray-400" />
                      <span>{selectedOrder.customerInfo.phone}</span>
                    </div>
                    {selectedOrder.customerInfo.email && (
                      <div className="flex items-center space-x-2">
                        <Mail size={16} className="text-gray-400" />
                        <span>{selectedOrder.customerInfo.email}</span>
                      </div>
                    )}
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-start space-x-2">
                      <MapPin size={16} className="text-gray-400 mt-1" />
                      <div>
                        <p className="text-sm font-medium">Address:</p>
                        <p className="text-sm text-gray-600">
                          {selectedOrder.customerInfo.streetAddress},<br />
                          {selectedOrder.customerInfo.townCity},<br />
                          {selectedOrder.customerInfo.country}
                        </p>
                      </div>
                    </div>
                    {selectedOrder.customerInfo.coupon && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">Coupon:</span>
                        <span className="font-medium">
                          {selectedOrder.customerInfo.coupon}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
                {selectedOrder.customerInfo.note && (
                  <div className="mt-4">
                    <h4 className="text-sm font-medium text-gray-700 mb-1">
                      Customer Note
                    </h4>
                    <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
                      {selectedOrder.customerInfo.note}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Order Summary */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Order Summary
              </h3>
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex justify-between font-bold text-lg pb-2">
                  <span>Total Amount:</span>
                  <span>PKR{selectedOrder.totalAmount.toFixed(2)}</span>
                </div>
              </div>
            </div>

            {/* Order Items */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Order Items ({selectedOrder.items.length})
              </h3>
              <div className="bg-gray-50 rounded-lg overflow-hidden">
                <table className="w-full">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                        Product
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                        Price
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                        Quantity
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                        Size
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                        Color
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                        Style
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                        Material
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                        Sole
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                        Total
                      </th>
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
                              className="w-12 h-12 rounded-lg object-cover border"
                            />
                            <div>
                              <div className="font-medium">
                                {item.name || "Product"}
                              </div>
                              <div className="text-sm text-gray-500">
                                ID: {item.id}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          PKR{item.price.toFixed(2)}
                        </td>
                        <td className="px-4 py-3">{item.quantity}</td>
                        <td className="px-4 py-3">{item.size || "N/A"}</td>
                        <td className="px-4 py-3">
                          <div className="flex items-center">
                            <div
                              className="w-4 h-4 rounded-full border mr-2"
                              style={{
                                backgroundColor: item.color || "transparent",
                              }}
                            />
                            {item.color
                              ? item.color.charAt(0).toUpperCase() +
                                item.color.slice(1)
                              : "N/A"}
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          {item.style
                            ? item.style.charAt(0).toUpperCase() +
                              item.style.slice(1)
                            : "N/A"}
                        </td>
                        <td className="px-4 py-3">
                          {item.material
                            ? item.material.charAt(0).toUpperCase() +
                              item.material.slice(1)
                            : "N/A"}
                        </td>
                        <td className="px-4 py-3">
                          {item.sole
                            ? item.sole.charAt(0).toUpperCase() +
                              item.sole.slice(1)
                            : "N/A"}
                        </td>
                        <td className="px-4 py-3 font-medium">
                          PKR{(item.price * item.quantity).toFixed(2)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Status Update */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Update Status
              </h3>
              <div className="flex flex-wrap gap-2">
                {statuses
                  .filter((s) => s !== "all")
                  .map((status) => (
                    <button
                      key={status}
                      onClick={() =>
                        updateOrderStatus(
                          selectedOrder._id,
                          status as "delivered"
                        )
                      }
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                        selectedOrder.orderStatus === status
                          ? "bg-blue-600"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      {status.charAt(0).toUpperCase() + status.slice(1)}
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
          <h1 className="text-3xl font-bold text-gray-900">
            Orders Management
          </h1>
          <p className="text-gray-600 mt-2">Track and manage customer orders</p>
        </div>
        <div className="flex items-center space-x-2 mt-4 sm:mt-0">
          <button
            style={{ color: "black" }}
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus size={16} className="mr-2" />
            Add Order
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
          <div className="flex items-center">
            <ShoppingCart size={20} className="text-blue-600" />
            <div className="ml-3">
              <p className="text-xs font-medium text-gray-600">Total Orders</p>
              <p className="text-xl font-bold text-gray-900">
                {orderStats.total}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
          <div className="flex items-center">
            <Clock size={20} className="text-yellow-600" />
            <div className="ml-3">
              <p className="text-xs font-medium text-gray-600">Pending</p>
              <p className="text-xl font-bold text-gray-900">
                {orderStats.pending}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
          <div className="flex items-center">
            <DollarSign size={20} className="text-green-600" />
            <div className="ml-3">
              <p className="text-xs font-medium text-gray-600">Total Revenue</p>
              <p className="text-xl font-bold text-gray-900">
                PKR{orderStats.totalRevenue.toFixed(0)}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <div className="md:col-span-2">
            <div className="relative">
              <Search
                size={20}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />
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
            {statuses.map((status) => (
              <option key={status} value={status}>
                {status === "all"
                  ? "All Status"
                  : status.charAt(0).toUpperCase() + status.slice(1)}
              </option>
            ))}
          </select>
          <select
            value={sortBy}
            onChange={(e) =>
              setSortBy(e.target.value as "date" | "total" | "customer")
            }
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="date">Sort by Date</option>
            <option value="total">Sort by Total</option>
            <option value="customer">Sort by Customer</option>
          </select>
          <button
            onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
            className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center"
          >
            {sortOrder === "asc" ? "↑" : "↓"}
          </button>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Order #
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Items
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center">
                    <div className="flex flex-col items-center">
                      <ShoppingCart size={48} className="text-gray-300 mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 mb-2">
                        No orders found
                      </h3>
                      <p className="text-gray-500">
                        Try adjusting your search or filter criteria
                      </p>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredOrders.map((order) => (
                  <tr
                    key={order._id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-blue-600">
                        {order.orderNumber}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {order.customerInfo.fullName}
                      </div>
                      <div className="text-sm text-gray-500">
                        {order.customerInfo.email}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(order.orderDate).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {order.totalQuantity} items
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900">
                      PKR{order.totalAmount.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getStatusBadge(order.orderStatus)}
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
                          onClick={() => deleteOrder(order._id)}
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
      </div>

      {/* Order Details Modal */}
      {showOrderDetails && <OrderDetailsModal />}
    </div>
  );
};

export default Orders;
