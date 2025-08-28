import { useState, useEffect } from "react";
import { Routes, Route, Link, useParams } from "react-router-dom";
import AnimatedSection from "../components/AnimatedSection";
import "./ProjectGallery.css";

// ---------------- PageWrapper ----------------
const PageWrapper = ({ title, description, projects }) => {
  const [expandedIndex, setExpandedIndex] = useState(null);

  const toggleExpand = (idx) => {
    setExpandedIndex(expandedIndex === idx ? null : idx);
  };

  return (
    <AnimatedSection>
      <div className="page-wrapper">
        <h1 className="page-title">{title}</h1>
        <p className="page-description">{description}</p>

        <div className="masonry">
          {projects.map((project, idx) => {
            const isExpanded = expandedIndex === idx;

            return (
              <div
                key={idx}
                className={`project-card ${isExpanded ? "expanded" : ""}`}
                onClick={() => toggleExpand(idx)}
              >
                {!isExpanded && (
                  <>
                    <img src={project.image} alt={project.title} />
                    <div className="overlay">
                      <h3>{project.title}</h3>
                      <p>{project.summary}</p>
                      <Link to={`/design/project/${project.id}`}>
                        <button>View More</button>
                      </Link>
                    </div>
                  </>
                )}

                {isExpanded && (
                  <div className="expanded-details">
                    <div className="left-details">
                      <p>{project.summary}</p>
                    </div>

                    <img src={project.image} alt={project.title} />

                    <div className="right-info">
                      <h3>{project.title}</h3>
                      <p>{project.summary}</p>
                      <Link to={`/design/project/${project.id}`}>
                        Visit Project →
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </AnimatedSection>
  );
};

// ---------------- Data ----------------
const academicProjects = [
  {
    id: "library",
    title: "Modern Campus Library",
    summary:
      "A sustainable library concept integrating natural light and community spaces.",
    image: "/images/library.jpg",
    images: ["/images/library.jpg", "/images/library2.jpg"],
    description:
      "This library design focuses on sustainability, using glass facades for natural light and open spaces for collaborative learning. It integrates green courtyards and modern interiors.",
  },
  {
    id: "housing",
    title: "Student Housing Concept",
    summary:
      "Affordable housing designed with modular units and green courtyards.",
    image: "/images/housing.jpg",
    images: ["/images/housing.jpg", "/images/housing2.jpg"],
    description:
      "The student housing project prioritizes affordability while maximizing comfort. Modular units are prefabricated and arranged around shared courtyards to foster community living.",
  },
];

const professionalProjects = [
  {
    id: "villa",
    title: "Luxury Residential Villa",
    summary:
      "High-end villa design blending modern architecture with natural landscapes.",
    image: "/images/villa.jpg",
    images: ["/images/villa.jpg", "/images/villa2.jpg"],
    description:
      "The villa design merges minimalism with luxury, featuring an infinity pool, open floor plans, and natural stone facades that harmonize with the surrounding landscape.",
  },
  {
    id: "office",
    title: "Office Tower Concept",
    summary:
      "An energy-efficient high-rise designed for flexible work environments.",
    image: "/images/office.jpg",
    images: ["/images/office.jpg", "/images/office2.jpg"],
    description:
      "This office tower reimagines workplace design with flexible interiors, solar glass technology, and smart energy systems to minimize environmental impact.",
  },
];

const competitionProjects = [
  {
    id: "park",
    title: "Urban Green Park",
    summary:
      "A competition entry transforming abandoned urban land into a green hub.",
    image: "/images/park.jpg",
    images: ["/images/park.jpg", "/images/park2.jpg"],
    description:
      "The park project transforms a neglected urban area into a thriving green hub with walking paths, cultural pavilions, and recreational spaces.",
  },
  {
    id: "pavilion",
    title: "Cultural Pavilion",
    summary:
      "A winning concept celebrating local heritage through modern design.",
    image: "/images/pavilion.jpg",
    images: ["/images/pavilion.jpg", "/images/pavilion2.jpg"],
    description:
      "The cultural pavilion combines traditional motifs with modern construction. It serves as an exhibition space and a landmark for cultural events.",
  },
];

// ---------------- Project Pages ----------------
function Academic() {
  return (
    <PageWrapper
      title="Academic Designs"
      description="Exploring innovative solutions through academic architectural projects that challenge creativity and functionality."
      projects={academicProjects}
    />
  );
}

function Profession() {
  return (
    <PageWrapper
      title="Professional Designs"
      description="A showcase of professional architecture projects completed for clients, merging aesthetics with purpose."
      projects={professionalProjects}
    />
  );
}

function Competition() {
  return (
    <PageWrapper
      title="Competition Entries"
      description="Award-winning and shortlisted competition projects that highlight design excellence and innovation."
      projects={competitionProjects}
    />
  );
}

// ---------------- Visit Project Page ----------------
function VisitProject() {
  const { id } = useParams();
  const allProjects = [
    ...academicProjects,
    ...professionalProjects,
    ...competitionProjects,
  ];
  const project = allProjects.find((p) => p.id === id);

  const [currentIndex, setCurrentIndex] = useState(0);

  // Automatic slideshow every 3s
  useEffect(() => {
    if (!project?.images) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) =>
        prev === project.images.length - 1 ? 0 : prev + 1
      );
    }, 3000);
    return () => clearInterval(interval);
  }, [project]);

  const prevSlide = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? project.images.length - 1 : prev - 1
    );
  };

  const nextSlide = () => {
    setCurrentIndex((prev) =>
      prev === project.images.length - 1 ? 0 : prev + 1
    );
  };

  if (!project) return <p>Project not found</p>;

  return (
    <div className="visit-project">
      {/* Slideshow */}
      <div className="slideshow">
        <img
          src={project.images[currentIndex]}
          alt={`${project.title} slide ${currentIndex}`}
        />
        {/* Arrows */}
        <button className="prev-arrow" onClick={prevSlide}>
          &#10094;
        </button>
        <button className="next-arrow" onClick={nextSlide}>
          &#10095;
        </button>
      </div>

      {/* Long Description */}
      <div className="project-content">
        <h1>{project.title}</h1>
        <p>
          {project.description} Lorem ipsum dolor sit amet, consectetur
          adipiscing elit. Donec at quam nec magna suscipit porta. Suspendisse
          potenti. Quisque non quam sed nulla sodales vulputate. Mauris sit amet
          posuere mauris. Vestibulum euismod sapien vel arcu faucibus, ac
          facilisis nunc varius. Proin sodales erat nec leo lacinia, a vehicula
          nulla sagittis. Vivamus feugiat, arcu in gravida fermentum, mauris
          lorem sodales purus, vitae viverra urna elit sed massa.
        </p>
        <p>
          Curabitur volutpat, sapien ut pellentesque vehicula, lorem turpis
          sollicitudin velit, ac posuere neque sapien eu nunc. Pellentesque
          habitant morbi tristique senectus et netus et malesuada fames ac turpis
          egestas. Aenean aliquet sit amet turpis vel vehicula. Proin rhoncus
          velit id magna euismod bibendum. Suspendisse vulputate, sem et luctus
          aliquet, erat mauris elementum justo, nec porttitor nisl nunc sed
          magna.
        </p>
        <p>
          Morbi consequat sapien sed ex efficitur, at tincidunt sapien
          consectetur. Praesent semper orci sed turpis ullamcorper faucibus. Nam
          viverra, turpis id efficitur tincidunt, lorem eros feugiat mauris, at
          pulvinar augue sapien sit amet dolor. Ut elementum purus eu neque
          malesuada facilisis. Phasellus rhoncus lectus ut ligula iaculis
          convallis.
        </p>

        {/* Extra detail images */}
        {project.images.slice(1).map((img, idx) => (
          <img key={idx} src={img} alt={`detail ${idx}`} />
        ))}
      </div>
    </div>
  );
}

// ---------------- Main Design Page ----------------
function Design() {
  const mixedProjects = [
    ...academicProjects.slice(0, 1),
    ...professionalProjects.slice(0, 1),
    ...competitionProjects.slice(0, 1),
  ];

  return (
    <div className="design-page">
      <Routes>
        <Route path="academic" element={<Academic />} />
        <Route path="profession" element={<Profession />} />
        <Route path="competition" element={<Competition />} />
        <Route path="project/:id" element={<VisitProject />} />
        <Route
          path="*"
          element={
            <AnimatedSection>
              <div className="design-intro">
                <h1>Design Portfolio</h1>
                <p>
                  Explore a diverse collection of architectural works — from
                  academic concepts to professional projects and competition
                  entries.
                </p>
                <div className="design-links">
                  <Link to="academic">Academic</Link>
                  <Link to="profession">Professional</Link>
                  <Link to="competition">Competition</Link>
                </div>

                {/* Mixed Preview */}
                <div style={{ marginTop: "2rem" }}>
                  <PageWrapper
                    title="Featured Projects"
                    description="A curated mix of projects across all categories."
                    projects={mixedProjects}
                  />
                </div>
              </div>
            </AnimatedSection>
          }
        />
      </Routes>
    </div>
  );
}

export default Design;
