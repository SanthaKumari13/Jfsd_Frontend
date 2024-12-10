import React, { useState, useEffect } from 'react';
import { fetchPrograms, fetchBranches, fetchDomains } from '../services/api';

const StaticTabs = () => {
  const [programs, setPrograms] = useState([]);
  const [branches, setBranches] = useState({});
  const [domains, setDomains] = useState([]);
  const [selectedProgram, setSelectedProgram] = useState(null);
  const [selectedBranch, setSelectedBranch] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      const programData = await fetchPrograms();
      const branchData = await fetchBranches();
      setPrograms(programData);
      setBranches(branchData);
    };

    loadData();
  }, []);

  const handleBranchChange = async (branch) => {
    setSelectedBranch(branch);
    const domainData = await fetchDomains(branch);
    setDomains(domainData);
  };

  return (
    <div>
      <h2>Program, Branch, Domain Selection</h2>

      <div>
        <label>Select Program:</label>
        <select onChange={(e) => setSelectedProgram(e.target.value)} value={selectedProgram || ''}>
          <option value="">Select Program</option>
          {programs.map((program) => (
            <option key={program.id} value={program.id}>
              {program.programName}
            </option>
          ))}
        </select>
      </div>

      {selectedProgram && (
        <div>
          <label>Select Branch:</label>
          <select
            onChange={(e) => handleBranchChange(e.target.value)}
            value={selectedBranch || ''}
          >
            <option value="">Select Branch</option>
            {branches[selectedProgram]?.map((branch, index) => (
              <option key={index} value={branch}>
                {branch}
              </option>
            ))}
          </select>
        </div>
      )}

      {selectedBranch && (
        <div>
          <label>Select Domain:</label>
          <select>
            <option value="">Select Domain</option>
            {domains.map((domain, index) => (
              <option key={index} value={domain}>
                {domain}
              </option>
            ))}
          </select>
        </div>
      )}
    </div>
  );
};

export default StaticTabs;
