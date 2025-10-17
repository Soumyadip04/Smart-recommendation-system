export const generateRecommendations = (userRatings, allMovies) => {
    const ratedMovieIds = Object.keys(userRatings).map(id => parseInt(id));
    const unratedMovies = allMovies.filter(movie => !ratedMovieIds.includes(movie.id));
    
    if (ratedMovieIds.length === 0) return [];
  
    const ratingSum = {};
    const ratingCount = {};
  
    ratedMovieIds.forEach(movieId => {
      const movie = allMovies.find(m => m.id === movieId);
      const rating = userRatings[movieId];
      
      if (movie) {
        if (!ratingSum[movie.genre]) {
          ratingSum[movie.genre] = 0;
          ratingCount[movie.genre] = 0;
        }
        ratingSum[movie.genre] += rating;
        ratingCount[movie.genre]++;
      }
    });
  
    const avgGenreRatings = {};
    Object.keys(ratingSum).forEach(genre => {
      avgGenreRatings[genre] = ratingSum[genre] / ratingCount[genre];
    });
  
    const scoredMovies = unratedMovies.map(movie => {
      let score = movie.rating / 10;
      
      if (avgGenreRatings[movie.genre]) {
        const genreBoost = avgGenreRatings[movie.genre] / 5;
        score += genreBoost * 0.5;
      }
      
      score += Math.random() * 0.1;
      
      return { ...movie, score };
    });
  
    return scoredMovies
      .sort((a, b) => b.score - a.score)
      .slice(0, 6);
  };