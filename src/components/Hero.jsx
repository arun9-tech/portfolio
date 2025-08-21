import { useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import { motion } from 'framer-motion';
import * as THREE from 'three';

// This component contains the entire virus animation logic
function SynapseAnimation({ count = 4000 }) {
  const points = useRef();
  const lines = useRef();

  // Generate the initial positions of the particles (nodes)
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      const t = Math.random() * 100;
      const factor = 20 + Math.random() * 100;
      const x = (Math.random() - 0.5) * factor; // Centered
      const y = (Math.random() - 0.5) * factor; // Centered
      const z = (Math.random() - 0.5) * factor; // Centered
      temp.push({ t, factor, x, y, z });
    }
    return temp;
  }, [count]);

  const lineSegments = useMemo(() => new THREE.LineSegments(
    new THREE.BufferGeometry().setAttribute('position', new THREE.BufferAttribute(new Float32Array(50 * 2 * 3), 3)),
    new THREE.LineBasicMaterial({ color: '#8E2DE2', transparent: true, opacity: 0.5 })
  ), []);

  // This runs on every frame, updating the animation
  useFrame((state) => {
    // === THE FIX IS HERE ===
    // We now use a standard for loop that iterates up to the number of particles.
    // This ensures we never go out of bounds on the `particles` array.
    for (let i = 0; i < particles.length; i++) {
      const i3 = i * 3;
      const p = particles[i]; // This is now always a valid particle object

      // Update the 3D geometry's position array
      points.current.geometry.attributes.position.array[i3] = p.x + Math.cos(p.t / 10) * 1;
      points.current.geometry.attributes.position.array[i3 + 1] = p.y + Math.sin(p.t / 10) * 1;
      points.current.geometry.attributes.position.array[i3 + 2] = p.z + Math.cos(p.t / 15) * 1;

      // Update the particle's internal time property for the next frame
      particles[i].t += 0.01;
    }
    points.current.geometry.attributes.position.needsUpdate = true;
    // === END OF FIX ===

    // Make the whole field react to mouse movement
    points.current.rotation.y = state.mouse.x * 0.2;
    points.current.rotation.x = state.mouse.y * 0.2;

    // Create the "virus" lines
    const linePositions = lines.current.geometry.attributes.position;
    for (let i = 0; i < 50; i++) {
      const i3 = i * 2 * 3;
      const p1Index = Math.floor(Math.random() * count);
      const p2Index = Math.floor(Math.random() * count);
      const p1 = points.current.geometry.attributes.position.array.slice(p1Index * 3, p1Index * 3 + 3);
      const p2 = points.current.geometry.attributes.position.array.slice(p2Index * 3, p2Index * 3 + 3);
      
      linePositions.array[i3] = p1[0];
      linePositions.array[i3 + 1] = p1[1];
      linePositions.array[i3 + 2] = p1[2];
      linePositions.array[i3 + 3] = p2[0];
      linePositions.array[i3 + 4] = p2[1];
      linePositions.array[i3 + 5] = p2[2];
    }
    linePositions.needsUpdate = true;
  });

  return (
    <>
      <points ref={points}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={particles.length}
            array={new Float32Array(particles.flatMap(p => [p.x, p.y, p.z]))}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial size={0.035} color="#4A00E0" />
      </points>
      <primitive object={lineSegments} ref={lines} />
    </>
  );
}

// This is the main Hero component that gets exported
export default function Hero() {
  return (
    <div className="hero-container">
      <Canvas camera={{ position: [0, 0, 70], fov: 75 }}>
        <color attach="background" args={['#000000']} />
        <SynapseAnimation />
        <EffectComposer>
          <Bloom luminanceThreshold={0.1} intensity={0.75} radius={0.5} />
        </EffectComposer>
      </Canvas>
      
      <motion.div
        className="hero-title"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        <h1>Arun Kumar</h1>
        <p>Digital Architect & Creative Coder</p>
      </motion.div>
    </div>
  );
}