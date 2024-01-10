 
import { useState, useEffect } from 'react';

const useDoctors = () => {
  const [doctors, setDoctors] = useState([
    { id: 1, name: 'Dr. Jane Smith', specialty: 'Cardiology', yearsOfExperience: 12, rating: 4.5 },
    { id: 2, name: 'Dr. John Doe', specialty: 'Neurology', yearsOfExperience: 8, rating: 4.7 },
    { id: 3, name: 'Dr. Emily Jones', specialty: 'Pediatrics', yearsOfExperience: 5, rating: 4.6 },
    { id: 4, name: 'Dr. William Brown', specialty: 'Orthopedics', yearsOfExperience: 15, rating: 4.4 },
    { id: 5, name: 'Dr. Anna Davis', specialty: 'Dermatology', yearsOfExperience: 9, rating: 4.8 }
  ]);

   

  return doctors;
};

export default useDoctors;
