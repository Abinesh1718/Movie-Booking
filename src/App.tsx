import React, { useEffect, useContext, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Dashboard from './pages/Dashboard';
import { AuthProvider, AuthContext } from './context/AuthContext';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Footer from './components/Footer';
import TheaterPage from './pages/TheaterPage';
import SeatBookingPage from './pages/SeatBookingPage';
import MyBookingsPage from './pages/MyBookingsPage';
import { Toaster } from 'react-hot-toast';
import 'antd/dist/reset.css';



const RouteChangeHandler: React.FC = () => {
  const location = useLocation();
  const { setUsername } = useContext(AuthContext);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUsername(JSON.parse(storedUser));
    } else {
      setUsername(null);
    }
  }, [location.pathname]);

  return null;
};

const App: React.FC = () => {
  const [searchQuery, setSearchQuery] =useState<string>('');

  return (
    <AuthProvider>
      <Router>
        <RouteChangeHandler />
        <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        <Routes>
          <Route path="/" element={<Dashboard searchQuery={searchQuery} />} />
          <Route path="/theaters/:title" element={<TheaterPage searchQuery={searchQuery} />} />
          <Route path="/my-bookings" element={<MyBookingsPage />} />
          <Route path="/seats/:theater/:time/:title" element={<SeatBookingPage />} />
        </Routes>
        <Footer />
        <Toaster position="top-right" reverseOrder={false} />
      </Router>
    </AuthProvider>
  );
};

export default App;
