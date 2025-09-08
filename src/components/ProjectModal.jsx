import { motion, AnimatePresence } from "framer-motion";
import { useEffect } from "react";

const ProjectModal = ({ project, onClose }) => {
    console.log("Dati progetto:", project);
  useEffect(() => {
    if (project) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [project]);

  if (!project) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="modal-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="modal-content"
          initial={{ opacity: 0, scale: 0.8, y: 50 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 50 }}
          transition={{ duration: 0.5 }}
          onClick={(e) => e.stopPropagation()}
        >
          <button className="modal-close" onClick={onClose}>
            ×
          </button>

          <div className="modal-header">
            <img src={project.image} alt={project.title} />
            <div className="modal-title-section">
              <h2>{project.title}</h2>
              <p>{project.description}</p>
            </div>
          </div>

          <div className="modal-body">
            <div className="modal-section">
              <h3>Tecnologie Utilizzate</h3>
              <div className="tech-grid">
                {project.technologies.map((tech) => (
                  <span key={tech} className="tech-badge">
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="modal-section">
              <h3>Caratteristiche Principali</h3>
              <ul className="features-list">
                {project.features.map((feature, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    {feature}
                  </motion.li>
                ))}
              </ul>
            </div>

            <div className="modal-actions">
              <motion.a
                href={project.demo}
                className="btn-demo"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Demo Live
              </motion.a>
              <motion.a
                href={project.link}
                className="btn-code"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Vedi Codice
              </motion.a>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
  
};

export default ProjectModal;
