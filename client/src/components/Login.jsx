import React, { useState } from 'react';
import {Link, useNavigate } from 'react-router-dom';

const Login = () => {
  // Login component logic and UI
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    // Perform authentication logic with email and password
    // If login is successful, redirect to the booklist page
    // Otherwise, display an error message or handle accordingly

    // For example, assuming a successful login:
    //history.push('/books');
    /*<Link to="/books"><button type="submit">Login</button></Link>*/
    if (user === 'admin' && password === 'admin') {
      navigate('/admin');
    } else {
      navigate('/books');
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <label>
          Email:
          <input
            type="text"
            value={user}
            onChange={(e) => setUser(e.target.value)}
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
