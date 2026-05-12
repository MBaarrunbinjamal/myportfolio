import React, { useEffect, useRef } from "react";
import "./Hero.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInstagram, faLinkedin, faGithub, faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import {
  faBriefcase, faCode, faCalendarAlt,
} from "@fortawesome/free-solid-svg-icons";
import {
  motion, useMotionValue, useSpring, useTransform,
} from "framer-motion";

const PARTICLES_CONFIG = {
  particles: {
    number: { value: 80, density: { enable: true, value_area: 800 } },
    color: { value: ["#00f7ff", "#095e61", "#0a3cff", "#006064"] },
    shape: { type: "circle", stroke: { width: 0, color: "#000000" } },
    opacity: { value: 0.55, random: true, anim: { enable: true, speed: 0.8, opacity_min: 0.1, sync: false } },
    size: { value: 3, random: true, anim: { enable: false, speed: 40, size_min: 0.1, sync: false } },
    line_linked: { enable: true, distance: 150, color: "#095e61", opacity: 0.5, width: 1 },
    move: { enable: true, speed: 2, direction: "none", random: true, straight: false, out_mode: "bounce", attract: { enable: false, rotateX: 600, rotateY: 1200 } },
  },
  interactivity: {
    detect_on: "canvas",
    events: { onhover: { enable: true, mode: "grab" }, onclick: { enable: true, mode: "push" }, resize: true },
    modes: {
      grab: { distance: 160, line_linked: { opacity: 0.8 } },
      bubble: { distance: 400, size: 40, duration: 2, opacity: 8, speed: 3 },
      repulse: { distance: 200 },
      push: { particles_nb: 4 },
      remove: { particles_nb: 2 },
    },
  },
  retina_detect: true,
};

const EASE = [0.22, 1, 0.36, 1];

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.3 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

const fadeLeft = {
  hidden: { opacity: 0, x: -40 },
  show: { opacity: 1, x: 0, transition: { duration: 0.8, ease: EASE } },
};

const fadeRight = {
  hidden: { opacity: 0, x: 60, scale: 0.92 },
  show: { opacity: 1, x: 0, scale: 1, transition: { duration: 0.9, ease: EASE } },
};

const socialIcons = [
  { icon: faInstagram, href: "https://instagram.com/mbaarrun.dev", label: "Instagram" },
  { icon: faLinkedin, href: "https://linkedin.com/in/mbaarrun", label: "LinkedIn" },
  { icon: faGithub, href: "https://github.com/MBaarrunbinjamal/MBaarrunbinjamal.git", label: "GitHub" },
  { icon: faTwitter, href: "#", label: "Twitter" },
];

const stats = [
  { icon: faBriefcase, num: 6, label: "Projects" },
  { icon: faCode, num: 13, label: "Skills" },
  { icon: faCalendarAlt, num: 2, label: "Experience" },
];

function Counter({ target }) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, v => Math.round(v));
  const spring = useSpring(count, { stiffness: 60, damping: 18 });
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true;
        count.set(target);
      }
    }, { threshold: 0.5 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [count, target]);

  return <motion.span ref={ref} style={{ display: 'inline-block' }}>{rounded}</motion.span>;
}

function SocialBtn({ icon, href, label }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 18 });
  const sy = useSpring(y, { stiffness: 200, damping: 18 });
  const ref = useRef(null);

  const handleMove = (e) => {
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - r.left - r.width / 2) * 0.4);
    y.set((e.clientY - r.top - r.height / 2) * 0.4);
  };
  const handleLeave = () => { x.set(0); y.set(0); };

  return (
    <motion.a
      ref={ref}
      href={href}
      aria-label={label}
      style={{ x: sx, y: sy, display: "inline-flex" }}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      variants={fadeUp}
      whileHover={{ scale: 1.18 }}
      whileTap={{ scale: 0.88 }}
    >
      <div className="circle">
        <FontAwesomeIcon icon={icon} className="social-icon" />
      </div>
    </motion.a>
  );
}

const Hero = ({ children }) => {
  const scriptLoaded = useRef(false);

  useEffect(() => {
    const initParticles = () => {
      if (window.particlesJS) window.particlesJS("particles-js", PARTICLES_CONFIG);
    };
    if (window.particlesJS) { initParticles(); return; }
    if (scriptLoaded.current) return;
    scriptLoaded.current = true;
    const script = document.createElement("script");
    script.src = "https://cdn.jsdelivr.net/npm/particles.js@2.0.0/particles.min.js";
    script.async = true;
    script.onload = initParticles;
    document.head.appendChild(script);
    return () => {
      if (window.pJSDom?.length > 0) {
        try { window.pJSDom[0].pJS.fn.vendors.destroypJS(); window.pJSDom = []; } catch (e) {}
      }
    };
  }, []);

  return (
    <section id="home" className="hero-section">
      <div id="particles-js" className="particles-canvas" />
      <div className="hero-overlay" />
      {children}

      <div className="hero-container">
        <div className="hero-grid">
          <motion.div
            className="hero-left"
            variants={containerVariants}
            initial="hidden"
            animate="show"
          >
            <motion.p className="hero-greeting" variants={fadeLeft}>
              <b>Hi I am</b>
            </motion.p>

            <motion.hr
              className="hero-hr"
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.35, ease: EASE }}
              style={{ originX: 0 }}
            />

            <motion.h4 className="hero-name" variants={fadeUp}>
              {"Muhammad Baarrun bin Jamal".split("").map((ch, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.45 + i * 0.018, duration: 0.4, ease: EASE }}
                  style={{ display: "inline-block", whiteSpace: "pre" }}
                >
                  {ch}
                </motion.span>
              ))}
            </motion.h4>

            <motion.h1 className="hero-title" variants={fadeUp}>
              Full Stack Web Developer
              <motion.span
                style={{ display: "block", height: 2, background: "linear-gradient(90deg,#00f7ff,#0a3cff)", originX: 0, borderRadius: 2 }}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 1.1, duration: 0.8, ease: EASE }}
              />
            </motion.h1>

            <motion.div className="social-row" variants={containerVariants}>
              {socialIcons.map((s) => (
                <SocialBtn key={s.label} {...s} />
              ))}
            </motion.div>

            <motion.div className="btn-row" variants={fadeUp}>
              {["Hire me", "Download CV"].map((label, i) => (
                <motion.button
                  key={label}
                  className="butn"
                  whileHover={{ scale: 1.06, y: -3 }}
                  whileTap={{ scale: 0.94 }}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9 + i * 0.12, duration: 0.55, ease: EASE }}
                  style={{ position: "relative", overflow: "hidden" }}
                >
                  <motion.span
                    style={{ position: "absolute", inset: 0, background: "rgba(0,247,255,0.12)", originX: 0 }}
                    initial={{ scaleX: 0 }}
                    whileHover={{ scaleX: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                  <b style={{ position: "relative" }}>{label}</b>
                </motion.button>
              ))}
            </motion.div>

            <motion.div
              className="stats-row"
              variants={containerVariants}
              initial="hidden"
              animate="show"
            >
              {stats.map(({ icon, num, label }, i) => (
                <motion.div
                  className="ma"
                  key={label}
                  variants={fadeUp}
                  transition={{ delay: 1.1 + i * 0.1 }}
                  whileHover={{ y: -6, scale: 1.06 }}
                >
                  <motion.div
                    animate={{ rotate: [0, -8, 8, 0] }}
                    transition={{ delay: 1.6 + i * 0.2, duration: 0.5 }}
                  >
                    <FontAwesomeIcon icon={icon} className="icon" />
                  </motion.div>
                  <h2><Counter target={num} /></h2>
                  <p>{label}</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          <motion.div
            className="hero-right"
            variants={fadeRight}
            initial="hidden"
            animate="show"
          >
            <motion.div
              className="bigcircle"
              animate={{ rotate: 360 }}
              transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
            />
            <motion.div
              style={{
                position: "absolute", inset: 0, borderRadius: "50%",
                background: "radial-gradient(circle at 60% 40%, rgba(0,247,255,0.07) 0%, transparent 70%)",
                zIndex: 5
              }}
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            />
            <img src="hero-image.png" alt="Hero" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;