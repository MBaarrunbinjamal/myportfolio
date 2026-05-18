import "./Skills.css";
import { motion, useMotionValue, useSpring, animate } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const EASE = [0.22, 1, 0.36, 1];
const VP = { once: true, margin: "-80px" };

const skillsData = [
  {
    category: "Frontend",
    icon: "🎨",
    skills: [
      { name: "React",       percent: 90 },
      { name: "Angular",     percent: 75 },
      { name: "HTML & CSS",  percent: 95 },
      { name: "UI/UX Design",percent: 80 },
    ],
  },
  {
    category: "Backend",
    icon: "⚙️",
    skills: [
      { name: "Node.js",  percent: 85 },
      { name: "Express",  percent: 85 },
      { name: "PHP",      percent: 78 },
      { name: "Laravel",  percent: 75 },
      { name: "ASP.NET",  percent: 65 },
      { name: "C#",       percent: 65 },
    ],
  },
  {
    category: "Database",
    icon: "🗄️",
    skills: [
      { name: "MongoDB", percent: 88 },
      { name: "MySQL",   percent: 80 },
    ],
  },
  {
    category: "CMS & Other",
    icon: "🌐",
    skills: [
      { name: "WordPress", percent: 82 },
      { name: "SEO",       percent: 78 },
    ],
  },
];

/* ── Animated percent counter ── */
function AnimatedNumber({ target, trigger }) {
  const [display, setDisplay] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    if (!trigger || started.current) return;
    started.current = true;
    const mv = { value: 0 };
    const controls = animate(mv.value, target, {
      duration: 1.2,
      ease: [0.34, 1.1, 0.64, 1],
      onUpdate(v) { setDisplay(Math.round(v)); },
    });
    // framer animate returns a stop fn
    return () => controls.stop?.();
  }, [trigger, target]);

  return <span>{display}</span>;
}

/* ── Single skill bar ── */
function SkillBar({ name, percent, index, cardInView }) {
  return (
    <motion.div
      className="skill-item"
      initial={{ opacity: 0, x: -16 }}
      animate={cardInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.45, delay: 0.15 + index * 0.07, ease: EASE }}
    >
      <div className="skill-meta">
        <span className="skill-name">{name}</span>
        <span className="skill-percent">
          <AnimatedNumber target={percent} trigger={cardInView} />%
        </span>
      </div>

      <div className="skill-bar-track">
        {/* Glowing fill */}
        <motion.div
          className="skill-bar-fill"
          initial={{ width: 0 }}
          animate={cardInView ? { width: `${percent}%` } : {}}
          transition={{
            duration: 1.1,
            delay: 0.2 + index * 0.07,
            ease: [0.34, 1.1, 0.64, 1],
          }}
        />
        {/* Shimmer sweep — runs once after fill */}
        {cardInView && (
          <motion.div
            className="skill-bar-shimmer"
            initial={{ x: "-100%", opacity: 0.7 }}
            animate={{ x: `${percent + 20}%`, opacity: 0 }}
            transition={{
              duration: 0.55,
              delay: 0.9 + index * 0.07,
              ease: "easeOut",
            }}
          />
        )}
      </div>
    </motion.div>
  );
}

/* ── Skill card ── */
function SkillCard({ group, index }) {
  const [inView, setInView] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setInView(true); },
      { threshold: 0.25 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <motion.div
      ref={ref}
      className="skill-card"
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={VP}
      transition={{ duration: 0.55, delay: index * 0.1, ease: EASE }}
      whileHover={{ y: -6, transition: { duration: 0.22, ease: EASE } }}
    >
      {/* Top-edge glow line revealed on hover */}
      <div className="skill-card-glow-line" />

      {/* Card header */}
      <div className="skill-card-header">
        <motion.span
          className="skill-icon-wrap"
          initial={{ scale: 0.6, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={VP}
          transition={{ delay: 0.2 + index * 0.1, duration: 0.4, ease: EASE }}
        >
          {group.icon}
        </motion.span>
        <div className="skill-card-heading">
          <span className="skill-category">{group.category}</span>
          <span className="skill-count">{group.skills.length} skills</span>
        </div>
      </div>

      {/* Bars */}
      <div className="skill-list">
        {group.skills.map((skill, si) => (
          <SkillBar
            key={skill.name}
            name={skill.name}
            percent={skill.percent}
            index={si}
            cardInView={inView}
          />
        ))}
      </div>
    </motion.div>
  );
}

/* ── Section ── */
function Skills() {
  return (
    <section id="skills" className="skills-section">
      <div className="skills">

        {/* Header */}
        <motion.div
          className="skills-header"
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VP}
          transition={{ duration: 0.6, ease: EASE }}
        >
          <motion.span
            className="skills-eyebrow"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={VP}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            What I Work With
          </motion.span>
          <h2 className="skills-title">
            My <span className="accent">Skills</span>
          </h2>
          <motion.div
            className="skills-hr"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={VP}
            transition={{ duration: 0.5, delay: 0.15, ease: EASE }}
            style={{ originX: 0.5 }}
          />
          <p className="skills-subtitle">
            Technologies and tools I've worked with across full-stack development, design, and beyond.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="skills-grid">
          {skillsData.map((group, gi) => (
            <SkillCard key={group.category} group={group} index={gi} />
          ))}
        </div>

      </div>
    </section>
  );
}

export default Skills;