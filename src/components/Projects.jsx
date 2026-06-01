import { useEffect, useRef, useState } from 'react';
import { FaGithub, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const Projects = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [bgKey, setBgKey] = useState(0);
  const [carouselDragX, setCarouselDragX] = useState(0);
  const sectionRef = useRef(null);
  const containerRef = useRef(null);
  const carouselRef = useRef(null);
  const lastNavTimeRef = useRef(0);
  const carouselDragRef = useRef({ isDragging: false, startX: 0 });
  // synchronous lock — prevents double-fire before React re-renders isTransitioning
  const isNavigatingRef = useRef(false);
  // persists across effect re-runs so hover state isn't lost when activeIndex changes
  const isCarouselHoveredRef = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => { if (sectionRef.current) observer.unobserve(sectionRef.current); };
  }, []);

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

  const totalSlides = projects.length + 1;

  const changeProject = (newIndex) => {
    if (isNavigatingRef.current || newIndex === activeIndex) return;
    isNavigatingRef.current = true;
    setIsTransitioning(true);
    setTimeout(() => {
      setActiveIndex(newIndex);
      setBgKey(k => k + 1);
      setIsTransitioning(false);
      isNavigatingRef.current = false;
    }, 380);
  };

  const prev = () => changeProject((activeIndex - 1 + totalSlides) % totalSlides);
  const next = () => changeProject((activeIndex + 1) % totalSlides);

  // No wheel handler on the container — vertical scroll scrolls the site naturally.
  // Projects are navigated via carousel horizontal swipe, arrows, and dots.

  // Carousel: touch + trackpad wheel — stopPropagation so parent doesn't double-fire
  useEffect(() => {
    const el = carouselRef.current;
    if (!el) return;

    // ── Touch (mobile) ──
    const onTouchStart = (e) => {
      carouselDragRef.current = { isDragging: true, startX: e.touches[0].clientX };
      e.stopPropagation();
    };
    const onTouchMove = (e) => {
      if (!carouselDragRef.current.isDragging) return;
      setCarouselDragX((e.touches[0].clientX - carouselDragRef.current.startX) * 0.55);
      e.stopPropagation();
    };
    const onTouchEnd = (e) => {
      if (!carouselDragRef.current.isDragging) return;
      carouselDragRef.current.isDragging = false;
      const delta = carouselDragRef.current.startX - e.changedTouches[0].clientX;
      setCarouselDragX(0);
      e.stopPropagation();
      if (Math.abs(delta) < 45 || isNavigatingRef.current) return;
      const now = Date.now();
      if (now - lastNavTimeRef.current < 700) return;
      lastNavTimeRef.current = now;
      if (delta > 0) next();
      else prev();
    };

    // ── Trackpad / mouse wheel (horizontal deltaX) ──
    let wheelAccum = 0;
    let wheelResetId = null;

    const onMouseEnter = () => { isCarouselHoveredRef.current = true; };
    const onMouseLeave = () => { isCarouselHoveredRef.current = false; wheelAccum = 0; setCarouselDragX(0); };

    const onWheel = (e) => {
      // when cursor is not over carousel, let everything pass to the parent
      if (!isCarouselHoveredRef.current) return;

      const isHorizontal = Math.abs(e.deltaX) > Math.abs(e.deltaY) * 0.5;

      // vertical scroll passes through to parent for normal slide navigation
      if (!isHorizontal) return;

      // only claim horizontal events
      e.preventDefault();
      e.stopPropagation();

      if (isNavigatingRef.current) return;

      wheelAccum += e.deltaX;
      // live drag preview: positive deltaX (swipe left) → cards shift left
      setCarouselDragX(-Math.sign(wheelAccum) * Math.min(Math.abs(wheelAccum) * 0.38, 90));

      if (wheelResetId) clearTimeout(wheelResetId);
      wheelResetId = setTimeout(() => {
        setCarouselDragX(0);
        wheelAccum = 0;
      }, 250);

      if (Math.abs(wheelAccum) >= 90) {
        const dir = wheelAccum > 0 ? 1 : -1;
        wheelAccum = 0;
        clearTimeout(wheelResetId);
        setCarouselDragX(0);
        lastNavTimeRef.current = Date.now();
        if (dir > 0) next();
        else prev();
      }
    };

    el.addEventListener('mouseenter', onMouseEnter);
    el.addEventListener('mouseleave', onMouseLeave);
    el.addEventListener('touchstart', onTouchStart, { passive: true  });
    el.addEventListener('touchmove',  onTouchMove,  { passive: true  });
    el.addEventListener('touchend',   onTouchEnd,   { passive: true  });
    el.addEventListener('wheel',      onWheel,      { passive: false });

    return () => {
      el.removeEventListener('mouseenter', onMouseEnter);
      el.removeEventListener('mouseleave', onMouseLeave);
      el.removeEventListener('touchstart', onTouchStart);
      el.removeEventListener('touchmove',  onTouchMove);
      el.removeEventListener('touchend',   onTouchEnd);
      el.removeEventListener('wheel',      onWheel);
      if (wheelResetId) clearTimeout(wheelResetId);
    };
  }, [activeIndex, isTransitioning]); // eslint-disable-line react-hooks/exhaustive-deps

  // Mobile swipe: horizontal touch on the full section navigates projects.
  // Carousel's stopPropagation ensures this doesn't double-fire on desktop.
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    let startX = 0;
    const onStart = (e) => { startX = e.touches[0].clientX; };
    const onEnd = (e) => {
      const delta = startX - e.changedTouches[0].clientX;
      if (Math.abs(delta) < 50 || isNavigatingRef.current) return;
      const now = Date.now();
      if (now - lastNavTimeRef.current < 700) return;
      lastNavTimeRef.current = now;
      if (delta > 0) next();
      else prev();
    };
    el.addEventListener('touchstart', onStart, { passive: true });
    el.addEventListener('touchend',   onEnd,   { passive: true });
    return () => {
      el.removeEventListener('touchstart', onStart);
      el.removeEventListener('touchend',   onEnd);
    };
  }, [activeIndex, isTransitioning]); // eslint-disable-line react-hooks/exhaustive-deps

  const isHeader = activeIndex === 0;
  const activeProject = !isHeader ? projects[activeIndex - 1] : null;
  // which project index is centered in the carousel (0-based)
  const carouselCenter = isHeader ? 0 : activeIndex - 1;

  return (
    <section id="projects" ref={sectionRef}>

      <div
        ref={containerRef}
        className={`relative overflow-hidden min-h-screen transition-all duration-1000 delay-100 bg-dark-bg ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        {/* Background image */}
        {!isHeader && (
          <div key={bgKey} className="absolute inset-0" style={{ animation: 'bgZoomIn 0.7s ease-out forwards' }}>
            <img src={activeProject.image} alt={activeProject.title} className="w-full h-full object-cover" />
          </div>
        )}

        {/* Gradient overlays */}
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

        {/* Right panel separator on header */}
        {isHeader && (
          <div className="absolute top-0 bottom-0 right-0 w-[44%] border-l border-dark-border/50 bg-dark-surface/10 pointer-events-none hidden lg:block" />
        )}

        {/* Content */}
        <div
          className={`relative z-10 max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 flex flex-col lg:flex-row min-h-screen transition-opacity duration-380 ${
            isTransitioning ? 'opacity-0' : 'opacity-100'
          }`}
        >

          {/* ── LEFT PANEL ── */}
          <div className="flex flex-col w-full lg:w-[56%] py-10 lg:py-14 flex-1 lg:flex-none">

            {isHeader ? (
              <>
                <div className="flex items-center gap-2.5 mb-auto">
                  <div className="w-0.5 h-5 bg-accent-green rounded-full" />
                  <span className="text-xs text-white/40 uppercase tracking-[0.2em]">Portfolio</span>
                </div>
                <div className="mt-auto pb-10 sm:pb-14">
                  <h2 className="text-6xl sm:text-7xl lg:text-8xl font-bold text-white mb-4 leading-none">Projects</h2>
                  <p className="text-white/35 text-lg sm:text-xl italic font-light mb-10">The proof of who I am</p>
                  <button
                    onClick={next}
                    className="flex items-center gap-2 px-6 py-3 bg-white text-dark-bg rounded-lg text-sm font-semibold hover:bg-accent-green transition-colors duration-200"
                  >
                    Explore Projects <FaChevronRight className="text-xs" />
                  </button>

                  {/* mobile dots */}
                  <div className="flex lg:hidden items-center gap-1.5 mt-8">
                    {Array.from({ length: totalSlides }).map((_, i) => (
                      <button key={i} onClick={() => changeProject(i)}
                        className={`rounded-full transition-all duration-300 ${
                          i === activeIndex ? 'w-5 h-1.5 bg-white' : 'w-1.5 h-1.5 bg-white/30'
                        }`} />
                    ))}
                  </div>
                </div>
              </>
            ) : (
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
                      <span key={i} className="px-3 py-1 rounded-full border border-white/15 bg-white/5 text-xs text-white/70">{tech}</span>
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
                      <FaGithub className="text-base" /> View Code
                    </a>
                    <button
                      onClick={next}
                      className="flex items-center gap-2 px-4 py-2.5 border border-white/25 text-white/80 rounded-lg text-sm hover:bg-white/10 hover:border-white/40 transition-all duration-200"
                    >
                      Next <FaChevronRight className="text-xs" />
                    </button>
                  </div>

                  {/* mobile dots */}
                  <div className="flex lg:hidden items-center gap-1.5 mt-5">
                    {Array.from({ length: totalSlides }).map((_, i) => (
                      <button key={i} onClick={() => changeProject(i)}
                        className={`rounded-full transition-all duration-300 ${
                          i === activeIndex ? 'w-5 h-1.5 bg-white' : 'w-1.5 h-1.5 bg-white/30'
                        }`} />
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>

          {/* ── RIGHT PANEL — 3D Carousel (desktop only) ── */}
          <div className="hidden lg:flex flex-1 flex-col justify-center gap-6 py-10 lg:py-14 lg:px-8">

            <div className="flex items-center gap-3">
              <div className="w-0.5 h-6 bg-white/20 rounded-full" />
              <span className="text-xs text-white/40 uppercase tracking-[0.2em]">All Projects</span>
            </div>

            {/* 3D Carousel */}
            <div className="relative overflow-hidden" style={{ height: '260px' }}>
            <div
              ref={carouselRef}
              className="relative select-none"
              style={{ height: '260px', perspective: '900px', perspectiveOrigin: '50% 50%' }}
            >
              {projects.map((project, i) => {
                // compute shortest circular offset from carousel center
                let offset = i - carouselCenter;
                const half = Math.floor(projects.length / 2);
                if (offset > half)  offset -= projects.length;
                if (offset < -half) offset += projects.length;

                const absOffset = Math.abs(offset);
                const isCenter  = offset === 0;

                // per-card visual params
                const tx      = offset * 110 + carouselDragX;      // horizontal shift (px)
                const ry      = -offset * 40 - carouselDragX * 0.08; // Y-axis rotation (deg)
                const scale   = 1 - absOffset * 0.13;
                const opacity = absOffset === 0 ? 1 : absOffset === 1 ? 0.68 : absOffset === 2 ? 0.38 : 0;
                const zIndex  = 10 - absOffset * 3;

                const isDragging = carouselDragRef.current.isDragging;

                return (
                  <button
                    key={project.title}
                    onClick={() => !isDragging && changeProject(i + 1)}
                    className="absolute group rounded-xl overflow-hidden border focus:outline-none"
                    style={{
                      width: '148px',
                      height: '220px',
                      top: '50%',
                      left: '50%',
                      transformOrigin: 'center center',
                      transform: `translateX(calc(-50% + ${tx}px)) translateY(-50%) rotateY(${ry}deg) scale(${scale})`,
                      opacity,
                      zIndex,
                      borderColor: isCenter ? 'rgba(255,255,255,0.32)' : 'rgba(255,255,255,0.08)',
                      transition: isDragging
                        ? 'opacity 0.2s ease, border-color 0.2s ease'
                        : 'transform 0.55s cubic-bezier(0.25,0.46,0.45,0.94), opacity 0.55s ease, border-color 0.3s ease',
                      willChange: 'transform, opacity',
                      pointerEvents: opacity < 0.1 ? 'none' : 'auto',
                      cursor: isCenter ? 'default' : 'pointer',
                    }}
                  >
                    <img
                      src={project.image}
                      alt={project.title}
                      className="absolute inset-0 w-full h-full object-cover"
                      draggable={false}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/88 via-black/18 to-black/32" />

                    {/* active ring */}
                    {isCenter && (
                      <div className="absolute inset-0 rounded-xl ring-1 ring-accent-green/45 pointer-events-none" />
                    )}

                    {/* hover shimmer on side cards */}
                    {!isCenter && (
                      <div className="absolute inset-0 bg-white/0 group-hover:bg-white/5 transition-colors duration-300 rounded-xl" />
                    )}

                    <span className="absolute top-2.5 left-3 text-[10px] font-light text-white/40 select-none tabular-nums">
                      {String(i + 1).padStart(2, '0')}
                    </span>

                    <div className="absolute bottom-0 left-0 right-0 p-3">
                      <p className={`text-[11px] font-medium leading-snug line-clamp-2 text-left transition-colors duration-200 ${
                        isCenter ? 'text-white' : 'text-white/55 group-hover:text-white/80'
                      }`}>
                        {project.title}
                      </p>
                      {isCenter && (
                        <p className="text-[9px] text-accent-green/65 mt-0.5 uppercase tracking-wider truncate">
                          {project.tag}
                        </p>
                      )}
                    </div>
                  </button>
                );
              })}

              {/* edge fade masks */}
              <div className="absolute inset-y-0 left-0 w-8 pointer-events-none"
                style={{ background: 'linear-gradient(to right, rgba(0,0,0,0.5), transparent)' }} />
              <div className="absolute inset-y-0 right-0 w-8 pointer-events-none"
                style={{ background: 'linear-gradient(to left, rgba(0,0,0,0.5), transparent)' }} />
            </div>
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
                className="flex items-center gap-1.5 text-[10px] text-white/40 hover:text-white/70 uppercase tracking-widest animate-pulse hover:animate-none transition-colors duration-200"
              >
                <FaGithub /> More on GitHub
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Projects;
