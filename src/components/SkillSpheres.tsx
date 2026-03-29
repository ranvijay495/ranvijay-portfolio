import { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Physics, RigidBody, BallCollider, CuboidCollider, type RapierRigidBody } from '@react-three/rapier';
import { Environment } from '@react-three/drei';
import * as THREE from 'three';
import './styles/SkillSpheres.css';

const SKILLS = [
  'M&A', 'Strategy', 'Finance', 'Analytics',
  'Operations', 'Leadership', 'Cloud', 'IoT',
  'Maritime', 'Compliance', 'M&A', 'Strategy',
  'Finance', 'Analytics', 'Operations', 'Leadership',
  'Cloud', 'IoT', 'Maritime', 'Compliance',
  'M&A', 'Strategy', 'Finance', 'Analytics',
  'Operations', 'Leadership', 'Cloud', 'IoT',
  'Maritime', 'Compliance',
];

const COLORS = [
  '#5eead4', '#14b8a6', '#67e8f9', '#a5f3fc',
  '#2dd4bf', '#99f6e4', '#06b6d4', '#22d3ee',
  '#0891b2', '#5eead4',
];

function createTextTexture(text: string, color: string) {
  const size = 256;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d')!;

  // Background circle
  ctx.beginPath();
  ctx.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2);
  ctx.fillStyle = '#0a0e17';
  ctx.fill();

  // Border
  ctx.beginPath();
  ctx.arc(size / 2, size / 2, size / 2 - 4, 0, Math.PI * 2);
  ctx.strokeStyle = color;
  ctx.lineWidth = 3;
  ctx.stroke();

  // Text
  ctx.fillStyle = color;
  ctx.font = 'bold 32px Inter, sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(text, size / 2, size / 2);

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

function Sphere({ position, text, color, scale }: {
  position: [number, number, number];
  text: string;
  color: string;
  scale: number;
}) {
  const texture = useMemo(() => createTextTexture(text, color), [text, color]);

  return (
    <RigidBody
      position={position}
      colliders={false}
      linearDamping={0.75}
      angularDamping={0.15}
      restitution={0.5}
      friction={0.2}
    >
      <BallCollider args={[scale]} />
      <mesh scale={scale}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial
          map={texture}
          metalness={0.3}
          roughness={0.4}
          emissive={color}
          emissiveIntensity={0.05}
        />
      </mesh>
    </RigidBody>
  );
}

function Pointer() {
  const ref = useRef<RapierRigidBody>(null);
  const { viewport } = useThree();

  useFrame(({ pointer }) => {
    ref.current?.setNextKinematicTranslation({
      x: (pointer.x * viewport.width) / 2,
      y: (pointer.y * viewport.height) / 2,
      z: 0,
    });
  });

  return (
    <RigidBody type="kinematicPosition" ref={ref} colliders={false}>
      <BallCollider args={[1.5]} />
    </RigidBody>
  );
}

function Walls() {
  const { viewport } = useThree();
  const hw = viewport.width / 2 + 1;
  const hh = viewport.height / 2 + 1;

  return (
    <>
      <RigidBody type="fixed" position={[0, -hh, 0]} colliders={false}>
        <CuboidCollider args={[hw, 0.5, 2]} />
      </RigidBody>
      <RigidBody type="fixed" position={[0, hh, 0]} colliders={false}>
        <CuboidCollider args={[hw, 0.5, 2]} />
      </RigidBody>
      <RigidBody type="fixed" position={[-hw, 0, 0]} colliders={false}>
        <CuboidCollider args={[0.5, hh, 2]} />
      </RigidBody>
      <RigidBody type="fixed" position={[hw, 0, 0]} colliders={false}>
        <CuboidCollider args={[0.5, hh, 2]} />
      </RigidBody>
    </>
  );
}

export default function SkillSpheres() {
  const spheres = useMemo(
    () =>
      SKILLS.map((text, i) => ({
        text,
        color: COLORS[i % COLORS.length],
        scale: 0.7 + Math.random() * 0.3,
        position: [
          (Math.random() - 0.5) * 8,
          (Math.random() - 0.5) * 6 + 3,
          (Math.random() - 0.5) * 2,
        ] as [number, number, number],
      })),
    []
  );

  return (
    <div className="skill-spheres-section">
      <h3 className="reveal">Skills & Domains</h3>
      <div className="skill-spheres-canvas">
        <Canvas
          camera={{ position: [0, 0, 15], fov: 50 }}
          dpr={[1, 1.5]}
          gl={{ antialias: false, stencil: false, depth: true }}
        >
          <ambientLight intensity={0.6} />
          <pointLight position={[10, 10, 10]} intensity={1} />
          <Environment preset="city" />
          <Physics gravity={[0, -9.81, 0]}>
            <Pointer />
            <Walls />
            {spheres.map((s, i) => (
              <Sphere key={i} {...s} />
            ))}
          </Physics>
        </Canvas>
      </div>
    </div>
  );
}
