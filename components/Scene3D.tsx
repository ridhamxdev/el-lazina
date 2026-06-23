"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Icosahedron } from "@react-three/drei";
import * as THREE from "three";

function Blob() {
  const mesh = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!mesh.current) return;
    const t = state.clock.getElapsedTime();
    mesh.current.rotation.y = t * 0.12;
    mesh.current.rotation.z = t * 0.05;
    // gentle parallax toward the pointer
    mesh.current.position.x = THREE.MathUtils.lerp(
      mesh.current.position.x,
      state.pointer.x * 0.6,
      0.04
    );
    mesh.current.position.y = THREE.MathUtils.lerp(
      mesh.current.position.y,
      state.pointer.y * 0.4,
      0.04
    );
  });

  return (
    <Float speed={1.4} rotationIntensity={0.5} floatIntensity={1.2}>
      <Icosahedron ref={mesh} args={[1.4, 6]} position={[0, 0, 0]}>
        <MeshDistortMaterial
          color="#c8763c"
          emissive="#e7a94b"
          emissiveIntensity={0.18}
          roughness={0.18}
          metalness={0.85}
          distort={0.42}
          speed={1.6}
        />
      </Icosahedron>
    </Float>
  );
}

function Particles({ count = 320 }: { count?: number }) {
  const points = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 4 + Math.random() * 6;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta) * 0.6;
      arr[i * 3 + 2] = r * Math.cos(phi);
    }
    return arr;
  }, [count]);

  useFrame((state) => {
    if (points.current) {
      points.current.rotation.y = state.clock.getElapsedTime() * 0.03;
    }
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.028}
        color="#e7a94b"
        transparent
        opacity={0.7}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

export default function Scene3D() {
  return (
    <Canvas
      dpr={[1, 1.8]}
      camera={{ position: [0, 0, 5], fov: 42 }}
      gl={{ antialias: true, alpha: true }}
    >
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 6, 4]} intensity={2.4} color="#ffd9a0" />
      <pointLight position={[-6, -3, -2]} intensity={40} color="#8a5cff" />
      <pointLight position={[4, 2, 3]} intensity={26} color="#e7a94b" />
      <Blob />
      <Particles />
    </Canvas>
  );
}
