import React from 'react';

function DoctorRow({ doctor }) {
  return (
    <tr>
      <td>{doctor.id}</td>
      <td>{doctor.name}</td>
      <td>{doctor.specialty}</td>
      <td>{doctor.yearsOfExperience}</td>
      <td>{doctor.rating}</td>
    </tr>
  );
}

export default DoctorRow;
