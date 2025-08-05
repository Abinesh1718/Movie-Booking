import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="footer-container">
      <div className="footer-contact">
        📍 Chennai, India &nbsp; | &nbsp;
        📞 +91 98765 43210 &nbsp; | &nbsp;
        📧 support@bookmymovie.com
      </div>
      <div className="footer-copy">© {new Date().getFullYear()} Book My Movie. All rights reserved.</div>
    </footer>
  );
};

export default Footer;
