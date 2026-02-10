import { useEffect, useRef, useState } from 'react';
import { 
  FaReact, FaNodeJs, FaPython, FaJava, FaGitAlt, 
  FaDocker, FaAws, FaDatabase 
} from 'react-icons/fa';
import { 
  SiJavascript, SiTypescript, SiMongodb, SiCplusplus,SiPostgresql, 
  SiRedis, SiKubernetes, SiTailwindcss, SiNextdotjs, 
  SiMicrosoftsqlserver
} from 'react-icons/si';

const Skills = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
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

  const skillCategories = [
    {
      title: 'Frontend',
      skills: [
        { name: 'React', icon: <FaReact />, level: 90 },
        { name: 'JavaScript', icon: <SiJavascript />, level: 92 },
        { name: 'Tailwind CSS', icon: <SiTailwindcss />, level: 90 },
      ],
    },
    {
      title: 'Backend',
      skills: [
        { name: 'Java', icon: <FaJava />, level: 90 },
        { name: 'Python', icon: <FaPython />, level: 85 },
        { name: 'C++', icon: <SiCplusplus />, level: 75 },
      ],
    },
    {
      title: 'Database',
      skills: [
        { name: 'MongoDB', icon: <SiMongodb />, level: 87 },
        { name: 'MS SQL Server', icon: <SiMicrosoftsqlserver />, level: 85 },
      ],
    },
    {
      title: 'DevOps & Tools',
      skills: [
        { name: 'Docker', icon: <FaDocker />, level: 86 },
        { name: 'AWS', icon: <FaAws />, level: 84 },
        { name: 'Git', icon: <FaGitAlt />, level: 85 },
      ],
    },
  ];

  return (
    <section id="skills" ref={sectionRef} className="py-12 sm:py-16 md:py-20 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto">
        {/* Section Title */}
        <h2 
          className={`text-3xl sm:text-4xl md:text-5xl font-bold text-white dark:text-white text-center mb-3 sm:mb-4 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          Skills & Expertise
        </h2>
        <p 
          className={`text-center text-dark-gray dark:text-dark-gray mb-12 sm:mb-16 px-4 transition-all duration-1000 delay-100 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          Technologies I work with to build modern applications
        </p>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {skillCategories.map((category, categoryIndex) => (
            <div
              key={category.title}
              className={`card transition-all duration-1000 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: `${categoryIndex * 100 + 200}ms` }}
            >
              <h3 className="text-lg sm:text-xl font-semibold text-white dark:text-white mb-6 flex items-center gap-2">
                <span className="w-1 h-6 bg-white dark:bg-white rounded"></span>
                {category.title}
              </h3>
              
              <div className="space-y-5">
                {category.skills.map((skill, skillIndex) => (
                  <div key={skill.name} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-lg sm:text-xl text-light-gray dark:text-light-gray">{skill.icon}</span>
                        <span className="text-xs sm:text-sm font-medium text-light-gray dark:text-light-gray">{skill.name}</span>
                      </div>
                      <span className="text-xs text-dark-gray dark:text-dark-gray">{skill.level}%</span>
                    </div>
                    <div className="h-1.5 bg-dark-bg dark:bg-dark-bg rounded-full overflow-hidden">
                      <div
                        className="h-full bg-white dark:bg-white rounded-full transition-all duration-1000 ease-out"
                        style={{
                          width: isVisible ? `${skill.level}%` : '0%',
                          transitionDelay: `${categoryIndex * 100 + skillIndex * 50 + 400}ms`,
                        }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Additional Info */}
        <div 
          className={`mt-8 sm:mt-12 text-center transition-all duration-1000 delay-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <p className="text-dark-gray dark:text-dark-gray text-xs sm:text-sm px-4">
            Always learning and expanding my skillset with new technologies
          </p>
        </div>
      </div>
    </section>
  );
};

export default Skills;