import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import LoadingScreen from "./components/LoadingScreen";
import { useLoadingProgress } from "./hooks/useLoadingProgress";
import Header from "./components/Header";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import "./styles/globals.css";

function App() {
  const [showLoading, setShowLoading] = useState(true);
  const { progress, isComplete } = useLoadingProgress(3000);

  const handleLoadingComplete = () => {
    setShowLoading(false);
  };

  if (showLoading) {
    return (
      <LoadingScreen progress={progress} onComplete={handleLoadingComplete} />
    );
  }

  return (
    <Router>
      <div className="app">
        <Header />
        <main>
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <Hero />
                  <About />
                  <Skills />
                  <Projects />
                  <Contact />
                </>
              }
            />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
