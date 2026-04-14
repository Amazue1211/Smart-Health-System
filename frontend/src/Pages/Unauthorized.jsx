import React from 'react';
import { Link } from 'react-router-dom';
import { FaExclamationTriangle } from 'react-icons/fa';

const Unauthorized = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 text-center max-w-md">
        <FaExclamationTriangle className="text-amber-500 text-5xl mx-auto mb-4" />
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Access Denied</h1>
        <p className="text-gray-500 mb-6">You don't have permission to access this page.</p>
        <Link to="/" className="bg-teal-600 text-white px-6 py-2 rounded-xl hover:bg-teal-700">
          Go to Dashboard
        </Link>
      </div>
    </div>
  );
};

export default Unauthorized;