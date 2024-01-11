import React, { useState } from 'react';
import './Doctors.css'; 
import DoctorRow from './DoctorRow';

function Doctors({ doctors, deleteDoctor }) {
  const [filter, setFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOrder, setSortOrder] = useState(null);  // null, 'asc' or 'desc'
  const [currentPage, setCurrentPage] = useState(1);
  const doctorsPerPage = 5;

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
  // Get current doctors
  const indexOfLastDoctor = currentPage * doctorsPerPage;
  const indexOfFirstDoctor = indexOfLastDoctor - doctorsPerPage;
  const currentDoctors = sortedAndFilteredDoctors.slice(indexOfFirstDoctor, indexOfLastDoctor);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const handleSort = () => {
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };
  // Calculate page count
  const pageCount = Math.ceil(sortedAndFilteredDoctors.length / doctorsPerPage);
  // Create an array with the number of pages
  const pageNumbers = [...Array(pageCount).keys()].map(num => num + 1);
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
          {currentDoctors.map(doctor => (
            <DoctorRow key={doctor.id} doctor={doctor} deleteDoctor={deleteDoctor} />
          ))}
        </tbody>
      </table>
      <div className="pagination">
        {pageNumbers.map(number => (
          <button key={number} onClick={() => paginate(number)} className={`page-item ${currentPage === number ? 'active' : ''}`}>
            {number}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Doctors;
