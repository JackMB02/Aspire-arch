import { Routes, Route, Link } from "react-router-dom";
import AnimatedSection from "../components/AnimatedSection";

const PageWrapper = ({ title, description, projects }) => (
  <AnimatedSection>
    <div className="max-w-6xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">{title}</h1>
      <p className="text-lg text-gray-600 mb-8">{description}</p>

      <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-8">
        {projects.map((project, idx) => (
          <div
            key={idx}
            className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow"
          >
            <img
              src={project.image}
              alt={project.title}
              className="h-48 w-full object-cover"
            />
            <div className="p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                {project.title}
              </h2>
              <p className="text-gray-600 text-sm mb-4">{project.summary}</p>
              <Link
                to="#"
                className="text-blue-600 font-medium hover:underline"
              >
                View Details →
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  </AnimatedSection>
);

function Academic() {
  return (
    <PageWrapper
      title="Academic Designs"
      description="Exploring innovative solutions through academic architectural projects that challenge creativity and functionality."
      projects={[
        {
          title: "Modern Campus Library",
          summary:
            "A sustainable library concept integrating natural light and community spaces.",
          image: "/images/library.jpg",
        },
        {
          title: "Student Housing Concept",
          summary:
            "Affordable housing designed with modular units and green courtyards.",
          image: "/images/housing.jpg",
        },
      ]}
    />
  );
}

function Profession() {
  return (
    <PageWrapper
      title="Professional Designs"
      description="A showcase of professional architecture projects completed for clients, merging aesthetics with purpose."
      projects={[
        {
          title: "Luxury Residential Villa",
          summary:
            "High-end villa design blending modern architecture with natural landscapes.",
          image: "/images/villa.jpg",
        },
        {
          title: "Office Tower Concept",
          summary:
            "An energy-efficient high-rise designed for flexible work environments.",
          image: "/images/office.jpg",
        },
      ]}
    />
  );
}

function Competition() {
  return (
    <PageWrapper
      title="Competition Entries"
      description="Award-winning and shortlisted competition projects that highlight design excellence and innovation."
      projects={[
        {
          title: "Urban Green Park",
          summary:
            "A competition entry transforming abandoned urban land into a green hub.",
          image: "/images/park.jpg",
        },
        {
          title: "Cultural Pavilion",
          summary:
            "A winning concept celebrating local heritage through modern design.",
          image: "/images/pavilion.jpg",
        },
      ]}
    />
  );
}

function Design() {
  return (
    <div className="pt-24">
      <Routes>
        <Route path="academic" element={<Academic />} />
        <Route path="profession" element={<Profession />} />
        <Route path="competition" element={<Competition />} />
        <Route
          path="*"
          element={
            <AnimatedSection>
              <div className="max-w-4xl mx-auto text-center py-20 px-6">
                <h1 className="text-5xl font-bold text-gray-800 mb-6">
                  Design Portfolio
                </h1>
                <p className="text-lg text-gray-600 mb-8">
                  Explore a diverse collection of architectural works — from
                  academic concepts to professional projects and competition
                  entries.
                </p>
                <div className="flex flex-wrap gap-6 justify-center">
                  <Link
                    to="academic"
                    className="bg-blue-600 text-white px-6 py-3 rounded-xl shadow hover:bg-blue-700 transition"
                  >
                    Academic
                  </Link>
                  <Link
                    to="profession"
                    className="bg-blue-600 text-white px-6 py-3 rounded-xl shadow hover:bg-blue-700 transition"
                  >
                    Professional
                  </Link>
                  <Link
                    to="competition"
                    className="bg-blue-600 text-white px-6 py-3 rounded-xl shadow hover:bg-blue-700 transition"
                  >
                    Competition
                  </Link>
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
