import React from 'react';
import { Box, OrbitControls } from '@react-three/drei';

export const Scene = ({ selectedCube }) => {
  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <OrbitControls />
      <Box material-color="orange" position={selectedCube?.position} scale={selectedCube?.scale} rotation={selectedCube?.rotation} />
    </>
  );
}
