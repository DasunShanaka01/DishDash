import React, { useState, useEffect } from 'react';
import { Search, MapPin, Clock, Star, ChefHat, Truck, Shield, Heart } from 'lucide-react';
import AdvancedHeroSection from '../Components/AdvancedHeroSection';

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
    { name: "Pizza", icon: "🍕", color: "#FF7D29",link: '/pizza' },
    { name: "Burgers", icon: "🍔", color: "#7B4019", link: '/burgers' },
    { name: "Sushi", icon: "🍣", color: "#D1D8BE", link: '/sushi' },
    { name: "Desserts", icon: "🍰", color: "#FFBF78", link: '/desserts' },
    { name: "Salads", icon: "🥗", color: "#D1D8BE", link: '/salads' },
    { name: "Tacos", icon: "🌮", color: "#FF7D29", link: '/tacos' }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      

      <AdvancedHeroSection/>

      {/* Cuisine Categories */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3
            className="text-3xl font-bold text-center mb-12"
            style={{ color: '#7B4019' }}
          >
            What are you craving?
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {cuisineTypes.map((cuisine, index) => (
              <a
                key={index}
                href={cuisine.link} // Replace with the desired link
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
              </a>
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

      
    </div>
  );
};

export default DishDashHomepage;