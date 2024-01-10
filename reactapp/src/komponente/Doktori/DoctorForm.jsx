import React, { useState } from 'react';
import './DoctorForm.css';
import useDoctors from '../customHooks/useDoctors';
import FormInput from './FormInput';

function DoctorForm() {
    const { addDoctor } = useDoctors();
    const [newDoctor, setNewDoctor] = useState({
      name: '',
      specialty: '',
      yearsOfExperience: 0,
      rating: 0
    });
  
    const handleChange = (e) => {
      setNewDoctor({ ...newDoctor, [e.target.name]: e.target.value });
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      addDoctor(newDoctor);
      setNewDoctor({ name: '', specialty: '', yearsOfExperience: 0, rating: 0 });
    };
    return (
        <div className="doctor-form-container">
          <form className="doctor-form" onSubmit={handleSubmit}>
            <FormInput 
              label="Name"
              type="text"
              name="name"
              value={newDoctor.name}
              onChange={handleChange}
              required
            />
            <FormInput 
              label="Specialty"
              type="text"
              name="specialty"
              value={newDoctor.specialty}
              onChange={handleChange}
              required
            />
            <FormInput 
              label="Years of Experience"
              type="number"
              name="experience"
              value={newDoctor.yearsOfExperience}
              onChange={handleChange}
              required
              step="1"
              min="0"
              max="60"
            />
            <FormInput 
              label="Rating"
              type="number"
              name="rating"
              value={newDoctor.rating}
              onChange={handleChange}
              required
              step="0.1"
              min="0"
              max="5"
            />
            <button type="submit" className="submit-btn">Add Doctor</button>
          </form>
        </div>
      );
      
}

export default DoctorForm;
