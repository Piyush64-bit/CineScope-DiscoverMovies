import { motion } from 'framer-motion';
import { Calendar, Film, Star } from 'lucide-react';

const MovieCard = ({ movie, onClick, index }) => {
  const getTypeIcon = (type) => {
    switch (type?.toLowerCase()) {
      case 'movie':
        return <Film size={16} className="text-netflix-red" />;
      case 'series':
        return <div className="w-4 h-4 bg-netflix-red rounded-sm flex items-center justify-center">
          <span className="text-xs font-bold text-netflix-white">S</span>
        </div>;
      case 'episode':
        return <div className="w-4 h-4 bg-netflix-red-light rounded-sm flex items-center justify-center">
          <span className="text-xs font-bold text-netflix-white">E</span>
        </div>;
      default:
        return <Film size={16} className="text-netflix-red" />;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      whileHover={{ y: -8, scale: 1.02 }}
      onClick={() => onClick(movie)}
      className="card cursor-pointer group overflow-hidden"
    >
      <div className="relative mb-4 overflow-hidden rounded-lg">
        {movie.Poster && movie.Poster !== 'N/A' ? (
          <motion.img
            src={movie.Poster}
            alt={movie.Title}
            className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
            loading="lazy"
            whileHover={{ scale: 1.1 }}
          />
        ) : (
          <div className="w-full h-64 bg-gradient-to-br from-netflix-gray-dark to-netflix-gray-medium flex items-center justify-center">
            <Film size={48} className="text-netflix-gray-light" />
          </div>
        )}
        
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-netflix-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Type badge */}
        <div className="absolute top-3 right-3 bg-netflix-black/80 backdrop-blur-sm rounded-full px-3 py-1 flex items-center gap-2">
          {getTypeIcon(movie.Type)}
          <span className="text-sm font-medium capitalize text-netflix-white">
            {movie.Type}
          </span>
        </div>
      </div>

      <div className="space-y-3">
        <h3 className="text-xl font-semibold line-clamp-2 group-hover:text-netflix-red transition-colors duration-200">
          {movie.Title}
        </h3>
        
        <div className="flex items-center justify-between text-sm text-netflix-gray-light">
          <div className="flex items-center gap-2">
            <Calendar size={16} />
            <span>{movie.Year}</span>
          </div>
          
          {movie.imdbRating && movie.imdbRating !== 'N/A' && (
            <div className="flex items-center gap-1">
              <Star size={16} className="text-yellow-500 fill-current" />
              <span className="font-medium">{movie.imdbRating}</span>
            </div>
          )}
        </div>
        
        {movie.imdbID && (
          <div className="text-xs text-netflix-gray-light/70 font-mono">
            {movie.imdbID}
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default MovieCard;