import React from 'react';
import './Doctors.css';
import useDoctors from '../customHooks/useDoctors';
import DoctorRow from './DoctorRow';

 

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
                <DoctorRow key={doctor.id} doctor={doctor} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Doctors;
