import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: <FaGithub />, url: 'https://github.com/Hasanga910', label: 'GitHub' },
    { icon: <FaLinkedin />, url: 'https://www.linkedin.com/in/sajana-hasanga-529b29308', label: 'LinkedIn' },
    { icon: <FaEnvelope />, url: 'mailto:hasangashn910@gmail.com', label: 'Email' },
  ];

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
    <footer className="bg-dark-bg dark:bg-dark-bg light:bg-light-bg border-t border-dark-border dark:border-dark-border light:border-light-border">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 mb-6 sm:mb-8">
          {/* Logo / Brand */}
          <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
            <img src="/footer_logo.png" alt="SH Logo" className="w-10 h-10 sm:w-12 sm:h-12 mb-2" />
            <h3 className="text-lg sm:text-xl font-bold text-white dark:text-white light:text-light-text">
              Sajana Hasanga
            </h3>
            <p className="text-dark-gray dark:text-dark-gray light:text-light-text-secondary text-xs sm:text-sm leading-relaxed mt-1">
              Undergraduate IT student specializing in AI, passionate about building intelligent and innovative digital solutions.
            </p>
          </div>

          {/* Quick Links */}
          <div className="text-center sm:text-left">
            <h4 className="text-white dark:text-white light:text-light-text font-semibold mb-3 sm:mb-4 text-sm sm:text-base">Quick Links</h4>
            <ul className="space-y-2">
              {['Home', 'About', 'Skills', 'Projects', 'Contact'].map((item) => (
                <li key={item}>
                  <button
                    onClick={() => scrollToSection(item.toLowerCase())}
                    className="text-dark-gray dark:text-dark-gray light:text-light-text-secondary hover:text-white dark:hover:text-white light:hover:text-light-text transition-colors text-xs sm:text-sm"
                  >
                    {item}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Links */}
          <div className="text-center sm:text-left">
            <h4 className="text-white dark:text-white light:text-light-text font-semibold mb-3 sm:mb-4 text-sm sm:text-base">Connect</h4>
            <div className="flex gap-3 sm:gap-4 justify-center sm:justify-start">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-lg bg-dark-surface dark:bg-dark-surface light:bg-light-surface border border-dark-border dark:border-dark-border light:border-light-border hover:border-white dark:hover:border-white light:hover:border-gray-400 transition-all duration-300"
                  aria-label={social.label}
                >
                  <span className="text-base sm:text-lg text-light-gray dark:text-light-gray light:text-light-text-secondary hover:text-white dark:hover:text-white light:hover:text-light-text transition-colors">
                    {social.icon}
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 sm:pt-8 border-t border-dark-border dark:border-dark-border light:border-light-border">
          <div className="flex items-center justify-center">
            <p className="text-dark-gray dark:text-dark-gray light:text-light-text-secondary text-xs sm:text-sm text-center">
              © {currentYear} Sajana Hasanga. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;