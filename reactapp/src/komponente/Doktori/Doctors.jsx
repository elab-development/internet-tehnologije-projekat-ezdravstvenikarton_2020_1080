import React, { useState } from 'react';
import './Doctors.css';
import useDoctors from '../customHooks/useDoctors';
import DoctorRow from './DoctorRow';

 

function Doctors({doctors,deleteDoctor}) {
  const [filter, setFilter] = useState('All');

  const specialties = ["All", "Cardiology", "Neurology", "Pediatrics", "Orthopedics", "Dermatology"];

  const filteredDoctors = filter === 'All' ? doctors : doctors.filter(doctor => doctor.specialty === filter);
  return (
    <div className="doctors-container">
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
