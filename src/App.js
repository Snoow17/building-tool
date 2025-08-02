import React, { useState } from 'react';
import './App.css';

function App() {
  const [selectedProject, setSelectedProject] = useState('');
  const [projectDetails, setProjectDetails] = useState(null);

  const buildingProjects = [
    {
      id: 'porch',
      name: 'Veranda (Porch)',
      description: 'En vacker veranda för att njuta av utomhuslivet',
      materials: ['Trä', 'Betong', 'Takpannor', 'Räcken'],
      estimatedTime: '2-4 veckor',
      difficulty: 'Medel'
    },
    {
      id: 'wall',
      name: 'Vägg (Wall)',
      description: 'Solid vägg för att skapa rum och struktur',
      materials: ['Tegel', 'Cement', 'Isolering', 'Gips'],
      estimatedTime: '1-2 veckor',
      difficulty: 'Enkel'
    },
    {
      id: 'roof',
      name: 'Tak (Roof)',
      description: 'Skyddande tak för att skydda mot väder och vind',
      materials: ['Takpannor', 'Trä', 'Isolering', 'Vattenavledning'],
      estimatedTime: '3-5 veckor',
      difficulty: 'Avancerad'
    },
    {
      id: 'deck',
      name: 'Terrass (Deck)',
      description: 'Träterrass för utomhusaktivitet och avkoppling',
      materials: ['Trä', 'Skruvar', 'Behandlingsmedel', 'Grund'],
      estimatedTime: '1-3 veckor',
      difficulty: 'Medel'
    },
    {
      id: 'shed',
      name: 'Förråd (Shed)',
      description: 'Praktiskt förråd för verktyg och lagring',
      materials: ['Trä', 'Takpannor', 'Dörr', 'Fönster'],
      estimatedTime: '2-3 veckor',
      difficulty: 'Medel'
    },
    {
      id: 'fence',
      name: 'Staket (Fence)',
      description: 'Staket för att avgränsa tomten och skapa privatliv',
      materials: ['Trä', 'Metall', 'Cement', 'Skruvar'],
      estimatedTime: '1-2 veckor',
      difficulty: 'Enkel'
    },
    {
      id: 'garage',
      name: 'Garage (Garage)',
      description: 'Garage för att skydda fordon och lagra verktyg',
      materials: ['Betong', 'Tegel', 'Port', 'Isolering'],
      estimatedTime: '4-6 veckor',
      difficulty: 'Avancerad'
    },
    {
      id: 'garden-house',
      name: 'Trädgårdshus (Garden House)',
      description: 'Charmigt trädgårdshus för sommarkvällar',
      materials: ['Trä', 'Glas', 'Takpannor', 'Isolering'],
      estimatedTime: '3-4 veckor',
      difficulty: 'Avancerad'
    }
  ];

  const handleProjectSelect = (projectId) => {
    setSelectedProject(projectId);
    const project = buildingProjects.find(p => p.id === projectId);
    setProjectDetails(project);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>🏗️ Byggverktyg (Building Tool)</h1>
        <p>Välj ditt byggprojekt och få hjälp med planering</p>
      </header>
      
      <main className="App-main">
        <div className="project-selector">
          <label htmlFor="project-dropdown">Välj byggprojekt:</label>
          <select 
            id="project-dropdown"
            value={selectedProject}
            onChange={(e) => handleProjectSelect(e.target.value)}
            className="project-dropdown"
          >
            <option value="">-- Välj ett projekt --</option>
            {buildingProjects.map(project => (
              <option key={project.id} value={project.id}>
                {project.name}
              </option>
            ))}
          </select>
        </div>

        {projectDetails && (
          <div className="project-details">
            <h2>{projectDetails.name}</h2>
            <p className="project-description">{projectDetails.description}</p>
            
            <div className="project-info-grid">
              <div className="info-card">
                <h3>Material som behövs:</h3>
                <ul>
                  {projectDetails.materials.map((material, index) => (
                    <li key={index}>{material}</li>
                  ))}
                </ul>
              </div>
              
              <div className="info-card">
                <h3>Uppskattad tid:</h3>
                <p className="time-estimate">{projectDetails.estimatedTime}</p>
              </div>
              
              <div className="info-card">
                <h3>Svårighetsgrad:</h3>
                <p className={`difficulty ${projectDetails.difficulty.toLowerCase()}`}>
                  {projectDetails.difficulty}
                </p>
              </div>
            </div>

            <div className="action-buttons">
              <button className="btn btn-primary">Spara projekt</button>
              <button className="btn btn-secondary">Skriv ut plan</button>
              <button className="btn btn-info">Få offert</button>
            </div>
          </div>
        )}

        {!selectedProject && (
          <div className="welcome-message">
            <h2>Välkommen till Byggverktyget!</h2>
            <p>Välj ett byggprojekt från menyn ovan för att komma igång med din planering.</p>
            <div className="feature-list">
              <h3>Vad kan du göra här:</h3>
              <ul>
                <li>✅ Välja mellan populära svenska byggprojekt</li>
                <li>📋 Se materiallista för varje projekt</li>
                <li>⏱️ Få uppskattad byggtid</li>
                <li>📊 Se svårighetsgrad för projektet</li>
                <li>💾 Spara dina projekt för senare</li>
              </ul>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
