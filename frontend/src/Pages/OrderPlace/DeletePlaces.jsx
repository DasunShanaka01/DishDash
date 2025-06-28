import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const DeletePlaces = () => {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [order, setOrder] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrder = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`http://localhost:8080/api/v1/order-places/${id}`);
        setOrder(response.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load order');
        console.error('Error:', err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchOrder();
  }, [id]);

  const handleDelete = async () => {
    if (window.confirm(`Are you sure you want to delete the order for ${order?.name || 'this order'}?`)) {
      setIsLoading(true);
      try {
        await axios.delete(`http://localhost:8080/api/v1/order-places/${id}`);
        navigate('/dashboardPlace');
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to delete order');
        console.error('Error:', err);
      } finally {
        setIsLoading(false);
      }
    }
  };

  if (isLoading) {
    return (
      <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div>
        <p className="mt-4 text-gray-700">Loading order...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md text-center">
        <p className="text-red-700">{error}</p>
        <button
          onClick={() => navigate('/dashboardPlace')}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          Back to Dashboard
        </button>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md text-center">
        <p className="text-gray-700">Order not found</p>
        <button
          onClick={() => navigate('/dashboardPlace')}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          Back to Dashboard
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Delete Order</h2>
      <div className="mb-6 p-4 bg-yellow-100 text-yellow-700 rounded-md">
        <p>Are you sure you want to delete the following order?</p>
        <p><strong>Order ID:</strong> {order.orderId}</p>
        <p><strong>Food ID:</strong> {order.foodId}</p>
        <p><strong>Customer Name:</strong> {order.name}</p>
        <p><strong>Delivery Address:</strong> {order.address}</p>
        <p><strong>Phone Number:</strong> {order.phoneNumber}</p>
      </div>
      {error && <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">{error}</div>}
      <div className="flex justify-between pt-4">
        <button
          onClick={() => navigate('/dashboardPlace')}
          className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors"
        >
          Cancel
        </button>
        <button
          onClick={handleDelete}
          disabled={isLoading}
          className={`px-6 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors ${
            isLoading ? 'opacity-70 cursor-not-allowed' : ''
          }`}
        >
          {isLoading ? 'Deleting...' : 'Confirm Delete'}
        </button>
      </div>
    </div>
  );
};

export default DeletePlaces;