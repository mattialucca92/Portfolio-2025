import { motion } from "framer-motion";

const SkillCard = ({ skill, index, isInView }) => {
  return (
    <motion.div
      className="skill-card"
      initial={{ opacity: 0, y: 50, rotateY: 90 }}
      animate={isInView ? { opacity: 1, y: 0, rotateY: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{
        scale: 1.05,
        rotateY: 5,
        boxShadow: "0 20px 40px rgba(0, 0, 0, 0.1)",
      }}
    >
      <div className="skill-content">
        {/* Badge colorato */}
        <div
          className="skill-color"
          style={{
            backgroundColor: skill.color,
            width: "20px",
            height: "20px",
            borderRadius: "50%",
            marginBottom: "10px",
          }}
        />

        {/* Nome della skill */}
        <div className="skill-content" style={{ color: skill.color }}>
          <div className="skill-icon">{skill.icon}</div>
          <h3 className="skill-name">{skill.name}</h3>
        </div>
      </div>
    </motion.div>
  );
};

export default SkillCard;
