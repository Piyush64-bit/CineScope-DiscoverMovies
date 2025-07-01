import { motion } from 'framer-motion';
import { Heart, Github, Linkedin, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1, duration: 0.8 }}
      className="relative mt-20 border-t border-netflix-gray-medium bg-netflix-black"
    >
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-netflix-red/5 via-netflix-red-light/5 to-netflix-red-dark/5" />
      
      <div className="relative z-10 max-w-6xl mx-auto px-4 py-12">
        <div className="text-center space-y-6">
          {/* Main footer text */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.2, duration: 0.6 }}
            className="flex items-center justify-center gap-2 text-lg"
          >
            <span className="text-netflix-gray-light">© 2025 Designed & Developed by</span>
            <motion.span
              className="font-bold tracking-widest bg-gradient-to-r from-netflix-red via-netflix-red-light to-netflix-red-dark bg-clip-text text-transparent"
              animate={{
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              style={{
                backgroundSize: '200% 200%',
              }}
            >
              P I Y U $ H
            </motion.span>
          </motion.div>

          {/* Heart animation - slowed down */}
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 4, // Increased from 2 to 4 seconds
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="flex items-center justify-center gap-2 text-netflix-gray-light"
          >
            <span>Made with</span>
            <Heart size={16} className="text-netflix-red fill-current" />
            <span>using React, Tailwind & Framer Motion</span>
          </motion.div>

          {/* Social links */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4, duration: 0.6 }}
            className="flex items-center justify-center gap-6"
          >
            {[
              { icon: Github, href: 'https://github.com/Piyush64-bit', label: 'GitHub' },
              { icon: Linkedin, href: 'https://www.linkedin.com/in/piyush64bit/', label: 'LinkedIn' },
              { icon: Mail, href: 'mailto:piiyush.sonii@outlook.com', label: 'Email' },
            ].map(({ icon: Icon, href, label }, index) => (
              <motion.a
                key={label}
                href={href}
                target={label === 'Email' ? '_self' : '_blank'}
                rel={label === 'Email' ? undefined : 'noopener noreferrer'}
                whileHover={{ scale: 1.2, y: -2 }}
                whileTap={{ scale: 0.9 }}
                className="p-2 rounded-full bg-netflix-gray-medium hover:bg-netflix-red/20 border border-netflix-gray-medium hover:border-netflix-red/50 transition-all duration-200"
                title={label}
              >
                <Icon size={18} className="text-netflix-gray-light hover:text-netflix-red transition-colors" />
              </motion.a>
            ))}
          </motion.div>

          {/* API credit */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.6, duration: 0.6 }}
            className="text-sm text-netflix-gray-light/70"
          >
            Movie data provided by{' '}
            <a
              href="https://www.omdbapi.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-netflix-red hover:text-netflix-red-light transition-colors underline"
            >
              OMDb API
            </a>
          </motion.p>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;