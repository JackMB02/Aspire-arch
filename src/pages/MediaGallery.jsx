import { Routes, Route } from 'react-router-dom';
import AnimatedSection from '../components/AnimatedSection';

function PhotoAlbums() {
  return <AnimatedSection><h1>Photo Albums</h1><p>Gallery of photos.</p></AnimatedSection>;
}

function VideoStories() {
  return <AnimatedSection><h1>Video Stories</h1><p>Video content.</p></AnimatedSection>;
}

function DesignVisualizations() {
  return <AnimatedSection><h1>Design Visualizations</h1><p>3D renders.</p></AnimatedSection>;
}

function CommunityVoices() {
  return <AnimatedSection><h1>Community Voices</h1><p>Testimonials.</p></AnimatedSection>;
}

function MediaGallery() {
  return (
    <div style={{ padding: '6rem 2rem 2rem' }}>
      <Routes>
        <Route path="photo-albums" element={<PhotoAlbums />} />
        <Route path="video-stories" element={<VideoStories />} />
        <Route path="design-visualizations" element={<DesignVisualizations />} />
        <Route path="community-voices" element={<CommunityVoices />} />
        <Route path="*" element={<AnimatedSection><h1>Media Gallery Overview</h1></AnimatedSection>} />
      </Routes>
    </div>
  );
}

export default MediaGallery;