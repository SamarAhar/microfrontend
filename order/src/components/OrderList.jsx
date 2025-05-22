import axios from 'axios';
import { toast } from 'react-toastify';
import { FaTrash } from 'react-icons/fa';

export default function OrderList({ orders = [], refreshOrders }) {
  const handleDeleteOrder = async (orderId) => {
    try {
      await axios.delete(`http://localhost:8080/orders/${orderId}`);
      toast.success('Order deleted successfully!', { position: 'top-center' });
      refreshOrders();
    } catch {
      toast.error('Error deleting order', { position: 'top-center' });
    }
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-md mx-4 md:mx-8 h-full">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">Order List</h2>
      <div className="space-y-4">
        {orders.length === 0 ? (
          <div className="p-4 border rounded-xl bg-gray-50 text-center">
            <p className="text-gray-500">No orders found. Add one to get started!</p>
          </div>
        ) : (
          orders.map((order) => (
            <div
              key={order.id}
              className="p-4 border rounded-xl bg-gray-50 hover:shadow transition-shadow"
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="font-semibold text-lg text-gray-800 mb-1">Order ID: {order.id}</h3>
                  <p className="text-gray-600">User: {order.userName}</p>
                  <p className="text-gray-600">Product: {order.productName}</p>
                  <p className="text-gray-600">Quantity: {order.quantity}</p>
                </div>
                <button
                  onClick={() => handleDeleteOrder(order.id)}
                  className="p-2 text-red-600 hover:bg-red-100 rounded-full"
                  title="Delete"
                >
                  <FaTrash />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
