import React from 'react'; // Correct as is
import { Routes, Route, useLocation } from "react-router-dom";
import './index.css';
import Register from "./Pages/Register/Register.jsx";
import Login from "./Pages/Login/Login.jsx";
import HomePage from "./Pages/Home/HomePage.jsx";
import AddFood from "./Pages/Add Food/AddFood.jsx";
import FoodDisplay from "./Pages/FoodDisplay/FoodDisplay.jsx";
import Pizza from "./Pages/Category Pages/Pizza.jsx";
import Burgers from "./Pages/Category Pages/Burgers.jsx";
import Header from './Pages/Components/Header.jsx';
import Footer from './Pages/Components/Footer.jsx';
import Sushi from "./Pages/Category Pages/Sushi.jsx";
import Desserts from "./Pages/Category Pages/Desserts.jsx";
import Salads from "./Pages/Category Pages/Salads.jsx";
import Tacos from "./Pages/Category Pages/Tacos.jsx";
import { AuthProvider } from './Pages/AuthContext.jsx';
import AdminPanel from './Pages/Admin/AdminPanel.jsx';
import Cart from './Pages/Cart/Cart.jsx';
import AdvancedHeroSection from './Pages/Components/AdvancedHeroSection.jsx';

function App() {
  const location = useLocation(); // Get the current route

  // Define the paths where the Header should not appear
  const hideHeaderRoutes = ["/add-food","/admin"];

  return (
    <AuthProvider>
      <div className="min-h-screen flex flex-col">
        {/* Render Header only if the current path is not in hideHeaderRoutes */}
        {!hideHeaderRoutes.includes(location.pathname) && <Header />}
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/add-food" element={<AddFood />} />
            <Route path="/food-display" element={<FoodDisplay />} />
            <Route path="/pizza" element={<Pizza />} />
            <Route path="/burgers" element={<Burgers />} />
            <Route path="/sushi" element={<Sushi />} />
            <Route path="/desserts" element={<Desserts />} />
            <Route path="/salads" element={<Salads />} />
            <Route path="/tacos" element={<Tacos />} />
            <Route path="/admin" element={<AdminPanel />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/advanced-hero" element={<AdvancedHeroSection />} />
            <Route path="/about" element={<h1>About Page</h1>} />
            <Route path="/contact" element={<h1>Contact Page</h1>} />
            <Route path="*" element={<h1>404 Not Found</h1>} />
          </Routes>
        </main>
        <Footer />
      </div>
    </AuthProvider>
  );
}

export default App;
