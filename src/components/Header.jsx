import React, { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Film, Moon, Sun } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { loadFromStorage, saveToStorage } from '@/lib/utils';
import { useAdmin } from '@/hooks/useAdmin';

const Header = ({ onAddMovie }) => {
  const { toast } = useToast();
  const location = useLocation();
  const [theme, setTheme] = useState(() => (localStorage.getItem('theme') || 'dark'));

  React.useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') root.classList.add('dark'); else root.classList.remove('dark');
    localStorage.setItem('theme', theme);
  }, [theme]);
  const { isAdmin } = useAdmin();

  const [newMovie, setNewMovie] = useState({ title: '', genre: '', year: '', rating: '', image: '', description: '' });
  const canSubmitMovie = useMemo(() => {
    const { title, genre, year, rating, image, description } = newMovie;
    return Boolean(title && genre && year && rating && image && description);
  }, [newMovie]);



  const submitNewMovie = (e) => {
    e.preventDefault();
    if (!canSubmitMovie) return;
    const payload = {
      ...newMovie,
      year: Number(newMovie.year),
      rating: Number(newMovie.rating),
    };
    onAddMovie(payload);
    setNewMovie({ title: '', genre: '', year: '', rating: '', image: '', description: '' });
    toast({ title: 'Movie added' });
  };

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-center mb-12"
    >
      <div className="flex items-center justify-between gap-3 mb-4">
        <div className="flex items-center gap-3 mx-auto">
          <div className="p-3 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full">
            <Film className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">
            CineMatch
          </h1>
        </div>
        <div className="absolute right-4 top-4 flex items-center gap-2">
          <Link to="/" className={`text-sm underline ${location.pathname==='/'?'font-bold':''}`}>Home</Link>
          <Link to="/admin" className={`text-sm underline ${location.pathname.startsWith('/admin')?'font-bold':''}`}>Admin</Link>
          <Button size="icon" variant="ghost" onClick={() => setTheme(t => t==='dark'?'light':'dark')} aria-label="Toggle theme">
            {theme === 'dark' ? <Sun className="w-4 h-4"/> : <Moon className="w-4 h-4"/>}
          </Button>
          <Link to="/admin">
            <Button size="sm">Admin</Button>
          </Link>
        </div>
      </div>
      <p className="text-xl text-gray-300 max-w-2xl mx-auto">
        Discover your next favorite movie with our intelligent recommendation system
      </p>



      {isAdmin && (
        <form onSubmit={submitNewMovie} className="mt-6 max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-3 bg-black/20 p-4 rounded-xl border border-white/10 text-left text-black">
          <Input placeholder="Title" value={newMovie.title} onChange={(e) => setNewMovie({ ...newMovie, title: e.target.value })} className="bg-white dark:bg-white text-black placeholder-gray-600" />
          <Input placeholder="Genre" value={newMovie.genre} onChange={(e) => setNewMovie({ ...newMovie, genre: e.target.value })} className="bg-white dark:bg-white text-black placeholder-gray-600" />
          <Input placeholder="Year" type="number" value={newMovie.year} onChange={(e) => setNewMovie({ ...newMovie, year: e.target.value })} className="bg-white dark:bg-white text-black placeholder-gray-600" />
          <Input placeholder="Rating (0-10)" type="number" step="0.1" value={newMovie.rating} onChange={(e) => setNewMovie({ ...newMovie, rating: e.target.value })} className="bg-white dark:bg-white text-black placeholder-gray-600" />
          <Input placeholder="Image URL" value={newMovie.image} onChange={(e) => setNewMovie({ ...newMovie, image: e.target.value })} className="md:col-span-2 bg-white dark:bg-white text-black placeholder-gray-600" />
          <Input placeholder="Description" value={newMovie.description} onChange={(e) => setNewMovie({ ...newMovie, description: e.target.value })} className="md:col-span-2 bg-white dark:bg-white text-black placeholder-gray-600" />
          <div className="md:col-span-2 flex justify-end">
            <Button type="submit" disabled={!canSubmitMovie}>Add Movie</Button>
          </div>
        </form>
      )}
    </motion.header>
  );
};

export default Header;