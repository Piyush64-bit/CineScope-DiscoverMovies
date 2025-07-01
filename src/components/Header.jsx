import { motion } from 'framer-motion';
import { Film } from 'lucide-react';

const Header = () => {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="relative py-16 px-4 text-center overflow-hidden"
    >
      <div className="relative z-10">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="flex items-center justify-center mb-6"
        >
          <motion.div
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.6 }}
            className="mr-4"
          >
            <Film size={48} className="text-netflix-red" />
          </motion.div>
          <h1 className="text-5xl md:text-7xl font-display font-bold gradient-text">
            CineScope
          </h1>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="text-xl md:text-2xl text-netflix-gray-light max-w-2xl mx-auto mb-8"
        >
          Discover your next favorite movie with our powerful search engine
        </motion.p>
      </div>
    </motion.header>
  );
};

export default Header;