import { useCallback, useEffect, useMemo, useState } from 'react';
import { loadFromStorage, saveToStorage } from '@/lib/utils';
import { SAMPLE_MOVIES } from '@/data/movies';

const STORAGE_KEY = 'movies:data';

export function useMovies() {
  const [movies, setMovies] = useState(() => loadFromStorage(STORAGE_KEY, SAMPLE_MOVIES));

  useEffect(() => {
    saveToStorage(STORAGE_KEY, movies);
  }, [movies]);

  const findById = useCallback((id) => movies.find(m => m.id === Number(id)) || null, [movies]);

  const validate = useCallback((movie) => {
    const errors = {};
    if (!movie.title?.trim()) errors.title = 'Title is required';
    if (!movie.genre?.trim()) errors.genre = 'Genre is required';
    const year = Number(movie.year);
    const current = new Date().getFullYear();
    if (!year || year < 1900 || year > current) errors.year = `Year must be 1900–${current}`;
    const rating = Number(movie.rating);
    if (Number.isNaN(rating) || rating < 0 || rating > 10) errors.rating = 'Rating must be 0–10';
    try {
      // Basic URL validation
      // eslint-disable-next-line no-new
      new URL(movie.image);
    } catch {
      errors.image = 'Image URL is invalid';
    }
    if (!movie.description?.trim()) errors.description = 'Description is required';
    return errors;
  }, []);

  const addMovie = useCallback((movie) => {
    const errors = validate(movie);
    if (Object.keys(errors).length) return { ok: false, errors };
    setMovies(prev => {
      const nextId = prev.length ? Math.max(...prev.map(m => m.id)) + 1 : 1;
      return [...prev, { ...movie, id: nextId }];
    });
    return { ok: true };
  }, [validate]);

  const editMovie = useCallback((id, updates) => {
    const errors = validate({ ...findById(id), ...updates });
    if (Object.keys(errors).length) return { ok: false, errors };
    setMovies(prev => prev.map(m => (m.id === Number(id) ? { ...m, ...updates, id: m.id } : m)));
    return { ok: true };
  }, [findById, validate]);

  const deleteMovie = useCallback((id) => {
    setMovies(prev => prev.filter(m => m.id !== Number(id)));
  }, []);

  const genres = useMemo(() => ['All', ...new Set(movies.map(m => m.genre))], [movies]);

  return { movies, setMovies, findById, addMovie, editMovie, deleteMovie, genres, validate };
}


