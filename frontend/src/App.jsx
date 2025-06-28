import { Routes,Route } from "react-router-dom"
import './index.css';
import Register from "./Pages/Register/Register.jsx"
import Login from "./Pages/Login/Login.jsx";
import HomePage from "./Pages/Home/HomePage.jsx";
import AddFood from "./Pages/Add Food/AddFood.jsx";
import FoodDisplay from "./Pages/FoodDisplay/FoodDisplay.jsx";
import Pizza from "./Pages/Category Pages/Pizza.jsx";
import Burgers from "./Pages/Category Pages/Burgers.jsx";



function App() {
  

  return (

    <Routes>
      <Route path="/" element={<Register/>} />
      <Route path="/Login" element={<Login/>} />
      <Route path="/home" element={<HomePage />} />
      <Route path="/add-food"element={<AddFood/>} />
      <Route path="/food-display" element={<FoodDisplay />} />
      <Route path="/pizza" element={<Pizza />} />
      <Route path="/burgers" element={<Burgers />} />
     
      <Route path="/about" element={<h1>About Page</h1>} />
      <Route path="/contact" element={<h1>Contact Page</h1>} />
      <Route path="*" element={<h1>404 Not Found</h1>} />
    </Routes>
    
  )
}

export default App
