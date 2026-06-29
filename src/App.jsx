import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import hp1 from "./images/hp1.jpeg";
import hp2 from "./images/hp2.jpeg";
import hp3 from "./images/hp3.jpeg";
import hp4 from "./images/hp4.jpg";

/* ===================================================================
   IBRAHIM ISPHAHANI — Mechanical Engineering Portfolio
   Single-file React app. All styling lives in the <style> tag below.
   =================================================================== */

const PAGES = [
  { id: "home", route: "home", no: "01", label: "HOME", match: ["home"] },
  { id: "projects", route: "projects", no: "02", label: "PROJECTS", match: ["projects", "etc", "arm", "trash"] },
  { id: "experience", route: "experience", no: "03", label: "EXPERIENCE", match: ["experience"] },
  { id: "about", route: "contact", no: "04", label: "ABOUT", match: ["contact"] },
];

const POLAROIDS = [
  { id: "hp1", src: hp1, rotate: -5, left: "0%", top: "4%", width: "36%", zIndex: 2 },
  { id: "hp2", src: hp2, rotate: 4, left: "54%", top: "0%", width: "38%", zIndex: 3 },
  { id: "hp3", src: hp3, rotate: -2, left: "56%", top: "34%", width: "34%", zIndex: 4 },
  { id: "hp4", src: hp4, rotate: 5, left: "14%", top: "16%", width: "50%", zIndex: 6, featured: true },
];

const PROFILE = [
  "Mechanical Design",
  "Electronics Integration",
  "SolidWorks / CAD",
  "Embedded Programming",
  "GD&T Certified",
  "ANSYS FEA",
  "Root Cause Analysis",
  "MATLAB / Python",
];

const STATUS = [
  "FORMULA SAE EXPERIENCE",
  "PROJECT LEADERSHIP",
  "CAD & MANUFACTURING",
  "CONTINUOUS LEARNING",
];

const ORDER = ["etc", "arm", "trash"];

const PROJECTS = {
  etc: {
    id: "etc",
    projNo: "01",
    title: "Electronic Throttle Control",
    sub: "SAE Formula E",
    meta: ["SAE Formula E"],
    roles: "Project Manager • CAD Designer • Electronics Lead",
    desc: "A safety-critical throttle-by-wire system for an electric Formula SAE powertrain — replacing the mechanical pedal linkage with redundant sensing and software torque control.",
    what: "Replace the mechanical throttle linkage with a fully electronic throttle-by-wire system. The driver pedal commands a torque request that the controller validates, filters, and transmits to the motor controller over CAN, with continuous fault monitoring required for competition safety.",
    how: "Two independent accelerator-position sensors feed a microcontroller running a plausibility check between channels. Firmware written in C handles signal conditioning, fault detection, and a state machine that cuts torque on any disagreement. The board integrates with the vehicle CAN bus and was validated on the bench and in-vehicle.",
    results: "Delivered a responsive, fault-tolerant throttle that passed Formula SAE electrical technical inspection. Redundant sensing and the shutdown state machine satisfied the rules for safety-critical signals.",
    learned: "Designing for safety and redundancy changes everything — every signal needs a defined failure mode. I also learned to coordinate mechanical, electrical, and firmware work across a team toward a single validated deadline.",
  },
  arm: {
    id: "arm",
    projNo: "02",
    title: "Robotic Arm",
    sub: "ESP32 • C++ • 3D Printing",
    meta: ["ESP32", "C++", "3D Printing"],
    roles: null,
    desc: "A desktop multi-axis robotic arm — a 3D-printed structure driven by an ESP32, built to explore embedded motion control and inverse kinematics.",
    what: "A multi-degree-of-freedom articulated arm that moves its end effector to commanded positions in space, with a fully 3D-printed mechanical structure and on-board motion control.",
    how: "An ESP32 drives the joint actuators via PWM, running inverse-kinematics math in C++ to convert target coordinates into joint angles. The links and joints were designed for additive manufacturing with attention to tolerances, clearance, and fit.",
    results: "Smooth, repeatable multi-axis motion to commanded positions, in a compact build assembled entirely from printed parts.",
    learned: "Kinematics is where math meets mechanics — small tolerance and calibration errors compound across joints. Designing parts specifically for 3D printing made assembly far cleaner.",
  },
  trash: {
    id: "trash",
    projNo: "03",
    title: "Trash Robot",
    sub: "Raspberry Pi • AI Object Detection • Motor Control",
    meta: ["Raspberry Pi", "AI Object Detection", "Motor Control"],
    roles: null,
    desc: "An autonomous trash-collecting robot that uses on-board AI vision to find, approach, and retrieve litter.",
    what: "A mobile robot that detects target objects with a camera, drives toward them, and collects them — a complete perception-to-action loop running on-board.",
    how: "A Raspberry Pi runs an object-detection model on a live camera feed, locating targets in frame. Control logic converts detections into drive commands sent to the motor driver, closing the loop between vision and motion in real time.",
    results: "The robot reliably identifies target objects, navigates toward them, and collects them autonomously within its operating environment.",
    learned: "Edge AI lives under tight real-time and compute limits — model choice and frame rate matter as much as raw accuracy. Integrating perception, control, and hardware showed me how fragile the seams between subsystems can be.",
  },
};

const EXPERIENCE_JOBS = [
  {
    id: "fsae",
    position: "Project Manager · Electronics Lead",
    company: "Formula SAE — Electronic Throttle Control",
    dates: "2023 — Present",
    description:
      "Led a safety-critical throttle-by-wire subsystem from concept through competition validation — coordinating mechanical, electrical, and firmware work across the team.",
    achievements: [
      "Dual-channel accelerator sensing with plausibility checks and fault shutdown logic",
      "CAN integration with the vehicle powertrain controller",
      "Passed Formula SAE electrical technical inspection",
    ],
  },
  {
    id: "robotics",
    position: "Mechanical Design & Embedded Systems",
    company: "Independent Robotics Projects",
    dates: "2022 — Present",
    description:
      "Designed and built mechatronic systems spanning 3D-printed mechanisms, motor control, and on-board perception pipelines.",
    achievements: [
      "Multi-axis robotic arm with inverse kinematics on ESP32",
      "Autonomous litter-collection robot with AI vision on Raspberry Pi",
      "Rapid prototyping across CAD, additive manufacturing, and bench validation",
    ],
  },
];

const EDUCATION = [
  {
    id: "bsme",
    degree: "Bachelor of Science, Mechanical Engineering",
    university: "Mechanical Engineering Program",
    graduation: "Expected 2026",
    details: "Focus on robotics, product development, embedded systems, and design for manufacturing.",
  },
];

const CERTIFICATIONS = [
  { id: "gdt", name: "GD&T Certification", issuer: "ASME Y14.5", year: "2024" },
  { id: "fea", name: "ANSYS FEA Fundamentals", issuer: "Simulation Training", year: "2023" },
];

const SKILL_CATEGORIES = [
  {
    id: "mech",
    label: "Mechanical Design",
    items: ["Tolerance Analysis", "GD&T", "Design for Manufacturing", "Root Cause Analysis", "Mechanism Design"],
  },
  {
    id: "cad",
    label: "CAD",
    items: ["SolidWorks", "AutoCAD", "Technical Drawings", "Assembly Modeling", "Parametric Design"],
  },
  {
    id: "sim",
    label: "Simulation",
    items: ["ANSYS FEA", "Stress Analysis", "Thermal Analysis", "MATLAB", "Validation Testing"],
  },
  {
    id: "prog",
    label: "Programming",
    items: ["Python", "C / C++", "Embedded C", "MATLAB Scripting", "Firmware Development"],
  },
  {
    id: "mfg",
    label: "Manufacturing",
    items: ["3D Printing", "Rapid Prototyping", "Design for Assembly", "Bench Validation", "CNC Basics"],
  },
  {
    id: "elec",
    label: "Electronics",
    items: ["PCB Integration", "CAN Bus", "ESP32", "Sensor Integration", "Embedded Systems"],
  },
];

const SOFTWARE_TOOLS = [
  "SolidWorks",
  "AutoCAD",
  "ANSYS",
  "MATLAB",
  "Python",
  "Excel",
  "C / C++",
  "Raspberry Pi",
];

/* ----------------------------- HELPERS ----------------------------- */
function Reveal({ children, className, delay = 0, reduce, as = "div" }) {
  const Tag = motion[as] || motion.div;
  return (
    <Tag
      className={className}
      initial={reduce ? false : { opacity: 0, y: 22 }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.55, ease: [0.22, 0.61, 0.36, 1], delay }}
    >
      {children}
    </Tag>
  );
}

function Placeholder({ label, sub, variant = "wide" }) {
  return (
    <div className={`ie-ph ie-ph-${variant}`} aria-hidden="true">
      <span className="ie-ph-sheen" />
      <span className="ie-ph-mark ie-m-tl" />
      <span className="ie-ph-mark ie-m-tr" />
      <span className="ie-ph-mark ie-m-bl" />
      <span className="ie-ph-mark ie-m-br" />
      <span className="ie-ph-body">
        <span className="ie-ph-tag">{label}</span>
        <span className="ie-ph-sub">{sub}</span>
      </span>
    </div>
  );
}

function SectionHead({ no, name, meta }) {
  return (
    <div className="ie-head">
      <span className="ie-head-no">{no}</span>
      <span className="ie-head-name">{name}</span>
      <span className="ie-head-rule" />
      {meta && <span className="ie-head-meta">{meta}</span>}
    </div>
  );
}

/* ----------------------------- REMOTE ----------------------------- */
function navIsActive(page, item) {
  return item.match.includes(page);
}

function Remote({ page, setPage, reduce }) {
  const panel = (
    <aside className="ie-rcm" aria-label="Navigation controller">
      <div className="ie-rcm-screws" aria-hidden="true">
        <span className="ie-rcm-screw" />
        <span className="ie-rcm-screw" />
      </div>

      <div className="ie-rcm-display-row">
        <div className="ie-rcm-display" aria-hidden="true">
          <span className="ie-rcm-display-line">IBRAHIM SYSTEMS</span>
          <span className="ie-rcm-display-line">ONLINE</span>
        </div>
        <motion.span
          className="ie-rcm-led"
          animate={reduce ? undefined : { opacity: [1, 0.45, 1] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
          aria-hidden="true"
        />
      </div>

      <nav className="ie-keys" aria-label="Pages">
        {PAGES.map((p) => {
          const on = navIsActive(page, p);
          return (
            <button
              key={p.id}
              className={`ie-key ${on ? "is-active" : ""}`}
              onClick={() => setPage(p.route)}
              aria-current={on ? "page" : undefined}
            >
              <span className="ie-key-dial" aria-hidden="true">
                {Array.from({ length: 12 }, (_, i) => (
                  <span key={i} className="ie-key-tick" style={{ transform: `rotate(${i * 30}deg)` }} />
                ))}
                <span className="ie-key-knob">{p.no}</span>
              </span>
              <span className="ie-key-label">{p.label}</span>
            </button>
          );
        })}
      </nav>

      <div className="ie-rcm-foot">
        <span className="ie-rcm-foot-line">CTRL-01</span>
        <span className="ie-rcm-foot-line">v2.6</span>
      </div>
    </aside>
  );

  return createPortal(panel, document.body);
}

const HERO_EMAIL = "ibrahimisphahani@gmail.com";

/* ----------------------------- HOME ----------------------------- */
function Home({ reduce }) {
  const [emailOpen, setEmailOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const emailWrapRef = useRef(null);

  useEffect(() => {
    if (!emailOpen) return undefined;

    const handleClickOutside = (event) => {
      if (emailWrapRef.current && !emailWrapRef.current.contains(event.target)) {
        setEmailOpen(false);
      }
    };
    const handleEscape = (event) => {
      if (event.key === "Escape") setEmailOpen(false);
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [emailOpen]);

  useEffect(() => {
    if (!copied) return undefined;
    const timer = window.setTimeout(() => setCopied(false), 2000);
    return () => window.clearTimeout(timer);
  }, [copied]);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(HERO_EMAIL);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className="ie-home-page">
      <section className="ie-section ie-hero ie-home-section">
      <div className="svg-gear-bg" aria-hidden="true">
        <img className="svg-gear-bg__group svg-gear-bg__group--top" src="/assets/AdobeStock_501145623.svg" alt="" />
        <img className="svg-gear-bg__group svg-gear-bg__group--bottom" src="/assets/AdobeStock_501145623.svg" alt="" />
      </div>
      <div className="ie-hero-inner">
        <div className="ie-hero-composition">
        <div className="ie-hero-grid">
          <Reveal reduce={reduce} className="ie-hero-content ie-id">
            <p className="ie-label">
              <span className="ie-label-dot" aria-hidden="true" />
              IBRAHIM ISPHAHANI
            </p>
            <p className="ie-role">Mechanical Engineer</p>
            <p className="ie-hero-tagline">Robotics • Product Design • Automation</p>
            <p className="ie-hero-intro">
              Mechanical engineering professional with experience in robotics, product development, embedded systems, and field engineering. Passionate about building intelligent solutions that combine precision, innovation, and real-world impact.
            </p>
            <nav className="ie-hero-cta" aria-label="Quick links">
              <a className="hero-cta-button" href="#" onClick={(e) => e.preventDefault()}>Resume</a>
              <a className="hero-cta-button" href="#" onClick={(e) => e.preventDefault()}>LinkedIn</a>
              <span className="hero-cta-email-wrap" ref={emailWrapRef}>
                <button
                  type="button"
                  className="hero-cta-button"
                  onClick={() => setEmailOpen((open) => !open)}
                  aria-expanded={emailOpen}
                  aria-haspopup="dialog"
                  aria-controls="ie-email-popover"
                >
                  Email
                </button>
                {emailOpen && (
                  <div
                    id="ie-email-popover"
                    className="ie-email-popover"
                    role="dialog"
                    aria-label="Email contact"
                  >
                    <button
                      type="button"
                      className="ie-email-popover-close"
                      onClick={() => setEmailOpen(false)}
                      aria-label="Close email popup"
                    >
                      ×
                    </button>
                    <p className="ie-email-popover-label">EMAIL</p>
                    <div className="ie-email-popover-row">
                      <span className="ie-email-popover-address">{HERO_EMAIL}</span>
                      <button
                        type="button"
                        className="ie-email-popover-copy"
                        onClick={handleCopyEmail}
                        aria-label="Copy email address to clipboard"
                      >
                        {copied ? "Copied!" : "Copy"}
                      </button>
                    </div>
                    <a className="ie-email-popover-open" href={`mailto:${HERO_EMAIL}`}>
                      Open Email
                    </a>
                  </div>
                )}
              </span>
            </nav>
          </Reveal>

          <Reveal reduce={reduce} delay={0.06} className="ie-polaroid-collage">
            {POLAROIDS.map((p) => (
              <figure
                key={p.id}
                className={`ie-polaroid${p.featured ? " ie-polaroid--featured" : ""}`}
                style={{
                  "--rot": `${p.rotate}deg`,
                  left: p.left,
                  top: p.top,
                  width: p.width,
                  zIndex: p.zIndex,
                }}
              >
                <div className="ie-polaroid-photo">
                  <img src={p.src} alt="" loading="lazy" />
                </div>
              </figure>
            ))}
          </Reveal>
        </div>

        <Reveal reduce={reduce} delay={0.1} className="ie-panel ie-hero-panel">
          <div className="ie-hero-panel-inner">
            <div className="ie-panel-head">
              <span className="ie-panel-dot" aria-hidden="true" />
              ENGINEERING PROFILE
            </div>
            <ul className="ie-profile">
              {PROFILE.map((p) => (
                <li key={p}>
                  <i aria-hidden="true" /> {p}
                </li>
              ))}
            </ul>
          </div>
          <svg className="ie-hero-panel-diagram" viewBox="0 0 240 160" aria-hidden="true">
            <g fill="none" stroke="#111111" strokeWidth="0.9" opacity="0.72">
              <rect x="118" y="28" width="88" height="104" rx="6" />
              <circle cx="162" cy="80" r="26" />
              <circle cx="162" cy="80" r="10" />
              <path d="M162 54 L165 62 L174 60 L170 68 L176 74 L167 74 L162 82 L157 74 L148 74 L154 68 L150 60 L159 62 Z" />
              <line x1="118" y1="52" x2="96" y2="52" strokeDasharray="3 3" />
              <line x1="118" y1="80" x2="90" y2="80" strokeDasharray="3 3" />
              <line x1="118" y1="108" x2="96" y2="108" strokeDasharray="3 3" />
              <line x1="206" y1="52" x2="224" y2="44" strokeDasharray="2 2" />
              <line x1="206" y1="108" x2="224" y2="116" strokeDasharray="2 2" />
            </g>
          </svg>
        </Reveal>
        </div>
      </div>
    </section>
    </div>
  );
}

/* ----------------------------- PROJECTS ----------------------------- */
function Projects({ setPage, reduce }) {
  return (
    <section className="ie-section">
      <div className="ie-container">
        <Reveal reduce={reduce}>
          <SectionHead no="//" name="PROJECT DATABASE" meta="03 MODULES" />
        </Reveal>
        <div className="ie-mods">
          {ORDER.map((id) => {
            const m = PROJECTS[id];
            return (
              <motion.article
                className="ie-mod"
                key={id}
                initial={reduce ? false : { opacity: 0, y: 26 }}
                whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, ease: [0.22, 0.61, 0.36, 1] }}
              >
                <div className="ie-mod-index">
                  <span className="ie-mod-no">{m.projNo}</span>
                  <span className="ie-mod-flag">MODULE</span>
                </div>
                <div className="ie-mod-body">
                  <h3 className="ie-mod-title">{m.title}</h3>
                  <div className="ie-mod-tags">
                    {m.meta.map((t) => (
                      <span className="ie-tag" key={t}>{t}</span>
                    ))}
                  </div>
                  {m.roles && <p className="ie-mod-roles">{m.roles}</p>}
                </div>
                <div className="ie-mod-action">
                  <button className="ie-open" type="button" onClick={() => setPage(id)}>
                    OPEN MODULE <span className="ie-arrow" aria-hidden="true">→</span>
                  </button>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ----------------------------- PROJECT PAGE ----------------------------- */
function ProjectPage({ data, setPage, reduce }) {
  const idx = ORDER.indexOf(data.id);
  const prev = ORDER[idx - 1];
  const next = ORDER[idx + 1];

  const SPECS = [
    ["WHAT", data.what],
    ["HOW", data.how],
    ["RESULTS", data.results],
    ["WHAT WAS LEARNED", data.learned],
  ];

  return (
    <section className="ie-section">
      <div className="ie-container">
        <Reveal reduce={reduce} className="ie-crumb-row">
          <button className="ie-back" type="button" onClick={() => setPage("projects")}>
            ← PROJECTS
          </button>
          <span className="ie-crumb">PROJECT {data.projNo} / {data.title.toUpperCase()}</span>
        </Reveal>

        <Reveal reduce={reduce} delay={0.04}>
          <h1 className="ie-proj-title">{data.title}</h1>
          <p className="ie-proj-sub">{data.sub}</p>
          {data.roles && <p className="ie-proj-roles">{data.roles}</p>}
        </Reveal>

        <Reveal reduce={reduce} delay={0.08} as="p" className="ie-lead">
          {data.desc}
        </Reveal>

        <Reveal reduce={reduce} delay={0.1} className="ie-viewer-block">
          <span className="ie-block-eyebrow">CAD / 3D VIEWER</span>
          <Placeholder label="CAD / 3D VIEWER" sub="INTERACTIVE MODEL · PLACEHOLDER" variant="tall" />
        </Reveal>

        <div className="ie-specs4">
          {SPECS.map(([k, v], i) => (
            <Reveal reduce={reduce} delay={0.05 * i} className="ie-spec4" key={k}>
              <span className="ie-spec4-k">{k}</span>
              <p className="ie-spec4-p">{v}</p>
            </Reveal>
          ))}
        </div>

        <Reveal reduce={reduce} className="ie-media-block">
          <span className="ie-block-eyebrow">MEDIA</span>
          <Placeholder label="VIDEO" sub="DEMO REEL · PLACEHOLDER" variant="wide" />
          <div className="ie-media-thumbs">
            <Placeholder label="IMAGE 01" sub="PLACEHOLDER" variant="thumb" />
            <Placeholder label="IMAGE 02" sub="PLACEHOLDER" variant="thumb" />
            <Placeholder label="IMAGE 03" sub="PLACEHOLDER" variant="thumb" />
          </div>
        </Reveal>

        <div className="ie-projnav">
          {prev ? (
            <button className="ie-projnav-btn" type="button" onClick={() => setPage(prev)}>
              <span className="ie-projnav-dir">← PREVIOUS</span>
              <span className="ie-projnav-name">{PROJECTS[prev].title}</span>
            </button>
          ) : <span />}
          {next ? (
            <button className="ie-projnav-btn ie-projnav-next" type="button" onClick={() => setPage(next)}>
              <span className="ie-projnav-dir">NEXT →</span>
              <span className="ie-projnav-name">{PROJECTS[next].title}</span>
            </button>
          ) : <span />}
        </div>
      </div>
    </section>
  );
}

/* ----------------------------- EXPERIENCE ----------------------------- */
function Experience({ reduce }) {
  return (
    <section className="ie-section">
      <div className="ie-container">
        <Reveal reduce={reduce} className="ie-crumb-row">
          <span className="ie-crumb">03 / EXPERIENCE LOG</span>
        </Reveal>

        <Reveal reduce={reduce} delay={0.04}>
          <h1 className="ie-proj-title">Experience Record</h1>
        </Reveal>

        <Reveal reduce={reduce} delay={0.08} as="p" className="ie-lead">
          Engineering experience across robotics, product development, embedded systems,
          and field validation — documented as a technical specification log.
        </Reveal>

        <Reveal reduce={reduce} delay={0.1}>
          <SectionHead no="01" name="PROFESSIONAL EXPERIENCE" meta={`${EXPERIENCE_JOBS.length} ENTRIES`} />
        </Reveal>
        <div className="ie-exp-timeline">
          {EXPERIENCE_JOBS.map((job, index) => (
            <Reveal
              key={job.id}
              reduce={reduce}
              delay={0.12 + index * 0.05}
              className="ie-exp-timeline-item"
            >
              <div className="ie-exp-timeline-rail" aria-hidden="true">
                <span className="ie-exp-timeline-node" />
                {index < EXPERIENCE_JOBS.length - 1 && <span className="ie-exp-timeline-line" />}
              </div>
              <article className="ie-exp-block">
                <div className="ie-exp-head">
                  <div>
                    <h2 className="ie-exp-role">{job.position}</h2>
                    <p className="ie-exp-org">{job.company}</p>
                  </div>
                  <span className="ie-exp-period">{job.dates}</span>
                </div>
                <p className="ie-exp-p">{job.description}</p>
                <ul className="ie-exp-list">
                  {job.achievements.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal reduce={reduce} delay={0.18}>
          <SectionHead no="02" name="EDUCATION" meta={`${EDUCATION.length} ENTRY`} />
        </Reveal>
        <div className="ie-exp-stack">
          {EDUCATION.map((item, index) => (
            <Reveal
              key={item.id}
              reduce={reduce}
              delay={0.2 + index * 0.04}
              className="ie-exp-block"
            >
              <div className="ie-exp-head">
                <div>
                  <h2 className="ie-exp-role">{item.degree}</h2>
                  <p className="ie-exp-org">{item.university}</p>
                </div>
                <span className="ie-exp-period">{item.graduation}</span>
              </div>
              <p className="ie-exp-p">{item.details}</p>
            </Reveal>
          ))}
        </div>

        <Reveal reduce={reduce} delay={0.24}>
          <SectionHead no="03" name="CERTIFICATIONS" meta={`${CERTIFICATIONS.length} ACTIVE`} />
        </Reveal>
        <div className="ie-exp-certs">
          {CERTIFICATIONS.map((cert, index) => (
            <Reveal
              key={cert.id}
              reduce={reduce}
              delay={0.26 + index * 0.04}
              className="ie-exp-cert"
            >
              <span className="ie-exp-cert-k">CERT</span>
              <span className="ie-exp-cert-name">{cert.name}</span>
              <span className="ie-exp-cert-meta">{cert.issuer} · {cert.year}</span>
            </Reveal>
          ))}
        </div>

        <Reveal reduce={reduce} delay={0.3}>
          <SectionHead no="04" name="TECHNICAL SKILLS" meta={`${SKILL_CATEGORIES.length} CATEGORIES`} />
        </Reveal>
        <div className="ie-exp-skills-grid">
          {SKILL_CATEGORIES.map((category, index) => (
            <Reveal
              key={category.id}
              reduce={reduce}
              delay={0.32 + index * 0.03}
              className="ie-exp-skill-card"
            >
              <span className="ie-exp-skill-label">{category.label}</span>
              <ul className="ie-exp-skill-list">
                {category.items.map((skill) => (
                  <li key={skill}>{skill}</li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>

        <Reveal reduce={reduce} delay={0.48}>
          <SectionHead no="05" name="SOFTWARE & TOOLS" meta={`${SOFTWARE_TOOLS.length} MODULES`} />
        </Reveal>
        <div className="ie-exp-soft-grid">
          {SOFTWARE_TOOLS.map((tool, index) => (
            <Reveal
              key={tool}
              reduce={reduce}
              delay={0.5 + index * 0.02}
              className="ie-exp-soft-card"
            >
              <span className="ie-exp-soft-dot" aria-hidden="true" />
              <span className="ie-exp-soft-name">{tool}</span>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ----------------------------- CONTACT ----------------------------- */
function Contact({ reduce }) {
  const ROWS = [
    ["EMAIL", "hello@ibrahimisphahani.com", "mailto:hello@ibrahimisphahani.com"],
    ["LINKEDIN", "/in/ibrahim-isphahani", "#"],
    ["GITHUB", "/ibrahim-isphahani", "#"],
    ["LOCATION", "Chicago, Illinois", null],
  ];
  return (
    <section className="ie-section">
      <div className="ie-container">
        <Reveal reduce={reduce} className="ie-crumb-row">
          <span className="ie-crumb">04 / ABOUT</span>
        </Reveal>
        <Reveal reduce={reduce} delay={0.04}>
          <h1 className="ie-proj-title">Let's build something that moves.</h1>
        </Reveal>
        <Reveal reduce={reduce} delay={0.08} as="p" className="ie-lead">
          Open to roles in vehicle controls, robotics, and embedded systems.
          Reach out and I'll get back to you.
        </Reveal>

        <Reveal reduce={reduce} delay={0.12} className="ie-crows">
          {ROWS.map(([k, v, href]) => (
            <div className="ie-crow" key={k}>
              <span className="ie-crow-k">{k}</span>
              <span className="ie-crow-lead" aria-hidden="true" />
              {href ? (
                <a className="ie-crow-v" href={href} onClick={href === "#" ? (e) => e.preventDefault() : undefined}>
                  {v}
                </a>
              ) : (
                <span className="ie-crow-v">{v}</span>
              )}
            </div>
          ))}
        </Reveal>

        <Reveal reduce={reduce} delay={0.16} className="ie-actions">
          <a className="ie-btn ie-btn-primary" href="mailto:hello@ibrahimisphahani.com">
            EMAIL ME <span className="ie-arrow" aria-hidden="true">→</span>
          </a>
          <a className="ie-btn ie-btn-secondary" href="#" onClick={(e) => e.preventDefault()}>
            DOWNLOAD RESUME
          </a>
        </Reveal>

        <div className="ie-foot">IBRAHIM ISPHAHANI · © 2026 · MECHANICAL ENGINEER</div>
      </div>
    </section>
  );
}

/* ----------------------------- APP ----------------------------- */
export default function App() {
  const reduce = useReducedMotion();
  const [page, setPage] = useState("home");

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [page]);

  useEffect(() => {
    const root = document.documentElement;
    const { body } = document;
    const desktopHome = window.matchMedia("(min-width: 901px)");

    const applyOverflow = () => {
      if (page === "home" && desktopHome.matches) {
        root.style.overflow = "hidden";
        body.style.overflow = "hidden";
      } else {
        root.style.overflow = "";
        body.style.overflow = "";
      }
    };

    applyOverflow();
    desktopHome.addEventListener("change", applyOverflow);
    return () => {
      desktopHome.removeEventListener("change", applyOverflow);
      root.style.overflow = "";
      body.style.overflow = "";
    };
  }, [page]);

  const renderPage = () => {
    switch (page) {
      case "home": return <Home reduce={reduce} />;
      case "projects": return <Projects setPage={setPage} reduce={reduce} />;
      case "etc": return <ProjectPage data={PROJECTS.etc} setPage={setPage} reduce={reduce} />;
      case "arm": return <ProjectPage data={PROJECTS.arm} setPage={setPage} reduce={reduce} />;
      case "trash": return <ProjectPage data={PROJECTS.trash} setPage={setPage} reduce={reduce} />;
      case "experience": return <Experience reduce={reduce} />;
      case "contact": return <Contact reduce={reduce} />;
      default: return null;
    }
  };

  return (
    <div className="ie-root">
      <style>{styles}</style>
      <Remote page={page} setPage={setPage} reduce={reduce} />
      <main className={`ie-main${page === "home" ? " ie-main--home" : ""}`}>
        <AnimatePresence mode="wait">
          <motion.div
            key={page}
            className={page === "home" ? "ie-page-shell--home" : undefined}
            initial={reduce ? false : { opacity: 0, y: 14 }}
            animate={reduce ? false : { opacity: 1, y: 0 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: -8 }}
            transition={{ duration: 0.34, ease: [0.22, 0.61, 0.36, 1] }}
          >
            {renderPage()}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}

/* ----------------------------- STYLES ----------------------------- */
const styles = `
.ie-root{
  --paper:#ECE9E6;
  --ink:#111111;
  --accent:#FF6B00;
  --glow:rgba(255,107,0,0.32);
  --glow-strong:rgba(255,107,0,0.48);
  --glass:rgba(255,255,255,0.55);
  --glass-strong:rgba(255,255,255,0.72);
  --muted:#5e5e5e;
  --line:rgba(17,17,17,0.10);
  --mono:ui-monospace,"SF Mono","JetBrains Mono",Menlo,Consolas,monospace;
  --sans:"Helvetica Neue",Helvetica,Arial,"Segoe UI",system-ui,sans-serif;
  --rcm-width:260px;
  --rcm-offset:32px;
  --rcm-gap:48px;

  min-height:100vh;
  background:var(--paper);
  color:var(--ink); font-family:var(--sans); -webkit-font-smoothing:antialiased;
  overflow:visible;
}
html, body, #root{
  overflow-x:hidden;
  overflow-y:auto;
}
#root{
  overflow:visible;
  min-height:100vh;
}
.ie-root *{ box-sizing:border-box; }
.ie-root button:not(.hero-cta-button):not(.ie-email-popover-copy):not(.ie-email-popover-close){ font:inherit; cursor:pointer; border:none; background:none; color:inherit; }
.ie-root a{ text-decoration:none; color:inherit; }
.ie-root ul{ list-style:none; margin:0; padding:0; }

/* ================= MAIN / LAYOUT ================= */
.ie-main{ margin-left:calc(var(--rcm-offset) + var(--rcm-width) + var(--rcm-gap)); min-height:100vh; overflow:visible; }
.ie-main--home{
  height:100vh;
  height:100dvh;
  min-height:0;
  overflow:hidden;
  padding-bottom:0;
}
.ie-page-shell--home{ height:100%; }
.ie-home-page{
  height:100%;
  overflow:hidden;
  display:flex;
  flex-direction:column;
  padding-bottom:32px;
  box-sizing:border-box;
}
.ie-home-page .ie-home-section{
  flex:1;
  min-height:0;
  display:flex;
  flex-direction:column;
  padding:clamp(20px,3vh,36px) clamp(32px,4vw,56px) 0;
  overflow:visible;
}
.ie-home-page .ie-hero-inner{
  flex:1;
  min-height:0;
  display:flex;
  flex-direction:column;
  justify-content:center;
  align-items:flex-start;
  width:100%;
  max-width:1180px;
  margin-inline:0;
  overflow:visible;
}
.ie-home-page .ie-hero-composition{
  width:100%;
  max-width:1120px;
  display:flex;
  flex-direction:column;
  align-items:flex-start;
  overflow:visible;
}
.ie-home-page .ie-hero-grid{
  flex:0 0 auto;
  width:100%;
  max-width:1120px;
  grid-template-columns:38% 62%;
  justify-content:stretch;
  gap:40px;
  min-height:0;
  overflow:visible;
  align-items:center;
}
.ie-home-page .ie-hero-content{
  justify-self:end;
  max-width:100%;
  width:100%;
  transform:translate(8px, 32px);
}
.ie-home-page .ie-label{
  font-size:clamp(24px,2.8vh,28px);
  font-weight:600;
  letter-spacing:0.14em;
}
.ie-home-page .ie-label-dot{
  width:10px;
  height:10px;
}
.ie-home-page .ie-role{
  font-size:clamp(2.25rem,5.2vh,64px);
  line-height:1.02;
  margin-top:10px;
}
.ie-home-page .ie-hero-tagline{
  margin-top:10px;
  font-size:15px;
  letter-spacing:0.1em;
}
.ie-home-page .ie-hero-intro{
  margin:12px 0 0;
  font-size:clamp(0.86rem,1vw,0.94rem);
  line-height:1.5;
  color:#4a4a4a;
  max-width:100%;
}
.ie-home-page .ie-hero-cta{
  display:flex;
  flex-wrap:wrap;
  align-items:center;
  gap:12px;
  margin-top:14px;
}
.ie-home-page .ie-hero-cta .hero-cta-button{
  display:inline-flex;
  align-items:center;
  justify-content:center;
  gap:8px;
  height:40px;
  padding:0 20px;
  margin:0;
  border-radius:999px;
  font-family:var(--mono);
  font-size:13px;
  font-weight:600;
  letter-spacing:0.5px;
  text-transform:uppercase;
  text-decoration:none;
  color:#1F1F1F;
  background:rgba(255,255,255,0.7);
  border:1px solid rgba(0,0,0,0.08);
  cursor:pointer;
  appearance:none;
  transition:background 0.25s ease, color 0.25s ease, transform 0.25s ease, box-shadow 0.25s ease;
}
.ie-home-page .ie-hero-cta .hero-cta-button:hover{
  background:#FF7A1A;
  color:#000;
  transform:translateY(-2px);
  box-shadow:0 4px 12px rgba(255,122,26,0.3);
}
.ie-home-page .ie-hero-cta .hero-cta-email-wrap{
  position:relative;
  display:inline-flex;
}
.ie-home-page .hero-cta-email-wrap .ie-email-popover{
  position:absolute;
  top:calc(100% + 10px);
  left:0;
  z-index:10001;
  min-width:min(320px, 88vw);
  padding:14px 16px 12px;
  background:linear-gradient(165deg, #686C72 0%, #575B61 52%, #404348 100%);
  border:1px solid rgba(255,255,255,0.08);
  border-radius:12px;
  box-shadow:0 18px 44px rgba(0,0,0,0.35), 0 6px 18px rgba(0,0,0,0.22), inset 0 1px 0 rgba(255,255,255,0.06);
}
.ie-home-page .hero-cta-email-wrap .ie-email-popover-close{
  position:absolute;
  top:8px;
  right:10px;
  width:24px;
  height:24px;
  display:flex;
  align-items:center;
  justify-content:center;
  font-size:18px;
  line-height:1;
  color:rgba(255,255,255,0.7);
  background:none;
  border:none;
  cursor:pointer;
  border-radius:6px;
  transition:color .2s ease, background .2s ease;
}
.ie-home-page .hero-cta-email-wrap .ie-email-popover-close:hover{
  color:#fff;
  background:rgba(255,255,255,0.08);
}
.ie-home-page .hero-cta-email-wrap .ie-email-popover-label{
  margin:0 0 10px;
  font-family:var(--mono);
  font-size:9px;
  font-weight:600;
  letter-spacing:0.18em;
  color:#FF6B00;
  text-shadow:0 0 10px rgba(255,107,0,0.35);
}
.ie-home-page .hero-cta-email-wrap .ie-email-popover-row{
  display:flex;
  align-items:center;
  gap:12px;
  flex-wrap:nowrap;
}
.ie-home-page .hero-cta-email-wrap .ie-email-popover-address{
  flex:1 1 auto;
  min-width:0;
  font-family:var(--mono);
  font-size:15px;
  font-weight:500;
  letter-spacing:0.2px;
  color:#F5F5F5;
  white-space:nowrap;
}
.ie-home-page .hero-cta-email-wrap .ie-email-popover-copy{
  flex:0 0 auto;
  display:inline-flex;
  align-items:center;
  justify-content:center;
  min-width:68px;
  height:30px;
  font-family:var(--mono);
  font-size:12px;
  font-weight:500;
  letter-spacing:0.12em;
  text-transform:uppercase;
  color:#111;
  background:#FF6B00;
  border:1px solid rgba(255,107,0,0.65);
  border-radius:8px;
  padding:6px 12px;
  cursor:pointer;
  transition:background .2s ease, box-shadow .2s ease;
  box-shadow:0 0 12px rgba(255,107,0,0.25);
}
.ie-home-page .hero-cta-email-wrap .ie-email-popover-copy:hover{
  background:#ff7f1f;
  box-shadow:0 0 16px rgba(255,107,0,0.4);
}
.ie-home-page .hero-cta-email-wrap .ie-email-popover-open{
  display:inline-block;
  margin-top:10px;
  font-family:var(--mono);
  font-size:10px;
  font-weight:500;
  letter-spacing:0.12em;
  text-transform:uppercase;
  color:rgba(255,255,255,0.55);
  transition:color .2s ease;
}
.ie-home-page .hero-cta-email-wrap .ie-email-popover-open:hover{
  color:#FF6B00;
}
.ie-home-page .ie-polaroid-collage{
  width:700px;
  max-width:100%;
  height:500px;
  transform:translate(-90px, 54px);
  transform-origin:center center;
  justify-self:start;
  overflow:visible;
}
.ie-home-page .ie-polaroid{
  padding:11px 11px 14px;
}
.ie-home-page .ie-polaroid--featured{
  box-shadow:0 18px 44px rgba(0,0,0,0.13), 0 6px 18px rgba(0,0,0,0.08);
  z-index:6;
}
.ie-home-page .ie-hero-panel{
  width:100%;
  max-width:960px;
  margin-top:18px;
  margin-bottom:32px;
  margin-left:0;
  margin-right:auto;
  flex-shrink:0;
  min-height:unset;
  height:auto;
  max-height:175px;
  padding:18px 40px;
  display:flex;
  align-items:stretch;
  overflow:hidden;
  border-radius:14px;
  background:#FAFAF8;
  border:1px solid rgba(17,17,17,0.09);
  box-shadow:0 4px 20px rgba(0,0,0,0.05), inset 0 1px 0 rgba(255,255,255,0.8);
}
.ie-home-page .ie-hero-panel-inner{
  flex:1;
  min-width:0;
  z-index:1;
  display:flex;
  flex-direction:column;
  justify-content:flex-start;
}
.ie-home-page .ie-hero-panel .ie-panel-head{
  padding-bottom:6px;
  margin-bottom:6px;
  border-bottom:1px solid rgba(17,17,17,0.08);
  font-size:9px;
  letter-spacing:0.18em;
}
.ie-home-page .ie-profile{
  position:relative;
  gap:10px 36px;
  align-items:center;
}
.ie-home-page .ie-profile::before{
  content:"";
  position:absolute;
  left:50%;
  top:0;
  bottom:0;
  width:1px;
  background:rgba(17,17,17,0.12);
  transform:translateX(-50%);
  pointer-events:none;
}
.ie-home-page .ie-profile li{
  font-family:var(--mono);
  font-size:clamp(0.72rem,1.15vh,0.8rem);
  font-weight:500;
  letter-spacing:0.04em;
  gap:8px;
  padding:0;
  color:#2a2a2a;
}
.ie-home-page .ie-hero-panel-diagram{
  flex:0 0 34%;
  max-width:300px;
  height:90%;
  opacity:0.15;
  align-self:center;
  pointer-events:none;
}
@media (max-height:720px) and (min-width:901px){
  .ie-home-page .ie-hero-grid{ gap:28px; }
  .ie-home-page .ie-label{ font-size:22px; }
  .ie-home-page .ie-role{ font-size:clamp(2rem,4.8vh,52px); }
  .ie-home-page .ie-hero-intro{ font-size:0.82rem; margin-top:8px; }
  .ie-home-page .ie-hero-cta{ margin-top:10px; gap:12px; }
  .ie-home-page .ie-polaroid-collage{
    width:600px;
    height:440px;
    transform:translate(-70px, 40px);
  }
  .ie-home-page .ie-hero-panel{
    max-width:960px;
    width:100%;
    margin-left:0;
    margin-right:auto;
    margin-top:14px;
    margin-bottom:28px;
    min-height:unset;
    max-height:160px;
    padding:14px 28px;
  }
  .ie-home-page .ie-profile{ gap:8px 28px; }
  .ie-home-page .ie-profile li{ font-size:0.68rem; }
  .ie-home-page .ie-hero-panel-diagram{ opacity:0.13; }
}
.ie-section{ padding:clamp(72px,12vh,140px) clamp(40px,6vw,80px); overflow:visible; }
.ie-hero{ min-height:720px; padding-bottom:80px; overflow:visible; position:relative; }
.svg-gear-bg{
  position:absolute; inset:0;
  z-index:0; pointer-events:none; overflow:hidden;
}
.svg-gear-bg__group{
  position:absolute; display:block;
  opacity:0.04;
  pointer-events:none;
  animation:svg-gear-spin 180s linear infinite;
}
.svg-gear-bg__group--top{
  width:520px; height:auto;
  right:-6%; top:-14%;
}
.svg-gear-bg__group--bottom{
  width:680px; height:auto;
  right:-12%; bottom:-20%;
  opacity:0.03;
  animation-duration:200s;
  animation-direction:reverse;
}
@keyframes svg-gear-spin{
  from{ transform:rotate(0deg); }
  to{ transform:rotate(360deg); }
}
.ie-hero-inner{ position:relative; z-index:1; width:100%; max-width:1040px; margin-inline:auto; display:flex; flex-direction:column; align-items:stretch; text-align:left; }
.ie-hero-grid{
  display:grid;
  grid-template-columns:0.8fr 1.2fr;
  align-items:center;
  gap:32px;
  min-height:520px;
  width:100%;
  margin-inline:auto;
}
.ie-container{ width:100%; max-width:960px; overflow:visible; }

/* ================= BUTTONS (shared) ================= */
.ie-actions{ display:flex; flex-wrap:wrap; justify-content:flex-start; gap:16px; }
.ie-btn{
  display:inline-flex; align-items:center; gap:9px;
  font-family:var(--mono); font-size:12.5px; letter-spacing:0.1em; text-transform:uppercase;
  padding:16px 26px; border-radius:999px;
  border:1px solid rgba(255,90,31,0.45); box-shadow:0 8px 24px rgba(255,90,31,0.14), 0 0 20px rgba(255,90,31,0.08);
  transition:transform .2s ease, box-shadow .2s ease, background .2s ease, color .2s ease; will-change:transform;
}
.ie-btn-primary{ background:var(--accent); color:#fff; border-color:rgba(255,90,31,0.7); box-shadow:0 10px 30px rgba(255,90,31,0.22), 0 0 24px var(--glow); }
.ie-btn-primary:hover{ transform:translateY(-3px) scale(1.02); box-shadow:0 20px 55px rgba(255,90,31,0.45), 0 0 32px var(--glow-strong); }
.ie-btn-primary:hover .ie-arrow{ transform:translateX(3px); }
.ie-arrow{ display:inline-block; transition:transform .2s ease; }
.ie-btn-secondary{ background:var(--glass); color:var(--ink); -webkit-backdrop-filter:blur(20px); backdrop-filter:blur(20px); }
.ie-btn-secondary:hover{ transform:translateY(-3px) scale(1.02); box-shadow:0 20px 55px rgba(255,90,31,0.3), 0 0 28px var(--glow); }

/* ================= HERO ================= */
.ie-id > * + *{ margin-top:8px; }
.ie-label{
  margin:0; display:flex; align-items:center; gap:10px;
  font-family:var(--mono); font-size:11px; font-weight:500;
  letter-spacing:0.22em; text-transform:uppercase; color:var(--ink);
}
.ie-label-dot{
  width:8px; height:8px; border-radius:50%; flex:0 0 auto;
  background:var(--accent);
  box-shadow:0 0 10px var(--glow-strong);
}
.ie-role{
  margin:0; font-size:clamp(2.4rem,5vw,3.4rem); font-weight:700;
  letter-spacing:-0.02em; line-height:1.05; color:var(--ink);
}
.ie-hero-content{
  justify-self:end;
  max-width:420px;
}
.ie-hero-tagline{
  margin:16px 0 0;
  font-family:var(--mono);
  font-size:clamp(0.72rem,1.1vw,0.82rem);
  font-weight:500;
  letter-spacing:0.12em;
  line-height:1.5;
  color:#7a7a7a;
  text-transform:uppercase;
}

.ie-polaroid-collage{
  position:relative;
  width:620px;
  max-width:100%;
  height:520px;
  justify-self:start;
  transform:translateX(-20px);
  overflow:visible;
}
.ie-polaroid{
  position:absolute;
  margin:0;
  padding:12px 12px 38px;
  background:#F8F6F2;
  border:1px solid rgba(0,0,0,0.04);
  box-shadow:0 14px 36px rgba(0,0,0,0.10), 0 4px 14px rgba(0,0,0,0.06);
  transform:rotate(var(--rot, 0deg));
  transition:transform .35s ease, box-shadow .35s ease;
  cursor:default;
}
.ie-polaroid:hover{
  transform:translateY(-6px) scale(1.02) rotate(var(--rot, 0deg));
  box-shadow:0 22px 48px rgba(0,0,0,0.14), 0 8px 20px rgba(0,0,0,0.08);
  z-index:10 !important;
}
.ie-polaroid-photo{
  overflow:hidden;
  background:#ddd;
  aspect-ratio:4/5;
}
.ie-root img{ max-width:100%; }
.ie-polaroid-photo img{
  display:block;
  max-width:none;
  width:100%;
  height:100%;
  object-fit:cover;
}
.ie-polaroid-caption{
  position:absolute;
  left:12px; right:12px; bottom:12px;
  margin:0;
  font-family:var(--mono);
  font-size:10px;
  font-weight:500;
  letter-spacing:0.08em;
  text-align:center;
  color:#5a5a5a;
  text-transform:uppercase;
}

.ie-hero-panel{
  position:relative;
  z-index:2;
  margin-top:40px;
  width:100%; border-radius:20px; padding:28px 32px 32px;
  background:#fff;
  border:1px solid rgba(0,0,0,0.04);
  box-shadow:0 8px 32px rgba(0,0,0,0.06);
}
.ie-hero-panel .ie-panel-head{
  padding-bottom:18px; margin-bottom:22px;
  border-bottom:1px solid rgba(0,0,0,0.06);
}
.ie-panel-dot{ width:8px; height:8px; border-radius:2px; background:var(--accent); box-shadow:0 0 10px var(--glow); flex:0 0 auto; }

.ie-panel{ width:100%; border-radius:26px; padding:28px 30px; background:var(--glass); border:1px solid rgba(255,255,255,0.6); -webkit-backdrop-filter:blur(20px); backdrop-filter:blur(20px); box-shadow:0 24px 60px rgba(17,17,17,0.08), inset 0 1px 0 rgba(255,255,255,0.6); }
.ie-panel-head{ display:flex; align-items:center; gap:9px; font-family:var(--mono); font-size:11px; letter-spacing:0.18em; color:var(--ink); padding-bottom:20px; margin-bottom:20px; border-bottom:1px solid var(--line); }
.ie-profile{ display:grid; grid-template-columns:1fr 1fr; gap:18px 40px; }
.ie-profile li{ display:flex; align-items:center; gap:12px; font-size:1rem; color:#2a2a2a; }
.ie-profile li i{ width:7px; height:7px; border-radius:50%; background:var(--accent); box-shadow:0 0 8px var(--glow); flex:0 0 auto; }
.ie-status li{ display:flex; align-items:center; padding:16px 0; border-bottom:1px solid var(--line); }
.ie-status li:first-child{ padding-top:0; }
.ie-status li:last-child{ padding-bottom:0; border-bottom:none; }
.ie-status-k{ font-family:var(--mono); font-size:11px; letter-spacing:0.08em; color:#1d1d1d; white-space:nowrap; }
.ie-status-lead{ flex:1; height:0; border-bottom:1px dashed rgba(17,17,17,0.18); margin:0 14px; transform:translateY(-2px); }
.ie-status-v{ display:inline-flex; align-items:center; gap:7px; font-family:var(--mono); font-size:11px; letter-spacing:0.14em; color:var(--accent); white-space:nowrap; text-shadow:0 0 20px var(--glow); }
.ie-status-v i{ width:7px; height:7px; border-radius:50%; background:var(--accent); box-shadow:0 0 12px var(--glow-strong), 0 0 20px var(--glow); }

/* ================= SECTION HEAD ================= */
.ie-head{ display:flex; align-items:center; gap:14px; margin-bottom:clamp(36px,6vh,56px); }
.ie-head-no{ font-family:var(--mono); font-size:12px; letter-spacing:0.12em; color:var(--accent); text-shadow:0 0 18px var(--glow); }
.ie-head-name{ font-family:var(--mono); font-size:12px; letter-spacing:0.24em; color:#000; font-weight:600; }
.ie-head-rule{ flex:1; height:1px; background:var(--line); }
.ie-head-meta{ font-family:var(--mono); font-size:10px; letter-spacing:0.16em; color:#9a9a9a; }

/* ================= MODULES ================= */
.ie-mods{ display:flex; flex-direction:column; gap:clamp(20px,3vw,28px); }
.ie-mod{
  display:grid; grid-template-columns:auto minmax(0,1fr) auto; align-items:center; gap:clamp(24px,3vw,44px);
  border-radius:26px; padding:clamp(24px,3vw,36px) clamp(26px,3.5vw,38px);
  background:var(--glass); border:1px solid rgba(255,255,255,0.6);
  -webkit-backdrop-filter:blur(20px); backdrop-filter:blur(20px);
  box-shadow:0 20px 50px rgba(17,17,17,0.1), inset 0 1px 0 rgba(255,255,255,0.6);
  transition:transform .25s ease, box-shadow .25s ease, border-color .25s ease;
}
.ie-mod:hover{ transform:translateY(-3px); border-color:rgba(255,90,31,0.35); box-shadow:0 28px 64px rgba(255,90,31,0.18); }
.ie-mod-index{ display:flex; flex-direction:column; gap:4px; align-items:flex-start; }
.ie-mod-no{ font-family:var(--mono); font-weight:700; font-size:clamp(1.8rem,3.4vw,2.8rem); line-height:1; color:var(--accent); letter-spacing:-0.02em; text-shadow:0 0 24px var(--glow); }
.ie-mod-flag{ font-family:var(--mono); font-size:9px; letter-spacing:0.2em; color:#9a9a9a; }
.ie-mod-title{ margin:0; font-size:clamp(1.25rem,2.2vw,1.85rem); font-weight:700; letter-spacing:-0.01em; color:#000; }
.ie-mod-tags{ display:flex; flex-wrap:wrap; gap:8px; margin-top:12px; }
.ie-tag{ font-family:var(--mono); font-size:10.5px; letter-spacing:0.1em; color:#1d1d1d; padding:6px 12px; border-radius:999px; background:rgba(255,255,255,0.65); border:1px solid rgba(17,17,17,0.08); }
.ie-mod-roles{ margin:12px 0 0; font-family:var(--mono); font-size:10.5px; letter-spacing:0.12em; color:var(--accent); }
.ie-mod-action{ justify-self:end; }
.ie-open{
  display:inline-flex; align-items:center; gap:9px; white-space:nowrap;
  font-family:var(--mono); font-size:11.5px; letter-spacing:0.12em; text-transform:uppercase;
  padding:13px 20px; border-radius:999px; color:var(--ink);
  background:rgba(255,255,255,0.6); border:1px solid rgba(255,90,31,0.45); box-shadow:0 8px 24px rgba(255,90,31,0.14);
  transition:transform .2s ease, box-shadow .2s ease, background .2s ease, color .2s ease;
}
.ie-open:hover{ transform:translateY(-2px); background:var(--accent); color:#fff; box-shadow:0 16px 40px var(--glow-strong), 0 0 28px var(--glow); }
.ie-open:hover .ie-arrow{ transform:translateX(3px); }

/* ================= PROJECT PAGE ================= */
.ie-crumb-row{ display:flex; align-items:center; gap:16px; margin-bottom:clamp(20px,3vh,32px); flex-wrap:wrap; }
.ie-back{ font-family:var(--mono); font-size:11px; letter-spacing:0.14em; color:var(--ink); padding:9px 15px; border-radius:999px; background:var(--glass); border:1px solid var(--line); transition:background .2s ease, color .2s ease, border-color .2s ease; }
.ie-back:hover{ background:var(--accent); color:#fff; border-color:rgba(255,90,31,0.7); }
.ie-crumb{ font-family:var(--mono); font-size:11px; letter-spacing:0.16em; color:#8d8d8d; }
.ie-proj-title{ margin:0; font-weight:800; letter-spacing:-0.025em; line-height:1.02; font-size:clamp(2rem,5.2vw,3.8rem); color:#000; }
.ie-proj-sub{ margin:14px 0 0; font-family:var(--mono); font-size:12.5px; letter-spacing:0.16em; text-transform:uppercase; color:var(--accent); text-shadow:0 0 18px var(--glow); }
.ie-proj-roles{ margin:9px 0 0; font-family:var(--mono); font-size:11px; letter-spacing:0.1em; color:#6a6a6a; }
.ie-lead{ margin:26px 0 0; max-width:66ch; font-size:clamp(1.05rem,1.5vw,1.3rem); line-height:1.6; color:#222; }

.ie-block-eyebrow{ display:block; font-family:var(--mono); font-size:11px; letter-spacing:0.2em; color:var(--accent); margin-bottom:14px; text-shadow:0 0 16px var(--glow); }
.ie-viewer-block{ margin-top:clamp(36px,6vh,64px); }
.ie-media-block{ margin-top:clamp(36px,6vh,64px); }

/* metallic placeholders */
.ie-ph{
  position:relative; overflow:hidden; border-radius:24px;
  background:linear-gradient(135deg,#dadada 0%,#c6c6c6 38%,#d2d2d2 60%,#bcbcbc 100%);
  border:1px solid rgba(255,255,255,0.55);
  box-shadow:inset 0 1px 0 rgba(255,255,255,0.65), 0 22px 54px rgba(17,17,17,0.12);
  display:flex; align-items:flex-end;
}
.ie-ph-tall{ aspect-ratio:16/9; }
.ie-ph-wide{ aspect-ratio:16/8; }
.ie-ph-thumb{ aspect-ratio:4/3; }
.ie-ph-sheen{ position:absolute; inset:0; background:linear-gradient(115deg, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0) 38%); pointer-events:none; }
.ie-ph-body{ position:relative; z-index:2; padding:clamp(16px,2.4vw,26px); display:flex; flex-direction:column; gap:5px; }
.ie-ph-tag{ font-family:var(--mono); font-weight:600; font-size:clamp(0.85rem,1.4vw,1.1rem); letter-spacing:0.04em; color:#3f3f3f; }
.ie-ph-sub{ font-family:var(--mono); font-size:10px; letter-spacing:0.16em; color:#7a7a7a; }
.ie-ph-mark{ position:absolute; z-index:2; width:13px; height:13px; opacity:0.5; }
.ie-ph-mark::before,.ie-ph-mark::after{ content:""; position:absolute; background:rgba(17,17,17,0.4); }
.ie-ph-mark::before{ width:13px; height:1.5px; top:0; }
.ie-ph-mark::after{ width:1.5px; height:13px; left:0; }
.ie-m-tl{ top:14px; left:14px; }
.ie-m-tr{ top:14px; right:14px; transform:scaleX(-1); }
.ie-m-bl{ bottom:14px; left:14px; transform:scaleY(-1); }
.ie-m-br{ bottom:14px; right:14px; transform:scale(-1,-1); }

.ie-media-thumbs{ display:grid; grid-template-columns:repeat(3,1fr); gap:clamp(12px,2vw,18px); margin-top:clamp(12px,2vw,18px); }

/* 4 spec blocks */
.ie-specs4{ margin-top:clamp(36px,6vh,64px); display:grid; grid-template-columns:1fr 1fr; gap:clamp(18px,3vw,32px); }
.ie-spec4{ border-radius:24px; padding:26px 26px; background:var(--glass); border:1px solid rgba(255,255,255,0.6); -webkit-backdrop-filter:blur(20px); backdrop-filter:blur(20px); box-shadow:0 18px 46px rgba(17,17,17,0.1); }
.ie-spec4-k{ display:block; font-family:var(--mono); font-size:11px; letter-spacing:0.18em; color:var(--accent); margin-bottom:12px; text-shadow:0 0 16px var(--glow); }
.ie-spec4-p{ margin:0; font-size:1rem; line-height:1.6; color:#262626; }

/* project nav */
.ie-projnav{ margin-top:clamp(40px,7vh,72px); padding-top:24px; border-top:1px solid var(--line); display:flex; justify-content:space-between; gap:14px; flex-wrap:wrap; }
.ie-projnav-btn{ display:flex; flex-direction:column; gap:4px; text-align:left; padding:14px 20px; border-radius:18px; background:var(--glass); border:1px solid var(--line); transition:transform .2s ease, border-color .2s ease, box-shadow .2s ease; }
.ie-projnav-next{ text-align:right; align-items:flex-end; }
.ie-projnav-btn:hover{ transform:translateY(-2px); border-color:rgba(255,90,31,0.4); box-shadow:0 14px 36px rgba(255,90,31,0.16); }
.ie-projnav-dir{ font-family:var(--mono); font-size:10px; letter-spacing:0.16em; color:var(--accent); text-shadow:0 0 14px var(--glow); }
.ie-projnav-name{ font-size:1.05rem; font-weight:700; letter-spacing:-0.01em; }

/* ================= EXPERIENCE ================= */
.ie-exp-stack{
  margin-top:clamp(20px,3vh,28px);
  display:flex;
  flex-direction:column;
  gap:clamp(16px,2.5vh,22px);
}
.ie-exp-timeline{
  margin-top:clamp(20px,3vh,28px);
  display:flex;
  flex-direction:column;
  gap:clamp(18px,2.5vh,24px);
}
.ie-exp-timeline-item{
  display:grid;
  grid-template-columns:28px minmax(0,1fr);
  gap:18px;
  align-items:stretch;
}
.ie-exp-timeline-rail{
  position:relative;
  display:flex;
  flex-direction:column;
  align-items:center;
  padding-top:28px;
}
.ie-exp-timeline-node{
  width:11px;
  height:11px;
  border-radius:50%;
  background:var(--accent);
  box-shadow:0 0 12px var(--glow-strong), 0 0 20px var(--glow);
  flex:0 0 auto;
}
.ie-exp-timeline-line{
  flex:1 1 auto;
  width:2px;
  margin-top:10px;
  min-height:calc(100% + 8px);
  background:linear-gradient(180deg, rgba(255,107,0,0.55), rgba(17,17,17,0.12));
  border-radius:999px;
}
.ie-exp-block{
  border-radius:24px;
  padding:24px 26px;
  background:var(--glass);
  border:1px solid rgba(255,255,255,0.6);
  -webkit-backdrop-filter:blur(20px);
  backdrop-filter:blur(20px);
  box-shadow:0 18px 46px rgba(17,17,17,0.1);
}
.ie-exp-head{
  display:flex;
  align-items:flex-start;
  justify-content:space-between;
  gap:16px;
  margin-bottom:12px;
}
.ie-exp-role{
  margin:0;
  font-size:clamp(1.05rem,1.8vw,1.25rem);
  font-weight:700;
  letter-spacing:-0.01em;
  color:#000;
}
.ie-exp-org{
  margin:6px 0 0;
  font-family:var(--mono);
  font-size:11px;
  letter-spacing:0.12em;
  color:var(--accent);
  text-shadow:0 0 14px var(--glow);
}
.ie-exp-period{
  flex:0 0 auto;
  font-family:var(--mono);
  font-size:10px;
  letter-spacing:0.14em;
  color:#8d8d8d;
  white-space:nowrap;
}
.ie-exp-p{
  margin:0;
  font-size:1.02rem;
  line-height:1.62;
  color:#222;
}
.ie-exp-list{
  margin:14px 0 0;
  padding:0;
  list-style:none;
  display:flex;
  flex-direction:column;
  gap:10px;
}
.ie-exp-list li{
  position:relative;
  padding-left:18px;
  font-size:0.98rem;
  line-height:1.55;
  color:#2a2a2a;
}
.ie-exp-list li::before{
  content:"";
  position:absolute;
  left:0;
  top:0.62em;
  width:7px;
  height:7px;
  border-radius:50%;
  background:var(--accent);
  box-shadow:0 0 8px var(--glow);
  transform:translateY(-50%);
}
.ie-exp-certs{
  margin-top:clamp(20px,3vh,28px);
  display:grid;
  grid-template-columns:repeat(2,minmax(0,1fr));
  gap:clamp(14px,2vw,18px);
}
.ie-exp-cert{
  border-radius:20px;
  padding:18px 20px;
  background:var(--glass);
  border:1px solid rgba(255,255,255,0.6);
  -webkit-backdrop-filter:blur(20px);
  backdrop-filter:blur(20px);
  box-shadow:0 14px 36px rgba(17,17,17,0.08);
  display:flex;
  flex-direction:column;
  gap:6px;
}
.ie-exp-cert-k{
  font-family:var(--mono);
  font-size:9px;
  letter-spacing:0.18em;
  color:var(--accent);
  text-shadow:0 0 10px var(--glow);
}
.ie-exp-cert-name{
  font-size:1rem;
  font-weight:700;
  color:#1d1d1d;
}
.ie-exp-cert-meta{
  font-family:var(--mono);
  font-size:10px;
  letter-spacing:0.12em;
  color:#8d8d8d;
}
.ie-exp-skills-grid{
  margin-top:clamp(20px,3vh,28px);
  display:grid;
  grid-template-columns:repeat(3,minmax(0,1fr));
  gap:clamp(14px,2vw,18px);
}
.ie-exp-skill-card{
  border-radius:20px;
  padding:20px 22px;
  background:var(--glass);
  border:1px solid rgba(255,255,255,0.6);
  -webkit-backdrop-filter:blur(20px);
  backdrop-filter:blur(20px);
  box-shadow:0 14px 36px rgba(17,17,17,0.08);
}
.ie-exp-skill-label{
  display:block;
  font-family:var(--mono);
  font-size:10px;
  letter-spacing:0.16em;
  color:var(--accent);
  text-shadow:0 0 12px var(--glow);
  margin-bottom:14px;
}
.ie-exp-skill-list{
  margin:0;
  padding:0;
  list-style:none;
  display:flex;
  flex-direction:column;
  gap:8px;
}
.ie-exp-skill-list li{
  position:relative;
  padding-left:14px;
  font-size:0.92rem;
  line-height:1.45;
  color:#2a2a2a;
}
.ie-exp-skill-list li::before{
  content:"";
  position:absolute;
  left:0;
  top:0.58em;
  width:5px;
  height:5px;
  border-radius:1px;
  background:#575B61;
  transform:translateY(-50%);
}
.ie-exp-soft-grid{
  margin-top:clamp(20px,3vh,28px);
  display:grid;
  grid-template-columns:repeat(4,minmax(0,1fr));
  gap:clamp(12px,1.8vw,16px);
}
.ie-exp-soft-card{
  display:flex;
  align-items:center;
  gap:10px;
  border-radius:14px;
  padding:14px 16px;
  background:rgba(255,255,255,0.62);
  border:1px solid rgba(17,17,17,0.08);
  box-shadow:0 10px 24px rgba(17,17,17,0.06), inset 0 1px 0 rgba(255,255,255,0.7);
}
.ie-exp-soft-dot{
  width:7px;
  height:7px;
  border-radius:50%;
  background:var(--accent);
  box-shadow:0 0 8px var(--glow);
  flex:0 0 auto;
}
.ie-exp-soft-name{
  font-family:var(--mono);
  font-size:11px;
  letter-spacing:0.08em;
  color:#1d1d1d;
}

/* ================= CONTACT ================= */
.ie-crows{ margin-top:clamp(34px,6vh,56px); border-top:1px solid var(--line); max-width:640px; }
.ie-crow{ display:flex; align-items:center; padding:18px 0; border-bottom:1px solid var(--line); }
.ie-crow-k{ font-family:var(--mono); font-size:11px; letter-spacing:0.16em; color:var(--accent); white-space:nowrap; text-shadow:0 0 14px var(--glow); }
.ie-crow-lead{ flex:1; height:0; border-bottom:1px dashed rgba(17,17,17,0.18); margin:0 16px; transform:translateY(-2px); }
.ie-crow-v{ font-size:1.02rem; color:#1d1d1d; white-space:nowrap; transition:color .2s ease; }
a.ie-crow-v:hover{ color:var(--accent); }
.ie-foot{ margin-top:clamp(40px,7vh,80px); padding-top:22px; border-top:1px solid var(--line); font-family:var(--mono); font-size:10px; letter-spacing:0.16em; color:#8d8d8d; }

/* ================= RESPONSIVE ================= */

/* Tablet — inner pages only; desktop home layout unchanged above 900px */
@media (max-width:1024px){
  .ie-section{ padding:clamp(56px,10vh,100px) clamp(24px,5vw,40px); }
  .ie-exp-skills-grid{ grid-template-columns:repeat(2,minmax(0,1fr)); }
  .ie-exp-soft-grid{ grid-template-columns:repeat(2,minmax(0,1fr)); }
  .ie-exp-certs{ grid-template-columns:1fr 1fr; }
  .ie-head{ flex-wrap:wrap; row-gap:8px; }
  .ie-head-meta{ width:100%; }
  .ie-proj-title{ font-size:clamp(1.85rem,6vw,3.2rem); }
  .ie-lead{ font-size:clamp(1rem,2.8vw,1.2rem); }
}

/* Mobile navigation + stacked layouts */
@media (max-width:900px){
  .ie-main{
    margin-left:0;
    padding-bottom:calc(112px + env(safe-area-inset-bottom, 0px));
  }
  .ie-main--home{
    height:auto;
    min-height:calc(100dvh - 100px);
    overflow:visible;
  }
  .ie-page-shell--home{ height:auto; min-height:0; }
  .ie-home-page{
    height:auto;
    min-height:calc(100dvh - 100px);
    overflow:visible;
    padding-bottom:16px;
  }
  .ie-home-page .ie-home-section{
    flex:none;
    min-height:auto;
    padding:clamp(16px,3vh,28px) clamp(20px,4vw,28px) clamp(12px,2vh,20px);
  }
  .ie-home-page .ie-hero-inner{
    flex:none;
    min-height:auto;
    justify-content:flex-start;
  }
  .ie-home-page .ie-hero-grid{
    display:grid;
    grid-template-columns:1fr;
    gap:clamp(24px,4vh,32px);
    max-width:100%;
    overflow:visible;
  }
  .ie-home-page .ie-hero-content{
    transform:none;
    max-width:100%;
    width:100%;
  }
  .ie-home-page .ie-label{ font-size:clamp(18px,4.5vw,24px); }
  .ie-home-page .ie-role{ font-size:clamp(2rem,9vw,2.75rem); margin-top:8px; }
  .ie-home-page .ie-hero-tagline{ font-size:clamp(12px,3.2vw,14px); margin-top:8px; }
  .ie-home-page .ie-hero-intro{
    font-size:clamp(0.9rem,3.6vw,1rem);
    line-height:1.55;
    max-width:100%;
  }
  .ie-home-page .ie-hero-cta{ gap:10px; margin-top:12px; }
  .ie-home-page .ie-hero-cta .hero-cta-button{
    height:38px;
    padding:0 16px;
    font-size:12px;
  }
  .ie-home-page .ie-polaroid-collage{
    width:min(100%,360px);
    height:min(72vw,300px);
    max-height:300px;
    margin:0 auto;
    transform:none;
    justify-self:center;
  }
  .ie-home-page .ie-hero-panel{
    width:100%;
    max-width:100%;
    max-height:none;
    margin-top:8px;
    margin-bottom:20px;
    padding:16px 20px;
  }
  .ie-home-page .ie-profile{
    grid-template-columns:1fr 1fr;
    gap:8px 16px;
  }
  .ie-home-page .ie-profile li{ font-size:clamp(0.72rem,2.8vw,0.82rem); }
  .ie-home-page .ie-hero-panel-diagram{ display:none; }
  .svg-gear-bg__group{ opacity:0.015; }
  .svg-gear-bg__group--bottom{ opacity:0.012; }
  .ie-mod{ grid-template-columns:1fr; gap:16px; align-items:start; }
  .ie-mod-index{ flex-direction:row; align-items:baseline; gap:10px; }
  .ie-mod-action{ justify-self:stretch; }
  .ie-open{ width:100%; justify-content:center; }
  .ie-specs4{ grid-template-columns:1fr; }
  .ie-media-thumbs{ grid-template-columns:1fr 1fr; }
  .ie-projnav{ flex-direction:column; }
  .ie-projnav-btn,.ie-projnav-next{ width:100%; text-align:left; align-items:flex-start; }
  .ie-exp-head{ flex-direction:column; align-items:flex-start; gap:8px; }
  .ie-exp-period{ white-space:normal; }
  .ie-exp-skills-grid{ grid-template-columns:1fr 1fr; }
  .ie-exp-soft-grid{ grid-template-columns:repeat(2,minmax(0,1fr)); }
  .ie-crows{ max-width:100%; }
  .ie-crow{ flex-wrap:wrap; row-gap:6px; }
  .ie-crow-v{ white-space:normal; word-break:break-word; }
  .ie-actions{ flex-direction:column; align-items:stretch; }
  .ie-actions .ie-btn{ width:100%; justify-content:center; }
  .ie-home-page .hero-cta-email-wrap .ie-email-popover{
    left:auto;
    right:0;
    min-width:min(300px, calc(100vw - 32px));
  }
}

/* Phone */
@media (max-width:600px){
  .svg-gear-bg{ display:none; }
  .ie-section{ padding:clamp(48px,12vh,72px) clamp(16px,4vw,24px); }
  .ie-home-page .ie-home-section{ padding:14px 16px 12px; }
  .ie-home-page .ie-polaroid-collage{
    width:min(100%,300px);
    height:min(68vw,260px);
    max-height:260px;
  }
  .ie-home-page .ie-polaroid{ padding:8px 8px 12px; }
  .ie-home-page .ie-hero-panel{
    padding:14px 16px;
    margin-bottom:16px;
  }
  .ie-home-page .ie-profile{
    grid-template-columns:1fr;
    gap:8px;
  }
  .ie-home-page .ie-profile::before{ display:none; }
  .ie-home-page .ie-hero-cta .hero-cta-button{
    flex:1 1 calc(50% - 5px);
    min-width:calc(50% - 5px);
    justify-content:center;
    padding:0 10px;
    font-size:11px;
    letter-spacing:0.35px;
  }
  .ie-head{ margin-bottom:clamp(24px,5vh,36px); }
  .ie-head-name{ font-size:11px; letter-spacing:0.18em; }
  .ie-proj-title{ font-size:clamp(1.65rem,8vw,2.25rem); }
  .ie-lead{ font-size:1rem; line-height:1.58; }
  .ie-crumb-row{ gap:10px; }
  .ie-back{ width:100%; text-align:center; }
  .ie-media-thumbs{ grid-template-columns:1fr; }
  .ie-exp-skills-grid{ grid-template-columns:1fr; }
  .ie-exp-soft-grid{ grid-template-columns:1fr 1fr; }
  .ie-exp-certs{ grid-template-columns:1fr; }
  .ie-exp-block{ padding:18px 16px; }
  .ie-exp-timeline-item{ grid-template-columns:20px minmax(0,1fr); gap:12px; }
  .ie-exp-timeline-rail{ padding-top:22px; }
  .ie-exp-timeline-node{ width:9px; height:9px; }
  .ie-crow-k{ font-size:10px; }
  .ie-crow-lead{ display:none; }
  .ie-crow{ padding:14px 0; }
  .ie-foot{ font-size:9px; letter-spacing:0.12em; text-align:center; }
  .ie-ph-body{ padding:14px 16px; }
}

/* Small phone */
@media (max-width:400px){
  .ie-home-page .ie-hero-cta .hero-cta-button{
    flex:1 1 100%;
    min-width:100%;
  }
  .ie-home-page .ie-polaroid-collage{
    width:min(100%,280px);
    height:240px;
    max-height:240px;
  }
  .ie-exp-soft-grid{ grid-template-columns:1fr; }
}

/* ================= FOCUS + MOTION ================= */
.ie-root a:focus-visible, .ie-root button:focus-visible, .ie-root input:focus-visible{ outline:2px solid var(--accent); outline-offset:3px; }
@media (prefers-reduced-motion: reduce){
  .ie-root *{ animation:none !important; }
  .ie-btn, .ie-arrow, aside.ie-rcm .ie-key, aside.ie-rcm .ie-key-knob, aside.ie-rcm .ie-key-dial, .ie-mod, .ie-open, .ie-back, .ie-projnav-btn, .ie-polaroid{ transition:none !important; }
}
`;