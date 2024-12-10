import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  CircularProgress,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Paper,
  Divider,
  Container,
} from "@mui/material";
import { fetchPrograms, fetchBranches, fetchDomains, fetchDomainById } from "../services/api";

const ViewDomain = () => {
  const [programs, setPrograms] = useState([]);
  const [branches, setBranches] = useState([]);
  const [domains, setDomains] = useState([]);
  const [selectedProgramId, setSelectedProgramId] = useState("");
  const [selectedBranchId, setSelectedBranchId] = useState("");
  const [selectedDomainId, setSelectedDomainId] = useState("");
  const [domainDetails, setDomainDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchAllPrograms = async () => {
      try {
        const programsData = await fetchPrograms();
        setPrograms(programsData);
      } catch (error) {
        setErrorMessage(`Error fetching programs: ${error.message}`);
      }
    };
    fetchAllPrograms();
  }, []);

  const handleProgramChange = async (e) => {
    const programId = e.target.value;
    setSelectedProgramId(programId);
    resetSelection(["branch", "domain"]);

    if (programId) {
      try {
        setLoading(true);
        const branchesData = await fetchBranches(programId);
        setBranches(branchesData);
      } catch (error) {
        setErrorMessage(`Error fetching branches: ${error.message}`);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleBranchChange = async (e) => {
    const branchId = e.target.value;
    setSelectedBranchId(branchId);
    resetSelection(["domain"]);

    if (branchId) {
      try {
        setLoading(true);
        const domainsData = await fetchDomains(branchId);
        setDomains(domainsData);
      } catch (error) {
        setErrorMessage(`Error fetching domains: ${error.message}`);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleDomainChange = async (e) => {
    const domainId = e.target.value;
    setSelectedDomainId(domainId);

    if (domainId) {
      try {
        setLoading(true);
        const domainData = await fetchDomainById(domainId);
        setDomainDetails(domainData);
      } catch (error) {
        setErrorMessage(`Error fetching domain details: ${error.message}`);
      } finally {
        setLoading(false);
      }
    }
  };

  const resetSelection = (levels) => {
    if (levels.includes("branch")) {
      setSelectedBranchId("");
      setBranches([]);
    }
    if (levels.includes("domain")) {
      setSelectedDomainId("");
      setDomains([]);
      setDomainDetails(null);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 5 }}>
      <Paper
        elevation={3}
        sx={{
          padding: "20px",
          borderRadius: "16px",
          background: "linear-gradient(135deg, #8e44ad, #3498db, #f39c12, #e74c3c)",
          backgroundSize: "400% 400%",
          animation: "gradientAnimation 15s ease infinite",
          color: "#fff",
          transition: "box-shadow 0.3s ease",
          "&:hover": {
            boxShadow: "0 6px 18px rgba(0,0,0,0.2)",
          },
          "@keyframes gradientAnimation": {
            "0%": { backgroundPosition: "0% 50%" },
            "50%": { backgroundPosition: "100% 50%" },
            "100%": { backgroundPosition: "0% 50%" },
          },
        }}
      >
        <Typography variant="h4" textAlign="center" gutterBottom>
          View Domain
        </Typography>
        {errorMessage && (
          <Typography color="error" textAlign="center" marginBottom={2}>
            {errorMessage}
          </Typography>
        )}
        <Divider sx={{ my: 2 }} />
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={4}>
            <FormControl fullWidth variant="outlined">
              <InputLabel>Program</InputLabel>
              <Select value={selectedProgramId} onChange={handleProgramChange} label="Program">
                <MenuItem value="">Select a Program</MenuItem>
                {programs.map((program) => (
                  <MenuItem key={program.id} value={program.id}>
                    {program.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <FormControl fullWidth variant="outlined" disabled={!selectedProgramId}>
              <InputLabel>Branch</InputLabel>
              <Select value={selectedBranchId} onChange={handleBranchChange} label="Branch">
                <MenuItem value="">Select a Branch</MenuItem>
                {branches.map((branch) => (
                  <MenuItem key={branch.id} value={branch.id}>
                    {branch.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <FormControl fullWidth variant="outlined" disabled={!selectedBranchId}>
              <InputLabel>Domain</InputLabel>
              <Select value={selectedDomainId} onChange={handleDomainChange} label="Domain">
                <MenuItem value="">Select a Domain</MenuItem>
                {domains.map((domain) => (
                  <MenuItem key={domain.id} value={domain.id}>
                    {domain.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
        {loading && (
          <Box display="flex" justifyContent="center" mt={3}>
            <CircularProgress sx={{ color: "#fff" }} />
          </Box>
        )}
        {domainDetails && (
          <Card
            sx={{
              mt: 4,
              borderRadius: "16px",
              backgroundColor: "#fff8dc",
              boxShadow: 3,
              transition: "transform 0.3s ease, box-shadow 0.3s ease",
              "&:hover": {
                transform: "scale(1.02)",
                boxShadow: "0 6px 18px rgba(0,0,0,0.2)",
              },
            }}
          >
            <CardContent>
              <Typography variant="h5" gutterBottom color="secondary">
                {domainDetails.name}
              </Typography>
              <Typography variant="body1" paragraph>
                {domainDetails.description}
              </Typography>
              <Divider sx={{ my: 2 }} />
              {/* Add Resource links, video, roadmap, and certifications here */}
              <Typography variant="h6">Resources:</Typography>
              <ul>
                {domainDetails.resourcesLinks.map((link, index) => (
                  <li key={index}>
                    <a href={link} target="_blank" rel="noopener noreferrer">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
              {domainDetails.demoVideo && (
                <Box mt={2}>
                  <Typography variant="h6">Demo Video:</Typography>
                  <video
                    controls
                    src={domainDetails.demoVideo}
                    style={{ width: "100%", borderRadius: "8px" }}
                  />
                </Box>
              )}
              {domainDetails.roadmap && (
                <Box mt={2}>
                  <Typography variant="h6">Roadmap:</Typography>
                  <CardMedia
                    component="img"
                    image={domainDetails.roadmap}
                    alt="Roadmap"
                    style={{ borderRadius: "8px" }}
                  />
                </Box>
              )}
              {domainDetails.certifications?.length > 0 && (
                <Box mt={2}>
                  <Typography variant="h6">Certifications:</Typography>
                  <Grid container spacing={2}>
                    {domainDetails.certifications.map((cert, index) => (
                      <Grid item key={index} xs={6} sm={4} md={3}>
                        <CardMedia
                          component="img"
                          image={cert}
                          alt={`Certification ${index + 1}`}
                          style={{ borderRadius: "8px" }}
                        />
                      </Grid>
                    ))}
                  </Grid>
                </Box>
              )}
            </CardContent>
          </Card>
        )}
      </Paper>
    </Container>
  );
};

export default ViewDomain;
