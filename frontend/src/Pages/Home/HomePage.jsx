import React from "react";

const HomePage = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Header Section */}
      <header className="bg-white shadow-md p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold text-gray-800">Dish Dash</h1>
          <nav>
            <ul className="flex space-x-4">
              <li><a href="#" className="text-gray-600 hover:text-gray-800">Home</a></li>
              <li><a href="#menu" className="text-gray-600 hover:text-gray-800">Menu</a></li>
              <li><a href="#about" className="text-gray-600 hover:text-gray-800">About Us</a></li>
              <li><a href="#contact" className="text-gray-600 hover:text-gray-800">Contact</a></li>
            </ul>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-cover bg-center h-96 flex items-center justify-center text-center" style={{ backgroundImage: "url('https://example.com/hero-image.jpg')" }}>
        <div className="bg-black bg-opacity-50 p-6 rounded-md">
          <h2 className="text-4xl font-bold text-white mb-4">Fast, Fresh, Delivered</h2>
          <p className="text-lg text-gray-200 mb-6">Delicious meals right to your doorstep.</p>
          <button className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600">Order Now</button>
        </div>
      </section>

      {/* Popular Categories Section */}
      <section id="categories" className="container mx-auto py-12">
        <h2 className="text-2xl font-bold text-center mb-8">Popular Categories</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {['Pizzas', 'Burgers', 'Desserts'].map((category, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md p-6 text-center">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">{category}</h3>
              <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">Explore</button>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Dishes Section */}
      <section id="featured" className="bg-gray-50 py-12">
        <h2 className="text-2xl font-bold text-center mb-8">Featured Dishes</h2>
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          {["Margherita Pizza", "Cheese Burger", "Chocolate Cake"].map((dish, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md p-6 text-center">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">{dish}</h3>
              <p className="text-gray-600">Delicious and made fresh!</p>
              <p className="text-gray-800 font-bold mt-2">$12.99</p>
              <button className="mt-4 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600">Add to Cart</button>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-12">
        <h2 className="text-2xl font-bold text-center mb-8">What Our Customers Say</h2>
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
          {["Great service!", "Delicious food!"].map((review, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md p-6">
              <p className="text-gray-600">{review}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer Section */}
      <footer className="bg-gray-800 text-white py-6">
        <div className="container mx-auto text-center">
          <p>&copy; 2025 Dish Dash. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;