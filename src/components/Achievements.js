import "./Achievements.css";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1];
const VP = { once: true, margin: "-60px" };

const achievements = [
  {
    icon: "🏆",
    title: "1st Place — AI Web Dev & Content Generation",
    detail:
      "Placed first in a competitive AI-focused web development and content generation competition. The challenge required building a production-ready AI-integrated web application under time constraints, judged on innovation, UI quality, and real-world applicability. Taking first place was a defining moment in my development career.",
    year: "2025",
    type: "award",
    images: [], 
  },
  {
    icon: "🎤",
    title: "Aptech Vision 2025",
    detail:
      "Represented my institute at Aptech Vision 2025 — a national showcase of student innovation — by presenting Propello, an AI-powered career counselling platform. The event brought together top students across all Aptech centres in Pakistan. Presenting to industry professionals and peers was an invaluable experience in pitching, public speaking, and product demonstration.",
    year: "2025",
    type: "event",
    images: [],
  },
  {
    icon: "🌍",
    title: "TechWiz — International Competition",
    detail:
      "Competed at TechWiz, an international technology competition that brings students from multiple countries onto a single stage. Represented my institute nationally, putting Pakistan's talent on a global platform. The experience sharpened my ability to perform under pressure and compete with developers and designers from around the world.",
    year: "2025",
    type: "event",
    images: ["mytech.jpg"],
  },
  {
    icon: "🎓",
    title: "Aptech Diploma — 4 Semesters",
    detail:
      "Completed a rigorous four-semester professional diploma in software development at Aptech. The curriculum covered full-stack web development, database management, software engineering principles, object-oriented programming, and project management. This foundational training underpins every project I build.",
    year: "2024",
    type: "education",
    images: [],
  }
];

const typeColors = {
  award: "ach-award",
  event: "ach-event",
  leadership: "ach-leadership",
  education: "ach-education",
};

const typeLabels = {
  award: "Award",
  event: "Event",
  leadership: "Leadership",
  education: "Education",
};

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.94 },
  show: (i) => ({
    opacity: 1, y: 0, scale: 1,
    transition: { duration: 0.6, delay: i * 0.09, ease: EASE },
  }),
};


const CloseIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <line x1="18" y1="6" x2="6" y2="18"/>
    <line x1="6" y1="6" x2="18" y2="18"/>
  </svg>
);


function AchievementSidebar({ item, onClose }) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  useEffect(() => {
    const handler = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.07 } } };
  const child = {
    hidden: { opacity: 0, x: 24 },
    show: { opacity: 1, x: 0, transition: { duration: 0.45, ease: EASE } },
  };

  return (
    <>
      <motion.div
        className="sidebar-backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        onClick={onClose}
      />

      <motion.aside
        className="sidebar-panel"
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ type: "spring", stiffness: 300, damping: 32 }}
        role="dialog"
        aria-modal="true"
        aria-label={`${item.title} details`}
      >
        <div className="sidebar-glow-line" />

        <motion.button
          className="sidebar-close"
          onClick={onClose}
          whileHover={{ scale: 1.12, rotate: 90 }}
          whileTap={{ scale: 0.9 }}
          transition={{ duration: 0.25 }}
          aria-label="Close"
        >
          <CloseIcon />
        </motion.button>

        <motion.div
          className="sidebar-inner"
          variants={stagger}
          initial="hidden"
          animate="show"
        >
          {}
          <motion.div variants={child} className="sidebar-head">
            <motion.span
              className="sidebar-ach-emoji"
              animate={{ rotate: [0, -10, 10, 0] }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              {item.icon}
            </motion.span>
            <div>
              <div className="sidebar-ach-meta">
                <span className={`ach-type ${typeColors[item.type]}`}>{typeLabels[item.type]}</span>
                <span className="ach-year">{item.year}</span>
              </div>
            </div>
          </motion.div>

          <motion.h2 variants={child} className="sidebar-title sidebar-title--ach">
            {item.title}
          </motion.h2>

          <motion.div variants={child} className="sidebar-divider" />

          <motion.p variants={child} className="sidebar-detail">{item.detail}</motion.p>

          {}
          {item.images && item.images.length > 0 && (
            <motion.div variants={child}>
              <p className="sidebar-label">Gallery</p>
              <div className="sidebar-gallery">
                {item.images.map((src, idx) => (
                  <motion.div
                    key={idx}
                    className="sidebar-img-wrap"
                    initial={{ opacity: 0, scale: 0.92 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.25 + idx * 0.1, duration: 0.45, ease: EASE }}
                    whileHover={{ scale: 1.03 }}
                  >
                    <img src={src} alt={`${item.title} photo ${idx + 1}`} className="sidebar-img" />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {}
          {(!item.images || item.images.length === 0) && (
            <motion.div variants={child}>
              <p className="sidebar-label">Gallery</p>
              <div className="sidebar-gallery-placeholder">
                <span className="sidebar-placeholder-icon">🖼️</span>
                <p>Photos coming soon</p>
              </div>
            </motion.div>
          )}
        </motion.div>
      </motion.aside>
    </>
  );
}


function Achievements() {
  const [selected, setSelected] = useState(null);

  return (
    <section id="achievements" className="ach-section">
      <div className="ach-wrap">

        {}
        <motion.div
          className="ach-header"
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VP}
          transition={{ duration: 0.7, ease: EASE }}
        >
          <motion.span
            className="ach-eyebrow"
            initial={{ opacity: 0, letterSpacing: "0.3em" }}
            whileInView={{ opacity: 1, letterSpacing: "0.12em" }}
            viewport={VP}
            transition={{ duration: 0.8 }}
          >
            Recognition & Milestones
          </motion.span>
          <h2 className="ach-title">My <span className="accent">Achievements</span></h2>
          <motion.div
            className="ach-hr"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={VP}
            transition={{ duration: 0.65, delay: 0.15, ease: EASE }}
            style={{ originX: 0.5 }}
          />
          <p className="ach-subtitle">
            Competitions, events, leadership, and education that have shaped who I am as a developer.
          </p>
        </motion.div>

        {}
        <div className="ach-grid">
          {achievements.map((item, i) => (
            <motion.div
              className="ach-card"
              key={i}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              whileInView="show"
              viewport={VP}
              whileHover={{ y: -8, scale: 1.025 }}
              onClick={() => setSelected(item)}
              transition={{ type: "spring", stiffness: 240, damping: 22 }}
              style={{ position: "relative", overflow: "hidden", cursor: "pointer" }}
            >
              {}
              <motion.div
                style={{
                  position: "absolute", top: 0, left: 0, right: 0,
                  height: 2,
                  background: "linear-gradient(90deg, transparent, rgba(0,247,255,0.6), transparent)",
                  opacity: 0,
                }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              />

              {}
              <motion.div
                className="card-click-hint"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.2 }}
              >
                View Details →
              </motion.div>

              <div className="ach-card-top">
                <motion.span
                  className="ach-emoji"
                  animate={{ rotate: [0, -8, 8, 0] }}
                  transition={{ delay: 1 + i * 0.15, duration: 0.5 }}
                  whileHover={{ scale: 1.3, rotate: 12 }}
                >
                  {item.icon}
                </motion.span>
                <div className="ach-meta">
                  <motion.span
                    className={`ach-type ${typeColors[item.type]}`}
                    whileHover={{ scale: 1.05 }}
                  >
                    {typeLabels[item.type]}
                  </motion.span>
                  <span className="ach-year">{item.year}</span>
                </div>
              </div>

              <h3 className="ach-name">{item.title}</h3>
              <p className="ach-detail">{item.detail.slice(0, 100)}…</p>
            </motion.div>
          ))}
        </div>

      </div>

      {}
      <AnimatePresence>
        {selected && (
          <AchievementSidebar item={selected} onClose={() => setSelected(null)} />
        )}
      </AnimatePresence>
    </section>
  );
}

export default Achievements;