import React from 'react';
import '../styles/MovieDetail.css';

const MovieDetail = ({ movie, onClose }) => {
  if (!movie) return null;

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleEscape = (e) => {
    if (e.key === 'Escape') {
      onClose();
    }
  };

  React.useEffect(() => {
    document.addEventListener('keydown', handleEscape);
    
    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, []);

  return (
    <div className="movie-detail-overlay" onClick={handleBackdropClick}>
      <div className="movie-detail-panel">
        <button className="close-button" onClick={onClose} aria-label="Close movie details">
          ✕
        </button>
        
        <div className="movie-detail-content">
          <div className="movie-poster-section">
            <img 
              src={movie.poster} 
              alt={movie.title}
              className="detail-poster"
              onError={(e) => {
                e.target.src = 'https://picsum.photos/seed/fallback/400/600.jpg';
              }}
            />
          </div>
          
          <div className="movie-info-section">
            <h1 className="detail-title">{movie.title}</h1>
            
            <div className="detail-meta">
              <span className="detail-genre">{movie.genre}</span>
              <span className="detail-year">{movie.year}</span>
            </div>
            
            <div className="detail-description">
              <h3>About</h3>
              <p>{movie.description}</p>
            </div>
            
            <div className="detail-actions">
              <a 
                href="https://www.netflix.com/search?q=${encodeURIComponent(movie.title)}" 
                target="_blank" 
                rel="noopener noreferrer"
                className="action-button primary"
              >
                Watch on Netflix
              </a>
              <div className="streaming-links">
                <span className="streaming-label">Also available on:</span>
                <div className="streaming-services">
                  <a 
                    href={`https://www.primevideo.com/search/?phrase=${encodeURIComponent(movie.title)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="streaming-link prime"
                  >
                    Prime Video
                  </a>
                  <a 
                    href={`https://www.disneyplus.com/search/${encodeURIComponent(movie.title)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="streaming-link disney"
                  >
                    Disney+
                  </a>
                  <a 
                    href={`https://www.hulu.com/search?q=${encodeURIComponent(movie.title)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="streaming-link hulu"
                  >
                    Hulu
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;
