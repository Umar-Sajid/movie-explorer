import { useState, useEffect } from 'react';
import MovieCard from '../components/MovieCard';
import MovieCardSkeleton from '../components/MovieCardSkeleton';
import SearchBar from '../components/SearchBar';
import { fetchPopularMovies } from '../api/tmdb';

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Artificial delay for skeleton visibility
    const delayTimer = setTimeout(async () => {
      try {
        const data = await fetchPopularMovies();
        setMovies(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }, 1500); // 1.5-second delay

    return () => clearTimeout(delayTimer); // Cleanup
  }, []);

  const handleSearchResults = (results) => {
    setMovies(results);
  };

  return (
    <div className="container">
      <div className="search-header">
        <h1 className="page-title">Popular Movies</h1>
        <SearchBar onSearchResults={handleSearchResults} />
      </div>
      
      <div className="movie-grid">
        {loading ? (
          Array(8).fill().map((_, index) => (
            <MovieCardSkeleton key={`skeleton-${index}`} />
          ))
        ) : (
          movies.map(movie => (
            <MovieCard
              key={movie.id}
              id={movie.id}
              title={movie.title}
              year={movie.year}
              poster={movie.poster}
              rating={movie.rating}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default Home;