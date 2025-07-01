import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, Clock, Star, Globe, Award, Users } from 'lucide-react';

const MovieDetails = ({ movie, isOpen, onClose }) => {
  if (!movie) return null;

  const formatRuntime = (runtime) => {
    if (!runtime || runtime === 'N/A') return 'Unknown';
    return runtime;
  };

  const formatRating = (rating) => {
    if (!rating || rating === 'N/A') return 'No rating';
    return rating;
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-netflix-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-netflix-gray-dark rounded-2xl max-w-4xl max-h-[90vh] overflow-y-auto border border-netflix-gray-medium"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="relative">
              <button
                onClick={onClose}
                className="absolute top-4 right-4 z-10 p-2 bg-netflix-black/50 hover:bg-netflix-black/70 rounded-full transition-colors"
              >
                <X size={24} className="text-netflix-white" />
              </button>
              
              {movie.Poster && movie.Poster !== 'N/A' && (
                <div className="relative h-64 md:h-80 overflow-hidden rounded-t-2xl">
                  <img
                    src={movie.Poster}
                    alt={movie.Title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-netflix-gray-dark via-netflix-gray-dark/50 to-transparent" />
                </div>
              )}
            </div>

            {/* Content */}
            <div className="p-6 md:p-8">
              <div className="flex flex-col md:flex-row gap-6">
                {/* Movie poster for mobile */}
                {movie.Poster && movie.Poster !== 'N/A' && (
                  <div className="md:hidden w-32 mx-auto">
                    <img
                      src={movie.Poster}
                      alt={movie.Title}
                      className="w-full rounded-lg shadow-lg"
                    />
                  </div>
                )}

                <div className="flex-1 space-y-6">
                  {/* Title and basic info */}
                  <div>
                    <h2 className="text-3xl md:text-4xl font-bold mb-2 gradient-text">
                      {movie.Title}
                    </h2>
                    
                    <div className="flex flex-wrap gap-4 text-netflix-gray-light">
                      <div className="flex items-center gap-2">
                        <Calendar size={18} />
                        <span>{movie.Year}</span>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Clock size={18} />
                        <span>{formatRuntime(movie.Runtime)}</span>
                      </div>
                      
                      {movie.imdbRating && movie.imdbRating !== 'N/A' && (
                        <div className="flex items-center gap-2">
                          <Star size={18} className="text-yellow-500 fill-current" />
                          <span className="font-semibold">{movie.imdbRating}/10</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Plot */}
                  {movie.Plot && movie.Plot !== 'N/A' && (
                    <div>
                      <h3 className="text-xl font-semibold mb-3 text-netflix-red">Plot</h3>
                      <p className="text-netflix-gray-light leading-relaxed">
                        {movie.Plot}
                      </p>
                    </div>
                  )}

                  {/* Additional details grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {movie.Genre && movie.Genre !== 'N/A' && (
                      <div className="space-y-2">
                        <h4 className="font-semibold text-netflix-red">Genre</h4>
                        <div className="flex flex-wrap gap-2">
                          {movie.Genre.split(', ').map((genre, index) => (
                            <span
                              key={index}
                              className="px-3 py-1 bg-netflix-red/20 text-netflix-red rounded-full text-sm"
                            >
                              {genre}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {movie.Director && movie.Director !== 'N/A' && (
                      <div className="space-y-2">
                        <h4 className="font-semibold text-netflix-red flex items-center gap-2">
                          <Users size={16} />
                          Director
                        </h4>
                        <p className="text-netflix-gray-light">{movie.Director}</p>
                      </div>
                    )}

                    {movie.Actors && movie.Actors !== 'N/A' && (
                      <div className="space-y-2">
                        <h4 className="font-semibold text-netflix-red flex items-center gap-2">
                          <Award size={16} />
                          Cast
                        </h4>
                        <p className="text-netflix-gray-light">{movie.Actors}</p>
                      </div>
                    )}

                    {movie.Country && movie.Country !== 'N/A' && (
                      <div className="space-y-2">
                        <h4 className="font-semibold text-netflix-red flex items-center gap-2">
                          <Globe size={16} />
                          Country
                        </h4>
                        <p className="text-netflix-gray-light">{movie.Country}</p>
                      </div>
                    )}

                    {movie.Language && movie.Language !== 'N/A' && (
                      <div className="space-y-2">
                        <h4 className="font-semibold text-netflix-red">Language</h4>
                        <p className="text-netflix-gray-light">{movie.Language}</p>
                      </div>
                    )}

                    {movie.Awards && movie.Awards !== 'N/A' && (
                      <div className="space-y-2 md:col-span-2">
                        <h4 className="font-semibold text-netflix-red">Awards</h4>
                        <p className="text-netflix-gray-light">{movie.Awards}</p>
                      </div>
                    )}
                  </div>

                  {/* Ratings */}
                  {movie.Ratings && movie.Ratings.length > 0 && (
                    <div>
                      <h4 className="font-semibold text-netflix-red mb-3">Ratings</h4>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        {movie.Ratings.map((rating, index) => (
                          <div key={index} className="card text-center">
                            <div className="text-lg font-bold text-netflix-red">
                              {rating.Value}
                            </div>
                            <div className="text-sm text-netflix-gray-light">
                              {rating.Source}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MovieDetails;