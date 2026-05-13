import "./Footer.css";
import { motion } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1];
const VP = { once: true, margin: "-40px" };

const year = new Date().getFullYear();

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Achievements", href: "#achievements" },
  { label: "Contact", href: "#contact" },
];

const socials = [
  {
    label: "GitHub",
    href: "https://github.com/MBaarrunbinjamal/MBaarrunbinjamal.git",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/in/MBaarrun",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect x="2" y="9" width="4" height="12" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
  },
  {
    label: "Email",
    href: "mailto:mbaarrun2008@gmail.com",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
        <polyline points="22,6 12,13 2,6" />
      </svg>
    ),
  },
  {
    label: "WhatsApp",
href: "https://wa.me/923188568037?text=Hi%20Baarrun%2C%20I%20saw%20your%20portfolio!",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
      </svg>
    ),
  },
];

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-wrap">

       
        <div className="footer-top">

       
          <motion.div
            className="footer-brand"
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VP}
            transition={{ duration: 0.7, ease: EASE }}
          >
            <motion.span
              className="footer-logo"
              whileHover={{ scale: 1.06 }}
              style={{ display: "inline-block" }}
            >
              MB<span className="accent">.</span>
            </motion.span>
            <p className="footer-tagline">
              Building clean, fast, and scalable web experiences — from frontend to backend.
            </p>

      
            <motion.div
              className="footer-socials"
              initial="hidden"
              whileInView="show"
              viewport={VP}
              variants={{
                hidden: {},
                show: { transition: { staggerChildren: 0.07, delayChildren: 0.25 } },
              }}
            >
              {socials.map((s) => (
                <motion.a
                  key={s.label}
                  href={s.href}
                  className="social-btn"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  variants={{
                    hidden: { opacity: 0, scale: 0.6, y: 12 },
                    show: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.4, ease: EASE } },
                  }}
                  whileHover={{ scale: 1.18, y: -4 }}
                  whileTap={{ scale: 0.9 }}
                >
                  {s.icon}
                </motion.a>
              ))}
            </motion.div>
          </motion.div>

         
          <motion.div
            className="footer-links"
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VP}
            transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
          >
            <span className="footer-links-title">Navigation</span>
            <ul>
              {navLinks.map((l, i) => (
                <motion.li
                  key={l.label}
                  initial={{ opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={VP}
                  transition={{ delay: 0.2 + i * 0.06, duration: 0.4, ease: EASE }}
                >
                  <motion.a
                    href={l.href}
                    whileHover={{ x: 6, color: "var(--accent, #00f7ff)" }}
                    transition={{ duration: 0.2 }}
                  >
                    {l.label}
                  </motion.a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

      
          <motion.div
            className="footer-contact"
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VP}
            transition={{ duration: 0.7, delay: 0.2, ease: EASE }}
          >
            <span className="footer-links-title">Contact</span>
            <ul>
              {[
                { href: "mailto:mbaarrun2008@gmail.com", label: "mbaarrun2008@gmail.com", isLink: true },
                { href: "tel:03188568037", label: "03188568037", isLink: true },
                { label: "Karachi, Pakistan", isLink: false },
              ].map(({ href, label, isLink }, i) => (
                <motion.li
                  key={label}
                  initial={{ opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={VP}
                  transition={{ delay: 0.3 + i * 0.07, duration: 0.4, ease: EASE }}
                >
                  {isLink
                    ? <motion.a href={href} whileHover={{ x: 6 }} transition={{ duration: 0.2 }}>{label}</motion.a>
                    : <span>{label}</span>
                  }
                </motion.li>
              ))}
              <li>
                <motion.div
                  className="footer-avail"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={VP}
                  transition={{ delay: 0.55 }}
                >
                  <motion.span
                    className="avail-dot"
                    animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
                    transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
                  />
                  Available for work
                </motion.div>
              </li>
            </ul>
          </motion.div>
        </div>

      
        <motion.div
          className="footer-bottom"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={VP}
          transition={{ duration: 0.7, delay: 0.3, ease: EASE }}
        >
          <motion.div
            className="footer-divider"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={VP}
            transition={{ duration: 0.9, ease: EASE }}
            style={{ originX: 0 }}
          />
          <div className="footer-bottom-row">
            <p>© {year} <span className="accent">Muhammad Baarrun</span>. All rights reserved.</p>
            <p>Designed & Built by <span className="accent">MB</span></p>
          </div>
        </motion.div>

      </div>
    </footer>
  );
}

export default Footer;