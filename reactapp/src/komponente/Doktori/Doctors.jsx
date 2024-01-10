import React from 'react';
import './Doctors.css';
import useDoctors from '../customHooks/useDoctors';

 

function Doctors() {
    const doctors = useDoctors();
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
