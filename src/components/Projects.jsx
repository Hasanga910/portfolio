import { useEffect, useRef, useState } from 'react';
import { FaGithub, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const Projects = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0); // 0 = header slide, 1-5 = projects
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [bgKey, setBgKey] = useState(0);
  const sectionRef = useRef(null);
  const containerRef = useRef(null);   // cinema wrapper — receives wheel/touch events
  const lastNavTimeRef = useRef(0);    // throttle timestamp
  const touchStartXRef = useRef(0);    // horizontal swipe origin

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => { if (sectionRef.current) observer.unobserve(sectionRef.current); };
  }, []);

  // Scroll / swipe navigation — re-attaches on each slide change for fresh closures
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const handleWheel = (e) => {
      e.preventDefault();
      const now = Date.now();
      if (now - lastNavTimeRef.current < 700) return;
      if (isTransitioning) return;
      if (Math.abs(e.deltaY) < 20) return;
      lastNavTimeRef.current = now;
      if (e.deltaY > 0) changeProject((activeIndex + 1) % totalSlides);
      else               changeProject((activeIndex - 1 + totalSlides) % totalSlides);
    };

    const handleTouchStart = (e) => {
      touchStartXRef.current = e.touches[0].clientX;
    };

    const handleTouchEnd = (e) => {
      if (isTransitioning) return;
      const delta = touchStartXRef.current - e.changedTouches[0].clientX;
      if (Math.abs(delta) < 50) return;
      const now = Date.now();
      if (now - lastNavTimeRef.current < 700) return;
      lastNavTimeRef.current = now;
      if (delta > 0) changeProject((activeIndex + 1) % totalSlides);
      else           changeProject((activeIndex - 1 + totalSlides) % totalSlides);
    };

    el.addEventListener('wheel',      handleWheel,      { passive: false });
    el.addEventListener('touchstart', handleTouchStart, { passive: true  });
    el.addEventListener('touchend',   handleTouchEnd,   { passive: true  });

    return () => {
      el.removeEventListener('wheel',      handleWheel);
      el.removeEventListener('touchstart', handleTouchStart);
      el.removeEventListener('touchend',   handleTouchEnd);
    };
  }, [activeIndex, isTransitioning]); // eslint-disable-line react-hooks/exhaustive-deps

  const projects = [
    {
      title: "Peoples' Health care",
      description: 'A real-client full-stack medical center platform integrating doctor consultations, prescription management, appointment scheduling, lab tests, pharmacy inventory, and billing — enhanced with CNN skin disease classification, NLP chatbot, and RAG medical assistant.',
      image: "Peoples' Health Care.jpg",
      technologies: ['Python', 'scikit-learn', 'CNN', 'NLP', 'MongoDB', 'Express.js', 'React', 'Node.js'],
      github: 'https://github.com/Hasanga910/People-s-Health-Care.git',
      tag: 'Full Stack · AI/ML',
    },
    {
      title: 'Hasanga | Hyper AI',
      description: 'Personal developer portfolio designed to present academic projects, technical skills, and experience. Built with a modern responsive UI and deployed on Vercel with real-time email contact functionality.',
      image: 'portfolio.png',
      technologies: ['React', 'Vite', 'Tailwind CSS', 'JavaScript', 'EmailJS', 'Vercel'],
      github: 'https://github.com/Hasanga910/portfolio.git',
      tag: 'Frontend · UI/UX',
    },
    {
      title: 'Flightify AI/ML',
      description: 'AI/ML system that predicts airline passenger satisfaction using multiple classification algorithms, helping airlines improve service quality and enabling passengers to choose higher-rated carriers.',
      image: 'Flightify.jpg',
      technologies: ['Python', 'Jupyter', 'Scikit-learn', 'Logistic Regression', 'Random Forest', 'SVM', 'KNN'],
      github: 'https://github.com/Hasanga910/Flightify.git',
      tag: 'Machine Learning',
    },
    {
      title: 'Hireza',
      description: 'End-to-end online recruitment platform featuring role-based portals for stakeholders. Streamlines job posting, candidate search, application tracking, and career guidance.',
      image: 'Hireza.webp',
      technologies: ['Java', 'MS SQL Server', 'Docker', 'JSP', 'Servlets', 'Apache Tomcat', 'MVC'],
      github: 'https://github.com/Hasanga910/HireZa.git',
      tag: 'Enterprise · Java',
    },
    {
      title: 'ApolloCabs',
      description: 'Comprehensive online taxi booking platform built with Java OOP principles, featuring multi-portal system for passengers, drivers, and admins with real-time booking capabilities.',
      image: 'Apollocabs.jpg',
      technologies: ['Java 17', 'JSP', 'Servlets', 'Apache Tomcat', 'MVC', 'HTML/CSS'],
      github: 'https://github.com/Hasanga910/ApolloCabs.git',
      tag: 'Full Stack · Java',
    },
  ];

  // Slide 0 = header, slides 1-5 = projects
  const totalSlides = projects.length + 1; // 6

  const changeProject = (newIndex) => {
    if (isTransitioning || newIndex === activeIndex) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setActiveIndex(newIndex);
      setBgKey(k => k + 1);
      setIsTransitioning(false);
    }, 380);
  };

  const prev = () => changeProject((activeIndex - 1 + totalSlides) % totalSlides);
  const next = () => changeProject((activeIndex + 1) % totalSlides);

  // Right-panel reel: always shows 3 actual project cards (never the header)
  // When on header (0): show projects 1, 2, 3
  // When on project i: show next 3 wrapping within projects only
  const reelIndices = (() => {
    if (activeIndex === 0) return [1, 2, 3];
    const pos = activeIndex - 1; // 0-4
    return [1, 2, 3].map(offset => ((pos + offset) % projects.length) + 1);
  })();

  const isHeader = activeIndex === 0;
  const activeProject = !isHeader ? projects[activeIndex - 1] : null;

  return (
    <section id="projects" ref={sectionRef}>

      {/* One unified cinema frame — min-h-screen */}
      <div
        ref={containerRef}
        className={`relative overflow-hidden min-h-screen transition-all duration-1000 delay-100 ${!isHeader ? 'bg-dark-bg' : ''} ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        {/* ── Background image (project slides only) ── */}
        {!isHeader && (
          <div
            key={bgKey}
            className="absolute inset-0"
            style={{ animation: 'bgZoomIn 0.7s ease-out forwards' }}
          >
            <img
              src={activeProject.image}
              alt={activeProject.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        {/* ── Gradient overlays (project slides only) ── */}
        {!isHeader && (
          <>
            <div className="absolute inset-0 bg-black/45 pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-black/20 pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-transparent pointer-events-none hidden lg:block" />
            <div className="absolute top-0 bottom-0 right-0 w-[44%] bg-black/65 pointer-events-none hidden lg:block" />
            <div
              className="absolute top-0 bottom-0 hidden lg:block pointer-events-none"
              style={{ right: '44%', width: '90px', background: 'linear-gradient(to right, transparent, rgba(0,0,0,0.65))' }}
            />
          </>
        )}

        {/* ── Right panel separator (header slide only) ── */}
        {isHeader && (
          <div className="absolute top-0 bottom-0 right-0 w-[44%] border-l border-dark-border/50 bg-dark-surface/10 pointer-events-none hidden lg:block" />
        )}

        {/* ── Content ── */}
        <div
          className={`relative z-10 max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 flex flex-col lg:flex-row min-h-screen transition-opacity duration-380 ${
            isTransitioning ? 'opacity-0' : 'opacity-100'
          }`}
        >

          {/* ══════════════════════════
              LEFT PANEL
              ══════════════════════════ */}
          <div className="flex flex-col lg:w-[56%] py-10 lg:py-14">

            {isHeader ? (
              /* ── HEADER SLIDE ── */
              <>
                <div className="flex items-center gap-2.5 mb-auto">
                  <div className="w-0.5 h-5 bg-accent-green rounded-full" />
                  <span className="text-xs text-white/40 uppercase tracking-[0.2em]">Portfolio</span>
                </div>

                <div className="mt-auto pb-10 sm:pb-14">
                  <h2 className="text-6xl sm:text-7xl lg:text-8xl font-bold text-white mb-4 leading-none">
                    Projects
                  </h2>
                  <p className="text-white/35 text-lg sm:text-xl italic font-light mb-10">
                    The proof of who I am
                  </p>
                  <button
                    onClick={next}
                    className="flex items-center gap-2 px-6 py-3 bg-white text-dark-bg rounded-lg text-sm font-semibold hover:bg-accent-green transition-colors duration-200"
                  >
                    Explore Projects
                    <FaChevronRight className="text-xs" />
                  </button>
                </div>
              </>
            ) : (
              /* ── PROJECT SLIDE ── */
              <>
                <div className="flex items-center gap-2.5 mb-auto">
                  <div className="w-0.5 h-5 bg-accent-green rounded-full" />
                  <span className="text-xs text-white/50 uppercase tracking-[0.2em]">Featured</span>
                </div>

                <div className="mt-auto pb-8 sm:pb-12">
                  <span className="inline-block px-2.5 py-0.5 border border-white/15 rounded text-[10px] text-white/40 uppercase tracking-widest mb-5">
                    {activeProject.tag}
                  </span>

                  <div className="flex items-end gap-4 mb-3 flex-wrap">
                    <span className="text-5xl sm:text-6xl font-extralight text-white/50 leading-none tracking-tight select-none shrink-0">
                      {String(activeIndex).padStart(2, '0')}
                    </span>
                    <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white leading-tight">
                      {activeProject.title}
                    </h3>
                  </div>

                  <p className="text-sm text-white/50 italic leading-relaxed mb-5 max-w-md line-clamp-3">
                    {activeProject.description}
                  </p>

                  <p className="text-[10px] text-white/30 uppercase tracking-widest mb-2.5">Tech Stack</p>
                  <div className="flex flex-wrap gap-2 mb-7">
                    {activeProject.technologies.slice(0, 5).map((tech, i) => (
                      <span key={i} className="px-3 py-1 rounded-full border border-white/15 bg-white/5 text-xs text-white/70">
                        {tech}
                      </span>
                    ))}
                    {activeProject.technologies.length > 5 && (
                      <span className="px-3 py-1 rounded-full border border-white/15 bg-white/5 text-xs text-white/70">
                        +{activeProject.technologies.length - 5}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-3">
                    <a
                      href={activeProject.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-5 py-2.5 bg-white text-dark-bg rounded-lg text-sm font-semibold hover:bg-accent-green transition-colors duration-200"
                    >
                      <FaGithub className="text-base" />
                      View Code
                    </a>
                    <button
                      onClick={next}
                      className="flex items-center gap-2 px-4 py-2.5 border border-white/25 text-white/80 rounded-lg text-sm hover:bg-white/10 hover:border-white/40 transition-all duration-200"
                    >
                      Next <FaChevronRight className="text-xs" />
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* ══════════════════════════
              RIGHT PANEL — reel + nav
              ══════════════════════════ */}
          <div className="flex-1 flex flex-col justify-center gap-5 py-10 lg:py-14 lg:pl-8">

            <div className="flex items-center gap-3">
              <div className="w-0.5 h-6 bg-white/20 rounded-full" />
              <span className="text-xs text-white/40 uppercase tracking-[0.2em]">All Projects</span>
            </div>

            {/* 3 portrait cards */}
            <div className="flex gap-3 lg:gap-4">
              {reelIndices.map((slideIdx) => {
                const project = projects[slideIdx - 1];
                return (
                  <button
                    key={slideIdx}
                    onClick={() => changeProject(slideIdx)}
                    className="group relative flex-1 rounded-xl overflow-hidden border border-white/10 hover:border-accent-green/60 transition-all duration-300 hover:scale-[1.04] focus:outline-none"
                    style={{ height: '240px' }}
                  >
                    <img
                      src={project.image}
                      alt={project.title}
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-black/35 group-hover:from-black/60 transition-all duration-300" />
                    <span className="absolute top-2.5 left-3 text-xs font-light text-white/45 select-none">
                      {String(slideIdx).padStart(2, '0')}
                    </span>
                    <div className="absolute bottom-0 left-0 right-0 p-3">
                      <p className="text-[11px] text-white font-medium leading-snug line-clamp-2 text-left group-hover:text-accent-green transition-colors duration-200">
                        {project.title}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Navigation: arrows + dots */}
            <div className="flex items-center justify-center gap-3">
              <button
                onClick={prev}
                className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:bg-white/10 hover:text-white hover:border-white/40 transition-all duration-200"
              >
                <FaChevronLeft className="text-[10px]" />
              </button>

              <div className="flex items-center gap-1.5">
                {Array.from({ length: totalSlides }).map((_, i) => (
                  <button
                    key={i}
                    onClick={() => changeProject(i)}
                    className={`rounded-full transition-all duration-300 ${
                      i === activeIndex
                        ? 'w-5 h-1.5 bg-white'
                        : 'w-1.5 h-1.5 bg-white/25 hover:bg-white/50'
                    }`}
                  />
                ))}
              </div>

              <button
                onClick={next}
                className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:bg-white/10 hover:text-white hover:border-white/40 transition-all duration-200"
              >
                <FaChevronRight className="text-[10px]" />
              </button>
            </div>

            {/* GitHub link */}
            <div className="flex justify-center">
              <a
                href="https://github.com/Hasanga910"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-[10px] text-white/25 hover:text-white/60 transition-colors uppercase tracking-widest"
              >
                <FaGithub />
                More on GitHub
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Projects;
