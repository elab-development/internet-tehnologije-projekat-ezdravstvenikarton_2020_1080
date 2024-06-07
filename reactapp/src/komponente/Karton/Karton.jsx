import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Karton.css';

const Karton = () => {
  const [user, setUser] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [medicalRecords, setMedicalRecords] = useState([]);
  const [prescriptions, setPrescriptions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = sessionStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  useEffect(() => {
    if (user) {
      axios.get('http://127.0.0.1:8000/api/appointments/pretraga', {
        params: { patient_id: user.id },
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem('token')}`,
        },
      })
      .then(response => {
        setAppointments(response.data.data);
      })
      .catch(error => {
        console.error('Error fetching appointments:', error);
      });

      axios.get('http://127.0.0.1:8000/api/records/pretraga', {
        params: { patient_id: user.id },
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem('token')}`,
        },
      })
      .then(response => {
        setMedicalRecords(response.data.data);
      })
      .catch(error => {
        console.error('Error fetching medical records:', error);
      });

      axios.get('http://127.0.0.1:8000/api/prescriptions/pretraga', {
        params: { patient_id: user.id },
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem('token')}`,
        },
      })
      .then(response => {
        setPrescriptions(response.data.data);
      })
      .catch(error => {
        console.error('Error fetching prescriptions:', error);
      });
    }
  }, [user]);

  const handleDeleteAppointment = async (appointmentId) => {
    try {
      const token = sessionStorage.getItem('token');
      await axios.delete(`http://127.0.0.1:8000/api/appointments/${appointmentId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setAppointments(appointments.filter(appointment => appointment.id !== appointmentId));
    } catch (error) {
      console.error('Error deleting appointment:', error);
    }
  };

  const isFutureAppointment = (appointmentDate) => {
    return new Date(appointmentDate) > new Date();
  };

  if (!user) {
    return <p>Loading user data...</p>;
  }

  return (
    <div className="karton-main">
      <div className="sidebar">
        <ul>
          <li><a href="#user-details">User Details</a></li>
          <li>
            <a href="#appointments">Appointments</a>
            <ul className="sub-menu">
              <li>
                <button className='dugmeSidebar' onClick={() => navigate('/karton/kreirajAppointment')}>Create Appointment</button>
              </li>
            </ul>
          </li>
          <li><a href="#medical-records">Medical Records</a></li>
          <li><a href="#prescriptions">Prescriptions</a></li>
        </ul>
      </div>
      <div className="karton-content">
        <h2 id="user-details">User Details</h2>
        <div className="user-details">
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Role:</strong> {user.role}</p>
          <p><strong>JMBG:</strong> {user.jmbg}</p>
          <p><strong>Date of Birth:</strong> {user.date_of_birth}</p>
          <p><strong>Other:</strong> {user.other}</p>
        </div>

        <h2 id="appointments">Appointments</h2>
        {appointments.length > 0 ? (
          <table className="appointments-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Date</th>
                <th>Notes</th>
                <th>Doctor</th>
                <th>Nurse</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {appointments.map(appointment => (
                <tr key={appointment.id}>
                  <td>{appointment.id}</td>
                  <td>{appointment.appointment_date}</td>
                  <td>{appointment.notes}</td>
                  <td>{`Dr. ${appointment.doctor.name}`}</td>
                  <td>{appointment.nurse.name}</td>
                  <td>
                    {isFutureAppointment(appointment.appointment_date) && (
                      <button className='delete-btn' onClick={() => handleDeleteAppointment(appointment.id)}>Delete</button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No appointments found.</p>
        )}

        <h2 id="medical-records">Medical Records</h2>
        {medicalRecords.length > 0 ? (
          <table className="medical-records-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Date</th>
                <th>Diagnosis</th>
                <th>Doctor</th>
              </tr>
            </thead>
            <tbody>
              {medicalRecords.map(record => (
                <tr key={record.id}>
                  <td>{record.id}</td>
                  <td>{record.record_date}</td>
                  <td>{record.diagnosis}</td>
                  <td>{`Dr. ${record.doctor.name}`}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No medical records found.</p>
        )}

        <h2 id="prescriptions">Prescriptions</h2>
        {prescriptions.length > 0 ? (
          <table className="prescriptions-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Medication</th>
                <th>Doctor</th>
              </tr>
            </thead>
            <tbody>
              {prescriptions.map(prescription => (
                <tr key={prescription.id}>
                  <td>{prescription.id}</td>
                  <td>{prescription.medication}</td>
                  <td>{`Dr. ${prescription.doctor.name}`}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No prescriptions found.</p>
        )}
      </div>
    </div>
  );
};

export default Karton;