import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { clearSession, getSession } from '../utils/cookieUtils';
import backgroundImage from './sdpimg.jpg'; // Import the background image

const dashboardStyles = {
  container: {
    display: 'flex',
    height: '100vh',
    fontFamily: "'Poppins', sans-serif",
    backgroundImage: `url(${backgroundImage})`, // Add the background image
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    overflow: 'hidden', // Prevent scrolling when sidebar is open
    color: '#4A148C', // Deep purple for text
  },
  sidebar: {
    width: '250px',
    backgroundColor: '#E6E6FA', // Light lavender background
    color: '#4A148C', // Deep purple for text
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
    boxShadow: '2px 0 5px rgba(0, 0, 0, 0.1)', // Subtle shadow
    position: 'fixed',
    top: 0,
    left: 0,
    height: '100%',
    transition: 'transform 0.3s ease-in-out',
    transform: 'translateX(-100%)', // Initially hidden
  },
  sidebarOpen: {
    transform: 'translateX(0)', // Show when open
  },
  content: {
    flex: 1,
    padding: '20px',
    marginLeft: '250px', // Shift content to the right when sidebar is open
    transition: 'margin-left 0.3s ease-in-out',
  },
  contentShifted: {
    marginLeft: 0, // Content takes full width when sidebar is closed
  },
  button: {
    color: '#fff', // White text
    backgroundColor: '#9370DB', // Light purple button
    border: 'none',
    textDecoration: 'none',
    textAlign: 'center',
    fontSize: '16px',
    cursor: 'pointer',
    padding: '12px 20px',
    width: '100%', // Full width button
    fontWeight: 'bold',
    borderRadius: '8px',
    transition: 'background-color 0.3s ease-in-out, transform 0.2s ease-in-out',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.2)', // Button shadow
    marginBottom: '10px',
  },
  buttonHover: {
    backgroundColor: '#836FFF', // Darker purple on hover
    transform: 'scale(1.05)', // Scale up on hover
  },
  menuIcon: {
    fontSize: '24px',
    color: '#4A148C',
    cursor: 'pointer',
    padding: '10px',
    backgroundColor: '#E6E6FA', // Same as sidebar background
    borderRadius: '50%',
    position: 'absolute',
    top: '15px',
    left: '15px',
    zIndex: 1000, // Ensure it's on top of other content
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.2)', // Add shadow
  },
};

const UserDashboard = () => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    // Check if the userId cookie exists on load
    const userId = getSession('userId');
    if (!userId) {
      navigate('/'); // Redirect if the cookie is missing
    }
  }, [navigate]);

  const handleLogout = () => {
    // Clear any session data (e.g., cookies, localStorage)
    sessionStorage.clear(); // Clear session storage if needed
    clearSession('userId');
    console.log('Logged out!');
    navigate('/'); // Redirect to login page
  };

  const handleViewProfile = () => {
    const userId = getSession('userId'); // Fetch userId from session or cookies
    if (userId) {
      navigate(`/users/${userId}`); // Navigate to the UserProfile route with the dynamic ID
    }
  };

  const handleViewDomain = () => {
    const userId = getSession('userId'); // Fetch userId from session or cookies
    if (userId) {
      navigate(`/view-domain`); // Navigate to the UserProfile route with the dynamic ID
    }
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div style={dashboardStyles.container}>
      <div
        style={{
          ...dashboardStyles.sidebar,
          ...(sidebarOpen ? dashboardStyles.sidebarOpen : {}),
        }}
      >
        <button
          onClick={handleViewProfile}
          style={dashboardStyles.button}
          onMouseEnter={(e) => (e.target.style.backgroundColor = dashboardStyles.buttonHover.backgroundColor)}
          onMouseLeave={(e) => (e.target.style.backgroundColor = dashboardStyles.button.backgroundColor)}
        >
          View Profile
        </button>
        <button
          style={dashboardStyles.button}
          onClick={() => navigate('/assignments')}
          onMouseEnter={(e) => (e.target.style.backgroundColor = dashboardStyles.buttonHover.backgroundColor)}
          onMouseLeave={(e) => (e.target.style.backgroundColor = dashboardStyles.button.backgroundColor)}
        >
          Counselor Assignment
        </button>
        <button
          style={dashboardStyles.button}
          onClick={() => navigate('/my-bookings')}
          onMouseEnter={(e) => (e.target.style.backgroundColor = dashboardStyles.buttonHover.backgroundColor)}
          onMouseLeave={(e) => (e.target.style.backgroundColor = dashboardStyles.button.backgroundColor)}
        >
          My Bookings
        </button>
        <button
          onClick={handleViewDomain}
          style={dashboardStyles.button}
          onMouseEnter={(e) => (e.target.style.backgroundColor = dashboardStyles.buttonHover.backgroundColor)}
          onMouseLeave={(e) => (e.target.style.backgroundColor = dashboardStyles.button.backgroundColor)}
        >
          Find a Domain!
        </button>
        <button
          onClick={handleLogout}
          style={dashboardStyles.button}
          onMouseEnter={(e) => (e.target.style.backgroundColor = dashboardStyles.buttonHover.backgroundColor)}
          onMouseLeave={(e) => (e.target.style.backgroundColor = dashboardStyles.button.backgroundColor)}
        >
          Logout
        </button>
      </div>

      <div
        style={{
          ...dashboardStyles.content,
          ...(sidebarOpen ? dashboardStyles.contentShifted : {}),
        }}
      >
        <div style={dashboardStyles.menuIcon} onClick={toggleSidebar}>
          &#9776; {/* Hamburger icon */}
        </div>
        {/* Content goes here */}
      </div>
    </div>
  );
};

export default UserDashboard;
