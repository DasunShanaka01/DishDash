import React, { useEffect, useState } from 'react';
import { ArrowLeft, Plus, Minus, ShoppingCart, Star, Clock, MapPin, Filter, Search } from 'lucide-react';
import Header from '../Components/Header';

const Burgers = () => {

    const [cart, setCart] = useState([]);
      const [searchQuery, setSearchQuery] = useState('');
      const [pizzaMenu, setPizzaMenu] = useState([]);
      const [sortBy, setSortBy] = useState('');
    
      // Fetch pizza data on component mount
      useEffect(() => {
        const fetchPizza = async () => {
          try {
            const response = await fetch('http://localhost:8080/api/food/category/Burgers', {
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
    
      const addToCart = (pizza) => {
        const existingItem = cart.find((item) => item.id === pizza.id);
        if (existingItem) {
          setCart(
            cart.map((item) =>
              item.id === pizza.id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            )
          );
        } else {
          setCart([...cart, { ...pizza, quantity: 1 }]);
        }
      };
    
      const removeFromCart = (pizzaId) => {
        const existingItem = cart.find((item) => item.id === pizzaId);
        if (existingItem && existingItem.quantity > 1) {
          setCart(
            cart.map((item) =>
              item.id === pizzaId
                ? { ...item, quantity: item.quantity - 1 }
                : item
            )
          );
        } else {
          setCart(cart.filter((item) => item.id !== pizzaId));
        }
      };
    
      const getCartItemQuantity = (pizzaId) => {
        const item = cart.find((item) => item.id === pizzaId);
        return item ? item.quantity : 0;
      };
    
      const getTotalItems = () => {
        return cart.reduce((total, item) => total + item.quantity, 0);
      };
    
      const getTotalPrice = () => {
        return cart.reduce((total, item) => total + item.price * item.quantity, 0);
      };
    
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
    
          {/* Hero Section */}
          <section className="relative py-16" style={{ background: 'linear-gradient(135deg, #7B4019 0%, #FF7D29 100%)' }}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <div className="text-6xl mb-4">🍔</div>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                Juicy, flame-grilled perfection nestled between soft buns.
              </h2>
              <p className="text-xl text-white opacity-90 mb-8">
                Crafted with the freshest ingredients and bold flavors for an irresistible bite every time.
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


export default Burgers