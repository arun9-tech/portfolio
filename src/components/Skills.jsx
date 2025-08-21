import { motion } from 'framer-motion';

// 1. We've added imports for ALL the skills, new and old.
import { FaReact, FaNodeJs, FaFigma, FaCss3Alt, FaSass, FaHtml5, FaGitAlt } from 'react-icons/fa';
import { SiJavascript, SiThreedotjs, SiTypescript, SiRedux, SiTailwindcss, SiVite, SiFramer } from 'react-icons/si';


// --- All the necessary logic is inside this one file ---

// Logic for the Animated Title
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


// 2. This is the new, COMBINED list of your skills. None have been removed.
const skillsData = [
  // Core Technologies
  { name: 'HTML5', LogoComponent: FaHtml5, color: '#E34F26' },
  { name: 'CSS3', LogoComponent: FaCss3Alt, color: '#1572B6' },
  { name: 'Sass', LogoComponent: FaSass, color: '#CC6699' },
  { name: 'Tailwind CSS', LogoComponent: SiTailwindcss, color: '#06B6D4' },
  
  // JavaScript & Frameworks
  { name: 'JavaScript', LogoComponent: SiJavascript, color: '#F7DF1E' },
  { name: 'TypeScript', LogoComponent: SiTypescript, color: '#3178C6' },
  { name: 'React', LogoComponent: FaReact, color: '#61DAFB' },
  { name: 'Redux', LogoComponent: SiRedux, color: '#764ABC' },
  
  // Backend & Fullstack
  { name: 'Node.js', LogoComponent: FaNodeJs, color: '#339933' },

  // Animation & 3D
  { name: 'Three.js', LogoComponent: SiThreedotjs, color: '#FFFFFF' },
  { name: 'Framer Motion', LogoComponent: SiFramer, color: '#0055FF' },
  
  // Design & Tooling
  { name: 'Figma', LogoComponent: FaFigma, color: '#F24E1E' },
  { name: 'Vite', LogoComponent: SiVite, color: '#646CFF' },
  { name: 'Git', LogoComponent: FaGitAlt, color: '#F05032' },
];

const gridContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.05 }, // Faster stagger for more items
  },
};

const cardItemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1 },
};

// The individual Skill Card component (no changes needed)
const SkillCard = ({ name, LogoComponent, color }) => (
  <motion.div
    className="skill-card"
    variants={cardItemVariants}
    style={{ '--logo-color': color }}
    whileHover={{
      scale: 1.1,
      y: -10,
      boxShadow: `0px 15px 30px ${color}40`,
      transition: { type: 'spring', stiffness: 300 },
    }}
  >
    <LogoComponent className="skill-logo" />
    <h3>{name}</h3>
  </motion.div>
);


// The Main Exported Skills Component (no changes needed)
export default function Skills() {
  return (
    <section className="section">
      <TitleWithUnderline text="My Toolkit" />
      
      <motion.div
        className="skills-grid"
        variants={gridContainerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        {skillsData.map((skill) => (
          <SkillCard
            key={skill.name}
            name={skill.name}
            LogoComponent={skill.LogoComponent}
            color={skill.color}
          />
        ))}
      </motion.div>
    </section>
  );
}