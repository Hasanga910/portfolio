import { useState, useEffect } from 'react';
import LoadingScreen from './components/LoadingScreen';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Experience from './components/Experience';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';

// Animated Background Component
const AnimatedBackground = () => {
  const [dots, setDots] = useState([]);

  useEffect(() => {
    // Generate random positions for dots
    const generateDots = () => {
      const dotCount = 30; // Number of dots
      const newDots = [];
      
      for (let i = 0; i < dotCount; i++) {
        newDots.push({
          id: i,
          left: Math.random() * 100, // Random position in percentage
          top: Math.random() * 100,
          size: ['small', 'medium', 'large'][Math.floor(Math.random() * 3)]
        });
      }
      
      setDots(newDots);
    };

    generateDots();
  }, []);

  return (
    <div className="animated-background">
      {dots.map(dot => (
        <div
          key={dot.id}
          className={`dot ${dot.size}`}
          style={{
            left: `${dot.left}%`,
            top: `${dot.top}%`,
          }}
        />
      ))}
    </div>
  );
};

function App() {
  const [loading, setLoading] = useState(true);

  const handleLoadComplete = () => {
    setLoading(false);
  };

  return (
    <>
      {loading && <LoadingScreen onLoadingComplete={handleLoadComplete} />}
      
      <div className={`transition-opacity duration-500 ${loading ? 'opacity-0' : 'opacity-100'}`}>
        <AnimatedBackground />
        <Navbar />
        <main className="relative z-10">
          <Hero />
          <About />
          <Experience />
          <Skills />
          <Projects />
          <Contact />
        </main>
        <Footer />
      </div>
    </>
  );
}

export default App;