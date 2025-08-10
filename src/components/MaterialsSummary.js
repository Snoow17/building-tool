import React, { useState } from 'react';

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
  // Foundation quantity state
  const [foundationQuantity, setFoundationQuantity] = useState(1);
  
  // Calculate recommended joints based on width (every 60cm) with minimum of 4
  const calculateRecommendedJoints = React.useCallback(() => {
    if (!projectSize.width) return 4;
    const width = parseFloat(projectSize.width);
    // Calculate joints needed: width in cm / 60cm spacing + 1 for the end, minimum 4
    const calculatedJoints = Math.ceil((width * 100) / 60) + 2;
    return Math.max(4, calculatedJoints);
  }, [projectSize.width]);

  // Joints quantity state - initialize with calculated value
  const [jointsQuantity, setJointsQuantity] = useState(() => calculateRecommendedJoints());

  // Get selected options
  const project = buildingProjects.find(p => p.id === selectedProject);
  const foundation = foundationOptions.find(f => f.id === selectedFoundation);
  const joints = jointOptions.find(j => j.id === selectedJoints);
  const floorboards = floorboardOptions.find(f => f.id === selectedFloorboards);

  // Calculate areas and quantities
  const totalArea = parseFloat(projectSize.width) * parseFloat(projectSize.length);
  const totalFloorboardMeters = floorboards ? (totalArea * floorboards.metersPerM2) : 0;
  const totalJointsLength = joints && projectSize.length ? jointsQuantity * parseFloat(projectSize.length) : 0;
  
  // Calculate costs with adjustable quantities
  const foundationCostPerUnit = foundation ? foundation.costPerSt : 0;
  const foundationTotalCost = foundationCostPerUnit * foundationQuantity;
  const floorboardCost = floorboards ? floorboards.costPerM2 * totalArea : 0;
  const jointsCostTotal = joints ? joints.costPerMeter * totalJointsLength : 0;
  const totalCost = foundationTotalCost + floorboardCost + jointsCostTotal;

  // Foundation quantity handlers
  const increaseFoundation = () => setFoundationQuantity(prev => prev + 1);
  const decreaseFoundation = () => setFoundationQuantity(prev => Math.max(1, prev - 1));
  const handleFoundationInputChange = (e) => {
    const value = parseInt(e.target.value);
    if (value >= 1) setFoundationQuantity(value);
  };

  // Joints quantity handlers
  const increaseJoints = () => setJointsQuantity(prev => prev + 1);
  const decreaseJoints = () => setJointsQuantity(prev => Math.max(4, prev - 1));
  const handleJointsInputChange = (e) => {
    const value = parseInt(e.target.value);
    if (value >= 4) setJointsQuantity(value);
  };

  // Update joints quantity when project size changes
  React.useEffect(() => {
    const recommended = calculateRecommendedJoints();
    setJointsQuantity(prevQuantity => Math.max(recommended, prevQuantity));
  }, [calculateRecommendedJoints]);

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

        {/* Foundation Quantity Selector */}
        {foundation && (
          <div className="materials-section">
            <h4>Grund - {foundation.name}</h4>
            <div className="quantity-selector">
              <div className="quantity-controls">
                <label className="quantity-label">Antal grundelement:</label>
                <div className="quantity-input-group">
                  <button 
                    className="quantity-btn decrease" 
                    onClick={decreaseFoundation}
                    disabled={foundationQuantity <= 1}
                  >
                    −
                  </button>
                  <input 
                    type="number" 
                    className="quantity-input"
                    value={foundationQuantity}
                    onChange={handleFoundationInputChange}
                    min="1"
                  />
                  <button 
                    className="quantity-btn increase" 
                    onClick={increaseFoundation}
                  >
                    +
                  </button>
                </div>
              </div>
              <div className="quantity-cost">
                <div className="cost-breakdown">
                  <span className="cost-label">Kostnad per enhet:</span>
                  <span className="cost-value">{foundationCostPerUnit.toFixed(0)} kr</span>
                </div>
                <div className="cost-breakdown total-foundation-cost">
                  <span className="cost-label">Total grundkostnad:</span>
                  <span className="cost-value">{foundationTotalCost.toFixed(0)} kr</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Joints Quantity Selector */}
        {joints && (
          <div className="materials-section">
            <h4>Balkar - {joints.name}</h4>
            <div className="quantity-selector">
              <div className="joints-info">
                <div className="info-item">
                  <span className="info-label">Rekommenderat antal (60cm c/c):</span>
                  <span className="info-value">{calculateRecommendedJoints()} st</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Längd per balk:</span>
                  <span className="info-value">{projectSize.length || 0} m</span>
                </div>
              </div>
              <div className="quantity-controls">
                <label className="quantity-label">Antal balkar:</label>
                <div className="quantity-input-group">
                  <button 
                    className="quantity-btn decrease" 
                    onClick={decreaseJoints}
                    disabled={jointsQuantity <= 4}
                  >
                    −
                  </button>
                  <input 
                    type="number" 
                    className="quantity-input"
                    value={jointsQuantity}
                    onChange={handleJointsInputChange}
                    min="4"
                  />
                  <button 
                    className="quantity-btn increase" 
                    onClick={increaseJoints}
                  >
                    +
                  </button>
                </div>
              </div>
              <div className="quantity-cost">
                <div className="cost-breakdown">
                  <span className="cost-label">Total längd:</span>
                  <span className="cost-value">{totalJointsLength.toFixed(1)} m</span>
                </div>
                <div className="cost-breakdown">
                  <span className="cost-label">Kostnad per meter:</span>
                  <span className="cost-value">{joints.costPerMeter} kr/m</span>
                </div>
                <div className="cost-breakdown total-joints-cost">
                  <span className="cost-label">Total balkskostnad:</span>
                  <span className="cost-value">{jointsCostTotal.toFixed(0)} kr</span>
                </div>
              </div>
            </div>
          </div>
        )}

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
              <h4>Grund - {foundation.name} (×{foundationQuantity})</h4>
              <ul>
                {foundation.materials.map((material, index) => (
                  <li key={index}>{material}</li>
                ))}
                <li><strong>Kostnad per enhet: {foundationCostPerUnit.toFixed(0)} kr</strong></li>
                <li><strong>Total grundkostnad: {foundationTotalCost.toFixed(0)} kr</strong></li>
              </ul>
            </div>
          )}

          {joints && (
            <div className="materials-section">
              <h4>Balkar - {joints.name} (×{jointsQuantity})</h4>
              <ul>
                <li>Dimension: {joints.name}</li>
                <li>Hållfasthet: {joints.strength}</li>
                <li>Max spännvidd: {joints.maxSpan}m</li>
                <li><strong>Längd per balk: {projectSize.length || 0} m</strong></li>
                <li><strong>Total längd: {totalJointsLength.toFixed(1)} m</strong></li>
                <li><strong>Total kostnad: {jointsCostTotal.toFixed(0)} kr</strong></li>
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