import React from 'react';
import '../styles/Footer.css';
import { FaGithub, FaTwitter, FaFilm, FaHeart } from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <div className="footer-logo">
            <FaFilm className="logo-icon" />
            <span>CinePicks</span>
          </div>
          <p className="footer-tagline">Discover your next favorite movie</p>
          <div className="social-links">
            <a href="https://github.com/veyrix-Tr" target="_blank" rel="noopener noreferrer">
              <FaGithub />
            </a>
            <a href="https://x.com/veyrix_Tr" target="_blank" rel="noopener noreferrer">
              <FaTwitter />
            </a>
          </div>
        </div>
        
        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/movies">All Movies</a></li>
            <li><a href="/genres">Genres</a></li>
          </ul>
        </div>
        
        <div className="footer-section">
          <h4>Legal</h4>
          <ul>
            <li><a href="https://github.com/veyrix-Tr/cinepicks/blob/main/PRIVACY.md" target="_blank" rel="noopener noreferrer">Privacy Policy</a></li>
            <li><a href="https://github.com/veyrix-Tr/cinepicks/blob/main/TERMS.md" target="_blank" rel="noopener noreferrer">Terms of Service</a></li>
            <li><a href="https://github.com/veyrix-Tr/cinepicks/blob/main/COOKIE_POLICY.md" target="_blank" rel="noopener noreferrer">Cookie Policy</a></li>
          </ul>
        </div>
        
        <div className="footer-section about-section">
          <h4>About</h4>
          <p>Made with <FaHeart className="heart-icon" /> by 
            <a href="https://github.com/veyrix-Tr" target="_blank" rel="noopener noreferrer">
              Veyrix-Tr 
              <span>(Chirag Goyal)</span>
            </a>
          </p>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>&copy; {currentYear} CinePicks. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
