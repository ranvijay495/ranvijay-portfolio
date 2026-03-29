import { useEffect, useRef, useCallback } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

interface CharacterProps {
  onLoad?: () => void;
}

export default function Character({ onLoad }: CharacterProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const cleanupRef = useRef<(() => void) | null>(null);

  const init = useCallback((container: HTMLDivElement) => {
    // Renderer
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    container.appendChild(renderer.domElement);

    // Scene
    const scene = new THREE.Scene();

    // Camera - wider FOV to frame full body
    const camera = new THREE.PerspectiveCamera(
      30,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );
    camera.position.set(0, 1.0, 5.5);
    camera.lookAt(0, 0.9, 0);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 1.2);
    keyLight.position.set(2, 3, 4);
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0x5eead4, 0.4);
    fillLight.position.set(-2, 1, 2);
    scene.add(fillLight);

    const rimLight = new THREE.DirectionalLight(0x14b8a6, 0.6);
    rimLight.position.set(0, 2, -3);
    scene.add(rimLight);

    // Screen light that follows the mouse
    const screenLight = new THREE.PointLight(0x5eead4, 0.8, 10);
    screenLight.position.set(0, 1.2, 3);
    scene.add(screenLight);

    // Mouse tracking state
    const mouse = { x: 0, y: 0 };
    let headBone: THREE.Bone | null = null;
    let spineBone: THREE.Bone | null = null;
    let mixer: THREE.AnimationMixer | null = null;
    let animId: number;

    const onMouseMove = (e: MouseEvent) => {
      mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        mouse.x = (e.touches[0].clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(e.touches[0].clientY / window.innerHeight) * 2 + 1;
      }
    };
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('touchmove', onTouchMove);

    // Load GLTF model
    const loader = new GLTFLoader();
    loader.load(
      '/models/character.glb',
      (gltf) => {
        const model = gltf.scene;

        // Center and scale model
        const box = new THREE.Box3().setFromObject(model);
        const size = box.getSize(new THREE.Vector3());
        const center = box.getCenter(new THREE.Vector3());

        // Scale to fit ~2 units tall
        const targetHeight = 2.2;
        const scale = targetHeight / size.y;
        model.scale.setScalar(scale);

        // Recompute after scaling
        box.setFromObject(model);
        box.getCenter(center);

        // Position so feet are near y=0 and centered
        model.position.x = -center.x;
        model.position.y = -box.min.y;
        model.position.z = -center.z;

        scene.add(model);

        // Find head and spine bones for tracking
        model.traverse((child) => {
          if (child instanceof THREE.Bone) {
            const name = child.name.toLowerCase();
            if (name.includes('head') && !headBone) {
              headBone = child;
            }
            if ((name.includes('spine') && name.includes('2')) ||
                (name.includes('spine') && name.includes('upper')) ||
                (name === 'spine1') || (name === 'spine2')) {
              spineBone = child;
            }
          }
          // Improve material for web rendering
          if ((child as THREE.Mesh).isMesh) {
            const mesh = child as THREE.Mesh;
            if (mesh.material) {
              const mat = mesh.material as THREE.MeshStandardMaterial;
              if (mat.isMeshStandardMaterial) {
                mat.envMapIntensity = 0.5;
                mat.needsUpdate = true;
              }
            }
          }
        });

        // Fallback: find any head-like bone
        if (!headBone) {
          model.traverse((child) => {
            if (child instanceof THREE.Bone) {
              const name = child.name.toLowerCase();
              if (name.includes('head') || name.includes('neck')) {
                headBone = child;
              }
            }
          });
        }

        // Setup animations
        if (gltf.animations && gltf.animations.length > 0) {
          mixer = new THREE.AnimationMixer(model);
          // Play the first animation (usually idle)
          const clip = gltf.animations[0];
          const action = mixer.clipAction(clip);
          action.play();
        }

        // Adjust camera to frame the character nicely
        const modelBox = new THREE.Box3().setFromObject(model);
        const modelCenter = modelBox.getCenter(new THREE.Vector3());
        const modelHeight = modelBox.max.y - modelBox.min.y;
        // Position camera to see full body with some headroom
        const dist = (modelHeight / 2) / Math.tan((camera.fov / 2) * Math.PI / 180);
        camera.position.set(0, modelCenter.y, dist * 1.1);
        camera.lookAt(0, modelCenter.y, 0);

        onLoad?.();
      },
      undefined,
      (error) => {
        console.error('Error loading character model:', error);
        onLoad?.();
      }
    );

    // Animation loop
    const clock = new THREE.Clock();
    let headTargetX = 0;
    let headTargetY = 0;
    let headCurrentX = 0;
    let headCurrentY = 0;

    function animate() {
      animId = requestAnimationFrame(animate);

      const delta = clock.getDelta();

      // Update animation mixer
      if (mixer) {
        mixer.update(delta);
      }

      // Head tracking - smooth follow
      headTargetX = mouse.x * 0.3;
      headTargetY = mouse.y * 0.15;

      headCurrentX += (headTargetX - headCurrentX) * 0.05;
      headCurrentY += (headTargetY - headCurrentY) * 0.05;

      if (headBone) {
        headBone.rotation.y = headCurrentX;
        headBone.rotation.x = -headCurrentY;
      }

      // Subtle spine follow for more natural look
      if (spineBone) {
        spineBone.rotation.y = headCurrentX * 0.3;
      }

      // Screen light follows mouse
      screenLight.position.x = mouse.x * 2;
      screenLight.position.y = 1.2 + mouse.y * 0.5;

      renderer.render(scene, camera);
    }
    animate();

    // Resize handler
    const onResize = () => {
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', onResize);

    // Cleanup function
    cleanupRef.current = () => {
      cancelAnimationFrame(animId);
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('resize', onResize);
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [onLoad]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    init(container);

    return () => {
      cleanupRef.current?.();
    };
  }, [init]);

  return (
    <div
      ref={containerRef}
      style={{
        position: 'absolute',
        right: 0,
        top: 0,
        width: '45%',
        height: '100%',
        zIndex: 2,
        pointerEvents: 'none',
      }}
    />
  );
}
