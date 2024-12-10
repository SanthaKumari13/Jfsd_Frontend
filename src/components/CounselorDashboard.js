import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { clearSession } from '../utils/cookieUtils';
import sdpImg from './sdpimg.jpg'; // Import the image from src/assets/images

const dashboardStyles = {
  container: {
    display: 'flex',
    height: '100vh',
    fontFamily: "'Poppins', sans-serif",
    overflow: 'hidden',
    backgroundImage: `url(${sdpImg})`, // Use the imported image
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  sidebar: {
    width: '250px',
    backgroundColor: '#e0f7fa', // Light cyan for counselor
    color: '#006064', // Dark cyan for text
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
    boxShadow: '2px 0 5px rgba(0, 0, 0, 0.1)',
    position: 'fixed',
    top: 0,
    left: 0,
    height: '100%',
    transition: 'transform 0.3s ease-in-out',
    transform: 'translateX(-100%)',
  },
  sidebarOpen: {
    transform: 'translateX(0)',
  },
  content: {
    flex: 1,
    padding: '20px',
    marginLeft: '250px',
    transition: 'margin-left 0.3s ease-in-out',
  },
  contentShifted: {
    marginLeft: 0,
  },
  button: {
    color: '#fff',
    backgroundColor: '#00838f', // Darker cyan button
    border: 'none',
    textDecoration: 'none',
    textAlign: 'center',
    fontSize: '16px',
    cursor: 'pointer',
    padding: '12px 20px',
    width: '100%',
    fontWeight: 'bold',
    transition: 'background-color 0.3s ease-in-out, transform 0.2s ease-in-out',
    boxShadow: '0 4px 6px rgba(0, 131, 143, 0.3)',
    marginBottom: '10px',
  },
  buttonHover: {
    backgroundColor: '#005662', // Even darker cyan on hover
    transform: 'scale(1.05)',
  },
  menuIcon: {
    fontSize: '24px',
    color: '#006064',
    cursor: 'pointer',
    padding: '10px',
    backgroundColor: '#e0f7fa',
    borderRadius: '50%',
    position: 'absolute',
    top: '15px',
    left: '15px',
    zIndex: 1000,
  },
};

const CounselorDashboard = () => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    clearSession('counselorId'); // Clear the counselor session on logout
    navigate('/'); // Redirect to login page
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
          onClick={() => navigate('/counselorprofile')}
          onMouseEnter={(e) =>
            (e.target.style.backgroundColor = dashboardStyles.buttonHover.backgroundColor)
          }
          onMouseLeave={(e) =>
            (e.target.style.backgroundColor = dashboardStyles.button.backgroundColor)
          }
        >
          View Profile
        </button>
        <button
          style={dashboardStyles.button}
          onClick={() => navigate('/counselor-chat')}
          onMouseEnter={(e) =>
            (e.target.style.backgroundColor = dashboardStyles.buttonHover.backgroundColor)
          }
          onMouseLeave={(e) =>
            (e.target.style.backgroundColor = dashboardStyles.button.backgroundColor)
          }
        >
          View chat
        </button>
        <button
          style={dashboardStyles.button}
          onClick={handleLogout}
          onMouseEnter={(e) =>
            (e.target.style.backgroundColor = dashboardStyles.buttonHover.backgroundColor)
          }
          onMouseLeave={(e) =>
            (e.target.style.backgroundColor = dashboardStyles.button.backgroundColor)
          }
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
        <h1>Welcome, Counselor!</h1>
      </div>
    </div>
  );
};

export default CounselorDashboard;
