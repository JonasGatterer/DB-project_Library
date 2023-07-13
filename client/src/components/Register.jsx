import React, { useState } from 'react';
//import { useHistory } from 'react-router-dom';
import {Link } from "react-router-dom";

const Register = () => {
  // Register component logic and UI
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  //const history = useHistory();

  const handleRegistration = () => {
    // Perform registration logic with email and password
    // If registration is successful, redirect to the booklist page
    // Otherwise, display an error message or handle accordingly

    // For example, assuming a successful registration:
    //history.push('/books');
  };

  return (
    <div>
      <h2>Registration</h2>
      <form onSubmit={handleRegistration}>
        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <br />
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <br />
        <Link to="/books"><button type="submit">Register</button></Link>
      </form>
    </div>
  );
};

export default Register;
