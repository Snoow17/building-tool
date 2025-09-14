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
  // Updated calculateRecommendedJoints function (replace the existing one):
const calculateRecommendedJoints = React.useCallback(() => {
  if (!projectSize.width || !projectSize.length) return 4;
  
  const width = parseFloat(projectSize.width);
  
  // Calculate using the same logic as the main calculation
  const frontBack = 2;
  const support = Math.max(0, Math.floor(width / 0.6) - 1);
  const sides = 2;
  
  return Math.max(4, frontBack + support + sides);
}, [projectSize.width, projectSize.length]);

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

  const projectWidth = parseFloat(projectSize.width) || 0;
const projectLength = parseFloat(projectSize.length) || 0;

// Advanced floorboard calculations - IMPROVED VERSION
const calculateFloorboardsNeeded = () => {
  if (!totalArea || !floorboards) return {
    totalMetersNeeded: 0,
    boardLength: 0,
    numberOfBoardsNeeded: 0,
    piecesPerWood: 0,
    woodPiecesToBuy: 0,
    wastePerPiece: 0,
    totalWaste: 0,
    layoutDirection: 'width'
  };

  // Total linear meters needed based on coverage
  const totalMetersNeeded = totalArea * floorboards.metersPerM2;

  // Calculate for both directions
  const widthDirection = calculateDirection(projectWidth, projectLength, totalMetersNeeded, 'width');
  const lengthDirection = calculateDirection(projectLength, projectWidth, totalMetersNeeded, 'length');

  // Choose direction with less waste
  return widthDirection.totalWaste <= lengthDirection.totalWaste ? widthDirection : lengthDirection;
};

const calculateDirection = (boardLength, projectSpan, totalMetersNeeded, direction) => {
  // How many boards needed to cover the span (total linear meters divided by board length)
  const numberOfBoardsNeeded = Math.ceil(totalMetersNeeded / boardLength);
  
  // How many pieces can we get from each available wood piece
  const piecesPerWood = boardLength > 0 ? Math.floor(woodLength / boardLength) : 0;
  
  // If board length exceeds available wood, each board needs its own piece
  const woodPiecesToBuy = piecesPerWood > 0 
    ? Math.ceil(numberOfBoardsNeeded / piecesPerWood)
    : numberOfBoardsNeeded;

  // Calculate waste
  const wastePerPiece = piecesPerWood > 0 
    ? woodLength - (piecesPerWood * boardLength)
    : Math.max(0, woodLength - boardLength);
  
  const totalWaste = wastePerPiece * woodPiecesToBuy;

  return {
    totalMetersNeeded,
    boardLength,
    numberOfBoardsNeeded,
    piecesPerWood,
    woodPiecesToBuy,
    wastePerPiece,
    totalWaste,
    layoutDirection: direction
  };
};

const floorboardCalc = calculateFloorboardsNeeded();

// Update the variables for backward compatibility
const floorboardPieceLength = floorboardCalc.boardLength;
const totalFloorboardPiecesNeeded = floorboardCalc.numberOfBoardsNeeded;
const floorboardsPerWood = floorboardCalc.piecesPerWood;
const totalWoodPiecesNeeded = floorboardCalc.woodPiecesToBuy;
const floorboardWastePerWood = floorboardCalc.wastePerPiece;

// Advanced joints calculations - IMPROVED VERSION
const calculateJointsNeeded = () => {
  if (!projectWidth || !projectLength) return { 
    frontBack: 0, 
    support: 0, 
    sides: 0, 
    total: 0,
    frontBackLength: 0,
    supportLength: 0,
    sidesLength: 0,
    totalLength: 0,
    frontBackPieces: 0,
    supportPieces: 0,
    sidePieces: 0,
    totalPieces: 0
  };
  
  // 1. Front and back joints - each needs to span the full width
  const frontBack = 2; // Always need 2 (front + back)
  const frontBackLength = projectWidth * frontBack;
  
  // Calculate how many pieces needed for front/back based on available length
  const piecesPerFrontBack = Math.ceil(projectWidth / jointLength);
  const frontBackPieces = piecesPerFrontBack * 2; // 2 edges
  
  // 2. Support joints - spaced every 60cm along the width, spanning the length
  // Don't count the edges (front/back) as they're already included above
  const numberOfSupportJoints = Math.max(0, Math.floor((projectWidth - 0.6) / 0.6));
  const supportLength = projectLength * numberOfSupportJoints;
  
  // Calculate how many pieces needed for support joints
  const piecesPerSupport = numberOfSupportJoints > 0 ? Math.ceil(projectLength / jointLength) : 0;
  const supportPieces = piecesPerSupport * numberOfSupportJoints;
  
  // 3. Side joints - left and right edges, each spanning full length
  const sides = 2;
  const sidesLength = projectLength * sides;
  
  // Calculate how many pieces needed for sides
  const piecesPerSide = Math.ceil(projectLength / jointLength);
  const sidePieces = piecesPerSide * 2; // 2 sides
  
  const totalLength = frontBackLength + supportLength + sidesLength;
  const totalPieces = frontBackPieces + supportPieces + sidePieces;
  
  return {
    frontBack,
    support: numberOfSupportJoints,
    sides,
    total: frontBack + numberOfSupportJoints + sides,
    frontBackLength,
    supportLength,
    sidesLength,
    totalLength,
    frontBackPieces,
    supportPieces,
    sidePieces,
    totalPieces
  };
};

const jointsBreakdown = calculateJointsNeeded();

// Use the actual pieces calculation instead of basic beam count
const actualBeamsNeeded = jointsBreakdown.totalPieces;

// Calculate waste more accurately
const totalLengthUsed = jointsBreakdown.totalLength;
const totalLengthPurchased = actualBeamsNeeded * jointLength;
const wasteLength = totalLengthPurchased - totalLengthUsed;

// Use the user-selected quantity for cost calculation (allow override)
const finalJointsQuantity = Math.max(jointsQuantity, jointsBreakdown.total);

// Calculate adjustment based on actual needs vs recommendation
const adjustmentFactor = jointsBreakdown.total > 0 ? finalJointsQuantity / jointsBreakdown.total : 1;
const adjustedJointsLength = jointsBreakdown.totalLength * adjustmentFactor;
const adjustedBeamsNeeded = Math.ceil(adjustedJointsLength / jointLength);

// Update cost calculation
const jointsCostTotal = joints ? joints.costPerMeter * adjustedJointsLength : 0;

// Keep these for backward compatibility in the display
const totalJointsLength = adjustedJointsLength;
const totalJointPiecesNeeded = finalJointsQuantity;
const totalBeamPiecesNeeded = adjustedBeamsNeeded;

// For display purposes, calculate individual values
const widthJoints = jointsBreakdown.support;
const lengthJoints = jointsBreakdown.sides;
const frontBackJoints = jointsBreakdown.frontBack;
  
  // Calculate costs with adjustable quantities
  const foundationCostPerUnit = foundation ? foundation.costPerSt : 0;
  const foundationTotalCost = foundationCostPerUnit * foundationQuantity;
  const floorboardCost = floorboards ? floorboards.costPerM2 * totalArea : 0;
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
              <span className="info-label">Kantbalkar (fram/bak):</span>
              <span className="info-value">{jointsBreakdown.frontBack} st × {projectWidth.toFixed(1)}m = {jointsBreakdown.frontBackPieces} träbitar</span>
            </div>
            <div className="info-item">
              <span className="info-label">Stödbalkar (60cm c/c):</span>
              <span className="info-value">{jointsBreakdown.support} st × {projectLength.toFixed(1)}m = {jointsBreakdown.supportPieces} träbitar</span>
            </div>
            <div className="info-item">
              <span className="info-label">Sidbalkar (vänster/höger):</span>
              <span className="info-value">{jointsBreakdown.sides} st × {projectLength.toFixed(1)}m = {jointsBreakdown.sidePieces} träbitar</span>
            </div>
            <div className="info-item highlight">
              <span className="info-label">Rekommenderat antal balkar:</span>
              <span className="info-value">{jointsBreakdown.total} st</span>
            </div>
            <div className="info-item">
              <span className="info-label">Valt antal balkar:</span>
              <span className="info-value">{finalJointsQuantity} st</span>
            </div>
            <div className="info-item">
              <span className="info-label">Total längd behövs:</span>
              <span className="info-value">{adjustedJointsLength.toFixed(1)} m</span>
            </div>
            <div className="info-item">
              <span className="info-label">Tillgänglig längd per trä:</span>
              <span className="info-value">{jointLength} m</span>
            </div>
            <div className="info-item highlight">
              <span className="info-label">Träbitar att köpa:</span>
              <span className="info-value">{totalBeamPiecesNeeded} st</span>
            </div>
            <div className="info-item">
              <span className="info-label">Beräknat på verkliga mått:</span>
              <span className="info-value">{actualBeamsNeeded} st (utan justering)</span>
            </div>
            <div className="info-item waste">
              <span className="info-label">Spill:</span>
              <span className="info-value">{wasteLength > 0 ? wasteLength.toFixed(1) + ' m' : 'Ingen'}</span>
            </div>
            {(projectLength > jointLength || projectWidth > jointLength) && (
              <div className="info-item warning">
                <span className="info-label">⚠️ Varning:</span>
                <span className="info-value">Vissa balkar behöver delas/skarvs</span>
              </div>
            )}
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
                {floorboardCalc.boardLength > woodLength && (
                  <div className="warning-message">
                    ⚠️ Projektet kräver längre brädor än tillgängligt ({floorboardCalc.boardLength.toFixed(1)}m behövs, {woodLength}m tillgängligt).
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
                      <span className="calc-label">Optimal riktning:</span>
                      <span className="calc-value">
                        {floorboardCalc.layoutDirection === 'width' ? 'Tvärs projektet' : 'Längs projektet'}
                      </span>
                    </div>
                    <div className="calc-item">
                      <span className="calc-label">Längd per bräda:</span>
                      <span className="calc-value">{floorboardCalc.boardLength.toFixed(1)} m</span>
                    </div>
                    <div className="calc-item">
                      <span className="calc-label">Tillgänglig trälängd:</span>
                      <span className="calc-value">{woodLength} m</span>
                    </div>
                    <div className="calc-item highlight">
                      <span className="calc-label">Totalt behov (löpmeter):</span>
                      <span className="calc-value">{floorboardCalc.totalMetersNeeded.toFixed(1)} m</span>
                    </div>
                    <div className="calc-item highlight">
                      <span className="calc-label">Antal brädor behövs:</span>
                      <span className="calc-value">{floorboardCalc.numberOfBoardsNeeded} st</span>
                    </div>
                    <div className="calc-item">
                      <span className="calc-label">Brädor per träbit:</span>
                      <span className="calc-value">
                        {floorboardCalc.piecesPerWood > 0 
                          ? `${floorboardCalc.piecesPerWood} st` 
                          : '1 st (kräver delning/skarv)'}
                      </span>
                    </div>
                    <div className="calc-item highlight">
                      <span className="calc-label">Träbitar att köpa:</span>
                      <span className="calc-value">{floorboardCalc.woodPiecesToBuy} st</span>
                    </div>
                    <div className="calc-item waste">
                      <span className="calc-label">Spill per träbit:</span>
                      <span className="calc-value">{floorboardCalc.wastePerPiece.toFixed(1)} m</span>
                    </div>
                    <div className="calc-item waste">
                      <span className="calc-label">Totalt spill:</span>
                      <span className="calc-value">{floorboardCalc.totalWaste.toFixed(1)} m</span>
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