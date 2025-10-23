import { motion } from "framer-motion";
import { useState } from "react";
import { useInView } from "../hooks/useInView";
import SkillCard from "./SkillCard";
import "../styles/Skills.css";
import {
  FaReact,
  FaJs,
  FaHtml5,
  FaCss3Alt,
  FaGitAlt,
  FaLaravel,
} from "react-icons/fa";
import { SiTailwindcss, SiThreedotjs, SiVite, SiGithub } from "react-icons/si";


const Skills = () => {
  const [ref, isInView] = useInView();
  const [activeCategory, setActiveCategory] = useState("frontend");

  const skillCategories = {
    frontend: {
      title: "Frontend",
      icon: "🎨",
      skills: [
        { name: "React", color: "#61DAFB", icon: <FaReact /> },
        { name: "JavaScript", color: "#F7DF1E", icon: <FaJs /> },
        { name: "HTML5", color: "#E34F26", icon: <FaHtml5 /> },
        { name: "CSS3", color: "#1572B6", icon: <FaCss3Alt /> },
        { name: "Tailwind CSS", color: "#06B6D4", icon: <SiTailwindcss /> },
        { name: "Three.js", color: "#000000ff", icon: <SiThreedotjs /> },
      ],
    },
    backend: {
      title: "Backend",
      icon: "⚙️",
      skills: [{ name: "Laravel", color: "#FF6B6B", icon: <FaLaravel /> }],
    },
    tools: {
      title: "Tools & Altri",
      icon: "🛠️",
      skills: [
        { name: "GitHub", color: "#F05032", icon: <SiGithub /> },
        { name: "Vite", color: "#646CFF", icon: <SiVite /> },
      ],
    },
  };

  return (
    <section id="skills" className="skills" ref={ref}>
      <div className="container">
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          
          Le Mie Competenze
        </motion.h2>

        <motion.div
          className="skills-categories"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {Object.entries(skillCategories).map(([key, category]) => (
            <button
              key={key}
              className={`category-btn ${
                activeCategory === key ? "active" : ""
              }`}
              onClick={() => setActiveCategory(key)}
            >
              <span className="category-icon">{category.icon}</span>
              {category.title}
            </button>
          ))}
        </motion.div>

        <motion.div
          className="skills-grid"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          {skillCategories[activeCategory].skills.map((skill, index) => (
            <SkillCard
              key={skill.name}
              skill={skill}
              index={index}
              isInView={isInView}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
