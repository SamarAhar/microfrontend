import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useQuery } from '@apollo/client';
import { GET_USER, GET_PRODUCT } from '../graphql/queries';
import clients from '../../apolloClient';

export default function OrderForm({ refreshOrders }) {
  const [userId, setUserId] = useState('');
  const [productId, setProductId] = useState('');
  const [quantity, setQuantity] = useState('');

  const { data: usersData, loading: usersLoading, error: usersError } = useQuery(GET_USER, {
    client: clients.userClient
  });
  
  const { data: productsData, loading: productsLoading, error: productsError } = useQuery(GET_PRODUCT, {
    client: clients.productClient
  });

  useEffect(() => {
    if (usersError) {
      toast.error('Failed to fetch users', { position: 'top-center' });
    }
    if (productsError) {
      toast.error('Failed to fetch products', { position: 'top-center' });
    }
  }, [usersError, productsError]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userId || !productId || !quantity) {
      toast.error('Please fill all fields', { position: 'top-center' });
      return;
    }

    try {
      await axios.post('http://localhost:8080/orders', null, {
        params: {
          userId: Number(userId),
          productId: Number(productId),
          qty: Number(quantity),
        },
      });
      toast.success('Order created successfully!', { position: 'top-center' });
      setUserId('');
      setProductId('');
      setQuantity('');
      refreshOrders();
    } catch {
      toast.error('Error adding order', { position: 'top-center' });
    }
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-md mx-4 md:mx-8 h-full">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">Add New Order</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">User</label>
          <select
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-400 focus:border-red-400 transition"
            required
            disabled={usersLoading}
          >
            <option value="">Select user</option>
            {usersData?.getAllUser?.map((user) => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Product</label>
          <select
            value={productId}
            onChange={(e) => setProductId(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-400 focus:border-red-400 transition"
            required
            disabled={productsLoading}
          >
            <option value="">Select product</option>
            {productsData?.getAllProduct?.map((product) => (
              <option key={product.id} value={product.id}>
                {product.productName}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Quantity</label>
          <input
            type="number"
            min="1"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-400 focus:border-red-400 transition"
            placeholder="Enter quantity"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full px-4 py-2 rounded-lg text-white bg-red-600 hover:bg-red-700 transition font-medium"
        >
          Create Order
        </button>
      </form>
    </div>
  );
}
