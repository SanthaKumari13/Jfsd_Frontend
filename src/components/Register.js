import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../services/api';
import {
  Avatar,
  Button,
  TextField,
  Typography,
  Box,
  InputAdornment,
  CircularProgress,
} from '@mui/material';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import EmailIcon from '@mui/icons-material/Email';
import PersonIcon from '@mui/icons-material/Person';
import LockIcon from '@mui/icons-material/Lock';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import backgroundImage from './sdpimg.jpg'; // Import the background image

const Register = () => {
  const [formData, setFormData] = useState({
    profileImage: null,
    email: '',
    username: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, profileImage: file });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    if (!formData.email || !formData.username || !formData.password || !formData.profileImage) {
      setError('All fields are required');
      setLoading(false);
      return;
    }

    const data = new FormData();
    data.append('profilePicture', formData.profileImage);
    data.append('email', formData.email);
    data.append('username', formData.username);
    data.append('password', formData.password);

    try {
      await registerUser(data);
      setSuccess('Registration successful! Redirecting...');
      setTimeout(() => {
        navigate('/verify');
      }, 2000);
    } catch (error) {
      setError(error?.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        fontFamily: "'Poppins', sans-serif",
        backgroundImage: `url(${backgroundImage})`, // Set the background image for the entire page
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        minHeight: '100vh', // Full viewport height
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Box
        sx={{
          backgroundColor: 'rgba(245, 240, 255, 0.95)', // Light purple semi-transparent background
          p: 4,
          borderRadius: 3,
          boxShadow: '0 4px 10px rgba(122, 31, 162, 0.4)', // Purple shadow
          maxWidth: 400,
          width: '100%',
          textAlign: 'center',
        }}
      >
        <Typography variant="h4" color="#6a0dad" gutterBottom>
          Register
        </Typography>
        <form onSubmit={handleSubmit}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <Box>
              <Avatar
                sx={{
                  width: 80,
                  height: 80,
                  mx: 'auto',
                  bgcolor: '#7a1fa2', // Medium purple background for the avatar
                  cursor: 'pointer',
                  mb: 1,
                }}
                onClick={() => document.getElementById('profileImageInput').click()}
              >
                {formData.profileImage ? (
                  <img
                    src={URL.createObjectURL(formData.profileImage)}
                    alt="Profile Preview"
                    style={{ width: '100%', height: '100%', borderRadius: '50%' }}
                  />
                ) : (
                  <AddPhotoAlternateIcon fontSize="large" sx={{ color: '#faf5ff' }} /> // Light purple icon
                )}
              </Avatar>
              <input
                id="profileImageInput"
                type="file"
                style={{ display: 'none' }}
                onChange={handleFileChange}
                accept="image/*"
              />
              <Typography variant="caption" color="text.secondary">
                Click avatar to upload an image
              </Typography>
            </Box>

            <TextField
              label="Email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              fullWidth
              required
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <EmailIcon style={{ color: '#7a1fa2' }} /> {/* Purple icon */}
                  </InputAdornment>
                ),
              }}
              sx={{
                backgroundColor: '#faf5ff', // Very light purple background
                borderRadius: 1,
              }}
            />
            <TextField
              label="Username"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              fullWidth
              required
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PersonIcon style={{ color: '#7a1fa2' }} /> {/* Purple icon */}
                  </InputAdornment>
                ),
              }}
              sx={{
                backgroundColor: '#faf5ff', // Very light purple background
                borderRadius: 1,
              }}
            />
            <TextField
              label="Password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleInputChange}
              fullWidth
              required
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockIcon style={{ color: '#7a1fa2' }} /> {/* Purple icon */}
                  </InputAdornment>
                ),
              }}
              sx={{
                backgroundColor: '#faf5ff', // Very light purple background
                borderRadius: 1,
              }}
            />
            <Button
              type="submit"
              variant="contained"
              startIcon={loading ? <CircularProgress size={20} /> : <HowToRegIcon />}
              disabled={loading}
              sx={{
                bgcolor: '#7a1fa2', // Medium purple button
                color: '#fff',
                '&:hover': { bgcolor: '#6a0dad' }, // Dark purple on hover
                boxShadow: '0 4px 8px rgba(122, 31, 162, 0.4)', // Purple shadow
              }}
              fullWidth
            >
              {loading ? 'Registering...' : 'Register'}
            </Button>
          </Box>
        </form>

        {success && (
          <Typography variant="body2" color="success.main" sx={{ mt: 2 }}>
            {success}
          </Typography>
        )}
        {error && (
          <Typography variant="body2" color="error.main" sx={{ mt: 2 }}>
            {error}
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default Register;
