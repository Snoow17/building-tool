import React from 'react';

const ProjectSelector = ({ selectedProject, onProjectSelect, buildingProjects }) => (
  <div className="project-selector">
    <label htmlFor="project-dropdown">Välj byggprojekt:</label>
    <select 
      id="project-dropdown"
      value={selectedProject}
      onChange={(e) => onProjectSelect(e.target.value)}
      className="project-dropdown"
    >
      <option value="">-- Välj ett projekt --</option>
      {buildingProjects.map(project => (
        <option key={project.id} value={project.id}>
          {project.name}
        </option>
      ))}
    </select>
  </div>
);

export default ProjectSelector; 