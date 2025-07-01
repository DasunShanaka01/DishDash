import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Import axios

const AddFood = () => {
  const [foodData, setFoodData] = useState({
    name: '',
    description: '',
    price: '',
    imageFile: null, // Initialize imageFile as null
    category: '', // New field for category
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFoodData({
      ...foodData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFoodData({
        ...foodData,
        imageFile: file, // Save the file object in the state
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', foodData.name);
    formData.append('description', foodData.description);
    formData.append('price', foodData.price);
    formData.append('category', foodData.category); // Append the category
    if (foodData.imageFile) {
      formData.append('imageFile', foodData.imageFile); // Append the file
    }

    try {
      // Send POST request to the backend
      const response = await axios.post('http://localhost:8080/api/food/add', formData, {
        headers: {
          'Content-Type': 'multipart/form-data', // Required for file uploads
        },
      });

      // Handle successful response
      if (response.status === 201) {
        alert('Food added successfully!');
        navigate('/home');
      }
    } catch (error) {
      console.error('Failed to add food. Please try again.', error);
      alert('An error occurred. Please try again.');
    }
  };

  // Predefined categories (can be modified or fetched from backend)
  const categories = ['Pizzas', 'Burgers', 'Sushi', 'Desserts', 'Salads','Tacos'];

  return (
    <div className="mx-auto bg-white shadow-md rounded-md">
      <header className="shadow-md p-4" style={{ backgroundColor: '#7B4019' }}>
        <div className="container mx-auto">
          <h1 className="text-2xl font-bold text-white">Dish Dash Admin Panel</h1>
        </div>
      </header>
      <h2 className="text-2xl font-bold text-center mb-5 mt-10">Add New Food</h2>
      <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white shadow-md rounded-md">
        <div className="mb-4 max-w-md">
          <label htmlFor="name" className="block text-gray-700 font-medium mb-2">
            Food Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={foodData.name}
            onChange={handleChange}
            className="w-full border rounded-md px-3 py-2"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block text-gray-700 font-medium mb-2">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={foodData.description}
            onChange={handleChange}
            className="w-full border rounded-md px-3 py-2"
            rows="3"
            required
          ></textarea>
        </div>
        <div className="mb-4">
          <label htmlFor="price" className="block text-gray-700 font-medium mb-2">
            Price
          </label>
          <input
            type="number"
            id="price"
            name="price"
            value={foodData.price}
            onChange={handleChange}
            className="w-full border rounded-md px-3 py-2"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="category" className="block text-gray-700 font-medium mb-2">
            Category
          </label>
          <select
            id="category"
            name="category"
            value={foodData.category}
            onChange={handleChange}
            className="w-full border rounded-md px-3 py-2"
            required
          >
            <option value="" disabled>Select a category</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="imageFile" className="block text-gray-700 font-medium mb-2">
            Food Image
          </label>
          <input
            type="file"
            id="imageFile"
            name="imageFile"
            accept="image/*"
            onChange={handleFileChange}
            className="w-full border rounded-md px-3 py-2"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white font-medium py-2 rounded-md hover:bg-blue-600 transition duration-200 mb-10"
          disabled={!foodData.name || !foodData.description || !foodData.price || !foodData.category} // Disable if required fields are empty
        >
          Add Food
        </button>
      </form>
    </div>
  );
};

export default AddFood;