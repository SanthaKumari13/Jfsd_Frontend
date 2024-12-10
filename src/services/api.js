import axios from 'axios';

const BASE_URL = process.env.REACT_APP_BASE_URL;

// Utility to handle API errors
export const handleApiError = (error) => {
  return error.response?.data?.message || 'An unexpected error occurred.';
};

export const fetchChatMessages = (userId, counselorId) =>
  axios.get(`${BASE_URL}/${userId}/${counselorId}`);

export const fetchConversations = async (counselorId) => {
  return await axios.get(`${BASE_URL}/conversations/${counselorId}`);
};
export const sendMessage = (chatMessage) =>
  axios.post(BASE_URL, chatMessage);
// Authentication and User Management APIs
export const adminLogin = async (username, password) => {
  try {
    const response = await axios.post(`${BASE_URL}/admin/login`, null, {
      params: { username, password },
    });
    return response.data; // Return the auth token
  } catch (error) {
    throw new Error(handleApiError(error));
  }
};

export const registerUser = async (formData) => {
  try {
    const response = await axios.post(`${BASE_URL}/register`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  } catch (error) {
    console.error('Error during registration:', error);
    if (error.response) {
      throw new Error(error.response?.data?.message || 'Error registering user');
    } else if (error.request) {
      throw new Error('No response from server. Please try again.');
    } else {
      throw new Error('An unexpected error occurred. Please try again.');
    }
  }
};

export const loginUser = async (loginData) => {
  try {
    const response = await axios.post(`${BASE_URL}/login`, loginData);
    return response.data;
  } catch (error) {
    throw error.response?.data || 'Error logging in';
  }
};

export const verifyAccount = async (email, otp) => {
  try {
    const response = await axios.put(`${BASE_URL}/verify`, { email, otp });
    return response.data;
  } catch (error) {
    throw error.response?.data || 'Error verifying account';
  }
};

export const regenerateOtp = async (email) => {
  try {
    const response = await axios.put(`${BASE_URL}/regenerate-otp`, null, {
      params: { email },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || 'Error regenerating OTP';
  }
};

export const forgotPassword = async (email) => {
  try {
    const response = await axios.post(`${BASE_URL}/forgot-password`, { email });
    return response.data;
  } catch (error) {
    throw error.response?.data || 'Error with forgot password';
  }
};

export const resetPassword = async (token, newPassword) => {
  try {
    const response = await axios.post(`${BASE_URL}/reset-password`, {
      token,
      newPassword,
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || 'Error resetting password';
  }
};

export const getUserById = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/users/${id}`);
    return response.data; // Return the user data
  } catch (error) {
    throw new Error(handleApiError(error));
  }
};

// Program APIs
export const fetchPrograms = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/programs`);
    return response.data;
  } catch (error) {
    throw new Error(handleApiError(error));
  }
};

export const fetchProgramById = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/programs/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(handleApiError(error));
  }
};

export const addProgram = async (programData) => {
  try {
    const response = await axios.post(`${BASE_URL}/programs`, programData);
    return response.data;
  } catch (error) {
    throw new Error(handleApiError(error));
  }
};

export const updateProgram = async (id, programData) => {
  try {
    const response = await axios.put(`${BASE_URL}/programs/${id}`, programData);
    return response.data;
  } catch (error) {
    throw new Error(handleApiError(error));
  }
};

export const deleteProgram = async (id) => {
  try {
    const response = await axios.delete(`${BASE_URL}/programs/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(handleApiError(error));
  }
};

// Branch APIs
export const fetchBranches = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/branches`);
    return response.data;
  } catch (error) {
    throw new Error(handleApiError(error));
  }
};

export const fetchBranchById = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/branches/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(handleApiError(error));
  }
};

export const addBranch = async (branchData, programId) => {
  try {
    const response = await axios.post(`${BASE_URL}/branches`, branchData, {
      params: { programId },
    });
    return response.data;
  } catch (error) {
    throw new Error(handleApiError(error));
  }
};

export const updateBranch = async (id, branchData) => {
  try {
    const response = await axios.put(`${BASE_URL}/branches/${id}`, branchData);
    return response.data;
  } catch (error) {
    throw new Error(handleApiError(error));
  }
};

export const deleteBranch = async (id) => {
  try {
    const response = await axios.delete(`${BASE_URL}/branches/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(handleApiError(error));
  }
};

// Domain APIs
export const fetchDomains = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/domains`);
    return response.data;
  } catch (error) {
    throw new Error(handleApiError(error));
  }
};

export const fetchDomainById = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/domains/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(handleApiError(error));
  }
};

export const addDomain = async (domainData, branchId, programId, demoVideo, roadmap, certifications) => {
  try {
    const formData = new FormData();
    formData.append('domain', new Blob([JSON.stringify(domainData)], { type: 'application/json' }));
    formData.append('branchId', branchId);
    formData.append('programId', programId);
    if (demoVideo) formData.append('demoVideo', demoVideo);
    if (roadmap) formData.append('roadmap', roadmap);
    if (certifications && certifications.length > 0) {
      certifications.forEach((certification, index) => {
        formData.append(`certifications[${index}]`, certification);
      });
    }

    const response = await axios.post(`${BASE_URL}/domains`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  } catch (error) {
    throw new Error(handleApiError(error));
  }
};


export const updateDomain = async (id, domainData, branchId, programId, demoVideo, roadmap, certifications) => {
  try {
    const formData = new FormData();
    formData.append('domain', new Blob([JSON.stringify(domainData)], { type: 'application/json' }));
    formData.append('branchId', branchId);
    formData.append('programId', programId);
    if (demoVideo) formData.append('demoVideo', demoVideo);
    if (roadmap) formData.append('roadmap', roadmap);
    if (certifications && certifications.length > 0) {
      certifications.forEach((certification, index) => {
        formData.append(`certifications[${index}]`, certification);
      });
    }

    const response = await axios.put(`${BASE_URL}/domains/${id}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  } catch (error) {
    throw new Error(handleApiError(error));
  }
};


export const deleteDomain = async (id) => {
  try {
    const response = await axios.delete(`${BASE_URL}/domains/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(handleApiError(error));
  }
};


export const uploadCSVFile = async (file) => {
  try {
    const formData = new FormData();
    formData.append("file", file);

    const response = await axios.post(`${BASE_URL}/upload-csv`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    return response.data;
  } catch (error) {
    throw error.response?.data || "Error uploading file";
  }
};
export const fetchCounselors = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/counselors`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Error fetching counselors');
  }
};
export const loginCounselor = async (loginData) => {
  try {
    const response = await axios.post(`${BASE_URL}/counselor/login`, loginData);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data || 'Error logging in counselor');
  }
};
export const fetchCounselorById = async (id) => {
  try {
    const response = await fetch(`/counselor/${id}`);
    if (!response.ok) {
      throw new Error(`Error fetching counselor: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
};

export const assignCounselorToDomain = async (counselorId, domainId) => {
  try {
    const response = await axios.post(`${BASE_URL}/assignments`, null, {
      params: { counselorId, domainId },
    });
    return response.data;
  } catch (error) {
    throw new Error(`Error assigning counselor: ${error.message}`);
  }
};
export const getAllAssignments = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/assignments`);
    return response.data;
  } catch (error) {
    console.error("Error fetching all assignments:", error);
    throw error;
  }
};

export const getAssignmentsByDomainId = async (domainId) => {
  try {
    const response = await axios.get(`${BASE_URL}/assignments/domain/${domainId}`);
    return response.data;
  } catch (error) {
    throw new Error(`Error fetching assignments by domain ID: ${error.message}`);
  }
};
export const createBooking = async (userId, counsellorId, bookingDate) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/bookings/create`,
      null,
      {
        params: { userId, counsellorId, bookingDate },
      }
    );
    return response.data; // Return token on success
  } catch (error) {
    throw new Error(error.response?.data || "Error creating booking. Please try again.");
  }
};
// src/services/api.js

export const fetchBookedSlots = async (counselorId) => {
  try {
    const response = await fetch(`/api/bookings/${counselorId}/slots`);
    if (!response.ok) {
      throw new Error("Failed to fetch booked slots");
    }
    const data = await response.json();
    return data.bookedSlots; // Assuming the API returns { bookedSlots: [] }
  } catch (error) {
    console.error("Error fetching booked slots:", error);
    throw error;
  }
};

// src/services/api.js

// Function to fetch bookings by userId
export const fetchUserBookings = async (userId) => {
  try {
    const response = await fetch(`/bookings/user?userId=${userId}`);
    if (!response.ok) {
      throw new Error("Failed to fetch bookings");
    }
    return await response.json();
  } catch (error) {
    throw new Error(error.message || "Error fetching bookings");
  }
};
