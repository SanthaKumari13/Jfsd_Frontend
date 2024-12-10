// import React, { useEffect, useState } from 'react';
// import { getBookingById } from '../services/api'; // Import your API function

// const BookingDetails = ({ bookingId }) => {
//   const [booking, setBooking] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchBookingDetails = async () => {
//       try {
//         const bookingData = await getBookingById(bookingId);
//         setBooking(bookingData);
//       } catch (error) {
//         setError("Error fetching booking details");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchBookingDetails();
//   }, [bookingId]);

//   if (loading) {
//     return <p>Loading booking details...</p>;
//   }

//   if (error) {
//     return <p>{error}</p>;
//   }

//   return (
//     <div style={styles.container}>
//       {booking ? (
//         <div style={styles.bookingCard}>
//           <h2 style={styles.header}>Booking Details</h2>
//           <p><strong>Booking ID:</strong> {booking.id}</p>
//           <p><strong>User ID:</strong> {booking.userId}</p>
//           <p><strong>Counselor ID:</strong> {booking.counselorId}</p>
//           <p><strong>Booking Date:</strong> {new Date(booking.bookingDate).toLocaleString()}</p>
//           <p><strong>Status:</strong> {booking.status}</p>
//         </div>
//       ) : (
//         <p>No booking found.</p>
//       )}
//     </div>
//   );
// };

// const styles = {
//   container: {
//     display: 'flex',
//     justifyContent: 'center',
//     alignItems: 'center',
//     flexDirection: 'column',
//     padding: '20px',
//     backgroundColor: '#f4f7fc',
//   },
//   bookingCard: {
//     backgroundColor: 'white',
//     borderRadius: '8px',
//     boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
//     width: '100%',
//     maxWidth: '600px',
//     padding: '30px',
//     margin: '20px',
//   },
//   header: {
//     fontSize: '2rem',
//     fontWeight: 'bold',
//     color: '#333',
//     marginBottom: '20px',
//   },
// };

// export default BookingDetails;??