import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchCounselorById } from "../services/api";
import { getSession } from "../utils/cookieUtils";

import Chat from "./Chat";

const CounselorDetails = () => {
  const { id } = useParams();
  const [counselor, setCounselor] = useState(null);
  const userId = getSession("userId");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCounselor = async () => {
      try {
        const response = await fetchCounselorById(id);
        setCounselor(response);
      } catch (error) {
        console.error("Error fetching counselor details:", error);
      }
    };

    fetchCounselor();
  }, [id]);

  const handleNavigateToBookingForm = () => {
    if (!counselor || !userId) {
      alert("You must be logged in to book a session.");
      return;
    }
    navigate(`/book-session/${id}`, { state: { counselor, userId } });
  };

  return (
    <div>
      <h2>Counselor Details</h2>
      {counselor && (
        <div>
          <h3>{counselor.name}</h3>
          <p>{counselor.email}</p>
          <p>{counselor.qualification}</p>
          <p>{counselor.phoneNumber}</p>
          <button onClick={handleNavigateToBookingForm}>Book a Session</button>

          {/* Chat Section */}
          <Chat counselorId={id} />
        </div>
      )}
    </div>
  );
};

export default CounselorDetails;
