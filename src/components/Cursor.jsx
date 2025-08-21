import { useEffect, useState, memo } from 'react';
import { motion } from 'framer-motion';

const Cursor = memo(() => {
  const [mousePosition, setMousePosition] = useState({ x: -200, y: -200 });
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    // Detect touch devices
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
      setIsTouchDevice(true);
      return;
    }

    // If it's a mouse device, add the class to hide the default cursor
    document.body.classList.add('custom-cursor-active');

    const mouseMove = (e) => setMousePosition({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', mouseMove);

    // Cleanup function
    return () => {
      document.body.classList.remove('custom-cursor-active');
      window.removeEventListener('mousemove', mouseMove);
    };
  }, []);

  // On touch devices, render nothing
  if (isTouchDevice) return null;

  // On mouse devices, render our custom cursor
  return (
    <motion.div
      className="bulletproof-cursor"
      // THE FIX IS HERE: We now subtract 10px to perfectly center the 20px cursor
      animate={{ x: mousePosition.x - 10, y: mousePosition.y - 10 }}
      transition={{ type: 'tween', ease: 'backOut', duration: 0.5 }}
    />
  );
});

export default Cursor;