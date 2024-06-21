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
import Karton from './komponente/Karton/Karton';
import KreirajAppointment from './komponente/Karton/KreirajAppointment';
import DoctorPanel from './komponente/Doktori/DoktorPanel/DoctorPanel';
import DrugsList from './komponente/fda/DrugsList';
import Statistics from './komponente/Admin/Statistics';

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
          <Route path="/doctors/add" element={user && user.role === 'admin' ? <DoctorForm addDoctor={addDoctor} /> : <Home />} />
          <Route path="/doctors" element={user && user.role === 'admin' ? <Doctors doctors={doctors} deleteDoctor={deleteDoctor} /> : <Home />} />
          <Route path="/gallery" element={<ImageGallery />} />






          <Route path="/drugList" element={<DrugsList />} />
          <Route path="/doctorPanel" element={<DoctorPanel />} />
          <Route path="/karton" element={user ? <Karton /> : <Home />} />
          <Route path="/karton/kreirajAppointment" element={user ? <KreirajAppointment /> : <Home />} />
          <Route path="/login" element={<Login setUser={setUser} />} />
          <Route path="/register" element={<Register />} />


          <Route path="/statistics" element={<Statistics />} />

        </Routes>
      </div>
    </Router>
  );
}

export default App;
