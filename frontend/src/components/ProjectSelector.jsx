import React from 'react';
import { projects } from '../config/projectSuites';

const ProjectSelector = ({ selectedProject, onSelect }) => {
  return (
    <div className="selector-group">
      <label htmlFor="project-select">Select Banking Project</label>
      <select 
        id="project-select" 
        value={selectedProject} 
        onChange={(e) => onSelect(e.target.value)}
      >
        <option value="">-- Choose a Project --</option>
        {projects.map(project => (
          <option key={project.value} value={project.value}>
            {project.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ProjectSelector;
