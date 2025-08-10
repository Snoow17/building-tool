import React from 'react';

const FoundationSelector = ({ 
  selectedProject, 
  onFoundationSelect,
  foundationOptions,
  buildingProjects
}) => {
  const project = buildingProjects.find(p => p.id === selectedProject);

  return (
    <div className="foundation-selection">
      <div className="step-header">
        <h2>Välj grund för din {project.name}</h2>
        <p>Välj den typ av grund som passar bäst för ditt projekt</p>
      </div>

      <div className="options-grid">
        {foundationOptions.map(foundation => (
          <div 
            key={foundation.id}
            className="option-card"
            onClick={() => onFoundationSelect(foundation.id)}
          >
            <h3>{foundation.name}</h3>
            <p className="description">{foundation.description}</p>
            <p className="description">{foundation.description2}</p>

            <img 
              src={foundation.imageUrl} 
              alt={foundation.name}
              className="foundation-image"
              onError={(e) => {
                // Fallback image or hide if image fails to load
                e.target.style.display = 'none';
              }}
            />
            
            <div className="pros-cons">
              <div className="pros">
                <h4>✅ Fördelar:</h4>
                <ul>
                  {foundation.pros.map((pro, index) => (
                    <li key={index}>{pro}</li>
                  ))}
                </ul>
              </div>
              <div className="cons">
                <h4>❌ Nackdelar:</h4>
                <ul>
                  {foundation.cons.map((con, index) => (
                    <li key={index}>{con}</li>
                  ))}
                </ul>
              </div>
            </div>
            
            <div className="option-stats">
              <div className="stat">
                <span className="stat-label">Kostnad per styck:</span>
                <span className="stat-value">{foundation.costPerSt} SEK</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FoundationSelector; 