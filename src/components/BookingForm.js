import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { createBooking, fetchBookedSlots } from "../services/api"; // Assuming this function exists

const BookingForm = () => {
  const { state } = useLocation();
  const { counselor, userId } = state || {};

  const [selectedSlot, setSelectedSlot] = useState("");
  const [bookedSlots, setBookedSlots] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const getBookedSlots = async () => {
      if (counselor?.id) {
        try {
          const slots = await fetchBookedSlots(counselor.id); 
          setBookedSlots(slots || []);
        } catch (error) {
          console.error("Error fetching booked slots:", error);
        }
      }
    };

    getBookedSlots();
  }, [counselor]);

  if (!counselor || !userId) {
    return <p>No counselor or user information available.</p>;
  }

  const handleBookSession = async () => {
    if (!selectedSlot) {
      alert("Please select a time slot.");
      return;
    }

    const currentDate = new Date().toISOString().split("T")[0];
    const selectedSlotTime = getSlotTime(selectedSlot, currentDate);

    try {
      await createBooking(userId, counselor.id, selectedSlotTime);
      setMessage("Session booked successfully!");
      setBookedSlots((prev) => [...prev, selectedSlot]);
    } catch (error) {
      if (error.response?.status === 409) {
        setMessage("This time slot is already booked.");
      } else {
        setMessage("Error booking session. Please try again.");
      }
    }
  };

  const getSlotTime = (slot, date) => {
    switch (slot) {
      case "9 AM - 11 AM":
        return `${date}T09:00`;
      case "12 PM - 2 PM":
        return `${date}T12:00`;
      case "3 PM - 5 PM":
        return `${date}T15:00`;
      default:
        return "";
    }
  };

  const isSlotBooked = (slot) => bookedSlots.includes(slot);

  return (
    <div className="booking-form">
      <h2>Book Session with {counselor.name}</h2>
      <p>{counselor.email}</p>
      <p>{counselor.phoneNumber}</p>

      <h3>Select a Time Slot</h3>
      <div className="slot-buttons">
        {["9 AM - 11 AM", "12 PM - 2 PM", "3 PM - 5 PM"].map((slot) => (
          <button
            key={slot}
            className={`slot-button 
              ${selectedSlot === slot ? "selected" : ""} 
              ${isSlotBooked(slot) ? "booked" : ""}`}
            disabled={isSlotBooked(slot)}
            onClick={() => setSelectedSlot(slot)}
          >
            {slot} {isSlotBooked(slot) && "(Booked)"}
          </button>
        ))}
      </div>

      <button className="book-session-btn" onClick={handleBookSession}>
        Book Session
      </button>

      {message && <p className="message">{message}</p>}

      <style jsx>{`
        .booking-form {
          font-family: Arial, sans-serif;
          padding: 20px;
          max-width: 600px;
          margin: 0 auto;
          background-color: #f9f9f9;
          border-radius: 8px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }

        .booking-form h2 {
          color: #333;
        }

        .booking-form p {
          font-size: 16px;
          color: #555;
        }

        .slot-buttons {
          margin: 20px 0;
        }

        .slot-button {
          padding: 10px 20px;
          margin: 5px;
          background-color: #28a745;
          color: white;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          font-size: 16px;
          transition: background-color 0.3s;
        }

        .slot-button.selected {
          background-color: #007bff;
        }

        .slot-button.booked {
          background-color: #d9534f;
          cursor: not-allowed;
        }

        .slot-button:hover:not(.booked) {
          background-color: #218838;
        }

        .book-session-btn {
          padding: 12px 20px;
          background-color: #007bff;
          color: white;
          border: none;
          border-radius: 5px;
          font-size: 16px;
          cursor: pointer;
          width: 100%;
        }

        .book-session-btn:hover {
          background-color: #0056b3;
        }

        .message {
          margin-top: 20px;
          font-size: 16px;
          color: #28a745;
        }
      `}</style>
    </div>
  );
};

export default BookingForm;
