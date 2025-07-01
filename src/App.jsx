import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertCircle, Search as SearchIcon } from 'lucide-react';

// Components
import AnimatedBackground from './components/AnimatedBackground';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import MovieCard from './components/MovieCard';
import MovieDetails from './components/MovieDetails';
import LoadingSpinner from './components/LoadingSpinner';
import Footer from './components/Footer';

// Services and hooks
import { searchMovies, getMovieDetails } from './services/movieService';
import { useLocalStorage } from './hooks/useLocalStorage';

function App() {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [detailedMovie, setDetailedMovie] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [searchHistory, setSearchHistory] = useLocalStorage('movieSearchHistory', []);

  // Handle search
  const handleSearch = async (query) => {
    setIsLoading(true);
    setError(null);
    setMovies([]);

    try {
      const results = await searchMovies(query);
      setMovies(results.movies);
      
      // Add to search history
      const newHistory = [query, ...searchHistory.filter(item => item !== query)].slice(0, 5);
      setSearchHistory(newHistory);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle random movie
  const handleRandomMovie = async (query) => {
    await handleSearch(query);
  };

  // Handle movie card click
  const handleMovieClick = async (movie) => {
    setSelectedMovie(movie);
    setIsLoading(true);
    
    try {
      const details = await getMovieDetails(movie.imdbID);
      setDetailedMovie(details);
      setIsDetailsOpen(true);
    } catch (err) {
      setError(`Failed to load movie details: ${err.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  // Close movie details
  const handleCloseDetails = () => {
    setIsDetailsOpen(false);
    setTimeout(() => {
      setDetailedMovie(null);
      setSelectedMovie(null);
    }, 300);
  };

  return (
    <div className="min-h-screen relative text-netflix-white">
      {/* Animated Background */}
      <AnimatedBackground />
      
      {/* Main Content */}
      <div className="relative z-10">
        {/* Header */}
        <Header />

        {/* Search Bar */}
        <SearchBar 
          onSearch={handleSearch}
          onRandomMovie={handleRandomMovie}
          isLoading={isLoading}
        />

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 pb-20">
          {/* Loading State */}
          {isLoading && <LoadingSpinner />}

          {/* Error State */}
          {error && !isLoading && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-16"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-netflix-red/20 rounded-full mb-4">
                <AlertCircle size={32} className="text-netflix-red" />
              </div>
              <h3 className="text-2xl font-semibold mb-2">Oops! Something went wrong</h3>
              <p className="text-netflix-gray-light mb-6 max-w-md mx-auto">
                {error}
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setError(null)}
                className="btn-primary"
              >
                Try Again
              </motion.button>
            </motion.div>
          )}

          {/* No Results State */}
          {!isLoading && !error && movies.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-16"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-netflix-red/20 rounded-full mb-4">
                <SearchIcon size={32} className="text-netflix-red" />
              </div>
              <h3 className="text-2xl font-semibold mb-2">Start your movie discovery</h3>
              <p className="text-netflix-gray-light max-w-md mx-auto">
                Search for your favorite movies, series, or episodes using the search bar above.
                You can also try the random movie button for inspiration!
              </p>
            </motion.div>
          )}

          {/* Movie Results Grid */}
          <AnimatePresence>
            {movies.length > 0 && !isLoading && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
              >
                {movies.map((movie, index) => (
                  <MovieCard
                    key={movie.imdbID}
                    movie={movie}
                    index={index}
                    onClick={handleMovieClick}
                  />
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Search History */}
          {searchHistory.length > 0 && movies.length === 0 && !isLoading && !error && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-12 text-center"
            >
              <h3 className="text-xl font-semibold mb-4 text-netflix-gray-light">
                Recent Searches
              </h3>
              <div className="flex flex-wrap justify-center gap-2">
                {searchHistory.map((query, index) => (
                  <motion.button
                    key={index}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleSearch(query)}
                    className="px-4 py-2 bg-netflix-gray-medium hover:bg-netflix-red/20 border border-netflix-gray-medium hover:border-netflix-red/50 rounded-full text-sm transition-all duration-200"
                  >
                    {query}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}
        </main>

        {/* Movie Details Modal */}
        <MovieDetails
          movie={detailedMovie}
          isOpen={isDetailsOpen}
          onClose={handleCloseDetails}
        />

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
}

export default App;