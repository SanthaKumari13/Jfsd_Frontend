import React, { useState } from 'react';
import { addProgram } from '../services/api'; // Import the API function

const AddProgram = () => {
  const [programName, setProgramName] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newProgram = { name: programName };
      const response = await addProgram(newProgram);
      setMessage(`Program added successfully: ${response.name}`);
      setProgramName('');
    } catch (error) {
      setMessage(`Error adding program: ${error.message}`);
    }
  };

  return (
    <div className="app-wrapper">
      <div className="add-program-container">
        <h2 className="add-program-heading">Add Program</h2>
        <form onSubmit={handleSubmit} className="add-program-form">
          <div className="form-group">
            <label className="form-label">Program Name:</label>
            <input
              type="text"
              value={programName}
              onChange={(e) => setProgramName(e.target.value)}
              required
              className="form-input"
            />
          </div>

          <button type="submit" className="form-button">Add Program</button>
        </form>
        {message && <p className="message">{message}</p>}
      </div>

      <style jsx>{`
        .app-wrapper {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
          background-color: #000;
        }

        .add-program-container {
          max-width: 500px;
          padding: 30px;
          background-color: #f7f9fc;
          border-radius: 12px;
          box-shadow: 0 12px 20px rgba(0, 0, 0, 0.1);
          font-family: 'Arial', sans-serif;
        }

        .add-program-heading {
          text-align: center;
          font-size: 28px;
          margin-bottom: 30px;
          color: #333;
          font-weight: 700;
        }

        .add-program-form {
          display: flex;
          flex-direction: column;
        }

        .form-group {
          margin-bottom: 20px;
        }

        .form-label {
          font-size: 16px;
          font-weight: 600;
          margin-bottom: 8px;
          color: #444;
        }

        .form-input {
          width: 100%;
          padding: 10px;
          font-size: 14px;
          border: 1px solid #ccc;
          border-radius: 8px;
          background-color: #fff;
          transition: border-color 0.3s;
        }

        .form-input:focus {
          border-color: #2575fc;
          outline: none;
        }

        .form-button {
          padding: 12px 20px;
          background-color: #2575fc;
          color: #fff;
          font-size: 16px;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          transition: background-color 0.3s;
        }

        .form-button:hover {
          background-color: #6a11cb;
        }

        .message {
          text-align: center;
          margin-top: 20px;
          font-size: 14px;
          color: ${message.includes('successfully') ? '#28a745' : '#d9534f'};
        }
      `}</style>
    </div>
  );
};

export default AddProgram;
