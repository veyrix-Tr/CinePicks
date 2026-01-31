import '../styles/GenreFilter.css';

const GenreFilter = ({ genres, selectedGenre, onGenreSelect }) => {
  return (
    <div className="genre-filter">
      <div className="filter-container">
        {genres.map((genre) => (
          <button
            key={genre}
            className={`filter-btn ${selectedGenre === genre ? 'active' : ''}`}
            onClick={() => onGenreSelect(genre)}
          >
            {genre}
          </button>
        ))}
      </div>
    </div>
  );
};

export default GenreFilter;
