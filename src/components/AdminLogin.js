import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { adminLogin } from '../services/api';
import { setSession } from '../utils/cookieUtils';
import {
  Container,
  TextField,
  Button,
  Typography,
  Alert,
  InputAdornment,
  Box,
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import LockIcon from '@mui/icons-material/Lock';
import backgroundImage from './sdpimg.jpg'; // Import your background image

const AdminLogin = () => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      await adminLogin(credentials.username, credentials.password);
      setSession('adminusername', credentials.username, 30);
      navigate('/admindashboard');
    } catch (error) {
      setError(error.message || 'Login failed. Please try again.');
    }
  };

  return (
    <Box
      sx={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontFamily: "'Poppins', sans-serif",
      }}
    >
      <Container
        maxWidth="xs"
        sx={{
          padding: '30px',
          borderRadius: '20px',
          backgroundColor: 'rgba(245, 240, 255, 0.9)', // Light purple background for the form
          boxShadow: '0 6px 12px rgba(0, 0, 0, 0.1)',
          backdropFilter: 'blur(8px)',
        }}
      >
        <Box textAlign="center" mb={2}>
          <Typography
            variant="h5"
            sx={{
              fontWeight: 'bold',
              color: '#6a0dad', // Dark purple text
              fontFamily: 'Cursive, Poppins, sans-serif',
            }}
          >
            Admin Login
          </Typography>
        </Box>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            variant="outlined"
            label="Username"
            name="username"
            value={credentials.username}
            onChange={handleChange}
            required
            margin="normal"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PersonIcon style={{ color: '#7a1fa2' }} /> {/* Medium purple icon */}
                </InputAdornment>
              ),
            }}
            sx={{
              backgroundColor: '#faf5ff', // Very light purple input background
              borderRadius: '8px',
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: '#b39ddb', // Soft purple border
                },
                '&:hover fieldset': {
                  borderColor: '#7a1fa2', // Medium purple on hover
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#6a0dad', // Dark purple on focus
                },
              },
            }}
          />
          <TextField
            fullWidth
            variant="outlined"
            label="Password"
            name="password"
            type="password"
            value={credentials.password}
            onChange={handleChange}
            required
            margin="normal"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockIcon style={{ color: '#7a1fa2' }} /> {/* Medium purple icon */}
                </InputAdornment>
              ),
            }}
            sx={{
              backgroundColor: '#faf5ff', // Very light purple input background
              borderRadius: '8px',
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: '#b39ddb', // Soft purple border
                },
                '&:hover fieldset': {
                  borderColor: '#7a1fa2', // Medium purple on hover
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#6a0dad', // Dark purple on focus
                },
              },
            }}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              backgroundColor: '#7a1fa2', // Medium purple button
              color: '#fff',
              marginTop: '20px',
              padding: '12px 0',
              borderRadius: '20px',
              fontSize: '16px',
              fontWeight: 'bold',
              boxShadow: '0 4px 8px rgba(122, 31, 162, 0.4)', // Purple shadow
              transition: 'transform 0.2s ease-in-out',
              '&:hover': {
                backgroundColor: '#6a0dad', // Dark purple on hover
                transform: 'scale(1.05)',
              },
            }}
          >
            Login
          </Button>
        </form>
        {error && (
          <Alert
            severity="error"
            sx={{
              marginTop: '20px',
              backgroundColor: '#ffebee', // Light red for error alert
              color: '#d32f2f',
            }}
          >
            {error}
          </Alert>
        )}
        <Box textAlign="center" mt={3}>
          <Typography
            variant="body2"
            sx={{
              color: '#9e9e9e',
              fontSize: '14px',
              fontFamily: "'Poppins', sans-serif",
            }}
          >
            © 2024 CareerGuidence | All rights reserved
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default AdminLogin;
