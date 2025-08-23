import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaSearch, FaBars, FaTimes } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const NavContainer = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background: var(--primary-dark);
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem 2rem;
  z-index: 1000;
  @media (max-width: 768px) {
    padding: 1rem 1.5rem;
    flex-wrap: wrap;
  }
`;

const Logo = styled(Link)`
  font-family: 'Futura PT', sans-serif;
  font-size: 1.5rem;
  font-weight: bold;
  @media (max-width: 768px) {
    font-size: 1.2rem; /* Smaller logo on mobile */
  }
`;

const NavList = styled.ul`
  list-style: none;
  display: flex;
  gap: 1.5rem;
  margin: 0;
  @media (max-width: 768px) {
    display: ${props => (props.isOpen ? 'flex' : 'none')}; /* Toggle visibility */
    flex-direction: column;
    width: 100%;
    position: absolute;
    top: 100%;
    left: 0;
    background: var(--primary-dark);
    padding: 1rem;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  }
`;

const NavItem = styled.li`
  cursor: pointer;
  font-size: 0.9rem;
  transition: color 0.3s, transform 0.3s;
  &:hover {
    color: var(--accent-light);
    transform: scale(1.05);
  }
  @media (max-width: 768px) {
    font-size: 0.85rem;
    padding: 0.5rem 0;
  }
`;

const SubMenu = styled(motion.div)`
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  background: #FFFFFF;
  padding: 0.3rem 0;
  display: flex;
  justify-content: flex-start;
  @media (max-width: 768px) {
    position: static; /* Prevent submenu from being fixed on mobile */
    width: 100%;
  }
`;

const SubList = styled.ul`
  list-style: none;
  display: flex;
  gap: 1.5rem;
  padding: 0 0 0 15rem;
  flex-wrap: wrap;
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    padding: 0 1rem;
  }
`;

const SubItem = styled.li`
  font-family: 'Montserrat', sans-serif;
  font-size: 0.8rem;
  color: #000000;
  transition: color 0.3s;
  &.active {
    text-decoration: underline;
    text-decoration-color: #000000;
  }
  &:hover {
    color: var(--accent-light);
  }
`;

const SearchIcon = styled(FaSearch)`
  cursor: pointer;
  font-size: 1.2rem;
  &:hover {
    color: var(--accent-light);
  }
  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const HamburgerIcon = styled.div`
  display: none;
  cursor: pointer;
  font-size: 1.2rem;
  &:hover {
    color: var(--accent-light);
  }
  @media (max-width: 768px) {
    display: block;
  }
`;

const subMenus = {
  about: [
    { label: 'Mission', path: '/about/mission' },
    { label: 'Vision', path: '/about/vision' },
  ],
  design: [
    { label: 'Academic', path: '/design/academic' },
    { label: 'Profession', path: '/design/profession' },
    { label: 'Competition', path: '/design/competition' },
  ],
  'research-insights': [
    { label: 'Articles & Case Studies', path: '/research-insights/articles-case-studies' },
    { label: 'Sustainable Design Practices', path: '/research-insights/sustainable-design' },
    { label: 'Resilience & Climate Adaptation', path: '/research-insights/resilience-climate' },
    { label: 'Cultural & Social Impact Studies', path: '/research-insights/cultural-social' },
  ],
  'the-colleague-uni': [
    { label: 'About', path: '/the-colleague-uni/about' },
    { label: 'Mission', path: '/the-colleague-uni/mission' },
    { label: 'Team', path: '/the-colleague-uni/team' },
    { label: 'Contact', path: '/the-colleague-uni/contact' },
  ],
  education: [
    { label: 'Workshops & Training', path: '/education/workshops-training' },
    { label: 'Tutorials & Guides', path: '/education/tutorials-guides' },
    { label: 'Exhibitions', path: '/education/exhibitions' },
  ],
  'media-gallery': [
    { label: 'Photo Albums', path: '/media-gallery/photo-albums' },
    { label: 'Video Stories', path: '/media-gallery/video-stories' },
    { label: 'Design Visualizations', path: '/media-gallery/design-visualizations' },
    { label: 'Community Voices', path: '/media-gallery/community-voices' },
  ],
  'get-involved': [
    { label: 'Membership & Partnerships', path: '/get-involved/membership-partnerships' },
    { label: 'Donate or Support', path: '/get-involved/donate-support' },
    { label: 'Community Feedback & Ideas', path: '/get-involved/community-feedback' },
  ],
};

function Navbar() {
  const [activeMenu, setActiveMenu] = useState(null);
  const [showSearch, setShowSearch] = useState(false);
  const [activeSubLink, setActiveSubLink] = useState(null);
  const [isNavOpen, setIsNavOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = (menu) => {
    setActiveMenu(activeMenu === menu ? null : menu);
    if (activeMenu === menu) setActiveSubLink(null); // Clear active sublink when closing menu
  };

  const handleSubLinkClick = (path) => {
    setActiveSubLink(path);
    setActiveMenu(null); // Close submenu after clicking
    setIsNavOpen(false); // Close nav on mobile
    navigate(path);
  };

  const handleSearch = (e) => {
    if (e.key === 'Enter') {
      console.log('Search:', e.target.value); // Placeholder for search
      setShowSearch(false);
      setIsNavOpen(false); // Close nav on mobile
    }
  };

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  return (
    <NavContainer>
      <Logo to="/">ASPIRE</Logo>
      <HamburgerIcon onClick={toggleNav}>
        {isNavOpen ? <FaTimes /> : <FaBars />}
      </HamburgerIcon>
      <NavList isOpen={isNavOpen}>
        {Object.keys(subMenus).map((key) => (
          <NavItem key={key} onClick={() => toggleMenu(key)}>
            {key.replace(/-/g, ' ').split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
          </NavItem>
        ))}
        <NavItem onClick={() => { navigate('/news-events'); setIsNavOpen(false); }}>News & Events</NavItem>
        <NavItem onClick={() => { navigate('/contact'); setIsNavOpen(false); }}>Contact</NavItem>
      </NavList>
      <SearchIcon onClick={() => setShowSearch(!showSearch)} />
      {activeMenu && (
        <SubMenu
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
        >
          <SubList>
            {subMenus[activeMenu].map((item) => (
              <SubItem key={item.path} className={activeSubLink === item.path ? 'active' : ''}>
                <Link to={item.path} onClick={() => handleSubLinkClick(item.path)}>
                  {item.label}
                </Link>
              </SubItem>
            ))}
          </SubList>
        </SubMenu>
      )}
      {showSearch && (
        <motion.input
          type="text"
          placeholder="Search..."
          onKeyDown={handleSearch}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          style={{
            position: 'absolute',
            top: '100%',
            right: '1.5rem',
            padding: '0.5rem',
            width: '200px',
            '@media (max-width: 768px)': {
              width: 'calc(100% - 3rem)', // Full width minus padding
            },
          }}
        />
      )}
    </NavContainer>
  );
}

export default Navbar;