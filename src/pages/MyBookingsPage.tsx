import React, { useEffect, useState, type ReactNode } from 'react';
import { getMyBookings } from '../api-handler/api-call';

interface Movie {
  date: string | number | Date;

  seats: number[];
  id: number;
  movie: string;
  time: string;
  theater: string
}
const MyBookingsPage: React.FC = () => {

  const [movies, setMovies] = useState<Movie[]>([]);

  const GetBooking = async () => {
    try {
      const res = await getMyBookings()
      setMovies(res)
      console.log(res)
    } catch (error) {
      console.log(error);
    }

  }

  useEffect(() => {
    GetBooking()
  }, [])



  return (
    <div className="bookings-container">
      <h2 className="bookings-title">📄 My Bookings</h2>

      {movies.length === 0 ? (
        <p className="no-bookings">You have no bookings yet.</p>
      ) : (
        movies?.map((booking, index) => (
          <div key={index} className="booking-card">
            <h3 className="movie-title">🎬 {booking?.movie}</h3>
            <p><strong>🏛️ Theater:</strong> {booking?.theater}</p>
            <p><strong>🕒 Time:</strong> {booking?.time}</p>
            <p><strong>📅 Date:</strong> {new Date(booking?.date).toDateString()}</p>
            <p><strong>💺 Seats:</strong> {booking?.seats.join(', ')}</p>
          </div>
        ))
      )}
    </div>

  );
};

export default MyBookingsPage;
