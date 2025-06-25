import React from "react";
// Assuming React Router is used for navigation (install with `npm install react-router-dom`)
import { Link } from "react-router-dom";

const HomePage = () => {
  // State for cart interaction (basic example)
  const [cart, setCart] = React.useState([]);

  // Handle Add to Cart
  const handleAddToCart = (dish) => {
    setCart([...cart, dish]);
    alert(`${dish} added to cart!`);
  };

  return (
    <div className="bg-gray-100 min-h-screen" role="main">
      {/* Header Section */}
      <header className="bg-white shadow-md p-4 sticky top-0 z-10" aria-label="Main navigation">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold text-gray-800">Dish Dash</h1>
          <nav aria-label="Primary navigation">
            <ul className="flex space-x-4">
              <li><Link to="/" className="text-gray-600 hover:text-gray-800">Home</Link></li>
              <li><Link to="#menu" className="text-gray-600 hover:text-gray-800">Menu</Link></li>
              <li><Link to="#about" className="text-gray-600 hover:text-gray-800">About Us</Link></li>
              <li><Link to="#contact" className="text-gray-600 hover:text-gray-800">Contact</Link></li>
            </ul>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section
        className="bg-cover bg-center h-64 sm:h-80 md:h-96 flex items-center justify-center text-center relative"
        style={{ backgroundImage: "url('/hero-image.jpg')" }} // Place hero-image.jpg in public/ folder
      >
        <div className="bg-black bg-opacity-50 p-6 rounded-md">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Fast, Fresh, Delivered</h2>
          <p className="text-lg sm:text-xl text-gray-200 mb-6">Delicious meals right to your doorstep.</p>
          <button
            className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
            onClick={() => alert("Order placed! Redirecting to checkout...")}
            aria-label="Order food now"
          >
            Order Now
          </button>
        </div>
        {/* Fallback if image fails */}
        <div className="absolute inset-0 bg-gray-300 flex items-center justify-center text-gray-800" aria-hidden="true">
          Image not loaded
        </div>
      </section>

      {/* Popular Categories Section */}
      <section id="categories" className="container mx-auto py-12" aria-label="Popular food categories">
        <h2 className="text-2xl font-bold text-center mb-8">Popular Categories</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {['Pizzas', 'Burgers', 'Desserts'].map((category, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-lg transition">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">{category}</h3>
              <Link to={`/category/${category.toLowerCase()}`} className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition">
                Explore
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Dishes Section */}
      <section id="featured" className="bg-gray-50 py-12" aria-label="Featured dishes">
        <h2 className="text-2xl font-bold text-center mb-8">Featured Dishes</h2>
        <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {["Margherita Pizza", "Cheese Burger", "Chocolate Cake"].map((dish, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-lg transition">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">{dish}</h3>
              <p className="text-gray-600">Delicious and made fresh!</p>
              <p className="text-gray-800 font-bold mt-2">$12.99</p>
              <button
                className="mt-4 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition"
                onClick={() => handleAddToCart(dish)}
                aria-label={`Add ${dish} to cart`}
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-12" aria-label="Customer testimonials">
        <h2 className="text-2xl font-bold text-center mb-8">What Our Customers Say</h2>
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
          {["Great service!", "Delicious food!"].map((review, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition">
              <p className="text-gray-600 italic">"{review}"</p>
              <p className="text-gray-500 mt-2 text-right">Anonymous</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer Section */}
      <footer className="bg-gray-800 text-white py-6" aria-label="Site footer">
        <div className="container mx-auto text-center">
          <p>© 2025 Dish Dash. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;