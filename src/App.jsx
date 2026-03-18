import { useEffect, useRef, useState } from "react";
import "./App.css";

const NAV_LINKS = ["Home", "About", "Services", "Work", "Contact"];

const SERVICE_OFFERS = [
  {
    title: "UI/UX Design",
    icon: "◈",
    description:
      "Designing user-centered web and mobile interfaces in Figma with clear flows, wireframes, and polished visual systems.",
    num: "01",
  },
  {
    title: "Web Design",
    icon: "⬡",
    description:
      "Creating modern, responsive website layouts that align with brand identity and improve user engagement.",
    num: "02",
  },
  {
    title: "Frontend Development",
    icon: "⟨/⟩",
    description:
      "Building interactive, performant interfaces using React and Angular with clean, reusable components.",
    num: "03",
  },
  {
    title: "Basic Backend Development",
    icon: "⬢",
    description:
      "Implementing backend features and API integration using Node.js and Laravel to support core web app functionality.",
    num: "04",
  },
];

const TOOLS = [
  { name: "Figma", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg" },
  { name: "React", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
  { name: "Angular", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/angularjs/angularjs-original.svg" },
  { name: "Laravel", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/laravel/laravel-original.svg" },
  { name: "Node.js", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
  { name: "TypeScript", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" },
  { name: "JavaScript", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
  { name: "HTML5", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" },
  { name: "CSS3", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" },
  { name: "Tailwind", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg" },
  { name: "Git", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
  { name: "GitHub", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" },
];

const PROJECTS = [
  {
    title: "InfiniteFlex",
    category: "UI/UX Design",
    tags: ["Figma", "E-commerce"],
    description:
      "A comprehensive financial tracking dashboard with real-time data visualization and intuitive navigation.",
    accent: "#38bdf8",
    year: "2025",
  },
  {
    title: "Q-connect",
    category: "Web Development",
    tags: ["Figma", "Mobile", "Healthcare"],
    description:
      "Patient-centered healthcare application simplifying appointment booking and medical records.",
    accent: "#f472b6",
    year: "2025",
  },
];

const FILTER_CATS = ["All", "UI/UX Design", "Web Development", "Web Design"];

export default function Portfolio() {
  const cursorRef = useRef(null);
  const cursorDotRef = useRef(null);
  const [activeFilter, setActiveFilter] = useState("All");

  const filteredProjects =
    activeFilter === "All"
      ? PROJECTS
      : PROJECTS.filter((p) => p.category === activeFilter);

  useEffect(() => {
    // Scroll reveal
    const revealEls = document.querySelectorAll(".reveal");
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("visible");
            obs.unobserve(e.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    revealEls.forEach((el) => obs.observe(el));

    // Custom cursor
    const cursor = cursorRef.current;
    const dot = cursorDotRef.current;
    let mx = 0, my = 0, cx = 0, cy = 0;

    const onMove = (e) => {
      mx = e.clientX;
      my = e.clientY;
      if (dot) dot.style.transform = `translate(${mx - 2}px, ${my - 2}px)`;
    };
    const animate = () => {
      cx += (mx - cx) * 0.1;
      cy += (my - cy) * 0.1;
      if (cursor) cursor.style.transform = `translate(${cx - 18}px, ${cy - 18}px)`;
      requestAnimationFrame(animate);
    };
    window.addEventListener("mousemove", onMove);
    animate();

    const hoverEls = document.querySelectorAll("a, button, .offer-card, .project-card");
    hoverEls.forEach((el) => {
      el.addEventListener("mouseenter", () => cursor?.classList.add("hover"));
      el.addEventListener("mouseleave", () => cursor?.classList.remove("hover"));
    });

    return () => {
      obs.disconnect();
      window.removeEventListener("mousemove", onMove);
    };
  }, []);

  return (
    <>
      {/* ── CURSOR ── */}
      <div ref={cursorRef} className="cursor-ring" aria-hidden="true" />
      <div ref={cursorDotRef} className="cursor-dot" aria-hidden="true" />

      {/* ── AMBIENT BLOBS ── */}
      <div className="amb-a ambient" aria-hidden="true" />
      <div className="amb-b ambient" aria-hidden="true" />
      <div className="amb-c ambient" aria-hidden="true" />

      {/* ── HEADER ── */}
      <header className="topbar">
        <a href="#home" className="logo">JE<span>.</span></a>
        <nav className="nav">
          {NAV_LINKS.map((l) => (
            <a key={l} href={`#${l.toLowerCase()}`}>{l}</a>
          ))}
        </nav>
        <a className="talk-btn" href="mailto:enguigj@gmail.com">Let's Talk ↗</a>
      </header>

      {/* ── HERO ── */}
      <section id="home" className="hero">
        <div className="hero-inner">
          <div className="reveal">
            <p className="hero-kicker">Hi, I am Jellamae Enguig</p>
            <h1>
              <span className="line1">UI/UX</span>
              <span className="line2">DESIGNER</span>
              <span className="line3">&amp; DEV</span>
            </h1>
            <p className="hero-desc">
              Crafting seamless experiences through thoughtful design and clean,
              scalable code — turning ideas into intuitive digital products.
            </p>
            <div className="hero-btns">
              <a className="btn-primary" href="#work">View My Work</a>
              <a className="btn-ghost" href="#contact">Contact Me ↗</a>
            </div>
            <div className="focus-chips">
              <span className="focus-label">Focus:</span>
              {["Branding", "UI/UX Design", "Web Dev", "Motion"].map((s) => (
                <span key={s} className="chip">{s}</span>
              ))}
            </div>
          </div>

          <div className="hero-visual reveal" style={{ transitionDelay: "120ms" }}>
            <div className="hero-img-wrap">
              <div className="hero-img-bg" />
              <div className="hero-img-glow" />
              <img
                src="/profile.png"
                alt="Jellamae Enguig"
                onError={(e) => { e.target.style.display = "none"; }}
              />
              <div className="hero-badge">
                <div className="hero-badge-dot" />
                <div>
                  <div style={{ fontSize: "0.68rem", color: "var(--muted)", marginBottom: 2 }}>
                    Available for
                  </div>
                  <strong>Freelance Projects</strong>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="scroll-hint">
          <div className="scroll-line" />
          <span>Scroll</span>
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section id="about" style={{ position: "relative", zIndex: 1, padding: "100px 48px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <p className="section-seq reveal">01 — About</p>
          <div className="about-grid reveal" style={{ transitionDelay: "60ms" }}>
            <div>
              <p className="about-lead">
                I create user-centered websites and applications that are clear,
                functional, and easy to use.
              </p>
              <p className="about-copy">
                My work is guided by both design and functionality, ensuring that every
                interface is visually refined, intuitive, and built with purpose. I focus
                on creating digital experiences that improve usability, simplify
                interactions, and provide meaningful solutions for users.
              </p>
              <div className="tag-row">
                {["Problem Solver", "Detail-Oriented", "User Advocate", "Clean Code"].map((t) => (
                  <span key={t} className="tag">{t}</span>
                ))}
              </div>
            </div>
            <div>
              <div className="philosophy-card">
                <p className="phil-label">Philosophy</p>
                <p className="phil-quote">
                  "I design with purpose and build with usability in mind."
                </p>
                <div className="phil-divider" />
                <p className="phil-label">Approach</p>
                <div className="approach-steps">
                  {["Research", "Design", "Build", "Refine"].map((s, i) => (
                    <span key={s} className="approach-step">
                      {i > 0 ? "→ " : ""}{s}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* ── SERVICES ── */}
      <section id="services" className="section">
        <p className="section-seq reveal">02 — Services</p>
        <h2 className="section-title reveal" style={{ transitionDelay: "40ms" }}>
          What I Offer
        </h2>
        <div className="offer-grid reveal" style={{ transitionDelay: "80ms" }}>
          {SERVICE_OFFERS.map((o) => (
            <article key={o.title} className="offer-card">
              <div className="offer-num">{o.num}</div>
              <div className="offer-icon-wrap">{o.icon}</div>
              <h3 className="offer-title">{o.title}</h3>
              <p className="offer-desc">{o.description}</p>
              <div className="offer-arrow">→</div>
            </article>
          ))}
        </div>

        <p className="marquee-label reveal">Tools &amp; Technologies</p>
        <div className="marquee-wrap reveal" style={{ transitionDelay: "60ms" }}>
          <div className="marquee-track">
            {[...TOOLS, ...TOOLS].map((t, i) => (
              <div key={`${t.name}-${i}`} className="tool-item">
                <img
                  src={t.logo}
                  alt={t.name}
                  loading="lazy"
                  onError={(e) => { e.target.style.display = "none"; }}
                />
                <span>{t.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* ── WORK ── */}
      <section id="work" className="section">
        <p className="section-seq reveal">03 — Selected Work</p>
        <div className="work-header reveal" style={{ transitionDelay: "40ms" }}>
          <h2 className="section-title" style={{ marginBottom: 0 }}>Recent Projects</h2>
          <div className="filter-pills">
            {FILTER_CATS.map((cat) => (
              <button
                key={cat}
                className={`filter-pill${activeFilter === cat ? " active" : ""}`}
                onClick={() => setActiveFilter(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="projects-grid reveal" style={{ transitionDelay: "80ms" }}>
          {filteredProjects.map((p) => (
            <article key={p.title} className="project-card">
              <div className="project-preview">
                <div className="project-mockup">
                  <div className="mockup-bar">
                    <div className="mockup-dot" style={{ background: "#ff5f57" }} />
                    <div className="mockup-dot" style={{ background: "#ffbd2e" }} />
                    <div className="mockup-dot" style={{ background: "#28c840" }} />
                  </div>
                  <div className="mockup-content">
                    <div className="mock-line" style={{ width: "60%", background: p.accent + "33" }} />
                    <div className="mock-line" style={{ width: "40%" }} />
                    <div className="mock-blocks">
                      <div className="mock-block" style={{ background: p.accent + "22" }} />
                      <div className="mock-block" />
                    </div>
                  </div>
                </div>
                <div className="project-glow" style={{ background: p.accent }} />
                <div className="project-overlay">
                  <a className="view-btn" href="#">View Project ↗</a>
                </div>
              </div>
              <div className="project-info">
                <div className="project-meta">
                  <span className="project-cat" style={{ color: p.accent }}>{p.category}</span>
                  <span className="project-year">{p.year}</span>
                </div>
                <h3 className="project-title">{p.title}</h3>
                <p className="project-desc">{p.description}</p>
                <div className="project-tags">
                  {p.tags.map((t) => (
                    <span key={t} className="project-tag">{t}</span>
                  ))}
                </div>
              </div>
            </article>
          ))}
          {filteredProjects.length === 0 && (
            <div style={{
              gridColumn: "1/-1",
              textAlign: "center",
              padding: "60px 0",
              color: "var(--muted)",
              fontSize: "0.9rem",
            }}>
              No projects in this category yet.
            </div>
          )}
        </div>
      </section>

      <div className="section-divider" />

      {/* ── CONTACT ── */}
      <section id="contact" style={{ position: "relative", zIndex: 1, padding: "100px 48px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", position: "relative" }}>
          <div className="contact-inner reveal">
            <p className="section-seq">04 — Contact</p>
            <h2 className="contact-title">
              Looking for someone to design and build your next digital product?
            </h2>
            <p className="contact-sub">
              I'm currently available for freelance projects. Let's create something
              remarkable together.
            </p>
            <div className="contact-btns">
              <a className="btn-primary" href="mailto:enguigj@gmail.com">Say Hello ↗</a>
              <a
                className="btn-ghost"
                href="https://github.com/JELLAenguig"
                target="_blank"
                rel="noreferrer"
              >
                GitHub
              </a>
            </div>
          </div>

          <div className="contact-aside reveal" style={{ transitionDelay: "80ms" }}>
            {[
              { icon: "✉", label: "Email", href: "mailto:enguigj@gmail.com", text: "enguigj@gmail.com" },
              { icon: "in", label: "LinkedIn", href: "https://www.linkedin.com/in/enguig-jellamae-u-000538245", text: "enguig-jellamae" },
              { icon: "⌥", label: "GitHub", href: "https://github.com/JELLAenguig", text: "JELLAenguig" },
            ].map((l) => (
              <a
                key={l.label}
                className="contact-link"
                href={l.href}
                target="_blank"
                rel="noreferrer"
              >
                <span className="contact-link-icon">{l.icon}</span>
                <div>
                  <div className="contact-link-label">{l.label}</div>
                  <div>{l.text}</div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="footer">
        <span className="footer-name">Jellamae Enguig</span>
        <div className="footer-links">
          <a href="mailto:enguigj@gmail.com">Email</a>
          <a href="https://www.linkedin.com/in/enguig-jellamae-u-000538245" target="_blank" rel="noreferrer">
            LinkedIn
          </a>
          <a href="https://github.com/JELLAenguig" target="_blank" rel="noreferrer">
            GitHub
          </a>
        </div>
        <span className="footer-copy">© 2025 Jellamae Enguig</span>
      </footer>
    </>
  );
}