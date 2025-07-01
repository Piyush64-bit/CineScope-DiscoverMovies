import { motion } from 'framer-motion';
import { Film } from 'lucide-react';

const LoadingSpinner = ({ message = 'Searching movies...' }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col items-center justify-center py-16"
    >
      <motion.div
        animate={{
          rotate: 360,
          scale: [1, 1.1, 1],
        }}
        transition={{
          rotate: { duration: 2, repeat: Infinity, ease: 'linear' },
          scale: { duration: 1, repeat: Infinity, ease: 'easeInOut' },
        }}
        className="mb-6"
      >
        <Film size={48} className="text-netflix-red" />
      </motion.div>
      
      <motion.h3
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        className="text-xl font-medium text-netflix-gray-light"
      >
        {message}
      </motion.h3>
      
      <div className="flex space-x-2 mt-4">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            animate={{
              y: [-8, 8, -8],
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: i * 0.2,
            }}
            className="w-2 h-2 bg-netflix-red rounded-full"
          />
        ))}
      </div>
    </motion.div>
  );
};

export default LoadingSpinner;