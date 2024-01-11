import React from 'react';
import './Doctors.css';
import useDoctors from '../customHooks/useDoctors';
import DoctorRow from './DoctorRow';

 

function Doctors({doctors,deleteDoctor}) {
    
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
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
            {doctors.map(doctor => (
               <DoctorRow key={doctor.id} doctor={doctor} deleteDoctor={deleteDoctor} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Doctors;
