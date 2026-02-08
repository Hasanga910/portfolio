import { useEffect, useRef, useState } from 'react';
import { FaGraduationCap, FaCode, FaLightbulb, FaRocket, FaRobot } from 'react-icons/fa';

const About = () => {
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

  return (
    <section id="about" ref={sectionRef} className="section-container">
      <div className="max-w-5xl mx-auto">
        {/* Section Title */}
        <h2 
          className={`text-4xl md:text-5xl font-bold text-white dark:text-white text-center mb-4 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          About Me
        </h2>
        <p 
          className={`text-center text-dark-gray dark:text-dark-gray mb-16 transition-all duration-1000 delay-100 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          Get to know more about my background and passion
        </p>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Left Column - Main Description */}
          <div
            className={`space-y-6 transition-all duration-1000 delay-200 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-white dark:text-white">
                Passionate Developer Building Digital Solutions
              </h3>
              <p className="text-light-gray dark:text-light-gray leading-relaxed">
                I’m a second-year Information Technology undergraduate specializing in Artificial Intelligence at Sri Lanka Institute of Information Technology (SLIIT), one of Sri Lanka’s leading private universities for IT education.
              </p>
              <p className="text-light-gray dark:text-light-gray leading-relaxed">
                With a strong interest in AI/ML, full-stack development, and modern UI-driven systems, I enjoy building practical, real-world solutions through hands-on projects. My experience includes developing machine learning models, web-based platforms, and smart IoT systems using technologies such as Python, Java, React, and ESP32.
              </p>
              <p className="text-light-gray dark:text-light-gray leading-relaxed">
                I believe in learning by building — continuously improving my skills through academic projects, certifications, and problem-solving challenges — with the goal of creating efficient, user-focused, and data-driven applications.
              </p>
            </div>

            {/* Quick Facts */}
            <div className="card">
              <h4 className="text-lg font-semibold text-white dark:text-white mb-4 flex items-center gap-2">
                <span className="w-1 h-6 bg-white dark:bg-white rounded"></span>
                Quick Facts
              </h4>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <span className="text-light-gray dark:text-light-gray mt-1">📍</span>
                  <div>
                    <p className="text-sm text-dark-gray dark:text-dark-gray">Location</p>
                    <p className="text-light-gray dark:text-light-gray">Matara, Sri Lanka</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-light-gray dark:text-light-gray mt-1">🏫</span>
                  <div>
                    <p className="text-sm text-dark-gray dark:text-dark-gray">University</p>
                    <p className="text-light-gray dark:text-light-gray">Sri Lanka Institute of Information Technology (SLIIT)</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-light-gray dark:text-light-gray mt-1">🎓</span>
                  <div>
                    <p className="text-sm text-dark-gray dark:text-dark-gray">Degree</p>
                    <p className="text-light-gray dark:text-light-gray">BSc (Hons) in Information Technology – Specialization: Artificial Intelligence</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-light-gray dark:text-light-gray mt-1">🟢</span>
                  <div>
                    <p className="text-sm text-dark-gray dark:text-dark-gray">Current status</p>
                    <p className="text-light-gray dark:text-light-gray">2 Year 2 Semester</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-light-gray dark:text-light-gray mt-1">🌐</span>
                  <div>
                    <p className="text-sm text-dark-gray dark:text-dark-gray">Languages</p>
                    <p className="text-light-gray dark:text-light-gray">English, Sinhala</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Highlights */}
          <div
            className={`space-y-6 transition-all duration-1000 delay-300 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            {/* What I Do */}
            <div className="card">
              <h4 className="text-lg font-semibold text-white dark:text-white mb-6 flex items-center gap-2">
                <span className="w-1 h-6 bg-white dark:bg-white rounded"></span>
                What I Do
              </h4>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-dark-bg dark:bg-dark-bg border border-dark-border dark:border-dark-border flex items-center justify-center flex-shrink-0">
                    <FaRobot className="text-lg text-light-gray dark:text-light-gray" />
                  </div>
                  <div>
                    <h5 className="text-white dark:text-white font-medium mb-1">AI/ML Model Training</h5>
                    <p className="text-sm text-light-gray dark:text-light-gray">
                      Designing and training machine learning models with data preprocessing and performance evaluation.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-dark-bg dark:bg-dark-bg border border-dark-border dark:border-dark-border flex items-center justify-center flex-shrink-0">
                    <FaCode className="text-lg text-light-gray dark:text-light-gray" />
                  </div>
                  <div>
                    <h5 className="text-white dark:text-white font-medium mb-1">Full-Stack Development</h5>
                    <p className="text-sm text-light-gray dark:text-light-gray">
                      Building end-to-end web applications with modern frameworks and best practices
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-dark-bg dark:bg-dark-bg border border-dark-border dark:border-dark-border flex items-center justify-center flex-shrink-0">
                    <FaRocket className="text-lg text-light-gray dark:text-light-gray" />
                  </div>
                  <div>
                    <h5 className="text-white dark:text-white font-medium mb-1">UI/UX Design</h5>
                    <p className="text-sm text-light-gray dark:text-light-gray">
                      Creating intuitive and beautiful user interfaces that enhance user experience
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-dark-bg dark:bg-dark-bg border border-dark-border dark:border-dark-border flex items-center justify-center flex-shrink-0">
                    <FaLightbulb className="text-lg text-light-gray dark:text-light-gray" />
                  </div>
                  <div>
                    <h5 className="text-white dark:text-white font-medium mb-1">Problem Solving</h5>
                    <p className="text-sm text-light-gray dark:text-light-gray">
                      Analyzing complex challenges and developing efficient, scalable solutions
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Core Values */}
            <div className="card">
              <h4 className="text-lg font-semibold text-white dark:text-white mb-6 flex items-center gap-2">
                <span className="w-1 h-6 bg-white dark:bg-white rounded"></span>
                Core Values
              </h4>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-dark-bg dark:bg-dark-bg rounded-lg border border-dark-border dark:border-dark-border">
                  <div className="text-2xl mb-2">🎯</div>
                  <p className="text-sm text-light-gray dark:text-light-gray font-medium">Quality First</p>
                </div>
                <div className="text-center p-4 bg-dark-bg dark:bg-dark-bg rounded-lg border border-dark-border dark:border-dark-border">
                  <div className="text-2xl mb-2">🚀</div>
                  <p className="text-sm text-light-gray dark:text-light-gray font-medium">Innovation</p>
                </div>
                <div className="text-center p-4 bg-dark-bg dark:bg-dark-bg rounded-lg border border-dark-border dark:border-dark-border">
                  <div className="text-2xl mb-2">🤝</div>
                  <p className="text-sm text-light-gray dark:text-light-gray font-medium">Collaboration</p>
                </div>
                <div className="text-center p-4 bg-dark-bg dark:bg-dark-bg rounded-lg border border-dark-border dark:border-dark-border">
                  <div className="text-2xl mb-2">📚</div>
                  <p className="text-sm text-light-gray dark:text-light-gray font-medium">Learning</p>
                </div>
              </div>
            </div>

            {/* Interests */}
            <div className="card">
              <h4 className="text-lg font-semibold text-white dark:text-white mb-4 flex items-center gap-2">
                <span className="w-1 h-6 bg-white dark:bg-white rounded"></span>
                Interests & Hobbies
              </h4>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1.5 bg-dark-bg dark:bg-dark-bg border border-dark-border dark:border-dark-border rounded-full text-sm text-light-gray dark:text-light-gray">
                  Open Source
                </span>
                <span className="px-3 py-1.5 bg-dark-bg dark:bg-dark-bg border border-dark-border dark:border-dark-border rounded-full text-sm text-light-gray dark:text-light-gray">
                  Tech Blogging
                </span>
                <span className="px-3 py-1.5 bg-dark-bg dark:bg-dark-bg border border-dark-border dark:border-dark-border rounded-full text-sm text-light-gray dark:text-light-gray">
                  Photography
                </span>
                <span className="px-3 py-1.5 bg-dark-bg dark:bg-dark-bg border border-dark-border dark:border-dark-border rounded-full text-sm text-light-gray dark:text-light-gray">
                  Travel
                </span>
                <span className="px-3 py-1.5 bg-dark-bg dark:bg-dark-bg border border-dark-border dark:border-dark-border rounded-full text-sm text-light-gray dark:text-light-gray">
                  Gaming
                </span>
                <span className="px-3 py-1.5 bg-dark-bg dark:bg-dark-bg border border-dark-border dark:border-dark-border rounded-full text-sm text-light-gray dark:text-light-gray">
                  Music
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;