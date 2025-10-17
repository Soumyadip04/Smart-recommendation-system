import React, { useState } from 'react';
import { PLACEHOLDER_IMAGE, PLACEHOLDER_IMAGES } from '@/lib/utils';
import { motion } from 'framer-motion';
import { Star, Heart } from 'lucide-react';

const StarRating = ({ movieId, userRating, onRate }) => (
  <div className="flex gap-1">
    {[1, 2, 3, 4, 5].map((rating) => (
      <button
        key={rating}
        onClick={() => onRate(movieId, rating)}
        className={`p-1 rounded-full transition-all duration-200 hover:scale-110 ${
          userRating >= rating
            ? 'text-yellow-400'
            : 'text-gray-500 hover:text-yellow-300'
        }`}
      >
        <Star 
          className={`w-6 h-6 ${userRating >= rating ? 'fill-current' : ''}`} 
        />
      </button>
    ))}
  </div>
);

const MovieCard = ({ movie, userRating, rateMovie, index }) => {
  const [imageError, setImageError] = useState(false);
  const [currentFallbackIndex, setCurrentFallbackIndex] = useState(0);
  const [imageLoading, setImageLoading] = useState(true);

  const handleImageError = (e) => {
    const el = e.currentTarget;
    
    // If we haven't tried all fallbacks yet
    if (currentFallbackIndex < PLACEHOLDER_IMAGES.length - 1) {
      setCurrentFallbackIndex(prev => prev + 1);
      el.src = PLACEHOLDER_IMAGES[currentFallbackIndex + 1];
      el.removeAttribute('srcset');
    } else {
      // Last resort - use the SVG fallback
      setImageError(true);
      el.src = PLACEHOLDER_IMAGES[PLACEHOLDER_IMAGES.length - 1];
      el.removeAttribute('srcset');
    }
    setImageLoading(false);
  };

  const handleImageLoad = () => {
    setImageLoading(false);
  };

  const getImageSrc = () => {
    if (!movie.image || imageError) {
      return PLACEHOLDER_IMAGES[currentFallbackIndex];
    }
    return movie.image;
  };

  const getSrcSet = () => {
    if (!movie.image || imageError) return undefined;
    
    if (movie.image.includes('picsum.photos')) {
      return `${movie.image.replace('/400/600', '/300/450')} 300w, ${movie.image.replace('/400/600', '/600/900')} 600w`;
    }
    
    if (movie.image.includes('unsplash.com')) {
      const baseUrl = movie.image.split('?')[0];
      return `${baseUrl}?w=300&h=450&fit=crop&auto=format&q=80 300w, ${baseUrl}?w=600&h=900&fit=crop&auto=format&q=80 600w`;
    }
    
    return undefined;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-700/50 hover:border-purple-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/20 hover:scale-105"
    >
      <div className="relative movie-image">
        {imageLoading && (
          <div className="absolute inset-0 bg-gray-800 animate-pulse flex items-center justify-center z-10">
            <div className="text-gray-400 text-sm">Loading...</div>
          </div>
        )}
        <img
          src={getImageSrc()}
          alt={movie.title}
          className={`w-full h-64 object-cover transition-opacity duration-300 ${
            imageLoading ? 'opacity-0' : 'opacity-100'
          }`}
          loading="lazy"
          srcSet={getSrcSet()}
          sizes="(max-width: 768px) 300px, 600px"
          onError={handleImageError}
          onLoad={handleImageLoad}
        />
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent px-3 py-2">
          <p className="text-sm font-semibold truncate">
            {movie.title}
          </p>
        </div>
        <div className="absolute top-3 right-3 bg-black/70 backdrop-blur-sm rounded-full px-2 py-1 flex items-center gap-1">
          <Star className="w-4 h-4 text-yellow-400 fill-current" />
          <span className="text-yellow-400 font-semibold text-sm">{movie.rating}</span>
        </div>
        {userRating > 0 && (
          <div className="absolute top-3 left-3 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full p-2">
            <Heart className="w-4 h-4 text-white fill-current" />
          </div>
        )}
      </div>
      
      <div className="p-6">
        <h3 className="font-bold text-white text-xl mb-2 truncate">{movie.title}</h3>
        <p className="text-purple-300 text-sm mb-2">{movie.genre} • {movie.year}</p>
        <p className="text-gray-300 text-sm mb-4 line-clamp-2 h-10">{movie.description}</p>
        
        <div className="space-y-3">
          <p className="text-white font-medium">Rate this movie:</p>
          <StarRating movieId={movie.id} userRating={userRating} onRate={rateMovie} />
          {userRating > 0 && (
            <p className="text-purple-300 text-sm">
              You rated this {userRating} star{userRating !== 1 ? 's' : ''}
            </p>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default MovieCard