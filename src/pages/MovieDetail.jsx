import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchMovieDetails } from '../api/tmdb';

const MovieDetail = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Artificial delay for skeleton visibility
    const delayTimer = setTimeout(() => {
      const loadMovie = async () => {
        try {
          const data = await fetchMovieDetails(id);
          setMovie(data);
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };
      loadMovie();
    }, 1500); // 1.5 second delay

    return () => clearTimeout(delayTimer);
  }, [id]);

  if (loading) {
    return (
      <div className="container">
        <div className="movie-detail-skeleton">
          <div className="skeleton-poster"></div>
          <div className="skeleton-info">
            <div className="skeleton-title"></div>
            <div className="skeleton-meta"></div>
            <div className="skeleton-text"></div>
            <div className="skeleton-text" style={{ width: '80%' }}></div>
            <div className="skeleton-text" style={{ width: '60%' }}></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <h2>Error Loading Movie</h2>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="movie-detail">
        <div className="detail-poster">
          <img 
            src={movie.poster} 
            alt={movie.title}
            onError={(e) => {
              e.target.src = 'https://via.placeholder.com/500x750?text=Poster+Not+Available';
            }}
          />
        </div>
        <div className="detail-info">
          <h1>{movie.title} <span>({movie.year})</span></h1>
          <div className="meta">
            <span>⭐ {movie.rating}/10</span>
            <span>⏱️ {movie.duration}</span>
            <span>🎭 {movie.genre}</span>
          </div>
          <h3>Director: {movie.director}</h3>
          <p>{movie.plot}</p>
        </div>

        {movie.trailer ? (
          <div className="trailer-section">
            <h2>Trailer: {movie.trailer.name}</h2>
            <div className="trailer-container">
              <iframe
                src={`https://www.youtube.com/embed/${movie.trailer.youtubeKey}?autoplay=0&rel=0`}
                title={`${movie.title} Trailer`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        ) : (
          <div className="no-trailer">
            <p>No trailer available for this movie</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MovieDetail;