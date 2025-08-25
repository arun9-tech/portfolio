// src/components/Projects.jsx
import React from 'react';
import ProjectCard from './ProjectCard'; // <-- Import the new component

// Remember to add your images to the src/assets folder
import musicImage from '../assets/music-website.png'; 
import portfolioImage from '../assets/weather.png';
import ecommerceImage from '../assets/farm link.png';

// --- NEW PROFESSIONAL CONTENT ---
const projectsData = [
  {
    title: 'Melody - Music Streaming Site',
    image: musicImage,
    link: 'https://arun9-tech.github.io/music-website/',
  },
  {
    title: 'today weather',
    image: portfolioImage,
    description: 'A sleek, single-page application built with React and Vite to showcase my skills. It features a glassmorphism design, a fixed particle background, 3D tilt effects, and smooth animations powered by Framer Motion.',
    link: 'https://arun9-tech.github.io/weather-website/', // Link to the GitHub repo for this portfolio
  },
  {
    title: 'coustomers helps',
    image: ecommerceImage,
    description: 'A modern e-commerce storefront concept focused on a clean UI and great user experience. Designed to be fully responsive, with plans for state management (Redux/Zustand) and Stripe integration for payments.',
    link: '#', // Link to the GitHub repo for this project
  },
];

const Projects = () => {
  return (
    <div id="projects" className="section">
      <div className="section-title-container">
        <h2 className="section-title">My Creations</h2>
        <div className="section-title-underline"></div>
      </div>
      <div className="projects-grid">
        {projectsData.map((project, index) => (
          // Use the new ProjectCard component here
          <ProjectCard project={project} key={index} />
        ))}
      </div>
    </div>
  );
};

export default Projects;