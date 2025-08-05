import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

interface Props {
  name: string;
  timings: string[];
}

const TheaterCard: React.FC<Props> = ({ name, timings }) => {
  const { title } = useParams();
  const navigate = useNavigate();
  return (
    <div
      style={{
        background: '#f9f9f9',
        padding: '30px',
        marginBottom: '20px',
        borderRadius: '10px',
        boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
        width: '90%',
        marginLeft: '44px'
      }}
    >
      <h3 style={{ marginBottom: '10px' }}>{name}</h3>
      <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
        {timings.map((time, idx) => (
          <button
            key={idx}
            onClick={() => navigate(`/seats/${name}/${time}/${title}`)}
            style={{
              padding: '8px 12px',
              background: '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
            }}
          >
            {time}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TheaterCard;
