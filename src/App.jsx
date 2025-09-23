import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import About from "./pages/About";
import Design from "./pages/Design";
import ResearchInsights from "./pages/ResearchInsights";
import TheColleagueUni from "./pages/TheColleagueUni";
import Education from "./pages/Education";
import MediaGallery from "./pages/MediaGallery";
import GetInvolved from "./pages/GetInvolved";
import NewsEvents from "./pages/NewsEvents";
import Contact from "./pages/Contact";

function AppContent() {
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  return (
    <div className="flex min-h-screen flex-col text-gray-100 transition-colors" style={{background: 'var(--primary-dark)'}}>
      {/* Navbar only shows on non-home pages */}
      {!isHomePage && <Navbar />}

      {/* Main content grows to fill available space */}
      <main className={`flex-grow ${!isHomePage ? 'pt-20' : ''}`}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about/*" element={<About />} />
          <Route path="/design/*" element={<Design />} />
          <Route path="/research-insights/*" element={<ResearchInsights />} />
          <Route path="/the-colleague-uni/*" element={<TheColleagueUni />} />
          <Route path="/education/*" element={<Education />} />
          <Route path="/media-gallery/*" element={<MediaGallery />} />
          <Route path="/get-involved/*" element={<GetInvolved />} />
          <Route path="/news-events" element={<NewsEvents />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>

      {/* Footer sticks to bottom */}
      <Footer />
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
      <style>
        {`
          /* Ensure search dropdown is always visible */
          .search-container {
            position: relative !important;
            z-index: 9999 !important;
          }
          
          /* Add proper spacing for fixed navbar */
          @media (min-width: 768px) {
            .pt-20 {
              padding-top: 5rem;
            }
          }
          
          @media (max-width: 767px) {
            .pt-20 {
              padding-top: 4rem;
            }
          }
        `}
      </style>
    </Router>
  );
}

export default App;
