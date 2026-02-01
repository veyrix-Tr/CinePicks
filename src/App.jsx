import { useState } from 'react';
import Header from './components/Header';
import GenreFilter from './components/GenreFilter';
import MovieList from './components/MovieList';
import MovieDetail from './components/MovieDetail';
import LiveBackground from './components/LiveBackground';
import { movies, genres } from './data/movies';
import Footer from './components/Footer';
import './index.css';

function App() {
  const [selectedGenre, setSelectedGenre] = useState('All');
  const [selectedMovie, setSelectedMovie] = useState(null);

  const filteredMovies = selectedGenre === 'All' 
    ? movies 
    : movies.filter(movie => movie.genre === selectedGenre);

  const handleMovieClick = (movie) => {
    setSelectedMovie(movie);
  };

  const handleCloseDetail = () => {
    setSelectedMovie(null);
  };

  return (
    <div className="app">
      <LiveBackground />

      <div className="app-content">
        <Header />
        <GenreFilter 
          genres={genres} 
          selectedGenre={selectedGenre} 
          onGenreSelect={setSelectedGenre} 
        />
        <MovieList movies={filteredMovies} onMovieClick={handleMovieClick} />
      </div>
      
      <Footer />
      <MovieDetail movie={selectedMovie} onClose={handleCloseDetail} />
    </div>
  );
}

export default App;
