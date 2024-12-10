import React, { useState, useEffect } from 'react';
import { getSession } from '../utils/cookieUtils';
import { getUserById } from '../services/api';

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');
  const userId = getSession('userId'); // Retrieve the userId from cookies

  useEffect(() => {
    const fetchUser = async () => {
      if (!userId) {
        setError('User ID is missing. Please log in.');
        return;
      }
      try {
        const data = await getUserById(userId);
        setUser(data);
      } catch (err) {
        setError(err.message || 'Failed to fetch user data.');
      }
    };

    fetchUser();
  }, [userId]);

  const styles = {
    container: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #6a1b9a, #9c27b0, #ba68c8)', // Gradient with purple shades
      padding: '20px',
    },
    userProfile: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      backgroundColor: '#fff8f2', // Soft background for the profile card
      padding: '2rem',
      borderRadius: '12px', // Soft rounded corners
      boxShadow: '0 8px 24px rgba(0, 0, 0, 0.12)', // Soft shadow for depth
      width: '90%',
      maxWidth: '600px',
      textAlign: 'center',
    },
    heading: {
      fontSize: '2.5rem',
      fontFamily: "'Playfair Display', serif", // Elegant serif font for headings
      color: '#6a1b9a', // Deep purple for the heading
      marginBottom: '1rem',
    },
    paragraph: {
      fontSize: '1.1rem',
      color: '#555',
      margin: '0.8rem 0',
      lineHeight: '1.7',
      fontFamily: "'Poppins', sans-serif", // Clean sans-serif for body text
    },
    profileImage: {
      width: '160px',
      height: '160px',
      borderRadius: '50%',
      objectFit: 'cover',
      marginBottom: '1.5rem',
      border: '6px solid #ba68c8', // Purple border
      boxShadow: '0 6px 18px rgba(0, 0, 0, 0.1)', // Soft shadow to make it pop
    },
    errorMessage: {
      color: '#ff4d4d',
      fontSize: '1.2rem',
      textAlign: 'center',
      padding: '1rem',
      borderRadius: '8px',
      backgroundColor: 'rgba(255, 77, 77, 0.1)',
      border: '1px solid #ff4d4d',
      marginBottom: '1.5rem',
    },
    loading: {
      color: '#fff',
      fontSize: '1.2rem',
      textAlign: 'center',
      marginTop: '2rem',
    },
    button: {
      backgroundColor: '#9c27b0', // Purple button
      color: '#fff',
      padding: '12px 20px',
      borderRadius: '8px',
      border: 'none',
      fontSize: '1.1rem',
      cursor: 'pointer',
      fontWeight: 'bold',
      transition: 'background-color 0.3s ease',
      marginTop: '20px',
    },
    buttonHover: {
      backgroundColor: '#6a1b9a', // Darker purple on hover
    },
  };

  if (error) {
    return <div style={{ ...styles.container, color: '#fff' }}>{error}</div>;
  }

  if (!user) {
    return <div style={styles.container}>
      <div style={styles.loading}>Loading...</div>
    </div>;
  }

  return (
    <div style={styles.container}>
      <div style={styles.userProfile}>
        <h2 style={styles.heading}>User Profile</h2>
        <div>
          <img
            src={user.profilePicture || 'https://via.placeholder.com/150'}
            alt="Profile"
            style={styles.profileImage}
          />
        </div>
        <p style={styles.paragraph}><strong>ID:</strong> {user.id}</p>
        <p style={styles.paragraph}><strong>Name:</strong> {user.username || user.name}</p>
        <p style={styles.paragraph}><strong>Email:</strong> {user.email}</p>
        <button
          style={styles.button}
          onMouseEnter={(e) => (e.target.style.backgroundColor = styles.buttonHover.backgroundColor)}
          onMouseLeave={(e) => (e.target.style.backgroundColor = styles.button.backgroundColor)}
        >
          Edit Profile
        </button>
      </div>
    </div>
  );
};

export default UserProfile;
