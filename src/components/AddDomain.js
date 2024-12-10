import React, { useState, useEffect } from 'react';
import { fetchPrograms, fetchBranches, addDomain } from '../services/api';

const AddDomain = () => {
  const [programs, setPrograms] = useState([]);
  const [branches, setBranches] = useState([]);
  const [programId, setProgramId] = useState('');
  const [branchId, setBranchId] = useState('');
  const [domainName, setDomainName] = useState('');
  const [description, setDescription] = useState('');
  const [demoVideo, setDemoVideo] = useState(null);
  const [roadmap, setRoadmap] = useState(null);
  const [certifications, setCertifications] = useState([]);
  const [resourcesLinks, setResourcesLinks] = useState(['']);
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

  const handleProgramChange = async (e) => {
    const selectedProgramId = e.target.value;
    setProgramId(selectedProgramId);
    setBranchId('');
    try {
      const branchesData = await fetchBranches(selectedProgramId);
      setBranches(branchesData);
    } catch (error) {
      setMessage(`Error fetching branches: ${error.message}`);
    }
  };

  const handleFileChange = (e, setFile) => {
    const file = e.target.files[0];
    setFile(file);
  };

  const handleCertificationsChange = (e) => {
    const files = Array.from(e.target.files);
    setCertifications(files);
  };

  const handleResourceLinkChange = (index, value) => {
    const newResourcesLinks = [...resourcesLinks];
    newResourcesLinks[index] = value;
    setResourcesLinks(newResourcesLinks);
  };

  const addResourceLinkField = () => {
    setResourcesLinks([...resourcesLinks, '']);
  };

  const removeResourceLinkField = (index) => {
    const newResourcesLinks = resourcesLinks.filter((_, i) => i !== index);
    setResourcesLinks(newResourcesLinks);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newDomain = {
        name: domainName,
        description,
        resourcesLinks,
      };
      const response = await addDomain(newDomain, branchId, programId, demoVideo, roadmap, certifications);
      setMessage(`Domain added successfully: ${response.name}`);
      setDomainName('');
      setDescription('');
      setBranchId('');
      setProgramId('');
      setBranches([]);
      setDemoVideo(null);
      setRoadmap(null);
      setCertifications([]);
      setResourcesLinks(['']);
    } catch (error) {
      setMessage(`Error adding domain: ${error.message}`);
    }
  };

  return (
    <div className="add-domain-container">
      <h2>Add Domain</h2>
      <form onSubmit={handleSubmit} className="add-domain-form">
        <div className="form-group">
          <label>Program:</label>
          <select value={programId} onChange={handleProgramChange} required>
            <option value="">Select a Program</option>
            {programs.map((program) => (
              <option key={program.id} value={program.id}>
                {program.name}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>Branch:</label>
          <select value={branchId} onChange={(e) => setBranchId(e.target.value)} required>
            <option value="">Select a Branch</option>
            {branches.map((branch) => (
              <option key={branch.id} value={branch.id}>
                {branch.name}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>Domain Name:</label>
          <input type="text" value={domainName} onChange={(e) => setDomainName(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows="4"
            cols="50"
            placeholder="Enter a brief description of the domain"
            required
          ></textarea>
        </div>
        
        <div className="form-group">
          <label>Demo Video:</label>
          <input type="file" accept="video/*" onChange={(e) => handleFileChange(e, setDemoVideo)} />
        </div>
        <div className="form-group">
          <label>Roadmap:</label>
          <input type="file" accept="image/*" onChange={(e) => handleFileChange(e, setRoadmap)} />
        </div>
        <div className="form-group">
          <label>Certifications:</label>
          <input type="file" accept="image/*" multiple onChange={handleCertificationsChange} />
        </div>
        <div className="form-group">
          <label>Resources Links:</label>
          {resourcesLinks.map((link, index) => (
            <div key={index} className="resource-link-field">
              <input
                type="url"
                value={link}
                onChange={(e) => handleResourceLinkChange(index, e.target.value)}
                placeholder="Enter resource link"
                required
              />
              <button type="button" onClick={() => removeResourceLinkField(index)}>
                Remove
              </button>
            </div>
          ))}
          <button type="button" onClick={addResourceLinkField}>
            Add More Links
          </button>
        </div>
        <button type="submit" className="add-domain-button">Add Domain</button>
      </form>
      {message && <p className="message">{message}</p>}

      <style>{`
        .add-domain-container {
          background: linear-gradient(to right, #6200ea, #bb86fc); /* Gradient background */
          padding: 30px;
          border-radius: 10px;
          width: 100%;
          max-width: 600px;
          margin: 50px auto;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
        }

        h2 {
          text-align: center;
          color: white;
          font-size: 2rem;
          font-weight: 600;
          margin-bottom: 20px;
        }

        .add-domain-form .form-group {
          margin-bottom: 20px;
        }

        label {
          display: block;
          font-size: 1.1rem;
          color: #333;
          margin-bottom: 8px;
        }

        input, textarea, select {
          width: 100%;
          padding: 10px;
          border-radius: 8px;
          border: 1px solid #ccc;
          font-size: 1rem;
          margin-bottom: 10px;
          box-sizing: border-box;
        }

        select:focus, input:focus, textarea:focus {
          border-color: #6200ea;
          outline: none;
        }

        .resource-link-field input {
          width: 80%;
          margin-right: 10px;
        }

        .add-domain-button {
          width: 100%;
          background-color: #6200ea;
          color: white;
          padding: 12px;
          border: none;
          border-radius: 8px;
          font-size: 1.2rem;
          font-weight: bold;
          cursor: pointer;
          transition: background-color 0.3s;
        }

        .add-domain-button:hover {
          background-color: #3700b3;
        }

        .message {
          text-align: center;
          margin-top: 20px;
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

export default AddDomain;
