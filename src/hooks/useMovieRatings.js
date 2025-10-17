import { useState, useEffect } from 'react';
import { useToast } from '@/components/ui/use-toast';

export function useMovieRatings() {
  const [userRatings, setUserRatings] = useState({});
  const { toast } = useToast();

  useEffect(() => {
    try {
      const savedRatings = localStorage.getItem('movieRatings');
      if (savedRatings) {
        setUserRatings(JSON.parse(savedRatings));
      }
    } catch (error) {
      console.error("Failed to parse movie ratings from localStorage", error);
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('movieRatings', JSON.stringify(userRatings));
    } catch (error) {
      console.error("Failed to save movie ratings to localStorage", error);
    }
  }, [userRatings]);

  const rateMovie = (movieId, rating) => {
    setUserRatings(prev => ({
      ...prev,
      [movieId]: rating
    }));
    toast({
      title: "Rating saved! ⭐",
      description: "Your preference helps us find better recommendations for you.",
    });
  };

  return { userRatings, rateMovie };
}
