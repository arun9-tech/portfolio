import { motion } from 'framer-motion';

// --- All logic is now inside this one file ---

// 1. THE FIX: We have REMOVED the broken image imports.
// We are now using background colors as placeholders.
const projectData = [
  { title: 'Stunning Visualizer', description: 'Built with React and Three.js.', bgColor: '#2a2a2a' },
  { title: 'E-commerce Platform', description: 'A site with fluid animations.', bgColor: '#3a3a3a' },
  { title: 'Interactive Art Piece', description: 'An experiment in generative art.', bgColor: '#4a4a4a' },
];

// 2. Logic for the Animated Title (self-contained)
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

// 3. Logic for the Project Card Animations
const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1 },
};

const overlayVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

// 4. The Individual Project Card Component
const ProjectCard = ({ title, description, bgColor }) => {
  return (
    <motion.div variants={itemVariants}>
      {/* THE FIX: We use a simple div with a background color instead of an <img> tag. */}
      <motion.div
        className="project-card"
        whileHover="hover"
        initial="rest"
        style={{ backgroundColor: bgColor }} // Apply the placeholder color
      >
        <motion.div className="project-overlay" variants={{ rest: { opacity: 0 }, hover: { opacity: 1 } }}>
          <motion.div className="project-overlay-content" variants={containerVariants}>
            <motion.h3 variants={overlayVariants}>{title}</motion.h3>
            <motion.p variants={overlayVariants}>{description}</motion.p>
            <motion.button className="view-project-btn" variants={overlayVariants}>
              View Project
            </motion.button>
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

// 5. The Main Exported Projects Component
export default function Projects() {
  return (
    <section className="section">
      <TitleWithUnderline text="My Work" />
      <motion.div 
        className="projects-grid"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
      >
        {projectData.map((proj) => (
          <ProjectCard key={proj.title} {...proj} />
        ))}
      </motion.div>
    </section>
  );
}