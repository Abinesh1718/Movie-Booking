import React from 'react';
import DateSelector from '../components/DateSelector';
import TheaterCard from '../components/TheaterCard';
import { Empty } from 'antd';

const TheaterPage: React.FC<{ searchQuery: string }> = ({ searchQuery }) => {
  const theaterList = [
    {
      name: 'PVR Cinemas',
      timings: ['10:30 AM', '1:30 PM', '4:00 PM', '7:00 PM'],
    },
    {
      name: 'INOX',
      timings: ['10:30 AM', '1:30 PM', '4:00 PM', '7:00 PM'],
    },
    {
      name: 'Cinepolis',
      timings: ['10:30 AM', '1:30 PM', '4:00 PM', '7:00 PM'],
    },
  ];

  const filteredTheaters = theaterList.filter((theater) =>
    theater.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div style={{ minHeight: 'calc(100vh - 150px)', padding: '20px 40px' }}>
      <DateSelector />
      <h2 style={{ margin: '20px 10px' }}>Available Theaters</h2>

      {filteredTheaters.length > 0 ? (
        filteredTheaters.map((theater, idx) => (
          <TheaterCard key={idx} name={theater.name} timings={theater.timings} />
        ))
      ) : (
        <div style={{ marginTop: '50px', textAlign: 'center' }}>
          <Empty
            description={<span style={{ color: '#272727' }}>No theaters found matching your search</span>}
          />
        </div>
      )}
    </div>
  );
};

export default TheaterPage;
