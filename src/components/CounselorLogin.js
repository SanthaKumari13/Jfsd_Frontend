import React, { useState } from 'react';
import { loginCounselor } from '../services/api';
import { setSession } from '../utils/cookieUtils';

const CounselorLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage('');

    try {
      const counselorId = await loginCounselor({ email, password });
      setSession('counselorId', counselorId, 60); // Store session for 60 minutes
      alert('Login successful!');
      window.location.href = '/counselordashboard'; // Redirect to profile page
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="counselor-login-container">
      <h2>Counselor Login</h2>
      <form onSubmit={handleLogin}>
        <div className="input-group">
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <div className="button-container">
          <button type="submit" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </div>
      </form>
      <style>{`
        .counselor-login-container {
          width: 100%;
          max-width: 400px;
          margin: 50px auto;
          background-color: #fff;
          padding: 40px;
          border-radius: 8px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
          text-align: center;
        }

        h2 {
          font-size: 2rem;
          color: #6200ea;
          margin-bottom: 20px;
        }

        .input-group {
          margin-bottom: 20px;
          text-align: left;
        }

        label {
          font-size: 1.1rem;
          color: #333;
          margin-bottom: 8px;
          display: block;
        }

        input {
          width: 100%;
          padding: 10px;
          border-radius: 8px;
          border: 1px solid #ccc;
          font-size: 1rem;
          box-sizing: border-box;
        }

        input:focus {
          border-color: #6200ea;
          outline: none;
        }

        .error-message {
          color: #f44336;
          font-size: 0.9rem;
          margin-top: 10px;
        }

        .button-container {
          margin-top: 20px;
        }

        button {
          background-color: #6200ea;
          color: white;
          padding: 12px 20px;
          border: none;
          border-radius: 8px;
          font-size: 1.1rem;
          cursor: pointer;
          transition: background-color 0.3s;
          width: 100%;
        }

        button:hover {
          background-color: #3700b3;
        }

        button:disabled {
          background-color: #ccc;
          cursor: not-allowed;
        }
      `}</style>
    </div>
  );
};

export default CounselorLogin;
