import React from "react";
import { useOrders } from "../pages/Contexts/Order";

interface CustomerInfo {
  country: string;
  townCity: string;
  streetAddress: string;
  phone: string;
  email?: string;
  fullName: string;
  note?: string;
  coupon?: string;
}

interface OrderItem {
  id: number;
  image: string;
  price: number;
  name?: string;
  quantity: number;
  selectedOptions: {
    color: string;
    size: string;
  };
  totalPrice: number;
}

interface Order {
  _id: string;
  orderNumber: string;
  orderDate: string;
  totalQuantity: number;
  totalAmount: number;
  orderStatus: string;
  paymentMethod: string;
  customerInfo: CustomerInfo;
  items: OrderItem[];
}

interface UserHistoryProps {
  orderHistory: Order[];
}

const UserHistory: React.FC<UserHistoryProps> = () => {
  const {orderHistory}=useOrders()

  if ( orderHistory.length === 0) {
    return <p>No past orders found.</p>;
  } 

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border-collapse border border-gray-300">
        <thead className="bg-gray-200">
          <tr>
            <th className="border border-gray-300 px-4 py-2">Order #</th>
            <th className="border border-gray-300 px-4 py-2">Date</th>
            <th className="border border-gray-300 px-4 py-2">Quantity</th>
            <th className="border border-gray-300 px-4 py-2">Total</th>
            <th className="border border-gray-300 px-4 py-2">Status</th>
            <th className="border border-gray-300 px-4 py-2">Payment</th>
          </tr>
        </thead>
        <tbody>
          {orderHistory.map((order) => (
            <tr key={order._id} className="hover:bg-gray-50">
              <td className="border border-gray-300 px-4 py-2">{order.orderNumber}</td>
              <td className="border border-gray-300 px-4 py-2">
                {new Date(order.orderDate).toLocaleDateString()}
              </td>
              <td className="border border-gray-300 px-4 py-2">{order.totalQuantity}</td>
              <td className="border border-gray-300 px-4 py-2">${order.totalAmount.toFixed(2)}</td>
              <td className="border border-gray-300 px-4 py-2 capitalize">{order.orderStatus}</td>
              <td className="border border-gray-300 px-4 py-2">{order.paymentMethod}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserHistory;
