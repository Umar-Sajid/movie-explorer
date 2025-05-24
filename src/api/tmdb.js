import axios from 'axios';

const API_KEY = process.env.REACT_APP_TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';

const tmdb = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: API_KEY,
    language: 'en-US',
  },
  timeout: 10000,
});

export const fetchPopularMovies = async () => {
  try {
    const { data } = await tmdb.get('/movie/popular');
    return data.results.map(movie => ({
      id: movie.id,
      title: movie.title,
      year: movie.release_date?.split('-')[0] || 'N/A',
      poster: movie.poster_path 
        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
        : 'https://via.placeholder.com/500x750?text=No+Poster',
      rating: movie.vote_average,
    }));
  } catch (error) {
    console.error("Error fetching popular movies:", error);
    throw error;
  }
};

export const searchMovies = async (query) => {
  try {
    const { data } = await tmdb.get('/search/movie', {
      params: {
        query: query,
        include_adult: false,
      },
    });
    return data.results.map(movie => ({
      id: movie.id,
      title: movie.title,
      year: movie.release_date?.split('-')[0] || 'N/A',
      poster: movie.poster_path 
        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
        : 'https://via.placeholder.com/500x750?text=No+Poster',
      rating: movie.vote_average,
    }));
  } catch (error) {
    console.error("Search error:", error);
    throw error;
  }
};

export const fetchMovieDetails = async (id) => {
  try {
    const { data } = await tmdb.get(`/movie/${id}`, {
      params: {
        append_to_response: 'credits,videos'
      }
    });

    const trailer = data.videos.results.find(v => 
      v.type === "Trailer" && v.site === "YouTube"
    );

    return {
      id: data.id,
      title: data.title,
      year: data.release_date?.split('-')[0] || 'N/A',
      rating: data.vote_average,
      duration: `${Math.floor(data.runtime / 60)}h ${data.runtime % 60}m`,
      genre: data.genres?.map(g => g.name).join(', ') || 'N/A',
      director: data.credits.crew?.find(c => c.job === 'Director')?.name || 'Unknown',
      plot: data.overview || 'No overview available.',
      poster: data.poster_path
        ? `https://image.tmdb.org/t/p/w500${data.poster_path}`
        : 'https://via.placeholder.com/500x750?text=No+Poster',
      trailer: trailer ? {
        youtubeKey: trailer.key,
        name: trailer.name
      } : null
    };
  } catch (error) {
    console.error("Error fetching movie details:", error);
    throw error;
  }
};