import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './komponente/pocetna/Home';
import ImageGallery from './komponente/Galerija/ImageGallery';
import Doctors from './komponente/Doktori/Doctors';
import DoctorForm from './komponente/Doktori/DoctorForm';
import Navbar from './komponente/navbar/Navbar';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>

          <Route path="/" element={<Home />} />
          <Route path="/doctors/add" element={<DoctorForm />} />
          <Route path="/doctors" element={<Doctors />} />
          <Route path="/gallery" element={<ImageGallery />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
