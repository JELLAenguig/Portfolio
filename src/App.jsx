import { useEffect, useRef, useState } from "react";
import "./App.css";

const NAV_LINKS = ["Home", "About", "Services", "Work", "Contact"];
const FOCUS_AREAS = ["Branding", "UI/UX Design", "Web Dev", "Motion"];
const ABOUT_TAGS = ["Problem Solver", "Detail-Oriented", "User Advocate", "Clean Code"];
const CONTACT_LINKS = [
  { icon: "\u2709", label: "Email", href: "mailto:enguigj@gmail.com", text: "enguigj@gmail.com" },
  {
    icon: "in",
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/enguig-jellamae-u-000538245",
    text: "enguig-jellamae",
  },
  { icon: "</>", label: "GitHub", href: "https://github.com/JELLAenguig", text: "JELLAenguig" },
];
const CURRENT_YEAR = new Date().getFullYear();

const SERVICE_OFFERS = [
  {
    title: "UI/UX Design",
    icon: "\u25C8",
    description:
      "Designing user-centered web and mobile interfaces in Figma with clear flows, wireframes, and polished visual systems.",
    num: "01",
  },
  {
    title: "Web Design",
    icon: "\u2B21",
    description:
      "Creating modern, responsive website layouts that align with brand identity and improve user engagement.",
    num: "02",
  },
  {
    title: "Frontend Development",
    icon: "\u27E8/\u27E9",
    description:
      "Building interactive, performant interfaces using React and Angular with clean, reusable components.",
    num: "03",
  },
  {
    title: "Basic Backend Development",
    icon: "\u2B22",
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
    title: "Kusinas Restaurant Website",
    category: "UI/UX Design",
    tags: ["Figma", "Restaurant Website", "Filipino Cuisine"],
    description:
      "A warm, modern UI/UX concept for a Filipino restaurant website, designed to highlight the menu, brand story, and dining experience in a visually inviting way.",
    images: ["/projects/Home page - Kusinas.png", "/projects/Menu thumbnail-Kusinas.png"],
    appUrl: "https://www.figma.com/design/HtdIlvC2Unv65uywF9PjrC/Kusina-s?node-id=156-194&t=TkrQRGeyud2stCBc-1",
    accent: "#fb7185",
    year: "2026",
  },
  {
    title: "Ascend",
    category: "Web Development",
    tags: ["Learning Platform", "Productivity", "Dashboard", "Web App"],
    description:
      "A focused web platform concept for structured learning and progress tracking, designed to help users stay organized, motivated, and consistent.",
    images: ["/projects/ascendworkspace.png", "/projects/ascendprogress.png"],
    imageFit: "contain",
    imagePosition: "center",
    appUrl: "https://ascendlearn.app/",
    accent: "#22c55e",
    year: "2026",
  },
  {
    title: "Qnnect Queueing System",
    category: "Web Development",
    tags: ["NextJs", "MongoDB", "Tailwind CSS", "TypeScript", "Zustand", "Recharts", "PostCSS"],
    description:
      "Qnnect is a healthcare-focused queueing system that simplifies patient flow through smart kiosks, real-time tracking, and efficient service management.",
    images: ["/projects/q-nnect.png", "/projects/q-nnect-2.png"],
    appUrl: "https://qnnect.vercel.app/",
    accent: "#f472b6",
    year: "2026",
  },
  {
    title: "R at R Automation",
    category: "Web Development",
    tags: ["Marketing Website", "SaaS", "Automation", "Security", "Energy Solutions"],
    description:
      "A modern SaaS-inspired marketing website built to present premium automation, security, and energy solutions for residential and commercial clients.",
    images: ["/projects/ratr.png", "/projects/ratr-2.png"],
    imageFit: "contain",
    imagePosition: "center",
    appUrl: "https://ratrhomeauto.com/",
    accent: "#f59e0b",
    year: "2026",
  },
];

export default function Portfolio() {
  const cursorRef = useRef(null);
  const cursorDotRef = useRef(null);
  const [activeProjectImage, setActiveProjectImage] = useState({});

  const cycleProjectImage = (title, totalImages, direction) => {
    setActiveProjectImage((prev) => {
      const current = prev[title] ?? 0;
      const next = (current + direction + totalImages) % totalImages;
      return { ...prev, [title]: next };
    });
  };

  const setProjectImage = (title, index) => {
    setActiveProjectImage((prev) => ({ ...prev, [title]: index }));
  };

  useEffect(() => {
    const revealEls = document.querySelectorAll(".reveal");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    revealEls.forEach((el) => observer.observe(el));

    const cursor = cursorRef.current;
    const dot = cursorDotRef.current;
    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;
    let animationFrameId = 0;

    const onMove = (event) => {
      mouseX = event.clientX;
      mouseY = event.clientY;

      if (dot) {
        dot.style.transform = `translate(${mouseX - 2}px, ${mouseY - 2}px)`;
      }
    };

    const animate = () => {
      cursorX += (mouseX - cursorX) * 0.1;
      cursorY += (mouseY - cursorY) * 0.1;

      if (cursor) {
        cursor.style.transform = `translate(${cursorX - 18}px, ${cursorY - 18}px)`;
      }

      animationFrameId = window.requestAnimationFrame(animate);
    };

    const hoverEls = document.querySelectorAll("a, button, .offer-card, .project-card");
    const handleMouseEnter = () => cursor?.classList.add("hover");
    const handleMouseLeave = () => cursor?.classList.remove("hover");

    window.addEventListener("mousemove", onMove);
    hoverEls.forEach((el) => {
      el.addEventListener("mouseenter", handleMouseEnter);
      el.addEventListener("mouseleave", handleMouseLeave);
    });
    animate();

    return () => {
      observer.disconnect();
      window.removeEventListener("mousemove", onMove);
      window.cancelAnimationFrame(animationFrameId);
      hoverEls.forEach((el) => {
        el.removeEventListener("mouseenter", handleMouseEnter);
        el.removeEventListener("mouseleave", handleMouseLeave);
      });
    };
  }, []);

  return (
    <>
      {/* Cursor */}
      <div ref={cursorRef} className="cursor-ring" aria-hidden="true" />
      <div ref={cursorDotRef} className="cursor-dot" aria-hidden="true" />

      {/* Ambient blobs */}
      <div className="amb-a ambient" aria-hidden="true" />
      <div className="amb-b ambient" aria-hidden="true" />
      <div className="amb-c ambient" aria-hidden="true" />

      {/* Header */}
      <header className="topbar">
        <a href="#home" className="logo">
          JE<span>.</span>
        </a>
        <nav className="nav">
          {NAV_LINKS.map((link) => (
            <a key={link} href={`#${link.toLowerCase()}`}>
              {link}
            </a>
          ))}
        </nav>
        <a className="talk-btn" href="mailto:enguigj@gmail.com">
          Let's Talk
        </a>
      </header>

      {/* Hero */}
      <section id="home" className="hero">
        <div className="hero-name-bg" aria-hidden="true">
          JELLAMAE
        </div>
        <div className="hero-inner">
          <div className="reveal">
            <p className="hero-kicker">Hi, I am Jellamae Enguig</p>
            <h1>
              <span className="line1">UI/UX</span>
              <span className="line2">DESIGNER</span>
              <span className="line3">&amp; DEV</span>
            </h1>
            <p className="hero-desc">
              Crafting seamless experiences through thoughtful design and clean, scalable code,
              turning ideas into intuitive digital products.
            </p>
            <div className="hero-btns">
              <a className="btn-primary" href="#work">
                View My Work
              </a>
              <a className="btn-ghost" href="#contact">
                Contact Me
              </a>
            </div>
            <div className="focus-chips">
              <span className="focus-label">Focus:</span>
              {FOCUS_AREAS.map((area) => (
                <span key={area} className="chip">
                  {area}
                </span>
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
                onError={(event) => {
                  event.target.style.display = "none";
                }}
              />
            </div>
          </div>
        </div>

        <div className="scroll-hint">
          <div className="scroll-line" />
          <span>Scroll</span>
        </div>
      </section>

      {/* About */}
      <section id="about" style={{ position: "relative", zIndex: 1, padding: "100px 48px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <p className="section-seq reveal">01 - About</p>
          <div className="about-grid reveal" style={{ transitionDelay: "60ms" }}>
            <div>
              <p className="about-lead">
                I create user-centered websites and applications that are clear, functional, and
                easy to use.
              </p>
              <p className="about-copy">
                My work is guided by both design and functionality, ensuring that every interface
                is visually refined, intuitive, and built with purpose. I focus on creating
                digital experiences that improve usability, simplify interactions, and provide
                meaningful solutions for users.
              </p>
              <div className="tag-row">
                {ABOUT_TAGS.map((tag) => (
                  <span key={tag} className="tag">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <div className="philosophy-card">
                <p className="phil-label">Philosophy</p>
                <p className="phil-quote">"I design with purpose and build with usability in mind."</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* Services */}
      <section id="services" className="section">
        <p className="section-seq reveal">02 - Services</p>
        <h2 className="section-title reveal" style={{ transitionDelay: "40ms" }}>
          What I Offer
        </h2>
        <div className="offer-grid reveal" style={{ transitionDelay: "80ms" }}>
          {SERVICE_OFFERS.map((offer) => (
            <article key={offer.title} className="offer-card">
              <div className="offer-num">{offer.num}</div>
              <div className="offer-icon-wrap">{offer.icon}</div>
              <h3 className="offer-title">{offer.title}</h3>
              <p className="offer-desc">{offer.description}</p>
              <div className="offer-arrow">-&gt;</div>
            </article>
          ))}
        </div>

        <p className="marquee-label reveal">Tools &amp; Technologies</p>
        <div className="marquee-wrap reveal" style={{ transitionDelay: "60ms" }}>
          <div className="marquee-track">
            {[...TOOLS, ...TOOLS].map((tool, index) => (
              <div key={`${tool.name}-${index}`} className="tool-item">
                <img
                  src={tool.logo}
                  alt={tool.name}
                  loading="lazy"
                  onError={(event) => {
                    event.target.style.display = "none";
                  }}
                />
                <span>{tool.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* Work */}
      <section id="work" className="section">
        <p className="section-seq reveal">03 - Selected Work</p>
        <div className="work-header reveal" style={{ transitionDelay: "40ms" }}>
          <h2 className="section-title" style={{ marginBottom: 0 }}>
            Recent Projects
          </h2>
        </div>

        <div className="projects-grid reveal" style={{ transitionDelay: "80ms" }}>
          {PROJECTS.map((project) => {
            const projectImages = project.images?.length ? project.images : project.image ? [project.image] : [];
            const currentImage = Math.min(
              activeProjectImage[project.title] ?? 0,
              Math.max(projectImages.length - 1, 0)
            );

            return (
              <article key={project.title} className="project-card">
                <div className="project-preview">
                  {projectImages.length > 0 ? (
                    <img
                      className="project-thumb"
                      src={projectImages[currentImage]}
                      alt={`${project.title} preview`}
                      loading="lazy"
                      style={{
                        objectFit: project.imageFit ?? "cover",
                        objectPosition: project.imagePosition ?? "center",
                      }}
                    />
                  ) : (
                    <div className="project-mockup">
                      <div className="mockup-bar">
                        <div className="mockup-dot" style={{ background: "#ff5f57" }} />
                        <div className="mockup-dot" style={{ background: "#ffbd2e" }} />
                        <div className="mockup-dot" style={{ background: "#28c840" }} />
                      </div>
                      <div className="mockup-content">
                        <div
                          className="mock-line"
                          style={{ width: "60%", background: `${project.accent}33` }}
                        />
                        <div className="mock-line" style={{ width: "40%" }} />
                        <div className="mock-blocks">
                          <div className="mock-block" style={{ background: `${project.accent}22` }} />
                          <div className="mock-block" />
                        </div>
                      </div>
                    </div>
                  )}
                  {projectImages.length > 1 && (
                    <>
                      <div className="project-image-controls">
                        <button
                          type="button"
                          className="project-image-nav"
                          onClick={() => cycleProjectImage(project.title, projectImages.length, -1)}
                          aria-label={`Previous image for ${project.title}`}
                        >
                          &#8249;
                        </button>
                        <button
                          type="button"
                          className="project-image-nav"
                          onClick={() => cycleProjectImage(project.title, projectImages.length, 1)}
                          aria-label={`Next image for ${project.title}`}
                        >
                          &#8250;
                        </button>
                      </div>
                      <div className="project-image-dots" role="tablist" aria-label={`${project.title} images`}>
                        {projectImages.map((_, index) => (
                          <button
                            type="button"
                            key={`${project.title}-dot-${index}`}
                            className={`project-image-dot${currentImage === index ? " active" : ""}`}
                            onClick={() => setProjectImage(project.title, index)}
                            aria-label={`Show image ${index + 1} for ${project.title}`}
                          />
                        ))}
                      </div>
                    </>
                  )}
                  <div className="project-glow" style={{ background: project.accent }} />
                  {project.appUrl && (
                    <div className="project-overlay">
                      <a
                        className="view-btn"
                        href={project.appUrl}
                        target="_blank"
                        rel="noreferrer"
                      >
                        View Project
                      </a>
                    </div>
                  )}
                </div>
                <div className="project-info">
                  <div className="project-meta">
                    <span className="project-cat" style={{ color: project.accent }}>
                      {project.category}
                    </span>
                    <span className="project-year">{project.year}</span>
                  </div>
                  <h3 className="project-title">{project.title}</h3>
                  <p className="project-desc">{project.description}</p>
                  <div className="project-tags">
                    {project.tags.map((tag) => (
                      <span key={tag} className="project-tag">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            );
          })}
          {PROJECTS.length === 0 && (
            <div
              style={{
                gridColumn: "1/-1",
                textAlign: "center",
                padding: "60px 0",
                color: "var(--muted)",
                fontSize: "0.9rem",
              }}
            >
              No projects in this category yet.
            </div>
          )}
        </div>
      </section>

      <div className="section-divider" />

      {/* Contact */}
      <section id="contact" style={{ position: "relative", zIndex: 1, padding: "100px 48px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", position: "relative" }}>
          <div className="contact-inner reveal">
            <p className="section-seq">04 - Contact</p>
            <h2 className="contact-title">
              Looking for someone to design and build your next digital product?
            </h2>
            <p className="contact-sub">
              I'm currently available for freelance projects. Let's create something remarkable
              together.
            </p>
            <div className="contact-btns">
              <a className="btn-primary" href="mailto:enguigj@gmail.com">
                Say Hello
              </a>
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
            {CONTACT_LINKS.map((link) => (
              <a key={link.label} className="contact-link" href={link.href} target="_blank" rel="noreferrer">
                <span className="contact-link-icon">{link.icon}</span>
                <div>
                  <div className="contact-link-label">{link.label}</div>
                  <div>{link.text}</div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
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
        <span className="footer-copy">&copy; {CURRENT_YEAR} Jellamae Enguig</span>
      </footer>
    </>
  );
}
