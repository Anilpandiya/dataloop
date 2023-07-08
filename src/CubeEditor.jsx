import React, { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment } from '@react-three/drei';
import { Scene } from './Scene';

const CubeEditor = () => {
  const [selectedCube, setSelectedCube] = useState({
    rotation: [0, 0, 0],
    scale: [1.5, 1.5, 1.5],
    position: [0, 0, 0]
  });

  const [showPanel, setShowPanel] = useState(false);

  const EditorPanel = ({ selectedCube }) => {
    const handleRotationChange = (event) => {
      setSelectedCube({ ...selectedCube, rotation: [event.target.value, event.target.value, event.target.value] })
    };

    const handleScaleChange = (event) => {
      setSelectedCube({ ...selectedCube, scale: [event.target.value, event.target.value, event.target.value] })
    };

    const handleTranslationChange = (event) => {
      setSelectedCube({ ...selectedCube, position: [event.target.value, event.target.value, event.target.value] })
    };

    return (
      <div style={{ position: 'absolute', top: '10px', left: '10px', background: 'white', padding: '10px' }}>
        <h2>Editor Panel</h2>
        <label>
          Rotation:
          <input type="range" min={0} max={Math.PI * 2} step={0.1} value={selectedCube?.rotation?.[0]} onChange={handleRotationChange} />
        </label>
        <label>
          Scale:
          <input type="range" min={0.1} max={2} step={0.1} value={selectedCube?.scale?.[0]} onChange={handleScaleChange} />
        </label>
        <label>
          Position:
          <input type="range" min={-2} max={2} step={0.1} value={selectedCube?.position?.[0]} onChange={handleTranslationChange} />
        </label>
      </div>
    );
  }

  const handleCubeClick = () => setShowPanel(true);

  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <Canvas camera={{ position: [0, 0, 5] }} onClick={handleCubeClick}>
        <Scene selectedCube={selectedCube} />
        <Environment preset="night" background blur={0.6} />
      </Canvas>
      {showPanel && (
        <EditorPanel selectedCube={selectedCube} />
      )}
    </div>
  );
};

export default CubeEditor;
