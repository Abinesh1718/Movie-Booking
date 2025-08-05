import React, { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import SignInModal from './SignInModal';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { LogoutOutlined, LoginOutlined, FileTextOutlined, UserOutlined } from '@ant-design/icons';


interface HeaderProps {
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
}


const Header: React.FC<HeaderProps> = ({ searchQuery, setSearchQuery }) => {
  const { isLoggedIn, username, setShowModal, showModal, setUsername } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();


  //handle current path condition
  const path = location.pathname;
  const isDashboard = path === '/';
  const isTheaterPage = path.startsWith('/theaters/');
  const showSearch = isDashboard || isTheaterPage;


  // Handle Logout function
  const handleLogout = () => {
    setUsername(null);
    localStorage.removeItem('user');
    navigate('/');
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };


  return (
    <>
      <header
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          padding: '10px 20px',
          background: '#111',
          color: 'white',
          alignItems: 'center',
        }}
      >
        <div style={{ fontWeight: 'bold', fontSize: '22px', cursor: 'pointer' }} onClick={() => navigate('/')}>
          🎟️ Book My Movie
        </div>

        {showSearch && (
          <input
            type="text"
            placeholder={`Search ${isDashboard ? 'movies' : 'theaters'}...`}
            value={searchQuery}
            onChange={handleSearch}
            style={{
              width: '300px',
              padding: '6px 10px',
              borderRadius: '6px',
              border: 'none',
              color: '#272727'
            }}
          />
        )}

        <div>
          {isLoggedIn && username ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', }}>
              <Link to="/my-bookings" style={{ color: 'white', textDecoration: 'none' }}>📄 My Bookings</Link>
              <span>Welcome, {username.user}</span>
              <button
                onClick={handleLogout}
                style={{
                  padding: '6px 12px',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  backgroundColor: '#dc3545',
                  color: 'white',
                  border: 'none',
                  transition: '0.2s ease'
                }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#c82333')}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#dc3545')}
              >
                <LogoutOutlined />
                Logout
              </button>
            </div>
          ) : (
            <button
              onClick={() => setShowModal(true)}
              style={{
                padding: '6px 12px',
                borderRadius: '6px',
                cursor: 'pointer',
                backgroundColor: '#007bff',
                color: 'white',
                border: 'none',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#0056b3')}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#007bff')}
            >
              <LoginOutlined />
              Sign In
            </button>


          )}
        </div>
      </header >

      <SignInModal isOpen={showModal} onClose={() => setShowModal(false)} />
    </>
  );
};

export default Header;
