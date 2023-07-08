import React from 'react';
import * as THREE from 'three';
import { OrbitControls } from '@react-three/drei';

function WoodenBox(props) {
  const textureUrl = 'https://fastly.picsum.photos/id/307/5000/3333.jpg?hmac=wQFGsFoqFNhjL7Vf3y12D-qiKGUAl-BuhTbFJthHH4I';

  return (
    <mesh {...props}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial map={new THREE.TextureLoader().load(textureUrl)} />
    </mesh>
  );
}

export const Scene = ({ selectedCube }) => {
  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <OrbitControls />
      <WoodenBox position={selectedCube?.position} scale={selectedCube?.scale} rotation={selectedCube?.rotation} />
    </>
  );
}
