import React, { useState, useEffect } from "react";
import { Search, Edit, Trash2, Plus, X, Save } from "lucide-react";

const FoodDisplay = () => {
  const [foods, setFoods] = useState([]);
  const [filteredFoods, setFilteredFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchCategory, setSearchCategory] = useState("");
  const [editingFood, setEditingFood] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [categories] = useState(["Pizzas", "Burgers", "Sushi", "Desserts", "Tacos", "Salads"]);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    imageFile: null,
  });

  const API_BASE_URL = "http://localhost:8080/api/food";

  useEffect(() => {
    const fetchFoods = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/foods`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          const data = await response.json();
          setFoods(data);
          setFilteredFoods(data);
          console.log("Fetched foods:", data);
        } else {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
      } catch (err) {
        setError("Failed to fetch food items. Please try again later.");
        console.error("Error fetching foods:", err.response ? err.response.data : err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchFoods();
  }, []);

  useEffect(() => {
    let filtered = foods;

    if (searchTerm) {
      filtered = filtered.filter(
        (food) =>
          food.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          food.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (searchCategory) {
      filtered = filtered.filter((food) => food.category === searchCategory);
    }

    setFilteredFoods(filtered);
  }, [searchTerm, searchCategory, foods]);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      try {
        const response = await fetch(`${API_BASE_URL}/${id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          setFoods(foods.filter((food) => (food._id || food.id) !== id));
          setError(null);
          console.log("Food deleted successfully");
        } else {
          const errorText = await response.text();
          throw new Error(`Failed to delete: ${errorText}`);
        }
      } catch (err) {
        setError("Failed to delete food item. Please try again.");
        console.error("Error deleting food:", err);
      }
    }
  };

  const handleEdit = (food) => {
    console.log("Editing food:", food);
    const foodId = food._id || food.id;
    console.log("Food ID for editing:", foodId);

    if (!foodId) {
      setError("Cannot edit: Food ID is missing");
      console.error("Food object missing ID:", food);
      return;
    }

    setEditingFood(foodId);
    setFormData({
      name: food.name || "",
      description: food.description || "",
      price: food.price ? food.price.toString() : "",
      category: food.category || "",
      imageFile: null,
    });
    setShowAddForm(false);
    console.log("Edit form populated with:", {
      name: food.name,
      description: food.description,
      price: food.price,
      category: food.category,
    });
  };

  const handleSave = async () => {
    if (!formData.name || !formData.description || !formData.price || !formData.category) {
      setError("Please fill in all required fields.");
      return;
    }

    try {
      console.log("Saving food with data:", formData);
      console.log("Editing food ID:", editingFood);

      const formDataToSend = new FormData();
      formDataToSend.append("name", formData.name.trim());
      formDataToSend.append("description", formData.description.trim());
      formDataToSend.append("price", formData.price.toString());
      formDataToSend.append("category", formData.category);

      if (formData.imageFile) {
        formDataToSend.append("imageFile", formData.imageFile);
        console.log("Image file added:", formData.imageFile.name);
      }

      for (let [key, value] of formDataToSend.entries()) {
        console.log(`FormData ${key}:`, value);
      }

      if (editingFood) {
        console.log(`Updating food with ID: ${editingFood}`);
        const response = await fetch(`${API_BASE_URL}/${editingFood}`, {
          method: "PUT",
          body: formDataToSend,
        });

        console.log("Update response status:", response.status);
        if (response.ok) {
          const updatedFood = await response.json();
          console.log("Updated food received:", updatedFood);
          setFoods(
            foods.map((food) => (food._id || food.id) === editingFood ? updatedFood : food)
          );
          console.log("Food updated successfully in state");
        } else {
          const errorText = await response.text();
          console.error("Update failed:", errorText);
          throw new Error(`Failed to update: ${errorText}`);
        }
      } else {
        console.log("Adding new food");
        const response = await fetch(`${API_BASE_URL}/add`, {
          method: "POST",
          body: formDataToSend,
        });

        console.log("Add response status:", response.status);
        if (response.ok) {
          const newFood = await response.json();
          console.log("New food received:", newFood);
          setFoods([...foods, newFood]);
          console.log("Food added successfully to state");
        } else {
          const errorText = await response.text();
          console.error("Add failed:", errorText);
          throw new Error(`Failed to add: ${errorText}`);
        }
      }

      setEditingFood(null);
      setShowAddForm(false);
      setFormData({ name: "", description: "", price: "", category: "", imageFile: null });
      setError(null);
      console.log("Form reset successfully");
    } catch (err) {
      const errorMessage = `Failed to save food item: ${err.message}`;
      setError(errorMessage);
      console.error("Error saving food:", err);
    }
  };

  const handleCancel = () => {
    setEditingFood(null);
    setShowAddForm(false);
    setFormData({ name: "", description: "", price: "", category: "", imageFile: null });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen" style={{ background: "linear-gradient(135deg, #D1D8BE 0%, #FFBF78 100%)" }}>
        <div className="relative">
          <div className="animate-spin rounded-full h-20 w-20 border-4 border-opacity-20" style={{ borderColor: "#7B4019" }}>
            <div className="absolute top-0 left-0 h-20 w-20 rounded-full border-4 border-transparent border-t-current animate-spin" style={{ color: "#FF7D29" }}></div>
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-2xl">🍽️</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" >
      <div className="container mx-auto p-6">
        <div className="text-center mb-12">
          <h1 className="text-6xl font-bold mb-4" style={{ color: "#7B4019" }}>
            🍽️ Dish Dash
          </h1>
          <p className="text-xl" style={{ color: "#7B4019" }}>
            Discover & Manage Your Culinary Delights
          </p>
          <div className="w-32 h-1 mx-auto mt-4 rounded-full" style={{ backgroundColor: "#FF7D29" }}></div>
        </div>

        {error && (
          <div className="mb-8 p-6 rounded-2xl shadow-lg border-l-4" style={{ backgroundColor: "#FFBF78", borderColor: "#FF7D29", color: "#7B4019" }}>
            <div className="flex items-center">
              <div className="text-2xl mr-3">⚠️</div>
              <div className="font-semibold">{error}</div>
            </div>
          </div>
        )}

        <div className="bg-white rounded-3xl shadow-2xl p-8 mb-12 border-2" style={{ borderColor: "#FF7D29" }}>
          <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
            <div className="flex flex-col sm:flex-row gap-4 flex-1 w-full">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-6 h-6" style={{ color: "#0000" }} />
                <input
                  type="text"
                  placeholder="Search delicious dishes..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-6 py-4 rounded-2xl border-2 text-lg font-medium transition-all duration-300 focus:outline-none focus:ring-4"
                  style={{ borderColor: "#D1D8BE", color: "#7B4019", backgroundColor: "#FFBF78", focusRingColor: "#FF7D29" }}
                />
              </div>

              <select
                value={searchCategory}
                onChange={(e) => setSearchCategory(e.target.value)}
                className="px-6 py-4 rounded-2xl border-2 text-lg font-medium transition-all duration-300 focus:outline-none focus:ring-4"
                style={{ borderColor: "#D1D8BE", color: "#7B4019", backgroundColor: "#FFBF78" }}
              >
                <option value="">All Categories</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            <button
              onClick={() => setShowAddForm(true)}
              className="flex items-center gap-3 px-8 py-4 rounded-2xl font-bold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
              style={{ backgroundColor: "#FF7D29", color: "white" }}
            >
              <Plus className="w-6 h-6" />
              Add New Dish
            </button>
          </div>
        </div>

        {(showAddForm || editingFood) && (
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-opacity-10 backdrop-blur">
            <div className="relative bg-white rounded-3xl shadow-2xl border-4 overflow-hidden animate-fadeIn" style={{ borderColor: "#FF7D29", maxWidth: "90%", maxHeight: "90vh", overflowY: "auto" }}>
              <div className="p-8 relative" style={{ background: "linear-gradient(135deg, #7B4019 0%, #FF7D29 100%)" }}>
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-full flex items-center justify-center text-3xl shadow-lg" style={{ backgroundColor: "#FFBF78" }}>
                      {editingFood ? "✏️" : "🍴"}
                    </div>
                    <div>
                      <h2 className="text-4xl font-bold text-white mb-2">
                        {editingFood ? "Edit Your Dish" : "Create New Dish"}
                      </h2>
                      <p className="text-xl text-white opacity-90">
                        {editingFood ? "Update the details of your culinary creation" : "Add a delicious new item to your menu"}
                      </p>
                    </div>
                  </div>
                  {editingFood && (
                    <div className="text-right">
                      <div className="text-white text-sm opacity-75 mb-1">Editing ID</div>
                      <span className="text-lg font-bold px-4 py-2 rounded-full bg-white shadow-lg" style={{ color: "#7B4019" }}>
                        {editingFood}
                      </span>
                    </div>
                  )}
                  <button
                    onClick={handleCancel}
                    className="absolute top-4 right-4 text-white hover:text-gray-200"
                  >
                    <X className="w-8 h-8" />
                  </button>
                </div>
              </div>

              <div className="p-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <div className="relative">
                      <label className="block text-lg font-bold mb-3" style={{ color: "#7B4019" }}>
                        🍽️ Dish Name *
                      </label>
                      <input
                        type="text"
                        placeholder="Enter delicious dish name..."
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full p-5 rounded-2xl border-3 text-lg font-medium transition-all duration-300 focus:outline-none focus:ring-4 focus:border-transparent shadow-lg"
                        style={{ borderColor: "#D1D8BE", color: "#7B4019", backgroundColor: "white", boxShadow: "0 4px 15px rgba(123, 64, 25, 0.1)" }}
                        required
                      />
                    </div>

                    <div className="relative">
                      <label className="block text-lg font-bold mb-3" style={{ color: "#7B4019" }}>
                        💰 Price *
                      </label>
                      <div className="relative">
                        <span className="absolute left-5 top-1/2 transform -translate-y-1/2 text-2xl font-bold" style={{ color: "#FF7D29" }}>
                          $
                        </span>
                        <input
                          type="number"
                          step="0.01"
                          placeholder="0.00"
                          value={formData.price}
                          onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                          className="w-full pl-12 pr-5 py-5 rounded-2xl border-3 text-lg font-medium transition-all duration-300 focus:outline-none focus:ring-4 focus:border-transparent shadow-lg"
                          style={{ borderColor: "#D1D8BE", color: "#7B4019", backgroundColor: "white", boxShadow: "0 4px 15px rgba(123, 64, 25, 0.1)" }}
                          required
                        />
                      </div>
                    </div>

                    <div className="relative">
                      <label className="block text-lg font-bold mb-3" style={{ color: "#7B4019" }}>
                        🏷️ Category *
                      </label>
                      <select
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                        className="w-full p-5 rounded-2xl border-3 text-lg font-medium transition-all duration-300 focus:outline-none focus:ring-4 focus:border-transparent shadow-lg"
                        style={{ borderColor: "#D1D8BE", color: "#7B4019", backgroundColor: "white", boxShadow: "0 4px 15px rgba(123, 64, 25, 0.1)" }}
                        required
                      >
                        <option value="">Choose a category...</option>
                        {categories.map((category) => (
                          <option key={category} value={category}>
                            {category}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div className="relative">
                      <label className="block text-lg font-bold mb-3" style={{ color: "#7B4019" }}>
                        📸 Dish Image
                      </label>
                      <div className="relative">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => setFormData({ ...formData, imageFile: e.target.files[0] })}
                          className="w-full p-5 rounded-2xl border-3 text-lg font-medium transition-all duration-300 focus:outline-none focus:ring-4 focus:border-transparent shadow-lg file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:text-white"
                          style={{ borderColor: "#D1D8BE", color: "#7B4019", backgroundColor: "white", boxShadow: "0 4px 15px rgba(123, 64, 25, 0.1)", fileBackgroundColor: "#FF7D29" }}
                        />
                      </div>
                    </div>

                    <div className="relative">
                      <label className="block text-lg font-bold mb-3" style={{ color: "#7B4019" }}>
                        📝 Description *
                      </label>
                      <textarea
                        placeholder="Describe your amazing dish in detail..."
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        className="w-full p-5 rounded-2xl border-3 text-lg font-medium h-40 resize-none transition-all duration-300 focus:outline-none focus:ring-4 focus:border-transparent shadow-lg"
                        style={{ borderColor: "#D1D8BE", color: "#7B4019", backgroundColor: "white", boxShadow: "0 4px 15px rgba(123, 64, 25, 0.1)" }}
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-6 mt-12 pt-8 border-t-2" style={{ borderColor: "#D1D8BE" }}>
                  <button
                    onClick={handleSave}
                    className="flex-1 flex items-center justify-center gap-4 px-8 py-5 rounded-2xl font-bold text-xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl shadow-lg"
                    style={{ backgroundColor: "#FF7D29", color: "white" }}
                  >
                    <Save className="w-7 h-7" />
                    {editingFood ? "🎯 Update Dish" : "💾 Save Dish"}
                  </button>

                  <button
                    onClick={handleCancel}
                    className="flex-1 flex items-center justify-center gap-4 px-8 py-5 rounded-2xl font-bold text-xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl shadow-lg"
                    style={{ backgroundColor: "#7B4019", color: "white" }}
                  >
                    <X className="w-7 h-7" />
                    ❌ Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredFoods.map((food) => (
            <div
              key={food._id || food.id}
              className="bg-white rounded-3xl shadow-2xl overflow-hidden transform transition-all duration-500 hover:scale-105 hover:shadow-3xl border-2"
              style={{ borderColor: "#FF7D29" }}
            >
              <div className="relative w-full h-56">
                {food.imageUrl ? (
                  <img
                    src={`http://localhost:8080${food.imageUrl}`}
                    alt={food.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src =
                        "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZGRkIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzk5OSIgdGV4dC1hbmNob3I9Im1pZGRlZSIgZHk9Ii4zZW0iPk5vIEltYWdlPC90ZXh0Pjwvc3ZnPg==";
                      e.target.onerror = null;
                    }}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-6xl" style={{ backgroundColor: "#D1D8BE" }}>
                    🍽️
                  </div>
                )}

                <div className="absolute top-4 right-4 px-4 py-2 rounded-full font-bold text-lg shadow-lg" style={{ backgroundColor: "#FF7D29", color: "white" }}>
                  ${food.price.toFixed(2)}
                </div>

                <div className="absolute bottom-4 left-4 right-4 flex justify-between">
                  <button
                    onClick={() => handleEdit(food)}
                    className="p-3 rounded-full shadow-lg transition-all duration-300 transform hover:scale-110"
                    style={{ backgroundColor: "#FFBF78" }}
                    title="Edit"
                  >
                    <Edit className="w-5 h-5" style={{ color: "#7B4019" }} />
                  </button>

                  <button
                    onClick={() => handleDelete(food._id || food.id)}
                    className="p-3 rounded-full shadow-lg transition-all duration-300 transform hover:scale-110"
                    style={{ backgroundColor: "#FF7D29" }}
                    title="Delete"
                  >
                    <Trash2 className="w-5 h-5 text-white" />
                  </button>
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold mb-3" style={{ color: "#7B4019" }}>
                  {food.name}
                </h3>

                <div className="mb-4">
                  <span className="inline-block px-4 py-2 rounded-full text-sm font-bold" style={{ backgroundColor: "#D1D8BE", color: "#7B4019" }}>
                    {food.category}
                  </span>
                </div>

                <p className="text-base leading-relaxed" style={{ color: "#7B4019" }}>
                  {food.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {filteredFoods.length === 0 && !loading && (
          <div className="text-center py-20">
            <div className="text-8xl mb-8">🍽️</div>
            <h3 className="text-3xl font-bold mb-4" style={{ color: "#7B4019" }}>
              {searchTerm || searchCategory ? "No dishes found matching your search" : "No dishes available yet"}
            </h3>
            <p className="text-xl mb-8" style={{ color: "#7B4019" }}>
              {searchTerm || searchCategory ? "Try adjusting your search criteria" : "Add your first delicious dish to get started!"}
            </p>
            {(searchTerm || searchCategory) && (
              <button
                onClick={() => {
                  setSearchTerm("");
                  setSearchCategory("");
                }}
                className="px-8 py-4 rounded-2xl font-bold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
                style={{ backgroundColor: "#FF7D29", color: "white" }}
              >
                Clear Search Filters
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

// Animation style
const styles = `
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  .animate-fadeIn {
    animation: fadeIn 0.3s ease-in;
  }
`;
const styleSheet = document.createElement("style");
styleSheet.textContent = styles;
document.head.appendChild(styleSheet);

export default FoodDisplay;