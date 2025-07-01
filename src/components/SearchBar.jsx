import { motion } from 'framer-motion';
import { Search, Shuffle } from 'lucide-react';
import { useState } from 'react';

const SearchBar = ({ onSearch, onRandomMovie, isLoading }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
    }
  };

  const handleRandomMovie = () => {
    const randomMovies = [
      'The Matrix', 'Inception', 'Interstellar', 'The Dark Knight', 'Pulp Fiction',
      'The Godfather', 'Fight Club', 'Forrest Gump', 'The Shawshank Redemption',
      'Goodfellas', 'The Avengers', 'Star Wars', 'Titanic', 'Avatar', 'Jurassic Park'
    ];
    const randomMovie = randomMovies[Math.floor(Math.random() * randomMovies.length)];
    setQuery(randomMovie);
    onRandomMovie(randomMovie);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6, duration: 0.6 }}
      className="max-w-2xl mx-auto px-4 mb-12"
    >
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search 
            size={20} 
            className="absolute left-4 top-1/2 transform -translate-y-1/2 text-netflix-gray-light" 
          />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for movies, series, episodes..."
            className="input-field pl-12 pr-4"
            disabled={isLoading}
          />
        </div>
        
        <div className="flex gap-2">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={isLoading || !query.trim()}
            className="btn-primary min-w-[120px] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <div className="loading-dots">
                <div style={{'--i': 0}}></div>
                <div style={{'--i': 1}}></div>
                <div style={{'--i': 2}}></div>
              </div>
            ) : (
              'Search'
            )}
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="button"
            onClick={handleRandomMovie}
            disabled={isLoading}
            className="btn-secondary px-4 disabled:opacity-50 disabled:cursor-not-allowed"
            title="Get random movie"
          >
            <Shuffle size={20} />
          </motion.button>
        </div>
      </form>
    </motion.div>
  );
};

export default SearchBar;