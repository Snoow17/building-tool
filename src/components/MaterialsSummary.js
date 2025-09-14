import React, { useState } from 'react';

function MaterialsSummary({
  selectedProject,
  projectSize,
  selectedFoundation,
  selectedJoints,
  selectedFloorboards,
  customWoodLength,
  customJointLength,
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
  const woodLength = parseFloat(customWoodLength) || 3.6; // Use custom length or default to 3.6m
  const jointLength = parseFloat(customJointLength) || 4.8; // Use custom length or default to 4.8m

  // Advanced floorboard calculations
  const floorboardPieceLength = projectSize.length || 0; // Length needed for each floorboard piece
  const totalFloorboardPiecesNeeded = floorboards ? Math.ceil(totalFloorboardMeters / floorboardPieceLength) : 0;
  
  // Calculate how many floorboard pieces we can get from each available wood piece
  const floorboardsPerWood = floorboardPieceLength > 0 ? Math.floor(woodLength / floorboardPieceLength) : 0;
  
  // If we can't get any pieces from one wood (project too long), we need one wood per piece
  const totalWoodPiecesNeeded = floorboardsPerWood > 0 
    ? Math.ceil(totalFloorboardPiecesNeeded / floorboardsPerWood) 
    : totalFloorboardPiecesNeeded;
  
  const floorboardWastePerWood = floorboardsPerWood > 0 
    ? woodLength - (floorboardsPerWood * floorboardPieceLength) 
    : 0;

  // Advanced joints calculations
  const projectWidth = parseFloat(projectSize.width) || 0;
  const projectLength = parseFloat(projectSize.length) || 0;
  
  // Calculate joints needed based on 60cm spacing
  // Width joints: joints running along the width (spacing = 60cm)
  const widthJoints = joints ? Math.ceil(projectWidth / 0.6) + 1 : 0; // +1 for the end joint
  // Length joints: joints running along the length (spacing = 60cm)  
  const lengthJoints = joints ? Math.ceil(projectLength / 0.6) + 1 : 0; // +1 for the end joint
  
  // Calculate front and back joints based on how many joints fit across the width
  // Each front/back joint needs to span the full width
  const frontBackJoints = joints ? widthJoints * 2 : 0; // Front and back edges
  const totalJointPiecesNeeded = lengthJoints + frontBackJoints; // Total joint pieces needed
  
  // Calculate how many joint pieces we can get from each available beam
  // For length joints: each piece needs to be projectLength long
  // For front/back joints: each piece needs to be projectWidth long
  const lengthJointsPerBeam = projectLength > 0 ? Math.floor(jointLength / projectLength) : 0;
  const widthJointsPerBeam = projectWidth > 0 ? Math.floor(jointLength / projectWidth) : 0;
  
  // Calculate beams needed for each type
  const beamsForLengthJoints = lengthJointsPerBeam > 0 
    ? Math.ceil(lengthJoints / lengthJointsPerBeam) 
    : lengthJoints;
    
  const beamsForWidthJoints = widthJointsPerBeam > 0 
    ? Math.ceil(frontBackJoints / widthJointsPerBeam) 
    : frontBackJoints;
  
  const totalBeamPiecesNeeded = beamsForLengthJoints + beamsForWidthJoints;
  
  // Calculate waste for each type
  const lengthJointWastePerBeam = lengthJointsPerBeam > 0 
    ? jointLength - (lengthJointsPerBeam * projectLength) 
    : 0;
    
  const widthJointWastePerBeam = widthJointsPerBeam > 0 
    ? jointLength - (widthJointsPerBeam * projectWidth) 
    : 0;
  
  // Calculate total joint length for cost calculation
  const lengthJointsTotalLength = joints && projectLength ? lengthJoints * projectLength : 0;
  const widthJointsTotalLength = joints && projectWidth ? frontBackJoints * projectWidth : 0;
  const totalJointsLength = lengthJointsTotalLength + widthJointsTotalLength;
  
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
            {(projectLength > jointLength || projectWidth > jointLength) && (
              <div className="warning-message">
                ⚠️ Projektet är längre än tillgängliga balkar. Du behöver köpa en balk per stycke.
              </div>
            )}
            <div className="quantity-selector">
              <div className="joints-info">
                <div className="info-item">
                  <span className="info-label">Balkar längs bredden (60cm c/c):</span>
                  <span className="info-value">{widthJoints} st</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Balkar längs längden (60cm c/c):</span>
                  <span className="info-value">{lengthJoints} st</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Balkar fram/bak:</span>
                  <span className="info-value">{frontBackJoints} st</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Total balkar behövs:</span>
                  <span className="info-value">{totalJointPiecesNeeded} st</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Längd per balk (längs):</span>
                  <span className="info-value">{projectLength} m</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Längd per balk (bredd):</span>
                  <span className="info-value">{projectWidth} m</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Tillgänglig längd:</span>
                  <span className="info-value">{jointLength} m</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Balkar per trä (längs):</span>
                  <span className="info-value">
                    {lengthJointsPerBeam > 0 ? `${lengthJointsPerBeam} st` : '1 st (för långt)'}
                  </span>
                </div>
                <div className="info-item">
                  <span className="info-label">Balkar per trä (bredd):</span>
                  <span className="info-value">
                    {widthJointsPerBeam > 0 ? `${widthJointsPerBeam} st` : '1 st (för långt)'}
                  </span>
                </div>
                <div className="info-item">
                  <span className="info-label">Trä att köpa:</span>
                  <span className="info-value">{totalBeamPiecesNeeded} st</span>
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
            {floorboardPieceLength > woodLength && (
              <div className="warning-message">
                ⚠️ Projektet är längre än tillgängliga brädor. Du behöver köpa en bräda per stycke.
              </div>
            )}
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
                <div className="calc-item">
                  <span className="calc-label">Längd per bräda:</span>
                  <span className="calc-value">{floorboardPieceLength} m</span>
                </div>
                <div className="calc-item">
                  <span className="calc-label">Tillgänglig längd:</span>
                  <span className="calc-value">{woodLength} m</span>
                </div>
                <div className="calc-item highlight">
                  <span className="calc-label">Totalt behov (meter):</span>
                  <span className="calc-value">{totalFloorboardMeters.toFixed(1)} m</span>
                </div>
                <div className="calc-item highlight">
                  <span className="calc-label">Antal brädor behövs:</span>
                  <span className="calc-value">{totalFloorboardPiecesNeeded} st</span>
                </div>
                <div className="calc-item">
                  <span className="calc-label">Brädor per trä:</span>
                  <span className="calc-value">
                    {floorboardsPerWood > 0 ? `${floorboardsPerWood} st` : '1 st (projekt för långt)'}
                  </span>
                </div>
                <div className="calc-item highlight">
                  <span className="calc-label">Trä att köpa:</span>
                  <span className="calc-value">{totalWoodPiecesNeeded} st</span>
                </div>
                <div className="calc-item waste">
                  <span className="calc-label">Spill per trä:</span>
                  <span className="calc-value">{floorboardWastePerWood.toFixed(1)} m</span>
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
                <li><strong>Antal att köpa: {foundationQuantity} st</strong></li>
                <li><strong>Total kostnad: {foundationTotalCost.toFixed(0)} kr</strong></li>
              </ul>
            </div>
          )}

          {joints && (
            <div className="materials-section">
              <h4>Balkar - {joints.name}</h4>
              <ul>
                <li>Dimension: {joints.name}</li>
                <li>Hållfasthet: {joints.strength}</li>
                <li>Max spännvidd: {joints.maxSpan}m</li>
                <li>Balkar längs bredden: {widthJoints} st</li>
                <li>Balkar längs längden: {lengthJoints} st</li>
                <li>Balkar fram/bak: {frontBackJoints} st</li>
                <li><strong>Total balkar: {totalJointPiecesNeeded} st</strong></li>
                <li><strong>Trä att köpa: {totalBeamPiecesNeeded} st</strong></li>
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
                <li><strong>Trä att köpa: {totalWoodPiecesNeeded} st</strong></li>
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