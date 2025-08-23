import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Design from './pages/Design';
import ResearchInsights from './pages/ResearchInsights';
import TheColleagueUni from './pages/TheColleagueUni';
import Education from './pages/Education';
import MediaGallery from './pages/MediaGallery';
import GetInvolved from './pages/GetInvolved';
import NewsEvents from './pages/NewsEvents';
import Contact from './pages/Contact';

function App() {
  return (
    <Router>
      <Navbar />
      <main>
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
      <Footer />
    </Router>
  );
}

export default App;