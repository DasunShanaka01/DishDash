import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const ShowPlace = () => {
  const { id } = useParams();
  const [order, setOrder] = useState({
    foodId: '',
    name: '',
    address: '',
    phoneNumber: ''
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/v1/order-places/${id}`);
        const { foodId, name, address, phoneNumber } = response.data;
        setOrder({ foodId, name, address, phoneNumber });
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load order details');
        console.error('Error:', err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchOrder();
  }, [id]);

  const handleBack = () => {
    navigate(-1);
  };

  if (isLoading) {
    return (
      <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div>
        <p className="mt-4 text-gray-700">Loading order place details...</p>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Order Place Details</h2>
      
      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
          {error}
        </div>
      )}

      <div className="space-y-4">
        <div className="form-group">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Food ID
          </label>
          <div className="w-full px-4 py-2 border border-gray-200 rounded-md bg-gray-50">
            {order.foodId}
          </div>
        </div>

        <div className="form-group">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Customer Name
          </label>
          <div className="w-full px-4 py-2 border border-gray-200 rounded-md bg-gray-50">
            {order.name}
          </div>
        </div>

        <div className="form-group">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Delivery Address
          </label>
          <div className="w-full px-4 py-2 border border-gray-200 rounded-md bg-gray-50 min-h-[6rem]">
            {order.address}
          </div>
        </div>

        <div className="form-group">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Phone Number
          </label>
          <div className="w-full px-4 py-2 border border-gray-200 rounded-md bg-gray-50">
            {order.phoneNumber}
          </div>
        </div>

        <div className="flex justify-end pt-4">
          <button
            type="button"
            onClick={handleBack}
            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Back to Order Places
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShowPlace;