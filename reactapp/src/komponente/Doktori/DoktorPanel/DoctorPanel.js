import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './DoctorPanel.css'; 
import usePatients from '../../customHooks/usePatients';

const DoctorPanel = () => {
    const [appointments, setAppointments] = useState({
        today: [],
        tomorrow: [],
        dayAfterTomorrow: []
    });
    const [newPrescription, setNewPrescription] = useState({
        patient_id: '',
        doctor_id: '',
        medication: 'Test Medication',
        dosage: 'Test Dosage',
        instructions: 'Test Instructions',
        issue_date: new Date().toISOString().split('T')[0]
    });
    const [patients] = usePatients();

    useEffect(() => {
        const user = JSON.parse(sessionStorage.getItem('user'));
        const doctorId = user?.id;
        const token = sessionStorage.getItem('token');

        if (doctorId && token) {
            const fetchAppointments = async () => {
                try {
                    const today = new Date();
                    const tomorrow = new Date(today);
                    tomorrow.setDate(today.getDate() + 1);
                    const dayAfterTomorrow = new Date(today);
                    dayAfterTomorrow.setDate(today.getDate() + 2);

                    const todayStr = today.toISOString().split('T')[0];
                    const tomorrowStr = tomorrow.toISOString().split('T')[0];
                    const dayAfterTomorrowStr = dayAfterTomorrow.toISOString().split('T')[0];

                    const config = {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        },
                        params: {
                            doctor_id: doctorId,
                        }
                    };

                    const response = await axios.get('http://127.0.0.1:8000/api/appointments/pretraga', {
                        ...config,
                        params: { ...config.params, appointment_date: todayStr }
                    });

                    const tomorrowResponse = await axios.get('http://127.0.0.1:8000/api/appointments/pretraga', {
                        ...config,
                        params: { ...config.params, appointment_date: tomorrowStr }
                    });

                    const dayAfterTomorrowResponse = await axios.get('http://127.0.0.1:8000/api/appointments/pretraga', {
                        ...config,
                        params: { ...config.params, appointment_date: dayAfterTomorrowStr }
                    });

                    setAppointments({
                        today: response.data.data,
                        tomorrow: tomorrowResponse.data.data,
                        dayAfterTomorrow: dayAfterTomorrowResponse.data.data
                    });
                } catch (error) {
                    console.error('Error fetching appointments:', error);
                }
            };

            fetchAppointments();
        }
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewPrescription(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const user = JSON.parse(sessionStorage.getItem('user'));
        const token = sessionStorage.getItem('token');
        const doctorId = user?.id;

        try {
            const response = await axios.post('http://127.0.0.1:8000/api/prescriptions', 
                { ...newPrescription, doctor_id: doctorId }, 
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                }
            );
            console.log('Prescription created successfully:', response.data);
            setNewPrescription({
                patient_id: '',
                doctor_id: '',
                medication: 'Test Medication',
                dosage: 'Test Dosage',
                instructions: 'Test Instructions',
                issue_date: new Date().toISOString().split('T')[0]
            });
        } catch (error) {
            console.error('Error creating prescription:', error);
        }
    };

    return (
        <div className="doctor-panel">
            <h1>  Schedule</h1>
            <div className="schedule">
                <div className="day-schedule">
                    <h2>Today</h2>
                    {appointments.today.length === 0 ? (
                        <p>No appointments today</p>
                    ) : (
                        <ul>
                            {appointments.today.map(appointment => (
                                <li key={appointment.id}>{appointment.appointment_date}: {appointment.notes}</li>
                            ))}
                        </ul>
                    )}
                </div>
                <div className="day-schedule">
                    <h2>Tomorrow</h2>
                    {appointments.tomorrow.length === 0 ? (
                        <p>No appointments tomorrow</p>
                    ) : (
                        <ul>
                            {appointments.tomorrow.map(appointment => (
                                <li key={appointment.id}>{appointment.appointment_date}: {appointment.notes}</li>
                            ))}
                        </ul>
                    )}
                </div>
                <div className="day-schedule">
                    <h2>Day After Tomorrow</h2>
                    {appointments.dayAfterTomorrow.length === 0 ? (
                        <p>No appointments day after tomorrow</p>
                    ) : (
                        <ul>
                            {appointments.dayAfterTomorrow.map(appointment => (
                                <li key={appointment.id}>{appointment.appointment_date}: {appointment.notes}</li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
            <div className="new-prescription">
                <h2>New Prescription</h2>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Patient:</label>
                        <select 
                            name="patient_id"
                            value={newPrescription.patient_id}
                            onChange={handleInputChange}
                            required
                        >
                            <option value="">Select a patient</option>
                            {patients.map(patient => (
                                <option key={patient.id} value={patient.id}>{patient.name}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label>Medication:</label>
                        <input
                            type="text"
                            name="medication"
                            value={newPrescription.medication}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div>
                        <label>Dosage:</label>
                        <input
                            type="text"
                            name="dosage"
                            value={newPrescription.dosage}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div>
                        <label>Instructions:</label>
                        <textarea
                            name="instructions"
                            value={newPrescription.instructions}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <label>Issue Date:</label>
                        <input
                            type="date"
                            name="issue_date"
                            value={newPrescription.issue_date}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <button type="submit">Create Prescription</button>
                </form>
            </div>
        </div>
    );
};

export default DoctorPanel;
