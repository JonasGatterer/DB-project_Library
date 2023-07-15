import React, { useState } from 'react';
//import { useHistory } from 'react-router-dom';
import {Link, useNavigate} from "react-router-dom";
import axios from 'axios';

const Register = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [middleName, setMiddleName] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [ssn, setSSN] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [streetA, setStreet] = useState('');
  const [cityA, setCity] = useState('');
  const [zipA, setZip] = useState('');
  const [country, setCountry] = useState('');
  const navigate = useNavigate();

  const handleRegistration = async (e) => {
    e.preventDefault();

    // Create the person data object
    

    try {
      // Create the person record
      //const personResponse = await axios.post('/api/persons', personData);
      const personData = {
        ssn,
        firstName,
        lastName,
        birthDate,
        email,
        phoneNumber,
        streetA,
        cityA,
        zipA,
        country,
      };

      await axios.post('http://localhost:5000/api/persons', personData);

      const accessCardID = generateAccessCardID();
      // Create the access card for the registered person
      const accessCardData = {
        accessCardID: accessCardID, // Generate a unique access card ID or use an appropriate method
        issueDate: new Date().toISOString().split('T')[0],
        expiringDate: calculateExpiringDate(), // Implement your own logic for calculating the expiring date
        fineBalance: 0,
      };

      await axios.post('http://localhost:5000/api/access-cards', accessCardData);

      const customerData = {accessCardID, ssn};
      await axios.post('http://localhost:5000/api/customer', customerData);
      

      alert(`Remember your Access Card ID: ${accessCardData.accessCardID}`);

      // Clear form fields after successful registration
      setSSN('');
      setFirstName('');
      setLastName('');
      setMiddleName('');
      setBirthDate('');
      setEmail('');
      setPhoneNumber('');
      setStreet('');
      setCity('');
      setZip('');
      setCountry('');

      // Redirect to the login page or any other appropriate page
      // You can use a router or change the logic based on your application setup
      // window.location.href = '/login';
      navigate('/books');
    } catch (error) {
      console.error('Registration failed:', error);
      // Handle the error as needed
    }
  };

  // Helper function to generate a random SSN (placeholder implementation)
  //const generateSSN = () => {
   // return Math.floor(100000000 + Math.random() * 900000000).toString();
  //};

  // Helper function to generate a random access card ID (placeholder implementation)
  const generateAccessCardID = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
  };

  // Helper function to calculate the expiring date for the access card (placeholder implementation)
  const calculateExpiringDate = () => {
    const currentDate = new Date();
    const expirationYear = currentDate.getFullYear() + 1;
    return currentDate.toISOString().split('T')[0].replace(currentDate.getFullYear().toString(), expirationYear.toString());
  };

  return (
    <div>
      <h2>Registration</h2>
      <form onSubmit={handleRegistration}>
        <label>
          First Name:
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Last Name:
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Middle Name (optional):
          <input
            type="text"
            value={middleName}
            onChange={(e) => setMiddleName(e.target.value)}
          />
        </label>
        <br />
        <label>
          Birth Date:
          <input
            type="date"
            value={birthDate}
            onChange={(e) => setBirthDate(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          SSN:
          <input
            type="text"
            value={ssn}
            onChange={(e) => setSSN(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Phone Number:
          <input
            type="text"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Street:
          <input
            type="text"
            value={streetA}
            onChange={(e) => setStreet(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          City:
          <input
            type="text"
            value={cityA}
            onChange={(e) => setCity(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          ZIP:
          <input
            type="text"
            value={zipA}
            onChange={(e) => setZip(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Country:
          <input
            type="text"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            required
          />
        </label>
        <br />
        <button type="submit">Register</button>
      </form>
      <p>
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </div>
  );
};

export default Register;
