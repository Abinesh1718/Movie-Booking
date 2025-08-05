import React from 'react';
import { theaters } from '../data/theaters';

interface TheaterListProps {
  movieId: string;
}

const TheaterList: React.FC<TheaterListProps> = ({ movieId }) => {
  const filteredTheaters = theaters.filter((t) => t.movieId === movieId);

  if (filteredTheaters.length === 0) return <p>No theaters showing this movie.</p>;

  return (
    <ul>
      {filteredTheaters.map((theater) => (
        <li key={theater.id}>
          <strong>{theater.name}</strong> - {theater.showTime}
        </li>
      ))}
    </ul>
  );
};

export default TheaterList;
