import { motion } from "framer-motion";
import { useInView } from "../hooks/useInView";
import "../styles/About.css";
import { useEffect, useRef } from "react";
import mattialucca from "../assets/image/MattiaLuccaSagoma.png";


const About = () => {
  const [ref, isInView] = useInView();
  const highlightItems = useRef([]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8 },
    },
  };

  useEffect(() => {
    // Gestione dinamica del will-change
    highlightItems.current.forEach((item) => {
      item.addEventListener("mouseenter", () => {
        item.style.willChange = "transform";
      });

      item.addEventListener("mouseleave", () => {
        item.style.willChange = "auto";
      });
    });

    // Gestione del resize per WebGL
    const handleResize = () => {
      const canvas = document.querySelector("canvas");
      if (canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        // Se stai usando Three.js, aggiorna anche renderer e camera
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Chiamata iniziale

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <section id="about" className="about" ref={ref}>
      <div className="container">
        <motion.div
          className="about-content"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <motion.h2 className="section-title" variants={itemVariants}>
            Il mio Percorso
          </motion.h2>

          <div className="about-grid">
            <motion.div className="about-text" variants={itemVariants}>
              <p className="about-description">
                A 33 anni ho voluto prendere una decisione che mi avrebbe consentito di cambiare vita:
                intraprendere un percorso nel mondo tech. Non è stata una scelta
                facile, ma sentivo il bisogno di una sfida che mi stimolasse
                davvero. Il mondo dello sviluppo web è esigente e in continua
                evoluzione. Ogni giorno significa confrontarsi con nuove
                tecnologie, risolvere problemi complessi e mettersi
                costantemente in discussione. Ed è proprio questo che mi
                affascina di più: la possibilità di crescere sempre, di non
                smettere mai di imparare.
              </p>

              <p className="about-description">
                Attualmente sono specializzato in JavaScript e React, tecnologie
                che mi permettono di creare interfacce dinamiche e coinvolgenti.
                Di recente ho iniziato ad approfondire Laravel perché credo sia
                fondamentale avere una visione completa dello sviluppo, non
                limitandosi solo al frontend ma comprendendo anche la logica
                backend. Ogni progetto è una nuova avventura, un puzzle da
                risolvere che unisce creatività e logica. È questa combinazione
                che rende il mio lavoro così stimolante e gratificante.
              </p>
            </motion.div>

            <motion.div className="about-image" variants={itemVariants}>
              <div className="image-container">
                <img
                  src={mattialucca}
                  alt="Sviluppatore al lavoro"
                  className="profile-image"
                />
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
