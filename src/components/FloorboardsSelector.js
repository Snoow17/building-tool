import React, { useState } from 'react';

const FloorboardsSelector = ({ 
  selectedProject, 
  onFloorboardsSelect,
  floorboardOptions,
  buildingProjects,
  customWoodLength,
  onWoodLengthChange
}) => {
  const project = buildingProjects.find(p => p.id === selectedProject);

  return (
    <div className="floorboards-selection">
      <div className="step-header">
        <h2>Välj golvbrädor för din {project.name}</h2>
        <p>Välj brädstorlek och material, samt ange längden på dina tillgängliga brädor</p>
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

            <img 
              src={floorboard.imageUrl} 
              alt={floorboard.name}
              className="floorboard-image"
              onError={(e) => {
                // Fallback image or hide if image fails to load
                e.target.style.display = 'none';
              }}
            />
            
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

            {/* Wood Length Input for this specific floorboard */}
            <div className="card-wood-length-input">
              <label htmlFor={`wood-length-${floorboard.id}`} className="card-input-label">
                Längd på tillgängliga brädor:
              </label>
              <div className="card-input-group">
                <input
                  type="number"
                  id={`wood-length-${floorboard.id}`}
                  value={customWoodLength}
                  onChange={(e) => onWoodLengthChange(e.target.value)}
                  min="0.1"
                  max="10"
                  step="0.1"
                  placeholder="3.6"
                  className="card-wood-length-field"
                  onClick={(e) => e.stopPropagation()}
                />
                <span className="card-unit">m</span>
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