import { useState } from 'react';
import Header from './components/Header';
import GenreFilter from './components/GenreFilter';
import MovieList from './components/MovieList';
import { movies, genres } from './data/movies';
import './index.css';

function App() {
  const [selectedGenre, setSelectedGenre] = useState('All');

  const filteredMovies = selectedGenre === 'All' 
    ? movies 
    : movies.filter(movie => movie.genre === selectedGenre);

  return (
    <div className="app">
      <Header />
      <GenreFilter 
        genres={genres} 
        selectedGenre={selectedGenre} 
        onGenreSelect={setSelectedGenre} 
      />
      <MovieList movies={filteredMovies} />
    </div>
  );
}

export default App;
