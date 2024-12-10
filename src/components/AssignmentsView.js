import React, { useEffect, useState } from "react";
import {
  Container,
  Paper,
  Typography,
  Grid,
  Card,
  CardContent,
  Divider,
  Box,
  CircularProgress,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  IconButton,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import {
  fetchPrograms,
  fetchBranches,
  fetchDomains,
  getAssignmentsByDomainId,
} from "../services/api";
import { useNavigate } from "react-router-dom";

const AssignmentsView = () => {
  const [assignments, setAssignments] = useState([]);
  const [programs, setPrograms] = useState([]);
  const [branches, setBranches] = useState([]);
  const [domains, setDomains] = useState([]);
  const [selectedProgramId, setSelectedProgramId] = useState("");
  const [selectedBranchId, setSelectedBranchId] = useState("");
  const [selectedDomainId, setSelectedDomainId] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchAllPrograms = async () => {
      try {
        const programsData = await fetchPrograms();
        setPrograms(programsData);
      } catch (error) {
        setErrorMessage(error.message);
      }
    };

    fetchAllPrograms();
  }, []);

  const resetSelection = (fields) => {
    if (fields.includes("branch")) setBranches([]);
    if (fields.includes("domain")) setDomains([]);
    if (fields.includes("branch")) setSelectedBranchId("");
    if (fields.includes("domain")) setSelectedDomainId("");
  };

  const handleProgramChange = async (e) => {
    const programId = e.target.value;
    setSelectedProgramId(programId);
    resetSelection(["branch", "domain"]);

    if (programId) {
      try {
        const branchesData = await fetchBranches(programId);
        setBranches(branchesData);
      } catch (error) {
        setErrorMessage(error.message);
      }
    }
  };

  const handleBranchChange = async (e) => {
    const branchId = e.target.value;
    setSelectedBranchId(branchId);
    resetSelection(["domain"]);

    if (branchId) {
      try {
        const domainsData = await fetchDomains(branchId);
        setDomains(domainsData);
      } catch (error) {
        setErrorMessage(error.message);
      }
    }
  };

  const handleDomainChange = async (e) => {
    const domainId = e.target.value;
    setSelectedDomainId(domainId);

    if (domainId) {
      try {
        setLoading(true);
        const domainAssignments = await getAssignmentsByDomainId(domainId);
        setAssignments(domainAssignments);
      } catch (error) {
        setErrorMessage(error.message);
      } finally {
        setLoading(false);
      }
    } else {
      setAssignments([]);
    }
  };

  const handleViewCounselor = (counselorId) => {
    navigate(`/counselor/${counselorId}`);
  };

  return (
  
    <Container
  maxWidth="lg"
  sx={{
    mt: 5,
    padding: 3,
    borderRadius: 3,
    background: "linear-gradient(135deg, #6a1b9b, #bb47bc)", // Gradient in purple shades
    minHeight: "100vh", // Ensures it fills the viewport
    color: "white",
  }}
>

<Paper
  sx={{
    padding: 3,
    borderRadius: 0,
    background: "rgba(255, 255, 255, 0.8)", // Transparent white
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
  }}
>

        <Typography
          variant="h4"
          textAlign="center"
          gutterBottom
          sx={{ color: "#4a148c" }}
        >
          Counselor Assignments
        </Typography>
        {errorMessage && (
          <Typography color="error" sx={{ fontWeight: "bold" }}>
            {errorMessage}
          </Typography>
        )}
        <Divider sx={{ my: 2 }} />
        <Grid container spacing={3}>
          <Grid item xs={12} sm={4}>
            <FormControl fullWidth>
              <InputLabel>Program</InputLabel>
              <Select
                value={selectedProgramId}
                onChange={handleProgramChange}
                sx={{
                  borderRadius: 2,
                  backgroundColor: "rgba(255, 255, 255, 0.9)",
                }}
              >
                <MenuItem value="">Select a Program</MenuItem>
                {programs.map((program) => (
                  <MenuItem key={program.id} value={program.id}>
                    {program.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={4}>
            <FormControl fullWidth disabled={!selectedProgramId}>
              <InputLabel>Branch</InputLabel>
              <Select
                value={selectedBranchId}
                onChange={handleBranchChange}
                sx={{
                  borderRadius: 2,
                  backgroundColor: "rgba(255, 255, 255, 0.9)",
                }}
              >
                <MenuItem value="">Select a Branch</MenuItem>
                {branches.map((branch) => (
                  <MenuItem key={branch.id} value={branch.id}>
                    {branch.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={4}>
            <FormControl fullWidth disabled={!selectedBranchId}>
              <InputLabel>Domain</InputLabel>
              <Select
                value={selectedDomainId}
                onChange={handleDomainChange}
                sx={{
                  borderRadius: 2,
                  backgroundColor: "rgba(255, 255, 255, 0.9)",
                }}
              >
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
        <Box sx={{ mt: 3 }}>
          {loading ? (
            <Box textAlign="center">
              <CircularProgress sx={{ color: "#6a1b9a" }} />
            </Box>
          ) : (
            assignments.map((assignment) => (
              <Card
                key={assignment.id}
                sx={{
                  mb: 2,
                  borderRadius: 3,
                  boxShadow: 2,
                  "&:hover": { boxShadow: 5 },
                  backgroundColor: "rgba(255, 255, 255, 0.95)",
                }}
              >
                <CardContent>
                  <Typography
                    variant="h6"
                    sx={{ color: "#6a1b9a", fontWeight: "bold" }}
                  >
                    {assignment.counsellor?.name || "Counselor not assigned"}
                  </Typography>
                  <Typography variant="body2">
                    Domain: {assignment.domain?.name || "Domain not specified"}
                  </Typography>
                  {assignment.counsellor && (
                    <Box textAlign="right">
                      <IconButton
                        color="primary"
                        onClick={() =>
                          handleViewCounselor(assignment.counsellor?.id)
                        }
                      >
                        <VisibilityIcon />
                      </IconButton>
                    </Box>
                  )}
                </CardContent>
              </Card>
            ))
          )}
        </Box>
      </Paper>
    </Container>
  );
};

export default AssignmentsView;
