import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import './styles/Landing.css';

export default function Landing() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 50;

    // Particles
    const count = 800;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(count * 3);
    const velocities: { x: number; y: number; z: number }[] = [];

    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 120;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 120;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 80;
      velocities.push({
        x: (Math.random() - 0.5) * 0.02,
        y: (Math.random() - 0.5) * 0.02,
        z: (Math.random() - 0.5) * 0.01,
      });
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const material = new THREE.PointsMaterial({
      color: 0x5eead4,
      size: 0.15,
      transparent: true,
      opacity: 0.7,
      blending: THREE.AdditiveBlending,
      sizeAttenuation: true,
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    // Connection lines
    const lineGeometry = new THREE.BufferGeometry();
    const linePositions = new Float32Array(150 * 150 * 6);
    lineGeometry.setAttribute('position', new THREE.BufferAttribute(linePositions, 3));
    const lineMaterial = new THREE.LineBasicMaterial({
      color: 0x5eead4,
      transparent: true,
      opacity: 0.08,
      blending: THREE.AdditiveBlending,
    });
    const lines = new THREE.LineSegments(lineGeometry, lineMaterial);
    scene.add(lines);

    // Floating spheres
    const sphereGeo = new THREE.SphereGeometry(0.6, 16, 16);
    const sphereMat = new THREE.MeshBasicMaterial({
      color: 0x14b8a6,
      transparent: true,
      opacity: 0.15,
      wireframe: true,
    });
    const floatingSpheres: THREE.Mesh[] = [];
    for (let i = 0; i < 5; i++) {
      const sphere = new THREE.Mesh(sphereGeo.clone(), sphereMat.clone());
      sphere.position.set(
        (Math.random() - 0.5) * 60,
        (Math.random() - 0.5) * 40,
        (Math.random() - 0.5) * 30
      );
      sphere.scale.setScalar(Math.random() * 2 + 1);
      sphere.userData = {
        speed: Math.random() * 0.003 + 0.001,
        offset: Math.random() * Math.PI * 2,
      };
      scene.add(sphere);
      floatingSpheres.push(sphere);
    }

    const mouse = { x: 0, y: 0 };
    const onMouseMove = (e: MouseEvent) => {
      mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    document.addEventListener('mousemove', onMouseMove);

    let animId: number;
    function animate() {
      animId = requestAnimationFrame(animate);

      const pos = geometry.attributes.position.array as Float32Array;

      for (let i = 0; i < count; i++) {
        pos[i * 3] += velocities[i].x;
        pos[i * 3 + 1] += velocities[i].y;
        pos[i * 3 + 2] += velocities[i].z;

        if (Math.abs(pos[i * 3]) > 60) velocities[i].x *= -1;
        if (Math.abs(pos[i * 3 + 1]) > 60) velocities[i].y *= -1;
        if (Math.abs(pos[i * 3 + 2]) > 40) velocities[i].z *= -1;
      }
      geometry.attributes.position.needsUpdate = true;

      // Update connection lines
      let lineIndex = 0;
      const lPos = lineGeometry.attributes.position.array as Float32Array;
      const threshold = 12;

      for (let i = 0; i < Math.min(count, 150); i++) {
        for (let j = i + 1; j < Math.min(count, 150); j++) {
          const dx = pos[i * 3] - pos[j * 3];
          const dy = pos[i * 3 + 1] - pos[j * 3 + 1];
          const dz = pos[i * 3 + 2] - pos[j * 3 + 2];
          const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

          if (dist < threshold) {
            lPos[lineIndex++] = pos[i * 3];
            lPos[lineIndex++] = pos[i * 3 + 1];
            lPos[lineIndex++] = pos[i * 3 + 2];
            lPos[lineIndex++] = pos[j * 3];
            lPos[lineIndex++] = pos[j * 3 + 1];
            lPos[lineIndex++] = pos[j * 3 + 2];
          }
        }
      }

      for (let i = lineIndex; i < lineIndex + 300; i++) lPos[i] = 0;
      lineGeometry.setDrawRange(0, lineIndex / 3);
      lineGeometry.attributes.position.needsUpdate = true;

      // Floating spheres
      const time = Date.now() * 0.001;
      floatingSpheres.forEach((s) => {
        s.rotation.x += s.userData.speed;
        s.rotation.y += s.userData.speed * 0.7;
        s.position.y += Math.sin(time + s.userData.offset) * 0.01;
      });

      // Camera follows mouse
      camera.position.x += (mouse.x * 5 - camera.position.x) * 0.02;
      camera.position.y += (mouse.y * 3 - camera.position.y) * 0.02;
      camera.lookAt(scene.position);

      particles.rotation.y += 0.0003;

      renderer.render(scene, camera);
    }
    animate();

    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(animId);
      document.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', onResize);
      renderer.dispose();
      geometry.dispose();
      material.dispose();
      lineGeometry.dispose();
      lineMaterial.dispose();
    };
  }, []);

  return (
    <section className="hero" id="home">
      <canvas ref={canvasRef} id="hero-canvas" />
      <div className="hero-content">
        <p className="hero-greeting">Hello, I'm</p>
        <h1 className="hero-name">
          RANVIJAY<br />
          <span>SINGH</span>
        </h1>
        <p className="hero-role">
          Director — <em>M&A, Strategy</em> & CEO's Office
        </p>
      </div>
      <div className="hero-scroll">
        <span>Scroll</span>
        <div className="scroll-line" />
      </div>
    </section>
  );
}
