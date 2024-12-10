import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { clearSession, getSession } from '../utils/cookieUtils';
import backgroundImage from './sdpimg.jpg'

const dashboardStyles = {
  container: {
    display: 'flex',
    height: '100vh',
    fontFamily: "'Poppins', sans-serif",
    overflow: 'hidden', // Prevent scrolling when sidebar is open
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: 'cover', // Ensure the image covers the entire container
    backgroundPosition: 'center', // Center the image
    backgroundRepeat: 'no-repeat', // Prevent tiling
  },
  sidebar: {
    width: '250px',
    backgroundColor: '#6a1b9a', // Purple color for the sidebar
    color: '#fff', // White text for better visibility
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
    color: '#fff', // White text for better visibility
  },
  contentShifted: {
    marginLeft: 0, // Content takes full width when sidebar is closed
  },
  button: {
    color: '#fff',
    backgroundColor: '#9c27b0', // Purple button
    border: 'none',
    textDecoration: 'none',
    textAlign: 'center',
    fontSize: '16px',
    cursor: 'pointer',
    padding: '12px 20px',
    width: '100%',
    fontWeight: 'bold',
    transition: 'background-color 0.3s ease-in-out, transform 0.2s ease-in-out',
    boxShadow: '0 4px 6px rgba(156, 39, 176, 0.3)', // Button shadow
    marginBottom: '10px',
  },
  buttonHover: {
    backgroundColor: '#7b1fa2', // Darker purple on hover
    transform: 'scale(1.05)', // Scale up on hover
  },
  menuIcon: {
    fontSize: '24px', // Reduced size for better fit
    color: '#fff',
    cursor: 'pointer',
    padding: '10px',
    backgroundColor: '#9c27b0',
    borderRadius: '50%',
    position: 'absolute',
    top: '15px',
    left: '15px',
    zIndex: 1000, // Make sure it's on top of other content
  },
};

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    // Check if the admin session exists
    const adminUsername = getSession('adminusername');
    if (!adminUsername) {
      navigate('/'); // Redirect to login if no session
    }
  }, [navigate]);

  const handleLogout = () => {
    clearSession('adminusername');
    console.log('Logged out successfully!');
    navigate('/'); // Redirect to login
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div style={dashboardStyles.container}>
      {/* Sidebar */}
      <div
        style={{
          ...dashboardStyles.sidebar,
          ...(sidebarOpen ? dashboardStyles.sidebarOpen : {}),
        }}
      >
        <button
          style={dashboardStyles.button}
          onClick={() => navigate('/add-program')}
          onMouseEnter={(e) => (e.target.style.backgroundColor = dashboardStyles.buttonHover.backgroundColor)}
          onMouseLeave={(e) => (e.target.style.backgroundColor = dashboardStyles.button.backgroundColor)}
        >
          Add Program
        </button>
        <button
          style={dashboardStyles.button}
          onClick={() => navigate('/add-branch')}
          onMouseEnter={(e) => (e.target.style.backgroundColor = dashboardStyles.buttonHover.backgroundColor)}
          onMouseLeave={(e) => (e.target.style.backgroundColor = dashboardStyles.button.backgroundColor)}
        >
          Add Branch
        </button>
        <button
          style={dashboardStyles.button}
          onClick={() => navigate('/add-domain')}
          onMouseEnter={(e) => (e.target.style.backgroundColor = dashboardStyles.buttonHover.backgroundColor)}
          onMouseLeave={(e) => (e.target.style.backgroundColor = dashboardStyles.button.backgroundColor)}
        >
          Add Domain
        </button>
        <button
          style={dashboardStyles.button}
          onClick={() => navigate('/view-domain')}
          onMouseEnter={(e) => (e.target.style.backgroundColor = dashboardStyles.buttonHover.backgroundColor)}
          onMouseLeave={(e) => (e.target.style.backgroundColor = dashboardStyles.button.backgroundColor)}
        >
          View Domain
        </button>
        <button
          style={dashboardStyles.button}
          onClick={() => navigate('/viewcounselor')}
          onMouseEnter={(e) => (e.target.style.backgroundColor = dashboardStyles.buttonHover.backgroundColor)}
          onMouseLeave={(e) => (e.target.style.backgroundColor = dashboardStyles.button.backgroundColor)}
        >
          View Counselor
        </button>
        <button
          style={dashboardStyles.button}
          onClick={() => navigate('/upload')}
          onMouseEnter={(e) => (e.target.style.backgroundColor = dashboardStyles.buttonHover.backgroundColor)}
          onMouseLeave={(e) => (e.target.style.backgroundColor = dashboardStyles.button.backgroundColor)}
        >
          Add Counselor
        </button>
        <button
          style={dashboardStyles.button}
          onClick={() => navigate('/assigncounselor')}
          onMouseEnter={(e) => (e.target.style.backgroundColor = dashboardStyles.buttonHover.backgroundColor)}
          onMouseLeave={(e) => (e.target.style.backgroundColor = dashboardStyles.button.backgroundColor)}
        >
          Map Counselor
        </button>
        <button
          style={dashboardStyles.button}
          onClick={handleLogout}
          onMouseEnter={(e) => (e.target.style.backgroundColor = dashboardStyles.buttonHover.backgroundColor)}
          onMouseLeave={(e) => (e.target.style.backgroundColor = dashboardStyles.button.backgroundColor)}
        >
          Logout
        </button>
      </div>

      {/* Main Content */}
      <div
        style={{
          ...dashboardStyles.content,
          ...(sidebarOpen ? dashboardStyles.contentShifted : {}),
        }}
      >
        <div style={dashboardStyles.menuIcon} onClick={toggleSidebar}>
          &#9776; {/* Hamburger icon */}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
