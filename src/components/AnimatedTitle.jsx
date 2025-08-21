import { motion } from 'framer-motion';

const underlineVariants = {
  hidden: { scaleX: 0, originX: 0 },
  visible: {
    scaleX: 1,
    originX: 0,
    transition: { duration: 0.8, ease: [0.6, 0.05, -0.01, 0.9] },
  },
};

const AnimatedTitle = ({ text }) => {
  return (
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
};

export default AnimatedTitle;