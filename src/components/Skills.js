import "./Skills.css";
import { motion } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1];
const VP = { once: true, margin: "-60px" };

const skillsData = [
  {
    category: "Frontend",
    icon: "🎨",
    skills: [
      { name: "React", percent: 90 },
      { name: "Angular", percent: 75 },
      { name: "HTML & CSS", percent: 95 },
      { name: "UI/UX Design", percent: 80 },
    ],
  },
  {
    category: "Backend",
    icon: "⚙️",
    skills: [
      { name: "Node.js", percent: 85 },
      { name: "Express", percent: 85 },
      { name: "PHP", percent: 78 },
      { name: "Laravel", percent: 75 },
      { name: "ASP.NET", percent: 65 },
      { name: "C#", percent: 65 },
    ],
  },
  {
    category: "Database",
    icon: "🗄️",
    skills: [
      { name: "MongoDB", percent: 88 },
      { name: "MySQL", percent: 80 },
    ],
  },
  {
    category: "CMS & Other",
    icon: "🌐",
    skills: [
      { name: "WordPress", percent: 82 },
      { name: "SEO", percent: 78 },
    ],
  },
];

function SkillBar({ name, percent, index }) {
  return (
    <motion.div
      className="skill-item"
      initial={{ opacity: 0, x: -24 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={VP}
      transition={{ duration: 0.5, delay: index * 0.07, ease: EASE }}
    >
      <div className="skill-meta">
        <span className="skill-name">{name}</span>
        <motion.span
          className="skill-percent"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={VP}
          transition={{ delay: 0.4 + index * 0.07 }}
        >
          {percent}%
        </motion.span>
      </div>
      <div className="skill-bar-track">
        <motion.div
          className="skill-bar-fill"
          initial={{ width: 0 }}
          whileInView={{ width: `${percent}%` }}
          viewport={VP}
          transition={{ duration: 1.1, delay: 0.2 + index * 0.06, ease: [0.34, 1.1, 0.64, 1] }}
          style={{ height: "100%", borderRadius: 99 }}
        />
      </div>
    </motion.div>
  );
}

function Skills() {
  return (
    <section id="skills" className="skills-section">
      <div className="skills">

  
        <motion.div
          className="skills-header"
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VP}
          transition={{ duration: 0.7, ease: EASE }}
        >
          <motion.span
            className="skills-eyebrow"
            initial={{ opacity: 0, letterSpacing: "0.3em" }}
            whileInView={{ opacity: 1, letterSpacing: "0.12em" }}
            viewport={VP}
            transition={{ duration: 0.8, ease: EASE }}
          >
            What I Work With
          </motion.span>
          <h2 className="skills-title">My <span className="accent">Skills</span></h2>
          <motion.div
            className="skills-hr"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={VP}
            transition={{ duration: 0.65, delay: 0.15, ease: EASE }}
            style={{ originX: 0.5 }}
          />
          <p className="skills-subtitle">
            Technologies and tools I've worked with across full-stack development, design, and beyond.
          </p>
        </motion.div>

    
        <div className="skills-grid">
          {skillsData.map((group, gi) => (
            <motion.div
              className="skill-card"
              key={group.category}
              initial={{ opacity: 0, y: 40, scale: 0.96 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={VP}
              transition={{ duration: 0.6, delay: gi * 0.1, ease: EASE }}
              whileHover={{ y: -6, transition: { duration: 0.25 } }}
            >
            
              <motion.div
                className="skill-card-header"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={VP}
                transition={{ delay: 0.2 + gi * 0.1 }}
              >
                <motion.span
                  className="skill-icon"
                  animate={{ rotate: [0, -8, 8, 0] }}
                  transition={{ delay: 1 + gi * 0.15, duration: 0.6, ease: "easeInOut" }}
                >
                  {group.icon}
                </motion.span>
                <span className="skill-category">{group.category}</span>
              </motion.div>

            
              <div className="skill-list">
                {group.skills.map((skill, si) => (
                  <SkillBar
                    key={skill.name}
                    name={skill.name}
                    percent={skill.percent}
                    index={si}
                  />
                ))}
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}

export default Skills;