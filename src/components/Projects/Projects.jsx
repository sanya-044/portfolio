 import React from "react";
import "./Projects.scss";

const PROJECTS = [
  {
    title: "MERN Stack Chat Application",
    desc: "Built a real-time messaging platform enabling instant peer-to-peer and group communication. Implemented secure user authentication, message persistence with MongoDB, instant socket connections using Socket.io, and a responsive frontend interface.",
    image: "/assets/images/common/chat.png",
    tags: ["React", "Node.js", "Express", "MongoDB", "Socket.io", "Tailwind CSS"],
    links: [
      { label: "Live Demo", href: "https://ca-8.onrender.com", icon: "↗" },
      { label: "Source Code", href: "https://github.com/sanya-044/CA.git", icon: "⌂" },
    ],
  },
  {
    title: "Laundry Management & Booking Website",
    desc: "Developed a full-featured web application for scheduling laundry pickup and delivery services in a Team. Features include service selection, order tracking, user dashboards, and responsive layout styling optimized for seamless mobile and desktop usage.",
    image: "/assets/images/common/laundary.png",
    tags: ["React", "JavaScript", "CSS3", "Node.js", "Express"],
    links: [
      { label: "Live Demo", href: "https://ath-laundary.vercel.app/", icon: "↗" },
      { label: "Source Code", href: "https://github.com/Ayush110704/AthLaundary.git", icon: "⌂" },
    ],
  },
  {
    title: "Fashion-Oasis",
    desc: "Developed a full-stack fashion web application for scheduling and placing orders of jewellerys in a team .Features include service selection , order tracking ,order wishlisting , product management, customer and admin dashboard with responsiveness" ,
    image: "/assets/images/common/fashion.png",
    tags: ["React", "Node.js", "MongoDB"],
    links: [
      { label: "Live Demo", href: "https://github.com/yaminibisen2005-cell/Fashion-oasis.git", icon: "↗" },
      { label: "Source Code", href: "https://github.com/your-username/your-repo.git", icon: "⌂" },
    ],
  },
  
];

export default function Projects() {
  return (
    <section className="projects" id="projects">
      <div className="sectionHeader">
        <p className="sectionKicker">04. PROJECTS</p>
        <h2 className="sectionTitle">PROJECTS</h2>
        <p className="sectionSub">
          A selection of full-stack builds showcasing scalable backend architecture and responsive user interfaces.
        </p>
      </div>

      <div className="projectsGrid">
        {PROJECTS.map((p) => (
          <article className="projectCard" key={p.title}>
            <div className="projectMedia">
              <img src={p.image} alt={p.title} loading="lazy" />
              <div className="projectMediaOverlay" />
            </div>

            <div className="projectBody">
              <h3 className="projectTitle">{p.title}</h3>
              <p className="projectDesc">{p.desc}</p>

              <div className="projectTags">
                {p.tags.map((t) => (
                  <span className="tag" key={t}>
                    {t}
                  </span>
                ))}
              </div>

              <div className="projectFooter">
                {p.links.map((l) => (
                  <a
                    key={l.label}
                    className="projectLink"
                    href={l.href}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <span className="icon">{l.icon}</span>
                    {l.label}
                  </a>
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}