import {
  ArrowDown,
  ArrowUpRight,
  Code2,
  Mail,
  Menu,
  X
} from "lucide-react";
import { useEffect, useState } from "react";
import { FaGithub, FaLinkedin } from "react-icons/fa";

type SectionId = 'home' | 'about' | 'experience' | 'projects' | 'contact';

const navigation: { label: string; id: SectionId }[] = [
  { label: 'About', id: 'about' },
  { label: 'Experience', id: 'experience' },
  { label: 'Projects', id: 'projects' },
  { label: 'Contact', id: 'contact' },
];

const skillGroups = [
  {
    title: 'Programming Languages',
    skills: ['Python', 'Java', 'JavaScript', 'TypeScript', 'C', 'SQL', 'HTML', 'CSS'],
  },
  {
    title: 'AI / ML',
    skills: ['LLMs', 'LangChain', 'NLP', 'Computer Vision', 'Feature Engineering', 'Prompt Engineering', 'Pandas', 'NumPy'],
  },
  {
    title: 'Frameworks & Tools',
    skills: ['MySQL', 'SQLite', 'Django', 'Node.js', 'FastAPI', 'Tailwind CSS', 'React.js', 'Jest', 'JUnit', 'Docker', 'Jupyter', 'Git', 'GitHub', 'VSCode'],
  },
];

const experiences = [
  {
    role: 'Software Developer Intern',
    company: 'Tvarit GmbH',
    location: 'Frankfurt, Germany',
    dates: 'June 2026 — Aug 2026',
    number: '01',
    details: [
      'Developed AI-powered manufacturing applications across React, Node.js, FastAPI, Docker, and AWS, integrating backend services and cloud infrastructure for industrial analytics.',
      'Implemented and debugged visualization features that improved interpretability of AI-driven production insights.',
      'Collaborated with cross-functional teams to debug production issues and deliver scalable software improvements.',
    ],
  },
  {
    role: 'Undergraduate Teaching Assistant',
    company: 'Manning College of Information and Computer Sciences',
    location: 'Amherst, MA',
    dates: 'Feb 2026 — Present',
    number: '02',
    details: [
      'Led discussions for a 300+ student probability course, reinforcing concepts underlying machine learning algorithms.',
      'Partnered with faculty and TAs to ensure consistent evaluation standards and streamline course operations.',
    ],
  },
  {
    role: 'Product Manager',
    company: 'Build UMass',
    location: 'Amherst, MA',
    dates: 'Sept 2025 — Present',
    number: '03',
    details: [
      'Led cross-functional development of an AI platform helping restaurants reduce food waste through voice AI and ML.',
      'Gathered stakeholder needs and translated requirements into product specifications and implementation roadmaps.',
      'Pitched our product successfully to gain over $7,000 in funding for Claude Code and AWS.',
    ],
  },
  {
    role: 'Software Developer Intern',
    company: 'Kindness Matters',
    location: 'Remote',
    dates: 'Dec 2025 — Feb 2026',
    number: '04',
    details: [
      'Built the frontend for an EdTech platform with React and HTML/CSS including a marketplace and purchase flows.',
      'Integrated frontend with REST APIs and MySQL to support transactions, course listings, and progress tracking.',
    ],
  },
];

const projects = [
  {
    title: 'Res-Q',
    type: 'AI / Multimodal Assistant',
    link: 'https://github.com/tisya05/Res-Q',
    tags: ['Python', 'Google Gemini API', 'ElevenLabs API', 'SpeechRecognition', 'React.js'],
    description: 'Engineered a multimodal AI assistant integrating Google Gemini, speech recognition, voice synthesis, and Retrieval-Augmented Generation to deliver multilingual emergency guidance across 74 languages.',
    detail: 'Integrated external APIs for geolocation, hospitals, weather, and emergency alerts while optimizing low-latency inference and contextual recommendations.',
  },
  {
    title: 'PennyWise | Hackathon Winner',
    link: 'https://github.com/supriyaahejib/pennywise',
    type: 'Best Beginner Hack @ HackHer413 2025',
    tags: ['Django', 'Python', 'SQLite', 'Node.js', 'CSS', 'HTML'],
    description: 'Developed a full-stack smart budgeting platform in under 24 hours, earning Best Beginner Hack at Hack(H)er413.',
    detail: 'Developed Django backend services and a SQL database supporting budgeting, loan management, and transactions.',
  },
  {
    title: 'Research.AI',
    type: 'Autonomous Research Agent',
    link: 'https://github.com/supriyaahejib/research.ai',
    tags: ['LangChain', 'OpenAI API', 'Google Gemini API', 'Python', 'Git'],
    description: 'Built an autonomous AI research agent using LangChain, OpenAI, Google Gemini, and structured tool-calling workflows to retrieve, synthesize, and summarize multi-step research tasks.',
    detail: 'Implemented modular retrieval pipelines, structured outputs, and automated logging to improve reliability and observability of LLM applications.',
  },
  {
    title: 'Personal Portfolio Template',
    type: 'Customizable Portfolio Template',
    link: 'https://personal-portfolio-template-black.vercel.app/',
    tags: ['React+Vite', 'Tailwind CSS', 'Framer Motion', 'HTML', 'Git'],
    description: 'Built a customizable personal portfolio template for developers with a modern frontend architecture and clean animations and motions.',
    detail: 'Built with a component-based structure so sections like projects and experience can be swapped or reordered easily, with Framer Motion handling scroll and transition animations and Tailwind driving a responsive, theme-friendly design system.',
  },
];

function App() {
  const [activeSection, setActiveSection] = useState<SectionId>('home');
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const sections = Array.from(document.querySelectorAll<HTMLElement>('[data-section]'));
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActiveSection(visible.target.id as SectionId);
      },
      { rootMargin: '-30% 0px -60% 0px', threshold: [0.05, 0.2, 0.5] },
    );
    sections.forEach((section) => sectionObserver.observe(section));

    const revealObserver = new IntersectionObserver(
      (entries) => entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          revealObserver.unobserve(entry.target);
        }
      }),
      { threshold: 0.12 },
    );
    document.querySelectorAll('.reveal-item').forEach((item) => revealObserver.observe(item));

    return () => {
      sectionObserver.disconnect();
      revealObserver.disconnect();
    };
  }, []);

  const scrollTo = (id: SectionId) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };

  return (
    <main>
      <header className="site-header">
        <button className="brand" onClick={() => scrollTo('home')} aria-label="Go to home">
          SUPRIYAA HEJIB
        </button>
        <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
        <nav className={menuOpen ? 'site-nav is-open' : 'site-nav'} aria-label="Main navigation">
          {navigation.map((item) => (
            <button className={activeSection === item.id ? 'nav-link is-active' : 'nav-link'} key={item.id} onClick={() => scrollTo(item.id)}>
              {item.label}
            </button>
          ))}
          <a className="nav-link resume-link" href="https://drive.google.com/file/d/1yYFzS3AJAa2KwDoAnL0S73HnfF-nDlbL/view?usp=sharing" target="_blank" rel="noreferrer">Resume <ArrowUpRight size={13} /></a>
        </nav>
      </header>

      <section className="hero page-section" id="home" data-section>
        <div className="hero-grid-lines" aria-hidden="true" />
        <div className="hero-copy">
          <p className="eyebrow"> · SOFTWARE ENGINEER · AI / ML · PRODUCT · POET</p>
          <h1><span>Supriyaa</span><span>Hejib</span></h1>
          <p className="hero-intro">I build things, break things, and write poetry when the code compiles.</p>
          <p className="hero-intro">CS + English + Math @ UMass Amherst</p>
        </div>
        <div className="hero-laptop-wrap">
          <img src="/images/laptop-with-vs.png" alt="Laptop displaying code" className="hero-laptop" />
          <div className="orbit orbit-one" />
          <div className="orbit orbit-two" />
        </div>
        <button className="scroll-cue" onClick={() => scrollTo('about')}><span>Scroll to explore</span><ArrowDown size={18} /></button>
      </section>

      <section className="about page-section section-shell" id="about" data-section>
        <SectionHeading index="01" title="A little about me" label="About" />
        <div className="about-layout">
          <div className="portrait-card soft-card reveal-item">
            <div className="portrait-placeholder"><img src="/images/me.png" alt="Supriyaa Hejib" /></div>
            <span className="card-caption">A curious mind, always building</span>
          </div>

          <div className="about-side">
            <article className="bio-card soft-card reveal-item">
              <div className="card-topline"><span>WHO I AM</span><Code2 size={18} /></div>
              <p>
I study Computer Science, English, and Mathematics because each teaches a different way of thinking, and together they shape how I build, create, and solve problems.
I like taking what I learn and turning it into something real. Whether that's writing software, exploring AI, or collaborating on new ideas, I care most about work that actually does something.</p>
              <p>Right now, I’m learning AI/ML, working as a Product Manager and Software Developer for an AI-powered startup to help reduce restaurant food waste, and looking for collaborations!</p>
            </article>
          </div>
        </div>

        <article className="skills-card soft-card reveal-item">
          <div className="card-topline"><span>TOOLS I WORK WITH</span><span className="mini-dot" /></div>
          <div className="skill-groups">
            {skillGroups.map((group) => (
              <div className="skill-group" key={group.title}>
                <h3>{group.title}</h3>
                <div className="skill-list">{group.skills.map((skill) => <span key={skill}>{skill}</span>)}</div>
              </div>
            ))}
          </div>
        </article>
      </section>

      <section className="experience page-section section-shell" id="experience" data-section>
        <SectionHeading index="02" title="Places I’ve learned" label="Experience" />
        <div className="experience-list">
          {experiences.map((experience) => (
            <article className="experience-card soft-card reveal-item" key={`${experience.company}-${experience.role}`}>
              <div className="experience-number">{experience.number}</div>
              <div className="experience-main">
                <div className="experience-heading"><h2>{experience.role}</h2><span>{experience.dates}</span></div>
                <p className="company-line">{experience.company} <i>·</i> {experience.location}</p>
                <ul>{experience.details.map((detail) => <li key={detail}>{detail}</li>)}</ul>
              </div>
              
            </article>
          ))}
        </div>
      </section>

      <section className="projects page-section section-shell" id="projects" data-section>
        <SectionHeading index="03" title="Things I’ve made" label="Projects" />
        <div className="projects-list">
          {projects.map((project, index) => (
            <article className="project-card soft-card reveal-item" key={project.title}>
              <div className="project-index">0{index + 1}</div>
              <div className="project-content">
                <div className="project-heading"><div><h2>{project.title}</h2><p>{project.type}</p></div><a href={project.link} target="_blank" rel="noreferrer" aria-label={`View ${project.title}`}><ArrowUpRight size={21} /></a></div>
                <div className="project-tags">{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
                <p className="project-description">{project.description}</p>
                <p className="project-detail">{project.detail}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <footer className="contact page-section" id="contact" data-section>
        <div className="footer-grid-lines" aria-hidden="true" />
        <div className="section-shell footer-inner">
          <SectionHeading index="04" title="Let’s make something" label="Contact" light />
          <div className="contact-row">
            <a className="email-link" href="mailto:supriyaahejib@gmail.com">supriyaahejib@gmail.com <ArrowUpRight size={20} /></a>
            <div className="social-links"><a href="https://linkedin.com/in/supriyaa-hejib" target="_blank" rel="noreferrer" aria-label="LinkedIn"><FaLinkedin size={19} /></a><a href="https://github.com/supriyaahejib" target="_blank" rel="noreferrer" aria-label="GitHub"><FaGithub size={19} /></a><a href="mailto:supriyaahejib@gmail.com" aria-label="Email"><Mail size={19} /></a></div>
          </div>
          <div className="footer-bottom"><span>© Supriyaa Hejib, 2026</span><span>Designed with curiosity</span></div>
        </div>
      </footer>
    </main>
  );
}

function SectionHeading({ index, title, label, light = false }: { index: string; title: string; label: string; light?: boolean }) {
  return <div className={light ? 'section-heading light reveal-item' : 'section-heading reveal-item'}><div className="section-label"><span>{index}</span><span>{label}</span></div><h2>{title}</h2></div>;
}

export default App;
