import React, { useState, useEffect } from "react";
import { useAuth } from "../AuthContext.jsx";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Plus, Minus, Trash2, ShoppingCart, ArrowLeft, CreditCard } from "lucide-react";

const Cart = () => {
  const { userId } = useAuth();
  const navigate = useNavigate();
  
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showCheckout, setShowCheckout] = useState(false);

  // Calculate cart totals
  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => total + (item.food?.price || 0) * item.quantity, 0);
  };

  const calculateTax = (subtotal) => {
    return subtotal * 0.08; // 8% tax
  };

  const calculateDeliveryFee = () => {
    return cartItems.length > 0 ? 3.99 : 0;
  };

  const calculateTotal = () => {
    const subtotal = calculateSubtotal();
    const tax = calculateTax(subtotal);
    const deliveryFee = calculateDeliveryFee();
    return subtotal + tax + deliveryFee;
  };

  // Fetch cart data
  useEffect(() => {
    const fetchCartData = async () => {
      setLoading(true);
      setError("");
      try {
        const response = await axios.get(`http://localhost:8080/api/cart/${userId}`);
        console.log("Cart items response:", response.data);

        const cartItemsWithFood = await Promise.allSettled(
          response.data.map(async (item) => {
            try {
              const foodResponse = await axios.get(`http://localhost:8080/api/food/${item.foodId}`);
              return { ...item, food: foodResponse.data };
            } catch (foodError) {
              console.error("Failed to fetch food for foodId", item.foodId, ":", foodError);
              return { 
                ...item, 
                food: { 
                  name: "Unknown Food", 
                  price: 0, 
                  description: "Failed to load",
                  image: "" 
                } 
              };
            }
          })
        );

        const fulfilledItems = cartItemsWithFood
          .filter((result) => result.status === "fulfilled")
          .map((result) => result.value);
          
        setCartItems(fulfilledItems);
      } catch (error) {
        console.error("Error fetching cart data:", error);
        setError("Failed to load cart items");
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchCartData();
    }
  }, [userId]);

  // Cart item operations
  const updateQuantity = async (cartItemId, newQuantity) => {
    if (newQuantity < 1) return;
    
    try {
      const response = await axios.post(
        `http://localhost:8080/api/cart/update/${cartItemId}`,
        { quantity: newQuantity.toString() }
      );
      
      setCartItems(cartItems.map(item => 
        item.id === cartItemId ? { ...item, quantity: newQuantity } : item
      ));
    } catch (err) {
      console.error('Update quantity error:', err);
      setError('Failed to update quantity');
    }
  };

  const removeItem = async (cartItemId) => {
    try {
      await axios.post(`http://localhost:8080/api/cart/remove/${cartItemId}`);
      setCartItems(cartItems.filter(item => item.id !== cartItemId));
    } catch (err) {
      console.error('Remove item error:', err);
      setError('Failed to remove item');
    }
  };

  const clearCart = async () => {
    try {
      await axios.post(`http://localhost:8080/api/cart/clear/${userId}`);
      setCartItems([]);
    } catch (err) {
      console.error('Clear cart error:', err);
      setError('Failed to clear cart');
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#F5F5F5' }}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 mx-auto mb-4" style={{ borderColor: '#FF7D29' }}></div>
          <p className="text-gray-600">Loading your cart...</p>
        </div>
      </div>
    );
  }

  // Checkout view
  if (showCheckout) {
    return (
      <div className="min-h-screen" style={{ backgroundColor: '#F5F5F5' }}>
        <div className="container mx-auto px-4 py-8">
          <button
            onClick={() => setShowCheckout(false)}
            className="flex items-center gap-2 mb-6 text-gray-600 hover:text-gray-800 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Cart
          </button>
          
          <div className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-bold mb-6" style={{ color: '#7B4019' }}>Checkout</h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold mb-4" style={{ color: '#7B4019' }}>Delivery Information</h3>
                <div className="space-y-4">
                  <input
                    type="text"
                    placeholder="Full Name"
                    className="w-full p-3 border rounded-lg"
                    style={{ borderColor: '#D1D8BE' }}
                  />
                  <input
                    type="email"
                    placeholder="Email Address"
                    className="w-full p-3 border rounded-lg"
                    style={{ borderColor: '#D1D8BE' }}
                  />
                  <input
                    type="tel"
                    placeholder="Phone Number"
                    className="w-full p-3 border rounded-lg"
                    style={{ borderColor: '#D1D8BE' }}
                  />
                  <textarea
                    placeholder="Delivery Address"
                    rows="3"
                    className="w-full p-3 border rounded-lg"
                    style={{ borderColor: '#D1D8BE' }}
                  />
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-4" style={{ color: '#7B4019' }}>Payment Method</h3>
                <div className="space-y-4">
                  <div className="border rounded-lg p-4" style={{ borderColor: '#D1D8BE' }}>
                    <label className="flex items-center gap-3">
                      <input type="radio" name="payment" defaultChecked />
                      <CreditCard className="w-5 h-5" style={{ color: '#FF7D29' }} />
                      <span>Credit/Debit Card</span>
                    </label>
                  </div>
                  <div className="border rounded-lg p-4" style={{ borderColor: '#D1D8BE' }}>
                    <label className="flex items-center gap-3">
                      <input type="radio" name="payment" />
                      <span>💰</span>
                      <span>Cash on Delivery</span>
                    </label>
                  </div>
                </div>
                
                <div className="mt-6 p-4 rounded-lg" style={{ backgroundColor: '#FFBF78' }}>
                  <h4 className="font-semibold mb-3" style={{ color: '#7B4019' }}>Order Summary</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Subtotal:</span>
                      <span>${calculateSubtotal().toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Tax:</span>
                      <span>${calculateTax(calculateSubtotal()).toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Delivery Fee:</span>
                      <span>${calculateDeliveryFee().toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between font-bold text-lg border-t pt-2" style={{ color: '#7B4019' }}>
                      <span>Total:</span>
                      <span>${calculateTotal().toFixed(2)}</span>
                    </div>
                  </div>
                </div>
                
                <button
                  className="w-full mt-6 py-3 rounded-lg text-white font-semibold hover:opacity-90 transition-opacity"
                  style={{ backgroundColor: '#FF7D29' }}
                >
                  Place Order
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Main cart view
  return (
    <div className="min-h-screen" style={{ backgroundColor: '#F5F5F5' }}>
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <ShoppingCart className="w-8 h-8" style={{ color: '#FF7D29' }} />
            <h1 className="text-3xl font-bold" style={{ color: '#7B4019' }}>Your Cart</h1>
          </div>
          {cartItems.length > 0 && (
            <button
              onClick={clearCart}
              className="px-4 py-2 text-red-600 border border-red-300 rounded-lg hover:bg-red-50 transition-colors"
            >
              Clear Cart
            </button>
          )}
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
            {error}
          </div>
        )}

        {cartItems.length === 0 ? (
          <div className="text-center py-12">
            <ShoppingCart className="w-16 h-16 mx-auto mb-4 text-gray-400" />
            <h2 className="text-2xl font-semibold text-gray-600 mb-2">Your cart is empty</h2>
            <p className="text-gray-500 mb-6">Add some delicious items to get started!</p>
            <button
              onClick={() => navigate('/menu')}
              className="px-6 py-3 rounded-lg text-white font-semibold hover:opacity-90 transition-opacity"
              style={{ backgroundColor: '#FF7D29' }}
            >
              Browse Menu
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div key={item.id} className="bg-white rounded-lg shadow-md p-6">
                    <div className="flex items-center gap-4">
                      {item.food?.image ? (
                        <img
                          src={item.food.image}
                          alt={item.food.name}
                          className="w-20 h-20 object-cover rounded-lg"
                        />
                      ) : (
                        <div className="w-20 h-20 bg-gray-200 rounded-lg flex items-center justify-center">
                          <ShoppingCart className="w-8 h-8 text-gray-400" />
                        </div>
                      )}
                      
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold" style={{ color: '#7B4019' }}>
                          {item.food?.name || "Unknown Food"}
                        </h3>
                        <p className="text-gray-600 text-sm mb-2">
                          {item.food?.description || "No description available"}
                        </p>
                        <p className="text-xl font-bold" style={{ color: '#FF7D29' }}>
                          ${(item.food?.price || 0).toFixed(2)}
                        </p>
                      </div>
                      
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                          style={{ color: '#FF7D29' }}
                          disabled={item.quantity <= 1}
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        
                        <span className="w-12 text-center font-semibold text-lg">
                          {item.quantity}
                        </span>
                        
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                          style={{ color: '#FF7D29' }}
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                      
                      <div className="text-right">
                        <p className="text-lg font-bold mb-2" style={{ color: '#7B4019' }}>
                          ${((item.food?.price || 0) * item.quantity).toFixed(2)}
                        </p>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="p-2 text-red-500 hover:bg-red-50 rounded-full transition-colors"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-md p-6 sticky top-6">
                <h2 className="text-xl font-bold mb-6" style={{ color: '#7B4019' }}>Order Summary</h2>
                
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal ({cartItems.reduce((total, item) => total + item.quantity, 0)} items):</span>
                    <span className="font-semibold">${calculateSubtotal().toFixed(2)}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tax:</span>
                    <span className="font-semibold">${calculateTax(calculateSubtotal()).toFixed(2)}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-gray-600">Delivery Fee:</span>
                    <span className="font-semibold">${calculateDeliveryFee().toFixed(2)}</span>
                  </div>
                  
                  <div className="border-t pt-3">
                    <div className="flex justify-between text-xl font-bold" style={{ color: '#7B4019' }}>
                      <span>Total:</span>
                      <span>${calculateTotal().toFixed(2)}</span>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <button
                    onClick={() => setShowCheckout(true)}
                    className="w-full py-3 rounded-lg text-white font-semibold hover:opacity-90 transition-opacity"
                    style={{ backgroundColor: '#FF7D29' }}
                  >
                    Proceed to Checkout
                  </button>
                  
                  <button
                    onClick={() => navigate('/menu')}
                    className="w-full py-3 rounded-lg border font-semibold hover:bg-gray-50 transition-colors"
                    style={{ borderColor: '#D1D8BE', color: '#7B4019' }}
                  >
                    Continue Shopping
                  </button>
                </div>
                
                <div className="mt-6 p-4 rounded-lg" style={{ backgroundColor: '#D1D8BE' }}>
                  <p className="text-sm text-gray-700">
                    🚚 <strong>Free delivery</strong> on orders over $30!
                    {calculateSubtotal() < 30 && (
                      <span> Add ${(30 - calculateSubtotal()).toFixed(2)} more to qualify.</span>
                    )}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;