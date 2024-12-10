import React, { useState, useEffect } from 'react';
import { fetchCounselors } from '../services/api'; // Corrected API function import

const ViewCounselor = () => {
  const [counselors, setCounselors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch counselors data from backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchCounselors(); // Corrected function call
        setCounselors(data);
      } catch (err) {
        setError(err.message || 'Error fetching counselors');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p>Loading counselors...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="counselor-container">
      <h1>Counselors List</h1>
      <table className="counselor-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Qualification</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Password</th>
            <th>Links</th>
          </tr>
        </thead>
        <tbody>
          {counselors.map((counselor) => (
            <tr key={counselor.id}>
              <td>{counselor.name}</td>
              <td>{counselor.qualification}</td>
              <td>{counselor.email}</td>
              <td>{counselor.phoneNumber}</td>
              <td>{counselor.password}</td>
              <td>{counselor.links}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <style>{`
        .counselor-container {
          background: linear-gradient(to right, #6200ea, #bb86fc);
          padding: 30px;
          border-radius: 10px;
          width: 80%;
          max-width: 1200px;
          margin: 50px auto;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
          color: white;
        }

        h1 {
          text-align: center;
          font-size: 2rem;
          font-weight: 600;
          margin-bottom: 30px;
        }

        .counselor-table {
          width: 100%;
          border-collapse: collapse;
        }

        .counselor-table th, .counselor-table td {
          padding: 12px;
          border: 1px solid #ccc;
          text-align: left;
          color: black; 
        }

        .counselor-table th {
          background-color: #6200ea;
          color: white;
        }

        .counselor-table tr:hover {
          background-color: #bb86fc;
        }

        .counselor-table td {
          background-color: #f9f9f9;
        }

        .counselor-table td, .counselor-table th {
          border-radius: 8px;
        }

        .counselor-table td a {
          color: #6200ea;
          text-decoration: none;
        }

        .counselor-table td a:hover {
          text-decoration: underline;
        }
      `}</style>
    </div>
  );
};

export default ViewCounselor;
