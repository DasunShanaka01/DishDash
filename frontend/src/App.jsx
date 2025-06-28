import { Routes,Route } from "react-router-dom"
import './index.css';
import Register from "./Pages/Register/Register.jsx"
import EditPlaces from "./Pages/OrderPlace/EditPlaces.jsx";
import ShowPlace from "./Pages/OrderPlace/ShowPlace.jsx";
import DashboardPlaces from "./Pages/OrderPlace/DashboardPlaces.jsx";
import CreatePlaces from "./Pages/OrderPlace/CreatePlaces.jsx";
import DeletePlaces from "./Pages/OrderPlace/DeletePlaces.jsx";




function App() {
  

  return (

    <Routes>
      <Route path="/" element={<Register/>} />
      <Route path="/about" element={<h1>About Page</h1>} />
      <Route path="/contact" element={<h1>Contact Page</h1>} />
      <Route path="*" element={<h1>404 Not Found</h1>} />
      <Route path="/addPlace" element={<CreatePlaces/>} />
      <Route path="/editPlace/:id" element={<EditPlaces/>} />
      <Route path="/showPlace/:id" element={<ShowPlace/>} />
      <Route path="/dashboardPlace" element={<DashboardPlaces/>} />
      <Route path="/deletePlace/:id" element={<DeletePlaces/>} />
      
      
      
    </Routes>
    
  )
}

export default App
