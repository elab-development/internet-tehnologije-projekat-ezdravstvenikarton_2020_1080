import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import Chart from 'chart.js/auto';
import './Statistics.css';

const Statistics = () => {
    const [stats, setStats] = useState(null);
    const chartRefs = {
        appointmentsByDoctor: useRef(null),
        appointmentsByMonth: useRef(null),
        medicalRecordsByDoctor: useRef(null),
        prescriptionsByDoctor: useRef(null),
        appointmentsByPatient: useRef(null),
        prescriptionsByPatient: useRef(null),
        medicalRecordsByPatient: useRef(null),
        appointmentsByNurse: useRef(null)
    };
    const chartInstances = {
        appointmentsByDoctor: useRef(null),
        appointmentsByMonth: useRef(null),
        medicalRecordsByDoctor: useRef(null),
        prescriptionsByDoctor: useRef(null),
        appointmentsByPatient: useRef(null),
        prescriptionsByPatient: useRef(null),
        medicalRecordsByPatient: useRef(null),
        appointmentsByNurse: useRef(null)
    };

    useEffect(() => {
        const token = sessionStorage.getItem('token');

        axios.get('http://127.0.0.1:8000/api/statistics/all', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(response => {
                setStats(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the statistics!', error);
            });
    }, []);

    useEffect(() => {
        if (stats) {
            const chartData = {
                appointmentsByDoctor: {
                    labels: stats.appointmentsByDoctor.map(stat => stat.doctor.name),
                    datasets: [{
                        label: 'Appointments by Doctor',
                        data: stats.appointmentsByDoctor.map(stat => stat.total),
                        backgroundColor: '#ED6A5A',
                        borderColor: '#ED6A5A',
                        borderWidth: 1
                    }]
                },
                appointmentsByMonth: {
                    labels: stats.appointmentsByMonth.map(stat => `${stat.year}-${stat.month}`),
                    datasets: [{
                        label: 'Appointments by Month',
                        data: stats.appointmentsByMonth.map(stat => stat.total),
                        backgroundColor: '#9BC1BC',
                        borderColor: '#9BC1BC',
                        borderWidth: 1
                    }]
                },
                medicalRecordsByDoctor: {
                    labels: stats.medicalRecordsByDoctor.map(stat => stat.doctor.name),
                    datasets: [{
                        label: 'Medical Records by Doctor',
                        data: stats.medicalRecordsByDoctor.map(stat => stat.total),
                        backgroundColor: '#5D576B',
                        borderColor: '#5D576B',
                        borderWidth: 1
                    }]
                },
                prescriptionsByDoctor: {
                    labels: stats.prescriptionsByDoctor.map(stat => stat.doctor.name),
                    datasets: [{
                        label: 'Prescriptions by Doctor',
                        data: stats.prescriptionsByDoctor.map(stat => stat.total),
                        backgroundColor: '#F4F1BB',
                        borderColor: '#F4F1BB',
                        borderWidth: 1
                    }]
                },
                appointmentsByPatient: {
                    labels: stats.appointmentsByPatient.map(stat => stat.patient.name),
                    datasets: [{
                        label: 'Appointments by Patient',
                        data: stats.appointmentsByPatient.map(stat => stat.total),
                        backgroundColor: '#ED6A5A',
                        borderColor: '#ED6A5A',
                        borderWidth: 1
                    }]
                },
                prescriptionsByPatient: {
                    labels: stats.prescriptionsByPatient.map(stat => stat.patient.name),
                    datasets: [{
                        label: 'Prescriptions by Patient',
                        data: stats.prescriptionsByPatient.map(stat => stat.total),
                        backgroundColor: '#9BC1BC',
                        borderColor: '#9BC1BC',
                        borderWidth: 1
                    }]
                },
                medicalRecordsByPatient: {
                    labels: stats.medicalRecordsByPatient.map(stat => stat.patient.name),
                    datasets: [{
                        label: 'Medical Records by Patient',
                        data: stats.medicalRecordsByPatient.map(stat => stat.total),
                        backgroundColor: '#5D576B',
                        borderColor: '#5D576B',
                        borderWidth: 1
                    }]
                },
                appointmentsByNurse: {
                    labels: stats.appointmentsByNurse.map(stat => stat.nurse.name),
                    datasets: [{
                        label: 'Appointments by Nurse',
                        data: stats.appointmentsByNurse.map(stat => stat.total),
                        backgroundColor: '#F4F1BB',
                        borderColor: '#F4F1BB',
                        borderWidth: 1
                    }]
                }
            };

            Object.keys(chartRefs).forEach(chartKey => {
                const ref = chartRefs[chartKey].current;
                if (ref) {
                    if (chartInstances[chartKey].current) {
                        chartInstances[chartKey].current.destroy();
                    }
                    const ctx = ref.getContext('2d');
                    chartInstances[chartKey].current = new Chart(ctx, {
                        type: 'bar',
                        data: chartData[chartKey],
                        options: {
                            responsive: true,
                            maintainAspectRatio: false
                        }
                    });
                }
            });
        }
    }, [stats]);

    if (!stats) {
        return <div>Loading...</div>;
    }

    return (
        <div className="statistics-page">
            <h1>Statistics</h1>
            <div className="chart-container">
                <canvas id="appointmentsByDoctorChart" ref={chartRefs.appointmentsByDoctor}></canvas>
            </div>
            <div className="chart-container">
                <canvas id="appointmentsByMonthChart" ref={chartRefs.appointmentsByMonth}></canvas>
            </div>
            <div className="chart-container">
                <canvas id="medicalRecordsByDoctorChart" ref={chartRefs.medicalRecordsByDoctor}></canvas>
            </div>
            <div className="chart-container">
                <canvas id="prescriptionsByDoctorChart" ref={chartRefs.prescriptionsByDoctor}></canvas>
            </div>
            <div className="chart-container">
                <canvas id="appointmentsByPatientChart" ref={chartRefs.appointmentsByPatient}></canvas>
            </div>
            <div className="chart-container">
                <canvas id="prescriptionsByPatientChart" ref={chartRefs.prescriptionsByPatient}></canvas>
            </div>
            <div className="chart-container">
                <canvas id="medicalRecordsByPatientChart" ref={chartRefs.medicalRecordsByPatient}></canvas>
            </div>
            <div className="chart-container">
                <canvas id="appointmentsByNurseChart" ref={chartRefs.appointmentsByNurse}></canvas>
            </div> 
        </div>
    );
};

export default Statistics;
