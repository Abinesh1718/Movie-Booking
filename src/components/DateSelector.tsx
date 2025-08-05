import React, { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';

const DateSelector: React.FC = () => {
  const { selectedDate, setSelectedDate } = useContext(AuthContext);

  // Handle Date List
  const today = new Date();
  const days = Array.from({ length: 6 }, (_, i) => {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    return date.toISOString().split('T')[0];
  });

  return (
    <div style={{ display: 'flex', gap: '10px', overflowX: 'auto', marginBottom: '20px' }}>
      {days.map((day, idx) => (
        <button
          key={idx}
          onClick={() => setSelectedDate(day)}
          style={{
            padding: '10px 16px',
            borderRadius: '8px',
            background: selectedDate === day ? '#007bff' : '#eee',
            color: selectedDate === day ? '#fff' : '#333',
            border: 'none',
            cursor: 'pointer',
            whiteSpace: 'nowrap',
          }}
        >
          {day}
        </button>
      ))}
    </div>
  );
};

export default DateSelector;
