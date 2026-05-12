import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './Header.css';

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 30);
      const sections = ['home', 'about', 'skills', 'projects', 'achievements'];
      const current = sections.find(id => {
        const el = document.getElementById(id);
        if (!el) return false;
        const rect = el.getBoundingClientRect();
        return rect.top <= 100 && rect.bottom >= 100;
      });
      if (current) setActiveSection(current);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  const navItems = ['Home', 'About', 'Skills', 'Projects', 'Achievements'];

  return (
    <motion.header
      className={`header-container ${scrolled ? 'scrolled' : ''}`}
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="menu-backdrop"
            onClick={() => setIsOpen(false)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          />
        )}
      </AnimatePresence>

      <div className="header-border-box">
        <div className="header-content">

          <motion.div
            className="logo"
            whileHover={{ scale: 1.06 }}
            transition={{ type: 'spring', stiffness: 400, damping: 15 }}
          >
            <motion.span
              className="logo-bracket"
              whileHover={{ x: -3 }}
              transition={{ type: 'spring', stiffness: 400, damping: 15 }}
            >&lt;</motion.span>
            <span className="logo-text">MBJ</span>
            <motion.span
              className="logo-bracket"
              whileHover={{ x: 3 }}
              transition={{ type: 'spring', stiffness: 400, damping: 15 }}
            >/&gt;</motion.span>
          </motion.div>

          <nav className="nav-desktop">
            <ul>
              {navItems.map((item, i) => (
                <motion.li
                  key={item}
                  initial={{ y: -12, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{
                    delay: 0.3 + i * 0.07,
                    duration: 0.4,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  <motion.a
                    href={`#${item.toLowerCase()}`}
                    className={activeSection === item.toLowerCase() ? 'active' : ''}
                    whileHover={{ y: -2 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                  >
                    {item}
                    <span className="nav-dot" />
                  </motion.a>
                </motion.li>
              ))}
            </ul>
          </nav>

          <div className="header-right">
            <motion.a
              href="#contact"
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.65, duration: 0.4, type: 'spring', stiffness: 300, damping: 18 }}
            >
              <motion.button
                className="btn-contact"
                whileHover={{ y: -2, scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                transition={{ type: 'spring', stiffness: 400, damping: 15 }}
              >
                Contact Me
              </motion.button>
            </motion.a>

            <motion.button
              className={`menu-trigger ${isOpen ? 'active' : ''}`}
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
              whileTap={{ scale: 0.9 }}
            >
              <motion.span
                animate={isOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              />
              <motion.span
                animate={isOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
                transition={{ duration: 0.2 }}
              />
              <motion.span
                animate={isOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              />
            </motion.button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.nav
            className="nav-mobile open"
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <ul>
              {navItems.map((item, i) => (
                <motion.li
                  key={item}
                  initial={{ x: 30, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{
                    delay: 0.1 + i * 0.06,
                    duration: 0.35,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  <motion.a
                    href={`#${item.toLowerCase()}`}
                    className={activeSection === item.toLowerCase() ? 'active' : ''}
                    onClick={() => setIsOpen(false)}
                    whileHover={{ x: 6 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                  >
                    <span className="mobile-nav-number">0{i + 1}</span>
                    {item}
                  </motion.a>
                </motion.li>
              ))}
            </ul>
            <motion.button
              className="btn-contact-mobile"
              onClick={() => setIsOpen(false)}
              initial={{ y: 16, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.42, duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.96 }}
            >
              Contact Me
            </motion.button>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

export default Header;