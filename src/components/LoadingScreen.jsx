import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import * as THREE from "three";
import "../styles/LoadingScreen.css";

const LoadingScreen = ({ progress, onComplete }) => {
  const mountRef = useRef(null);
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const animationIdRef = useRef(null);
  const resizeObserverRef = useRef(null);

  useEffect(() => {
    if (!mountRef.current) return;

    // Three.js setup per effetti di sfondo sottili
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ 
      alpha: true, 
      antialias: true,
      powerPreference: "high-performance" // ✅ Ottimizzazione performance
    });

    // ✅ CORREZIONE: Dimensiona al container invece di window
    const container = mountRef.current;
    const updateSize = () => {
      const rect = container.getBoundingClientRect();
      const width = rect.width || window.innerWidth;
      const height = rect.height || window.innerHeight;
      
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height, false); // false = non aggiorna CSS
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    };

    updateSize();
    container.appendChild(renderer.domElement);

    sceneRef.current = scene;
    rendererRef.current = renderer;

    // Particelle di sfondo sottili - OTTIMIZZATO
    const particlesCount = 150; // ✅ Ridotto da 200 per migliori performance
    const positions = new Float32Array(particlesCount * 3);
    const colors = new Float32Array(particlesCount * 3);

    const colorPalette = [
      new THREE.Color(0x00d4ff), // Electric blue
      new THREE.Color(0x8b5fbf), // Vibrant purple
      new THREE.Color(0x39ff14), // Neon green
      new THREE.Color(0xff6b6b), // Coral
    ];

    for (let i = 0; i < particlesCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 15;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 15;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 15;

      const color =
        colorPalette[Math.floor(Math.random() * colorPalette.length)];
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
      size: 0.015,
      vertexColors: true,
      transparent: true,
      opacity: 0.4,
      sizeAttenuation: true,
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    camera.position.z = 8;

    // ✅ Animation loop ottimizzato
    const animate = () => {
      animationIdRef.current = requestAnimationFrame(animate);

      if (particles) {
        particles.rotation.x += 0.0008;
        particles.rotation.y += 0.0012;
      }

      renderer.render(scene, camera);
    };

    animate();

    // ✅ Handle resize ottimizzato con ResizeObserver
    if (window.ResizeObserver) {
      resizeObserverRef.current = new ResizeObserver(entries => {
        for (const entry of entries) {
          updateSize();
        }
      });
      resizeObserverRef.current.observe(container);
    } else {
      // Fallback per browser più vecchi
      window.addEventListener("resize", updateSize);
    }

    // ✅ Cleanup ottimizzato
    return () => {
      // Ferma l'animazione
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }

      // Rimuovi observer
      if (resizeObserverRef.current) {
        resizeObserverRef.current.disconnect();
      } else {
        window.removeEventListener("resize", updateSize);
      }

      // Cleanup Three.js
      if (container && renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }

      // Dispose resources
      renderer.dispose();
      geometry.dispose();
      material.dispose();
      
      // Clear refs
      sceneRef.current = null;
      rendererRef.current = null;
      animationIdRef.current = null;
    };
  }, []);

  return (
    <motion.div
      className="loading-screen"
      initial={{ opacity: 1 }}
      animate={{ opacity: progress >= 100 ? 0 : 1 }}
      transition={{ duration: 0.8, delay: progress >= 100 ? 0.5 : 0 }}
      onAnimationComplete={() => {
        if (progress >= 100) {
          onComplete();
        }
      }}
    >
      <div ref={mountRef} className="loading-background" />

      <div className="loading-content">
        <motion.div
          className="loading-logo"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.h1
            className="loading-name"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            Mattia Lucca
          </motion.h1>
          <motion.p
            className="loading-subtitle"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            Junior Front-End Developer
          </motion.p>
        </motion.div>

        <motion.div
          className="loading-progress-container"
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: "100%", opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.7 }}
        >
          <div className="progress-track">
            <motion.div
              className="progress-bar"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            />
            <div className="progress-glow" />
          </div>

          <motion.div
            className="progress-text"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            <span className="progress-percentage">{Math.round(progress)}%</span>
            <span className="progress-label">Caricamento in corso...</span>
          </motion.div>
        </motion.div>

        <motion.div
          className="loading-dots"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="loading-dot"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: i * 0.2,
              }}
            />
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default LoadingScreen;