import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ClockIcon, TruckIcon, CheckCircleIcon, XCircleIcon, FireIcon, CheckIcon } from '@heroicons/react/24/outline';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [foodNames, setFoodNames] = useState({}); // Cache for food names
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Backend API base URL
  const API_BASE_URL = 'http://localhost:8080';

  // Status icons and colors
  const statusIcons = {
    pending: ClockIcon,
    preparing: FireIcon,
    cooking: FireIcon,
    delivery: TruckIcon,
    completed: CheckCircleIcon,
    rejected: XCircleIcon
  };

  const statusColors = {
    pending: 'bg-yellow-100 text-yellow-800',
    preparing: 'bg-blue-100 text-blue-800',
    cooking: 'bg-orange-100 text-orange-800',
    delivery: 'bg-purple-100 text-purple-800',
    completed: 'bg-green-100 text-green-800',
    rejected: 'bg-red-100 text-red-800'
  };

  // Valid status values
  const validStatuses = ['pending', 'preparing', 'cooking', 'delivery', 'completed', 'rejected'];

  // Fetch all orders and food names on component mount
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/v1/order-places`);
        console.log('API Response (Orders):', response.data); // Log response for debugging
        if (Array.isArray(response.data)) {
          // Normalize status to prevent null values
          const normalizedOrders = response.data.map(order => ({
            ...order,
            status: validStatuses.includes(order.status?.toLowerCase()) ? order.status.toLowerCase() : 'pending'
          }));
          setOrders(normalizedOrders);

          // Fetch food names for all unique foodIds
          const uniqueFoodIds = [...new Set(
            normalizedOrders.flatMap(order => 
              order.items && Array.isArray(order.items) ? order.items.map(item => item.foodId) : []
            )
          )];
          
          const foodNamePromises = uniqueFoodIds.map(async (foodId) => {
            try {
              const foodResponse = await axios.get(`${API_BASE_URL}/api/food/${foodId}`);
              console.log(`Food Response (${foodId}):`, foodResponse.data); // Log food response
              // Handle Optional<Food> response
              const foodData = foodResponse.data && foodResponse.data.name ? foodResponse.data : { name: 'Unknown Item' };
              return { foodId, name: foodData.name };
            } catch (err) {
              console.error(`Error fetching food ${foodId}:`, err);
              return { foodId, name: foodId }; // Fallback to foodId if not found
            }
          });

          const foodNameResults = await Promise.all(foodNamePromises);
          const foodNameMap = foodNameResults.reduce((acc, { foodId, name }) => ({
            ...acc,
            [foodId]: name
          }), {});
          setFoodNames(foodNameMap);
        } else {
          console.error('Response data is not an array:', response.data);
          setError('Invalid data format from server');
        }
        setLoading(false);
      } catch (err) {
        console.error('Fetch error:', err);
        setError('Failed to fetch orders: ' + err.message);
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  // Handle status update
  const handleStatusChange = async (orderId, newStatus) => {
    try {
      const response = await axios.put(`${API_BASE_URL}/api/v1/order-places/${orderId}/status`, {
        status: newStatus
      });
      console.log('Update response:', response.data); // Log update response
      setOrders(orders.map(order =>
        order.orderId === orderId ? { ...order, status: newStatus } : order
      ));
    } catch (err) {
      console.error('Update error:', err);
      setError('Failed to update order status: ' + err.message);
    }
  };

  if (loading) return <div className="text-center py-8">Loading...</div>;
  if (error) return <div className="text-center py-8 text-red-500">{error}</div>;

  if (!Array.isArray(orders)) {
    console.error('Orders state is not an array:', orders);
    return <div className="text-center py-8 text-red-500">Error: Invalid orders data</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold" style={{ color: '#7B4019' }}>Order Management</h2>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left p-3">Order ID</th>
                <th className="text-left p-3">Customer</th>
                <th className="text-left p-3">Items</th>
                <th className="text-left p-3">Total</th>
                <th className="text-left p-3">Location</th>
                <th className="text-left p-3">Status</th>
                <th className="text-left p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map(order => {
                const status = order.status?.toLowerCase() || 'pending';
                const StatusIcon = statusIcons[status] || ClockIcon;
                return (
                  <tr key={order.orderId.toString()} className="border-b hover:bg-gray-50">
                    <td className="p-3">#{order.orderId.toString()}</td>
                    <td className="p-3">{order.fullName}</td>
                    <td className="p-3">
                      {order.items && Array.isArray(order.items)
                        ? order.items.map(item => `${foodNames[item.foodId] || item.foodId}: ${item.quantity}`).join(', ')
                        : 'No items'}
                    </td>
                    <td className="p-3">${order.total.toFixed(2)}</td>
                    <td className="p-3">{order.address}</td>
                    <td className="p-3">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm ${statusColors[status] || 'bg-gray-100 text-gray-800'}`}>
                        <StatusIcon className="w-4 h-4 mr-1" />
                        {status}
                      </span>
                    </td>
                    <td className="p-3">
                      <select
                        value={status}
                        onChange={(e) => handleStatusChange(order.orderId.toString(), e.target.value)}
                        className="px-3 py-1 border rounded-md text-sm"
                        style={{ borderColor: '#FF7D29' }}
                      >
                        <option value="pending">Pending</option>
                        <option value="preparing">Preparing</option>
                        <option value="cooking">Cooking</option>
                        <option value="delivery">Out for Delivery</option>
                        <option value="completed">Completed</option>
                        <option value="rejected">Rejected</option>
                      </select>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

// Error Boundary Component
class OrdersErrorBoundary extends React.Component {
  state = { hasError: false, error: null };

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="text-center py-8 text-red-500">
          Error: {this.state.error?.message || 'Something went wrong'}
        </div>
      );
    }
    return this.props.children;
  }
}

export default () => (
  <OrdersErrorBoundary>
    <Orders />
  </OrdersErrorBoundary>
);