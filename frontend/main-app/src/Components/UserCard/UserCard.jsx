import React from 'react';
import { Link } from 'react-router-dom';

const UserCard = () => {
  return (
    <div className="max-w-md mx-auto mt-8 bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2 text-gray-800">User Management</div>
        <p className="text-gray-600 text-base mb-4">
          Access the user management system to handle all your user-related tasks.
        </p>
        <Link
          to="/user-manager"
          className="inline-block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out transform hover:scale-105"
        >
          Open User Manager
        </Link>
      </div>
    </div>
  );
};

export default UserCard; 