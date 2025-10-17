import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Play, Sparkles, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PLACEHOLDER_IMAGE } from '@/lib/utils';
import { useToast } from '@/components/ui/use-toast';
import { useNavigate } from 'react-router-dom';

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
          className={`w-5 h-5 ${userRating >= rating ? 'fill-current' : ''}`} 
        />
      </button>
    ))}
  </div>
);


const RecommendationCard = ({ movie, index, rateMovie, userRating }) => {
  const { toast } = useToast();
  const navigate = useNavigate();
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -20, scale: 0.95 }}
      transition={{ delay: index * 0.1, duration: 0.3 }}
      className="bg-gradient-to-br from-purple-800/60 to-blue-800/60 backdrop-blur-sm rounded-xl p-4 border border-purple-500/30 hover:border-purple-400/50 transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/25"
    >
      <div className="flex items-start gap-4">
        <div className="relative flex-shrink-0">
          <img 
            className="w-24 h-36 object-cover rounded-lg shadow-lg"
            alt={movie.title}
            src={movie.image || PLACEHOLDER_IMAGE}
            loading="lazy"
            decoding="async"
            srcSet={movie.image && movie.image.includes('picsum.photos') ? `${movie.image.replace('/400/600', '/240/360')} 240w, ${movie.image.replace('/400/600', '/480/720')} 480w` : movie.image ? `${movie.image.split('?')[0]}?w=240&h=360&fit=crop&auto=format&q=80 240w, ${movie.image.split('?')[0]}?w=480&h=720&fit=crop&auto=format&q=80 480w` : undefined}
            sizes="96px"
            onError={(e)=>{ const el=e.currentTarget; if(!el.dataset.fallback){ el.dataset.fallback='1'; el.src=PLACEHOLDER_IMAGE; el.removeAttribute('srcset'); }}}
          />
          {userRating > 0 && (
            <div className="absolute -top-2 -left-2 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full p-1.5 shadow-lg">
              <Heart className="w-4 h-4 text-white fill-current" />
            </div>
          )}
        </div>

        <div className="flex-1">
          <h3 className="font-bold text-white text-lg leading-tight mb-1">{movie.title}</h3>
          <p className="text-purple-300 text-xs mb-2">{movie.genre} • {movie.year}</p>
          <p className="text-gray-300 text-sm mb-3 line-clamp-2">{movie.description}</p>
          
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 text-yellow-400 fill-current" />
              <span className="text-yellow-400 font-semibold">{movie.rating}</span>
            </div>
            <Button
              size="sm"
              onClick={() => navigate(`/movie/${movie.id}`)}
              className="bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 text-xs px-2 py-1 h-auto"
            >
              <Play className="w-3 h-3 mr-1" />
              Details
            </Button>
          </div>

          <div className="space-y-1">
            <p className="text-white text-xs font-medium">Rate it:</p>
            <StarRating movieId={movie.id} userRating={userRating} onRate={rateMovie} />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const Recommendations = ({ recommendations, showRecommendations, setShowRecommendations, rateMovie, userRatings }) => (
  <motion.div
    layout
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.3 }}
    className="mb-12 bg-black/20 p-6 rounded-2xl border border-white/10"
  >
    <div className="flex items-center justify-between mb-6">
      <div className="flex items-center gap-3">
        <Sparkles className="w-8 h-8 text-yellow-400 animate-pulse" />
        <h2 className="text-3xl font-bold text-white">Recommended for You</h2>
      </div>
      <Button
        onClick={() => setShowRecommendations(!showRecommendations)}
        className="bg-gradient-to-r from-yellow-500 to-orange-600 hover:from-yellow-600 hover:to-orange-700"
      >
        {showRecommendations ? 'Hide' : 'Show'}
      </Button>
    </div>

    <AnimatePresence>
      {showRecommendations && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {recommendations.length > 0 ? recommendations.map((movie, index) => (
            <RecommendationCard 
              key={movie.id} 
              movie={movie} 
              index={index} 
              rateMovie={rateMovie}
              userRating={userRatings[movie.id] || 0}
            />
          )) : (
            <p className="text-center col-span-full text-gray-400">Rate more movies to see recommendations here!</p>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  </motion.div>
);

export default Recommendations;