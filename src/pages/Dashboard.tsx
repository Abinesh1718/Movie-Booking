import React from 'react';
import Slider from 'react-slick';
import { movies } from '../data/movies';
import MovieCard from '../components/MovieCard';
import { useNavigate } from 'react-router-dom';
import { Empty } from 'antd';

const Dashboard: React.FC<{ searchQuery: string }> = ({ searchQuery }) => {
  const navigate = useNavigate();

  // handle movie  filter 
  const nowShowing = movies.slice(0, 6).filter((movie) =>
    movie.title.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const recommended = movies.slice(6).filter((movie) =>
    movie.title.toLowerCase().includes(searchQuery.toLowerCase())
  );


  // handle slider config
  const sliderSettings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: true,
    useTransform: true,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 3 } },
      { breakpoint: 768, settings: { slidesToShow: 2 } },
      { breakpoint: 480, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <div style={{ padding: '20px 40px', maxWidth: '1200px', margin: '0 auto' }}>
      <section style={{ marginBottom: '40px' }}>
        <h2 style={{ fontSize: '24px', marginBottom: '15px' }}>🎬 Now Showing</h2>
        {nowShowing.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '40px 0' }}>
            <Empty description="No movies found in Now Showing" />
          </div>
        ) : (
          <Slider {...sliderSettings}>
            {nowShowing.map((movie) => (
              <MovieCard
                key={movie.id}
                {...movie}
                onClick={() => navigate(`/theaters/${movie?.title}`)}
              />
            ))}
          </Slider>
        )}
      </section>
      <section>
        <h2 style={{ fontSize: '24px', marginBottom: '15px' }}>⭐ Recommended</h2>
        {recommended.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '40px 0' }}>
            <Empty description="No recommended movies found" />
          </div>
        ) : (
          <Slider {...sliderSettings}>
            {recommended.map((movie) => (
              <MovieCard
                key={movie.id}
                {...movie}
                onClick={() => navigate(`/theaters/${movie?.title}`)}
              />
            ))}
          </Slider>
        )}
      </section>
    </div>
  );
};

export default Dashboard;
