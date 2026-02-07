
import React from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

const FloatingHearts: React.FC = () => {
  const hearts = Array.from({ length: 15 });

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {hearts.map((_, i) => {
        const size = Math.random() * 20 + 20;
        const left = Math.random() * 100;
        const duration = Math.random() * 5 + 5;
        const delay = Math.random() * 5;

        return (
          <motion.div
            key={i}
            initial={{ y: "110vh", opacity: 0, scale: 0.5, x: `${left}vw` }}
            animate={{ 
              y: "-10vh", 
              opacity: [0, 0.6, 0.6, 0],
              rotate: [0, 45, -45, 0],
              scale: [0.5, 1, 1, 0.5]
            }}
            transition={{ 
              duration: duration, 
              repeat: Infinity, 
              delay: delay,
              ease: "linear"
            }}
            className="absolute text-pink-400"
          >
            <Heart size={size} fill="currentColor" />
          </motion.div>
        );
      })}
    </div>
  );
};

export default FloatingHearts;
