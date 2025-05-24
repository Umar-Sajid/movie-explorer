import React from 'react';

const MovieCardSkeleton = () => {
  return (
    <div className="movie-card-skeleton">
      <div className="poster-skeleton"></div>
      <div className="info-skeleton">
        <div className="title-skeleton"></div>
        <div className="year-skeleton"></div>
      </div>
    </div>
  );
};

export default MovieCardSkeleton;