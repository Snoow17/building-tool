import React from 'react';

const FloorboardsSelector = ({ 
  selectedProject, 
  onFloorboardsSelect,
  floorboardOptions,
  buildingProjects
}) => {
  const project = buildingProjects.find(p => p.id === selectedProject);

  return (
    <div className="floorboards-selection">
      <div className="step-header">
        <h2>Välj golvbrädor för din {project.name}</h2>
        <p>Välj brädstorlek och material</p>
      </div>

      <div className="options-grid">
        {floorboardOptions.map(floorboard => (
          <div 
            key={floorboard.id}
            className="option-card"
            onClick={() => onFloorboardsSelect(floorboard.id)}
          >
            <h3>{floorboard.name}</h3>
            <p className="description">{floorboard.description}</p>
            
            <div className="floorboard-specs">
              <div className="spec">
                <span className="spec-label">Material:</span>
                <span className="spec-value">{floorboard.material}</span>
              </div>
              <div className="spec">
                <span className="spec-label">Mellanrum:</span>
                <span className="spec-value">{floorboard.spacing}</span>
              </div>
              <div className="spec">
                <span className="spec-label">Meter per m²</span>
                <span className="spec-value">{floorboard.metersPerM2}</span>
              </div>
              <div className="spec">
                <span className="spec-label">Kostnad per m²:</span>
                <span className="spec-value">{floorboard.costPerM2} SEK</span>
              </div>
            </div>
            
            <div className="suitable-for">
              <h4>Lämplig för:</h4>
              <p>{floorboard.suitableFor}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FloorboardsSelector; 