import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../avatars/asplogo.png'; // Import the logo
import background from './sdpimg.jpg'; // Import the background image

const Home = () => {
  return (
    <div style={pageStyle}>
      <nav style={navStyle}>
        <div style={logoContainer}>
          <img src={logo} alt="Aspire Path Logo" style={logoStyle} />
        </div>
        <div style={navLinksContainer}>
          <Link to="/login" style={navLinkStyle}>Login</Link>
          <Link to="/register" style={navLinkStyle}>Register</Link>
          <Link to="/adminlogin" style={navLinkStyle}>Admin Login</Link>
          <Link to="/counselorlogin" style={navLinkStyle}>Counselor Login</Link>
        </div>
      </nav>
      <div style={heroSection}>
        <h1 style={headingStyle}>𝓦𝓮𝓵𝓬𝓸𝓶𝓮 𝓽𝓸 𝓐𝓼𝓹𝓲𝓻𝓮 𝓟𝓪𝓽𝓱</h1>
      </div>
    </div>
  );
};

const pageStyle = {
  backgroundImage: `url(${background})`, // Add the background image
  backgroundSize: 'cover', // Cover the entire screen
  backgroundPosition: 'center', // Center the image
  backgroundRepeat: 'no-repeat', // Prevent image repetition
  color: '#fff', // White text color for contrast
  height: '100vh', // Fix height to the viewport
  overflow: 'hidden', // Prevent scrolling
  display: 'flex', // Ensure child elements take full height
  flexDirection: 'column',
};

const navStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  background: 'rgba(0, 0, 0, 0.7)', // Semi-transparent black navbar
  boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.5)', // Subtle shadow
  padding: '0.5rem 1rem',
};

const logoContainer = {
  display: 'flex',
  alignItems: 'center',
};

const logoStyle = {
  height: '150px', // Adjust logo size
  width: 'auto', // Maintain aspect ratio
};

const navLinksContainer = {
  display: 'flex',
  gap: '1.5rem',
};

// const navLinkStyle = {
//   textDecoration: 'none',
//   color: '#fff', // White links for contrast
//   fontWeight: '500',
//   background: '#d6336c', // Pink background for the links
//   padding: '0.5rem 1rem',
//   borderRadius: '20px',
//   transition: 'transform 0.2s, background 0.3s ease',
//   boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.3)', // Subtle shadow
//   marginTop: '-38px',
// };
const navLinkStyle = {
  textDecoration: 'none',
  color: '#fff', // White text for contrast
  fontWeight: '500',
  background: '#9370DB', // Light purple background for the buttons
  padding: '0.5rem 1rem',
  borderRadius: '20px',
  transition: 'transform 0.2s, background 0.3s ease',
  boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.3)', // Subtle shadow
  marginTop: '-38px',
  '&:hover': {
    background: '#836FFF', // Slightly darker purple on hover for better feedback
    transform: 'scale(1.05)', // Slight scaling effect on hover
  },
};


const heroSection = {
  display: 'flex', // Center content
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  background: 'rgba(0, 0, 0, 0.4)', // Overlay for better text contrast
  height: '100%',
};

// const headingStyle = {
//   fontSize: '2.5rem',
//   color: '#d6336c',
//   textAlign: 'center',
// };

const headingStyle = {
  fontSize: '3.5rem', // Increase font size for emphasis
  color: '#E6E6FA', // A vibrant gold color
  textAlign: 'center',
  fontFamily: "'Poppins', sans-serif", // Add a stylish modern font
  fontWeight: 'bold', // Make the text bold
  textShadow: '2px 2px 4px rgba(0, 0, 0, 0.7)', // Add a subtle shadow for depth
  letterSpacing: '0.1rem', // Slightly increase spacing between letters
  marginTop: '1rem', // Add some margin for better placement
};


export default Home;
