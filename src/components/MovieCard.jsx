import { Link } from 'react-router-dom';

const MovieCard = ({ id, title, year, poster, rating }) => {
  return (
    <Link to={`/movies/${id}`} className="movie-card">
      <div className="poster-container">
        <img 
          src={poster} 
          alt={title} 
          className="movie-poster"
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/500x750?text=Poster+Not+Available';
          }}
        />
        <div className="movie-rating">{rating?.toFixed(1)}</div>
      </div>
      <div className="movie-info">
        <h3 className="movie-title">{title}</h3>
        <p className="movie-year">{year} 
        {rating && <span className="trailer-hint">| ▶️ Trailer</span>}</p>
      </div>
    </Link>
  );
};

export default MovieCard;