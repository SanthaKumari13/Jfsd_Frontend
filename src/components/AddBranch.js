import React, { useState, useEffect } from 'react';
import { fetchPrograms, addBranch } from '../services/api';

const AddBranch = () => {
  const [programs, setPrograms] = useState([]);
  const [branchName, setBranchName] = useState('');
  const [programId, setProgramId] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchAllPrograms = async () => {
      try {
        const programsData = await fetchPrograms();
        setPrograms(programsData);
      } catch (error) {
        setMessage(`Error fetching programs: ${error.message}`);
      }
    };
    fetchAllPrograms();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newBranch = { name: branchName };
      const response = await addBranch(newBranch, programId);
      setMessage(`Branch added successfully: ${response.name}`);
      setBranchName('');
      setProgramId('');
    } catch (error) {
      setMessage(`Error adding branch: ${error.message}`);
    }
  };

  return (
    <div className="app-wrapper">
      <div className="add-branch-container">
        <h2>Add Branch</h2>
        <form onSubmit={handleSubmit} className="add-branch-form">
          <div className="form-group">
            <label>Program:</label>
            <select
              value={programId}
              onChange={(e) => setProgramId(e.target.value)}
              required
            >
              <option value="">Select a Program</option>
              {programs.map((program) => (
                <option key={program.id} value={program.id}>
                  {program.name}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label>Branch Name:</label>
            <input
              type="text"
              value={branchName}
              onChange={(e) => setBranchName(e.target.value)}
              required
              placeholder="Enter branch name"
            />
          </div>
          <button type="submit" className="add-branch-button">Add Branch</button>
        </form>
        {message && <p className={`message ${message.includes('Error') ? 'error' : ''}`}>{message}</p>}
      </div>

      <style>{`
        .app-wrapper {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
          background-color: #000; /* Black background */
        }

        .add-branch-container {
          background-color: #fefafc; /* Soft pink pastel background */
          border: 2px solid #fbd1d5; /* Subtle pink border */
          padding: 30px;
          border-radius: 15px;
          width: 100%;
          max-width: 500px;
          margin: 50px auto;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
          font-family: 'Poppins', sans-serif;
        }

        h2 {
          text-align: center;
          color: #e91e63; /* Feminine rose color for the header */
          font-size: 2rem;
          font-weight: 600;
          margin-bottom: 20px;
        }

        .add-branch-form .form-group {
          margin-bottom: 20px;
        }

        label {
          display: block;
          font-size: 1.2rem;
          color: #333;
          margin-bottom: 10px;
        }

        select, input {
          width: 100%;
          padding: 10px;
          border: 1px solid #ddd;
          border-radius: 8px;
          font-size: 1rem;
          background-color: #fff;
          color: #333;
          transition: all 0.3s ease;
        }

        select:hover, input:focus {
          border-color: #e91e63;
          outline: none;
        }

        .add-branch-button {
          width: 100%;
          background-color: #e91e63; /* Feminine rose button */
          color: white;
          padding: 12px;
          border: none;
          border-radius: 8px;
          font-size: 1.2rem;
          font-weight: bold;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .add-branch-button:hover {
          background-color: #c2185b; /* Darker rose on hover */
        }

        .message {
          text-align: center;
          margin-top: 20px;
          font-size: 1rem;
          color: #4caf50; /* Green for success messages */
        }

        .message.error {
          color: #f44336; /* Red for error messages */
        }
      `}</style>
    </div>
  );
};

export default AddBranch;
