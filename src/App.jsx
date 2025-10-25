import React, { useState, useEffect, useMemo } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Film } from 'lucide-react';

import { Toaster } from '@/components/ui/toaster';
import Header from '@/components/Header';
import SearchAndFilter from '@/components/SearchAndFilter';
import Recommendations from '@/components/Recommendations';
import MoviesGrid from '@/components/MoviesGrid';
import GettingStarted from '@/components/GettingStarted';

import { useMovieRatings } from '@/hooks/useMovieRatings';
import { generateRecommendations } from '@/lib/recommendation';
import { SAMPLE_MOVIES } from '@/data/movies';
import { loadFromStorage, saveToStorage } from '@/lib/utils';

function App() {
  const { userRatings, rateMovie } = useMovieRatings();
  const [recommendations, setRecommendations] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [showRecommendations, setShowRecommendations] = useState(true);
  const [movies, setMovies] = useState(() => loadFromStorage('movies:data', SAMPLE_MOVIES));

  // Migrate old Unsplash image URLs in localStorage to reliable picsum.photos
  useEffect(() => {
    setMovies(prev => {
      const needsMigration = Array.isArray(prev) && prev.some(m => typeof m.image === 'string' && m.image.includes('unsplash.com'));
      if (!needsMigration) return prev;
      return prev.map(m => {
        if (typeof m.image === 'string' && m.image.includes('unsplash.com')) {
          return { ...m, image: `https://picsum.photos/seed/${m.id}/400/600` };
        }
        return m;
      });
    });
  }, []);

  const genres = useMemo(() => ['All', ...new Set(movies.map(m => m.genre))], [movies]);

  useEffect(() => {
    saveToStorage('movies:data', movies);
  }, [movies]);

  useEffect(() => {
    if (Object.keys(userRatings).length > 0) {
      const recs = generateRecommendations(userRatings, movies);
      setRecommendations(recs);
      setShowRecommendations(true);
    } else {
      setRecommendations([]);
      setShowRecommendations(false);
    }
  }, [userRatings, movies]);

  const filteredMovies = useMemo(() => {
    return movies.filter(movie => {
      const matchesGenre = selectedGenre === 'All' || movie.genre === selectedGenre;
      const matchesSearch = movie.title.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesGenre && matchesSearch;
    });
  }, [selectedGenre, searchQuery, movies]);

  const hasRatings = Object.keys(userRatings).length > 0;

  const handleAddMovie = (movie) => {
    setMovies(prev => {
      const nextId = prev.length ? Math.max(...prev.map(m => m.id)) + 1 : 1;
      return [...prev, { ...movie, id: nextId }];
    });
  };

  return (
    <>
      <Helmet>
        <title>CineMatch - Personalized Movie Recommendations</title>
        <meta name="description" content="Get personalized movie recommendations based on your preferences. Rate movies, search for your favorites, and discover new films tailored to your taste." />
        <meta property="og:title" content="CineMatch - Personalized Movie Recommendations" />
        <meta property="og:description" content="Get personalized movie recommendations based on your preferences. Rate movies, search for your favorites, and discover new films tailored to your taste." />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white">
        <div className="container mx-auto px-4 py-8">
          <Header onAddMovie={handleAddMovie} />

          <SearchAndFilter
            genres={genres}
            selectedGenre={selectedGenre}
            setSelectedGenre={setSelectedGenre}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
          
          {hasRatings && (
            <Recommendations 
              recommendations={recommendations}
              showRecommendations={showRecommendations}
              setShowRecommendations={setShowRecommendations}
              rateMovie={rateMovie}
              userRatings={userRatings}
            />
          )}

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-12"
          >
            <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
              <Film className="w-8 h-8 text-purple-400" />
              Rate Movies to Get Recommendations
            </h2>
            
            <MoviesGrid
              movies={filteredMovies}
              userRatings={userRatings}
              rateMovie={rateMovie}
            />
          </motion.div>

          {!hasRatings && <GettingStarted />}
        </div>
        
        <Toaster />
      </div>
    </>
  );
}

export default App;