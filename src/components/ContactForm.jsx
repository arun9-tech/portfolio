import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

// --- All logic is now inside this one file ---

// 1. Logic for the Animated Title
const underlineVariants = {
  hidden: { scaleX: 0, originX: 0 },
  visible: {
    scaleX: 1,
    originX: 0,
    transition: { duration: 0.8, ease: [0.6, 0.05, -0.01, 0.9] },
  },
};

const TitleWithUnderline = ({ text }) => (
  <motion.div
    className="section-title-container"
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, amount: 0.5 }}
  >
    <h2 className="section-title">{text}</h2>
    <motion.div
      className="section-title-underline"
      variants={underlineVariants}
    />
  </motion.div>
);


// 2. Logic for the Staggered Animation
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.5 } },
};


// 3. The Main ContactForm Component
export default function ContactForm() {
  const [ripples, setRipples] = useState([]);

  const createRipple = (event) => {
    const button = event.currentTarget;
    const rect = button.getBoundingClientRect();
    const size = Math.max(button.clientWidth, button.clientHeight);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    const newRipple = { x, y, size, id: Date.now() };
    setRipples((prev) => [...prev, newRipple]);
  };

  return (
    <section className="section">
      <TitleWithUnderline text="Let's Connect" />
      
      <motion.div
        className="contact-section"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <motion.div variants={itemVariants} className="input-container">
          <input type="text" placeholder="Your Name" className="contact-input" />
        </motion.div>

        <motion.div variants={itemVariants} className="input-container">
          <input type="email" placeholder="Your Email" className="contact-input" />
        </motion.div>
        
        <motion.div variants={itemVariants} className="input-container">
          <textarea placeholder="Your Message" className="contact-textarea"></textarea>
        </motion.div>

        <motion.button
          variants={itemVariants}
          className="submit-button"
          onMouseDown={createRipple}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Send Message
          <AnimatePresence>
            {ripples.map((ripple) => (
              <motion.span
                className="ripple-effect"
                key={ripple.id}
                initial={{ scale: 0, opacity: 1 }}
                animate={{ scale: 4, opacity: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6 }}
                style={{ top: ripple.y, left: ripple.x, width: ripple.size, height: ripple.size }}
                onAnimationComplete={() => setRipples((prev) => prev.filter((r) => r.id !== ripple.id))}
              />
            ))}
          </AnimatePresence>
        </motion.button>
      </motion.div>
    </section>
  );
}