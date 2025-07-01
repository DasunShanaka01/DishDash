import React, { useState } from 'react';
import { Plus, Edit, Eye, Package, MapPin, Clock, CheckCircle, XCircle, ChefHat, Truck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import FoodDisplay from '../FoodDisplay/FoodDisplay';

const DishDashAdmin = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  
  const navigate = useNavigate();

  const [orders, setOrders] = useState([
    { id: 1, customer: 'John Doe', items: 'Margherita Pizza, Garlic Bread', total: 24.99, status: 'preparing', location: 'Downtown', time: '2024-01-15 14:30' },
    { id: 2, customer: 'Jane Smith', items: 'Pepperoni Pizza, Coke', total: 18.50, status: 'cooking', location: 'Suburbs', time: '2024-01-15 14:45' },
    { id: 3, customer: 'Mike Johnson', items: 'Hawaiian Pizza', total: 22.00, status: 'delivery', location: 'City Center', time: '2024-01-15 15:00' },
    { id: 4, customer: 'Sarah Wilson', items: 'Veggie Supreme', total: 26.75, status: 'pending', location: 'East Side', time: '2024-01-15 15:15' }
  ]);

  const [foods, setFoods] = useState([
    { id: 1, name: 'Margherita Pizza', price: 15.99, category: 'Pizza', image: '/api/placeholder/150/150', available: true },
    { id: 2, name: 'Pepperoni Pizza', price: 17.99, category: 'Pizza', image: '/api/placeholder/150/150', available: true },
    { id: 3, name: 'Garlic Bread', price: 6.99, category: 'Sides', image: '/api/placeholder/150/150', available: false }
  ]);

  const [newFood, setNewFood] = useState({
    name: '',
    price: '',
    category: '',
    description: '',
    image: ''
  });

  const [showAddFood, setShowAddFood] = useState(false);


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

  const updateOrderStatus = (orderId, newStatus) => {
    setOrders(orders.map(order => 
      order.id === orderId ? { ...order, status: newStatus } : order
    ));
  };

  const addNewFood = () => {
    if (newFood.name && newFood.price && newFood.category) {
      const food = {
        id: foods.length + 1,
        ...newFood,
        price: parseFloat(newFood.price),
        available: true,
        image: '/api/placeholder/150/150'
      };
      setFoods([...foods, food]);
      setNewFood({ name: '', price: '', category: '', description: '', image: '' });
      setShowAddFood(false);
    }
  };

  const toggleFoodAvailability = (foodId) => {
    setFoods(foods.map(food => 
      food.id === foodId ? { ...food, available: !food.available } : food
    ));
  };

  const renderDashboard = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="p-6 rounded-lg shadow-md" style={{ backgroundColor: '#FFBF78' }}>
          <h3 className="text-lg font-semibold text-gray-800">Total Orders</h3>
          <p className="text-3xl font-bold mt-2" style={{ color: '#7B4019' }}>{orders.length}</p>
        </div>
        <div className="p-6 rounded-lg shadow-md" style={{ backgroundColor: '#D1D8BE' }}>
          <h3 className="text-lg font-semibold text-gray-800">Active Orders</h3>
          <p className="text-3xl font-bold mt-2" style={{ color: '#7B4019' }}>
            {orders.filter(o => ['preparing', 'cooking', 'delivery'].includes(o.status)).length}
          </p>
        </div>
        <div className="p-6 rounded-lg shadow-md" style={{ backgroundColor: '#FF7D29' }}>
          <h3 className="text-lg font-semibold text-white">Menu Items</h3>
          <p className="text-3xl font-bold mt-2 text-white">{foods.length}</p>
        </div>
        <div className="p-6 rounded-lg shadow-md" style={{ backgroundColor: '#7B4019' }}>
          <h3 className="text-lg font-semibold text-white">Revenue Today</h3>
          <p className="text-3xl font-bold mt-2 text-white">$284.50</p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold mb-4" style={{ color: '#7B4019' }}>Recent Orders</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left p-3">Order ID</th>
                <th className="text-left p-3">Customer</th>
                <th className="text-left p-3">Items</th>
                <th className="text-left p-3">Total</th>
                <th className="text-left p-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.slice(0, 5).map(order => {
                const StatusIcon = statusIcons[order.status];
                return (
                  <tr key={order.id} className="border-b hover:bg-gray-50">
                    <td className="p-3">#{order.id}</td>
                    <td className="p-3">{order.customer}</td>
                    <td className="p-3">{order.items}</td>
                    <td className="p-3">${order.total}</td>
                    <td className="p-3">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm ${statusColors[order.status]}`}>
                        <StatusIcon className="w-4 h-4 mr-1" />
                        {order.status}
                      </span>
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

  const renderOrders = () => (
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
                <th className="text-left p-3">Time</th>
                <th className="text-left p-3">Status</th>
                <th className="text-left p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map(order => {
                const StatusIcon = statusIcons[order.status];
                return (
                  <tr key={order.id} className="border-b hover:bg-gray-50">
                    <td className="p-3">#{order.id}</td>
                    <td className="p-3">{order.customer}</td>
                    <td className="p-3">{order.items}</td>
                    <td className="p-3">${order.total}</td>
                    <td className="p-3">{order.location}</td>
                    <td className="p-3">{order.time}</td>
                    <td className="p-3">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm ${statusColors[order.status]}`}>
                        <StatusIcon className="w-4 h-4 mr-1" />
                        {order.status}
                      </span>
                    </td>
                    <td className="p-3">
                      <select
                        value={order.status}
                        onChange={(e) => updateOrderStatus(order.id, e.target.value)}
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

  const renderFoods = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold" style={{ color: '#7B4019' }}>Food Management</h2>
        <button
          onClick={() => setShowAddFood(true)}
          className="px-4 py-2 rounded-lg text-white flex items-center gap-2 hover:opacity-90 transition-opacity"
          style={{ backgroundColor: '#FF7D29' }}
        >
          <Plus className="w-4 h-4" />
          Add New Food
        </button>
      </div>

      {showAddFood && (
        navigate('/add-food')
      )}

      
        <FoodDisplay/>
      
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