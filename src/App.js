import React, { useState } from 'react';
import './App.css';

// Import components
import ProjectSelector from './components/ProjectSelector';
import SizeSelector from './components/SizeSelector';
import FoundationSelector from './components/FoundationSelector';
import JointsSelector from './components/JointsSelector';
import FloorboardsSelector from './components/FloorboardsSelector';
import MaterialsSummary from './components/MaterialsSummary';

// Import data
import {
  BUILDING_PROJECTS,
  SIZE_RECOMMENDATIONS,
  FOUNDATION_OPTIONS,
  JOINT_OPTIONS,
  FLOORBOARD_OPTIONS
} from './data/buildingData';

// Main App component
function App() {
  const [currentStep, setCurrentStep] = useState('project-selection');
  const [selectedProject, setSelectedProject] = useState('');
  const [projectSize, setProjectSize] = useState({ width: '', length: '' });
  const [selectedFoundation, setSelectedFoundation] = useState('');
  const [selectedJoints, setSelectedJoints] = useState('');
  const [selectedFloorboards, setSelectedFloorboards] = useState('');

  // Event handlers
  const handleProjectSelect = (projectId) => {
    setSelectedProject(projectId);
    setCurrentStep('size-selection');
  };

  const handleSizeSubmit = () => {
    if (projectSize.width && projectSize.length) {
      setCurrentStep('foundation-selection');
    }
  };

  const handleFoundationSelect = (foundationId) => {
    setSelectedFoundation(foundationId);
    setCurrentStep('joints-selection');
  };

  const handleJointsSelect = (jointsId) => {
    setSelectedJoints(jointsId);
    setCurrentStep('floorboards-selection');
  };

  const handleFloorboardsSelect = (floorboardsId) => {
    setSelectedFloorboards(floorboardsId);
    setCurrentStep('materials-summary');
  };

  const handleBackToProjects = () => {
    setCurrentStep('project-selection');
    setSelectedProject('');
    setProjectSize({ width: '', length: '' });
    setSelectedFoundation('');
    setSelectedJoints('');
    setSelectedFloorboards('');
  };

  const handleBackToSize = () => setCurrentStep('size-selection');
  const handleBackToFoundation = () => setCurrentStep('foundation-selection');
  const handleBackToJoints = () => setCurrentStep('joints-selection');
  const handleBackToFloorboards = () => setCurrentStep('floorboards-selection');

  // Get the appropriate back handler for current step
  const getBackHandler = () => {
    switch (currentStep) {
      case 'size-selection':
        return handleBackToProjects;
      case 'foundation-selection':
        return handleBackToSize;
      case 'joints-selection':
        return handleBackToFoundation;
      case 'floorboards-selection':
        return handleBackToJoints;
      case 'materials-summary':
        return handleBackToFloorboards;
      default:
        return null;
    }
  };

  // Render current step
  const renderCurrentStep = () => {
    switch (currentStep) {
      case 'project-selection':
        return (
          <>
            <ProjectSelector 
              selectedProject={selectedProject}
              onProjectSelect={handleProjectSelect}
              buildingProjects={BUILDING_PROJECTS}
            />
            {!selectedProject && (
              <div className="welcome-message">
                <p>Välj ett byggprojekt för att komma igång</p>
              </div>
            )}
          </>
        );

      case 'size-selection':
        return (
          <SizeSelector
            selectedProject={selectedProject}
            projectSize={projectSize}
            onSizeChange={setProjectSize}
            onSizeSubmit={handleSizeSubmit}
            sizeRecommendations={SIZE_RECOMMENDATIONS}
            buildingProjects={BUILDING_PROJECTS}
          />
        );

      case 'foundation-selection':
        return (
          <FoundationSelector
            selectedProject={selectedProject}
            onFoundationSelect={handleFoundationSelect}
            foundationOptions={FOUNDATION_OPTIONS}
            buildingProjects={BUILDING_PROJECTS}
          />
        );

      case 'joints-selection':
        return (
          <JointsSelector
            selectedProject={selectedProject}
            onJointsSelect={handleJointsSelect}
            jointOptions={JOINT_OPTIONS}
            buildingProjects={BUILDING_PROJECTS}
          />
        );

      case 'floorboards-selection':
        return (
          <FloorboardsSelector
            selectedProject={selectedProject}
            onFloorboardsSelect={handleFloorboardsSelect}
            floorboardOptions={FLOORBOARD_OPTIONS}
            buildingProjects={BUILDING_PROJECTS}
          />
        );

      case 'materials-summary':
        return (
          <MaterialsSummary
            selectedProject={selectedProject}
            projectSize={projectSize}
            selectedFoundation={selectedFoundation}
            selectedJoints={selectedJoints}
            selectedFloorboards={selectedFloorboards}
            buildingProjects={BUILDING_PROJECTS}
            foundationOptions={FOUNDATION_OPTIONS}
            jointOptions={JOINT_OPTIONS}
            floorboardOptions={FLOORBOARD_OPTIONS}
          />
        );

      default:
        return null;
    }
  };

  const backHandler = getBackHandler();

  return (
    <div className="App">
      {/* Back button rendered at app level - only show when not on first step */}
      {backHandler && (
        <button className="back-button" onClick={backHandler}>
          ← Tillbaka
        </button>
      )}
      
      <div className="container">
        <h1 className="title">Byggverktyg (Building Tool)</h1>
        {renderCurrentStep()}
      </div>
    </div>
  );
}

export default App;