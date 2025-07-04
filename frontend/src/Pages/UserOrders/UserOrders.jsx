import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ClockIcon, TruckIcon, CheckCircleIcon, XCircleIcon, FireIcon, MapPinIcon, CalendarIcon, CurrencyDollarIcon } from '@heroicons/react/24/outline';
import { useAuth } from '../AuthContext.jsx';

const UserOrders = () => {
  const [orders, setOrders] = useState([]);
  const { userId } = useAuth();
  const [foodNames, setFoodNames] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('all');

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
    pending: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    preparing: 'bg-blue-100 text-blue-800 border-blue-200',
    cooking: 'bg-orange-100 text-orange-800 border-orange-200',
    delivery: 'bg-purple-100 text-purple-800 border-purple-200',
    completed: 'bg-green-100 text-green-800 border-green-200',
    rejected: 'bg-red-100 text-red-800 border-red-200'
  };

  // Valid status values
  const validStatuses = ['pending', 'preparing', 'cooking', 'delivery', 'completed', 'rejected'];

  // Fetch all orders and food names on component mount
  useEffect(() => {
    // Only fetch orders if userId is available
    if (!userId) {
      console.log('UserId not available yet, skipping fetch');
      return;
    }

    const fetchOrders = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${API_BASE_URL}/api/v1/order-places/user/${userId}`);
        console.log('API Response (Orders):', response.data);
        if (Array.isArray(response.data)) {
          const normalizedOrders = response.data.map(order => ({
            ...order,
            status: validStatuses.includes(order.status?.toLowerCase()) ? order.status.toLowerCase() : 'pending'
          }));
          setOrders(normalizedOrders);

          const uniqueFoodIds = [...new Set(
            normalizedOrders.flatMap(order => 
              order.items && Array.isArray(order.items) ? order.items.map(item => item.foodId) : []
            )
          )];
          
          const foodNamePromises = uniqueFoodIds.map(async (foodId) => {
            try {
              const foodResponse = await axios.get(`${API_BASE_URL}/api/food/${foodId}`);
              console.log(`Food Response (${foodId}):`, foodResponse.data);
              const foodData = foodResponse.data && foodResponse.data.name ? foodResponse.data : { name: 'Unknown Item' };
              return { foodId, name: foodData.name };
            } catch (err) {
              console.error(`Error fetching food ${foodId}:`, err);
              return { foodId, name: foodId };
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
  }, [userId]); // Added userId as dependency

  // Filter orders based on status
  const filteredOrders = orders.filter(order => {
    if (filter === 'all') return true;
    return order.status === filter;
  });

  // Get order counts for each status
  const getStatusCounts = () => {
    const counts = { all: orders.length };
    validStatuses.forEach(status => {
      counts[status] = orders.filter(order => order.status === status).length;
    });
    return counts;
  };

  const statusCounts = getStatusCounts();

  if (loading) return (
    <div className="flex justify-center items-center py-12">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
    </div>
  );

  // Check if user is not authenticated
  if (!userId && !loading) {
    return (
      <div className="text-center py-12">
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-8 max-w-md mx-auto">
          <ClockIcon className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Authentication Required</h3>
          <p className="text-gray-600">Please log in to view your orders.</p>
        </div>
      </div>
    );
  }
  
  if (error) return (
    <div className="text-center py-8">
      <div className="bg-red-50 border border-red-200 rounded-lg p-4 max-w-md mx-auto">
        <XCircleIcon className="w-8 h-8 text-red-500 mx-auto mb-2" />
        <p className="text-red-700">{error}</p>
      </div>
    </div>
  );

  if (!Array.isArray(orders)) {
    console.error('Orders state is not an array:', orders);
    return (
      <div className="text-center py-8">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 max-w-md mx-auto">
          <XCircleIcon className="w-8 h-8 text-red-500 mx-auto mb-2" />
          <p className="text-red-700">Error: Invalid orders data</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">My Orders</h1>
        <p className="text-gray-600">Track your food orders and delivery status</p>
      </div>

      {/* Filter Tabs */}
      <div className="mb-6 border-b border-gray-200">
        <nav className="flex space-x-8">
          {['all', ...validStatuses].map(status => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`py-2 px-1 border-b-2 font-medium text-sm capitalize transition-colors ${
                filter === status
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {status} ({statusCounts[status] || 0})
            </button>
          ))}
        </nav>
      </div>

      {/* Orders Grid */}
      {filteredOrders.length === 0 ? (
        <div className="text-center py-12">
          <div className="bg-gray-50 rounded-lg p-8 max-w-md mx-auto">
            <ClockIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No orders found</h3>
            <p className="text-gray-500">
              {filter === 'all' 
                ? "You haven't placed any orders yet." 
                : `No orders with status "${filter}".`}
            </p>
          </div>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredOrders.map(order => {
            const status = order.status?.toLowerCase() || 'pending';
            const StatusIcon = statusIcons[status] || ClockIcon;
            
            return (
              <div key={order.orderId.toString()} className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow">
                {/* Order Header */}
                <div className="p-6 pb-4">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        Order #{order.orderId.toString()}
                      </h3>
                      <p className="text-sm text-gray-500">{order.fullName}</p>
                    </div>
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm border ${statusColors[status] || 'bg-gray-100 text-gray-800 border-gray-200'}`}>
                      <StatusIcon className="w-4 h-4 mr-1" />
                      {status}
                    </span>
                  </div>

                  {/* Order Items */}
                  <div className="mb-4">
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Items:</h4>
                    <div className="space-y-1">
                      {order.items && Array.isArray(order.items) ? (
                        order.items.map((item, index) => (
                          <div key={index} className="flex justify-between text-sm">
                            <span className="text-gray-600">
                              {foodNames[item.foodId] || item.foodId}
                            </span>
                            <span className="text-gray-900 font-medium">
                              x{item.quantity}
                            </span>
                          </div>
                        ))
                      ) : (
                        <span className="text-sm text-gray-500">No items</span>
                      )}
                    </div>
                  </div>

                  {/* Order Details */}
                  <div className="space-y-3">
                    <div className="flex items-center text-sm text-gray-600">
                      <CurrencyDollarIcon className="w-4 h-4 mr-2" />
                      <span className="font-medium text-gray-900">${order.total.toFixed(2)}</span>
                    </div>
                    
                    <div className="flex items-start text-sm text-gray-600">
                      <MapPinIcon className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" />
                      <span className="break-words">{order.address}</span>
                    </div>
                    
                    {order.createdAt && (
                      <div className="flex items-center text-sm text-gray-600">
                        <CalendarIcon className="w-4 h-4 mr-2" />
                        <span>{new Date(order.createdAt).toLocaleDateString()}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Progress Bar for Active Orders */}
                {['pending', 'preparing', 'cooking', 'delivery'].includes(status) && (
                  <div className="px-6 pb-4">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full transition-all duration-300 ${
                          status === 'pending' ? 'bg-yellow-400 w-1/4' :
                          status === 'preparing' ? 'bg-blue-400 w-2/4' :
                          status === 'cooking' ? 'bg-orange-400 w-3/4' :
                          'bg-purple-400 w-full'
                        }`}
                      />
                    </div>
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>Order Placed</span>
                      <span>Out for Delivery</span>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
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
        <div className="text-center py-8">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 max-w-md mx-auto">
            <XCircleIcon className="w-8 h-8 text-red-500 mx-auto mb-2" />
            <p className="text-red-700">
              Error: {this.state.error?.message || 'Something went wrong'}
            </p>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

export default () => (
  <OrdersErrorBoundary>
    <UserOrders />
  </OrdersErrorBoundary>
);