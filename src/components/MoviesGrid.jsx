import React from 'react';
import MovieCard from '@/components/MovieCard';

const MoviesGrid = ({ movies, userRatings, rateMovie }) => {
  if (movies.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-xl text-gray-400">No movies found. Try adjusting your search or filter.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {movies.map((movie, index) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          userRating={userRatings[movie.id] || 0}
          rateMovie={rateMovie}
          index={index}
          loading="lazy"
        />
      ))}
    </div>
  );
};

export default MoviesGrid;
