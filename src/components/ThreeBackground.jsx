import { useRef, useEffect } from "react";
import * as THREE from "three";

const ThreeBackground = () => {
  const mountRef = useRef(null);
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const particlesRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const animationIdRef = useRef(null);
  const resizeObserverRef = useRef(null);

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance", // ✅ Ottimizzazione performance
    });

    // ✅ CORREZIONE: Dimensiona al container
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

    // ✅ Particles geometry ottimizzato
    const particlesCount = 800; // ✅ Ridotto da 1000 per migliori performance
    const positions = new Float32Array(particlesCount * 3);
    const colors = new Float32Array(particlesCount * 3);

    const colorPalette = [
      new THREE.Color(0x00d4ff), // Electric blue
      new THREE.Color(0x8b5fbf), // Vibrant purple
      new THREE.Color(0x39ff14), // Neon green
      new THREE.Color(0xff6b6b), // Coral
    ];

    for (let i = 0; i < particlesCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 10;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 10;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10;

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
      size: 0.02,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
      sizeAttenuation: true,
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);
    particlesRef.current = particles;

    // ✅ Floating geometric shapes ottimizzato
    const shapes = [];
    const maxShapes = 3; // ✅ Ridotto da 5 per migliori performance
    for (let i = 0; i < maxShapes; i++) {
      const shapeGeometry = new THREE.OctahedronGeometry(0.3, 0);
      const shapeMaterial = new THREE.MeshBasicMaterial({
        color: colorPalette[i % colorPalette.length],
        transparent: true,
        opacity: 0.3,
        wireframe: true,
      });

      const shape = new THREE.Mesh(shapeGeometry, shapeMaterial);
      shape.position.set(
        (Math.random() - 0.5) * 8,
        (Math.random() - 0.5) * 8,
        (Math.random() - 0.5) * 8
      );

      scene.add(shape);
      shapes.push(shape);
    }

    camera.position.z = 5;

    // ✅ Mouse interaction ottimizzato con throttling
    let mouseUpdateTimer = null;
    const handleMouseMove = (event) => {
      if (mouseUpdateTimer) return; // Throttling

      mouseUpdateTimer = setTimeout(() => {
        mouseRef.current.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouseRef.current.y = -(event.clientY / window.innerHeight) * 2 + 1;
        mouseUpdateTimer = null;
      }, 16); // ~60fps
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    // ✅ Animation loop ottimizzato
    const animate = () => {
      animationIdRef.current = requestAnimationFrame(animate);

      if (particlesRef.current) {
        particlesRef.current.rotation.x += 0.0005;
        particlesRef.current.rotation.y += 0.001;

        // Mouse interaction effect
        const targetX = mouseRef.current.x * 0.5;
        const targetY = mouseRef.current.y * 0.5;

        particlesRef.current.rotation.x +=
          (targetY - particlesRef.current.rotation.x) * 0.02;
        particlesRef.current.rotation.y +=
          (targetX - particlesRef.current.rotation.y) * 0.02;
      }

      // Animate geometric shapes
      const time = Date.now() * 0.001;
      shapes.forEach((shape, index) => {
        shape.rotation.x += 0.01 + index * 0.002;
        shape.rotation.y += 0.01 + index * 0.003;
        shape.position.y += Math.sin(time + index) * 0.002;
      });

      renderer.render(scene, camera);
    };

    animate();

    // ✅ Handle resize ottimizzato con ResizeObserver
    if (window.ResizeObserver) {
      resizeObserverRef.current = new ResizeObserver((entries) => {
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

      // Clear mouse timer
      if (mouseUpdateTimer) {
        clearTimeout(mouseUpdateTimer);
      }

      // Rimuovi event listeners
      window.removeEventListener("mousemove", handleMouseMove);

      // Rimuovi observer
      if (resizeObserverRef.current) {
        resizeObserverRef.current.disconnect();
      } else {
        window.removeEventListener("resize", updateSize);
      }

      // Cleanup Three.js
      if (
        container &&
        renderer.domElement &&
        container.contains(renderer.domElement)
      ) {
        container.removeChild(renderer.domElement);
      }

      // Dispose resources
      renderer.dispose();
      geometry.dispose();
      material.dispose();

      // Dispose shapes
      shapes.forEach((shape) => {
        if (shape.geometry) shape.geometry.dispose();
        if (shape.material) shape.material.dispose();
      });

      // Clear refs
      sceneRef.current = null;
      rendererRef.current = null;
      particlesRef.current = null;
      animationIdRef.current = null;
    };
  }, []);

  return <div ref={mountRef} className="three-background" />;
};

export default ThreeBackground;
