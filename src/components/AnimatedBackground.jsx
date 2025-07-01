import { motion, useMotionValue, useTransform } from 'framer-motion';
import { useEffect, useState } from 'react';

const AnimatedBackground = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [stars, setStars] = useState([]);

  // Generate random stars
  useEffect(() => {
    const generateStars = () => {
      const starArray = [];
      for (let i = 0; i < 150; i++) {
        starArray.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 3 + 1,
          opacity: Math.random() * 0.8 + 0.2,
          twinkleDelay: Math.random() * 5,
          moveSpeed: Math.random() * 2 + 0.5, // Increased base speed
        });
      }
      setStars(starArray);
    };

    generateStars();
  }, []);

  // Track mouse movement
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Pure black background */}
      <div className="absolute inset-0 bg-black" />
      
      {/* Animated stars */}
      {stars.map((star) => (
        <motion.div
          key={star.id}
          className="absolute rounded-full bg-white"
          style={{
            width: `${star.size}px`,
            height: `${star.size}px`,
            left: `${star.x}%`,
            top: `${star.y}%`,
          }}
          animate={{
            opacity: [star.opacity, star.opacity * 0.3, star.opacity],
            scale: [1, 1.2, 1],
            x: [
              0,
              (mousePosition.x - 50) * star.moveSpeed * 1.5, // Increased multiplier
              (mousePosition.x - 50) * star.moveSpeed * 3,   // Much faster final position
            ],
            y: [
              0,
              (mousePosition.y - 50) * star.moveSpeed * 1.5, // Increased multiplier
              (mousePosition.y - 50) * star.moveSpeed * 3,   // Much faster final position
            ],
          }}
          transition={{
            opacity: {
              duration: 3 + star.twinkleDelay,
              repeat: Infinity,
              ease: "easeInOut",
            },
            scale: {
              duration: 2 + star.twinkleDelay,
              repeat: Infinity,
              ease: "easeInOut",
            },
            x: {
              duration: 0.8, // Much faster response time
              ease: "easeOut",
            },
            y: {
              duration: 0.8, // Much faster response time
              ease: "easeOut",
            },
          }}
        />
      ))}

      {/* Shooting stars */}
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={`shooting-${i}`}
          className="absolute w-1 h-1 bg-white rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            x: [0, 200],
            y: [0, 100],
            opacity: [0, 1, 0],
            scale: [0, 1, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: i * 8 + Math.random() * 5,
            ease: "easeOut",
          }}
        />
      ))}

      {/* Enhanced cursor glow effect that follows faster */}
      <motion.div
        className="absolute w-40 h-40 rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(255, 255, 255, 0.05) 0%, transparent 70%)',
          left: `${mousePosition.x}%`,
          top: `${mousePosition.y}%`,
          transform: 'translate(-50%, -50%)',
        }}
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.4, 0.8, 0.4],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Constellation lines that follow cursor */}
      <svg className="absolute inset-0 w-full h-full">
        {stars.slice(0, 20).map((star, index) => {
          const nextStar = stars[index + 1] || stars[0];
          const distance = Math.sqrt(
            Math.pow(star.x - nextStar.x, 2) + Math.pow(star.y - nextStar.y, 2)
          );
          
          // Only draw lines between nearby stars
          if (distance < 15) {
            return (
              <motion.line
                key={`line-${index}`}
                x1={`${star.x}%`}
                y1={`${star.y}%`}
                x2={`${nextStar.x}%`}
                y2={`${nextStar.y}%`}
                stroke="rgba(255, 255, 255, 0.1)"
                strokeWidth="0.5"
                animate={{
                  opacity: [0, 0.3, 0],
                  strokeWidth: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  delay: index * 0.5,
                  ease: "easeInOut",
                }}
              />
            );
          }
          return null;
        })}
      </svg>
    </div>
  );
};

export default AnimatedBackground;