import React, { useState, useEffect, useCallback } from 'react';
import { Clock, Truck, CheckCircle, XCircle, ChefHat, Package, Plus, Edit, Eye, MapPin } from 'lucide-react';
import FoodDisplay from '../FoodDisplay/FoodDisplay';
import axios from 'axios';
import Orders from './Orders';

const DishDashAdmin = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [ordersData, setOrdersData] = useState([]);
  const [foodNames, setFoodNames] = useState({});
  const [dashboardData, setDashboardData] = useState({
    totalOrders: 0,
    activeOrders: 0,
    menuItems: 0,
    revenueToday: 0,
    recentOrders: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Backend API base URL
  const API_BASE_URL = 'http://localhost:8080';

  const statusColors = {
    pending: 'bg-yellow-100 text-yellow-800',
    preparing: 'bg-blue-100 text-blue-800',
    cooking: 'bg-orange-100 text-orange-800',
    delivery: 'bg-purple-100 text-purple-800',
    completed: 'bg-green-100 text-green-800',
    rejected: 'bg-red-100 text-red-800'
  };

  const statusIcons = {
    pending: Clock,
    preparing: Package,
    cooking: ChefHat,
    delivery: Truck,
    completed: CheckCircle,
    rejected: XCircle
  };

  const validStatuses = ['pending', 'preparing', 'cooking', 'delivery', 'completed', 'rejected'];

  // Centralized data fetching function
  const fetchAllData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      // Fetch orders
      const ordersResponse = await fetch(`${API_BASE_URL}/api/v1/order-places`);
      if (!ordersResponse.ok) {
        throw new Error(`HTTP error! status: ${ordersResponse.status}`);
      }
      const orders = await ordersResponse.json();

      // Normalize orders
      const normalizedOrders = orders.map(order => ({
        ...order,
        status: validStatuses.includes(order.status?.toLowerCase()) ? order.status.toLowerCase() : 'pending'
      }));

      // Fetch food names
      const uniqueFoodIds = [...new Set(
        normalizedOrders.flatMap(order => 
          order.items && Array.isArray(order.items) ? order.items.map(item => item.foodId) : []
        )
      )];

      const foodNamePromises = uniqueFoodIds.map(async (foodId) => {
        try {
          const foodResponse = await fetch(`${API_BASE_URL}/api/food/${foodId}`);
          if (foodResponse.ok) {
            const foodData = await foodResponse.json();
            return { foodId, name: foodData.name || 'Unknown Item' };
          }
          return { foodId, name: `Item ${foodId}` };
        } catch (err) {
          return { foodId, name: `Item ${foodId}` };
        }
      });

      const foodNameResults = await Promise.all(foodNamePromises);
      const foodNameMap = foodNameResults.reduce((acc, { foodId, name }) => ({
        ...acc,
        [foodId]: name
      }), {});

      // Fetch menu items count
      let menuItemsCount = 0;
      try {
        const foodResponse = await fetch(`${API_BASE_URL}/api/food`);
        if (foodResponse.ok) {
          const foodItems = await foodResponse.json();
          menuItemsCount = foodItems.length;
        }
      } catch (foodError) {
        console.warn('Food API not available');
      }

      // Calculate dashboard statistics
      const totalOrders = normalizedOrders.length;
      const activeOrders = normalizedOrders.filter(order => 
        ['preparing', 'cooking', 'delivery'].includes(order.status)
      ).length;
      
      const today = new Date().toISOString().split('T')[0];
      const todayOrders = normalizedOrders.filter(order => {
        const orderDate = new Date(order.createdAt || order.timestamp || Date.now())
          .toISOString().split('T')[0];
        return orderDate === today;
      });
      const revenueToday = todayOrders.reduce((sum, order) => sum + (order.total || 0), 0);

      const recentOrders = normalizedOrders
        .sort((a, b) => new Date(b.createdAt || b.timestamp || 0) - new Date(a.createdAt || a.timestamp || 0))
        .slice(0, 5)
        .map(order => ({
          ...order,
          itemsDisplay: order.items && Array.isArray(order.items)
            ? order.items.map(item => `${foodNameMap[item.foodId] || item.foodId} (${item.quantity})`).join(', ')
            : 'No items'
        }));

      // Update state
      setOrdersData(normalizedOrders);
      setFoodNames(foodNameMap);
      setDashboardData({
        totalOrders,
        activeOrders,
        menuItems: menuItemsCount,
        revenueToday,
        recentOrders
      });

    } catch (err) {
      console.error('Error fetching data:', err);
      setError('Failed to fetch data: ' + err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  // Handle order status update
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

  // Fetch data on component mount
  useEffect(() => {
    fetchAllData();
  }, [fetchAllData]);

  // Auto-refresh every 30 seconds
  useEffect(() => {
    const interval = setInterval(fetchAllData, 30000);
    return () => clearInterval(interval);
  }, [fetchAllData]);

  const renderDashboard = () => {
    if (loading) {
      return (
        <div className="space-y-6">
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
          </div>
        </div>
      );
    }

    if (error) {
      return (
        <div className="space-y-6">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex items-center">
              <XCircle className="w-5 h-5 text-red-500 mr-2" />
              <p className="text-red-700">{error}</p>
            </div>
            <button
              onClick={fetchAllData}
              className="mt-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
            >
              Retry
            </button>
          </div>
        </div>
      );
    }

    return (
      <div className="space-y-6">
        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="p-6 rounded-lg shadow-md transition-transform hover:scale-105" style={{ backgroundColor: '#FFBF78' }}>
            <h3 className="text-lg font-semibold text-gray-800">Total Orders</h3>
            <p className="text-3xl font-bold mt-2" style={{ color: '#7B4019' }}>
              {dashboardData.totalOrders}
            </p>
            <p className="text-sm text-gray-600 mt-1">All time</p>
          </div>

          <div className="p-6 rounded-lg shadow-md transition-transform hover:scale-105" style={{ backgroundColor: '#D1D8BE' }}>
            <h3 className="text-lg font-semibold text-gray-800">Active Orders</h3>
            <p className="text-3xl font-bold mt-2" style={{ color: '#7B4019' }}>
              {dashboardData.activeOrders}
            </p>
            <p className="text-sm text-gray-600 mt-1">In progress</p>
          </div>

          <div className="p-6 rounded-lg shadow-md transition-transform hover:scale-105" style={{ backgroundColor: '#FF7D29' }}>
            <h3 className="text-lg font-semibold text-white">Menu Items</h3>
            <p className="text-3xl font-bold mt-2 text-white">
              {dashboardData.menuItems}
            </p>
            <p className="text-sm text-orange-100 mt-1">Available</p>
          </div>

          <div className="p-6 rounded-lg shadow-md transition-transform hover:scale-105" style={{ backgroundColor: '#7B4019' }}>
            <h3 className="text-lg font-semibold text-white">Revenue Today</h3>
            <p className="text-3xl font-bold mt-2 text-white">
              ${dashboardData.revenueToday.toFixed(2)}
            </p>
            <p className="text-sm text-orange-100 mt-1">Today's earnings</p>
          </div>
        </div>

        {/* Recent Orders Table */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold" style={{ color: '#7B4019' }}>Recent Orders</h3>
            <button
              onClick={fetchAllData}
              className="px-3 py-1 bg-orange-500 text-white rounded hover:bg-orange-600 transition-colors text-sm"
            >
              Refresh
            </button>
          </div>
          
          {dashboardData.recentOrders.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <Package className="w-12 h-12 mx-auto mb-4 text-gray-300" />
              <p>No recent orders found</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-3">Order ID</th>
                    <th className="text-left p-3">Status</th>
                    <th className="text-left p-3">Quick Action</th>
                  </tr>
                </thead>
                <tbody>
                  {dashboardData.recentOrders.map(order => {
                    const StatusIcon = statusIcons[order.status] || Clock;
                    return (
                      <tr key={order.orderId} className="border-b hover:bg-gray-50">
                        <td className="p-3">#{order.orderId}</td>


                        <td className="p-3">
                          <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm ${statusColors[order.status]}`}>
                            <StatusIcon className="w-4 h-4 mr-1" />
                            {order.status}
                          </span>
                        </td>
                        <td className="p-3">
                          <button
                            onClick={() => setActiveTab('orders')}
                            className="px-3 py-1 bg-orange-500 text-white rounded hover:bg-orange-600 transition-colors text-sm"
                          >
                            View Details
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Customer Insights */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h4 className="text-lg font-semibold mb-4" style={{ color: '#7B4019' }}>Order Summary</h4>
            <div className="space-y-3">
              {Object.entries(
                ordersData.reduce((acc, order) => {
                  acc[order.status] = (acc[order.status] || 0) + 1;
                  return acc;
                }, {})
              ).map(([status, count]) => {
                const StatusIcon = statusIcons[status] || Clock;
                return (
                  <div key={status} className="flex justify-between items-center">
                    <div className="flex items-center">
                      <StatusIcon className="w-4 h-4 mr-2 text-gray-500" />
                      <span className="capitalize">{status}</span>
                    </div>
                    <span className="font-semibold">{count}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderOrders = () => {
    if (loading) {
      return <div className="text-center py-8">Loading orders...</div>;
    }

    if (error) {
      return (
        <div className="text-center py-8 text-red-500">
          <p>{error}</p>
          <button
            onClick={fetchAllData}
            className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
          >
            Retry
          </button>
        </div>
      );
    }

    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold" style={{ color: '#7B4019' }}>Order Management</h2>
          <div className="flex gap-2">
            <button
              onClick={fetchAllData}
              className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600 transition-colors"
            >
              Refresh Orders
            </button>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="overflow-x-auto">
            <Orders/>
          </div>
        </div>
      </div>
    );
  };

  const renderFoods = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold" style={{ color: '#7B4019' }}>Food Management</h2>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <FoodDisplay />
      </div>
    </div>
  );

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: Package },
    { id: 'orders', label: 'Orders', icon: Clock },
    { id: 'foods', label: 'Food Items', icon: ChefHat },
  ];

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#F5F5F5' }}>
      <header className="shadow-md p-4" style={{ backgroundColor: '#7B4019' }}>
        <div className="container mx-auto">
          <h1 className="text-2xl font-bold text-white">Dish Dash Admin Panel</h1>
        </div>
      </header>

      <div className="container mx-auto p-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar */}
          <aside className="w-full lg:w-64">
            <nav className="bg-white rounded-lg shadow-md p-4">
              <ul className="space-y-2">
                {tabs.map(tab => {
                  const Icon = tab.icon;
                  return (
                    <li key={tab.id}>
                      <button
                        onClick={() => setActiveTab(tab.id)}
                        className={`w-full flex items-center gap-3 p-3 rounded-lg transition-colors ${
                          activeTab === tab.id
                            ? 'text-white'
                            : 'text-gray-700 hover:bg-gray-100'
                        }`}
                        style={{
                          backgroundColor: activeTab === tab.id ? '#FF7D29' : 'transparent'
                        }}
                      >
                        <Icon className="w-5 h-5" />
                        {tab.label}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </aside>

          {/* Main Content */}
          <main className="flex-1">
            {activeTab === 'dashboard' && renderDashboard()}
            {activeTab === 'orders' && renderOrders()}
            {activeTab === 'foods' && renderFoods()}
          </main>
        </div>
      </div>
    </div>
  );
};

export default DishDashAdmin;