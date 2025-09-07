import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "../hooks/useInView";
import ProjectCard from "./ProjectCard";
import ProjectModal from "./ProjectModal";
import "../styles/Projects.css";

const Projects = () => {
  const [ref, isInView] = useInView();
  const [selectedProject, setSelectedProject] = useState(null);
  const [filter, setFilter] = useState("all");

  const projects = [
    {
      id: 1,
      title: "Portfolio Interattivo",
      description:
      "Portfolio moderno con animazioni Three.js e design responsive",
      image: "/public/image/Portfolio.png",
      category: "frontend",
      technologies: ["React", "Three.js", "CSS3"],
      link: "https://github.com",
      demo: "https://example.com",
      features: [
        "Animazioni 3D interattive",
        "Design completamente responsive",
        "Micro-animazioni fluide",
        "Performance ottimizzate",
        "SEO friendly",
      ],
    },
    {
      id: 2,
      title: "Money Tracker",
      description:
      "Semplice applicativo sviluppato in Javascript per tenere conto delle proprie spese",
      image: "/public/image/moneyTracker.png",
      category: "frontend",
      technologies: ["Javascript", "CSS"],
      link: "https://github.com/mattialucca92/Progetto-risparmio",
      demo: "https://mattialucca92.github.io/Progetto-risparmio/",
      features: [
        "Gestione completa entrate/uscite",
        "Salvataggio dati in localStorage",
        "Filtro per periodo e categoria",
      ],
    },
    {
      id: 3,
      title: "Owly Project",
      description:
      "Applicativo che permette, in base alla categoria scritta, di leggere la descrizione del libro scelto",
      image:
      "/public/image/libreria.png",
      category: "frontend",
      technologies: ["Javascript", "CSS"],
      link: "https://github.com/mattialucca92/Owly-project",
      demo: "https://mattialucca92.github.io/Owly-project/",
      features: [
        "Ricerca libri per categoria in tempo reale",
        "Dettagli completi libro (autore, anno, trama)",
        "Sistema di preferiti con localStorage",
      ],
    },
    {
      id: 4,
      title: "Indovina chi",
      description:
        "Semplice gioco sviluppato in Javascript per indovinare i calciatori",
      image: "/public/image/indovinaChi.png",
      category: "frontend",
      technologies: ["Javascript"],
      link: "https://github.com/mattialucca92/Indovina-chi",
      demo: "https://mattialucca92.github.io/Indovina-chi/",
      features: [
        "Calciatori iconici selezionati",
        "Sistema di indizi a difficoltà crescente",
        "Punteggio basato su velocità/indizi usati",
      ],
    },
  ];
  
  const categories = [
    { key: "all", label: "Tutti" },
    { key: "frontend", label: "Frontend" },
    { key: "backend", label: "Backend" },
    { key: "fullstack", label: "Full Stack" },
  ];
  
  const filteredProjects =
  filter === "all"
  ? projects
      : projects.filter((project) => project.category === filter);

  return (
    <section id="projects" className="projects" ref={ref}>
      <div className="container">
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          I Miei Progetti
        </motion.h2>

        <motion.div
          className="project-filters"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {categories.map((category) => (
            <button
              key={category.key}
              className={`filter-btn ${
                filter === category.key ? "active" : ""
              }`}
              onClick={() => setFilter(category.key)}
            >
              {category.label}
            </button>
          ))}
          <motion.div
            className="projects-coming-soon"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <p>🚀 In arrivo progetti backend e fullStack</p>
          </motion.div>
        </motion.div>

        <motion.div className="projects-grid" layout>
          <AnimatePresence>
            {filteredProjects.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={index}
                isInView={isInView}
                onClick={() => setSelectedProject(project)}
              />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
};

export default Projects;
