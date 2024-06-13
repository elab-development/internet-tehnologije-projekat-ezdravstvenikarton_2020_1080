import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './DoctorPanel.css';

const DoctorPanel = () => {
    const [appointments, setAppointments] = useState({
        today: [],
        tomorrow: [],
        dayAfterTomorrow: []
    });

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

    return (
        <div className="doctor-panel">
            <h1>Doctor's Schedule</h1>
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
        </div>
    );
};

export default DoctorPanel;
