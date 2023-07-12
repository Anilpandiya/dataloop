import React, { useEffect, useRef } from 'react';
import { useThree, useFrame, extend } from '@react-three/fiber';

import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
// extend({ OrbitControls });

const WoodenBox = (props) => {
  // const textureUrl = 'https://fastly.picsum.photos/id/307/5000/3333.jpg?hmac=wQFGsFoqFNhjL7Vf3y12D-qiKGUAl-BuhTbFJthHH4I';
  const imgPath = require('./resources/images/wooden_texture.jpg');

  return (
    <mesh {...props}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial map={new THREE.TextureLoader().load(imgPath)} />
    </mesh>
  );
}

export const Scene = ({ selectedCube }) => {

  // const OrbitControlsWrapper = () => {
  //   const { camera, gl } = useThree();
  //   const controlsRef = useRef();
  //   const zoomSpeed = 0.1;

  //   useFrame(() => controlsRef.current.update());

  //   useEffect(() => {
  //     const handleKeyDown = (event) => {
  //       if (event.key === 'a') {
  //         camera.zoom += zoomSpeed;
  //         camera.updateProjectionMatrix();
  //       } else if (event.key === 'z') {
  //         camera.zoom -= zoomSpeed;
  //         camera.updateProjectionMatrix();
  //       }
  //     };

  //     window.addEventListener('keydown', handleKeyDown);

  //     return () => {
  //       window.removeEventListener('keydown', handleKeyDown);
  //     };
  //   }, [camera]);

  //   return <orbitControls ref={controlsRef} args={[camera, gl.domElement]} />;
  // };

  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      {/* <axesHelper /> */}
      <WoodenBox position={selectedCube?.position} scale={selectedCube?.scale} rotation={selectedCube?.rotation} />
      <OrbitControls />
      {/* <OrbitControlsWrapper /> */}
    </>
  );
}
