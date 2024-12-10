// src/components/MyBookings.js

import React, { useState, useEffect } from 'react';
import { fetchUserBookings } from '../services/api';
import { getSession } from '../utils/cookieUtils';
import './MyBookings.css'; // Import the CSS file

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState('');

  // Get userId from session (cookie)
  const userId = getSession('userId');

  useEffect(() => {
    const loadBookings = async () => {
      if (userId) {
        try {
          const data = await fetchUserBookings(userId); // Fetch bookings by userId
          setBookings(data); // Set bookings state
        } catch (error) {
          setError(error.message || 'Failed to load bookings.');
        }
      } else {
        setError('User not logged in.');
      }
    };
    loadBookings();
  }, [userId]);

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="my-bookings">
      <h2>My Bookings</h2>
      {bookings.length === 0 ? (
        <p>No bookings found.</p>
      ) : (
        <table className="booking-table">
          <thead>
            <tr>
              <th>Counsellor Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Booking Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <tr key={booking.id}>
                <td>{booking.counsellor.name}</td>
                <td>{booking.counsellor.email}</td>
                <td>{booking.counsellor.phoneNumber}</td>
                <td>{new Date(booking.bookingDate).toLocaleString()}</td>
                <td>{booking.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default MyBookings;
