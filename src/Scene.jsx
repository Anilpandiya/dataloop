import React from 'react';
import { Box } from '@react-three/drei';
import { OrbitControls } from '@react-three/drei'

export const Scene = ({ selectedCube }) => {
  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <OrbitControls />
      <Box position={selectedCube?.position} scale={selectedCube?.scale} rotation={selectedCube?.rotation} />
    </>
  );
}
