import React from 'react';
import { Link } from 'react-router-dom';

const OrderCard = () => {
  return (
    <div className="max-w-md mx-auto mt-8 bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2 text-gray-800">Order Management</div>
        <p className="text-gray-600 text-base mb-4">
          Access the Order management system to handle all your Order-related tasks.
        </p>
        <Link
          to="/order-manager"
          className="inline-block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out transform hover:scale-105"
        >
          Open Order Manager
        </Link>
      </div>
    </div>
  );
};

export default OrderCard; 