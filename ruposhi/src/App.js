import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { Vector2, Vector3, Box3 } from 'three';

const App = () => {
  const mountRef = useRef(null);
  const [gameState, setGameState] = useState({
    level: 0,
    foundEchoes: 0,
    totalEchoes: 0,
    state: 'initial', // 'initial', 'playing', 'level-complete', 'game-complete'
    message: "Move your mouse to paint and find the dormant echoes.",
  });
  const mouse = useRef(new Vector2());
  const raycaster = useRef(new THREE.Raycaster());
  const sceneObjects = useRef({ dormant: [], animated: [] });
  const cameraTarget = useRef(new Vector3(0, 5, 20));

  useEffect(() => {
    // --- Scene Setup ---
    let width = window.innerWidth;
    let height = window.innerHeight;
    
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    
    renderer.setSize(width, height);
    renderer.setPixelRatio(window.devicePixelRatio);
    mountRef.current.appendChild(renderer.domElement);
    
    camera.position.set(0, 5, 20);
    camera.lookAt(0, 0, 0);

    const ambientLight = new THREE.AmbientLight(0x404040, 1.5);
    scene.add(ambientLight);

    const groundGeometry = new THREE.PlaneGeometry(50, 50);
    const groundMaterial = new THREE.MeshStandardMaterial({ color: 0x111111, side: THREE.DoubleSide });
    const ground = new THREE.Mesh(groundGeometry, groundMaterial);
    ground.rotation.x = Math.PI / 2;
    ground.position.y = -5;
    scene.add(ground);

    // --- Game Levels Data ---
    const levels = [
      // Level 1: Find 2 objects
      [
        { id: 'cube1', position: new Vector3(-8, -3.5, -5), geometry: new THREE.BoxGeometry(3, 3, 3) },
        { id: 'pyramid1', position: new Vector3(8, -3.5, -5), geometry: new THREE.ConeGeometry(2, 4, 32) },
      ],
      // Level 2: Find 3 objects
      [
        { id: 'sphere2', position: new Vector3(0, -3.5, -20), geometry: new THREE.SphereGeometry(2, 32, 32) },
        { id: 'cylinder2', position: new Vector3(-10, -3.5, -25), geometry: new THREE.CylinderGeometry(1.5, 1.5, 5, 32) },
        { id: 'torus2', position: new Vector3(10, -3.5, -25), geometry: new THREE.TorusGeometry(1.5, 0.5, 16, 100) },
      ],
      // Level 3: Final Echo
      [
        { id: 'finalEcho', position: new Vector3(0, -3.5, -40), geometry: new THREE.IcosahedronGeometry(3, 0) },
      ]
    ];

    const initializeLevel = (levelIndex) => {
      // Clear previous objects
      sceneObjects.current.dormant.forEach(obj => scene.remove(obj));
      sceneObjects.current.animated.forEach(obj => scene.remove(obj));
      sceneObjects.current.dormant = [];
      sceneObjects.current.animated = [];

      const currentLevelObjects = levels[levelIndex];
      const newDormant = [];
      const newAnimated = [];
      
      currentLevelObjects.forEach(objData => {
        const dormantMaterial = new THREE.MeshStandardMaterial({ color: 0x222222, flatShading: true });
        const dormantMesh = new THREE.Mesh(objData.geometry, dormantMaterial);
        dormantMesh.position.copy(objData.position);
        dormantMesh.name = objData.id;
        dormantMesh.userData.paintProgress = 0;
        dormantMesh.userData.requiredProgress = 150;
        dormantMesh.userData.isAwakening = false;
        newDormant.push(dormantMesh);
        scene.add(dormantMesh);
        
        const animatedMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00, transparent: true, opacity: 0 });
        const animatedMesh = new THREE.Mesh(objData.geometry.clone(), animatedMaterial);
        animatedMesh.position.copy(objData.position);
        animatedMesh.scale.set(0.1, 0.1, 0.1); // Start small
        newAnimated.push(animatedMesh);
        scene.add(animatedMesh);
      });

      sceneObjects.current.dormant = newDormant;
      sceneObjects.current.animated = newAnimated;
      setGameState(prev => ({ 
        ...prev, 
        level: levelIndex + 1,
        foundEchoes: 0,
        totalEchoes: currentLevelObjects.length,
        state: 'playing',
        message: `Level ${levelIndex + 1} - Find ${currentLevelObjects.length} echoes.`
      }));
    };
    
    // Initial level setup
    if (gameState.state === 'initial') {
        initializeLevel(0);
    }

    // --- Painting and Particles ---
    const particles = [];
    const maxParticles = 500;
    const particleSpeed = 0.05;

    const addParticle = (point) => {
      if (particles.length >= maxParticles) {
        const oldestParticle = particles.shift();
        scene.remove(oldestParticle);
      }
      const particleGeometry = new THREE.SphereGeometry(0.1, 8, 8);
      const particleMaterial = new THREE.MeshBasicMaterial({
        color: new THREE.Color().setHSL(Math.random(), 1, 0.7),
        transparent: true,
        opacity: 1,
      });
      const particle = new THREE.Mesh(particleGeometry, particleMaterial);
      particle.position.copy(point);
      particle.userData.life = 100;
      particles.push(particle);
      scene.add(particle);
    };

    let paintCooldown = 0;
    const onPointerMove = (event) => {
      mouse.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -(event.clientY / window.innerHeight) * 2 + 1;

      if (paintCooldown > 0) {
        paintCooldown--;
        return;
      }
      paintCooldown = 2;

      raycaster.current.setFromCamera(mouse.current, camera);
      const intersects = raycaster.current.intersectObjects([ground, ...sceneObjects.current.dormant]);

      if (intersects.length > 0) {
        const hitObject = intersects[0].object;
        const point = intersects[0].point;
        addParticle(point);

        if (hitObject.name !== 'ground' && hitObject.userData.paintProgress !== undefined && !hitObject.userData.isAwakening) {
          hitObject.userData.paintProgress++;
          const progress = hitObject.userData.paintProgress / hitObject.userData.requiredProgress;
          hitObject.material.color.setHSL(0, 0, 1 - progress);
          
          if (hitObject.userData.paintProgress >= hitObject.userData.requiredProgress) {
            hitObject.userData.isAwakening = true;
            setGameState(prev => {
              const newFound = prev.foundEchoes + 1;
              if (newFound === prev.totalEchoes) {
                setTimeout(() => {
                  if (prev.level < levels.length) {
                    setGameState(p => ({ ...p, state: 'level-complete' }));
                  } else {
                    setGameState(p => ({ ...p, state: 'game-complete' }));
                  }
                }, 3000); // Wait for animation
              }
              return { ...prev, foundEchoes: newFound };
            });
          }
        }
      }
    };
    
    const onWindowResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener('pointermove', onPointerMove, false);
    window.addEventListener('resize', onWindowResize, false);
    
    // --- Animation Loop ---
    const clock = new THREE.Clock();
    const animate = () => {
      requestAnimationFrame(animate);

      // Animate particles
      particles.forEach(p => {
        p.position.y += particleSpeed;
        p.userData.life--;
        p.material.opacity = p.userData.life / 100;
      });

      // Remove dead particles
      for (let i = particles.length - 1; i >= 0; i--) {
        if (particles[i].userData.life <= 0) {
          scene.remove(particles[i]);
          particles.splice(i, 1);
        }
      }

      // Awakening and Animated State Logic
      sceneObjects.current.dormant.forEach((dormantObj, index) => {
        if (dormantObj.userData.isAwakening) {
          const animatedObj = sceneObjects.current.animated[index];
          dormantObj.material.opacity -= 0.01;
          
          if (animatedObj.material.opacity < 1) {
            animatedObj.material.opacity += 0.01;
            animatedObj.scale.lerp(new Vector3(1, 1, 1), 0.05);
            animatedObj.rotation.x += 0.01;
            animatedObj.rotation.y += 0.02;
          }
        }
      });

      // Camera movement
      camera.position.lerp(cameraTarget.current, 0.02);
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      window.removeEventListener('pointermove', onPointerMove, false);
      window.removeEventListener('resize', onWindowResize, false);
      if (mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
      }
    };
  }, [gameState.state]); // Re-run effect when state changes

  const nextLevel = () => {
    if (gameState.level < 3) { // 3 is the total number of levels
      const newLevelIndex = gameState.level;
      setGameState(prev => ({
        ...prev,
        state: 'initial' // Trigger useEffect to re-initialize
      }));
      const newTargetZ = -15 * newLevelIndex;
      cameraTarget.current.set(0, 5, 20 + newTargetZ);
    } else {
        // This state handles the win message in the UI.
        setGameState(prev => ({ ...prev, state: 'game-complete' }));
    }
  };

  const restartGame = () => {
    window.location.reload();
  };

  return (
    <div className="relative h-screen w-screen bg-black overflow-hidden font-[Inter] text-white">
      <div ref={mountRef} className="absolute inset-0 z-0"></div>
      <div className="relative z-10 flex flex-col items-center justify-center p-8 text-center h-full">
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-4 text-emerald-300">
          The Echoing Canvas
        </h1>
        <p className="text-xl md:text-2xl mb-8 max-w-2xl text-white/80">
          Explore the desolate canvas and bring the past to life.
        </p>
        
        {gameState.state === 'playing' && (
          <div className="text-lg md:text-xl text-white/90 animate-pulse">
            <p>{gameState.message}</p>
            <p>Echoes Found: {gameState.foundEchoes}/{gameState.totalEchoes}</p>
          </div>
        )}

        {gameState.state === 'level-complete' && (
          <div className="flex flex-col items-center">
            <p className="text-lg md:text-xl text-white/90 mb-4">
              Level {gameState.level} Complete!
            </p>
            <button
              onClick={nextLevel}
              className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3 px-6 rounded-full shadow-lg transition-transform duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-emerald-400"
            >
              Continue
            </button>
          </div>
        )}

        {gameState.state === 'game-complete' && (
          <div className="flex flex-col items-center">
            <p className="text-lg md:text-xl text-white/90 mb-4">
              You have restored the world!
            </p>
            <button
              onClick={restartGame}
              className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3 px-6 rounded-full shadow-lg transition-transform duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-emerald-400"
            >
              Restart
            </button>
          </div>
        )}
      </div>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>
      <script src="https://cdn.tailwindcss.com"></script>
    </div>
  );
};

export default App;
