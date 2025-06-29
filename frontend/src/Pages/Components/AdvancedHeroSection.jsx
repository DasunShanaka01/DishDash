import React, { useState, useEffect } from 'react';
import { Search, MapPin, Clock, Star, ChefHat, Truck, Shield, Heart, Play, ArrowRight, Users, Award } from 'lucide-react';

const AdvancedHeroSection = () => {
    
  const [searchQuery, setSearchQuery] = useState('');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [stats, setStats] = useState({
    orders: 0,
    restaurants: 0,
    customers: 0
  });
  

  const heroSlides = [
    {
      title: "Delicious Food Delivered Fast",
      subtitle: "From local favorites to global cuisines - satisfaction guaranteed",
      image: "🍕",
      bg: "linear-gradient(135deg, #7B4019 0%, #FF7D29 100%)",
      accent: "#FFBF78",
      cta: "Order Now",
      features: ["30min delivery", "500+ restaurants", "24/7 service"]
    },
    {
      title: "Fresh Ingredients, Every Time",
      subtitle: "Premium quality ingredients sourced daily from local farms",
      image: "🥗",
      bg: "linear-gradient(135deg, #7B4019 0%, #FF7D29 100%)",
      accent: "#7B4019",
      cta: "Explore Menu",
      features: ["Farm fresh", "Organic options", "Zero preservatives"]
    },
    {
      title: "Lightning Fast Delivery",
      subtitle: "Advanced logistics for the fastest food delivery in town",
      image: "🚚",
      bg: "linear-gradient(135deg, #7B4019 0%, #FF7D29 100%)",
      accent: "#FF7D29",
      cta: "Track Orders",
      features: ["GPS tracking", "Real-time updates", "Contactless delivery"]
    }
  ];

  const floatingElements = [
    { emoji: "🍕", delay: 0, duration: 6 },
    { emoji: "🍔", delay: 1, duration: 8 },
    { emoji: "🍜", delay: 2, duration: 7 },
    { emoji: "🥗", delay: 3, duration: 9 },
    { emoji: "🍱", delay: 4, duration: 6.5 },
    { emoji: "🌮", delay: 5, duration: 7.5 }
  ];

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };


  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Animated counter effect
  useEffect(() => {
    const targets = { orders: 50000, restaurants: 1200, customers: 25000 };
    const duration = 2000;
    const steps = 60;
    const increment = duration / steps;

    const timer = setInterval(() => {
      setStats(current => {
        const newStats = { ...current };
        let allComplete = true;

        Object.keys(targets).forEach(key => {
          if (current[key] < targets[key]) {
            newStats[key] = Math.min(
              current[key] + Math.ceil(targets[key] / steps),
              targets[key]
            );
            allComplete = false;
          }
        });

        if (allComplete) {
          clearInterval(timer);
        }

        return newStats;
      });
    }, increment);

    return () => clearInterval(timer);
  }, []);

  const currentSlideData = heroSlides[currentSlide];

  return (
    <section className="relative h-170 overflow-hidden">
      {/* Dynamic Background */}
      <div 
        className="absolute inset-0 transition-all duration-1000 ease-in-out"
        style={{ background: currentSlideData.bg }}
      >
        {/* Animated Gradient Overlay */}
        <div 
          className="absolute inset-0 opacity-30"
          style={{
            background: `radial-gradient(circle at ${mousePosition.x * 0.1}% ${mousePosition.y * 0.1}%, rgba(255,255,255,0.1) 0%, transparent 70%)`
          }}
        />
        
        {/* Floating Food Elements */}
        {floatingElements.map((item, index) => (
          <div
            key={index}
            className="absolute text-4xl opacity-20 animate-bounce"
            style={{
              left: `${10 + (index * 15)}%`,
              top: `${20 + (index % 3) * 20}%`,
              animationDelay: `${item.delay}s`,
              animationDuration: `${item.duration}s`
            }}
          >
            {item.emoji}
          </div>
        ))}

        {/* Geometric Patterns */}
        <div className="absolute inset-0">
          <div className="absolute top-10 right-10 w-32 h-26 border-2 border-white border-opacity-20 rounded-full animate-spin-slow"></div>
          <div className="absolute bottom-20 left-10 w-24 h-24 border-2 border-white border-opacity-30 rotate-45 animate-pulse"></div>
          <div className="absolute top-1/3 left-1/4 w-16 h-16 bg-white bg-opacity-10 rounded-lg animate-float"></div>
        </div>
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 min-h-screen flex items-center">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center w-full">
          
          {/* Left Content */}
          <div className="text-left space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-white bg-opacity-20 backdrop-blur-sm">
              <Award className="w-4 h-4 text-white mr-2" />
              <span className="text-blck text-sm font-medium">#1 Food Delivery App</span>
            </div>

            {/* Main Title */}
            <div className="space-y-4">
              <h1 className="text-5xl md:text-7xl font-black text-white leading-tight">
                <span className="block">{currentSlideData.title.split(' ').slice(0, 2).join(' ')}</span>
                <span 
                  className="block bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent animate-pulse"
                >
                  {currentSlideData.title.split(' ').slice(2).join(' ')}
                </span>
              </h1>
              
              <p className="text-xl md:text-2xl text-white text-opacity-90 max-w-lg leading-relaxed">
                {currentSlideData.subtitle}
              </p>
            </div>

            {/* Feature Pills */}
            <div className="flex flex-wrap gap-3">
              {currentSlideData.features.map((feature, index) => (
                <div
                  key={index}
                  className="px-4 py-2 bg-white bg-opacity-20 backdrop-blur-sm rounded-full text-black text-sm font-medium"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {feature}
                </div>
              ))}
            </div>

            


            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8">
              <div className="text-center">
                <div className="text-3xl font-black text-white">{stats.orders.toLocaleString()}+</div>
                <div className="text-white text-opacity-80 text-sm">Orders Delivered</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-black text-white">{stats.restaurants.toLocaleString()}+</div>
                <div className="text-white text-opacity-80 text-sm">Restaurants</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-black text-white">{stats.customers.toLocaleString()}+</div>
                <div className="text-white text-opacity-80 text-sm">Happy Customers</div>
              </div>
            </div>
          </div>

          {/* Right Content - Interactive Food Display */}
          <div className="relative lg:pl-12">
            <div className="relative">
              {/* Main Food Image */}
              <div 
                className="w-80 h-80 mx-auto rounded-full flex items-center justify-center text-9xl transition-all duration-1000 hover:scale-110 cursor-pointer"
                style={{ 
                  background: `linear-gradient(135deg, ${currentSlideData.accent}20 0%, rgba(255,255,255,0.1) 100%)`,
                  backdropFilter: 'blur(20px)'
                }}
              >
                <span className="animate-bounce">{currentSlideData.image}</span>
              </div>

              {/* Orbiting Elements */}
              <div className="absolute inset-0 animate-spin-slow">
                {['🍟', '🥤', '🍰'].map((emoji, index) => (
                  <div
                    key={index}
                    className="absolute w-16 h-16 bg-white bg-opacity-20 backdrop-blur-sm rounded-full flex items-center justify-center text-2xl"
                    style={{
                      top: `${30 + Math.sin((index * 120) * Math.PI / 180) * 120}px`,
                      left: `${160 + Math.cos((index * 120) * Math.PI / 180) * 120}px`,
                      animationDelay: `${index * 0.5}s`
                    }}
                  >
                    {emoji}
                  </div>
                ))}
              </div>

              {/* Floating Cards */}
              <div className="absolute -top-8 -right-8 bg-white bg-opacity-20 backdrop-blur-sm rounded-2xl p-4 animate-float">
                <div className="flex items-center space-x-2">
                  <Star className="w-5 h-5 text-yellow-400 fill-current" />
                  <span className="text-black font-bold">4.9</span>
                </div>
                <div className="text-white text-sm opacity-80">Rating</div>
              </div>

              <div className="absolute -bottom-8 -left-8 bg-white bg-opacity-20 backdrop-blur-sm rounded-2xl p-4 animate-float" style={{ animationDelay: '1s' }}>
                <div className="flex items-center space-x-2">
                  <Clock className="w-5 h-5 text-green-400" />
                  <span className="text-black font-bold">25 min</span>
                </div>
                <div className="text-black text-sm opacity-80">Delivery</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Enhanced Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-4">
        {heroSlides.map((slide, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`relative group transition-all duration-300 ${
              index === currentSlide ? 'scale-125' : 'hover:scale-110'
            }`}
          >
            <div 
              className={`w-4 h-4 rounded-full transition-all duration-300 ${
                index === currentSlide ? 'bg-white shadow-lg' : 'bg-white bg-opacity-50'
              }`}
            />
            {index === currentSlide && (
              <div className="absolute -inset-2 border-2 border-white border-opacity-50 rounded-full animate-ping"></div>
            )}
          </button>
        ))}
      </div>

    

      {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center space-y-4 animate-bounce">
          <div className="text-white text-lg font-bold tracking-wide">Scroll</div>
          <div className="w-1 h-16 bg-white opacity-100 rounded-full"></div>
          <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
        </div>

      <style jsx>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        
        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};

export default AdvancedHeroSection;