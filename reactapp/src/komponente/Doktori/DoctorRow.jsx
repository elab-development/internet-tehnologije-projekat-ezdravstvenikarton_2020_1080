import React from 'react';

function DoctorRow({ doctor, deleteDoctor }) {
  return (
    <tr>
      <td>{doctor.id}</td>
      <td>{doctor.name}</td>
      <td>{doctor.specialty}</td>
      <td>{doctor.yearsOfExperience}</td>
      <td>{doctor.rating}</td>
      <td>
        <button onClick={() => deleteDoctor(doctor.id)}>Delete</button>
      </td>
    </tr>
  );
}

export default DoctorRow;
