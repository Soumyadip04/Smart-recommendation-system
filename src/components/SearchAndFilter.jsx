import React from 'react';
import { motion } from 'framer-motion';
import { Filter, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const SearchAndFilter = ({ genres, selectedGenre, setSelectedGenre, searchQuery, setSearchQuery }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.2 }}
    className="mb-8"
  >
    <div className="relative mb-4">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
      <Input
        type="text"
        placeholder="Search for a movie..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="pl-10 w-full bg-gray-800/50 border-purple-500/30 text-white placeholder:text-gray-400 focus:ring-purple-500 focus:border-purple-500"
      />
    </div>
    <div className="flex flex-wrap justify-center gap-3">
      {genres.map((genre) => (
        <Button
          key={genre}
          variant={selectedGenre === genre ? "default" : "outline"}
          onClick={() => setSelectedGenre(genre)}
          className={`px-6 py-2 rounded-full transition-all duration-300 ${
            selectedGenre === genre
              ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-lg shadow-purple-500/25'
              : 'border-purple-400 text-purple-300 hover:bg-purple-800/50'
          }`}
        >
          <Filter className="w-4 h-4 mr-2" />
          {genre}
        </Button>
      ))}
    </div>
  </motion.div>
);

export default SearchAndFilter;
