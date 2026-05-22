import "./Projects.css";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1];
const VP = { once: true, margin: "-60px" };

const projects = [
  {
    name: "Blooming Petals",
    desc: "A decorations and flowers business website with elegant product showcasing, gallery, and contact booking.",
    detail:
      "Blooming Petals is a fully responsive business website built for a local decorations and flowers brand. It features a hero section with parallax florals, a curated product gallery, an animated testimonials carousel, and an integrated booking/contact form. Special attention was paid to typography and colour palette to evoke warmth and elegance.",
    stack: ["HTML", "CSS"],
    category: "Frontend",
    status: "live",
    live: "https://samadtariq.github.io/Blooming-Petals/",
    github: null,
    images: ["Bloomingpetals.png", "Bloom2.png", "Bloom3.png", "Bloom4.png"],
  },
  {
    name: "Elegant Salon",
    desc: "A full salon management system handling appointments, staff, inventory, and customer records.",
    detail:
      "Elegant Salon is an end-to-end management platform for a professional salon. It covers appointment scheduling with conflict detection, staff roster management, product/inventory tracking, and a customer loyalty module. The admin dashboard gives real-time insights on daily revenue and occupancy. Built on Laravel with a MySQL relational schema designed for scalability.",
    stack: ["Laravel", "PHP", "MySQL"],
    category: "Backend",
    status: "live",
    live: null,
    github: "https://github.com/MBaarrunbinjamal/Elegant-saloon.git",
    images: ["Elegantsaloon.png", "Elegant2.png", "Elegant3.png", "Elegant4.png"],
  },
  {
    name: "Propello",
    desc: "An AI-powered career counselling platform that guides students toward the right career path.",
    detail:
      "Propello was showcased at Aptech Vision 2025 and TechWiz International. It uses AI to analyse a student's academic profile, interests, and market trends to recommend personalised career roadmaps. Features include an AI chat counsellor, aptitude assessments, industry reports, and a mentor-matching module. Backend built on Laravel; AI layer integrates with OpenAI APIs.",
    stack: ["Laravel", "PHP", "MySQL"],
    category: "AI",
    status: "live",
    live: null,
    github: "https://github.com/MBaarrunbinjamal/Vision.git",
    images: ["Propello.png", "Propello2.png", "Propello3.png", "Propello4.png"],
  },
  {
    name: "Ecosystem",
    desc: "An educational platform providing ecosystem and environmental information for students.",
    detail:
      "Ecosystem is a structured e-learning portal covering environmental science topics for secondary and tertiary students. It includes topic modules, quizzes with instant feedback, a species encyclopedia, and a teacher dashboard for tracking progress. Developed with ASP.NET and C# on the backend, SQL Server for data persistence, and a responsive Razor-view frontend.",
    stack: ["ASP.NET", "C#", "SQL"],
    category: "Backend",
    status: "live",
    live: null,
    github: "https://github.com/MBaarrunbinjamal/Ep2025.git",
    images: [],
  },
  {
    name: "MERN Project I",
    desc: "A full-stack MERN application currently in development. Stay tuned.",
    detail:
      "This upcoming MERN project will be a full-stack web application leveraging MongoDB, Express, React, and Node.js. Further details will be revealed closer to launch. Watch this space!",
    stack: ["MongoDB", "Express", "React", "Node.js"],
    category: "MERN",
    status: "coming",
    live: null,
    github: null,
    images: [],
  },
  {
    name: "MERN Project II",
    desc: "Another full-stack MERN application in the pipeline. Coming soon.",
    detail:
      "The second upcoming MERN application is currently in the planning phase. It will showcase advanced full-stack patterns and real-time features. Stay tuned for updates.",
    stack: ["MongoDB", "Express", "React", "Node.js"],
    category: "MERN",
    status: "coming",
    live: null,
    github: null,
    images: [],
  },
    {
    name: "COSMOS",
    desc: "Interactive 3D deep space explorer with gesture & voice control.",
    detail:
 "COSMOS is an immersive browser-based 3D space experience built with Three.js. Explore real 3D models of Saturn and a Black Hole with a cinematic nebula environment, 3000-star field, and accretion disk VFX. Control the camera using MediaPipe hand gestures (open palm to zoom, fist to zoom out, peace sign to switch scenes), voice commands, or keyboard — all with a live ambient soundtrack.",    stack:["Three.js", "MediaPipe", "WebGL", "Web Speech API", "JavaScript"],
    category: "3D",
    status: "live",
    live: "https://cosmosbaarrun.netlify.app/",
    github: null,
    images: ["cosmo1.PNG", "cosmo2.PNG", "cosmo3.PNG", "cosmo4.PNG"],
  },
];

const filters = ["All", "Frontend", "Backend", "AI", "MERN", "3D"];

// Clean fade+slide up — no scale pop, no jitter
const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  show: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.06, ease: EASE },
  }),
  exit: {
    opacity: 0,
    y: 12,
    transition: { duration: 0.25, ease: [0.4, 0, 1, 1] },
  },
};

const ExternalIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    <polyline points="15 3 21 3 21 9" />
    <line x1="10" y1="14" x2="21" y2="3" />
  </svg>
);

const GithubIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
  </svg>
);

const CloseIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

/* ── Sidebar ─────────────────────────────────────────────────────────── */
function ProjectSidebar({ project, onClose }) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  useEffect(() => {
    const handler = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  const isBloomingPetals = project.name === "Blooming Petals";
  const showLive = isBloomingPetals && project.live;
  const showGithub = !isBloomingPetals && project.status === "live" && project.github;

  const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.06 } } };
  const item = {
    hidden: { opacity: 0, x: 18 },
    show: { opacity: 1, x: 0, transition: { duration: 0.4, ease: EASE } },
  };

  return (
    <>
      <motion.div
        className="sidebar-backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        onClick={onClose}
      />

      <motion.aside
        className="sidebar-panel"
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ type: "spring", stiffness: 280, damping: 30, mass: 0.9 }}
        role="dialog"
        aria-modal="true"
        aria-label={`${project.name} details`}
      >
        <div className="sidebar-glow-line" />

        <motion.button
          className="sidebar-close"
          onClick={onClose}
          whileHover={{ scale: 1.1, rotate: 90 }}
          whileTap={{ scale: 0.92 }}
          transition={{ duration: 0.2 }}
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
          <motion.div variants={item} className="sidebar-head">
            <div className="sidebar-icon">{project.name.charAt(0)}</div>
            <div>
              <h2 className="sidebar-title">{project.name}</h2>
              {project.status === "coming" && (
                <motion.span
                  className="coming-badge"
                  animate={{ opacity: [0.6, 1, 0.6] }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                >
                  Coming Soon
                </motion.span>
              )}
            </div>
          </motion.div>

          <motion.div variants={item} className="sidebar-divider" />
          <motion.p variants={item} className="sidebar-detail">{project.detail}</motion.p>

          <motion.div variants={item}>
            <p className="sidebar-label">Tech Stack</p>
            <div className="sidebar-stack">
              {project.stack.map((s) => (
                <span key={s} className="project-tag">{s}</span>
              ))}
            </div>
          </motion.div>

          {project.images && project.images.length > 0 && (
            <motion.div variants={item}>
              <p className="sidebar-label">Gallery</p>
              <div className="sidebar-gallery">
                {project.images.map((src, idx) => (
                  <motion.div
                    key={idx}
                    className="sidebar-img-wrap"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 + idx * 0.08, duration: 0.4, ease: EASE }}
                  >
                    <img src={src} alt={`${project.name} screenshot ${idx + 1}`} className="sidebar-img" />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {(!project.images || project.images.length === 0) && project.status !== "coming" && (
            <motion.div variants={item}>
              <p className="sidebar-label">Gallery</p>
              <div className="sidebar-gallery-placeholder">
                <span className="sidebar-placeholder-icon">🖼️</span>
                <p>Screenshots coming soon</p>
              </div>
            </motion.div>
          )}

          {(showLive || showGithub) && (
            <motion.div variants={item} className="sidebar-links">
              {showLive && (
                <motion.a
                  href={project.live}
                  className="sidebar-btn sidebar-btn--primary"
                  target="_blank"
                  rel="noreferrer"
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ duration: 0.15 }}
                >
                  Live Demo <ExternalIcon />
                </motion.a>
              )}
              {showGithub && (
                <motion.a
                  href={project.github}
                  className="sidebar-btn sidebar-btn--ghost"
                  target="_blank"
                  rel="noreferrer"
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ duration: 0.15 }}
                >
                  GitHub <GithubIcon />
                </motion.a>
              )}
            </motion.div>
          )}
        </motion.div>
      </motion.aside>
    </>
  );
}

/* ── Card ────────────────────────────────────────────────────────────── */
function ProjectCard({ project, index, onClick }) {
  const [hovered, setHovered] = useState(false);

  const isBloomingPetals = project.name === "Blooming Petals";
  const isCOSMOS = project.name === "COSMOS";
  const showLive = isBloomingPetals && project.live && !isCOSMOS; // Only show live link for Blooming Petals, hide for COSMOS

  const showGithub = !isBloomingPetals && !isCOSMOS && project.status === "live" && project.github;

  return (
    <motion.div
      key={project.name}
      custom={index}
      variants={cardVariants}
      initial="hidden"
      animate="show"
      exit="exit"
      className={`project-card ${project.status === "coming" ? "project-card--coming" : ""}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onClick}
      // Simple translateY only — no scale, no spring bounce
      whileHover={{ y: -6 }}
      transition={{ duration: 0.25, ease: EASE }}
      style={{ position: "relative", overflow: "hidden", cursor: "pointer" }}
    >
      {/* Subtle top-edge shimmer on hover */}
      <motion.div
        style={{
          position: "absolute",
          top: 0, left: 0, right: 0,
          height: "1px",
          background: "linear-gradient(90deg, transparent, rgba(22,156,177,0.6), transparent)",
          pointerEvents: "none",
        }}
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      />

      {/* Hover hint */}
      <motion.div
        className="card-click-hint"
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.2 }}
      >
        View Details →
      </motion.div>

      <div className="project-card-top">
        <div className="project-card-icon">
          {project.name.charAt(0)}
        </div>
        {project.status === "coming" && (
          <motion.span
            className="coming-badge"
            animate={{ opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          >
            Coming Soon
          </motion.span>
        )}
      </div>

      <h3 className="project-name">{project.name}</h3>
      <p className="project-desc">{project.desc}</p>

      <div className="project-stack">
        {project.stack.map((s) => (
          <span key={s} className="project-tag">{s}</span>
        ))}
      </div>

      {(showLive || showGithub) && (
        <div
          className="project-links"
          onClick={(e) => e.stopPropagation()}
        >
          {showLive && (
            <motion.a
              href={project.live}
              className="project-link"
              target="_blank"
              rel="noreferrer"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.96 }}
              transition={{ duration: 0.15 }}
            >
              Live Demo <ExternalIcon />
            </motion.a>
          )}
          {showGithub && (
            <motion.a
              href={project.github}
              className="project-link project-link--ghost"
              target="_blank"
              rel="noreferrer"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.96 }}
              transition={{ duration: 0.15 }}
            >
              GitHub <GithubIcon />
            </motion.a>
          )}
        </div>
      )}
    </motion.div>
  );
}

/* ── Projects ────────────────────────────────────────────────────────── */
function Projects() {
  const [active, setActive] = useState("All");
  const [selected, setSelected] = useState(null);
  const filtered = active === "All" ? projects : projects.filter((p) => p.category === active);

  return (
    <section id="projects" className="projects-section">
      <div className="projects-wrap">

        <motion.div
          className="projects-header"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VP}
          transition={{ duration: 0.6, ease: EASE }}
        >
          <motion.span
            className="projects-eyebrow"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={VP}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            What I've Built
          </motion.span>
          <h2 className="projects-title">My <span className="accent">Projects</span></h2>
          <motion.div
            className="projects-hr"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={VP}
            transition={{ duration: 0.5, delay: 0.15, ease: EASE }}
            style={{ originX: 0.5 }}
          />
          <p className="projects-subtitle">
            A selection of real-world projects spanning frontend, backend, AI, and full-stack development.
          </p>
        </motion.div>

        {/* Filter buttons — no layout prop, no layoutId, just CSS transitions */}
        <motion.div
          className="projects-filters"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VP}
          transition={{ duration: 0.45, delay: 0.2, ease: EASE }}
        >
          {filters.map((f) => (
            <button
              key={f}
              className={`filter-btn ${active === f ? "filter-btn--active" : ""}`}
              onClick={() => setActive(f)}
            >
              {f}
            </button>
          ))}
        </motion.div>

        <AnimatePresence mode="popLayout">
          <motion.div className="projects-grid" key={active}>
            {filtered.map((project, i) => (
              <ProjectCard
                key={project.name}
                project={project}
                index={i}
                onClick={() => setSelected(project)}
              />
            ))}
          </motion.div>
        </AnimatePresence>

      </div>

      <AnimatePresence>
        {selected && (
          <ProjectSidebar project={selected} onClose={() => setSelected(null)} />
        )}
      </AnimatePresence>
    </section>
  );
}

export default Projects;