import React, { useState, useEffect } from 'react';
import { fetchCounselors, fetchDomains, assignCounselorToDomain } from '../services/api';

const AssignCounselorToDomain = () => {
  const [counselors, setCounselors] = useState([]);
  const [domains, setDomains] = useState([]);
  const [selectedCounselor, setSelectedCounselor] = useState('');
  const [selectedDomain, setSelectedDomain] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const counselorsData = await fetchCounselors();
        const domainsData = await fetchDomains();
        setCounselors(counselorsData);
        setDomains(domainsData);
      } catch (error) {
        console.error('Error fetching data:', error);
        setMessage('Error fetching counselors or domains.');
      }
    };
    fetchData();
  }, []);

  const handleAssignment = async () => {
    if (!selectedCounselor || !selectedDomain) {
      setMessage('Please select both a counselor and a domain.');
      return;
    }

    try {
      await assignCounselorToDomain(selectedCounselor, selectedDomain);
      setMessage('Counselor assigned successfully.');
      setSelectedCounselor('');
      setSelectedDomain('');
    } catch (error) {
      console.error('Error assigning counselor:', error);
      setMessage('Error assigning counselor to domain.');
    }
  };

  return (
    <div className="assign-counselor-container">
      <h2>Assign Counselor to Domain</h2>
      <div className="select-group">
        <label>Select Counselor:</label>
        <select
          value={selectedCounselor}
          onChange={(e) => setSelectedCounselor(e.target.value)}
        >
          <option value="">Select Counselor</option>
          {counselors.map((counselor) => (
            <option key={counselor.id} value={counselor.id}>
              {counselor.name}
            </option>
          ))}
        </select>
      </div>

      <div className="select-group">
        <label>Select Domain:</label>
        <select
          value={selectedDomain}
          onChange={(e) => setSelectedDomain(e.target.value)}
        >
          <option value="">Select Domain</option>
          {domains.map((domain) => (
            <option key={domain.id} value={domain.id}>
              {domain.name}
            </option>
          ))}
        </select>
      </div>

      <div className="button-container">
        <button onClick={handleAssignment}>Assign</button>
      </div>

      {message && <div className="message">{message}</div>}

      <style>{`
        .assign-counselor-container {
          background-color: #f9f9f9;
          padding: 40px;
          border-radius: 8px;
          width: 80%;
          max-width: 600px;
          margin: 50px auto;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }

        h2 {
          text-align: center;
          font-size: 2rem;
          color: #6200ea;
          margin-bottom: 20px;
        }

        .select-group {
          margin-bottom: 20px;
        }

        label {
          display: block;
          font-size: 1.1rem;
          color: #333;
          margin-bottom: 8px;
        }

        select {
          width: 100%;
          padding: 10px;
          border-radius: 8px;
          border: 1px solid #ccc;
          font-size: 1rem;
          margin-bottom: 10px;
          box-sizing: border-box;
        }

        select:focus {
          border-color: #6200ea;
          outline: none;
        }

        .button-container {
          text-align: center;
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
        }

        button:hover {
          background-color: #3700b3;
        }

        .message {
          margin-top: 20px;
          text-align: center;
          font-size: 1rem;
          color: #4caf50;
        }

        .message.error {
          color: #f44336;
        }
      `}</style>
    </div>
  );
};

export default AssignCounselorToDomain;
