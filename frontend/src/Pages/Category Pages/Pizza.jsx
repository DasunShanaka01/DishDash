import React, { useEffect, useState } from 'react';
import { ArrowLeft, Plus, Minus, ShoppingCart, Star, Clock, MapPin, Filter, Search } from 'lucide-react';
import { useAuth } from '../AuthContext.jsx';
import axios from 'axios';

const Pizza = () => {
  const [cartItems, setCartItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [pizzaMenu, setPizzaMenu] = useState([]);
  const [sortBy, setSortBy] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const userId = useAuth();
  console.log('Pizza User ID:', userId);

  // Fetch pizza data on component mount
  useEffect(() => {
    const fetchPizza = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/food/category/Pizzas', {
          headers: { 'Content-Type': 'application/json' },
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        setPizzaMenu(data);
      } catch (error) {
        console.error('Error fetching pizza data:', error);
      }
    };

    fetchPizza();
  }, []);

  // Fetch user's cart items
  useEffect(() => {
    if (userId?.userId) {
      const fetchCartItems = async () => {
        try {
          setLoading(true);
          const response = await axios.get(`http://localhost:8080/api/cart/${userId.userId}`);
          setCartItems(response.data);
        } catch (error) {
          console.error('Error fetching cart items:', error);
          setError('Failed to load cart items');
        } finally {
          setLoading(false);
        }
      };
      fetchCartItems();
    }
  }, [userId]);

  // Update quantity function (as you provided)
  const updateQuantity = async (cartItemId, newQuantity) => {
    if (newQuantity < 1) return;
    
    try {
      const response = await axios.post(
        `http://localhost:8080/api/cart/update/${cartItemId}`,
        { quantity: newQuantity.toString() }
      );
      
      setCartItems(cartItems.map(item => 
        item.id === cartItemId ? { ...item, quantity: newQuantity } : item
      ));
    } catch (err) {
      console.error('Update quantity error:', err);
      setError('Failed to update quantity');
    }
  };

  // Add to cart with proper quantity management
  const addToCart = async (pizza) => {
    try {
      // Check if item already exists in cart
      const existingItem = cartItems.find(item => item.foodId === pizza.id);
      
      if (existingItem) {
        // If exists, increment quantity
        await updateQuantity(existingItem.id, existingItem.quantity + 1);
      } else {
        // If new item, add to cart
        const payload = {
          userId: userId.userId,
          foodId: pizza.id,
          quantity: '1'
        };

        const response = await axios.post('http://localhost:8080/api/cart/add', payload);
        
        if (response.status === 201) {
          // Add the new item to local state with quantity 1
          setCartItems([...cartItems, { ...response.data, food: pizza }]);
        }
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
      setError('Failed to add item to cart');
    }
  };

  // Remove from cart with proper quantity management
  const removeFromCart = async (pizzaId) => {
    try {
      const existingItem = cartItems.find(item => item.foodId === pizzaId);
      
      if (!existingItem) return;
      
      if (existingItem.quantity > 1) {
        // If quantity > 1, decrement quantity
        await updateQuantity(existingItem.id, existingItem.quantity - 1);
      } else {
        // If quantity is 1, remove item completely
        await axios.post(`http://localhost:8080/api/cart/remove/${existingItem.id}`);
        setCartItems(cartItems.filter(item => item.id !== existingItem.id));
      }
    } catch (error) {
      console.error('Error removing from cart:', error);
      setError('Failed to remove item from cart');
    }
  };

  // Helper functions
  const getCartItemQuantity = (pizzaId) => {
    const item = cartItems.find(item => item.foodId === pizzaId);
    return item ? item.quantity : 0;
  };

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => {
      const pizza = pizzaMenu.find(p => p.id === item.foodId);
      return total + (pizza?.price || 0) * item.quantity;
    }, 0);
  };

  // Filter and sort pizzas
  const filteredPizzas = pizzaMenu.filter((pizza) => {
    const matchesSearch =
      pizza.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pizza.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  const sortedPizzas = [...filteredPizzas].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      default:
        return 0;
    }
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Error message */}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 mx-auto max-w-7xl">
          {error}
        </div>
      )}

       {/* Hero Section */}
      <section className="relative py-16" style={{ background: 'linear-gradient(135deg, #7B4019 0%, #FF7D29 100%)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="text-6xl mb-4">🍕</div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Authentic Wood-Fired Pizzas
          </h2>
          <p className="text-xl text-white opacity-90 mb-8">
            Hand-tossed dough, premium ingredients, baked to perfection
          </p>
          <div className="flex items-center justify-center space-x-6 text-white">
            <div className="flex items-center space-x-2">
              <Clock className="w-5 h-5" />
              <span>12-18 min</span>
            </div>
            <div className="flex items-center space-x-2">
              <Star className="w-5 h-5 fill-current text-yellow-300" />
              <span>4.7 Rating</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-2xl">🔥</span>
              <span>Fresh & Hot</span>
            </div>
          </div>
        </div>

        {/* Search */}
        <div className="relative max-w-2xl mx-auto mt-10">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-6 h-6" />
          <input
            type="text"
            placeholder="Search pizzas..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:ring-2 focus:ring-orange-300 focus:border-orange-300 focus:outline-none"
          />
        </div>
      </section>

      {/* Pizza Menu */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sortedPizzas.map((pizza) => (
              <div
                key={pizza.id}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
              >
                {/* Pizza Image */}
                <div
                  className="h-48 flex items-center justify-center text-6xl relative"
                  style={{
                    background: 'linear-gradient(135deg, #FFBF78 0%, #FF7D29 100%)',
                  }}
                >
                  <img src={`http://localhost:8080${pizza.imageUrl}`} alt={pizza.name} className="h-full w-full object-cover" />
                </div>

                {/* Pizza Details */}
                <div className="p-6">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-xl font-bold" style={{ color: '#7B4019' }}>
                      {pizza.name}
                    </h3>
                    <span className="text-2xl font-bold" style={{ color: '#FF7D29' }}>
                      ${pizza.price.toFixed(2)}
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                    {pizza.description}
                  </p>

                  {/* Add to Cart Controls */}
                  <div className="flex items-center justify-between">
                    {getCartItemQuantity(pizza.id) > 0 ? (
                      <div className="flex items-center space-x-3">
                        <button
                          onClick={() => removeFromCart(pizza.id)}
                          className="w-8 h-8 rounded-full flex items-center justify-center text-white transition-all duration-300 hover:scale-110"
                          style={{ backgroundColor: '#FF7D29' }}
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span
                          className="font-bold text-lg"
                          style={{ color: '#7B4019' }}
                        >
                          {getCartItemQuantity(pizza.id)}
                        </span>
                        <button
                          onClick={() => addToCart(pizza)}
                          className="w-8 h-8 rounded-full flex items-center justify-center text-white transition-all duration-300 hover:scale-110"
                          style={{ backgroundColor: '#FF7D29' }}
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => addToCart(pizza)}
                        className="flex items-center space-x-2 px-6 py-2 rounded-full text-white font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg"
                        style={{
                          background: 'linear-gradient(135deg, #FF7D29 0%, #FFBF78 100%)',
                        }}
                      >
                        <Plus className="w-4 h-4" />
                        <span>Add to Cart</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
          {sortedPizzas.length === 0 && (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-2xl font-bold text-gray-600 mb-2">
                No pizzas found
              </h3>
              <p className="text-gray-500">Try adjusting your search or filters</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Pizza;