// src/components/ProjectCard.jsx
import React, { useRef } from 'react';

const ProjectCard = ({ project }) => {
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    const card = cardRef.current;
    const { left, top, width, height } = card.getBoundingClientRect();
    const x = e.clientX - left - width / 2;
    const y = e.clientY - top - height / 2;
    const rotateX = (y / height) * -20;
    const rotateY = (x / width) * 20;
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
  };

  const handleMouseLeave = () => {
    cardRef.current.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
  };

  return (
    <a
      href={project.link}
      target="_blank"
      rel="noopener noreferrer"
      className="project-card"
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <img src={project.image} alt={project.title} className="project-image" />
      <div className="project-overlay">
        {/* The extra div has been removed. H3 and button are now direct children. */}
        <h3>{project.title}</h3>
        <button className="view-project-btn">View Project</button>
      </div>
    </a>
  );
};

export default ProjectCard;