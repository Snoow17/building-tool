import React from 'react';

const MaterialsSummary = ({ 
  selectedProject, 
  projectSize, 
  selectedFoundation, 
  selectedJoints, 
  selectedFloorboards,
  buildingProjects,
  foundationOptions,
  jointOptions,
  floorboardOptions
}) => {
  const project = buildingProjects.find(p => p.id === selectedProject);
  const foundation = foundationOptions.find(f => f.id === selectedFoundation);
  const joints = jointOptions.find(j => j.id === selectedJoints);
  const floorboards = floorboardOptions.find(f => f.id === selectedFloorboards);
  
  const area = (parseFloat(projectSize.width) * parseFloat(projectSize.length)).toFixed(2);
  const perimeter = (parseFloat(projectSize.width) + parseFloat(projectSize.length)) * 2;
  
  const foundationCost = foundation.costPerM2 * parseFloat(area);
  const jointsCost = joints.costPerMeter * perimeter;
  const floorboardsCost = floorboards.costPerM2 * parseFloat(area);
  const totalCost = Math.round(foundationCost + jointsCost + floorboardsCost);

  return (
    <div className="materials-summary">
      <div className="step-header">
        <h2>Materiallista för din {project.name}</h2>
        <p>Komplett lista över allt du behöver</p>
      </div>

      <div className="summary-container">
        <div className="project-overview">
          <h3>Projektöversikt</h3>
          <div className="overview-grid">
            <div className="overview-item">
              <span className="overview-label">Projekt:</span>
              <span className="overview-value">{project.name}</span>
            </div>
            <div className="overview-item">
              <span className="overview-label">Storlek:</span>
              <span className="overview-value">{projectSize.width}m × {projectSize.length}m</span>
            </div>
            <div className="overview-item">
              <span className="overview-label">Area:</span>
              <span className="overview-value">{area} m²</span>
            </div>
            <div className="overview-item">
              <span className="overview-label">Omkrets:</span>
              <span className="overview-value">{perimeter.toFixed(2)}m</span>
            </div>
            <div className="overview-item">
              <span className="overview-label">Grund:</span>
              <span className="overview-value">{foundation.name}</span>
            </div>
            <div className="overview-item">
              <span className="overview-label">Balkar:</span>
              <span className="overview-value">{joints.name}</span>
            </div>
            <div className="overview-item">
              <span className="overview-label">Golvbrädor:</span>
              <span className="overview-value">{floorboards.name}</span>
            </div>
            <div className="overview-item total-cost">
              <span className="overview-label">Total kostnad:</span>
              <span className="overview-value">{totalCost.toLocaleString()} SEK</span>
            </div>
          </div>
        </div>

        <div className="materials-list">
          <h3>Material som behövs</h3>
          
          <div className="materials-section">
            <h4>Grundmaterial ({foundation.name})</h4>
            <ul>
              {foundation.materials.map((material, index) => (
                <li key={index}>{material}</li>
              ))}
            </ul>
          </div>

          <div className="materials-section">
            <h4>Balkar ({joints.name})</h4>
            <ul>
              <li>Träbalkar {joints.name} - {perimeter.toFixed(2)}m totalt</li>
              <li>Skruvar och muttrar för balkar</li>
              <li>Behandlingsmedel för trä</li>
            </ul>
          </div>

          <div className="materials-section">
            <h4>Golvbrädor ({floorboards.name})</h4>
            <ul>
              <li>Golvbrädor {floorboards.name} - {area} m²</li>
              <li>Skruvar för golvbrädor</li>
              <li>Behandlingsmedel för trä</li>
            </ul>
          </div>

          <div className="materials-section">
            <h4>Verktyg och tillbehör</h4>
            <ul>
              <li>Skruvmejsel</li>
              <li>Borrmaskin</li>
              <li>Måttband</li>
              <li>Vattenpass</li>
              <li>Skyddsutrustning</li>
            </ul>
          </div>
        </div>

        <div className="action-buttons">
          <button className="btn btn-primary">Spara projekt</button>
          <button className="btn btn-secondary">Skriv ut materiallista</button>
          <button className="btn btn-info">Få offert</button>
          <button className="btn btn-success">Börja bygga</button>
        </div>
      </div>
    </div>
  );
};

export default MaterialsSummary; 