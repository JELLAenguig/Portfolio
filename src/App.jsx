import { useEffect, useRef, useState } from 'react'
import './App.css'

function App() {
  const cursorRef = useRef(null)
  const cursorDotRef = useRef(null)
  const [activeFilter, setActiveFilter] = useState('All')

  const services = ['Branding', 'UI/UX Design', 'Web Development', 'Motion']

  const serviceOffers = [
    {
      title: 'UI/UX Design',
      icon: '◈',
      description: 'Designing user-centered web and mobile interfaces in Figma with clear flows, wireframes, and polished visual systems.',
    },
    {
      title: 'Web Design',
      icon: '⬡',
      description: 'Creating modern, responsive website layouts that align with brand identity and improve user engagement.',
    },
    {
      title: 'Frontend Development',
      icon: '⟨/⟩',
      description: 'Building interactive, performant interfaces using React and Angular with clean, reusable components.',
    },
    {
      title: 'Basic Backend Development',
      icon: '⬢',
      description: 'Implementing basic backend features and API integration using Node.js and Laravel to support core web app functionality.',
    },
  ]

  const tools = [
    { name: 'Figma', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg' },
    { name: 'React', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
    { name: 'Angular', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/angularjs/angularjs-original.svg' },
    { name: 'Laravel', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/laravel/laravel-original.svg' },
    { name: 'Node.js', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg' },
    { name: 'TypeScript', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg' },
    { name: 'JavaScript', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
    { name: 'HTML5', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg' },
    { name: 'CSS3', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg' },
    { name: 'Tailwind CSS', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg' },
    { name: 'Git', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg' },
    { name: 'GitHub', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg' },
  ]

  const projects = [
    {
      title: 'FinTrack Dashboard',
      category: 'UI/UX Design',
      tags: ['Figma', 'Dashboard', 'Finance'],
      description: 'A comprehensive financial tracking dashboard with real-time data visualization and intuitive navigation.',
      accent: '#38bdf8',
      year: '2024',
    },
    {
      title: 'EcoShop Mobile',
      category: 'Web Development',
      tags: ['React', 'Node.js', 'E-Commerce'],
      description: 'Sustainable e-commerce platform with a focus on clean UI and seamless checkout experience.',
      accent: '#34d399',
      year: '2024',
    },
    {
      title: 'Horizon Agency',
      category: 'Web Design',
      tags: ['Web Design', 'Branding', 'Animation'],
      description: 'Bold agency website with immersive scroll animations and a strong typographic identity.',
      accent: '#a78bfa',
      year: '2023',
    },
    {
      title: 'MedConnect App',
      category: 'UI/UX Design',
      tags: ['Figma', 'Mobile', 'Healthcare'],
      description: 'Patient-centered healthcare application simplifying appointment booking and medical records.',
      accent: '#fb7185',
      year: '2023',
    },
  ]

  const filterCategories = ['All', 'UI/UX Design', 'Web Development', 'Web Design']

  const filteredProjects = activeFilter === 'All'
    ? projects
    : projects.filter(p => p.category === activeFilter)


  useEffect(() => {
    // Reveal on scroll
    const elements = document.querySelectorAll('.reveal')
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.12 }
    )
    elements.forEach((el) => observer.observe(el))

    // Custom cursor
    const cursor = cursorRef.current
    const cursorDot = cursorDotRef.current
    let mx = 0, my = 0, cx = 0, cy = 0

    const onMove = (e) => {
      mx = e.clientX
      my = e.clientY
      if (cursorDot) {
        cursorDot.style.transform = `translate(${mx - 4}px, ${my - 4}px)`
      }
    }

    const animate = () => {
      cx += (mx - cx) * 0.12
      cy += (my - cy) * 0.12
      if (cursor) {
        cursor.style.transform = `translate(${cx - 20}px, ${cy - 20}px)`
      }
      requestAnimationFrame(animate)
    }

    window.addEventListener('mousemove', onMove)
    animate()

    // Hover cursor
    const hoverEls = document.querySelectorAll('a, button, .offer-card, .project-card')
    hoverEls.forEach(el => {
      el.addEventListener('mouseenter', () => cursor?.classList.add('cursor-hover'))
      el.addEventListener('mouseleave', () => cursor?.classList.remove('cursor-hover'))
    })

    // Counter animation
    const counters = document.querySelectorAll('.stat-value')
    const counterObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('counted')
          counterObserver.unobserve(entry.target)
        }
      })
    }, { threshold: 0.5 })
    counters.forEach(c => counterObserver.observe(c))

    return () => {
      observer.disconnect()
      window.removeEventListener('mousemove', onMove)
    }
  }, [])

  return (
    <div className="page">
      {/* Custom Cursor */}
      <div ref={cursorRef} className="cursor" aria-hidden="true"></div>
      <div ref={cursorDotRef} className="cursor-dot" aria-hidden="true"></div>

      {/* Ambient background */}
      <div className="ambient ambient-left" aria-hidden="true"></div>
      <div className="ambient ambient-right" aria-hidden="true"></div>
      <div className="ambient ambient-center" aria-hidden="true"></div>
      <div className="grid-overlay" aria-hidden="true"></div>

      {/* Header */}
      <header className="topbar">
        <nav>
          <a href="#home">Home</a>
          <a href="#about">About</a>
          <a href="#services">Services</a>
          <a href="#work">Work</a>
          <a href="#contact">Contact</a>
        </nav>
        <a className="menu-chip" href="#contact">
          Let&apos;s Talk ↗
        </a>
      </header>

      {/* HERO */}
      <section id="home" className="hero-shell">
        <div className="hero-grid">
          <div className="hero-copy reveal" style={{ '--reveal-delay': '40ms' }}>
            <div className="availability-badge">
              <span className="pulse-dot"></span>
              Available for freelance
            </div>
            <p className="kicker">Hi, I am Jellamae Enguig</p>
            <h1>
              <span>UI/UX</span>
              <span className="outline-text">DESIGNER</span>
              <span>& DEV</span>
            </h1>
            <p className="lede">
              Crafting seamless experiences through thoughtful design and clean,
              scalable code — turning ideas into intuitive digital products.
            </p>
            <div className="cta-row">
              <a className="cta-primary" href="#work">
                View My Work
              </a>
              <a className="cta-secondary" href="#contact">
                Contact Me ↗
              </a>
            </div>
            <div className="partners">
              <p>Core Focus:</p>
              <ul>
                {services.map((service) => (
                  <li key={service}>{service}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="hero-image-wrap reveal" style={{ '--reveal-delay': '120ms' }}>
            <div className="hero-glow" aria-hidden="true"></div>
            <div className="hero-ring hero-ring-1" aria-hidden="true"></div>
            <div className="hero-ring hero-ring-2" aria-hidden="true"></div>
            <img
              src="/profile.png"
              className="hero-visual"
              alt="Jellamae, UI/UX designer and web developer"
            />
          </div>
        </div>

      </section>

      <main>
       

        {/* ABOUT */}
        <section id="about" className="about-panel reveal" style={{ '--reveal-delay': '40ms' }}>
          <p className="section-seq">01 — About</p>
          <div className="about-inner">
            <div className="about-left">
              <p className="about-lead">
                I create user-centered websites and applications that are clear, functional, and easy to use.
              </p>
              <p className="about-copy">
                My work is guided by both design and functionality, ensuring that every
                interface is visually refined, intuitive, and built with purpose. I focus
                on creating digital experiences that improve usability, simplify
                interactions, and provide meaningful solutions for users.
              </p>
              <div className="about-tags">
                <span>Problem Solver</span>
                <span>Detail-Oriented</span>
                <span>User Advocate</span>
                <span>Clean Code</span>
              </div>
            </div>
            <div className="about-right">
              <div className="about-card-stack">
                <div className="about-card about-card-back"></div>
                <div className="about-card about-card-front">
                  <p className="about-card-label">Philosophy</p>
                  <p className="about-card-text">"Good design is invisible — it just works."</p>
                  <div className="about-card-divider"></div>
                  <p className="about-card-label">Approach</p>
                  <p className="about-card-sub">Research → Design → Build → Iterate</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SERVICES */}
        <section id="services" className="services-panel reveal" style={{ '--reveal-delay': '70ms' }}>
          <p className="section-seq">02 — Services</p>
          <h2>What I Offer</h2>
          <div className="offer-grid">
            {serviceOffers.map((offer, i) => (
              <article key={offer.title} className="offer-card" style={{ '--card-delay': `${i * 80}ms` }}>
                <div className="offer-icon">{offer.icon}</div>
                <h3>{offer.title}</h3>
                <p>{offer.description}</p>
                <div className="offer-arrow">→</div>
              </article>
            ))}
          </div>
          <h3 className="stack-title">Tools & Technologies</h3>
          <div className="tools-marquee" aria-label="Design and development tools">
            <div className="tools-track">
              {[...tools, ...tools].map((tool, index) => (
                <article key={`${tool.name}-${index}`} className="service-card">
                  <img src={tool.logo} alt={`${tool.name} logo`} loading="lazy" />
                  <h3>{tool.name}</h3>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* WORK / PROJECTS */}
        <section id="work" className="work-panel reveal" style={{ '--reveal-delay': '50ms' }}>
          <p className="section-seq">03 — Selected Work</p>
          <div className="work-header">
            <h2>Recent Projects</h2>
            <div className="filter-pills">
              {filterCategories.map(cat => (
                <button
                  key={cat}
                  className={`filter-pill ${activeFilter === cat ? 'active' : ''}`}
                  onClick={() => setActiveFilter(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
          <div className="projects-grid">
            {filteredProjects.map((project, i) => (
              <article
                key={project.title}
                className="project-card"
                style={{ '--accent-color': project.accent, '--card-delay': `${i * 100}ms` }}
              >
                <div className="project-preview">
                  <div className="project-preview-inner">
                    <div className="project-mock-ui">
                      <div className="mock-bar">
                        <span></span><span></span><span></span>
                      </div>
                      <div className="mock-content">
                        <div className="mock-line mock-line-title"></div>
                        <div className="mock-line mock-line-sub"></div>
                        <div className="mock-blocks">
                          <div className="mock-block"></div>
                          <div className="mock-block"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="project-overlay">
                    <span className="project-view-btn">View Project ↗</span>
                  </div>
                </div>
                <div className="project-info">
                  <div className="project-meta">
                    <span className="project-cat">{project.category}</span>
                    <span className="project-year">{project.year}</span>
                  </div>
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                  <div className="project-tags">
                    {project.tags.map(t => <span key={t}>{t}</span>)}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* CONTACT CTA */}
        <section id="contact" className="final-cta reveal" style={{ '--reveal-delay': '90ms' }}>
          <p className="section-seq">04 — Contact</p>
          <h2>Looking for someone to design and build your next website or application?</h2>
          <p className="cta-sub">I'm currently available for freelance projects. Let's create something remarkable together.</p>
          <div className="cta-contact-row">
            <a className="cta-primary" href="mailto:enguigj@gmail.com">
              Say Hello ↗
            </a>
            <a className="cta-secondary" href="https://github.com" target="_blank" rel="noreferrer">
              GitHub
            </a>
          </div>
          <div className="contact-links">
            <a href="mailto:enguigj@gmail.com">enguigj@gmail.com</a>
          </div>
        </section>
      </main>

      {/* Bubbles */}
      <div className="page-bottom-effects" aria-hidden="true">
        <div className="page-bottom-glow"></div>
        <div className="page-bottom-bubbles">
          {[
            { x: '8%', size: '8px', delay: '0s', dur: '14s' },
            { x: '18%', size: '5px', delay: '1.8s', dur: '11s' },
            { x: '32%', size: '10px', delay: '0.9s', dur: '15s' },
            { x: '47%', size: '6px', delay: '2.2s', dur: '12s' },
            { x: '62%', size: '7px', delay: '0.4s', dur: '13s' },
            { x: '75%', size: '9px', delay: '1.2s', dur: '16s' },
            { x: '88%', size: '6px', delay: '2.8s', dur: '12s' },
          ].map((b, i) => (
            <span key={i} className="bubble" style={{ '--x': b.x, '--size': b.size, '--delay': b.delay, '--dur': b.dur }}></span>
          ))}
        </div>
      </div>

      <footer>
        <div className="footer-inner">
          <p>&copy; {new Date().getFullYear()} Jellamae Enguig. All rights reserved.</p>
          <div className="footer-links">
            <a href="mailto:enguigj@gmail.com">Email</a>
            <a href="#">LinkedIn</a>
            <a href="#">GitHub</a>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App