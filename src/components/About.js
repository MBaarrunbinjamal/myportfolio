import "./About.css";
import { motion } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1];
const VP = { once: true, margin: "-80px" };

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 36 },
  whileInView: { opacity: 1, y: 0 },
  viewport: VP,
  transition: { duration: 0.7, ease: EASE, delay },
});

const fadeLeft = (delay = 0) => ({
  initial: { opacity: 0, x: -48 },
  whileInView: { opacity: 1, x: 0 },
  viewport: VP,
  transition: { duration: 0.75, ease: EASE, delay },
});

const fadeRight = (delay = 0) => ({
  initial: { opacity: 0, x: 48 },
  whileInView: { opacity: 1, x: 0 },
  viewport: VP,
  transition: { duration: 0.75, ease: EASE, delay },
});

const primaryBadges = ["React", "Node.js", "MongoDB", "Express"];

const badges = [
  "React","Node.js","MongoDB","Express","Laravel","PHP",
  "Angular","ASP.NET","C#","MySQL","WordPress","UI/UX","SEO",
];

const stats = [
  { num: "2+", label: "Years Coding" },
  { num: "13", label: "Technologies" },
  { num: "4×", label: "Teams Led" },
  { num: "1st", label: "Competition" },
];

const infoLeft = [
  { label: "Name", value: "Muhammad Baarrun" },
  { label: "DOB", value: "July 28, 2008" },
  { label: "Location", value: "Karachi, Pakistan" },
];

const infoRight = [
  { label: "Email", value: "mbaarrun2008@gmail.com", accent: true },
  { label: "Phone", value: "03188568037" },
  { label: "LinkedIn", value: "mbaarrun", accent: true },
];

function About() {
  return (
    <section id="about" className="about-section">
      <div className="abouts">
        <div className="about-row">

      
          <div className="about-left">
            <motion.span className="about-eyebrow" {...fadeLeft(0)}>About Me</motion.span>

            <motion.h2 className="about-title" {...fadeLeft(0.08)}>
              Full-Stack <span className="accent">Developer</span>
            </motion.h2>

            <motion.div
              className="about-hr"
              initial={{ scaleX: 0, opacity: 0 }}
              whileInView={{ scaleX: 1, opacity: 1 }}
              viewport={VP}
              transition={{ duration: 0.65, delay: 0.15, ease: EASE }}
              style={{ originX: 0 }}
            />

            <motion.p className="about-description" {...fadeUp(0.18)}>
              I'm a <strong>MERN-first full-stack developer</strong> studying at
              UIT University, backed by a four-semester Aptech diploma. My stack
              spans <strong>React, Node.js, MongoDB, Express</strong> and extends into{" "}
              <strong>PHP, Laravel, WordPress, ASP.NET, Angular, C#</strong>,
              plus SQL, SEO, and UI/UX design. I build products that work
              cleanly under the hood and look sharp on the surface.
            </motion.p>

            <motion.p className="about-description" style={{ marginTop: "12px" }} {...fadeUp(0.26)}>
              I've <strong>placed 1st</strong> in AI web dev &amp; content
              generation competitions, represented my institute at{" "}
              <strong>Aptech Vision 2025</strong> with a career counselling AI,
              and competed internationally at <strong>TechWiz</strong>. I've
              also led <strong>4 project teams</strong> from kickoff to delivery.
            </motion.p>

        
            <motion.div className="about-info-grid" {...fadeUp(0.32)}>
              <div className="ma">
                {infoLeft.map(({ label, value }) => (
                  <div className="info-row" key={label}>
                    <span className="info-label">{label}</span>
                    <span className="info-value">{value}</span>
                  </div>
                ))}
              </div>
              <div className="ma">
                {infoRight.map(({ label, value, accent }) => (
                  <div className="info-row" key={label}>
                    <span className="info-label">{label}</span>
                    <span className={`info-value${accent ? " accent" : ""}`}>{value}</span>
                  </div>
                ))}
              </div>
            </motion.div>

         
            <motion.div className="about-buttons" {...fadeUp(0.4)}>
              {[ "Download CV"].map((label, i) => (
                <motion.button
                  key={label}
                  className={i === 0 ? "btn-read-more" : "btn-download"}
                  whileHover={{ scale: 1.05, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                  style={{ position: "relative", overflow: "hidden" }}
                >
                  <motion.span
                    style={{ position: "absolute", inset: 0, background: "rgba(0,247,255,0.07)", originX: 0 }}
                    initial={{ scaleX: 0 }}
                    whileHover={{ scaleX: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                  <span style={{ position: "relative" }}>{label}</span>
                </motion.button>
              ))}
            </motion.div>
          </div>

       
          <motion.div className="about-right" {...fadeRight(0.1)}>

         
            <motion.div
              className="imgsection"
              whileHover={{ scale: 1.03 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
            >
              <motion.div
                className="img-placeholder"
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={VP}
                transition={{ duration: 0.7, delay: 0.2, ease: EASE }}
              >
                <span className="img-initials"><img src="about-image.jpg" alt="Profile" /></span>
              </motion.div>
              <motion.div
                className="img-glow"
                animate={{ opacity: [0.4, 0.9, 0.4], scale: [1, 1.08, 1] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
              />
            </motion.div>

       
            <div className="stats-grid">
              {stats.map(({ num, label }, i) => (
                <motion.div
                  className="stat-card"
                  key={label}
                  initial={{ opacity: 0, scale: 0.8, y: 20 }}
                  whileInView={{ opacity: 1, scale: 1, y: 0 }}
                  viewport={VP}
                  transition={{ duration: 0.5, delay: 0.3 + i * 0.08, ease: EASE }}
                  whileHover={{ y: -6, scale: 1.07 }}
                >
                  <span className="stat-num">{num}</span>
                  <span className="stat-label">{label}</span>
                </motion.div>
              ))}
            </div>

              
            <motion.div
              className="badge-list"
              initial="hidden"
              whileInView="show"
              viewport={VP}
              variants={{ hidden: {}, show: { transition: { staggerChildren: 0.04, delayChildren: 0.4 } } }}
            >
              {badges.map((s) => (
                <motion.span
                  key={s}
                  className={`badge ${primaryBadges.includes(s) ? "badge-primary" : ""}`}
                  variants={{
                    hidden: { opacity: 0, scale: 0.7, y: 10 },
                    show: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.35, ease: EASE } },
                  }}
                  whileHover={{ scale: 1.12, y: -3 }}
                >
                  {s}
                </motion.span>
              ))}
            </motion.div>

          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default About;