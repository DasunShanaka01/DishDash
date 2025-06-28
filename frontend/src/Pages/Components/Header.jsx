import React, { useEffect, useState } from "react"; // Add { useState }
import { useAuth } from '../AuthContext.jsx'; // Adjust path as needed
import {
  Search,
  MapPin,
  ShoppingCart,
  User,
  Menu,
  X,
  Home,
  UtensilsCrossed,
  ChevronDown,
} from "lucide-react";
import axios from "axios";

const Header = ({ cartItems = 0, cartTotal = 0 }) => {
  const { isAuthenticated, userId, checkSession } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Line 18
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  useEffect(() => {
    checkSession();
  }, []);

  const handleLogout = async () => {
    try {
      await axios.post(
        "http://localhost:8080/api/v1/logout",
        {},
        { withCredentials: true }
      );
      await checkSession();
      alert("Logged out successfully");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-xl"
              style={{
                background: "linear-gradient(135deg, #7B4019 0%, #FF7D29 100%)",
              }}
            >
              DD
            </div>
            <h1 className="text-2xl font-bold" style={{ color: "#7B4019" }}>
              Dish Dash
            </h1>
          </div>

          {/* Location & Search */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-gray-600">
              <MapPin className="w-5 h-5" />
              <span className="text-sm">Deliver to:</span>
              <button
                className="font-semibold text-sm hover:text-orange-600 transition-colors flex items-center space-x-1"
                style={{ color: "#7B4019" }}
              >
                <span>Your Location</span>
                <ChevronDown className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">
            {/* Cart */}
            <button
              className="relative flex items-center space-x-2 px-4 py-2 rounded-full text-white font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg"
              style={{
                background: "linear-gradient(135deg, #FF7D29 0%, #FFBF78 100%)",
              }}
            >
              <ShoppingCart className="w-5 h-5" />
              <span className="hidden sm:inline">Cart</span>
              {cartItems > 0 && (
                <>
                  <span className="hidden sm:inline">({cartItems})</span>
                  <span className="hidden sm:inline">${cartTotal.toFixed(2)}</span>
                  <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                    {cartItems}
                  </div>
                </>
              )}
            </button>

            {/* User Menu */}
            <div className="relative">
              <button
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="flex items-center space-x-1 p-2 text-gray-600 hover:text-orange-600 transition-colors"
              >
                <User className="w-5 h-5" />
                <ChevronDown className="w-4 h-4" />
              </button>

              {/* User Dropdown */}
              {isUserMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-100 py-2">
                  {isAuthenticated ? (
                    <>
                      <a
                        href="/profile"
                        className="block px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-orange-600 transition-colors"
                      >
                        My Profile
                      </a>
                      <a
                        href="/orders"
                        className="block px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-orange-600 transition-colors"
                      >
                        My Orders
                      </a>
                      <hr className="my-2" />
                      <button
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-orange-600 transition-colors"
                      >
                        Log Out
                      </button>
                    </>
                  ) : (
                    <>
                      <a
                        href="/login"
                        className="block px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-orange-600 transition-colors"
                      >
                        Sign In
                      </a>
                      <a
                        href="/signup"
                        className="block px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-orange-600 transition-colors"
                      >
                        Sign Up
                      </a>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;