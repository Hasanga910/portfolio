import { useEffect, useRef, useState } from 'react';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';

const Projects = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Set visibility based on whether element is intersecting
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const projects = [
    {
      title: "Peoples' Health care",
      description: 'Coming Soon...',
      image: "Peoples' Health Care.jpg",
      technologies: ['Python', 'Google Colab Notebook','Jupyter','scikit-learn','CNN','MongoDB','Express.js','React','Node.js'],
      github: 'https://github.com/Hasanga910/People-s-Health-Care.git',
      live: 'https://demo-ecommerce.com',
      featured: true,
      upcoming: true,
    },
    {
      title: 'Flightify AI/ML - Airline Passenger Satisfaction Prediction',
      description: 'AI/ML system that predicts passenger satisfaction based on airline service factors, helping airlines improve service quality and enabling passengers to choose higher-rated airlines.',
      image: 'Flightify.jpg',
      technologies: ['Python', 'Google Colab Notebook','Jupyter','scikit-learn'],
      github: 'https://github.com/Hasanga910/Flightify.git',
      live: 'https://demo-ecommerce.com',
      featured: true,
      upcoming: false,
    },
    {
      title: 'Hireza - Web Based Recruitment System',
      description: 'End-to-end online recruitment platform featuring role-based portals for stakeholders. The system streamlines job posting, candidate search, application tracking, and career guidance.',
      image: 'Hireza.webp',
      technologies: ['Java', 'MS SQL Server', 'Docker', 'JSP','Servlets', 'Apache Tomcat', 'MVC', 'HTML/CSS'],
      github: 'https://github.com/Hasanga910/HireZa.git',
      live: 'https://demo-taskmanager.com',
      featured: true,
      upcoming: false,
    },
    {
      title: 'ApolloCabs Taxi Booking Platform',
      description: 'Comprehensive online taxi booking platform built with Java OOP principles, featuring multi-portal system for passengers, drivers, and admins with real-time booking capabilities.',
      image: 'Apollocabs.jpg',
      technologies: ['Java 17', 'JSP', 'Servlets','Apache Tomcat','MVC','HTML/CSS'],
      github: 'https://github.com/Hasanga910/ApolloCabs.git',
      live: 'https://demo-weather.com',
      featured: false,
      upcoming: false,
    },
  ];

  return (
    <section id="projects" ref={sectionRef} className="section-container">
      <div className="max-w-6xl mx-auto">
        {/* Section Title */}
        <h2 
          className={`text-4xl md:text-5xl font-bold text-white dark:text-white text-center mb-4 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          Featured Projects
        </h2>
        <p 
          className={`text-center text-dark-gray dark:text-dark-gray mb-16 transition-all duration-1000 delay-100 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          Some of the projects I've worked on recently
        </p>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <div
              key={index}
              className={`card group hover:scale-[1.02] transition-all duration-500 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: `${index * 100 + 200}ms` }}
            >
              {/* Project Image */}
              <div className="relative overflow-hidden rounded-lg mb-4 h-48 bg-dark-bg dark:bg-dark-bg">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                {project.featured && (
                  <span className="absolute top-4 right-4 px-3 py-1 bg-white text-dark-bg text-xs font-semibold rounded-full">
                    Featured
                  </span>
                )}
                {project.upcoming && (
                  <span className="absolute top-4 right-4 px-3 py-1 bg-accent-green text-dark-bg text-xs font-semibold rounded-full">
                    Upcoming
                  </span>
                )}
              </div>

              {/* Project Info */}
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-white dark:text-white group-hover:text-white transition-colors">
                  {project.title}
                </h3>
                <p className="text-light-gray dark:text-light-gray text-sm leading-relaxed">
                  {project.description}
                </p>

                {/* Technologies */}
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="px-3 py-1 bg-dark-bg dark:bg-dark-bg border border-dark-border dark:border-dark-border rounded-full text-xs text-light-gray dark:text-light-gray"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Links */}
                <div className="flex items-center gap-4 pt-4">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-light-gray dark:text-light-gray hover:text-white dark:hover:text-white transition-colors"
                  >
                    <FaGithub className="text-lg" />
                    <span className="text-sm">Code</span>
                  </a>
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-light-gray dark:text-light-gray hover:text-white dark:hover:text-white transition-colors"
                  >
                    <FaExternalLinkAlt className="text-sm" />
                    <span className="text-sm">Live Demo</span>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View More with Blinking Animation */}
        <div 
          className={`text-center mt-12 transition-all duration-1000 delay-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <a
            href="https://github.com/Hasanga910"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-light-gray dark:text-light-gray hover:text-white dark:hover:text-white transition-colors animate-pulse-slow"
          >
            <span>View more projects on GitHub</span>
            <FaExternalLinkAlt className="text-sm" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Projects;
