import React, { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrthographicCamera } from '@react-three/drei';
import { Scene } from './Scene';

const CubeEditor = () => {
  const [selectedCube, setSelectedCube] = useState({
    rotation: [0, 0, 0],
    scale: [1.5, 1.5, 1.5],
    position: [0, 0, 0]
  });

  const [cameraAngle, setCameraAngle] = useState([1, 1, 1]);

  const [showPanel, setShowPanel] = useState(false);
  const [editorCamera, setEditorCamera] = useState('xy'); // Default camera position

  const EditorPanel = ({ selectedCube }) => {
    const handleRotationChange = (event) => {
      setSelectedCube({ ...selectedCube, rotation: [event.target.value, event.target.value, event.target.value] });
    };

    const handleScaleChange = (event) => {
      setSelectedCube({ ...selectedCube, scale: [event.target.value, event.target.value, event.target.value] });
    };

    const handleTranslationChange = (event) => {
      setSelectedCube({ ...selectedCube, position: [event.target.value, event.target.value, event.target.value] });
    };

    const handleCameraChange = (axis) => {
      setEditorCamera(axis);
      if (axis === 'xy') {
        setCameraAngle([1, 1, 0]);
      }
      else if (axis === 'yz') {
        setCameraAngle([0, 1, 1]);
      }
      else if (axis === 'zx') {
        setCameraAngle([1, 0, 1]);
      }
    };

    return (
      <div style={{ position: 'absolute', top: '10px', left: '10px', background: 'white', padding: '10px' }}>
        <h2>Editor Panel</h2>
        <label>
          Rotation:
          <input
            type="range"
            min={0}
            max={Math.PI * 2}
            step={0.1}
            value={selectedCube?.rotation?.[0]}
            onChange={handleRotationChange}
          />
        </label>
        <label>
          Scale:
          <input
            type="range"
            min={0.1}
            max={2}
            step={0.1}
            value={selectedCube?.scale?.[0]}
            onChange={handleScaleChange}
          />
        </label>
        <label>
          Position:
          <input
            type="range"
            min={-2}
            max={2}
            step={0.1}
            value={selectedCube?.position?.[0]}
            onChange={handleTranslationChange}
          />
        </label>
        <h3>Camera Position:</h3>
        <button onClick={() => handleCameraChange('xy')} disabled={editorCamera === 'xy'}>
          [x, y]
        </button>
        <button onClick={() => handleCameraChange('yz')} disabled={editorCamera === 'yz'}>
          [y, z]
        </button>
        <button onClick={() => handleCameraChange('zx')} disabled={editorCamera === 'zx'}>
          [z, x]
        </button>
      </div>
    );
  };

  const handleCanvasClick = () => {
    setShowPanel(true);
    setCameraAngle([1, 1, 1]);
  };

  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <Canvas onClick={handleCanvasClick}>
        <OrthographicCamera zoom={170} position={cameraAngle} makeDefault />
        <Scene selectedCube={selectedCube} />
      </Canvas>
      {showPanel && <EditorPanel selectedCube={selectedCube} setCameraAngle={setCameraAngle} />}
    </div>
  );
};

export default CubeEditor;
