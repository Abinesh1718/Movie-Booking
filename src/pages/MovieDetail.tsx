import React from 'react';
import { useParams } from 'react-router-dom';
import { movies } from '../data/movies';
import TheaterList from '../components/TheaterList';

const MovieDetail: React.FC = () => {
  const { id } = useParams();
  const movie = movies.find((m) => m.id === id);

  if (!movie) return <p>Movie not found</p>;

  return (
    <div>
      <h2>{movie.title}</h2>
      <img src={movie.poster} alt={movie.title} style={{ width: '250px', borderRadius: '10px' }} />
      <h3>Theaters Playing</h3>
      <TheaterList movieId={movie.id} />
    </div>
  );
};

export default MovieDetail;
