
import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const MovingButton: React.FC = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const buttonRef = useRef<HTMLButtonElement>(null);

  const moveButton = () => {
    // Calculate boundaries to keep button visible but distant
    const padding = 50;
    const maxX = window.innerWidth - (buttonRef.current?.offsetWidth || 100) - padding;
    const maxY = window.innerHeight - (buttonRef.current?.offsetHeight || 50) - padding;

    // Generate random coordinates
    const newX = Math.max(padding, Math.random() * maxX);
    const newY = Math.max(padding, Math.random() * maxY);

    // We use a bit of absolute positioning logic mixed with framer-motion
    // But since the button starts in a flex container, we'll transform it relative to its origin
    // For a better "run away" effect, we'll just set it to fixed/absolute after first interaction
    const rect = buttonRef.current?.getBoundingClientRect();
    if (rect) {
      const offsetX = newX - rect.left;
      const offsetY = newY - rect.top;
      setPosition(prev => ({ x: prev.x + offsetX, y: prev.y + offsetY }));
    }
  };

  return (
    <motion.button
      ref={buttonRef}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      onMouseEnter={moveButton}
      onClick={moveButton} // Just in case they manage to click it
      className="px-8 py-3 bg-gray-200 text-gray-600 font-bold text-xl rounded-full shadow-md transition-colors hover:bg-gray-300"
    >
      NO
    </motion.button>
  );
};

export default MovingButton;
