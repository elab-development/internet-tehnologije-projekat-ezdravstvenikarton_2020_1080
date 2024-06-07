import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './KreirajAppointment.css'; 

const KreirajAppointment = () => {
    const [doctors, setDoctors] = useState([]);
    const [nurses, setNurses] = useState([]);
  const [appointmentDate, setAppointmentDate] = useState('2024-06-20T14:30');
  const [doctorId, setDoctorId] = useState('1');  
  const [nurseId, setNurseId] = useState('1');    
  const [notes, setNotes] = useState('Initial consultation.'); 
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const user = JSON.parse(sessionStorage.getItem('user'));

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/doctors', {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem('token')}`,
      },
    })
    .then(response => {
      setDoctors(response.data);
    })
    .catch(error => {
      console.error('Error fetching doctors:', error);
    });

    axios.get('http://127.0.0.1:8000/api/nurses', {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem('token')}`,
      },
    })
    .then(response => {
      setNurses(response.data);
    })
    .catch(error => {
      console.error('Error fetching nurses:', error);
    });
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/appointments', {
        patient_id: user.id,
        doctor_id: doctorId,
        nurse_id: nurseId,
        appointment_date: appointmentDate,
        notes: notes,
      }, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem('token')}`,
        },
      });

      setMessage('Appointment successfully created!');
      setError('');
    } catch (error) {
      setError('Error creating appointment. Please try again.');
      setMessage('');
    }
  };

  return (
    <div className="appointment-form-container">
      <form onSubmit={handleSubmit} className="appointment-form">
        <h2>Create Appointment</h2>
        {message && <p className="success">{message}</p>}
        {error && <p className="error">{error}</p>}
        <div className="form-group">
          <label htmlFor="doctor">Doctor:</label>
          <select
            id="doctor"
            value={doctorId}
            onChange={(e) => setDoctorId(e.target.value)}
            required
          >
            <option value="">Select Doctor</option>
            {doctors.map((doctor) => (
              <option key={doctor.id} value={doctor.id}>{`Dr. ${doctor.name}`}</option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="nurse">Nurse:</label>
          <select
            id="nurse"
            value={nurseId}
            onChange={(e) => setNurseId(e.target.value)}
            required
          >
            <option value="">Select Nurse</option>
            {nurses.map((nurse) => (
              <option key={nurse.id} value={nurse.id}>{nurse.name}</option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="appointment_date">Appointment Date:</label>
          <input
            type="datetime-local"
            id="appointment_date"
            value={appointmentDate}
            onChange={(e) => setAppointmentDate(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="notes">Notes:</label>
          <textarea
            id="notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          ></textarea>
        </div>
        <button type="submit" className="submit-btn">Create Appointment</button>
      </form>
    </div>
  );
};

export default KreirajAppointment;
