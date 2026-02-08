import { useEffect, useRef, useState } from 'react';
import { FaEnvelope, FaLinkedin, FaGithub, FaTwitter } from 'react-icons/fa';
import emailjs from '@emailjs/browser';

const Contact = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
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

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
  e.preventDefault();

  const templateParams = {
    name: formData.name,
    email: formData.email,
    message: formData.message,
  };

  emailjs
    .send(
      "service_6kaq58i",
      "template_wypdicj",
      templateParams,
      "8uLn8TbIQXQdzxqpS"
    )
    .then(
      (result) => {
        alert("Message sent successfully!");
        setFormData({ name: '', email: '', message: '' });
      },
      (error) => {
        console.error(error);
        alert("Failed to send message!");
      }
    );
};


  const contactInfo = [
    {
      icon: <FaEnvelope />,
      label: 'Email',
      value: 'hasangashn910@gmail.com',
      link: 'mailto:hasangashn910@gmail.com',
    },
    {
      icon: <FaLinkedin />,
      label: 'LinkedIn',
      value: 'https://www.linkedin.com/in/sajana-hasanga-529b29308',
      link: 'https://www.linkedin.com/in/sajana-hasanga-529b29308',
    },
    {
      icon: <FaGithub />,
      label: 'GitHub',
      value: 'github.com/Hasanga910',
      link: 'https://github.com/Hasanga910',
    },
    
  ];

  return (
    <section id="contact" ref={sectionRef} className="section-container">
      <div className="max-w-5xl mx-auto">
        {/* Section Title */}
        <h2 
          className={`text-4xl md:text-5xl font-bold text-white dark:text-white text-center mb-4 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          Get In Touch
        </h2>
        <p 
          className={`text-center text-dark-gray dark:text-dark-gray mb-16 transition-all duration-1000 delay-100 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          Have a project in mind? Let's work together
        </p>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div
            className={`transition-all duration-1000 delay-200 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-light-gray dark:text-light-gray text-sm font-medium mb-2">
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-dark-surface dark:bg-dark-surface border border-dark-border dark:border-dark-border rounded-lg text-white dark:text-white focus:outline-none focus:border-white dark:focus:border-white transition-colors"
                  placeholder="Enter your name"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-light-gray dark:text-light-gray text-sm font-medium mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-dark-surface dark:bg-dark-surface border border-dark-border dark:border-dark-border rounded-lg text-white dark:text-white focus:outline-none focus:border-white dark:focus:border-white transition-colors"
                  placeholder="Enter your email"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-light-gray dark:text-light-gray text-sm font-medium mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="5"
                  className="w-full px-4 py-3 bg-dark-surface dark:bg-dark-surface border border-dark-border dark:border-dark-border rounded-lg text-white dark:text-white focus:outline-none focus:border-white dark:focus:border-white transition-colors resize-none"
                  placeholder="Tell me about your project..."
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full btn-primary"
              >
                Send Message
              </button>
            </form>
          </div>

          {/* Contact Info */}
          <div
            className={`transition-all duration-1000 delay-300 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <div className="space-y-6">
              <div>
                <h3 className="text-2xl font-bold text-white dark:text-white mb-4">Let's Connect</h3>
                <p className="text-light-gray dark:text-light-gray leading-relaxed">
                  I'm always interested in hearing about new projects and opportunities. 
                  Whether you have a question or just want to say hi, feel free to reach out!
                </p>
              </div>

              <div className="space-y-4">
                {contactInfo.map((info, index) => (
                  <a
                    key={index}
                    href={info.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 p-4 bg-dark-surface dark:bg-dark-surface border border-dark-border dark:border-dark-border rounded-lg hover:border-white dark:hover:border-white transition-all duration-300 group"
                  >
                    <div className="text-2xl text-light-gray dark:text-light-gray group-hover:text-white dark:group-hover:text-white transition-colors">
                      {info.icon}
                    </div>
                    <div>
                      <p className="text-sm text-dark-gray dark:text-dark-gray">{info.label}</p>
                      <p className="text-light-gray dark:text-light-gray group-hover:text-white dark:group-hover:text-white transition-colors">
                        {info.value}
                      </p>
                    </div>
                  </a>
                ))}
              </div>

              <div className="pt-6">
                <div className="p-6 bg-dark-surface dark:bg-dark-surface border border-dark-border dark:border-dark-border rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-green opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-accent-green"></span>
                    </span>
                    <span className="text-light-gray dark:text-light-gray font-medium">Available for Work</span>
                  </div>
                  <p className="text-sm text-dark-gray dark:text-dark-gray">
                    Open to internship and full-time opportunities
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;