// App.js
import React, { useEffect, useState } from 'react';
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
import axios from 'axios';

function App() {
  const [user, setUser] = useState(null);
  const { doctors, addDoctor, deleteDoctor } = useDoctors();
  useEffect(() => {
    const storedUser = sessionStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);
  return (
    <Router>
      <div className="App">
        <Navbar user={user} setUser={setUser} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/doctors/add" element={user ? <DoctorForm addDoctor={addDoctor} /> : <Home />} />
          <Route path="/doctors" element={user ? <Doctors doctors={doctors} deleteDoctor={deleteDoctor} /> : <Home />} />
          <Route path="/gallery" element={<ImageGallery />} />





          <Route path="/login" element={<Login setUser={setUser} />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
