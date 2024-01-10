import React from 'react';
import './Doctors.css';

const doctors = [
  { id: 1, name: 'Dr. Jane Smith', specialty: 'Cardiology', yearsOfExperience: 12, rating: 4.5 },
  { id: 2, name: 'Dr. John Doe', specialty: 'Neurology', yearsOfExperience: 8, rating: 4.7 },
  { id: 3, name: 'Dr. Emily Jones', specialty: 'Pediatrics', yearsOfExperience: 5, rating: 4.6 },
  { id: 4, name: 'Dr. William Brown', specialty: 'Orthopedics', yearsOfExperience: 15, rating: 4.4 },
  { id: 5, name: 'Dr. Anna Davis', specialty: 'Dermatology', yearsOfExperience: 9, rating: 4.8 }
];

function Doctors() {
  return (
    <div className="doctors-container">
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Specialty</th>
            <th>Years of Experience</th>
            <th>Rating</th>
          </tr>
        </thead>
        <tbody>
          {doctors.map(doctor => (
            <tr key={doctor.id}>
              <td>{doctor.id}</td>
              <td>{doctor.name}</td>
              <td>{doctor.specialty}</td>
              <td>{doctor.yearsOfExperience}</td>
              <td>{doctor.rating}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Doctors;
