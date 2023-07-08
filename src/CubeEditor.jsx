import React, { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { Box } from '@react-three/drei';
import { OrbitControls } from '@react-three/drei'

function CubeEditor() {
  const [selectedCube, setSelectedCube] = useState(null);

  const handleCubeClick = (event) => {
    // console.log('handleCubeClick', event);
    setSelectedCube(event?.object || true);
  };

  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <Canvas
        camera={{ position: [0, 0, 5] }}
        onClick={handleCubeClick}
      >
        <Scene selectedCube={selectedCube} />
      </Canvas>
      {selectedCube && (
        <EditorPanel selectedCube={selectedCube} />
      )}
    </div>
  );
}

function Scene({ selectedCube }) {
  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <OrbitControls />
      <Box position={[0, 0, 0]} scale={selectedCube?.scale} rotation={selectedCube?.rotation} />
    </>
  );
}

function EditorPanel({ selectedCube }) {
  const handleRotationChange = (event) => {
    selectedCube?.rotation?.set(event.target.value, 0, 0);
  };

  const handleScaleChange = (event) => {
    selectedCube?.scale?.set(event.target.value, event.target.value, event.target.value);
  };

  const handleTranslationChange = (event) => {
    selectedCube?.position?.set(event.target.value, event.target.value, event.target.value);
  };

  return (
    <div style={{ position: 'absolute', top: '10px', left: '10px', background: 'white', padding: '10px' }}>
      <h2>Editor Panel</h2>
      <label>
        Rotation:
        <input type="range" min={0} max={Math.PI * 2} step={0.1} value={selectedCube?.rotation?.x} onChange={handleRotationChange} />
      </label>
      <label>
        Scale:
        <input type="range" min={0.1} max={2} step={0.1} value={selectedCube?.scale?.x} onChange={handleScaleChange} />
      </label>
      <label>
        Translation:
        <input type="range" min={-2} max={2} step={0.1} value={selectedCube?.position?.x} onChange={handleTranslationChange} />
      </label>
    </div>
  );
}

export default CubeEditor;
