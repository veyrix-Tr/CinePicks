import { useState } from 'react';
import Header from './components/Header';
import GenreFilter from './components/GenreFilter';
import MovieList from './components/MovieList';
import LiveBackground from './components/LiveBackground';
import { movies, genres } from './data/movies';
import Footer from './components/Footer';
import './index.css';

function App() {
  const [selectedGenre, setSelectedGenre] = useState('All');

  const filteredMovies = selectedGenre === 'All' 
    ? movies 
    : movies.filter(movie => movie.genre === selectedGenre);

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
        <MovieList movies={filteredMovies} />
      </div>
      
      <Footer />
    </div>
  );
}

export default App;
