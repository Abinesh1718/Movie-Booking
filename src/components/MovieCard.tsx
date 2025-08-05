import React from 'react';

interface Props {
  id: string;
  title: string;
  poster: string;
  onClick?: () => void;
}

const MovieCard: React.FC<Props> = ({ title, poster, onClick }) => {
  return (
    <div
      onClick={onClick}
      style={{
        padding: '10px',
        textAlign: 'center',
        cursor: 'pointer',
        width: '100%',
      }}
    >
      <img
        src={poster}
        alt={title}
        style={{
          width: '100%',
          height: '330px',
          borderRadius: '10px',
          objectFit: 'cover',
          boxShadow: '0 2px 10px rgba(0,0,0,0.15)',
        }}
      />
      <p style={{ marginTop: '10px', fontWeight: 'bold' }}>{title}</p>
    </div>
  );
};

export default MovieCard;
