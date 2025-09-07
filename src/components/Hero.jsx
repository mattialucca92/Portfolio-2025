import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import ThreeBackground from "./ThreeBackground";
import "../styles/Hero.css";

const Hero = () => {
  const heroRef = useRef();

  useEffect(() => {
    // Aggiungi un piccolo delay per permettere al loading screen di completarsi
    const timer = setTimeout(() => {
      document.body.classList.remove("loading");
    }, 100);

    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;

      const rotateX = ((clientY - centerY) / centerY) * 10;
      const rotateY = ((clientX - centerX) / centerX) * 10;

      if (heroRef.current) {
        heroRef.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      clearTimeout(timer);
    };
  }, []);

  const scrollToProjects = () => {
    document.getElementById("projects").scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="hero" className="hero">
      <ThreeBackground />
      <div className="hero-content" ref={heroRef}>
        <motion.div
          className="hero-text"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <motion.h1
            className="hero-title"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            Ciao, sono
            <span className="name-highlight"> Mattia Lucca</span>
          </motion.h1>

          <motion.p
            className="hero-subtitle"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
          >
            Sviluppatore Web Full Stack specializzato in React, Javascript e Laravel.
          </motion.p>

          <motion.div
            className="hero-buttons"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.6 }}
          >
            <motion.button
              className="btn-primary"
              onClick={scrollToProjects}
              whileHover={{
                scale: 1.05,
                boxShadow: "0 10px 30px rgba(0, 212, 255, 0.3)",
              }}
              whileTap={{ scale: 0.95 }}
            >
              Vedi i Progetti
            </motion.button>

            <motion.button
              className="btn-secondary"
              onClick={() =>
                document
                  .getElementById("contact")
                  .scrollIntoView({ behavior: "smooth" })
              }
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Contattami
            </motion.button>
          </motion.div>
        </motion.div>

        <motion.div
          className="hero-scroll-indicator"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
        >
          <div className="scroll-arrow"></div>
          <span>Scorri per esplorare</span>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
