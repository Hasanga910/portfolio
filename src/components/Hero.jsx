import { useEffect, useState } from 'react';
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20 px-4 sm:px-6 pb-24 md:pb-0">
      <div className="max-w-6xl mx-auto relative z-10 w-full py-8 sm:py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center">
          {/* Text Content */}
          <div className={`space-y-6 sm:space-y-8 text-center md:text-left transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            {/* Available Badge */}
            <div className="status-badge inline-flex mx-auto md:mx-0">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-green opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-accent-green"></span>
              </span>
              <span className="text-light-gray dark:text-light-gray light:text-light-text-secondary">AI Engineer Intern @ Aecendir Labs</span>
            </div>

            {/* Main Title */}
            <div className="space-y-3 sm:space-y-4">
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white dark:text-white light:text-light-text leading-tight">
                Hi there, I'm<br />
                <span className="text-white dark:text-white light:text-light-text">Hasanga</span>
              </h1>
              <p className="text-base sm:text-lg md:text-xl text-light-gray dark:text-light-gray light:text-light-text-secondary leading-relaxed">
                Undergraduate IT Student at SLIIT
              </p>
              <p className="text-sm sm:text-base text-dark-gray dark:text-dark-gray light:text-light-text-secondary leading-relaxed max-w-lg mx-auto md:mx-0">
                Specializing in Artificial Intelligence
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 justify-center md:justify-start">
              <a
                href="https://drive.google.com/file/d/1wxySkFgu6U3nCKnSGWYh-g48zLn-vBui/view?usp=sharing"
                download
                className="btn-primary inline-flex items-center justify-center gap-2 w-full sm:w-auto"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <span>Download Resume</span>
              </a>
              <button 
                onClick={() => scrollToSection('projects')}
                className="btn-secondary inline-flex items-center justify-center gap-2 w-full sm:w-auto"
              >
                <span>View My Work</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </button>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-4 pt-4 justify-center md:justify-start">
              <a 
                href="https://github.com/Hasanga910" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center rounded-lg bg-dark-surface dark:bg-dark-surface light:bg-light-surface border border-dark-border dark:border-dark-border light:border-light-border hover:border-white dark:hover:border-white light:hover:border-gray-400 transition-all duration-300"
              >
                <FaGithub className="text-xl text-light-gray dark:text-light-gray light:text-light-text-secondary hover:text-white dark:hover:text-white light:hover:text-light-text transition-colors" />
              </a>
              <a 
                href="https://www.linkedin.com/in/sajana-hasanga-529b29308" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center rounded-lg bg-dark-surface dark:bg-dark-surface light:bg-light-surface border border-dark-border dark:border-dark-border light:border-light-border hover:border-white dark:hover:border-white light:hover:border-gray-400 transition-all duration-300"
              >
                <FaLinkedin className="text-xl text-light-gray dark:text-light-gray light:text-light-text-secondary hover:text-white dark:hover:text-white light:hover:text-light-text transition-colors" />
              </a>
              <a 
                href="mailto:hasangashn910@gmail.com"
                className="w-10 h-10 flex items-center justify-center rounded-lg bg-dark-surface dark:bg-dark-surface light:bg-light-surface border border-dark-border dark:border-dark-border light:border-light-border hover:border-white dark:hover:border-white light:hover:border-gray-400 transition-all duration-300"
              >
                <FaEnvelope className="text-xl text-light-gray dark:text-light-gray light:text-light-text-secondary hover:text-white dark:hover:text-white light:hover:text-light-text transition-colors" />
              </a>
            </div>
          </div>

          {/* Profile Image Section */}
          <div className={`flex justify-center md:justify-end transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
            <div className="relative">
              {/* Profile Image Container */}
              <div className="relative w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 rounded-full overflow-hidden bg-gradient-to-br from-dark-surface to-dark-bg dark:from-dark-surface dark:to-dark-bg light:from-light-surface light:to-white border border-dark-border dark:border-dark-border light:border-light-border">
                <img
                  src="IMG_2764.jpg"
                  alt="Sajana Hasanga"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.src = 'https://ui-avatars.com/api/?name=Hasanga&size=400&background=111111&color=ffffff';
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
<div className="absolute left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2" style={{ bottom: '-75px' }}>
  <span className="text-dark-gray dark:text-dark-gray light:text-light-text-secondary text-xs">Scroll to explore</span>
  <svg className="w-6 h-6 text-dark-gray dark:text-dark-gray light:text-light-text-secondary animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
  </svg>
</div>
      </div>
    </section>
  );
};

export default Hero;
