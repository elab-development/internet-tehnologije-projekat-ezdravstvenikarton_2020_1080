import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './komponente/pocetna/Home';
import ImageGallery from './komponente/Galerija/ImageGallery';
import Doctors from './komponente/Doktori/Doctors';
import DoctorForm from './komponente/Doktori/DoctorForm';
import Navbar from './komponente/navbar/Navbar';
import useDoctors from './komponente/customHooks/useDoctors';
import Login from './komponente/Login/Login';
import Register from './komponente/Login/Register';

function App() {
  const [user,setUser] = useState(null);
  const { doctors,addDoctor, deleteDoctor } = useDoctors();
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>

          <Route path="/" element={<Home />} />
          <Route path="/doctors/add" element={<DoctorForm addDoctor={addDoctor} />} />
          <Route path="/doctors" element={<Doctors  doctors={doctors}  deleteDoctor={deleteDoctor}/>} />
          <Route path="/gallery" element={<ImageGallery />} />




          {/*seminarski */}
          <Route path="/login" element={<Login setUser={setUser} />} />
          <Route path="/register" element={<Register />} />



        </Routes>
      </div>
    </Router>
  );
}

export default App;
