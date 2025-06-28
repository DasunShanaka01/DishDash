import React, { useState, useEffect } from "react";
import axios from "axios";

const AdminPanel = () => {
  const [foods, setFoods] = useState([]);
  const [newFood, setNewFood] = useState({ name: "", price: "", category: "", imageUrl: "" });
  const [deliveryLocations, setDeliveryLocations] = useState([]);
  const [deliveryStatus, setDeliveryStatus] = useState({});

  // Fetch food items and delivery locations
  useEffect(() => {
    const fetchData = async () => {
      try {
        const foodResponse = await axios.get("http://localhost:8080/api/food/foods");
        const locationResponse = await axios.get("http://localhost:8080/api/delivery/locations");
        setFoods(foodResponse.data);
        setDeliveryLocations(locationResponse.data);
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };
    fetchData();
  }, []);

  // Add new food item
  const addFood = async () => {
    try {
      const response = await axios.post("http://localhost:8080/api/food/add", newFood);
      setFoods([...foods, response.data]);
      setNewFood({ name: "", price: "", category: "", imageUrl: "" });
      alert("Food added successfully!");
    } catch (err) {
      console.error("Error adding food:", err);
    }
  };

  // Update delivery status
  const updateStatus = async (foodId, status) => {
    try {
      await axios.put(`http://localhost:8080/api/delivery/status/${foodId}`, { status });
      setDeliveryStatus((prev) => ({ ...prev, [foodId]: status }));
      alert("Delivery status updated successfully!");
    } catch (err) {
      console.error("Error updating status:", err);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Admin Panel</h1>

      {/* Add New Food */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold">Add New Food</h2>
        <div className="grid grid-cols-2 gap-4 mt-4">
          <input
            type="text"
            placeholder="Name"
            value={newFood.name}
            onChange={(e) => setNewFood({ ...newFood, name: e.target.value })}
            className="border p-2"
          />
          <input
            type="number"
            placeholder="Price"
            value={newFood.price}
            onChange={(e) => setNewFood({ ...newFood, price: e.target.value })}
            className="border p-2"
          />
          <input
            type="text"
            placeholder="Category"
            value={newFood.category}
            onChange={(e) => setNewFood({ ...newFood, category: e.target.value })}
            className="border p-2"
          />
          <input
            type="text"
            placeholder="Image URL"
            value={newFood.imageUrl}
            onChange={(e) => setNewFood({ ...newFood, imageUrl: e.target.value })}
            className="border p-2"
          />
          <button
            onClick={addFood}
            className="col-span-2 bg-blue-500 text-white py-2 rounded"
          >
            Add Food
          </button>
        </div>
      </div>

      {/* Update Delivery Status */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold">Update Delivery Status</h2>
        <div className="grid grid-cols-1 gap-4 mt-4">
          {foods.map((food) => (
            <div key={food._id} className="border p-4 rounded">
              <h3 className="font-bold">{food.name}</h3>
              <select
                value={deliveryStatus[food._id] || ""}
                onChange={(e) => updateStatus(food._id, e.target.value)}
                className="border p-2 mt-2"
              >
                <option value="">Select Status</option>
                <option value="rejected">Rejected</option>
                <option value="approved">Approved</option>
                <option value="preparing">Preparing</option>
                <option value="cooking">Cooking</option>
                <option value="delivered">Delivered</option>
              </select>
            </div>
          ))}
        </div>
      </div>

      {/* View Delivery Locations */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold">Delivery Locations</h2>
        <ul className="list-disc pl-6 mt-4">
          {deliveryLocations.map((location, index) => (
            <li key={index}>{location}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AdminPanel;
