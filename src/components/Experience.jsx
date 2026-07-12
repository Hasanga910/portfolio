import { useEffect, useRef, useState } from 'react';
import { FaUsers, FaBriefcase } from 'react-icons/fa';

const experiences = [
  {
    title: 'AI Engineer Intern',
    company: 'Aecendir Labs',
    period: 'Jul 2026 – Present',
    location: 'Hybrid',
    description: 'Working as an AI Engineer Intern at Aecendir Labs, contributing to the design and development of AI-driven solutions. Involved in building and fine-tuning machine learning models, developing data pipelines, and collaborating with the engineering team to integrate AI capabilities into production systems.',
    tags: ['AI/ML', 'Python', 'Machine Learning', 'Data Pipelines'],
    icon: <FaBriefcase />,
  },
  {
    title: 'President',
    company: 'Student Interactive Society (SIS)',
    period: '2026 – Present',
    location: 'SLITT Matara Center',
    description: 'Leading the Student Interactive Society to foster a collaborative tech community among students. Organizing workshops, hackathons, and networking events while mentoring members and driving initiatives that bridge academic learning with real-world industry skills.',
    tags: ['Leadership', 'Event Management', 'Community Building', 'Mentoring'],
    icon: <FaUsers />,
  },
];

const ExperienceCard = ({ item, index, isVisible, isLast }) => (
  <div
    className={`relative flex gap-4 sm:gap-6 transition-all duration-700 ${
      isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
    }`}
    style={{ transitionDelay: `${index * 150 + 200}ms` }}
  >
    {/* Timeline column */}
    <div className="flex flex-col items-center">
      <div className="w-10 h-10 rounded-lg bg-dark-surface border border-dark-border flex items-center justify-center flex-shrink-0 text-light-gray text-base">
        {item.icon}
      </div>
    </div>

    {/* Content */}
    <div className={`card flex-1 ${isLast ? 'mb-0' : 'mb-6'}`}>
      <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
        <div>
          <h3 className="text-base sm:text-lg font-semibold text-white leading-tight">
            {item.title}
          </h3>
          <p className="text-sm text-light-gray mt-0.5">{item.company}</p>
        </div>
        <div className="text-right flex-shrink-0">
          <p className="text-xs sm:text-sm text-dark-gray">{item.period}</p>
          <p className="text-xs text-dark-gray mt-0.5">{item.location}</p>
        </div>
      </div>

      <p className="text-xs sm:text-sm text-light-gray leading-relaxed mb-4">
        {item.description}
      </p>

      <div className="flex flex-wrap gap-2">
        {item.tags.map((tag) => (
          <span
            key={tag}
            className="px-2.5 py-1 bg-dark-bg border border-dark-border rounded-full text-xs text-light-gray"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  </div>
);

const Experience = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  }, []);

  return (
    <section id="experience" ref={sectionRef} className="py-12 sm:py-16 md:py-20 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto">
        <h2
          className={`text-3xl sm:text-4xl md:text-5xl font-bold text-white text-center mb-3 sm:mb-4 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          Experience
        </h2>
        <p
          className={`text-center text-dark-gray mb-12 sm:mb-16 px-4 transition-all duration-1000 delay-100 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          Places I've worked and the roles I've held
        </p>

        <div className="max-w-2xl mx-auto">
          {experiences.map((item, index) => (
            <ExperienceCard key={index} item={item} index={index} isVisible={isVisible} isLast={index === experiences.length - 1} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
