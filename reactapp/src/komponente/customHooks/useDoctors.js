 
import { useState, useEffect } from 'react';
const initialDoctors = [
    { id: 1, name: 'Dr. Jane Smith', specialty: 'Cardiology', yearsOfExperience: 12, rating: 4.5 },
    { id: 2, name: 'Dr. John Doe', specialty: 'Neurology', yearsOfExperience: 8, rating: 4.7 },
    { id: 3, name: 'Dr. Emily Jones', specialty: 'Pediatrics', yearsOfExperience: 5, rating: 4.6 },
    { id: 4, name: 'Dr. William Brown', specialty: 'Orthopedics', yearsOfExperience: 15, rating: 4.4 },
    { id: 5, name: 'Dr. Anna Davis', specialty: 'Dermatology', yearsOfExperience: 9, rating: 4.8 },
    { id: 6, name: 'Dr. Jane Smith', specialty: 'Cardiology', yearsOfExperience: 12, rating: 4.5 },
    { id: 7, name: 'Dr. John Doe', specialty: 'Neurology', yearsOfExperience: 8, rating: 4.7 },
    { id: 8, name: 'Dr. Emily Jones', specialty: 'Pediatrics', yearsOfExperience: 5, rating: 4.6 },
    { id: 9, name: 'Dr. William Brown', specialty: 'Orthopedics', yearsOfExperience: 15, rating: 4.4 },
    { id: 10, name: 'Dr. Anna Davis', specialty: 'Dermatology', yearsOfExperience: 9, rating: 4.8 },
    { id: 11, name: 'Dr. Jane Smith', specialty: 'Cardiology', yearsOfExperience: 12, rating: 4.5 },
    { id: 12, name: 'Dr. John Doe', specialty: 'Neurology', yearsOfExperience: 8, rating: 4.7 },
    { id: 13, name: 'Dr. Emily Jones', specialty: 'Pediatrics', yearsOfExperience: 5, rating: 4.6 },
    { id: 14, name: 'Dr. William Brown', specialty: 'Orthopedics', yearsOfExperience: 15, rating: 4.4 },
    { id: 15, name: 'Dr. Anna Davis', specialty: 'Dermatology', yearsOfExperience: 9, rating: 4.8 },
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
  
 
