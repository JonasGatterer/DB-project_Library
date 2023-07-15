import React, { useState } from 'react';
import {Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const [ssn, setSSN] = useState('');
  const [accessCardID, setAccessCardID] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    // Perform authentication logic with email and password
    // If login is successful, redirect to the booklist page
    // Otherwise, display an error message or handle accordingly

    // For example, assuming a successful login:
    //history.push('/books');
    /*<Link to="/books"><button type="submit">Login</button></Link>*/
    if (ssn === 'admin' && accessCardID === 'admin') {
      navigate('/admin');
    } else {
      try {
        // Make a POST request to the login endpoint with SSN and access card ID
        //const response = await axios.post('/api/login', {ssn,accessCardID});
        await axios.post('http://localhost:5000/api/login', {ssn,accessCardID});
  
        // Assuming login is successful, redirect the user to the appropriate page
        navigate('/books');
      } catch (error) {
        console.error('Login failed:', error);
        // Handle the error as needed
      }
      //navigate('/books');
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
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
          Access Card ID:
          <input
            type="text"
            value={accessCardID}
            onChange={(e) => setAccessCardID(e.target.value)}
            required
          />
        </label>
        <br />
        <button type="submit">Login</button>
      </form>

      <p>Not registered yet?</p>
      <Link to="/register"><button>
              Register 
            </button>
      </Link>
    </div>
  );
};

export default Login;
