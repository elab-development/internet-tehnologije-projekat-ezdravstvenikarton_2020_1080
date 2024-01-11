import React, { useState } from 'react';
import './Doctors.css'; 
import DoctorRow from './DoctorRow';

function Doctors({ doctors, deleteDoctor }) {
  const [filter, setFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOrder, setSortOrder] = useState(null);  // null, 'asc' or 'desc'

  const specialties = ["All", "Cardiology", "Neurology", "Pediatrics", "Orthopedics", "Dermatology"];

  let sortedAndFilteredDoctors = doctors.filter(doctor => {
    return (filter === 'All' || doctor.specialty === filter) &&
           doctor.name.toLowerCase().includes(searchQuery.toLowerCase());
  });

  if (sortOrder !== null) {
    sortedAndFilteredDoctors.sort((a, b) => {
      return sortOrder === 'asc' ? a.rating - b.rating : b.rating - a.rating;
    });
  }

  const handleSort = () => {
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  return (
    <div className="doctors-container">
      <div className="search-sort-filter-container">
        <input
          type="text"
          placeholder="Search by name..."
          className="search-input"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button onClick={handleSort} className="sort-button">
          Sort by Rating {sortOrder === 'asc' ? '↓' : '↑'}
        </button>
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
          {sortedAndFilteredDoctors.map(doctor => (
            <DoctorRow key={doctor.id} doctor={doctor} deleteDoctor={deleteDoctor} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Doctors;
