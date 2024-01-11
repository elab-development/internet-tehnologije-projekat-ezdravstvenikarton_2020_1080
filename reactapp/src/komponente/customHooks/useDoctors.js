 
import { useState, useEffect } from 'react';
const initialDoctors = [
    { id: 1, name: 'Dr. Jane Smith', specialty: 'Cardiology', yearsOfExperience: 12, rating: 4.5 },
    { id: 2, name: 'Dr. John Doe', specialty: 'Neurology', yearsOfExperience: 8, rating: 4.7 },
    { id: 3, name: 'Dr. Emily Jones', specialty: 'Pediatrics', yearsOfExperience: 5, rating: 4.6 },
    { id: 4, name: 'Dr. William Brown', specialty: 'Orthopedics', yearsOfExperience: 15, rating: 4.4 },
    { id: 5, name: 'Dr. Anna Davis', specialty: 'Dermatology', yearsOfExperience: 9, rating: 4.8 }
  ];
  const useDoctors = () => {
    const [doctors, setDoctors] = useState(initialDoctors);
  
    const addDoctor = (newDoctor) => {
      setDoctors([...doctors, { id: doctors.length + 1, ...newDoctor }]);
      console.log(newDoctor)
      console.log(doctors)
    };
  
    const deleteDoctor = (id) => {
      setDoctors(doctors.filter(doctor => doctor.id !== id));
    };
  
    return { doctors, addDoctor, deleteDoctor };
  };
  
  export default useDoctors;
  
 
