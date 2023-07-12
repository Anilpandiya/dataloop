import React, { useState, useEffect, useRef } from 'react';
import { Canvas, useThree, useFrame, extend } from '@react-three/fiber';
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { Vector3 } from 'three';
import { Scene } from './Scene';

// extend({ OrbitControls });

const CubeEditor = () => {
  const [selectedCube, setSelectedCube] = useState({
    rotation: [0, 0, 0],
    scale: [3.5, 2, 2],
    position: [0, 0, 0]
  });

  const [showPanel, setShowPanel] = useState(false);

  const handleCanvasClick = () => {
    setShowPanel(true);
  };

  // const OrbitControlsWrapper = () => {
  //   const { camera, gl } = useThree();
  //   const controlsRef = useRef();
  //   const zoomSpeed = 0.1;

  //   useFrame(() => controlsRef.current.update());

    // useEffect(() => {
    //   const handleKeyDown = (event) => {
    //     if (event.key === 'a') {
    //       camera.zoom += zoomSpeed;
    //       camera.updateProjectionMatrix();
    //     } else if (event.key === 'z') {
    //       camera.zoom -= zoomSpeed;
    //       camera.updateProjectionMatrix();
    //     }
    //   };

    //   window.addEventListener('keydown', handleKeyDown);

    //   return () => {
    //     window.removeEventListener('keydown', handleKeyDown);
    //   };
    // }, [camera]);

  //   return <orbitControls ref={controlsRef} args={[camera, gl.domElement]} />;
  // };

  const EditorSceneXY = ({ selectedCube }) => {
    const { camera } = useThree();
    camera.position.set(1, 1, -5);
    camera.lookAt(new Vector3(0, 0, 0));

    return (
      <>
        <Scene selectedCube={selectedCube} />
      </>
    );
  };

  const EditorSceneYZ = ({ selectedCube }) => {
    const { camera } = useThree();
    camera.position.set(-5, 1, 1);
    camera.lookAt(new Vector3(0, 0, 0));

    return (
      <>
        <Scene selectedCube={selectedCube} />
      </>
    );
  };

  const EditorSceneZX = ({ selectedCube }) => {
    const { camera } = useThree();
    camera.position.set(1, -5, 1);
    camera.lookAt(new Vector3(0, 0, 0));

    return (
      <>
        <Scene selectedCube={selectedCube} />
      </>
    );
  };

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

    return (
      <div style={{ position: 'absolute', top: '10px', left: '10px', background: 'white', padding: '10px', background: 'grey' }}>
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
            max={8}
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
      </div>
    );
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', marginTop: '209px' }}>
      <div style={{ display: 'flex', flexDirection: 'row', height: '300px' }}>
        {showPanel && (
          <>
            <div style={{ display: 'flex', width: '50%', background: '#DE4839' }}>
              <h3>XY</h3>
              <Canvas>
                <EditorSceneXY selectedCube={selectedCube} />
                {/* <OrbitControlsWrapper /> */}
              </Canvas>
            </div>
            <div style={{ display: 'flex', width: '50%', background: '#46B2E0' }}>
              <h3>YZ</h3>
              <Canvas>
                <EditorSceneYZ selectedCube={selectedCube} />
                {/* <OrbitControlsWrapper /> */}
              </Canvas>
            </div>
          </>
        )}
      </div>
      <div style={{ display: 'flex', flexDirection: 'row', height: '300px' }}>
        {showPanel && (
          <div style={{ display: 'flex', width: '50%', background: '#6AC47E' }}>
            <h3>ZX</h3>
            <Canvas>
              <EditorSceneZX selectedCube={selectedCube} />
              {/* <OrbitControlsWrapper /> */}
            </Canvas>
          </div>
        )}
        <div style={{ display: 'flex', width: '50%', background: '#E5D68A' }}>
          <h3>Main</h3>
          <Canvas onClick={handleCanvasClick}>
            <Scene selectedCube={selectedCube} />
            {/* <OrbitControlsWrapper /> */}
          </Canvas>
        </div>
      </div>
      {showPanel && <EditorPanel selectedCube={selectedCube} />}

    </div>
  );
};

export default CubeEditor;
