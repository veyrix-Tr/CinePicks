import '../styles/MovieCard.css';

const MovieCard = ({ movie }) => {
  const handleImageError = (e) => {
    e.target.src = 'https://picsum.photos/seed/fallback/300/450.jpg';
  };

  return (
    <div className="movie-card">
      <div className="movie-poster">
        <img 
          src={movie.poster} 
          alt={movie.title}
          onError={handleImageError}
          loading="lazy"
        />
      </div>
      <div className="movie-info">
        <h3 className="movie-title">{movie.title}</h3>
        <div className="movie-meta">
          <span className="genre-badge">{movie.genre}</span>
          <span className="year">{movie.year}</span>
        </div>
        <p className="movie-description">{movie.description}</p>
      </div>
    </div>
  );
};

export default MovieCard;
