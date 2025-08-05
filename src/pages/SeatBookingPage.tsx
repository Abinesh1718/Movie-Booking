import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { AuthContext } from '../context/AuthContext';
import { bookTickets, getAllBookings } from '../api-handler/api-call';
import Seat from '../components/Seat';
import DateSelector from '../components/DateSelector';

const SeatBookingPage: React.FC = () => {
  const navigate = useNavigate();
  const { theater, time, title } = useParams();

  //handle local state

  const movieTitle = decodeURIComponent(title || '');
  const [selectedTime, setSelectedTime] = useState(time || '');
  const [selectedSeats, setSelectedSeats] = useState<number[]>([]);
  const [bookedSeats, setBookedSeats] = useState<number[]>([]);
  const { isLoggedIn, setShowModal, selectedDate } = useContext(AuthContext);

  const availableTimings = ['10:30 AM', '1:30 PM', '4:00 PM', '7:00 PM'];
  const seats = Array.from({ length: 50 });


  const handleSeatSelect = (seatNumber: number, isSelected: boolean) => {
    setSelectedSeats((prev) =>
      isSelected ? [...prev, seatNumber] : prev.filter((s) => s !== seatNumber)
    );
  };

  //handle all Booking list
  const fetchBookedSeats = async () => {
    try {
      const res = await getAllBookings();
      const filtered = res?.bookings.filter(
        (b: any) =>
          b.movie === movieTitle &&
          b.theater === theater &&
          b.time === selectedTime &&
          new Date(b.date).toDateString() === new Date(selectedDate).toDateString()
      );
      const allSeats = filtered.flatMap((b: any) => b.seats);
      setBookedSeats(allSeats);
    } catch (error) {
      console.error('Error fetching booked seats:', error);
    }
  };



  // handle Payment Api call
  const handleContinue = async () => {
    if (!selectedTime) {
      toast.error('Please select a showtime before continuing.');
      return;
    }

    if (!isLoggedIn) {
      toast.error('Please login before booking');
      setShowModal(true);
      return;
    }

    const body = {
      movie: movieTitle,
      theater,
      time: selectedTime,
      seats: selectedSeats,
      date: selectedDate,
    };

    try {
      const res = await bookTickets(body);
      toast.success('Ticket booked successfully!');
      setTimeout(() => {
        navigate('/my-bookings');
      }, 500);
    } catch (error: any) {
      toast.error(error?.response?.data?.error?.errors?.[0]?.message || 'Booking failed.');
    }
  };


  // handle useeffect
  useEffect(() => {
    if (selectedTime && selectedDate) {
      fetchBookedSeats();
    }
  }, [selectedTime, selectedDate]);


  return (
    <div className="booking-container">
      <div className="booking-header">
        <h2>{theater} Theater</h2>
        <h3>🎬 Movie: {movieTitle}</h3>
        <p>Select Your Date & Seats</p>
      </div>
      <DateSelector />

      <div className="timing-options">
        {availableTimings.map((t) => (
          <button
            key={t}
            onClick={() => setSelectedTime(t)}
            className={`time-button ${t === selectedTime ? 'selected' : ''}`}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="screen-label">🎥 SCREEN</div>
      <div className="seats-grid">
        {seats.map((_, index) => {
          const seatNum = index + 1;
          const isBooked = bookedSeats.includes(seatNum);
          return (
            <Seat
              key={index}
              number={seatNum}
              onSelect={handleSeatSelect}
              disabled={isBooked}
            />
          );
        })}
      </div>

      <button
        className={`continue-button ${selectedSeats.length === 0 ? 'disabled' : ''}`}
        onClick={handleContinue}
        disabled={selectedSeats.length === 0}
      >
        {selectedSeats.length > 0
          ? `Pay ₹${selectedSeats.length * 150}`
          : 'Select seats to continue'}
      </button>
    </div>
  );
};

export default SeatBookingPage;
