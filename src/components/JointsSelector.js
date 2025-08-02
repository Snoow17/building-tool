import React from 'react';

const JointsSelector = ({ 
  selectedProject, 
  onJointsSelect, 
  onBack,
  jointOptions,
  buildingProjects
}) => {
  const project = buildingProjects.find(p => p.id === selectedProject);

  return (
    <div className="joints-selection">
      <div className="step-header">
        <button className="back-button" onClick={onBack}>
          ← Tillbaka till grundval
        </button>
        <h2>Välj balkar för din {project.name}</h2>
        <p>Välj balkstorlek baserat på ditt projekt</p>
      </div>

      <div className="options-grid">
        {jointOptions.map(joint => (
          <div 
            key={joint.id}
            className="option-card"
            onClick={() => onJointsSelect(joint.id)}
          >
            <h3>{joint.name}</h3>
            <p className="description">{joint.description}</p>
            
            <div className="joint-specs">
              <div className="spec">
                <span className="spec-label">Styrka:</span>
                <span className="spec-value">{joint.strength}</span>
              </div>
              <div className="spec">
                <span className="spec-label">Centrumavstånd:</span>
                <span className="spec-value">{joint.spacing}</span>
              </div>
              <div className="spec">
                <span className="spec-label">Max spännvidd:</span>
                <span className="spec-value">{joint.maxSpan}m</span>
              </div>
              <div className="spec">
                <span className="spec-label">Kostnad per meter:</span>
                <span className="spec-value">{joint.costPerMeter} SEK</span>
              </div>
            </div>
            
            <div className="suitable-for">
              <h4>Lämplig för:</h4>
              <p>{joint.suitableFor}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default JointsSelector; 