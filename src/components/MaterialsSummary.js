import React from 'react';

function MaterialsSummary({
  selectedProject,
  projectSize,
  selectedFoundation,
  selectedJoints,
  selectedFloorboards,
  buildingProjects,
  foundationOptions,
  jointOptions,
  floorboardOptions
}) {
  // Get selected options
  const project = buildingProjects.find(p => p.id === selectedProject);
  const foundation = foundationOptions.find(f => f.id === selectedFoundation);
  const joints = jointOptions.find(j => j.id === selectedJoints);
  const floorboards = floorboardOptions.find(f => f.id === selectedFloorboards);

  // Calculate areas and quantities
  const totalArea = parseFloat(projectSize.width) * parseFloat(projectSize.length);
  const totalFloorboardMeters = floorboards ? (totalArea * floorboards.metersPerM2) : 0;
  
  // Calculate costs
  const foundationCost = foundation ? foundation.costPerSt * totalArea : 0;
  const floorboardCost = floorboards ? floorboards.costPerM2 * totalArea : 0;
  const totalCost = foundationCost + floorboardCost;

  return (
    <div className="materials-summary">
      <div className="step-header">
        <h2>Materialsammanfattning</h2>
        <p>Översikt av ditt {project?.name.toLowerCase()} projekt</p>
      </div>

      <div className="summary-container">
        {/* Project Overview */}
        <div className="project-overview">
          <h3>Projektöversikt</h3>
          <div className="overview-grid">
            <div className="overview-item">
              <span className="overview-label">Projekt:</span>
              <span className="overview-value">{project?.name}</span>
            </div>
            <div className="overview-item">
              <span className="overview-label">Storlek:</span>
              <span className="overview-value">{projectSize.width} × {projectSize.length} m</span>
            </div>
            <div className="overview-item">
              <span className="overview-label">Total yta:</span>
              <span className="overview-value">{totalArea.toFixed(1)} m²</span>
            </div>
            <div className="overview-item total-cost">
              <span className="overview-label">Total kostnad:</span>
              <span className="overview-value">{totalCost.toFixed(0)} kr</span>
            </div>
          </div>
        </div>

        {/* Floorboard Calculation */}
        {floorboards && (
          <div className="materials-section">
            <h4>Golvbrädor - {floorboards.name}</h4>
            <div className="floorboard-calculation">
              <div className="calculation-grid">
                <div className="calc-item">
                  <span className="calc-label">Total yta:</span>
                  <span className="calc-value">{totalArea.toFixed(1)} m²</span>
                </div>
                <div className="calc-item">
                  <span className="calc-label">Meter per m²:</span>
                  <span className="calc-value">{floorboards.metersPerM2} m</span>
                </div>
                <div className="calc-item highlight">
                  <span className="calc-label">Totalt behov:</span>
                  <span className="calc-value">{totalFloorboardMeters.toFixed(1)} meter</span>
                </div>
                <div className="calc-item">
                  <span className="calc-label">Kostnad:</span>
                  <span className="calc-value">{floorboardCost.toFixed(0)} kr</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Materials List */}
        <div className="materials-list">
          <h3>Materiallista</h3>
          
          {foundation && (
            <div className="materials-section">
              <h4>Grund - {foundation.name}</h4>
              <ul>
                {foundation.materials.map((material, index) => (
                  <li key={index}>{material}</li>
                ))}
              </ul>
            </div>
          )}

          {joints && (
            <div className="materials-section">
              <h4>Balkar - {joints.name}</h4>
              <ul>
                <li>Dimension: {joints.name}</li>
                <li>Hållfasthet: {joints.strength}</li>
                <li>C/C avstånd: {joints.spacing}</li>
                <li>Max spännvidd: {joints.maxSpan}m</li>
              </ul>
            </div>
          )}

          {floorboards && (
            <div className="materials-section">
              <h4>Golvbrädor - {floorboards.name}</h4>
              <ul>
                <li>Material: {floorboards.material}</li>
                <li>Avstånd mellan brädor: {floorboards.spacing}</li>
                <li><strong>Behövs totalt: {totalFloorboardMeters.toFixed(1)} meter</strong></li>
                <li><strong>Kostnad: {floorboardCost.toFixed(0)} kr</strong></li>
              </ul>
            </div>
          )}
        </div>

        <div className="action-buttons">
          <button className="btn btn-info">
            Exportera till PDF
          </button>
          <button className="btn btn-success">
            Skicka till leverantör
          </button>
        </div>
      </div>
    </div>
  );
}

export default MaterialsSummary;