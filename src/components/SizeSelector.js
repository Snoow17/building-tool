import React from 'react';

const SizeSelector = ({ 
  selectedProject, 
  projectSize, 
  onSizeChange, 
  onSizeSubmit,
  sizeRecommendations,
  buildingProjects
}) => {
  const recommendations = sizeRecommendations[selectedProject];
  const project = buildingProjects.find(p => p.id === selectedProject);
  const area = (parseFloat(projectSize.width) * parseFloat(projectSize.length)).toFixed(2);
  const perimeter = ((parseFloat(projectSize.width) + parseFloat(projectSize.length)) * 2).toFixed(2);

  return (
    <div className="size-selection">
      <div className="step-header">
        <h2>Välj storlek för din {project.name}</h2>
        <p>
          Rekommenderade storlekar: {recommendations.minWidth}-{recommendations.maxWidth}m bredd, 
          {recommendations.minLength}-{recommendations.maxLength}m längd
        </p>
      </div>

      <div className="size-form">
        <div className="size-inputs">
          <div className="input-group">
            <label htmlFor="width">Bredd (meter):</label>
            <input
              type="number"
              id="width"
              value={projectSize.width}
              onChange={(e) => onSizeChange({...projectSize, width: e.target.value})}
              min={recommendations.minWidth}
              max={recommendations.maxWidth}
              step="0.1"
              placeholder={recommendations.defaultWidth.toString()}
            />
            <span className="unit">m</span>
          </div>
          
          <div className="input-group">
            <label htmlFor="length">Längd (meter):</label>
            <input
              type="number"
              id="length"
              value={projectSize.length}
              onChange={(e) => onSizeChange({...projectSize, length: e.target.value})}
              min={recommendations.minLength}
              max={recommendations.maxLength}
              step="0.1"
              placeholder={recommendations.defaultLength.toString()}
            />
            <span className="unit">m</span>
          </div>
        </div>

        {projectSize.width && projectSize.length && (
          <div className="size-preview">
            <h3>Förhandsvisning</h3>
            <div className="size-display">
              <p>Storlek: {projectSize.width}m × {projectSize.length}m</p>
              <p>Area: {area} m²</p>
              <p>Omkrets: {perimeter}m</p>
            </div>
          </div>
        )}

        <button 
          className="btn btn-primary"
          onClick={onSizeSubmit}
          disabled={!projectSize.width || !projectSize.length}
        >
          Fortsätt till grundval →
        </button>
      </div>
    </div>
  );
};

export default SizeSelector; 