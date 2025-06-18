import { Routes,Route } from "react-router-dom"
import './index.css';
import Register from "./Pages/Register/Register.jsx"
import Login from "./Pages/Login/Login.jsx";

function App() {
  

  return (

    <Routes>
      <Route path="/" element={<Register/>} />
      <Route path="/Login" element={<Login/>} />
      <Route path="/contact" element={<h1>Contact Page</h1>} />
      <Route path="*" element={<h1>404 Not Found</h1>} />
    </Routes>
    
  )
}

export default App
