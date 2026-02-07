
import React, { useState, useCallback, useEffect } from 'react';
import { Heart, Stars } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import MovingButton from './components/MovingButton';
import FloatingHearts from './components/FloatingHearts';

const App: React.FC = () => {
  const [isAccepted, setIsAccepted] = useState(false);
  const [hearts, setHearts] = useState<{ id: number; x: number; y: number }[]>([]);

  const handleYesClick = () => {
    setIsAccepted(true);
    // Create an explosion of hearts
    const newHearts = Array.from({ length: 20 }).map((_, i) => ({
      id: Date.now() + i,
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
    }));
    setHearts(prev => [...prev, ...newHearts]);
  };

  // Image URL can be easily swapped here
  const mainImageUrl = isAccepted 
    ? "https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExeW41ZDR2NzZkOXIxMTIxcWZna3liMTcxamVsNGM5cHVzdmxsdzAxbyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/1tiwQhwReXrSQ66wsB/giphy.gif"
    : "https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExYnp5bzQ2YjZteng4OTg0M3c0aTc3eGJiaWN6aHB0YnoxODQwbmd5OSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/901mxGLGQN2PyCQpoc/giphy.gif";

  return (
    <div className={`min-h-screen w-full flex flex-col items-center justify-center transition-colors duration-1000 p-4 ${isAccepted ? 'bg-pink-200' : 'bg-pink-50'}`}>
      
      {/* Background elements */}
      <AnimatePresence>
        {isAccepted && <FloatingHearts />}
      </AnimatePresence>

      <motion.div 
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="max-w-md w-full bg-white/80 backdrop-blur-md rounded-3xl shadow-xl p-8 flex flex-col items-center text-center space-y-6 relative z-10 border-4 border-pink-100"
      >
        <motion.img
          key={mainImageUrl}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          src={mainImageUrl}
          alt="Cute Valentine Illustration"
          className="w-64 h-64 object-cover rounded-2xl shadow-md border-4 border-white"
        />

        <div className="space-y-4">
          <h1 className={`text-3xl md:text-4xl font-bold text-pink-600 transition-all duration-500 ${isAccepted ? 'scale-110' : ''}`}>
            {isAccepted ? "YAYYYYY! ❤️" : "Ashley Phan!"}
          </h1>
          
          <p className="text-xl md:text-2xl font-pacifico text-pink-400">
            {isAccepted ? "I'm the luckiest!" : "Will you be my Valentine?"}
          </p>
        </div>

        {isAccepted ? (
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="p-6 bg-pink-50 rounded-2xl border-2 border-dashed border-pink-300"
          >
            <p className="text-lg font-bold text-pink-700">
              See you in Vung Tau next Saturday 💖
            </p>
            <div className="flex justify-center mt-3 gap-2 text-pink-400">
              <Heart className="fill-current animate-pulse" />
              <Stars className="animate-bounce" />
              <Heart className="fill-current animate-pulse" />
            </div>
          </motion.div>
        ) : (
          <div className="flex items-center justify-center gap-6 w-full pt-4">
            <button
              onClick={handleYesClick}
              className="px-8 py-3 bg-pink-500 hover:bg-pink-600 text-white font-bold text-xl rounded-full shadow-lg hover:shadow-pink-200 transition-all transform hover:scale-110 active:scale-95 flex items-center gap-2"
            >
              YES <Heart size={20} fill="white" />
            </button>
            
            <MovingButton />
          </div>
        )}
      </motion.div>

      {/* Bursting hearts effect when clicking YES */}
      <AnimatePresence>
        {hearts.map(heart => (
          <motion.div
            key={heart.id}
            initial={{ opacity: 1, scale: 0, x: window.innerWidth / 2, y: window.innerHeight / 2 }}
            animate={{ opacity: 0, scale: 2, x: heart.x, y: heart.y }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="fixed pointer-events-none z-50"
          >
            <Heart size={32} className="text-pink-500 fill-current" />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default App;
