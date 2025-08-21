import { motion } from 'framer-motion';
import AnimatedTitle from './AnimatedTitle';

export default function About() {
  return (
    <motion.section 
      className="section"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1 }}
      viewport={{ once: true, amount: 0.5 }}
    >
      <AnimatedTitle text="About Me" />
      <p style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto', lineHeight: '1.6' }}>
        I'm Arun Kumar, a digital architect who crafts immersive and beautiful web experiences that engage and inspire. 
        With a passion for motion and interactivity, I turn ideas into vibrant, digital realities.
      </p>
    </motion.section>
  );
}