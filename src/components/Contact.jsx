import { useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "../hooks/useInView";
import "../styles/Contact.css";

const Contact = () => {
  const [ref, isInView] = useInView();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [cvFile, setCvFile] = useState(null);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = "Il nome è obbligatorio";
    if (!formData.email.trim()) {
      newErrors.email = "L'email è obbligatoria";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email non valida";
    }
    if (!formData.subject.trim())
      newErrors.subject = "L'oggetto è obbligatorio";
    if (!formData.message.trim())
      newErrors.message = "Il messaggio è obbligatorio";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleCvUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.type === "application/pdf") {
      setCvFile(file);
    } else {
      alert("Seleziona un file PDF valido");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    // Simulate form submission
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setSubmitStatus("success");
      setFormData({ name: "", email: "", subject: "", message: "" });
      setCvFile(null);
    } catch (error) {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus(null), 5000);
    }
  };

  const contactInfo = [
    {
      icon: "📧",
      label: "Email",
      value: "mattialucca92@gmail.com",
    },
    {
      icon: "📱",
      label: "Telefono",
      value: "+39 3479486545",
      link: "tel:+393479486545",
    },
    {
      icon: "📍",
      label: "Località",
      value: "Como, Italia",
      link: null,
    },
    {
      icon: "💼",
      label: "LinkedIn",
      value: "linkedin.com/in/luccamattia",
      link: "https://www.linkedin.com/in/luccamattia/",
    },
  ];

  return (
    <section id="contact" className="contact" ref={ref}>
      <div className="container">
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          Contattami
        </motion.h2>

        <div className="contact-grid">
          <motion.div
            className="contact-info"
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h3>Iniziamo a collaborare!</h3>
            <p>
              Sono sempre interessato a nuove opportunità e progetti stimolanti.
              Non esitare a contattarmi per discutere della tua prossima idea.
            </p>

            <div className="contact-details">
              {contactInfo.map((info, index) => (
                <motion.div
                  key={index}
                  className="contact-item"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                  whileHover={{ x: 10 }}
                >
                  <span className="contact-icon">{info.icon}</span>
                  <div className="contact-text">
                    <label>{info.label}</label>
                    {info.link ? (
                      <a
                        href={info.link}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {info.value}
                      </a>
                    ) : (
                      <span>{info.value}</span>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="cv-upload">
              <h4>Scarica il mio CV</h4>
              <motion.a
                href={`${
                  import.meta.env.BASE_URL
                }Mattia_Lucca_Junior_Frontend_Developer.pdf (2).pdf`}
                download
                className="download-cv-btn"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                📄 Scarica CV (PDF)
              </motion.a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
