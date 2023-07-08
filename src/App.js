import { Canvas } from '@react-three/fiber'
import './App.css';

function App() {
  return (
    <div className="App">
      <Canvas>
        <ambientLight intensity={0.1} />
        <directionalLight color="red" position={[0, 0, 5]} />
        <mesh rotation={[1, 0, 1]} position={[0,1,2]}>
          <octahedronGeometry />
          <meshNormalMaterial />
        </mesh>
      </Canvas>
    </div>
  );
}

export default App;
