import React, { useEffect, useState } from 'react';
import { fetchCounselorById } from '../services/api';
import { getSession, clearSession } from '../utils/cookieUtils';
import { Box, Button, Typography, CircularProgress } from '@mui/material';

const CounselorProfile = () => {
  const [counselor, setCounselor] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCounselorProfile = async () => {
      const counselorId = getSession('counselorId');
      if (!counselorId) {
        alert('Session expired. Please log in again.');
        window.location.href = '/';
        return;
      }

      try {
        const counselorData = await fetchCounselorById(counselorId);
        setCounselor(counselorData);
      } catch (error) {
        setErrorMessage(error.message);
      } finally {
        setLoading(false);
      }
    };

    loadCounselorProfile();
  }, []);

  const handleLogout = () => {
    clearSession('counselorId');
    alert('Logged out successfully.');
    window.location.href = '/';
  };

  if (loading) {
    return (
      <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
        <CircularProgress sx={{ color: '#3498db' }} />
      </Box>
    );
  }

  if (!counselor) {
    return (
      <Box sx={{ padding: 3, textAlign: 'center', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
        {errorMessage ? <Typography sx={{ color: '#e74c3c' }}>{errorMessage}</Typography> : <Typography>Loading profile...</Typography>}
      </Box>
    );
  }

  return (
    <Box
      sx={{
        maxWidth: 600,
        margin: '0 auto',
        padding: 4,
        backgroundColor: '#fff',
        borderRadius: 4,
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
        fontFamily: 'Arial, sans-serif',
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '100%',
        maxHeight: '80vh',
        overflowY: 'auto',
      }}
    >
      <Typography variant="h4" sx={{ textAlign: 'center', marginBottom: 2 }}>
        Welcome, {counselor.name}
      </Typography>
      <Typography variant="body1" sx={{ marginBottom: 1 }}>
        <strong>Email:</strong> {counselor.email}
      </Typography>
      <Typography variant="body1" sx={{ marginBottom: 1 }}>
        <strong>Phone:</strong> {counselor.phoneNumber}
      </Typography>
      <Typography variant="body1" sx={{ marginBottom: 1 }}>
        <strong>Qualification:</strong> {counselor.qualification}
      </Typography>
      <Typography variant="body1" sx={{ marginBottom: 2 }}>
        <strong>LinkedIn:</strong> {counselor.links}
      </Typography>

      <Button
        variant="contained"
        color="primary"
        fullWidth
        sx={{
          padding: '12px',
          fontSize: '16px',
          fontWeight: 'bold',
          borderRadius: 3,
          backgroundColor: '#3498db',
          '&:hover': {
            backgroundColor: '#2980b9',
          },
        }}
        onClick={handleLogout}
      >
        Logout
      </Button>
    </Box>
  );
};

export default CounselorProfile;
