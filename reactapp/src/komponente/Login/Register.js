 
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
 

const Register = () => {
    const [name, setName] = useState('John Doe');
    const [email, setEmail] = useState('john.doe@example.com');
    const [password, setPassword] = useState('password123');
    const [jmbg, setJmbg] = useState('1234567890123');
    const [dateOfBirth, setDateOfBirth] = useState('1990-01-01');
    const [other, setOther] = useState('Some additional info');
    const [role, setRole] = useState('patient');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
    let navigate=useNavigate();
  const handleRegister = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/register', {
        name, email, password, jmbg, date_of_birth: dateOfBirth, other, role
      });
      setMessage(response.data.message);
      navigate("/login");
    } catch (error) {
      setError('Registration failed. Please try again.');
    }
  };

  return (
    <div className="doctor-form-container">
      <form onSubmit={handleRegister} className="doctor-form">
        <h2>Register</h2>
        {error && <p className="error">{error}</p>}
        {message && <p className="success">{message}</p>}
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="jmbg">JMBG:</label>
          <input
            type="text"
            id="jmbg"
            name="jmbg"
            value={jmbg}
            onChange={(e) => setJmbg(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="date_of_birth">Date of Birth:</label>
          <input
            type="date"
            id="date_of_birth"
            name="date_of_birth"
            value={dateOfBirth}
            onChange={(e) => setDateOfBirth(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="other">Other Information:</label>
          <input
            type="text"
            id="other"
            name="other"
            value={other}
            onChange={(e) => setOther(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="role">Role:</label>
          <select id="role" name="role" value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="patient">Patient</option>
            <option value="doctor">Doctor</option>
            <option value="nurse">Nurse</option>
          </select>
        </div>
        <button type="submit" className="submit-btn">Register</button>
      </form>
    </div>
  );
};

export default Register;
