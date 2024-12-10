import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../services/api';
import { setSession } from '../utils/cookieUtils';
import { TextField, InputAdornment } from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import backgroundImage from './sdpimg.jpg'; // Import the background image

const Login = () => {
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const response = await loginUser(credentials);
      const userId = response.userId;

      if (userId) {
        setSession('userId', userId, 30);
      }
      setSuccess('Login successful!');
      console.log('Login Response:', response);
      navigate('/dashboard');
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || 'Login failed. Please try again.';
      setError(errorMessage);
      console.error('Login Error:', error);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Welcome Back!</h2>
        <form onSubmit={handleSubmit} style={styles.form}>
          <TextField
            fullWidth
            label="Email"
            type="email"
            name="email"
            value={credentials.email}
            onChange={handleChange}
            required
            variant="outlined"
            margin="normal"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <EmailIcon style={{ color: '#7a1fa2' }} /> {/* Medium purple icon */}
                </InputAdornment>
              ),
            }}
            style={{
              backgroundColor: '#faf5ff', // Very light purple input background
              borderRadius: '8px',
            }}
          />
          <TextField
            fullWidth
            label="Password"
            type="password"
            name="password"
            value={credentials.password}
            onChange={handleChange}
            required
            variant="outlined"
            margin="normal"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockIcon style={{ color: '#7a1fa2' }} /> {/* Medium purple icon */}
                </InputAdornment>
              ),
            }}
            style={{
              backgroundColor: '#faf5ff', // Very light purple input background
              borderRadius: '8px',
            }}
          />
          <button type="submit" style={styles.button}>
            Login
          </button>
        </form>
        {success && <p style={{ ...styles.message, ...styles.success }}>{success}</p>}
        {error && <p style={{ ...styles.message, ...styles.error }}>{error}</p>}
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundImage: `url(${backgroundImage})`, // Use the imported image here
    backgroundSize: 'cover', // Ensure the image covers the entire area
    backgroundRepeat: 'no-repeat', // Prevent repeating the image
    backgroundPosition: 'center', // Center the image
    fontFamily: '"Poppins", sans-serif',
  },
  card: {
    background: 'rgba(245, 240, 255, 0.9)', // Light purple card background
    padding: '2rem',
    borderRadius: '15px',
    boxShadow: '0 4px 10px rgba(122, 31, 162, 0.4)', // Purple shadow
    width: '400px',
    textAlign: 'center',
  },
  title: {
    marginBottom: '1.5rem',
    color: '#6a0dad', // Dark purple text
    fontSize: '1.8rem',
    fontWeight: '600',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.2rem',
  },
  button: {
    padding: '0.8rem',
    background: '#7a1fa2', // Medium purple button
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    fontSize: '1rem',
    cursor: 'pointer',
    transition: 'background 0.3s ease',
    boxShadow: '0 4px 8px rgba(122, 31, 162, 0.4)', // Purple shadow for button
    '&:hover': {
      backgroundColor: '#6a0dad', // Dark purple on hover
    },
  },
  message: {
    marginTop: '1rem',
    fontSize: '1rem',
  },
  success: {
    color: 'green',
  },
  error: {
    color: 'red',
  },
};

export default Login;
