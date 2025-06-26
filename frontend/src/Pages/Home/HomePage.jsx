import React, { useState, useEffect } from 'react';
import { Search, MapPin, Clock, Star, ChefHat, Truck, Shield, Heart } from 'lucide-react';

const DishDashHomepage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const heroSlides = [
    {
      title: "Delicious Food Delivered Fast",
      subtitle: "From local favorites to global cuisines",
      image: "🍕",
      bg: "linear-gradient(135deg, #7B4019 0%, #FF7D29 100%)"
    },
    {
      title: "Fresh Ingredients, Every Time",
      subtitle: "Quality you can taste in every bite",
      image: "🥗",
      bg: "linear-gradient(135deg, #FF7D29 0%, #FFBF78 100%)"
    },
    {
      title: "30 Minutes or Less",
      subtitle: "Lightning fast delivery to your door",
      image: "🚚",
      bg: "linear-gradient(135deg, #FFBF78 0%, #D1D8BE 100%)"
    }
  ];

  const featuredRestaurants = [
    { name: "Mario's Pizza Palace", rating: 4.8, cuisine: "Italian", time: "25-35 min", image: "🍕" },
    { name: "Tokyo Sushi Bar", rating: 4.9, cuisine: "Japanese", time: "30-40 min", image: "🍣" },
    { name: "Burger Junction", rating: 4.7, cuisine: "American", time: "20-30 min", image: "🍔" },
    { name: "Spice Garden", rating: 4.6, cuisine: "Indian", time: "35-45 min", image: "🍛" }
  ];

  const cuisineTypes = [
    { name: "Pizza", icon: "🍕", color: "#FF7D29" },
    { name: "Burgers", icon: "🍔", color: "#7B4019" },
    { name: "Sushi", icon: "🍣", color: "#D1D8BE" },
    { name: "Desserts", icon: "🍰", color: "#FFBF78" },
    { name: "Salads", icon: "🥗", color: "#D1D8BE" },
    { name: "Tacos", icon: "🌮", color: "#FF7D29" }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-2">
              <div 
                className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-xl"
                style={{ background: 'linear-gradient(135deg, #7B4019 0%, #FF7D29 100%)' }}
              >
                DD
              </div>
              <h1 className="text-2xl font-bold" style={{ color: '#7B4019' }}>Dish Dash</h1>
            </div>
            
            <div className="hidden md:flex items-center space-x-2 text-gray-600">
              <MapPin className="w-5 h-5" />
              <span>Deliver to: </span>
              <span className="font-semibold" style={{ color: '#7B4019' }}>Your Location</span>
            </div>
            
            <div className="flex items-center space-x-4">
              <button className="text-gray-600 hover:text-gray-800 transition-colors">Sign In</button>
              <button 
                className="px-6 py-2 rounded-full text-white font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg"
                style={{ background: 'linear-gradient(135deg, #FF7D29 0%, #FFBF78 100%)' }}
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden h-96 md:h-[500px]">
        <div 
          className="absolute inset-0 transition-all duration-1000 ease-in-out"
          style={{ background: heroSlides[currentSlide].bg }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-20"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
          <div className="text-center w-full">
            <div className="text-6xl md:text-8xl mb-4 animate-bounce">
              {heroSlides[currentSlide].image}
            </div>
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-4 animate-fade-in">
              {heroSlides[currentSlide].title}
            </h2>
            <p className="text-xl md:text-2xl text-white mb-8 opacity-90">
              {heroSlides[currentSlide].subtitle}
            </p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-6 h-6" />
                <input
                  type="text"
                  placeholder="Search for restaurants, cuisines, or dishes..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 text-lg rounded-full border-none focus:ring-4 focus:ring-orange-300 focus:outline-none shadow-2xl text-white"
                />
                <button 
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 px-6 py-2 rounded-full text-white font-medium transition-all duration-300 hover:scale-105"
                  style={{ background: 'linear-gradient(135deg, #7B4019 0%, #FF7D29 100%)' }}
                >
                  Search
                </button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Slide Indicators */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide ? 'bg-white scale-125' : 'bg-white bg-opacity-50'
              }`}
            />
          ))}
        </div>
      </section>

      {/* Cuisine Categories */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-3xl font-bold text-center mb-12" style={{ color: '#7B4019' }}>
            What are you craving?
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {cuisineTypes.map((cuisine, index) => (
              <div
                key={index}
                className="group cursor-pointer transform transition-all duration-300 hover:scale-110"
              >
                <div 
                  className="w-20 h-20 mx-auto rounded-full flex items-center justify-center text-3xl mb-3 shadow-lg group-hover:shadow-xl transition-shadow"
                  style={{ backgroundColor: cuisine.color }}
                >
                  {cuisine.icon}
                </div>
                <p className="text-center font-medium text-gray-700 group-hover:text-gray-900">
                  {cuisine.name}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Restaurants */}
      <section className="py-16" style={{ backgroundColor: '#D1D8BE' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-3xl font-bold text-center mb-12" style={{ color: '#7B4019' }}>
            Featured Restaurants
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredRestaurants.map((restaurant, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-2xl group cursor-pointer"
              >
                <div 
                  className="h-48 flex items-center justify-center text-6xl transition-transform duration-300 group-hover:scale-110"
                  style={{ background: 'linear-gradient(135deg, #FFBF78 0%, #FF7D29 100%)' }}
                >
                  {restaurant.image}
                </div>
                <div className="p-6">
                  <h4 className="text-xl font-bold mb-2" style={{ color: '#7B4019' }}>
                    {restaurant.name}
                  </h4>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-600">{restaurant.cuisine}</span>
                    <div className="flex items-center">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="ml-1 text-sm font-medium">{restaurant.rating}</span>
                    </div>
                  </div>
                  <div className="flex items-center text-gray-500 text-sm">
                    <Clock className="w-4 h-4 mr-1" />
                    {restaurant.time}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-3xl font-bold text-center mb-12" style={{ color: '#7B4019' }}>
            Why Choose Dish Dash?
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center group">
              <div 
                className="w-20 h-20 mx-auto rounded-full flex items-center justify-center mb-6 transition-all duration-300 group-hover:scale-110"
                style={{ background: 'linear-gradient(135deg, #FF7D29 0%, #FFBF78 100%)' }}
              >
                <Truck className="w-8 h-8 text-white" />
              </div>
              <h4 className="text-xl font-bold mb-4" style={{ color: '#7B4019' }}>Fast Delivery</h4>
              <p className="text-gray-600">Get your food delivered in 30 minutes or less, guaranteed fresh and hot.</p>
            </div>
            
            <div className="text-center group">
              <div 
                className="w-20 h-20 mx-auto rounded-full flex items-center justify-center mb-6 transition-all duration-300 group-hover:scale-110"
                style={{ background: 'linear-gradient(135deg, #7B4019 0%, #FF7D29 100%)' }}
              >
                <ChefHat className="w-8 h-8 text-white" />
              </div>
              <h4 className="text-xl font-bold mb-4" style={{ color: '#7B4019' }}>Quality Food</h4>
              <p className="text-gray-600">Partnered with the best restaurants to bring you exceptional quality meals.</p>
            </div>
            
            <div className="text-center group">
              <div 
                className="w-20 h-20 mx-auto rounded-full flex items-center justify-center mb-6 transition-all duration-300 group-hover:scale-110"
                style={{ background: 'linear-gradient(135deg, #FFBF78 0%, #D1D8BE 100%)' }}
              >
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h4 className="text-xl font-bold mb-4" style={{ color: '#7B4019' }}>Safe & Secure</h4>
              <p className="text-gray-600">Your safety is our priority with contactless delivery and secure payments.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="" style={{ backgroundColor: '#7B4019' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div 
                  className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold"
                  style={{ backgroundColor: '#FF7D29' }}
                >
                  DD
                </div>
                <h5 className="text-xl font-bold text-white">Dish Dash</h5>
              </div>
              <p className="text-gray-300">Delivering happiness, one meal at a time.</p>
            </div>
            
            <div>
              <h6 className="text-white font-semibold mb-4">Company</h6>
              <ul className="space-y-2 text-gray-300">
                <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Press</a></li>
              </ul>
            </div>
            
            <div>
              <h6 className="text-white font-semibold mb-4">Support</h6>
              <ul className="space-y-2 text-gray-300">
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
              </ul>
            </div>
            
            <div>
              <h6 className="text-white font-semibold mb-4">Connect</h6>
              <ul className="space-y-2 text-gray-300">
                <li><a href="#" className="hover:text-white transition-colors">Facebook</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Twitter</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Instagram</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-600 mt-8 pt-8 text-center text-gray-300">
            <p>&copy; 2025 Dish Dash. All rights reserved. Made with <Heart className="w-4 h-4 inline text-red-400" /> for food lovers.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default DishDashHomepage;