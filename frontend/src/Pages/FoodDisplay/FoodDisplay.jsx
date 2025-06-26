import React, { useState, useEffect } from 'react';
import axios from 'axios';

const FoodDisplay = () => {
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFoods = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/food/foods', {
          headers: { 'Content-Type': 'application/json' },
        });
        if (response.status === 200) {
          setFoods(response.data);
        } else {
          throw new Error(`Unexpected status: ${response.status}`);
        }
      } catch (err) {
        setError('Failed to fetch food items. Please try again later.');
        console.error('Error fetching foods:', err.response ? err.response.data : err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchFoods();
  }, []);

  useEffect(() => {
    const styles = `
      @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
      .animate-fade-in { animation: fadeIn 1s ease-in; }
      @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      .animate-spin { animation: spin 1s linear infinite; }
      @keyframes bounce { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
      .animate-bounce { animation: bounce 2s infinite; }
    `;
    const styleSheet = document.createElement('style');
    styleSheet.textContent = styles;
    document.head.appendChild(styleSheet);
    return () => document.head.removeChild(styleSheet);
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-r from-blue-100 to-purple-100">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-purple-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500 p-4 bg-red-100 rounded-lg m-4 animate-fade-in">
        {error}
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 bg-gradient-to-r from-green-100 to-blue-200 min-h-screen">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-6 animate-fade-in">
        Creative Food Menu
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {foods.map((food) => (
          <div
            key={food._id}
            className="bg-white rounded-lg shadow-lg overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-xl animate-fade-in"
          >
            <div className="relative w-full h-48">
              {food.imageUrl ? (
                <img
                  src={`http://localhost:8080${food.imageUrl}`}
                  alt={food.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    console.error(`Image failed to load for ${food.name}:`, e.target.src, e);
                    e.target.src = '/placeholder.jpg'; // Local fallback
                  }}
                  onLoad={() => console.log(`Image loaded for ${food.name}:`, `http://localhost:8080${food.imageUrl}`)}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gray-200">
                  No Image Available
                </div>
              )}
              <div className="absolute top-2 right-2 bg-yellow-400 text-white text-xs font-semibold px-2 py-1 rounded-full animate-bounce">
                ${food.price.toFixed(2)}
              </div>
            </div>
            <div className="p-4">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">{food.name}</h2>
              <p className="text-gray-600 text-sm line-clamp-3">{food.category}</p>
              <button
                className="mt-4 w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-200 animate-fade-in"
                onClick={() => alert(`Added ${food.name} to cart!`)}
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
      {foods.length === 0 && (
        <p className="text-center text-gray-500 mt-4 animate-fade-in">No food items available.</p>
      )}
    </div>
  );
};

export default FoodDisplay;