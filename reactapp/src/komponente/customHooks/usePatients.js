import { useState, useEffect } from 'react';
import axios from 'axios';

const usePatients = () => {
    const [patients, setPatients] = useState([]);

    useEffect(() => {
        const fetchPatients = async () => {
            const token = sessionStorage.getItem('token');
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/patients', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                setPatients(response.data);
            } catch (error) {
                console.error('Error fetching patients:', error);
            }
        };

        fetchPatients();
    }, []);

    return [patients, setPatients];
};

export default usePatients;
