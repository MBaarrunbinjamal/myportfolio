import './Contact.css';
import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import emailjs from '@emailjs/browser';

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  }),
};

const fadeLeft = {
  hidden: { opacity: 0, x: -28 },
  show: (i = 0) => ({
    opacity: 1,
    x: 0,
    transition: { delay: 0.1 + i * 0.08, duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  }),
};

const fadeRight = {
  hidden: { opacity: 0, x: 28 },
  show: (i = 0) => ({
    opacity: 1,
    x: 0,
    transition: { delay: 0.15 + i * 0.08, duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  }),
};

function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState(false);

  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { once: true, margin: '-80px' });

  const handle = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = (e) => {
    e.preventDefault();
    setSending(true);
    setError(false);

    const templateParams = {
      name: form.name,
      email: form.email,
      subject: form.subject,
      message: form.message,
    };

    emailjs.send(
      'service_h0cad7s',
      'template_putu4cn',
      templateParams,
      '_djfa7HO2PeGX42Xz'
    )
    .then(() => {
      emailjs.send(
        'service_ct3vbj9',
        'template_85d54dn',
        templateParams,
        '_djfa7HO2PeGX42Xz'
      ).catch((err) => {
        console.log('Auto reply failed:', err);
      });
      setSent(true);
      setSending(false);
      setForm({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setSent(false), 4000);
    })
    .catch((err) => {
      console.log('EmailJS Error:', JSON.stringify(err));
      setError(true);
      setSending(false);
    });
  };

  const infoCards = [
    {
      icon: '✉️',
      label: 'Email',
      el: <a href="mailto:mbaarrun2008@gmail.com" className="ci-value">mbaarrun2008@gmail.com</a>,
    },
    {
      icon: '📞',
      label: 'Phone',
      el: <a href="tel:03188568037" className="ci-value">03188568037</a>,
    },
    {
      icon: '📍',
      label: 'Location',
      el: <span className="ci-value">Karachi, Pakistan</span>,
    },
    {
      icon: '💼',
      label: 'LinkedIn',
      el: (
        <a
          href="https://linkedin.com/in/mbaarrun"
          className="ci-value accent"
          target="_blank"
          rel="noopener noreferrer"
        >
          mbaarrun
        </a>
      ),
    },
  ];

  const formFields = [
    { name: 'name',    label: 'Name',    type: 'input',    placeholder: 'Muhammad Ali' },
    { name: 'email',   label: 'Email',   type: 'input',    inputType: 'email', placeholder: 'ali@gmail.com' },
    { name: 'subject', label: 'Subject', type: 'input',    placeholder: 'Project collaboration' },
    { name: 'message', label: 'Message', type: 'textarea', placeholder: 'Tell me about your project...' },
  ];

  return (
    <section id="contact" className="contact-section" ref={sectionRef}>
      <div className="contact-wrap">

      
        <motion.div
          className="contact-header"
          variants={fadeUp}
          custom={0}
          initial="hidden"
          animate={inView ? 'show' : 'hidden'}
        >
          <span className="contact-eyebrow">Get In Touch</span>
          <h2 className="contact-title">
            Let's <span className="accent">Work Together</span>
          </h2>
          <motion.div
            className="contact-hr"
            initial={{ scaleX: 0, opacity: 0 }}
            animate={inView ? { scaleX: 1, opacity: 1 } : { scaleX: 0, opacity: 0 }}
            transition={{ delay: 0.35, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            style={{ originX: 0 }}
          />
          <p className="contact-subtitle">
            Have a project in mind or just want to say hi? My inbox is open.
          </p>
        </motion.div>

        <div className="contact-body">

          {/* Info Cards */}
          <div className="contact-info">
            {infoCards.map(({ icon, label, el }, i) => (
              <motion.div
                className="contact-info-card"
                key={label}
                variants={fadeLeft}
                custom={i}
                initial="hidden"
                animate={inView ? 'show' : 'hidden'}
                whileHover={{ x: 5, y: -3 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              >
                <div className="ci-icon">{icon}</div>
                <div>
                  <span className="ci-label">{label}</span>
                  {el}
                </div>
              </motion.div>
            ))}

            <motion.div
              className="contact-availability"
              variants={fadeLeft}
              custom={4}
              initial="hidden"
              animate={inView ? 'show' : 'hidden'}
            >
              <span className="avail-dot" />
              Available for freelance and full-time opportunities
            </motion.div>
          </div>

          {/* Form */}
          <form className="contact-form" onSubmit={submit}>
            <div className="form-row">
              {formFields.slice(0, 2).map(({ name, label, inputType, placeholder }, i) => (
                <motion.div
                  className="form-group"
                  key={name}
                  variants={fadeRight}
                  custom={i}
                  initial="hidden"
                  animate={inView ? 'show' : 'hidden'}
                >
                  <label>{label}</label>
                  <input
                    name={name}
                    type={inputType || 'text'}
                    value={form[name]}
                    onChange={handle}
                    placeholder={placeholder}
                    required
                  />
                </motion.div>
              ))}
            </div>

            {formFields.slice(2).map(({ name, label, type, placeholder }, i) => (
              <motion.div
                className="form-group"
                key={name}
                variants={fadeRight}
                custom={i + 2}
                initial="hidden"
                animate={inView ? 'show' : 'hidden'}
              >
                <label>{label}</label>
                {type === 'textarea' ? (
                  <textarea
                    name={name}
                    value={form[name]}
                    onChange={handle}
                    rows={5}
                    placeholder={placeholder}
                    required
                  />
                ) : (
                  <input
                    name={name}
                    value={form[name]}
                    onChange={handle}
                    placeholder={placeholder}
                    required
                  />
                )}
              </motion.div>
            ))}

            <motion.button
              type="submit"
              className="contact-submit"
              disabled={sending}
              variants={fadeUp}
              custom={5}
              initial="hidden"
              animate={inView ? 'show' : 'hidden'}
              whileHover={!sending ? { y: -3, scale: 1.02 } : {}}
              whileTap={!sending ? { scale: 0.97 } : {}}
              transition={{ type: 'spring', stiffness: 400, damping: 15 }}
            >
              {sending ? 'Sending...' : sent ? 'Message Sent ✓' : error ? 'Failed — Try Again' : 'Send Message'}
            </motion.button>
          </form>

        </div>
      </div>
    </section>
  );
}

export default Contact;