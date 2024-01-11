import React, { useState } from 'react';
import './Doctors.css';
import useDoctors from '../customHooks/useDoctors';
import DoctorRow from './DoctorRow';

function Doctors({ doctors, deleteDoctor }) {
  const [filter, setFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const specialties = ["All", "Cardiology", "Neurology", "Pediatrics", "Orthopedics", "Dermatology"];

  const filteredDoctors = doctors.filter(doctor => {
    return (filter === 'All' || doctor.specialty === filter) &&
           (doctor.name.toLowerCase().includes(searchQuery.toLowerCase()));
  });

  return (
    <div className="doctors-container">
      <div className="search-and-filter-container">
        <input
          type="text"
          placeholder="Search by name..."
          className="search-input"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <div className="filter-container">
          {specialties.map(specialty => (
            <button
              key={specialty}
              className={`filter-button ${filter === specialty ? 'active' : ''}`}
              onClick={() => setFilter(specialty)}
            >
              {specialty}
            </button>
          ))}
        </div>
      </div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Specialty</th>
            <th>Years of Experience</th>
            <th>Rating</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {filteredDoctors.map(doctor => (
            <DoctorRow key={doctor.id} doctor={doctor} deleteDoctor={deleteDoctor} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Doctors;
